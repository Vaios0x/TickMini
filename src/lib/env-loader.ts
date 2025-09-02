// Cargador de variables de entorno para NextAuth
export function loadEnvVars() {
  // Forzar carga de variables de entorno
  const env = {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || 'development-secret-key-change-in-production',
    NODE_ENV: process.env.NODE_ENV || 'development'
  }
  
  // Log de configuración
  console.log('📋 Variables de entorno cargadas:')
  console.log('  NEXTAUTH_URL:', env.NEXTAUTH_URL)
  console.log('  NEXTAUTH_SECRET:', env.NEXTAUTH_SECRET ? '✅ Configurado' : '❌ No configurado')
  console.log('  NODE_ENV:', env.NODE_ENV)
  
  return env
}

// Cargar variables al importar
const envVars = loadEnvVars()

// Exportar para uso en otros archivos
export { envVars }
