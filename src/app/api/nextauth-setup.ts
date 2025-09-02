// Configuración de NextAuth para la API
console.log("🔧 Configurando NextAuth en la API...")

// Configurar variables por defecto
if (!process.env.NEXTAUTH_SECRET) {
  process.env.NEXTAUTH_SECRET = 'development-secret-key-change-in-production'
  console.log('✅ API: NEXTAUTH_SECRET configurado por defecto')
}

if (!process.env.NEXTAUTH_URL) {
  process.env.NEXTAUTH_URL = 'http://localhost:3000'
  console.log('✅ API: NEXTAUTH_URL configurado por defecto')
}

console.log('🚀 API: NextAuth configurado correctamente')
console.log('  Secret:', process.env.NEXTAUTH_SECRET ? '✅' : '❌')
console.log('  URL:', process.env.NEXTAUTH_URL)

// Exportar configuración
export const apiNextAuthConfig = {
  secret: process.env.NEXTAUTH_SECRET,
  url: process.env.NEXTAUTH_URL
}
