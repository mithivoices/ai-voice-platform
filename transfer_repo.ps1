# Transfer Repo to Organization Automation Script
# Converted from Bash to PowerShell for Windows Environment

$ErrorActionPreference = "Stop"

Write-Host "===========================================" -ForegroundColor Cyan
Write-Host " MITHIVOICES: TRANSFER TO ORGANIZATION"
Write-Host "==========================================="
Write-Host ""

# ============================================
# CONFIGURATION
# ============================================

$OLD_OWNER = "Aryanpanwar10005"
$NEW_OWNER = "mithivoices"
$REPO_NAME = "ai-voice-platform"

Write-Host "📋 Configuration:" -ForegroundColor Gray
Write-Host "  Old: github.com/$OLD_OWNER/$REPO_NAME" -ForegroundColor Gray
Write-Host "  New: github.com/$NEW_OWNER/$REPO_NAME" -ForegroundColor Gray
Write-Host ""

# ============================================
# STEP 1: VERIFY LOCAL REPO
# ============================================

Write-Host "[Step 1/7] Verifying local repository..." -ForegroundColor Yellow
if (-not (Test-Path ".git")) {
    Write-Error "❌ No git repo found in current directory."
    exit 1
}
Write-Host "  ✅ Found local repository" -ForegroundColor Green
Write-Host ""

# ============================================
# STEP 2: ENSURE EVERYTHING IS COMMITTED
# ============================================

Write-Host "[Step 2/7] Checking for uncommitted changes..." -ForegroundColor Yellow
$gitStatus = git status -s
if ($gitStatus) {
    Write-Host "⚠️  You have uncommitted changes:" -ForegroundColor Red
    git status -s
    Write-Host ""
    
    $commitNow = Read-Host "Commit them now? (y/n)"
    if ($commitNow -eq 'y') {
        git add .
        git commit -m "🏢 Pre-transfer commit: prepare for org migration"
        git push origin main
        Write-Host "  ✅ Changes committed and pushed" -ForegroundColor Green
    } else {
        Write-Error "❌ Please commit changes before transfer"
        exit 1
    }
} else {
    Write-Host "  ✅ Working tree clean" -ForegroundColor Green
}
Write-Host ""

# ============================================
# STEP 3: TRANSFER VIA GITHUB WEB (MANUAL)
# ============================================

Write-Host "[Step 3/7] Transfer repository on GitHub..." -ForegroundColor Yellow
Write-Host ""
Write-Host "⚠️  MANUAL STEP REQUIRED - Do this now in your browser:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Open: https://github.com/$OLD_OWNER/$REPO_NAME/settings" -ForegroundColor White
Write-Host "2. Scroll to 'Danger Zone'" -ForegroundColor White
Write-Host "3. Click 'Transfer ownership'" -ForegroundColor White
Write-Host "4. Enter new owner: $NEW_OWNER" -ForegroundColor White
Write-Host "5. Enter repo name to confirm: $REPO_NAME" -ForegroundColor White
Write-Host "6. Click 'I understand, transfer this repository'" -ForegroundColor White
Write-Host "7. Complete 2FA if prompted" -ForegroundColor White
Write-Host ""
Write-Host "Result: Repository will be at github.com/$NEW_OWNER/$REPO_NAME" -ForegroundColor Gray
Write-Host ""
Read-Host "Press ENTER after you've completed the transfer on GitHub..."

# Verify transfer was successful
Write-Host ""
Write-Host "  Verifying transfer..." -ForegroundColor Gray
$repoUrl = "https://github.com/$NEW_OWNER/$REPO_NAME.git"
git ls-remote "$repoUrl" > $null 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "  ✅ Transfer successful! Repo exists at $repoUrl" -ForegroundColor Green
} else {
    Write-Error "❌ Transfer not found at $repoUrl. Please check GitHub and try again."
    exit 1
}
Write-Host ""

# ============================================
# STEP 4: UPDATE LOCAL REMOTE URL
# ============================================

Write-Host "[Step 4/7] Updating local repository remote..." -ForegroundColor Yellow

$currentRemote = git remote get-url origin
Write-Host "  Current remote: $currentRemote" -ForegroundColor Gray

# Check if SSH or HTTPS
if ($currentRemote -match "git@github.com") {
    $newRemote = "git@github.com:$NEW_OWNER/$REPO_NAME.git"
} else {
    $newRemote = "https://github.com/$NEW_OWNER/$REPO_NAME.git"
}

git remote set-url origin $newRemote
Write-Host "  ✅ Updated origin to: $newRemote" -ForegroundColor Green

# Verify connection
git fetch origin
if ($LASTEXITCODE -eq 0) {
    Write-Host "  ✅ Connection verified" -ForegroundColor Green
}
Write-Host ""

# ============================================
# STEP 5: UPDATE DOCUMENTATION URLS
# ============================================

Write-Host "[Step 5/7] Updating documentation URLs..." -ForegroundColor Yellow

$filesToUpdate = Get-ChildItem -Recurse -Include *.md, *.json, *.yml, *.yaml -Exclude node_modules, .git, package-lock.json

foreach ($file in $filesToUpdate) {
    try {
        $content = Get-Content $file.FullName -Raw
        if ($content -match "$OLD_OWNER/$REPO_NAME") {
            $newContent = $content -replace "$OLD_OWNER/$REPO_NAME", "$NEW_OWNER/$REPO_NAME"
            Set-Content -Path $file.FullName -Value $newContent -NoNewline
            Write-Host "  ✅ Updated $($file.Name)" -ForegroundColor Green
        }
    } catch {
        Write-Host "  ⚠️  Skipped $($file.Name) (read error)" -ForegroundColor DarkGray
    }
}
Write-Host ""

# ============================================
# STEP 6: COMMIT URL UPDATES
# ============================================

Write-Host "[Step 6/7] Committing URL updates..." -ForegroundColor Yellow

git add .
git commit -m "🏢 Update all URLs to mithivoices organization

- Changed all github.com/$OLD_OWNER/$REPO_NAME references
- Updated to github.com/$NEW_OWNER/$REPO_NAME
- Repository successfully migrated to organization"

# We must push to the NEW remote now
git push origin main
Write-Host "  ✅ Changes pushed to org repo" -ForegroundColor Green
Write-Host ""

# ============================================
# STEP 7: CREATE PERSONAL FORK (MANUAL)
# ============================================

Write-Host "[Step 7/7] Creating personal development fork..." -ForegroundColor Yellow
Write-Host ""
Write-Host "⚠️  MANUAL STEP - Do this now in your browser:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Open: https://github.com/$NEW_OWNER/$REPO_NAME" -ForegroundColor White
Write-Host "2. Click 'Fork' button (top right)" -ForegroundColor White
Write-Host "3. Select your personal account: $OLD_OWNER" -ForegroundColor White
Write-Host "4. Keep name as: $REPO_NAME" -ForegroundColor White
Write-Host "5. Click 'Create fork'" -ForegroundColor White
Write-Host ""
Write-Host "Result: Personal fork at github.com/$OLD_OWNER/$REPO_NAME" -ForegroundColor Gray
Write-Host ""
Read-Host "Press ENTER after you've created your personal fork..."

# Verify fork exists
$forkUrl = "https://github.com/$OLD_OWNER/$REPO_NAME.git"
git ls-remote "$forkUrl" > $null 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "  ✅ Personal fork created successfully" -ForegroundColor Green
} else {
    Write-Host "  ⚠️  Fork not found yet - you can create it later" -ForegroundColor Yellow
}
Write-Host ""

# ============================================
# FINAL VERIFICATION
# ============================================

Write-Host "===========================================" -ForegroundColor Green
Write-Host "✅ MIGRATION COMPLETE!" -ForegroundColor Green
Write-Host "==========================================="
Write-Host ""
Write-Host "📊 Repository Status:" -ForegroundColor White
Write-Host "  Official (org):     https://github.com/$NEW_OWNER/$REPO_NAME" -ForegroundColor Gray
Write-Host "  Personal fork:      https://github.com/$OLD_OWNER/$REPO_NAME" -ForegroundColor Gray
Write-Host "  Local points to:    $newRemote (org)" -ForegroundColor Gray
Write-Host ""

Write-Host "Optional: Run 'git remote add fork $forkUrl' to track your fork as well." -ForegroundColor Gray
