# Multi-LLM Implementation Guide

## Overview
This implements a flexible multi-provider LLM system supporting:
- **Ollama** (local models)
- **Gemini** (Google AI)
- Easy to extend (OpenAI, Claude, etc.)

## Architecture

```
app/services/llm/
├── __init__.py          # Module exports
├── base.py             # Abstract LLM interface
├── ollama.py           # Ollama provider
├── gemini.py           # Gemini provider
└── factory.py          # Provider factory

app/services/
└── llm_service.py      # High-level service
```

## Configuration (.env)

```env
# Default provider
DEFAULT_LLM_PROVIDER=ollama

# Ollama settings
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_DEFAULT_MODEL=llama2

# Gemini settings  
GEMINI_API_KEY=your_key_here
GEMINI_DEFAULT_MODEL=gemini-pro
```

## Usage Examples

### Basic Generation
```python
from app.services.llm_service import LLMService

# Use Ollama (local)
llm = LLMService(provider="ollama", model="llama2")
response = await llm.generate("Tell me a joke")

# Use Gemini (cloud)
llm = LLMService(provider="gemini", model="gemini-pro")
response = await llm.generate("Explain quantum computing")
```

### Multi-turn Chat
```python
from app.services.llm.base import LLMMessage

messages = [
    LLMMessage(role="system", content="You are a helpful assistant"),
    LLMMessage(role="user", content="Hello!"),
    LLMMessage(role="assistant", content="Hi! How can I help?"),
    LLMMessage(role="user", content="Tell me about AI"),
]

response = await llm.chat(messages)
```

### API Endpoint (Voice Chat)
```python
@router.post("/voice-chat")
async def voice_chat(
    audio: UploadFile,
    llm_provider: str = "ollama",
    llm_model: Optional[str] = None
):
    # 1. Transcribe audio
    transcript = await stt_service.transcribe(audio)

    # 2. Get LLM response
    llm = LLMService(provider=llm_provider, model=llm_model)
    response = await llm.generate(transcript)

    # 3. Synthesize to audio
    audio_file = await tts_service.synthesize(response)

    return {"transcript": transcript, "response": response, "audio": audio_file}
```

## Adding New Providers

1. **Create provider class** (e.g., `openai.py`):
```python
from app.services.llm.base import BaseLLM, LLMResponse

class OpenAILLM(BaseLLM):
    @property
    def provider_name(self) -> str:
        return "openai"

    async def generate(self, prompt: str, **kwargs) -> LLMResponse:
        # Implementation here
        pass
```

2. **Register in factory** (`factory.py`):
```python
from app.services.llm.openai import OpenAILLM

LLMFactory.register_provider("openai", OpenAILLM)
```

3. **Done!** Now use it:
```python
llm = LLMService(provider="openai", model="gpt-4")
```

## Dependencies

```txt
# Add to requirements.txt
httpx>=0.24.0          # For Ollama HTTP calls
google-generativeai>=0.3.0  # For Gemini
```

## Testing

```python
# Test Ollama
llm = LLMService(provider="ollama")
available = await llm.is_available()  # Check if running
models = llm.get_available_models()   # List models

# Test Gemini
llm = LLMService(provider="gemini")
available = await llm.is_available()  # Check API key
```

## Next Steps

1. Run implementation script
2. Update config.py with new settings
3. Update requirements.txt
4. Update voice_chat endpoint
5. Test with both providers
