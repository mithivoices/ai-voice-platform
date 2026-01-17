# VoxAI Backend - Python FastAPI

Text-to-Speech API server using Piper TTS.

## Quick Start

```bash
# From project root
python -m uvicorn backend.app.main:app --port 8000
```

## API Endpoints

| Endpoint            | Method | Description              |
| ------------------- | ------ | ------------------------ |
| `/health`           | GET    | Health check             |
| `/api/voices`       | GET    | List available voices    |
| `/api/languages`    | GET    | List supported languages |
| `/api/tts/generate` | POST   | Generate speech audio    |

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   └── main.py      # FastAPI server (use this)
├── llm/             # LLM integration (optional)
├── config.py        # Configuration
├── tts.py           # Piper TTS wrapper
├── stt.py           # Speech-to-text (optional)
└── main.py          # Legacy (not used)
```

## Usage

### Generate Audio

```bash
curl -X POST http://localhost:8000/api/tts/generate \
  -H "Content-Type: application/json" \
  -d '{"text":"Hello world","voiceId":"aria-professional","languageCode":"en-US"}'
```

## Requirements

- Python 3.11+
- Piper TTS installed (`piper` command available)
- Voice models in `models/tts/`
