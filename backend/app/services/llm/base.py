from abc import ABC, abstractmethod
from typing import List, Optional, Dict, Any
from pydantic import BaseModel

class LLMMessage(BaseModel):
    role: str
    content: str
    
class BaseLLM(ABC):
    @property
    @abstractmethod
    def provider_name(self) -> str:
        """Return the name of the provider."""
        pass

    @abstractmethod
    async def generate(self, prompt: str, **kwargs) -> str:
        """Generate text from a single prompt."""
        pass
    
    @abstractmethod
    async def is_available(self) -> bool:
        """Check if the provider is configured and reachable."""
        pass
