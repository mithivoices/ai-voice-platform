import os
import shutil
import datetime
from pathlib import Path

# --- Configuration ---
PROJECT_ROOT = Path("c:/Projects/ai-voice-platform")
BACKEND_ROOT = PROJECT_ROOT / "backend"
BACKUP_DIR = PROJECT_ROOT / f"backend_backup_{datetime.datetime.now().strftime('%Y%m%d_%H%M%S')}"

# Define the new structure
NEW_STRUCTURE = [
    "app",
    "app/api",
    "app/api/v1",
    "app/api/v1/endpoints",
    "app/core",
    "app/services",
    "app/schemas",
    "tests"
]

# --- Helper Functions ---
def create_file(path_str, content):
    path = BACKEND_ROOT / path_str
    if not path.parent.exists():
        path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"✅ Created: {path_str}")

def log(msg):
    print(f"\n➤ {msg}")

# --- Main Refactoring Logic ---
def main():
    log(f"Starting Refactoring...")
    
    # 1. Backup
    log(f"Creating Backup at: {BACKUP_DIR}")
    if BACKEND_ROOT.exists():
        shutil.copytree(BACKEND_ROOT, BACKUP_DIR)
    else:
        print(f"Error: {BACKEND_ROOT} does not exist!")
        return

    # 2. Create Directory Structure
    log("Creating Directory Structure...")
    for folder in NEW_STRUCTURE:
        (BACKEND_ROOT / folder).mkdir(parents=True, exist_ok=True)

    # 3. Generate Files
    
    # --- app/__init__.py ---
    create_file("app/__init__.py", "")
    
    # --- app/main.py ---
    main_py_content = """import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1.router import api_router

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.PROJECT_VERSION,
    description="Professional AI Voice Platform API"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Router
app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/health", tags=["System"])
async def health_check():
    return {"status": "healthy", "version": settings.PROJECT_VERSION}

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
"""
    create_file("app/main.py", main_py_content)

    # --- app/core/config.py ---
    config_py_content = """from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    PROJECT_NAME: str = "Mithivoices Platform"
    PROJECT_VERSION: str = "0.2.0"
    API_V1_STR: str = "/api/v1"
    
    CORS_ORIGINS: List[str] = ["http://localhost:5173", "http://localhost:3000"]
    
    # Models
    MODEL_DIR: str = "../voice_assets"
    
    class Config:
        env_file = ".env"

settings = Settings()
"""
    create_file("app/core/config.py", config_py_content)
    
    # --- app/core/logging_config.py ---
    logging_content = """import logging
from app.core.config import settings

def setup_logging():
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    )
"""
    create_file("app/core/logging_config.py", logging_content)

    # --- app/schemas/tts.py ---
    schemas_tts_content = """from pydantic import BaseModel
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
"""
    create_file("app/schemas/tts.py", schemas_tts_content)

    # --- app/services/tts_service.py ---
    tts_service_content = """import os
import subprocess
import uuid
from pathlib import Path
from app.core.config import settings
from app.schemas.tts import TTSRequest

class TTSService:
    def __init__(self):
        self.output_dir = Path("outputs")
        self.output_dir.mkdir(exist_ok=True)
        self.model_dir = Path(settings.MODEL_DIR)

    async def generate_audio(self, request: TTSRequest) -> str:
        # Mocking generation for structure demonstration
        # Real implementation will move here from old tts.py
        
        file_name = f"{uuid.uuid4()}.wav"
        output_path = self.output_dir / file_name
        
        # Determine model path logic here
        
        # Run Piper (simulation)
        # subprocess.run(...)
        
        return f"/outputs/{file_name}"

tts_service = TTSService()
"""
    create_file("app/services/tts_service.py", tts_service_content)

    # --- app/api/v1/endpoints/tts.py ---
    endpoint_tts_content = """from fastapi import APIRouter, HTTPException
from app.schemas.tts import TTSRequest, TTSResponse
from app.services.tts_service import tts_service

router = APIRouter()

@router.post("/generate", response_model=TTSResponse)
async def generate_speech(request: TTSRequest):
    try:
        audio_path = await tts_service.generate_audio(request)
        return TTSResponse(
            audio_url=audio_path,
            duration=0.0,
            message="SUCCESS"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
"""
    create_file("app/api/v1/endpoints/tts.py", endpoint_tts_content)

    # --- app/api/v1/router.py ---
    router_content = """from fastapi import APIRouter
from app.api.v1.endpoints import tts

api_router = APIRouter()
api_router.include_router(tts.router, prefix="/tts", tags=["Text-to-Speech"])
# api_router.include_router(stt.router, prefix="/stt", tags=["Speech-to-Text"])
"""
    create_file("app/api/v1/router.py", router_content)
    
    # --- requirements.txt ---
    req_content = """fastapi>=0.109.0
uvicorn>=0.27.0
pydantic>=2.5.0
pydantic-settings>=2.1.0
python-multipart>=0.0.6
scipy>=1.11.0
numpy>=1.26.0
onnxruntime>=1.16.0
pytest>=7.4.0
pytest-asyncio>=0.23.0
httpx>=0.26.0
"""
    create_file("requirements.txt", req_content)

    # --- Dockerfile ---
    dockerfile_content = """FROM python:3.10-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    espeak-ng \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["python", "app/main.py"]
"""
    create_file("Dockerfile", dockerfile_content)

    # --- docker-compose.yml ---
    docker_compose_content = """version: '3.8'

services:
  backend:
    build: .
    ports:
      - "8000:8000"
    volumes:
      - .:/app
      - ../voice_assets:/voice_assets
      - ../outputs:/outputs
    environment:
      - MODEL_DIR=/voice_assets
"""
    create_file("docker-compose.yml", docker_compose_content)

    log("Refactoring Complete! 🚀")
    print(f"Backup saved to: {BACKUP_DIR}")
    print("\nNext steps:")
    print("1. cd backend")
    print("2. pip install -r requirements.txt")
    print("3. python -m app.main")

if __name__ == "__main__":
    main()
