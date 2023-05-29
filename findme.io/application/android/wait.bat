@echo off
setlocal
set title=%1
set pid=
for /f "tokens=2 delims=:" %%a in ('tasklist /v ^| findstr /i "%title%"') do (
  set pid=%%a
)
if "%pid%"=="" exit /b 1
:loop
tasklist /fi "pid eq %pid%" /fi "status eq running" | findstr /i "%pid%" > nul
if not errorlevel 1 (
  timeout /t 1 /nobreak > nul
  goto loop
)
exit /b 0
