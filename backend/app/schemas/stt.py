from pydantic import BaseModel
from typing import Optional, List

class STTResponse(BaseModel):
    text: str
    language: str
    confidence: Optional[float] = 0.0
    duration: float
    segments: Optional[List[dict]] = None
    message: str = "Transcription successful"
