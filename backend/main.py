from fastapi import FastAPI, UploadFile, File
from fastapi.responses import FileResponse
from pydantic import BaseModel
from pathlib import Path

from backend.tts import text_to_speech
from backend.stt import speech_to_text

app = FastAPI(title="AI Voice Platform - Phase One")

# Ensure outputs directory exists
OUTPUT_DIR = Path("outputs")
OUTPUT_DIR.mkdir(exist_ok=True)

# -------- TTS (Text to Speech) --------

class TTSRequest(BaseModel):
    text: str

@app.post("/tts")
def tts_endpoint(request: TTSRequest):
    audio_path = text_to_speech(request.text)
    return FileResponse(audio_path, media_type="audio/wav")


# -------- STT (Speech to Text) --------

@app.post("/stt")
def stt_endpoint(file: UploadFile = File(...)):
    audio_path = OUTPUT_DIR / file.filename

    with open(audio_path, "wb") as buffer:
        buffer.write(file.file.read())

    text = speech_to_text(audio_path)
    return {"text": text}
