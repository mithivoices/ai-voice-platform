import os
from pathlib import Path

# --- Configuration ---
PROJECT_ROOT = Path("c:/Projects/ai-voice-platform")
BACKEND_ROOT = PROJECT_ROOT / "backend"

# --- Helper Functions ---
def create_file(path_str, content):
    path = BACKEND_ROOT / path_str
    if not path.parent.exists():
        path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"✅ Created/Updated: {path_str}")

def main():
    print("🚀 TTS Migration - Iteration 1")
    print("============================================================")

    # 1. app/services/tts_service.py
    print("\n📝 Creating complete TTS service...")
    tts_service_code = r'''import os
import shutil
import subprocess
import uuid
import json
import logging
import wave
import contextlib
from pathlib import Path
from typing import List, Optional, Dict, Any

from app.core.config import settings

logger = logging.getLogger(__name__)

class TTSService:
    def __init__(self):
        self.output_dir = Path("outputs")
        self.output_dir.mkdir(exist_ok=True)
        
        # Resolve model directory
        self.model_dir = Path(settings.MODEL_DIR)
        if not self.model_dir.is_absolute():
            # If relative, make it relative to the backend root or project root
            # Assuming settings.MODEL_DIR is "../voice_assets" relative to backend/
            self.model_dir = (Path(__file__).parent.parent.parent / settings.MODEL_DIR).resolve()
            
        logger.info(f"TTS Service initialized. Models dir: {self.model_dir}, Outputs dir: {self.output_dir}")
        self._voice_cache: Dict[str, Dict[str, Any]] = {}
        self.piper_path = shutil.which("piper") or "piper"

    def _get_audio_duration(self, file_path: str) -> float:
        """Calculate duration of a WAV file."""
        try:
            with contextlib.closing(wave.open(file_path, 'r')) as f:
                frames = f.getnframes()
                rate = f.getframerate()
                return frames / float(rate)
        except Exception as e:
            logger.error(f"Error calculating duration for {file_path}: {e}")
            return 0.0

    def get_available_voices(self) -> List[Dict[str, Any]]:
        """
        Scans the model directory for .onnx files and returns metadata.
        """
        voices = []
        if not self.model_dir.exists():
            logger.warning(f"Model directory not found: {self.model_dir}")
            return voices

        # Walk through the model directory to find .onnx files
        for root, dirs, files in os.walk(self.model_dir):
            for file in files:
                if file.endswith(".onnx"):
                    model_path = Path(root) / file
                    config_path = model_path.with_suffix(".onnx.json")
                    
                    voice_id = file.replace(".onnx", "")
                    
                    voice_data = {
                        "id": voice_id,
                        "name": voice_id,
                        "language": "en_US", # Default
                        "quality": "medium",
                        "model_path": str(model_path),
                        "config_path": str(config_path) if config_path.exists() else None
                    }

                    # Try to load metadata from JSON
                    if config_path.exists():
                        try:
                            with open(config_path, "r", encoding="utf-8") as f:
                                config = json.load(f)
                                # Extract language if available
                                if "language" in config:
                                    voice_data["language"] = config["language"].get("code", "en_US")
                                # Extract simpler name if possible
                                voice_data["name"] = config.get("dataset", voice_id)
                        except Exception as e:
                            logger.error(f"Failed to load config for {voice_id}: {e}")

                    voices.append(voice_data)
                    self._voice_cache[voice_id] = voice_data
        
        return voices

    def get_voice_details(self, voice_id: str) -> Optional[Dict[str, Any]]:
        if not self._voice_cache:
            self.get_available_voices()
        return self._voice_cache.get(voice_id)

    async def generate_audio(self, text: str, voice_id: str, speed: float = 1.0) -> Dict[str, Any]:
        """
        Synthesizes audio using Piper.
        Returns dictionary with 'path' (relative URL) and 'duration'.
        """
        if not text:
            raise ValueError("Text cannot be empty")

        # Refresh voices if cache is empty or voice not found
        if not self._voice_cache or voice_id not in self._voice_cache:
            self.get_available_voices()

        voice = self._voice_cache.get(voice_id)
        if not voice:
            raise ValueError(f"Voice '{voice_id}' not found. Please check available voices.")

        model_path = voice["model_path"]
        
        # Generate generic filename
        filename = f"{uuid.uuid4()}.wav"
        output_file_path = self.output_dir / filename
        
        cmd = [
            self.piper_path,
            "--model", model_path,
            "--output_file", str(output_file_path),
            "--length_scale", str(1.0 / speed) # Piper uses length_scale (inverse of speed)
        ]

        logger.info(f"Running synthesis: {' '.join(cmd)}")
        
        try:
            # Piper expects input from stdin
            process = subprocess.Popen(
                cmd, 
                stdin=subprocess.PIPE, 
                stdout=subprocess.PIPE, 
                stderr=subprocess.PIPE,
                text=True
            )
            stdout, stderr = process.communicate(input=text)
            
            if process.returncode != 0:
                logger.error(f"Piper validation error: {stderr}")
                raise RuntimeError(f"Piper failed: {stderr}")
                
            if not output_file_path.exists() or output_file_path.stat().st_size == 0:
                 raise RuntimeError("Piper executed but no audio file was generated.")

            duration = self._get_audio_duration(str(output_file_path))

            return {
                "filename": filename,
                "url": f"/outputs/{filename}",
                "path": str(output_file_path),
                "duration": duration
            }

        except FileNotFoundError:
             raise RuntimeError("Piper executable not found. Please ensure 'piper' is installed and in PATH.")
        except Exception as e:
            logger.error(f"Synthesis failed: {e}")
            raise e

tts_service = TTSService()
'''
    create_file("app/services/tts_service.py", tts_service_code)

    # 2. app/api/v1/endpoints/tts.py
    print("\n📝 Updating TTS endpoints...")
    endpoints_code = r'''from fastapi import APIRouter, HTTPException, BackgroundTasks
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

'''
    create_file("app/api/v1/endpoints/tts.py", endpoints_code)

    print("\n============================================================")
    print("✅ TTS Migration Complete!")
    print("\n🎯 What was migrated:")
    print("  ✅ Complete Piper TTS integration")
    print("  ✅ Voice discovery and loading")
    print("  ✅ Audio synthesis with error handling")
    print("  ✅ RESTful API endpoints")

if __name__ == "__main__":
    main()
