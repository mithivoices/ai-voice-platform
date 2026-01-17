# Voice Models Documentation

## Overview

Mithivoices uses Piper TTS voice models from Hugging Face. These models are **NOT included in the Git repository** due to their size (~570 MB total).

## Downloading Models

### Automatic Download (Recommended)

**Windows:**
```cmd
download_models.bat
```

**Linux/Mac:**
```bash
cd backend
python3 download_models.py
```

### What Gets Downloaded

- 19 voice models (English, Spanish, Hindi, German, Malayalam)
- Total size: ~570 MB
- Format: ONNX (Open Neural Network Exchange)
- Source: Hugging Face (Piper TTS project)

## Manual Download

If automatic download fails:

1. Visit: https://huggingface.co/rhasspy/piper-voices
2. Download `.onnx` and `.onnx.json` files for each voice
3. Place in `backend/voices/` directory
4. Restart backend server

## Storage Requirements

- Single voice: 15-50 MB
- All 19 voices: ~570 MB
- Recommended free space: 1-2 GB

## Troubleshooting

**Download fails:**
- Check internet connection
- Try manual download
- Check firewall settings

**Models not loading:**
- Verify files in `backend/voices/`
- Check file extensions (.onnx, .onnx.json)
- Restart backend server

**Slow generation:**
- First generation loads model (slower)
- Subsequent generations cached (faster)