# AI Voice Platform

AI Voice Platform is a local project built as Phase One of a larger AI system.
The goal of this phase is to implement core voice features using open-source tools
and run everything locally without cloud hosting or paid services.

---

## Phase One Goals

Phase One focuses on building and validating the following features:

1. Text to Speech (TTS)  
   Convert user-provided text into audio output.

2. Speech to Text (STT)  
   Convert user-provided audio into text.

3. Combined Voice Interaction  
   Voice input → speech to text → AI response → text to speech.

Phase One is considered complete when all three features work locally.

---

## Technology Stack

- Programming Language: Python
- Backend Framework: FastAPI
- Text to Speech: Open-source TTS (Piper preferred)
- Speech to Text: Open-source Whisper
- AI Logic: Gemini API or Ollama (local)
- Frontend: HTML and JavaScript
- Execution Mode: Local only
- Version Control: GitHub

---

## Phase One Constraints

- No cloud hosting
- No payments or subscriptions
- No UI or design optimization
- No scaling or public access

The focus is strictly on functionality and learning.

---

## Project Structure

ai-voice-platform  
├── backend  
│   ├── main.py  
│   ├── tts.py  
│   ├── stt.py  
│   └── voice_chat.py  
├── frontend  
│   ├── index.html  
│   └── app.js  
├── requirements.txt  
├── progress.md  
└── README.md  

---

## Current Status

Phase One is currently in progress.
Development is focused on implementing core voice features locally.

---

## Next Steps

- Implement Text to Speech (TTS)
- Implement Speech to Text (STT)
- Implement combined voice interaction
- Stabilize and test all features locally

UI improvements and deployment will be considered only after Phase One is complete.
