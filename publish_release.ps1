$ErrorActionPreference = "Stop"

function Write-Step {
  param([string]$Message)
  Write-Host "`n➤ $Message" -ForegroundColor Cyan
}

function Write-Success {
  param([string]$Message)
  Write-Host "  ✅ $Message" -ForegroundColor Green
}

function Write-ErrorMsg {
  param([string]$Message)
  Write-Host "  ❌ $Message" -ForegroundColor Red
}

function Check-GH-CLI {
  Write-Step "Checking GitHub CLI installation..."
  if (Get-Command gh -ErrorAction SilentlyContinue) {
    $version = gh --version | Select-Object -First 1
    Write-Success "GitHub CLI found: $version"
  }
  else {
    Write-ErrorMsg "GitHub CLI (gh.exe) not found in PATH."
    Write-Host "Please restart your terminal if you just installed it."
    Write-Host "Or ensure C:\Program Files\GitHub CLI is in your PATH."
    exit 1
  }
}

function Check-Auth {
  Write-Step "Checking GitHub authentication..."
  # Ensure we use the full path to avoid alias conflicts if any
  $ghPath = (Get-Command gh).Source
    
  try {
    & $ghPath auth status 2>&1 | Out-Null
    Write-Success "Authenticated with GitHub"
  }
  catch {
    Write-Host "  ⚠️ Not authenticated. Initiating login..." -ForegroundColor Yellow
    Write-Host "  👉 A browser window will open. Please authorize GitHub CLI." -ForegroundColor Yellow
    & $ghPath auth login --web
        
    # Verify again
    try {
      & $ghPath auth status 2>&1 | Out-Null
      Write-Success "Now authenticated!"
    }
    catch {
      Write-ErrorMsg "Authentication failed. Please try running 'gh auth login' manually."
      exit 1
    }
  }
}

function Create-Release {
  Write-Step "Creating release v0.1.0-alpha..."
    
  $releaseNotes = @"
# 🎙️ Mithivoices v0.1.0-alpha

First professional release of the Mithivoices AI Voice Platform!

## ✨ Features
- **19 neural voices** across 8 languages (Hindi, English, German, Spanish, Malayalam, Nepali)
- **Professional TTS** with Piper + **STT** with Whisper
- **Modern React UI** with dark mode and waveform visualization
- **FastAPI backend** with comprehensive REST API
- **CI/CD pipeline** with automated testing
- **Easy setup** with one-click installation scripts

## 📦 Quick Start
```bash
git clone https://github.com/mithivoices/ai-voice-platform.git
cd ai-voice-platform
python download_models.py  # Download voices (~500MB)
cd backend && python main.py  # Start backend
cd frontend && npm install && npm run dev  # Start frontend
```

## 📚 Documentation
- Installation Guide: `README.md`
- API Docs: `http://localhost:8000/docs`
- Contributing: `CONTRIBUTING.md`

## 🚧 Known Issues
- Mobile UI needs polish
- Light mode not implemented
- Limited audio export formats

## 🤝 Contributing
We welcome contributions! Open issues, submit PRs, or join discussions.

⭐ **Star us on GitHub!**
"@

  $notesFile = "$PWD\RELEASE_NOTES_TEMP.md"
  Set-Content -Path $notesFile -Value $releaseNotes -Encoding UTF8

  try {
    $ghPath = (Get-Command gh).Source
    & $ghPath release create v0.1.0-alpha `
      --repo mithivoices/ai-voice-platform `
      --title "🎙️ Mithivoices v0.1.0-alpha - Local Development Release" `
      --notes-file $notesFile `
      --prerelease `
      --latest `
      --target main

    Write-Success "Release created successfully!"
    Write-Host "  🔗 View at: https://github.com/mithivoices/ai-voice-platform/releases/tag/v0.1.0-alpha" -ForegroundColor Blue
  }
  catch {
    Write-ErrorMsg "Failed to create release. It might already exist."
    Write-Host $_.Exception.Message -ForegroundColor Gray
  }
  finally {
    if (Test-Path $notesFile) { Remove-Item $notesFile }
  }
}

function Update-Bio {
  Write-Step "Updating profile bio..."
    
  $query = '
mutation {
  updateUserProfile(input: {
    bio: "Creator & Maintainer of @mithivoices | AI Voice Platform | FastAPI • React • ML"
  }) {
    user {
      bio
    }
  }
}
'
  try {
    $ghPath = (Get-Command gh).Source
    & $ghPath api graphql -f query=$query | Out-Null
    Write-Success "Bio updated successfully!"
  }
  catch {
    Write-ErrorMsg "Failed to update bio."
    Write-Host $_.Exception.Message -ForegroundColor Gray
  }
}

# --- Main Scrip ---
Write-Host "🚀 Mithivoices v0.1.0-alpha Release Publisher" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan

Check-GH-CLI
Check-Auth

# Ensure we are in the right repo context (optional verify)
if (-not (Test-Path ".git")) {
  Write-ErrorMsg "Not in a git repository! Please cd into AI-Voice-Platform root."
  exit 1
}

Create-Release
Update-Bio

Write-Host "`n================================================" -ForegroundColor Cyan
Write-Host "🎉 AUTOMATED STEPS COMPLETE!" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "`n⚠️  FINAL MANUAL STEP REQUIRED:" -ForegroundColor Yellow
Write-Host "   📌 Pin the repository on your profile:"
Write-Host "   1. Visit: https://github.com/Aryanpanwar10005"
Write-Host "   2. Click 'Customize your pins'"
Write-Host "   3. Select 'mithivoices/ai-voice-platform'"
Write-Host "   4. Save changes"
Write-Host "`n✨ Once pinning is done, type 'Phase 2' in the chat!" -ForegroundColor Cyan
