from fastapi import FastAPI
from fastapi.responses import FileResponse
from pydantic import BaseModel
from backend.tts import text_to_speech

app = FastAPI(title="AI Voice Platform - Phase One")

class TTSRequest(BaseModel):
    text: str

@app.post("/tts")
def tts_endpoint(request: TTSRequest):
    audio_path = text_to_speech(request.text)
    return FileResponse(audio_path, media_type="audio/wav")
