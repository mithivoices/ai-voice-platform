@echo off
REM VoxAI Full Stack Starter

echo ============================================
echo        VoxAI Full Stack Starter
echo ============================================
echo.

REM Start backend in new window
echo [1/2] Starting Python Backend...
start "VoxAI Backend" cmd /k "cd /d %~dp0 && call start_backend.bat"

REM Wait for backend to start
echo Waiting for backend to initialize...
timeout /t 3 /nobreak > nul

REM Start frontend in new window  
echo [2/2] Starting React Frontend...
start "VoxAI Frontend" cmd /k "cd /d %~dp0\frontend && npm run dev"

echo.
echo ============================================
echo   Backend: http://localhost:8000
echo   Frontend: http://localhost:5173
echo ============================================
echo.
echo Both servers starting in separate windows.
echo Close this window when done.
pause
