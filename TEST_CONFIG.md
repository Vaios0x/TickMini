# 🧪 PROBAR CONFIGURACIÓN - NextAuth

## Pasos para Probar:

### 1. Reiniciar el servidor:
```bash
# Detener servidor (Ctrl+C)
npm run dev
```

### 2. Verificar en la consola del servidor:
Deberías ver estos logs:
```
🔧 API: NEXTAUTH_SECRET configurado por defecto
🔧 API: NEXTAUTH_URL configurado por defecto
✅ API: Configuración de NextAuth completada
🔧 NEXTAUTH_SECRET configurado por defecto
🔧 NEXTAUTH_URL configurado por defecto
✅ Configuración de NextAuth completada
🔧 Configuración de NextAuth:
  NEXTAUTH_SECRET: ✅ Configurado
  NEXTAUTH_URL: http://localhost:3000
  NODE_ENV: development
```

### 3. Probar la ruta de autenticación:
Abrir en el navegador: `http://localhost:3000/api/auth/session`

Debería mostrar:
```json
{
  "user": null,
  "expires": "2024-..."
}
```

## Si NO ves los logs:

### Opción A: Verificar importaciones
Los archivos deben estar importados correctamente.

### Opción B: Limpiar caché
```bash
# Windows
clean.bat

# PowerShell
.\clean.ps1
```

### Opción C: Verificar archivos
Asegúrate de que estos archivos existan:
- `src/lib/simple-config.ts`
- `src/app/api/auth/config.ts`
- `src/lib/auth.ts`

## Archivos de Configuración:
- ✅ `src/lib/simple-config.ts` - Configuración simple
- ✅ `src/app/api/auth/config.ts` - Configuración de API
- ✅ `src/lib/auth.ts` - Configuración principal
- ✅ `src/app/api/auth/[...nextauth]/route.ts` - Ruta de API

## Credenciales de Prueba:
- Email: `admin@tickbase.com`
- Password: `admin`
