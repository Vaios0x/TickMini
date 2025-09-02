@echo off
echo Limpiando TODO el proyecto TickBase...
echo.

echo Deteniendo procesos de Node.js...
taskkill /f /im node.exe 2>nul

echo Eliminando carpetas de cache...
if exist .next rmdir /s /q .next
if exist node_modules rmdir /s /q node_modules
if exist .env.local del .env.local

echo Creando archivo .env.local...
echo NEXTAUTH_SECRET=development-secret-key-change-in-production > .env.local
echo NEXTAUTH_URL=http://localhost:3002 >> .env.local

echo Reinstalando dependencias...
npm install

echo.
echo Limpieza completada. Ejecuta 'npm run dev' para continuar.
pause
