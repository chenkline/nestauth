@echo off
call "C:\Program Files (x86)\nodejs\nodevars.bat"
cd /d %~dp0
call env.bat
node .\bin\www
