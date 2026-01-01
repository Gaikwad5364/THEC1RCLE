@echo off
echo Starting C1rcle Platform...

start "C1rcle Web User (3000)" cmd /k "cd apps/web-user && npm run dev"
start "C1rcle Dashboards (3001)" cmd /k "cd apps/dashboards && npm run dev"
start "C1rcle Scanner (3002)" cmd /k "cd apps/scanner && npm run dev"

echo All apps launching in separate windows.
echo Web User: http://localhost:3000
echo Dashboard: http://localhost:3001
echo Scanner: http://localhost:3002
