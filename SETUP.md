# Configuración del Entorno de Desarrollo - TickBase

## Variables de Entorno Requeridas

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```bash
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=tu-clave-secreta-aqui-cambiar-en-produccion

# Base Network (Coston2 testnet)
NEXT_PUBLIC_BASE_CHAIN_ID=84531
NEXT_PUBLIC_BASE_RPC_URL=https://goerli.base.org
```

## Instalación de Dependencias

```bash
npm install
# o
yarn install
```

## Ejecutar el Servidor de Desarrollo

```bash
npm run dev
# o
yarn dev
```

El servidor se ejecutará en `http://localhost:3000`

## Solución de Problemas

### Error 404 en /api/auth/session

Si ves errores 404 en las rutas de autenticación:

1. Verifica que el archivo `.env.local` existe y tiene las variables correctas
2. Asegúrate de que el servidor esté ejecutándose en el puerto 3000
3. Reinicia el servidor después de crear el archivo `.env.local`

### Credenciales de Prueba

Para probar la autenticación, usa:
- Email: `admin@tickbase.com`
- Password: `admin`

## Estructura de Archivos

- `src/lib/auth.ts` - Configuración de NextAuth
- `src/app/api/auth/[...nextauth]/route.ts` - Rutas de API de autenticación
- `src/components/providers/auth-provider.tsx` - Provider de autenticación
- `src/middleware.ts` - Middleware de autenticación
