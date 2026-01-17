import httpx
from typing import Optional, Dict, Any
from app.core.config import settings
from app.services.llm.base import BaseLLM
import logging

logger = logging.getLogger(__name__)

class OllamaLLM(BaseLLM):
    def __init__(self):
        self.base_url = settings.OLLAMA_BASE_URL
        self.model = settings.OLLAMA_DEFAULT_MODEL

    @property
    def provider_name(self) -> str:
        return "ollama"

    async def is_available(self) -> bool:
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(f"{self.base_url}/api/tags")
                return response.status_code == 200
        except Exception:
            return False

    async def generate(self, prompt: str, **kwargs) -> str:
        model = kwargs.get("model", self.model)
        
        payload = {
            "model": model,
            "prompt": prompt,
            "stream": False
        }
        
        try:
            async with httpx.AsyncClient(timeout=60.0) as client:
                response = await client.post(f"{self.base_url}/api/generate", json=payload)
                response.raise_for_status()
                data = response.json()
                return data.get("response", "")
        except Exception as e:
            logger.error(f"Ollama generation error: {e}")
            return f"Error using Ollama: {str(e)}"
