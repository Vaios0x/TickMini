// Configuración simple y directa para NextAuth
export function setupNextAuth() {
  // Configurar variables por defecto si no existen
  if (!process.env.NEXTAUTH_SECRET) {
    process.env.NEXTAUTH_SECRET = 'development-secret-key-change-in-production'
    console.log('🔧 NEXTAUTH_SECRET configurado por defecto')
  }
  
  if (!process.env.NEXTAUTH_URL) {
    process.env.NEXTAUTH_URL = 'http://localhost:3000'
    console.log('🔧 NEXTAUTH_URL configurado por defecto')
  }
  
  console.log('✅ Configuración de NextAuth completada')
  console.log('  Secret:', process.env.NEXTAUTH_SECRET ? '✅' : '❌')
  console.log('  URL:', process.env.NEXTAUTH_URL)
  
  return {
    secret: process.env.NEXTAUTH_SECRET,
    url: process.env.NEXTAUTH_URL
  }
}

// Ejecutar configuración inmediatamente
setupNextAuth()
