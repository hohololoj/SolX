@echo off

if exist dist\config.json move dist\config.json temp\config.json
if exist dist\presets.json move dist\presets.json temp\presets.json

if exist dist rmdir /s /q dist

call npm run build

call g++ -std=c++17 -O2 -Wall -Wextra server/main.cpp -o solx.exe ^
    -I server/openssl ^
    server/openssl/libssl.a ^
    server/openssl/libcrypto.a ^
    -lws2_32 -lcrypt32 -lpthread -static

if %errorlevel% equ 0 (
    echo Build successful!
) else (
    echo Build failed!
    pause
)

move solx.exe dist/solx.exe

if exist temp\config.json move temp\config.json dist\config.json
if exist temp\presets.json move temp\presets.json dist\presets.json