// Valores por defecto para NextAuth en desarrollo
export const AUTH_DEFAULTS = {
  NEXTAUTH_URL: 'http://localhost:3000',
  NEXTAUTH_SECRET: 'development-secret-key-change-in-production',
  NODE_ENV: 'development'
} as const

// Función para obtener la configuración de autenticación
export function getAuthConfig() {
  return {
    url: process.env.NEXTAUTH_URL || AUTH_DEFAULTS.NEXTAUTH_URL,
    secret: process.env.NEXTAUTH_SECRET || AUTH_DEFAULTS.NEXTAUTH_SECRET,
    env: process.env.NODE_ENV || AUTH_DEFAULTS.NODE_ENV
  }
}
