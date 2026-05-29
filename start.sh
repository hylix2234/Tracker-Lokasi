#!/data/data/com.termux/files/usr/bin/bash

clear

pkill -f node 2>/dev/null
pkill -f cloudflared 2>/dev/null


toilet -f future "TRACKER" | lolcat

echo
echo "[+] Initializing system..." | lolcat
sleep 1

echo "[+] Starting Node server..." | lolcat
node server.js > /dev/null 2>&1 &

sleep 2

echo
echo "[+] Creating secure tunnel..." | lolcat
sleep 1

cloudflared tunnel --url http://localhost:3000
