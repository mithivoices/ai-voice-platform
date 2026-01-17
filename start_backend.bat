@echo off
REM VoxAI Backend Startup Script

echo ============================================
echo         VoxAI Python Backend Starter
echo ============================================
echo.

REM Activate virtual environment if it exists
if exist "venv\Scripts\activate.bat" (
    echo [1/3] Activating virtual environment...
    call venv\Scripts\activate.bat
) else (
    echo [!] No virtual environment found, using global Python
)

REM Install/update dependencies
echo [2/3] Checking dependencies...
pip install -r requirements.txt -q

REM Start the server
echo [3/3] Starting FastAPI server...
echo.
echo ============================================
echo   Backend will start on http://localhost:8000
echo   Press Ctrl+C to stop
echo ============================================
echo.

python -m uvicorn backend.app.main:app --host 0.0.0.0 --port 8000 --reload
