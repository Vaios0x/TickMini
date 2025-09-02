Write-Host "Limpiando archivos temporales de Next.js..." -ForegroundColor Green

if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next"
    Write-Host "Carpeta .next eliminada" -ForegroundColor Yellow
}

if (Test-Path "node_modules") {
    Remove-Item -Recurse -Force "node_modules"
    Write-Host "Carpeta node_modules eliminada" -ForegroundColor Yellow
}

Write-Host "Instalando dependencias..." -ForegroundColor Green
npm install

Write-Host "Limpieza completada. Ejecuta 'npm run dev' para continuar." -ForegroundColor Green
Read-Host "Presiona Enter para continuar"
