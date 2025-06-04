@echo off
cd /d "%~dp0\property_scraper_api"
echo Installing dependencies...
npm install
echo Starting backend server...
npm start
pause
