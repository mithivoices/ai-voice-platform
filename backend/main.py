"""
Mithivoices API Backend
FastAPI server with /api/ prefix for all endpoints.
Reads voices from manifest files, serves TTS/STT/Voice Chat.
"""

import os
import uuid
import time
from contextlib import asynccontextmanager
from fastapi import FastAPI, UploadFile, File, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse
from pydantic import BaseModel
from typing import Optional, List, Dict, Any

from stt import transcribe_audio
from tts import synthesize_speech
from llm.ollama_llm import OllamaLLM
from services.voice_loader import load_voices, get_voice_by_id, get_voice_model_path, get_supported_languages, match_voice_to_language
from services.language_manager import resolve_text_language, resolve_audio_language, should_translate, get_strict_translation


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_DIR = os.path.join(BASE_DIR, "..", "outputs")
os.makedirs(OUTPUT_DIR, exist_ok=True)

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("🚀 Starting Mithivoices API server...")
    print("📁 Output directory:", OUTPUT_DIR)
    print("🎯 Server ready!")
    yield
    print("👋 Shutting down Mithivoices API server...")

app = FastAPI(
    title="Mithivoices API",
    description="AI Voice Platform Backend",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Frontend dev server
        "http://127.0.0.1:5173",
        "*"  # Allow all for development
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize LLM (lazy, so doesn't fail if Ollama is down)


def get_llm():
    global llm
    if llm is None:
        llm = OllamaLLM(model="llama3")
    return llm


# ============================================================================
# Request/Response Models
# ============================================================================

class TTSRequest(BaseModel):
    text: str
    voice_id: str = "piper_en_us_lessac_medium"
    speed: float = 1.0
    pitch: int = 0
    stability: float = 0.75
    text_language: str = "auto"
    custom_language: Optional[str] = None


class TTSResponse(BaseModel):
    audio_url: str
    duration: float


class STTResponse(BaseModel):
    text: str


class VoiceChatResponse(BaseModel):
    user_text: str
    ai_text: str
    audio_url: str


# ============================================================================
# Health & Info Endpoints
# ============================================================================

@app.get("/api/health")
async def health():
    """Health check endpoint"""
    return {"status": "ok"}


@app.get("/")
async def root():
    """Root redirect to health"""
    return {"status": "ok", "message": "Mithivoices API is running. Use /api/* endpoints."}


# ============================================================================
# Voice Endpoints
# ============================================================================

@app.get("/api/voices")
async def get_voices():
    """
    Get all available voices from manifest files.
    Returns only voices with status='ready'.
    """
    try:
        result = load_voices()
        return JSONResponse(content=result)
    except ValueError as e:
        # Duplicate ID error
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to load voices: {str(e)}")


@app.get("/api/languages")
async def get_languages():
    """
    Get all available languages based on voices manifest.
    Used for frontend selectors.
    """
    try:
        langs = get_supported_languages()
        # Filter to minimal format requested by user
        filtered_langs = [{"code": l["code"], "name": l["name"]} for l in langs]
        
        return JSONResponse(content={
            "languages": filtered_langs,
            "has_other": True,
            "default": "auto"
        })
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to load languages: {str(e)}")


# ============================================================================
# Audio File Serving
# ============================================================================

@app.get("/api/audio/{filename}")
async def get_audio(filename: str):
    """
    Serve audio files from outputs directory.
    Used for TTS and Voice Chat audio results.
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


# ============================================================================
# Text-to-Speech
# ============================================================================

@app.post("/api/tts")
async def text_to_speech(request: TTSRequest):
    """
    Text-to-Speech endpoint.
    
    Request:
        {
            "text": "Hello world",
            "voice_id": "piper_en_us_lessac_medium",
            "speed": 1.0,
            "pitch": 0,
            "stability": 0.75
        }
    
    Response:
        {
            "audio_url": "/api/audio/tts_123.wav",
            "duration": 2.8
        }
    """
    try:
        # Validate text
        if not request.text or len(request.text.strip()) == 0:
            raise HTTPException(status_code=400, detail="Text cannot be empty")
        
        # Validate voice_id exists
        voice = get_voice_by_id(request.voice_id)
        if voice is None:
            raise HTTPException(status_code=400, detail=f"Invalid voice_id: {request.voice_id}")
        
        # Language Resolution & Translation Logic
        resolved_lang, confidence = resolve_text_language(
            request.text, 
            request.text_language, 
            request.custom_language
        )
        
        voice_lang = voice.get("language", "en")
        user_requested_auto = (request.text_language == "auto")
        
        source_text = request.text
        
        if should_translate(source_text, resolved_lang, confidence, voice_lang, user_requested_auto):
            # Translation required
            print(f"Translating from {resolved_lang} to {voice_lang} (Confidence: {confidence})")
            llm_service = get_llm()
            source_text = get_strict_translation(llm_service, request.text, resolved_lang, voice_lang)
        
        request_id = uuid.uuid4().hex
        filename = f"tts_{request_id}.wav"
        output_wav = os.path.join(OUTPUT_DIR, filename)

        # Get specific model path for the voice
        model_path = get_voice_model_path(request.voice_id)
        
        # Generate speech using Piper with specific model
        start_time = time.time()
        synthesize_speech(source_text, output_wav, model_path=model_path)
        generation_time = time.time() - start_time
        
        # Log performance metrics
        print(f"TTS Performance - Text length: {len(source_text)} chars, Generation time: {generation_time:.2f}s, Voice: {request.voice_id}")
        
        # Check if file was created successfully
        if not os.path.exists(output_wav):
            raise HTTPException(status_code=500, detail="Failed to generate audio")
        
        # Calculate duration (approximate from file size for now)
        file_size = os.path.getsize(output_wav)
        # WAV: 16-bit mono @ 22050 Hz = ~44100 bytes/sec
        duration = round(file_size / 44100, 2)
        
        return JSONResponse(content={
            "audio_url": f"/api/audio/{filename}",
            "duration": duration
        })
        
    except HTTPException:
        raise
    except RuntimeError as e:
        raise HTTPException(status_code=500, detail=f"TTS Error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Server Error: {str(e)}")


# ============================================================================
# Speech-to-Text
# ============================================================================

@app.post("/api/stt")
async def speech_to_text(
    audio: UploadFile = File(...),
    audio_language: str = Form("auto"),
    custom_language: Optional[str] = Form(None)
):
    """
    Speech-to-Text endpoint.
    
    Request: Multipart audio file upload + optional language Form fields
    
    Response:
        { 
          "text": "transcribed speech",
          "language": "hi",
          "confidence": "medium"
        }
    """
    input_wav = None
    try:
        # Validate file
        if not audio.filename:
            raise HTTPException(status_code=400, detail="No audio file provided")
        
        request_id = uuid.uuid4().hex
        input_wav = os.path.join(OUTPUT_DIR, f"stt_{request_id}_input.wav")
        
        # Save uploaded audio
        with open(input_wav, "wb") as f:
            content = await audio.read()
            if len(content) == 0:
                raise HTTPException(status_code=400, detail="Empty audio file")
            f.write(content)
        
        # Resolve language hint
        resolved_lang, confidence = resolve_audio_language(audio_language, custom_language)
        
        # Transcribe using Whisper
        transcription, detected_lang = transcribe_audio(input_wav, language=resolved_lang)
        
        # Clean up input file
        if os.path.exists(input_wav):
            os.remove(input_wav)
        
        return JSONResponse(content={
            "text": transcription or "",
            "language": detected_lang,
            "confidence": confidence if resolved_lang else "medium" # If auto, confidence is medium because whisper detected it
        })
    
    except HTTPException:
        raise
    except Exception as e:
        # Clean up on error
        if input_wav and os.path.exists(input_wav):
            os.remove(input_wav)
        raise HTTPException(status_code=500, detail=f"STT Error: {str(e)}")


# ============================================================================
# Voice Chat
# ============================================================================

@app.post("/api/voice-chat")
async def voice_chat(
    audio: UploadFile = File(...),
    voice_id: str = Form("piper_en_us_lessac_medium")
):
    """
    Combined Voice Chat endpoint (Language Aware).
    Flow: STT (auto-detect) → LLM (same language) → TTS (matching voice)
    
    Request: Multipart audio file upload
    
    Response:
        {
            "user_text": "Hello",
            "detected_language": "en",
            "ai_text": "Hi there!",
            "audio_url": "/api/audio/chat_123.wav"
        }
    """
    input_wav = None
    try:
        request_id = uuid.uuid4().hex
        input_wav = os.path.join(OUTPUT_DIR, f"chat_{request_id}_input.wav")
        output_filename = f"chat_{request_id}_output.wav"
        output_wav = os.path.join(OUTPUT_DIR, output_filename)

        # Save input audio
        with open(input_wav, "wb") as f:
            content = await audio.read()
            if len(content) == 0:
                raise HTTPException(status_code=400, detail="Empty audio file")
            f.write(content)

        # 1. STT (Auto-detect language)
        user_text, detected_lang = transcribe_audio(input_wav)
        
        if not user_text:
             raise HTTPException(status_code=400, detail="Speech could not be recognized")

        # 2. LLM response in user language
        llm_service = get_llm()
        chat_prompt = f"""You are having a natural spoken conversation.
Rules:
- Respond in the SAME language as the user (Detected language: {detected_lang})
- Do not translate unless asked
- Keep tone conversational
- Do not switch languages
"""
        full_prompt = f"{chat_prompt}\n\nUSER: {user_text}\nAI:"
        ai_text = llm_service.generate(full_prompt).strip()

        # 3. TTS with matching voice
        # User selected a voice, but we should try to match the language if it's different
        # Requirement: "Voice Chat must respond in the language the user speaks"
        # "Match voice to language"
        target_voice = match_voice_to_language(detected_lang)
        if not target_voice:
             # Fallback to English (already handled in match_voice_to_language but being safe)
             target_voice = match_voice_to_language("en")
             
        model_path = get_voice_model_path(target_voice["id"])
        synthesize_speech(ai_text, output_wav, model_path=model_path)

        # Cleanup input
        if os.path.exists(input_wav):
            os.remove(input_wav)

        return JSONResponse(content={
            "user_text": user_text,
            "detected_language": detected_lang,
            "ai_text": ai_text,
            "audio_url": f"/api/audio/{output_filename}"
        })
    except HTTPException:
        raise
    except Exception as e:
        # Cleanup input on error
        if 'input_wav' in locals() and input_wav and os.path.exists(input_wav):
            os.remove(input_wav)
        raise HTTPException(status_code=500, detail=f"Voice Chat Error: {str(e)}")


# ============================================================================
# Legacy routes (for backwards compatibility, will be removed)
# ============================================================================

@app.get("/audio/{filename}")
async def legacy_audio(filename: str):
    """Legacy audio route - redirects to /api/audio/"""
    return await get_audio(filename)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)