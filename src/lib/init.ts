import { validateEnvConfig } from './env-config'

// Inicialización de la aplicación
export function initializeApp() {
  if (typeof window === 'undefined') {
    // Solo en el servidor
    console.log('🚀 Inicializando TickBase...')
    
    const isValid = validateEnvConfig()
    
    if (isValid) {
      console.log('✅ Configuración válida')
    } else {
      console.log('⚠️ Usando configuración por defecto para desarrollo')
    }
    
    console.log('🌐 URL:', process.env.NEXTAUTH_URL || 'http://localhost:3000')
    console.log('🔐 Secret configurado:', !!process.env.NEXTAUTH_SECRET)
  }
}

// Ejecutar inicialización
initializeApp()
