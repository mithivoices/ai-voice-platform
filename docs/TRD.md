\# VoxAI - AI Voice Platform

\## Technical Requirements Document (TRD)



---



\## 📄 Document Overview



\*\*Project Name:\*\* VoxAI - AI Voice Platform  

\*\*App Name:\*\* VoxAI  

\*\*Repository:\*\* https://github.com/Aryanpanwar10005/ai-voice-platform  

\*\*Version:\*\* 1.0 (Phase 2 - UI Implementation)  

\*\*Document Type:\*\* Technical Requirements Document  

\*\*Last Updated:\*\* January 14, 2026  

\*\*Owner:\*\* Aryan Panwar  

\*\*Status:\*\* Active Development



---



\## 🏗️ System Architecture



\### High-Level Architecture



```

┌─────────────────────────────────────────────────────────────┐

│                      CLIENT LAYER                            │

│  ┌────────────────────────────────────────────────────┐     │

│  │         React Frontend (Vite + TypeScript)          │     │

│  │  • UI Components (Sidebar, Cards, Waveforms)        │     │

│  │  • State Management (React Hooks)                   │     │

│  │  • Audio Recording (MediaRecorder API)              │     │

│  │  • Audio Playback (HTMLAudioElement)                │     │

│  └────────────────────────────────────────────────────┘     │

└─────────────────────────────────────────────────────────────┘

&nbsp;                           ↕ HTTP/REST

┌─────────────────────────────────────────────────────────────┐

│                      API LAYER                               │

│  ┌────────────────────────────────────────────────────┐     │

│  │         FastAPI Backend (Python)                    │     │

│  │  • /tts - Text-to-Speech                           │     │

│  │  • /stt - Speech-to-Text                           │     │

│  │  • /voice-chat - Combined Interaction               │     │

│  │  • /audio/{filename} - Audio File Serving          │     │

│  └────────────────────────────────────────────────────┘     │

└─────────────────────────────────────────────────────────────┘

&nbsp;                           ↕

┌─────────────────────────────────────────────────────────────┐

│                   PROCESSING LAYER                           │

│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │

│  │  Piper TTS   │  │   Whisper    │  │Ollama (LLM)  │      │

│  │   Engine     │  │   STT Base   │  │   Llama3     │      │

│  └──────────────┘  └──────────────┘  └──────────────┘      │

└─────────────────────────────────────────────────────────────┘

&nbsp;                           ↕

┌─────────────────────────────────────────────────────────────┐

│                    STORAGE LAYER                             │

│  ┌────────────────────────────────────────────────────┐     │

│  │     Local Filesystem (outputs/ directory)           │     │

│  │  • Generated Audio Files (.wav)                     │     │

│  │  • Uploaded Audio Files                             │     │

│  │  • Model Files (.onnx)                              │     │

│  └────────────────────────────────────────────────────┘     │

└─────────────────────────────────────────────────────────────┘

```



\### Component Interaction Flow



\*\*Text-to-Speech Flow:\*\*

```

User Input → React Component → POST /tts → Piper TTS → WAV File → 

Frontend Audio Player → User Listens

```



\*\*Speech-to-Text Flow:\*\*

```

User Records → MediaRecorder → Audio Blob → POST /stt → Whisper → 

Transcribed Text → Display

```



\*\*Voice Chat Flow:\*\*

```

User Voice → POST /voice-chat → Whisper (STT) → Ollama (LLM) → 

Piper (TTS) → Audio Response → Auto-play

```



---



\## 💻 Technology Stack



\### Frontend Technologies



| Component | Technology | Version | Purpose |

|-----------|-----------|---------|---------|

| Framework | React | 18.x | UI framework |

| Build Tool | Vite | 5.x | Fast dev server \& bundling |

| Language | TypeScript | 5.x | Type safety |

| Styling | Tailwind CSS | 3.x | Utility-first CSS |

| Icons | Lucide React | Latest | Icon library |

| Icons (Alt) | Material Symbols | Latest | Google icons |

| Font | Inter | Latest | Typography |

| HTTP Client | Fetch API | Native | API requests |

| State | React Hooks | 18.x | useState, useRef, useEffect |



\### Backend Technologies



| Component | Technology | Version | Purpose |

|-----------|-----------|---------|---------|

| Framework | FastAPI | Latest | REST API framework |

| Server | Uvicorn | Latest | ASGI server |

| Language | Python | 3.10+ | Backend language |

| TTS Engine | Piper | Latest | Text-to-speech |

| STT Engine | Whisper | Base model | Speech-to-text |

| LLM | Ollama | Llama3 | AI responses |

| CORS | FastAPI CORS | Built-in | Cross-origin support |

| Validation | Pydantic | 2.x | Data validation |



\### Infrastructure \& Tools



| Component | Technology | Purpose |

|-----------|-----------|---------|

| Version Control | Git + GitHub | Code repository |

| Package Manager (FE) | npm/pnpm | Frontend dependencies |

| Package Manager (BE) | pip | Python dependencies |

| Development | Windows/Linux/Mac | Local development |

| Production (Planned) | Oracle Cloud | Deployment target |

| Container | Docker | Containerization |

| Reverse Proxy | Nginx | SSL \& routing |



---



\## 🗄️ Storage Schema



\### Current Implementation

\*\*Storage Method:\*\* File-based (No traditional database in Phase 1-2)



\*\*Audio Files Structure:\*\*

```

outputs/

├── {uuid}\_tts.wav           # TTS generated audio

├── {uuid}\_stt\_input.wav     # STT uploaded audio

├── {uuid}\_input.wav         # Voice chat input

└── {uuid}\_output.wav        # Voice chat output

```



\*\*Model Files Structure:\*\*

```

models/

└── tts/

&nbsp;   ├── en\_US-lessac-medium.onnx        # Piper TTS model

&nbsp;   └── en\_US-lessac-medium.onnx.json   # Model config

```



\### Future Database Schema (Phase 3)



\*\*When user authentication is added:\*\*



```sql

-- Users Table

CREATE TABLE users (

&nbsp;   id UUID PRIMARY KEY,

&nbsp;   email VARCHAR(255) UNIQUE NOT NULL,

&nbsp;   name VARCHAR(255),

&nbsp;   created\_at TIMESTAMP DEFAULT NOW(),

&nbsp;   subscription\_tier VARCHAR(50) DEFAULT 'free',

&nbsp;   credits\_remaining INTEGER DEFAULT 1250

);



-- Audio History Table

CREATE TABLE audio\_history (

&nbsp;   id UUID PRIMARY KEY,

&nbsp;   user\_id UUID REFERENCES users(id),

&nbsp;   file\_name VARCHAR(255),

&nbsp;   file\_path VARCHAR(500),

&nbsp;   duration\_seconds FLOAT,

&nbsp;   text\_content TEXT,

&nbsp;   voice\_profile VARCHAR(100),

&nbsp;   created\_at TIMESTAMP DEFAULT NOW(),

&nbsp;   file\_size\_bytes INTEGER,

&nbsp;   type VARCHAR(20) -- 'tts', 'stt', 'voice-chat'

);



-- Voice Profiles Table

CREATE TABLE voice\_profiles (

&nbsp;   id UUID PRIMARY KEY,

&nbsp;   name VARCHAR(100),

&nbsp;   language VARCHAR(50),

&nbsp;   gender VARCHAR(20),

&nbsp;   style VARCHAR(100),

&nbsp;   model\_path VARCHAR(500)

);



-- Usage Logs Table

CREATE TABLE usage\_logs (

&nbsp;   id UUID PRIMARY KEY,

&nbsp;   user\_id UUID REFERENCES users(id),

&nbsp;   endpoint VARCHAR(100),

&nbsp;   credits\_used INTEGER,

&nbsp;   timestamp TIMESTAMP DEFAULT NOW(),

&nbsp;   status VARCHAR(50)

);

```



---



\## 🔌 API Design



\### Base URL

\- \*\*Development:\*\* `http://127.0.0.1:8000`

\- \*\*Production:\*\* `https://api.voxai.com` (planned)



\### Authentication

\*\*Phase 1-2:\*\* None (Local only)  

\*\*Phase 3:\*\* JWT Bearer tokens



\### Endpoints Specification



\#### 1. Health Check

```http

GET /

```



\*\*Response:\*\*

```json

{

&nbsp; "status": "online",

&nbsp; "message": "AI Voice Platform API is running"

}

```



\*\*Status Codes:\*\*

\- `200 OK` - Service is running



---



\#### 2. Text-to-Speech

```http

POST /tts

Content-Type: application/json

```



\*\*Request Body:\*\*

```json

{

&nbsp; "text": "Hello, welcome to VoxAI",

&nbsp; "voice": "default",

&nbsp; "speed": 1.0,

&nbsp; "pitch": 0

}

```



\*\*Request Schema:\*\*

```typescript

interface TTSRequest {

&nbsp; text: string;          // Required, max 5000 characters

&nbsp; voice: string;         // Default: "default"

&nbsp; speed: number;         // Range: 0.5 - 2.0, Default: 1.0

&nbsp; pitch: number;         // Range: -10 to +10, Default: 0

}

```



\*\*Response:\*\*

\- \*\*Content-Type:\*\* `audio/wav`

\- \*\*Body:\*\* Binary audio file stream



\*\*Status Codes:\*\*

\- `200 OK` - Audio generated successfully

\- `400 Bad Request` - Invalid input (empty text, invalid parameters)

\- `500 Internal Server Error` - TTS generation failed



\*\*Error Response:\*\*

```json

{

&nbsp; "detail": "TTS Error: Piper produced empty audio"

}

```



\*\*Backend Implementation:\*\*

```python

@app.post("/tts")

async def text\_to\_speech(request: TTSRequest):

&nbsp;   # Validate input

&nbsp;   if not request.text or len(request.text.strip()) == 0:

&nbsp;       raise HTTPException(status\_code=400, detail="Text cannot be empty")

&nbsp;   

&nbsp;   # Generate unique filename

&nbsp;   request\_id = uuid.uuid4().hex

&nbsp;   output\_wav = os.path.join(OUTPUT\_DIR, f"{request\_id}\_tts.wav")

&nbsp;   

&nbsp;   # Call Piper TTS

&nbsp;   synthesize\_speech(request.text, output\_wav)

&nbsp;   

&nbsp;   # Return audio file

&nbsp;   return FileResponse(

&nbsp;       output\_wav,

&nbsp;       media\_type="audio/wav",

&nbsp;       filename="speech.wav"

&nbsp;   )

```



---



\#### 3. Speech-to-Text

```http

POST /stt

Content-Type: multipart/form-data

```



\*\*Request Body:\*\*

```

audio: <file> (audio file)

```



\*\*Supported Formats:\*\*

\- `.wav` (preferred)

\- `.mp3`

\- `.m4a`

\- `.webm`



\*\*Response:\*\*

```json

{

&nbsp; "text": "This is the transcribed text from the audio"

}

```



\*\*Status Codes:\*\*

\- `200 OK` - Transcription successful

\- `400 Bad Request` - No file or empty file

\- `500 Internal Server Error` - STT processing failed



\*\*Error Response:\*\*

```json

{

&nbsp; "detail": "STT Error: Empty audio file"

}

```



\*\*Backend Implementation:\*\*

```python

@app.post("/stt")

async def speech\_to\_text(audio: UploadFile = File(...)):

&nbsp;   # Save uploaded file

&nbsp;   request\_id = uuid.uuid4().hex

&nbsp;   input\_wav = os.path.join(OUTPUT\_DIR, f"{request\_id}\_stt\_input.wav")

&nbsp;   

&nbsp;   with open(input\_wav, "wb") as f:

&nbsp;       f.write(await audio.read())

&nbsp;   

&nbsp;   # Transcribe with Whisper

&nbsp;   transcription = transcribe\_audio(input\_wav).strip()

&nbsp;   

&nbsp;   # Cleanup

&nbsp;   os.remove(input\_wav)

&nbsp;   

&nbsp;   return JSONResponse(content={"text": transcription})

```



---



\#### 4. Voice Chat

```http

POST /voice-chat

Content-Type: multipart/form-data

```



\*\*Request Body:\*\*

```

audio: <file> (user's voice message)

```



\*\*Response:\*\*

```json

{

&nbsp; "transcription": "What is the weather today?",

&nbsp; "ai\_response": "I don't have access to real-time weather data.",

&nbsp; "audio\_url": "http://127.0.0.1:8000/audio/abc123\_output.wav"

}

```



\*\*Status Codes:\*\*

\- `200 OK` - Voice chat successful

\- `400 Bad Request` - Could not transcribe audio

\- `500 Internal Server Error` - Processing failed



\*\*Processing Flow:\*\*

1\. Transcribe user's audio (Whisper)

2\. Generate AI response (Ollama + Llama3)

3\. Convert AI text to speech (Piper)

4\. Return transcription, text response, and audio URL



---



\#### 5. Get Audio File

```http

GET /audio/{filename}

```



\*\*Path Parameter:\*\*

\- `filename` - Audio file name (e.g., `abc123\_output.wav`)



\*\*Response:\*\*

\- \*\*Content-Type:\*\* `audio/wav`

\- \*\*Body:\*\* Binary audio file



\*\*Status Codes:\*\*

\- `200 OK` - File found and served

\- `403 Forbidden` - Directory traversal attempt

\- `404 Not Found` - File not found



\*\*Security:\*\*

\- Validates file path to prevent directory traversal

\- Only serves files from `OUTPUT\_DIR`



---



\### API Rate Limiting (Phase 3)



\*\*Free Tier:\*\*

\- 50 TTS requests/day

\- 100 STT requests/day

\- 5,000 character limit per TTS



\*\*Pro Tier:\*\*

\- Unlimited TTS/STT

\- 10,000 character limit per TTS

\- Priority processing



\*\*Rate Limit Headers:\*\*

```

X-RateLimit-Limit: 50

X-RateLimit-Remaining: 32

X-RateLimit-Reset: 1642080000

```



---



\## 🔒 Security \& Rate Limiting



\### Security Measures



\#### 1. Input Validation

```python

\# Text length validation

if len(request.text) > 5000:

&nbsp;   raise HTTPException(400, "Text exceeds 5000 character limit")



\# Parameter range validation

if not 0.5 <= request.speed <= 2.0:

&nbsp;   raise HTTPException(400, "Speed must be between 0.5 and 2.0")



\# File size validation

MAX\_FILE\_SIZE = 10 \* 1024 \* 1024  # 10MB

if file\_size > MAX\_FILE\_SIZE:

&nbsp;   raise HTTPException(400, "File too large")

```



\#### 2. CORS Configuration

```python

app.add\_middleware(

&nbsp;   CORSMiddleware,

&nbsp;   allow\_origins=\[

&nbsp;       "http://localhost:5173",

&nbsp;       "http://127.0.0.1:5173",

&nbsp;       "https://voxai.com"  # Production

&nbsp;   ],

&nbsp;   allow\_credentials=True,

&nbsp;   allow\_methods=\["GET", "POST"],

&nbsp;   allow\_headers=\["\*"],

)

```



\#### 3. Path Traversal Prevention

```python

\# Validate file path

file\_path = os.path.join(OUTPUT\_DIR, filename)

if not os.path.abspath(file\_path).startswith(os.path.abspath(OUTPUT\_DIR)):

&nbsp;   raise HTTPException(403, "Access denied")

```



\#### 4. File Cleanup Strategy

```python

\# Automatic cleanup of temporary and failed files

def cleanup\_old\_files():

&nbsp;   """

&nbsp;   Cleanup applies only to:

&nbsp;   - Temporary STT input files (after transcription)

&nbsp;   - Failed generation outputs

&nbsp;   - Non-saved preview audio

&nbsp;   

&nbsp;   Persisted history files are excluded from cleanup.

&nbsp;   """

&nbsp;   for file in os.listdir(OUTPUT\_DIR):

&nbsp;       file\_path = os.path.join(OUTPUT\_DIR, file)

&nbsp;       

&nbsp;       # Skip files that are in user's history

&nbsp;       if is\_in\_history(file):

&nbsp;           continue

&nbsp;           

&nbsp;       # Only delete temporary files older than 24 hours

&nbsp;       if is\_temporary\_file(file) and os.path.getmtime(file\_path) < time.time() - 86400:

&nbsp;           os.remove(file\_path)



def is\_temporary\_file(filename: str) -> bool:

&nbsp;   """Returns True if file is temporary (STT input, preview, etc.)"""

&nbsp;   return any(pattern in filename for pattern in \['\_stt\_input', '\_preview', '\_temp'])



def is\_in\_history(filename: str) -> bool:

&nbsp;   """Check if file is referenced in user's saved history"""

&nbsp;   # Phase 3: Query database

&nbsp;   # Phase 2: Check in-memory history list

&nbsp;   return filename in get\_history\_files()

```



\*\*Cleanup Rules:\*\*

\- ✅ Delete: STT input files after successful transcription

\- ✅ Delete: Failed TTS outputs (incomplete/corrupted files)

\- ✅ Delete: Preview audio not saved to history

\- ✅ Delete: Files older than 24 hours if not in history

\- ❌ Keep: User-saved audio in history panel

\- ❌ Keep: Downloaded files (tracked in history)

\- ❌ Keep: Recently generated audio (< 24 hours)



\### Rate Limiting Implementation



\*\*Middleware (Phase 3):\*\*

```python

from slowapi import Limiter

from slowapi.util import get\_remote\_address



limiter = Limiter(key\_func=get\_remote\_address)



@app.post("/tts")

@limiter.limit("50/day")

async def text\_to\_speech(request: TTSRequest):

&nbsp;   # ... implementation

```



---



\## 🤖 AI Integration



\### 1. Piper TTS Integration



\*\*Model Details:\*\*

\- \*\*Model:\*\* `en\_US-lessac-medium.onnx`

\- \*\*Size:\*\* ~63MB

\- \*\*Quality:\*\* Medium (balanced speed/quality)

\- \*\*Language:\*\* English (US)

\- \*\*Voice:\*\* Lessac (Neutral, Professional)



\*\*Configuration:\*\*

```json

{

&nbsp; "audio": {

&nbsp;   "sample\_rate": 22050

&nbsp; },

&nbsp; "espeak": {

&nbsp;   "voice": "en-us"

&nbsp; },

&nbsp; "inference": {

&nbsp;   "noise\_scale": 0.667,

&nbsp;   "length\_scale": 1.0,

&nbsp;   "noise\_w": 0.8

&nbsp; }

}

```



\*\*Implementation:\*\*

```python

def synthesize\_speech(text: str, output\_path: str) -> None:

&nbsp;   command = \[

&nbsp;       "piper",

&nbsp;       "--model", VOICE\_MODEL,

&nbsp;       "--config", VOICE\_CONFIG,

&nbsp;       "--output\_file", output\_path,

&nbsp;   ]

&nbsp;   

&nbsp;   process = subprocess.Popen(

&nbsp;       command,

&nbsp;       stdin=subprocess.PIPE,

&nbsp;       stdout=subprocess.PIPE,

&nbsp;       stderr=subprocess.PIPE,

&nbsp;       text=True,

&nbsp;   )

&nbsp;   

&nbsp;   stdout, stderr = process.communicate(text)

&nbsp;   

&nbsp;   if process.returncode != 0:

&nbsp;       raise RuntimeError(f"Piper failed: {stderr}")

```



\*\*Performance:\*\*

\- \*\*Speed:\*\* ~2-3 seconds for 500 characters

\- \*\*Audio Format:\*\* WAV, 22.05kHz, 16-bit mono

\- \*\*CPU Usage:\*\* ~30-40% on modern processors



---



\### 2. Whisper STT Integration



\*\*Model Details:\*\*

\- \*\*Model:\*\* Whisper Base

\- \*\*Size:\*\* ~139MB

\- \*\*Languages:\*\* 99+ languages (multilingual)

\- \*\*Accuracy:\*\* ~85-90% for clear English



\*\*Implementation:\*\*

```python

import whisper



\# Load model once (cached)

\_model = whisper.load\_model("base")



def transcribe\_audio(audio\_path: str) -> str:

&nbsp;   result = \_model.transcribe(audio\_path)

&nbsp;   return result.get("text", "").strip()

```



\*\*Performance:\*\*

\- \*\*Speed:\*\* ~5-10 seconds for 1 minute of audio

\- \*\*Supported Formats:\*\* WAV, MP3, M4A, WEBM

\- \*\*GPU Acceleration:\*\* Optional (CUDA)



\*\*Accuracy Factors:\*\*

\- Background noise: -10% accuracy

\- Clear speech: 90%+ accuracy

\- Accents: May vary



---



\### 3. Ollama LLM Integration



\*\*Model Details:\*\*

\- \*\*Model:\*\* Llama3

\- \*\*Size:\*\* ~4.7GB

\- \*\*Parameters:\*\* 8 billion

\- \*\*Context:\*\* 8192 tokens



\*\*Implementation:\*\*

```python

class OllamaLLM:

&nbsp;   def \_\_init\_\_(self, model="llama3"):

&nbsp;       self.model = model

&nbsp;       self.base\_url = "http://localhost:11434"

&nbsp;   

&nbsp;   def generate(self, prompt: str) -> str:

&nbsp;       response = requests.post(

&nbsp;           f"{self.base\_url}/api/generate",

&nbsp;           json={

&nbsp;               "model": self.model,

&nbsp;               "prompt": prompt,

&nbsp;               "stream": False

&nbsp;           }

&nbsp;       )

&nbsp;       return response.json()\["response"]

```



\*\*Performance:\*\*

\- \*\*Speed:\*\* 20-50 tokens/second (CPU)

\- \*\*Speed:\*\* 100-200 tokens/second (GPU)

\- \*\*Quality:\*\* High-quality conversational responses



---



\## 🚀 Deployment Strategy



\### Phase 1: Local Development ✅

\*\*Current Status:\*\* Complete



\*\*Environment:\*\*

\- Windows/Mac/Linux local machines

\- Python virtual environment

\- No external dependencies



\*\*Setup:\*\*

```bash

\# Create virtual environment

python -m venv venv



\# Activate

source venv/bin/activate  # Linux/Mac

venv\\Scripts\\activate     # Windows



\# Install dependencies

pip install -r requirements.txt



\# Run backend

uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000



\# Run frontend (separate terminal)

cd frontend

npm install

npm run dev

```



---



\### Phase 2: Dockerization 🚧

\*\*Status:\*\* In Progress



\*\*Dockerfile:\*\*

```dockerfile

FROM python:3.10-slim



WORKDIR /app



\# Install system dependencies

RUN apt-get update \&\& apt-get install -y \\

&nbsp;   ffmpeg \\

&nbsp;   espeak-ng \\

&nbsp;   \&\& rm -rf /var/lib/apt/lists/\*



\# Install Piper

RUN pip install piper-tts



\# Copy requirements

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt



\# Copy application

COPY backend/ ./backend/

COPY models/ ./models/



EXPOSE 8000



CMD \["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]

```



\*\*Docker Compose:\*\*

```yaml

version: '3.8'



services:

&nbsp; backend:

&nbsp;   build: .

&nbsp;   ports:

&nbsp;     - "8000:8000"

&nbsp;   volumes:

&nbsp;     - ./outputs:/app/outputs

&nbsp;     - ./models:/app/models

&nbsp;   environment:

&nbsp;     - PYTHONUNBUFFERED=1



&nbsp; frontend:

&nbsp;   image: node:18

&nbsp;   working\_dir: /app

&nbsp;   volumes:

&nbsp;     - ./frontend:/app

&nbsp;   ports:

&nbsp;     - "5173:5173"

&nbsp;   command: npm run dev -- --host

```



---



\### Phase 3: Oracle Cloud Deployment 📅

\*\*Status:\*\* Planned



\*\*Architecture:\*\*

```

&nbsp;                   Internet

&nbsp;                      ↓

&nbsp;             \[CloudFlare CDN]

&nbsp;                      ↓

&nbsp;        \[Oracle Load Balancer]

&nbsp;             ↓               ↓

&nbsp;   \[VM Instance 1]    \[VM Instance 2]

&nbsp;        Nginx              Nginx

&nbsp;          ↓                  ↓

&nbsp;     Docker Container    Docker Container

&nbsp;     - Frontend          - Frontend

&nbsp;     - Backend API       - Backend API

&nbsp;     - Piper TTS         - Piper TTS

&nbsp;     - Whisper STT       - Whisper STT

&nbsp;     - Ollama LLM        - Ollama LLM

```



\*\*Server Specifications:\*\*

\- \*\*Instance:\*\* Oracle Cloud VM.Standard.E4.Flex

\- \*\*CPU:\*\* 4 OCPUs

\- \*\*RAM:\*\* 24GB

\- \*\*Storage:\*\* 200GB Block Volume

\- \*\*OS:\*\* Ubuntu 22.04 LTS



\*\*Nginx Configuration:\*\*

```nginx

server {

&nbsp;   listen 80;

&nbsp;   server\_name voxai.com www.voxai.com;

&nbsp;   return 301 https://$server\_name$request\_uri;

}



server {

&nbsp;   listen 443 ssl http2;

&nbsp;   server\_name voxai.com www.voxai.com;



&nbsp;   ssl\_certificate /etc/letsencrypt/live/voxai.com/fullchain.pem;

&nbsp;   ssl\_certificate\_key /etc/letsencrypt/live/voxai.com/privkey.pem;



&nbsp;   # Frontend

&nbsp;   location / {

&nbsp;       root /var/www/voxai/dist;

&nbsp;       try\_files $uri $uri/ /index.html;

&nbsp;   }



&nbsp;   # API

&nbsp;   location /api/ {

&nbsp;       proxy\_pass http://localhost:8000/;

&nbsp;       proxy\_set\_header Host $host;

&nbsp;       proxy\_set\_header X-Real-IP $remote\_addr;

&nbsp;   }

}

```



---



\## 📊 Performance Requirements



\### Response Time Targets



| Endpoint | Target | Acceptable | Notes |

|----------|--------|-----------|-------|

| GET / | < 50ms | < 100ms | Health check |

| POST /tts | < 3s | < 5s | For 500 chars |

| POST /stt | < 10s | < 15s | For 60s audio |

| POST /voice-chat | < 15s | < 20s | Full round trip |

| GET /audio/{file} | < 500ms | < 1s | File serving |



\### Resource Usage Targets



\*\*Development (Local):\*\*

\- CPU: < 50% average

\- RAM: < 4GB

\- Disk: < 1GB (excluding models)



\*\*Production (Oracle Cloud):\*\*

\- CPU: < 70% average

\- RAM: < 16GB

\- Disk I/O: < 100 MB/s



\### Scalability Targets



\*\*Phase 1-2 (Single User):\*\*

\- Concurrent requests: 1

\- Daily users: 1-5



\*\*Phase 3 (Multi-User):\*\*

\- Concurrent users: 50

\- Requests per second: 10

\- Daily active users: 1,000



\*\*Phase 4 (Scale):\*\*

\- Concurrent users: 500

\- Requests per second: 100

\- Daily active users: 10,000



---



\## 💰 Cost Estimate



\### Development Phase (Current)

\*\*Total: $0/month\*\* ✅

\- All open-source tools

\- Local hardware

\- No cloud costs



\### Production Phase 3 (Oracle Cloud)

\*\*Estimated: $50-100/month\*\*



| Service | Cost | Notes |

|---------|------|-------|

| VM Instance | $30 | 4 OCPU, 24GB RAM |

| Block Storage | $10 | 200GB |

| Load Balancer | $10 | Basic tier |

| Bandwidth | $10 | 1TB outbound |

| Domain | $12/year | .com domain |

| SSL Certificate | $0 | Let's Encrypt |



\### Phase 4 (Scale-Up)

\*\*Estimated: $500-1,000/month\*\*

\- Multiple VM instances

\- Premium load balancer

\- CDN costs

\- Database (PostgreSQL)

\- Monitoring tools



---



\## ✅ Development Checklist



\### Backend Development

\- \[x] FastAPI setup

\- \[x] CORS configuration

\- \[x] TTS endpoint (/tts)

\- \[x] STT endpoint (/stt)

\- \[x] Voice Chat endpoint (/voice-chat)

\- \[x] Audio file serving (/audio/{filename})

\- \[x] Error handling

\- \[ ] Input validation middleware

\- \[ ] Rate limiting

\- \[ ] Logging system

\- \[ ] Health check metrics

\- \[ ] API documentation (Swagger)

\- \[ ] Unit tests

\- \[ ] Integration tests



\### Frontend Development

\- \[ ] React project setup (Vite)

\- \[ ] Tailwind CSS configuration

\- \[ ] UI components (Sidebar, Cards, Forms)

\- \[ ] Text-to-Speech panel

\- \[ ] Speech-to-Text panel

\- \[ ] Voice Chat panel

\- \[ ] Audio waveform visualization

\- \[ ] Audio player controls

\- \[ ] File upload with drag-drop

\- \[ ] Audio history sidebar

\- \[ ] Settings page

\- \[ ] Responsive design (mobile/tablet)

\- \[ ] Error handling \& toasts

\- \[ ] Loading states

\- \[ ] API integration

\- \[ ] Browser testing



\### DevOps \& Deployment

\- \[ ] Dockerfile creation

\- \[ ] Docker Compose setup

\- \[ ] Nginx configuration

\- \[ ] SSL certificate setup

\- \[ ] Oracle Cloud VM provisioning

\- \[ ] CI/CD pipeline (GitHub Actions)

\- \[ ] Monitoring setup (Prometheus/Grafana)

\- \[ ] Backup strategy

\- \[ ] Disaster recovery plan

\- \[ ] Documentation (deployment guide)



---



\## 🎯 Technical Success Criteria



A technical milestone is considered complete when:



1\. ✅ All endpoints return correct responses

2\. ✅ Error handling covers all edge cases

3\. ✅ Performance targets are met

4\. ✅ Security measures are implemented

5\. ✅ Code is documented

6\. ✅ Tests pass (unit + integration)

7\. ✅ UI matches design specifications

8\. ✅ Responsive design works

9\. ✅ Browser compatibility verified

10\. ✅ Deployment is automated



---



\## 📚 Technical Documentation References



\### Official Documentation

\- \[FastAPI Docs](https://fastapi.tiangolo.com/)

\- \[React Docs](https://react.dev/)

\- \[Piper TTS](https://github.com/rhasspy/piper)

\- \[Whisper](https://github.com/openai/whisper)

\- \[Ollama](https://ollama.ai/)

\- \[Tailwind CSS](https://tailwindcss.com/)



\### Internal Documentation

\- `README.md` - Project overview

\- `API.md` - API documentation (to create)

\- `DEPLOYMENT.md` - Deployment guide (to create)

\- `CONTRIBUTING.md` - Contribution guidelines (to create)



---



\*\*Document Version:\*\* 1.0  

\*\*Status:\*\* Active Development  

\*\*Next Review:\*\* February 2026  

\*\*Maintained By:\*\* Aryan Panwar

