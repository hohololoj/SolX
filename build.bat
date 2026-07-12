@echo off

if exist dist\config.json move dist\config.json temp\config.json
if exist dist\presets.json move dist\presets.json temp\presets.json

if exist dist rmdir /s /q dist

call npm run build

cd server
call go build -o ..\dist\solx.exe
cd ..

if %errorlevel% equ 0 (
    echo Build successful!
) else (
    echo Build failed!
    pause
)

move solx.exe dist/solx.exe

if exist temp\config.json move temp\config.json dist\config.json
if exist temp\presets.json move temp\presets.json dist\presets.json