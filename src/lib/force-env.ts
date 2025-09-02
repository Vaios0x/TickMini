// Forzar configuración de variables de entorno para NextAuth
if (typeof process !== 'undefined') {
  // Configurar variables por defecto si no existen
  if (!process.env.NEXTAUTH_SECRET) {
    process.env.NEXTAUTH_SECRET = 'development-secret-key-change-in-production'
    console.log('🔧 NEXTAUTH_SECRET configurado por defecto')
  }
  
  if (!process.env.NEXTAUTH_URL) {
    process.env.NEXTAUTH_URL = 'http://localhost:3000'
    console.log('🔧 NEXTAUTH_URL configurado por defecto')
  }
  
  console.log('✅ Variables de entorno forzadas para NextAuth')
  console.log('  NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET ? '✅' : '❌')
  console.log('  NEXTAUTH_URL:', process.env.NEXTAUTH_URL)
}
