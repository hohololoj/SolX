@echo off

if exist dist\config.json move dist\config.json temp\config.json
if exist dist\presets.json move dist\presets.json temp\presets.json
if exist dist\solx.exe move dist\solx.exe temp\solx.exe

if exist dist rmdir /s /q dist

call npm run build

move solx.exe dist/solx.exe

if exist temp\config.json move temp\config.json dist\config.json
if exist temp\presets.json move temp\presets.json dist\presets.json
if exist temp\solx.exe move temp\solx.exe dist\solx.exe