import os
import shutil
from pathlib import Path

# --- Configuration ---
PROJECT_ROOT = Path("c:/Projects/ai-voice-platform")
BACKEND_ROOT = PROJECT_ROOT / "backend"

# --- Helper Functions ---
def remove_file(path_str):
    path = BACKEND_ROOT / path_str
    if path.exists():
        try:
            if path.is_file():
                os.remove(path)
                print(f"🗑️  Deleted file: {path_str}")
            elif path.is_dir():
                shutil.rmtree(path)
                print(f"🗑️  Deleted dir:  {path_str}")
        except Exception as e:
            print(f"⚠️  Failed to delete {path_str}: {e}")
    else:
        print(f"ℹ️  Already gone: {path_str}")

def update_file(path_str, content):
    path = BACKEND_ROOT / path_str
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"✅ Updated: {path_str}")

def main():
    print("🚀 Iteration 3: Final Cleanup & Polish")
    print("============================================================")

    # 1. Update requirements.txt
    print("\n📝 Updating requirements.txt...")
    req_content = """fastapi>=0.109.0
uvicorn>=0.27.0
pydantic>=2.5.0
pydantic-settings>=2.1.0
python-multipart>=0.0.6
openai-whisper>=20231117
httpx>=0.26.0
pytest>=7.4.0
pytest-asyncio>=0.23.0
onnxruntime>=1.16.0
scipy>=1.11.0
numpy>=1.26.0
"""
    update_file("requirements.txt", req_content)

    # 2. Cleanup Old Files
    print("\n🧹 Cleaning up old flat-structure files...")
    files_to_remove = [
        "config.py",      # Moved to app/core/config.py
        "tts.py",         # Moved to app/services/tts_service.py
        "stt.py",         # Moved to app/services/stt_service.py
        "__pycache__"
    ]
    
    # Special check for main.py - we might want to keep a launcher depending on how user runs it
    # Currently app/main.py is the app instance.
    # Often standard pattern is `python -m app.main` or `uvicorn app.main:app`
    # If there was an old `main.py` in backend root, it might conflict or just be the old monolith.
    # Let's verify if `backend/main.py` is the old one or if we should replace it with a launcher.
    
    # We will replace root main.py with a simple launcher for convenience
    print("\n📝 Creating root launcher (main.py)...")
    launcher_content = """import uvicorn

if __name__ == "__main__":
    print("🚀 Starting Mithivoices Backend...")
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
"""
    update_file("main.py", launcher_content)

    for f in files_to_remove:
        remove_file(f)

    # 3. Create a .env.example
    print("\n📝 Creating .env.example...")
    env_content = """PROJECT_NAME="Mithivoices Platform"
MODEL_DIR="../voice_assets"
ALLOWED_ORIGINS=["http://localhost:5173"]
"""
    update_file(".env.example", env_content)

    print("\n============================================================")
    print("✅ Cleanup Complete!")
    print("🎯 Backend is now standardized.")
    print("\nTo Run:")
    print("  cd backend")
    print("  pip install -r requirements.txt")
    print("  python main.py")

if __name__ == "__main__":
    main()
