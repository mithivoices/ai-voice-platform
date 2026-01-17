from fastapi import APIRouter, HTTPException, BackgroundTasks
from fastapi.responses import FileResponse
from typing import List
import os

from app.schemas.tts import TTSRequest, TTSResponse
from app.services.tts_service import tts_service

router = APIRouter()

@router.get("/voices", response_model=List[dict])
async def list_voices():
    """List all available voices installed on the server."""
    return tts_service.get_available_voices()

@router.get("/voice/{voice_id}")
async def get_voice(voice_id: str):
    """Get details for a specific voice."""
    voice = tts_service.get_voice_details(voice_id)
    if not voice:
        raise HTTPException(status_code=404, detail="Voice not found")
    return voice

@router.post("/synthesize", response_model=TTSResponse)
async def synthesize_speech(request: TTSRequest):
    """Generate speech from text."""
    try:
        result = await tts_service.generate_audio(
            text=request.text,
            voice_id=request.voice_id,
            speed=request.speed
        )
        return TTSResponse(
            audio_url=result["url"],
            duration=result["duration"],
            message="Synthesis successful"
        )
    except ValueError as val_err:
        raise HTTPException(status_code=400, detail=str(val_err))
    except RuntimeError as run_err:
        raise HTTPException(status_code=500, detail=str(run_err))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

@router.get("/audio/{filename}")
async def get_audio_file(filename: str, background_tasks: BackgroundTasks):
    """Serve the generated audio file."""
    # Sanitize filename to prevent directory traversal
    safe_filename = os.path.basename(filename)
    file_path = tts_service.output_dir / safe_filename
    
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="Audio file not found")
        
    return FileResponse(path=file_path, media_type="audio/wav", filename=safe_filename)

