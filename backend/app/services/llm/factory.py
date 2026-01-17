from typing import Dict, Type
from app.services.llm.base import BaseLLM
from app.services.llm.ollama import OllamaLLM
from app.services.llm.gemini import GeminiLLM
from app.core.config import settings

class LLMFactory:
    _providers: Dict[str, Type[BaseLLM]] = {
        "ollama": OllamaLLM,
        "gemini": GeminiLLM
    }
    
    @classmethod
    def get_llm(cls, provider: str = None) -> BaseLLM:
        if not provider:
            provider = settings.DEFAULT_LLM_PROVIDER
        
        provider_class = cls._providers.get(provider.lower())
        if not provider_class:
            raise ValueError(f"Unknown LLM provider: {provider}")
            
        return provider_class()
    
    @classmethod
    def register_provider(cls, name: str, provider_class: Type[BaseLLM]):
        cls._providers[name] = provider_class
