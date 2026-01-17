from typing import Optional
import google.generativeai as genai
from app.core.config import settings
from app.services.llm.base import BaseLLM
import logging

logger = logging.getLogger(__name__)

class GeminiLLM(BaseLLM):
    def __init__(self):
        self._model_instance = None
        self._setup()

    def _setup(self):
        if settings.GEMINI_API_KEY:
            try:
                genai.configure(api_key=settings.GEMINI_API_KEY)
                self._model_instance = genai.GenerativeModel(settings.GEMINI_DEFAULT_MODEL)
            except Exception as e:
                logger.error(f"Failed to configure Gemini: {e}")

    @property
    def provider_name(self) -> str:
        return "gemini"

    async def is_available(self) -> bool:
        # Check if API KEY is present. 
        # A real connectivity check would ideally try a lightweight call, but for now we check config.
        return bool(settings.GEMINI_API_KEY and self._model_instance)

    async def generate(self, prompt: str, **kwargs) -> str:
        if not await self.is_available():
            return "Gemini is not configured. Please check API Key."
        
        try:
            # Note: The google-generativeai client is synchronous. 
            # In high-throughput async apps, run this in an executor. 
            # For this simplified implementation, direct call is acceptable.
            response = self._model_instance.generate_content(prompt)
            return response.text
        except Exception as e:
            logger.error(f"Gemini generation error: {e}")
            return f"Error using Gemini: {str(e)}"
