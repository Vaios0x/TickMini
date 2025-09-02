@echo off
echo Limpiando archivos temporales de Next.js...
if exist .next rmdir /s /q .next
if exist node_modules rmdir /s /q node_modules
echo Instalando dependencias...
npm install
echo Limpieza completada. Ejecuta 'npm run dev' para continuar.
pause
