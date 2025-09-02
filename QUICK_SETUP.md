# Configuración Rápida - TickBase

## Para Resolver los Errores Inmediatamente:

### 1. Crear archivo `.env.local` en la raíz del proyecto:

```bash
# Copia este contenido en un archivo llamado .env.local
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=mi-clave-secreta-de-desarrollo
```

### 2. Reiniciar el servidor:

```bash
# Detener el servidor (Ctrl+C)
# Luego ejecutar:
npm run dev
```

### 3. Verificar que el servidor esté en el puerto 3000:

El servidor debe ejecutarse en `http://localhost:3000`, no en 3001.

## Si los Errores Persisten:

### Opción A: Usar configuración por defecto
Los archivos ya están configurados con valores por defecto para desarrollo.

### Opción B: Verificar puerto del servidor
En `package.json`, asegúrate de que el script `dev` no especifique un puerto diferente.

### Opción C: Limpiar caché y tipos corruptos
```bash
# Windows (ejecutar como administrador)
clean.bat

# PowerShell
.\clean.ps1

# Linux/Mac
rm -rf .next node_modules
npm install
npm run dev
```

### Opción D: Errores de TypeScript
Si ves errores relacionados con archivos `.next/types`, ejecuta la limpieza de la Opción C.

## Credenciales de Prueba:
- Email: `admin@tickbase.com`
- Password: `admin`
