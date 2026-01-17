from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    PROJECT_NAME: str = "Mithivoices Platform"
    PROJECT_VERSION: str = "0.2.0"
    API_V1_STR: str = "/api/v1"
    
    CORS_ORIGINS: List[str] = ["http://localhost:5173", "http://localhost:3000"]
    
    # Models
    MODEL_DIR: str = "../voice_assets"
    
    # LLM
    DEFAULT_LLM_PROVIDER: str = "ollama"
    OLLAMA_BASE_URL: str = "http://localhost:11434"
    OLLAMA_DEFAULT_MODEL: str = "llama2"
    GEMINI_API_KEY: str = ""
    GEMINI_DEFAULT_MODEL: str = "gemini-pro"
    
    class Config:
        env_file = ".env"

settings = Settings()
