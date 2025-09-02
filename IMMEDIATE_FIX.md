# 🔥 SOLUCIÓN INMEDIATA - Error 500 Configuration

## El Problema:
NextAuth está reportando `NO_SECRET` porque no puede encontrar la variable `NEXTAUTH_SECRET`.

## Solución Inmediata:

### Opción 1: Crear archivo .env.local (RECOMENDADO)
```bash
# En la raíz del proyecto, crear archivo .env.local con:
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=mi-clave-secreta-de-desarrollo-123
```

### Opción 2: Usar configuración por defecto (YA IMPLEMENTADA)
Los archivos ya están configurados con valores por defecto. Solo reinicia el servidor:

```bash
# Detener servidor (Ctrl+C)
npm run dev
```

## Verificación:

1. **Reinicia el servidor** después de crear .env.local
2. **Verifica en la consola** que aparezca:
   ```
   🚀 Inicializando TickBase...
   ⚠️ Usando configuración por defecto para desarrollo
   🌐 URL: http://localhost:3000
   🔐 Secret configurado: true
   ```

## Si el Error Persiste:

### Limpiar caché:
```bash
# Windows
clean.bat

# PowerShell
.\clean.ps1

# Linux/Mac
rm -rf .next node_modules
npm install
npm run dev
```

## Archivos Modificados:
- ✅ `src/lib/auth.ts` - Configuración con valores por defecto
- ✅ `src/lib/auth-defaults.ts` - Valores por defecto
- ✅ `src/lib/env-config.ts` - Configuración de entorno
- ✅ `src/lib/init.ts` - Inicialización automática
- ✅ `src/app/layout.tsx` - Importa inicialización

## Credenciales de Prueba:
- Email: `admin@tickbase.com`
- Password: `admin`
