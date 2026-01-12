\# VoxAI - AI Voice Platform

\## Product Requirements Document (PRD)



---



\## 📋 Project Overview



\*\*Project Name:\*\* VoxAI - AI Voice Platform  

\*\*Repository:\*\* https://github.com/Aryanpanwar10005/ai-voice-platform  

\*\*Version:\*\* 1.0  

\*\*Last Updated:\*\* January 14, 2026  

\*\*Document Owner:\*\* Aryan Panwar



---



\## 🎯 Product Vision



VoxAI is a local-first AI voice platform that transforms text into lifelike AI-generated voices and transcribes speech to text using open-source technologies. The platform prioritizes privacy, performance, and professional-grade audio quality while running entirely on local infrastructure.



---



\## 👥 Target Users



\### Primary Users

\- \*\*Content Creators\*\* - YouTubers, podcasters needing voiceovers

\- \*\*Developers\*\* - Integrating voice features into applications

\- \*\*Educators\*\* - Creating educational audio content

\- \*\*Businesses\*\* - Professional narration for presentations



\### User Personas

\*\*Persona 1: Alex Rivera - Pro Creator\*\*

\- Age: 28-35

\- Role: Content creator / Video producer

\- Needs: High-quality voiceovers, fast turnaround

\- Pain Points: Expensive voice actor fees, time constraints

\- Goal: Generate professional voiceovers quickly



---



\## ✨ Core Features



\### 1. Text-to-Speech (TTS)

\*\*Priority:\*\* P0 (Must Have)



\#### User Stories

\- As a content creator, I want to convert my script into natural-sounding speech so that I can create voiceovers quickly

\- As a user, I want to adjust voice parameters (speed, pitch, stability) so that I can customize the audio output

\- As a user, I want to preview audio before downloading so that I can verify quality



\#### Functional Requirements

\- Input text area with 5,000 character limit

\- Real-time character counter (e.g., "123 / 5000")

\- Voice profile selector with options:

&nbsp; - Aria - Professional (Neutral, Narrative)

&nbsp; - Multiple voice profiles available

&nbsp; - \*\*Note:\*\* Voice profiles map to predefined Piper voices and presets (e.g., `en\_US-lessac-medium`)

\- Language selector (default: English US)

\- Voice parameter controls:

&nbsp; - \*\*Speed:\*\* 0.5x to 2.0x (default: 1.0x)

&nbsp; - \*\*Pitch:\*\* -5 to +5 (default: 0)

&nbsp; - \*\*Stability:\*\* 0% to 100% (default: 75%)

\- "Generate Speech" button with loading state

\- Audio waveform visualization (blue/gray bars)

\- Audio player controls (play/pause/seek)

\- Download audio button (.wav format)



\#### Technical Requirements

\- Backend: POST `/tts` endpoint

\- Request format: `{text: string, voice: string, speed: float, pitch: int}`

\- Response: Audio WAV file (blob)

\- Uses Piper TTS engine locally

\- Model: `en\_US-lessac-medium.onnx`



\#### UI Components

\- Large textarea with light gray background (#F8FAFC)

\- Range sliders with blue accent (#2563EB)

\- Professional card-based layout

\- Responsive grid (2-column for voice/language, 3-column for parameters)

\- Waveform with played (blue) and unplayed (gray) bars



---



\### 2. Speech-to-Text (STT)

\*\*Priority:\*\* P0 (Must Have)



\#### User Stories

\- As a user, I want to record audio directly in the browser so that I can transcribe my voice

\- As a user, I want to upload audio files so that I can transcribe existing recordings

\- As a user, I want to copy transcribed text so that I can use it elsewhere



\#### Functional Requirements

\- Record button with visual indicator (red when active)

\- Stop recording button

\- File upload with drag-and-drop support

\- Supported formats: .mp3, .wav, .m4a, .webm

\- Live transcription display (read-only textarea)

\- "Copy Text" button

\- Character count display

\- Clear transcription button



\#### Technical Requirements

\- Backend: POST `/stt` endpoint

\- Request format: FormData with audio file

\- Response: `{text: "transcribed text"}`

\- Uses Whisper (base model) locally

\- Browser MediaRecorder API for recording



\#### UI Components

\- Microphone button with recording animation

\- Dropzone with hover effects

\- Transcription display area

\- Action buttons (Copy, Clear)



---



\### 3. Voice Chat (Combined Voice Interaction)

\*\*Priority:\*\* P1 (Should Have)



\#### User Stories

\- As a user, I want to have a conversation with AI using voice so that I can interact naturally

\- As a user, I want to see conversation history so that I can track the dialogue



\#### Functional Requirements

\- Push-to-talk voice recording

\- Automatic transcription of user input

\- AI response generation (via Ollama LLM)

\- Text-to-speech of AI response

\- Auto-play AI audio response

\- Conversation history display (user/assistant messages)

\- Clear conversation button



\#### Technical Requirements

\- Backend: POST `/voice-chat` endpoint

\- Request: FormData with audio file

\- Response: `{transcription: string, ai\_response: string, audio\_url: string}`

\- Uses Llama3 model via Ollama

\- Chain: STT → LLM → TTS



---



\### 4. Audio History Panel

\*\*Priority:\*\* P1 (Should Have)



\#### Features

\- Right sidebar showing recent audio generations

\- Display format:

&nbsp; - Audio file name (e.g., "Enterprise\_Pitch\_V2")

&nbsp; - Timestamp (e.g., "2 mins ago")

&nbsp; - Duration (e.g., "0:43s")

&nbsp; - Text preview (first line, truncated)

\- Actions per item:

&nbsp; - Play Preview button

&nbsp; - Download button

&nbsp; - More options menu (delete, rename)

\- "View all" link to full history page



\#### Audio Persistence Rules

\*\*When audio is saved to history:\*\*

\- ✅ \*\*Auto-saved after successful generation\*\* via "Generate Speech" button

\- ✅ \*\*Edited audio replaces previous version\*\* only after clicking "Apply Changes"

\- ✅ \*\*Download action does NOT create new history entry\*\* (just downloads existing)

\- ✅ \*\*Failed generations are NOT saved\*\* to history



\*\*Storage Location:\*\* 

\- \*\*Phase 2:\*\* Local browser storage (UI-level only, does not persist across page reloads)

\- \*\*Phase 3:\*\* Filesystem with database persistence



\*\*History Limit:\*\* 

\- Phase 2: Last 50 items (in-memory, session-only)

\- Phase 3: Unlimited with database persistence



---



\### 5. Edit Mode \& Audio Trimming

\*\*Priority:\*\* P2 (Nice to Have)



\#### Features

\- Visual waveform editor

\- Drag handles to select audio portion

\- Real-time preview of selection

\- Apply/Cancel changes

\- Buttons:

&nbsp; - Trim Audio

&nbsp; - Regenerate

&nbsp; - Adjust Voice

\- Edit mode indicator banner (blue)

\- Disabled download until changes applied



\#### Technical Behavior

\*\*Important:\*\* Trimming is \*\*non-destructive UI-level editing\*\* and does not regenerate audio unless explicitly requested via "Regenerate" button.



\*\*Edit Mode Flow:\*\*

1\. User clicks "Edit" on generated audio

2\. Waveform becomes editable with drag handles

3\. User selects portion to keep (visual only)

4\. Preview plays selected portion

5\. User clicks "Apply Changes"

6\. Frontend trims audio file locally (no backend call)

7\. Trimmed audio replaces original in history

8\. Only "Regenerate" button calls `/tts` again



This approach:

\- Keeps edit mode lightweight

\- Prevents unnecessary backend load

\- Aligns with local-first philosophy



---



\## 🎨 Design System



\### Color Palette

```

Primary Blue: #2563EB

Primary Hover: #1D4ED8

Sidebar Active BG: #DBEAFE

Sidebar Active Text: #1E40AF

Border Slate: #CBD5E1

Background Light Gray: #F8FAFC

Text Slate: #1E293B

Waveform Played: #3B82F6

Waveform Unplayed: #E2E8F0

Orange Accent: #F59E0B (Credits indicator)

Success Green: #10B981

Danger Red: #EF4444

```



\### Credits System (Phase 2 Note)

\*\*Important:\*\* The credits system visible in the UI is \*\*mocked/static\*\* in Phase 2:

\- Credits display shows fixed value (e.g., "1,250 credits")

\- Usage percentage is hardcoded (82%)

\- No enforcement logic implemented

\- No credits are actually deducted

\- "Upgrade Plan" button is disabled/non-functional



\*\*Phase 3 Implementation:\*\* Real credits will be tracked in database with actual usage deduction.



\### Typography

\- Font Family: Inter (Google Fonts)

\- Headings: Bold, 600-700 weight

\- Body: Regular, 400 weight

\- Small text: 10px-12px uppercase with tracking



\### Layout

\- \*\*Sidebar:\*\* 240px fixed width

\- \*\*Main Content:\*\* Flexible with max-width: 1024px centered

\- \*\*Right Panel:\*\* 300px fixed width

\- \*\*Spacing:\*\* 8px base unit, multiples of 8

\- \*\*Border Radius:\*\* 12px default

\- \*\*Cards:\*\* White background, border, shadow-sm



\### Icons

\- Library: Material Symbols Outlined

\- Size: 20px default, 24px for primary actions

\- Style: Outlined (not filled)



---



\## 🔌 API Specifications



\### Backend Base URL

\- \*\*Local:\*\* `http://127.0.0.1:8000`

\- \*\*Production:\*\* `https://api.voxai.yourdomain.com` (Oracle Cloud)



\### Endpoints



\#### 1. Health Check

```

GET /

Response: {"status": "online", "message": "AI Voice Platform API is running"}

```



\#### 2. Text-to-Speech

```

POST /tts

Headers: Content-Type: application/json

Body: {

&nbsp; "text": "Hello world",

&nbsp; "voice": "default",

&nbsp; "speed": 1.0,

&nbsp; "pitch": 0

}

Response: Audio file (audio/wav)

```



\#### 3. Speech-to-Text

```

POST /stt

Headers: Content-Type: multipart/form-data

Body: FormData with 'audio' file

Response: {"text": "transcribed text"}

```



\#### 4. Voice Chat

```

POST /voice-chat

Headers: Content-Type: multipart/form-data

Body: FormData with 'audio' file

Response: {

&nbsp; "transcription": "user's question",

&nbsp; "ai\_response": "AI's answer",

&nbsp; "audio\_url": "http://127.0.0.1:8000/audio/abc123\_output.wav"

}

```



\#### 5. Get Audio File

```

GET /audio/{filename}

Response: Audio file (audio/wav)

```



---



\## 🔧 Technical Stack



\### Frontend

\- \*\*Framework:\*\* React 18 with TypeScript

\- \*\*Build Tool:\*\* Vite

\- \*\*Styling:\*\* Tailwind CSS

\- \*\*Icons:\*\* Lucide React / Material Symbols

\- \*\*HTTP Client:\*\* Fetch API (native)

\- \*\*Audio:\*\* HTMLAudioElement, MediaRecorder API



\### Backend

\- \*\*Framework:\*\* FastAPI (Python)

\- \*\*Server:\*\* Uvicorn

\- \*\*TTS Engine:\*\* Piper (local)

\- \*\*STT Engine:\*\* OpenAI Whisper (base model)

\- \*\*LLM:\*\* Ollama with Llama3

\- \*\*Storage:\*\* Local filesystem (`outputs/` directory)



\### Infrastructure

\- \*\*Development:\*\* Local Windows/Mac/Linux

\- \*\*Production:\*\* Oracle Cloud (planned)

\- \*\*Database:\*\* None (file-based storage)

\- \*\*CDN:\*\* None (direct file serving)



---



\## 📊 Success Metrics



\### Key Performance Indicators (KPIs)

1\. \*\*TTS Generation Time:\*\* < 3 seconds for 500 characters

2\. \*\*STT Accuracy:\*\* > 90% for clear audio

3\. \*\*Audio Quality:\*\* Professional grade (44.1kHz, 16-bit)

4\. \*\*System Uptime:\*\* 99.5% availability

5\. \*\*User Satisfaction:\*\* > 4.5/5 rating



\### Analytics to Track

\- Number of TTS generations per day

\- Average text length processed

\- Voice profile popularity

\- Audio downloads per user

\- Feature usage breakdown (TTS vs STT vs Voice Chat)



---



\## 🚀 Development Phases



\### Phase 1 (Current - MVP) ✅

\- \[x] Basic TTS functionality

\- \[x] Basic STT functionality

\- \[x] Voice Chat feature

\- \[x] Local backend setup

\- \[x] Command-line interface



\### Phase 2 (In Progress) 🚧

\- \[ ] Professional UI (VoxAI design)

\- \[ ] Audio history panel

\- \[ ] Waveform visualization

\- \[ ] Parameter controls (speed, pitch, stability)

\- \[ ] Multiple voice profiles

\- \[ ] API status indicator



\### Phase 3 (Planned) 📅

\- \[ ] Edit mode \& audio trimming

\- \[ ] User authentication

\- \[ ] Cloud storage integration

\- \[ ] Usage credits system

\- \[ ] Upgrade plan / subscription

\- \[ ] Mobile responsive design



\### Phase 4 (Future) 🔮

\- \[ ] Voice cloning

\- \[ ] Batch processing

\- \[ ] API for developers

\- \[ ] Plugin marketplace

\- \[ ] Real-time collaboration

\- \[ ] Multiple language support



---



\## 🔒 Security \& Privacy



\### Data Privacy

\- All processing happens locally (no data sent to cloud)

\- Audio files stored locally in `outputs/` directory

\- No user tracking or analytics by default

\- GDPR compliant by design



\### Security Measures

\- CORS enabled with specific origins

\- File path validation (prevent directory traversal)

\- Input validation and sanitization

\- Rate limiting on API endpoints

\- File size limits (5MB per audio file)



---



\## 📱 Screen Inventory



\### 1. Dashboard (Home)

\- Overview of recent activity

\- Quick access to all features

\- Usage statistics



\### 2. Text-to-Speech

\- Main input area (5000 char limit)

\- Voice profile selector

\- Language selector

\- Parameter controls (speed, pitch, stability)

\- Generate button

\- Audio player with waveform

\- Download button



\### 3. Speech-to-Text

\- Record button with animation

\- File upload dropzone

\- Transcription display

\- Copy/Clear buttons



\### 4. Voice Chat

\- Message-based interface

\- User voice input

\- AI text + audio responses

\- Conversation history



\### 5. Voice Lab

\- Advanced voice customization

\- Voice profile management

\- Custom voice creation (future)



\### 6. Settings

\- API endpoint configuration

\- Audio quality settings

\- Storage management

\- Theme preferences

\- Account settings (future)



---



\## 🎯 Out of Scope (Phase 1)



The following features are explicitly \*\*NOT\*\* included in Phase 1:

\- User authentication/accounts

\- Cloud hosting

\- Payment/subscription system

\- Mobile apps (iOS/Android)

\- Real-time collaboration

\- Voice cloning

\- Multiple language support beyond English

\- Advanced audio editing (effects, filters)

\- API for third-party developers



---



\## 🚫 Non-Goals



VoxAI is intentionally \*\*NOT\*\*:

\- ❌ A Digital Audio Workstation (DAW) - We focus on voice generation, not music production

\- ❌ A Cloud SaaS Platform (yet) - Phase 1-2 prioritize local-first, privacy-focused operation

\- ❌ Multi-User Concurrent System - Single-user workflow optimized for local hardware

\- ❌ Real-Time Collaboration Tool - Designed for individual content creators

\- ❌ Voice Acting Replacement - Tool for creators, not a substitute for professional voice talent

\- ❌ Enterprise Team Software - Personal productivity tool first, team features later



---



\## 🐛 Known Limitations



1\. \*\*Browser Compatibility:\*\* MediaRecorder API requires modern browsers

2\. \*\*Audio Quality:\*\* Limited by Piper model size (medium)

3\. \*\*STT Accuracy:\*\* Whisper base model may struggle with accents

4\. \*\*Performance:\*\* Processing speed depends on local hardware

5\. \*\*Storage:\*\* No automatic cleanup of old audio files

6\. \*\*Concurrency:\*\* Single-user, no multi-user support

7\. \*\*Request Queue:\*\* Max concurrent request = 1 (requests are processed sequentially to prevent system overload)



\### Performance Guardrails

\- \*\*Max Concurrent Requests:\*\* 1 per session

\- \*\*Queue Behavior:\*\* Additional requests wait in browser queue

\- \*\*Timeout:\*\* 30 seconds per request

\- \*\*Hardware Requirements:\*\* 

&nbsp; - Minimum: 4GB RAM, dual-core CPU

&nbsp; - Recommended: 8GB RAM, quad-core CPU



---



\## 🔄 Audio Generation State Flow



```

┌─────────┐

│  IDLE   │ (No audio generated yet)

└────┬────┘

&nbsp;    │ User clicks "Generate Speech"

&nbsp;    ↓

┌──────────┐

│GENERATING│ (Loading spinner, disabled buttons)

└────┬─────┘

&nbsp;    │ TTS completes

&nbsp;    ↓

┌──────────┐

│GENERATED │ (Audio ready, can play/download)

└────┬─────┘

&nbsp;    │ User clicks "Edit" (optional)

&nbsp;    ↓

┌──────────┐

│EDIT MODE │ (Waveform editable, drag handles visible)

└────┬─────┘

&nbsp;    │ User clicks "Apply Changes"

&nbsp;    ↓

┌──────────┐

│ APPLIED  │ (Changes saved, returns to GENERATED state)

└────┬─────┘

&nbsp;    │ User clicks "Download"

&nbsp;    ↓

┌──────────┐

│DOWNLOADED│ (File saved locally, stays in GENERATED state)

└──────────┘



States:

\- IDLE: Initial state, empty audio player

\- GENERATING: API call in progress (3-5s typical)

\- GENERATED: Audio playable, all actions enabled

\- EDIT MODE: Non-destructive trimming UI active

\- APPLIED: Edited version becomes the new GENERATED state

\- DOWNLOADED: User has saved file (doesn't change state)



State Transitions:

\- Cancel during GENERATING → returns to IDLE

\- Cancel during EDIT MODE → returns to GENERATED (discards changes)

\- Regenerate from any state → returns to GENERATING

```



---



\## ⚠️ Error States \& Handling



\### Common Error Scenarios



\*\*1. TTS Generation Failures\*\*

```

Error: "Failed to generate audio"

Causes:

\- Empty text input

\- Text exceeds 5000 character limit

\- Piper engine crashed

\- Model files missing



User Experience:

\- Show error toast with specific message

\- Keep text input intact

\- Enable "Try Again" button

\- Log error to console for debugging

```



\*\*2. Audio File Too Large\*\*

```

Error: "Audio file exceeds size limit"

Causes:

\- Uploaded file > 10MB

\- Extremely long recording



User Experience:

\- Show file size in error message

\- Suggest recording shorter audio

\- Provide "Record Again" option

```



\*\*3. Unsupported Format\*\*

```

Error: "Unsupported audio format"

Causes:

\- File format not in \[.wav, .mp3, .m4a, .webm]

\- Corrupted audio file



User Experience:

\- List supported formats in error message

\- Show example: "Please upload .wav, .mp3, .m4a, or .webm files"

\- Highlight file upload zone in red

```



\*\*4. Network/Backend Errors\*\*

```

Error: "Cannot connect to API"

Causes:

\- Backend not running

\- CORS issues

\- Network timeout



User Experience:

\- Show "API Offline" status indicator

\- Provide "Test Connection" button

\- Display backend URL in error message

\- Suggest checking if backend is running

```



\*\*5. Transcription Failures\*\*

```

Error: "Could not transcribe audio"

Causes:

\- Audio quality too low

\- Silent/empty audio

\- Unsupported language



User Experience:

\- Show "No speech detected" message

\- Suggest speaking clearly

\- Provide "Record Again" button

```



\### Error Display Pattern

```typescript

interface ErrorState {

&nbsp; show: boolean;

&nbsp; message: string;

&nbsp; type: 'error' | 'warning' | 'info';

&nbsp; action?: {

&nbsp;   label: string;

&nbsp;   onClick: () => void;

&nbsp; };

}

```



---



\## 🐛 Known Limitations



---



\## 📖 Definition of Done



A feature is considered "done" when:

\- ✅ Code is written and tested

\- ✅ UI matches the design specification

\- ✅ API endpoints are functional

\- ✅ Error handling is implemented

\- ✅ Loading states are shown

\- ✅ Responsive design works on mobile/tablet

\- ✅ Documentation is updated

\- ✅ Code is committed to GitHub

\- ✅ Manual testing is complete



---



\## 🤝 Stakeholder Communication



\### Weekly Updates

\- Progress on current phase features

\- Blockers and risks

\- Demo of completed features

\- Plan for next week



\### Monthly Reviews

\- Feature completion status

\- Performance metrics

\- User feedback summary

\- Roadmap adjustments



---



\## 📞 Contact \& Support



\*\*Project Owner:\*\* Aryan Panwar  

\*\*Repository:\*\* https://github.com/Aryanpanwar10005/ai-voice-platform  

\*\*Issue Tracking:\*\* GitHub Issues  

\*\*Documentation:\*\* README.md in repository



---



\## 📚 References



\- \[FastAPI Documentation](https://fastapi.tiangolo.com/)

\- \[Piper TTS](https://github.com/rhasspy/piper)

\- \[OpenAI Whisper](https://github.com/openai/whisper)

\- \[Ollama](https://ollama.ai/)

\- \[Tailwind CSS](https://tailwindcss.com/)

\- \[React Documentation](https://react.dev/)



---



\*\*Document Version:\*\* 1.0  

\*\*Status:\*\* Active Development  

\*\*Next Review:\*\* February 2026

