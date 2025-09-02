// Configuración del servidor para NextAuth
export const SERVER_CONFIG = {
  NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || 'development-secret-key-change-in-production',
  NODE_ENV: process.env.NODE_ENV || 'development'
}

// Función para verificar la configuración del servidor
export function checkServerConfig() {
  console.log('🔧 Configuración del servidor:')
  console.log('  URL:', SERVER_CONFIG.NEXTAUTH_URL)
  console.log('  Secret configurado:', !!SERVER_CONFIG.NEXTAUTH_SECRET)
  console.log('  Entorno:', SERVER_CONFIG.NODE_ENV)
  
  if (!process.env.NEXTAUTH_SECRET) {
    console.log('⚠️  NEXTAUTH_SECRET no encontrado, usando valor por defecto')
  }
  
  return SERVER_CONFIG
}

// Ejecutar verificación al importar
checkServerConfig()
