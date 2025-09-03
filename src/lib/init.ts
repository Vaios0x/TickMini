import { envConfig, isProduction, isDevelopment } from './env-config'

// Inicialización de la aplicación
export function initializeApp() {
  if (typeof window === 'undefined') {
    // Solo en el servidor
    console.log('🚀 Inicializando TickBase...')
    
    console.log('🌐 Entorno:', isProduction ? 'Producción' : 'Desarrollo')
    console.log('🌐 URL:', envConfig.auth.url || 'http://localhost:3000')
    console.log('🔐 Secret configurado:', !!envConfig.auth.secret)
    console.log('🎯 AppKit Project ID:', envConfig.appKit.projectId)
  }
}

// Ejecutar inicialización
initializeApp()
