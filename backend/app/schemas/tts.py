from pydantic import BaseModel
from typing import Optional

class TTSRequest(BaseModel):
    text: str
    voice_id: str
    language: str = "en_US"
    speed: float = 1.0

class TTSResponse(BaseModel):
    audio_url: str
    duration: float
    message: str
