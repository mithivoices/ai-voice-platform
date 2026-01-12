import os
import uuid
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse
from pydantic import BaseModel

from backend.stt import transcribe_audio
from backend.tts import synthesize_speech
from backend.llm.ollama_llm import OllamaLLM


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_DIR = os.path.join(BASE_DIR, "..", "outputs")
os.makedirs(OUTPUT_DIR, exist_ok=True)

app = FastAPI(title="AI Voice Platform (Local Backend)")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

llm = OllamaLLM(model="llama3")


# Request model for TTS
class TTSRequest(BaseModel):
    text: str
    voice: str = "default"
    speed: float = 1.0
    pitch: int = 0


@app.get("/")
async def root():
    """Health check endpoint for UI"""
    return {"status": "online", "message": "AI Voice Platform API is running"}


@app.post("/tts")
async def text_to_speech(request: TTSRequest):
    """
    Text-to-Speech endpoint
    Accepts JSON: {"text": "hello", "voice": "default", "speed": 1.0, "pitch": 0}
    Returns: Audio WAV file
    """
    try:
        if not request.text or len(request.text.strip()) == 0:
            raise HTTPException(status_code=400, detail="Text cannot be empty")
        
        request_id = uuid.uuid4().hex
        output_wav = os.path.join(OUTPUT_DIR, f"{request_id}_tts.wav")
        
        # Generate speech using Piper
        synthesize_speech(request.text, output_wav)
        
        # Check if file was created successfully
        if not os.path.exists(output_wav):
            raise HTTPException(status_code=500, detail="Failed to generate audio")
        
        # Return the audio file
        return FileResponse(
            output_wav,
            media_type="audio/wav",
            filename="speech.wav",
            headers={
                "Cache-Control": "no-cache",
                "Content-Disposition": "inline; filename=speech.wav"
            }
        )
    except RuntimeError as e:
        raise HTTPException(status_code=500, detail=f"TTS Error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Server Error: {str(e)}")


@app.post("/stt")
async def speech_to_text(audio: UploadFile = File(...)):
    """
    Speech-to-Text endpoint
    Accepts: Audio file upload (FormData)
    Returns: {"text": "transcribed text"}
    """
    try:
        # Validate file
        if not audio.filename:
            raise HTTPException(status_code=400, detail="No audio file provided")
        
        request_id = uuid.uuid4().hex
        input_wav = os.path.join(OUTPUT_DIR, f"{request_id}_stt_input.wav")
        
        # Save uploaded audio
        with open(input_wav, "wb") as f:
            content = await audio.read()
            if len(content) == 0:
                raise HTTPException(status_code=400, detail="Empty audio file")
            f.write(content)
        
        # Transcribe using Whisper
        transcription = transcribe_audio(input_wav).strip()
        
        # Clean up input file
        if os.path.exists(input_wav):
            os.remove(input_wav)
        
        if not transcription:
            return JSONResponse(content={"text": ""})
        
        return JSONResponse(content={"text": transcription})
    
    except Exception as e:
        # Clean up on error
        if os.path.exists(input_wav):
            os.remove(input_wav)
        raise HTTPException(status_code=500, detail=f"STT Error: {str(e)}")


@app.post("/voice-chat")
async def voice_chat(audio: UploadFile = File(...)):
    """
    Combined Voice Chat endpoint
    Accepts: Audio file upload
    Returns: {"transcription": "...", "ai_response": "...", "audio_url": "..."}
    """
    try:
        request_id = uuid.uuid4().hex
        input_wav = os.path.join(OUTPUT_DIR, f"{request_id}_input.wav")
        output_wav = os.path.join(OUTPUT_DIR, f"{request_id}_output.wav")

        # Save input audio
        with open(input_wav, "wb") as f:
            f.write(await audio.read())

        # STT - Transcribe user's voice
        transcription = transcribe_audio(input_wav).strip()
        
        if not transcription:
            raise HTTPException(status_code=400, detail="Could not transcribe audio")

        # LLM - Generate AI response
        ai_response = llm.generate(transcription)

        # TTS - Convert AI response to speech
        synthesize_speech(ai_response, output_wav)

        # Return audio file URL for frontend to fetch
        return JSONResponse(
            content={
                "transcription": transcription,
                "ai_response": ai_response,
                "audio_url": f"http://127.0.0.1:8000/audio/{os.path.basename(output_wav)}",
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Voice Chat Error: {str(e)}")


@app.get("/audio/{filename}")
async def get_audio(filename: str):
    """
    Serve audio files generated by voice-chat
    """
    # Security: Only allow files in OUTPUT_DIR
    file_path = os.path.join(OUTPUT_DIR, filename)
    
    # Prevent directory traversal
    if not os.path.abspath(file_path).startswith(os.path.abspath(OUTPUT_DIR)):
        raise HTTPException(status_code=403, detail="Access denied")
    
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Audio file not found")
    
    return FileResponse(
        file_path,
        media_type="audio/wav",
        headers={"Cache-Control": "no-cache"}
    )