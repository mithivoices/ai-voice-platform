# Multi-LLM Implementation Script
# Adds Ollama + Gemini support with easy model switching

import os
from pathlib import Path

print("🤖 Multi-LLM Implementation - Ollama + Gemini")
print("=" * 60)
print("")

BACKEND_DIR = Path("backend")

# Step 1: Create LLM module structure
print("📁 Step 1: Creating LLM module structure...")

llm_dirs = [
    "app/services/llm",
]

for dir_path in llm_dirs:
    full_path = BACKEND_DIR / dir_path
    full_path.mkdir(parents=True, exist_ok=True)
    (full_path / "__init__.py").touch()
    print(f"  ✅ Created: {dir_path}")

print("")

# Step 2: Create base LLM interface
print("📝 Step 2: Creating base LLM interface...")

base_llm_code = """\"\"\"
Base LLM interface - Abstract class for all LLM providers
\"\"\"
from abc import ABC, abstractmethod
from typing import Optional, Dict, List, Any
from pydantic import BaseModel

class LLMMessage(BaseModel):
    \"\"\"Standard message format\"\"\"
    role: str  # "user", "assistant", "system"
    content: str

class LLMResponse(BaseModel):
    \"\"\"Standard response format\"\"\"
    content: str
    model: str
    provider: str
    tokens_used: Optional[int] = None
    metadata: Dict[str, Any] = {}

class BaseLLM(ABC):
    \"\"\"Abstract base class for LLM providers\"\"\"

    def __init__(self, model: str, **kwargs):
        self.model = model
        self.config = kwargs

    @abstractmethod
    async def generate(
        self,
        prompt: str,
        system_prompt: Optional[str] = None,
        temperature: float = 0.7,
        max_tokens: Optional[int] = None,
        **kwargs
    ) -> LLMResponse:
        \"\"\"Generate a response from the LLM\"\"\"
        pass

    @abstractmethod
    async def chat(
        self,
        messages: List[LLMMessage],
        temperature: float = 0.7,
        max_tokens: Optional[int] = None,
        **kwargs
    ) -> LLMResponse:
        \"\"\"Multi-turn chat conversation\"\"\"
        pass

    @abstractmethod
    async def is_available(self) -> bool:
        \"\"\"Check if the provider is available and configured\"\"\"
        pass

    @abstractmethod
    def get_available_models(self) -> List[str]:
        \"\"\"Get list of available models for this provider\"\"\"
        pass

    @property
    @abstractmethod
    def provider_name(self) -> str:
        \"\"\"Return the provider name\"\"\"
        pass
"""

with open(BACKEND_DIR / "app/services/llm/base.py", 'w', encoding='utf-8') as f:
    f.write(base_llm_code)
print("  ✅ Created: app/services/llm/base.py")

# Continue with remaining files...
print("")
print("=" * 60)
print("✅ Multi-LLM base created!")
print("")
