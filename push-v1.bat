@echo off
title Cubtix - push to GitHub
cd /d "%~dp0"
echo.
echo  === Cubtix: push to GitHub ===
echo.

where git >nul 2>nul
if errorlevel 1 (
  echo  Git is not installed on this computer.
  echo  Install it from https://git-scm.com/download/win and run this file again.
  echo.
  pause
  exit /b 1
)

if not exist ".git" (
  echo  First run: setting up Git in this folder...
  git init >nul
  git branch -M main
)

git remote get-url origin >nul 2>nul
if errorlevel 1 git remote add origin https://github.com/sakshamkoul05-jpg/cubtix.git

git config user.email >nul 2>nul
if errorlevel 1 (
  set /p gname=Your name for commits:
  set /p gmail=Your GitHub email:
  call git config user.name "%%gname%%"
  call git config user.email "%%gmail%%"
)

echo.
set "msg="
set /p msg=What changed? (press Enter to skip):
if "%msg%"=="" set "msg=Website update %date% %time:~0,5%"

git add -A
git commit -m "%msg%"
if errorlevel 1 echo  (Nothing new to commit - pushing anyway.)

echo.
echo  Syncing with GitHub first (your local files win if anything differs)...
git fetch origin main >nul 2>nul
git rev-parse --verify origin/main >nul 2>nul
if not errorlevel 1 (
  git merge origin/main --allow-unrelated-histories -X ours --no-edit -m "Merge GitHub changes" >nul 2>nul
  if errorlevel 1 (
    git merge --abort >nul 2>nul
    echo  Could not merge automatically. Ask Claude for help with the message above.
    pause
    exit /b 1
  )
)

echo.
echo  Pushing to GitHub... a browser login window may open the first time.
git push -u origin main
if errorlevel 1 (
  echo.
  echo  Push failed. Check you are logged in to the GitHub account that owns the repo,
  echo  then run this file again.
) else (
  echo.
  echo  Done! Vercel will pick this up and redeploy in about a minute.
)
echo.
pause
