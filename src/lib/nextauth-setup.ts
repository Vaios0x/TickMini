// Configuración directa de NextAuth para el servidor
console.log("🔧 Configurando NextAuth en el servidor...")

// Configurar variables por defecto
if (!process.env.NEXTAUTH_SECRET) {
  process.env.NEXTAUTH_SECRET = 'development-secret-key-change-in-production'
  console.log('✅ NEXTAUTH_SECRET configurado por defecto')
}

if (!process.env.NEXTAUTH_URL) {
  process.env.NEXTAUTH_URL = 'http://localhost:3000'
  console.log('✅ NEXTAUTH_URL configurado por defecto')
}

console.log('🚀 NextAuth configurado correctamente')
console.log('  Secret:', process.env.NEXTAUTH_SECRET ? '✅' : '❌')
console.log('  URL:', process.env.NEXTAUTH_URL)

// Exportar configuración
export const nextAuthConfig = {
  secret: process.env.NEXTAUTH_SECRET,
  url: process.env.NEXTAUTH_URL,
  env: process.env.NODE_ENV || 'development'
}
