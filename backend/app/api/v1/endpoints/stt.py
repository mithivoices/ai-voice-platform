from fastapi import APIRouter, UploadFile, File, HTTPException
from typing import List

from app.schemas.stt import STTResponse
from app.services.stt_service import stt_service

router = APIRouter()

@router.post("/transcribe", response_model=STTResponse)
async def transcribe_audio(file: UploadFile = File(...)):
    """
    Upload an audio file (WAV, MP3, M4A) to transcribe.
    """
    if not file:
        raise HTTPException(status_code=400, detail="No file uploaded")
        
    # Basic extension check
    allowed_exts = {".wav", ".mp3", ".m4a", ".ogg", ".flac"}
    import os
    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in allowed_exts:
        raise HTTPException(status_code=400, detail=f"Unsupported file format. Allowed: {allowed_exts}")

    try:
        content = await file.read()
        
        # Determine duration (mock for now, or use audioread/pydub if strictly needed)
        # For real duration, we'd inspect the file header.
        duration = 0.0 

        result = await stt_service.transcribe(content, file.filename)
        
        return STTResponse(
            text=result["text"],
            language=result["language"],
            confidence=result.get("confidence", 0.0),
            duration=duration, # Placeholder
            segments=result.get("segments"),
            message="Transcription successful"
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
