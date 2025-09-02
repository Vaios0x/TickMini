export const authConfig = {
  // Configuración por defecto para desarrollo
  default: {
    url: 'http://localhost:3000',
    secret: 'development-secret-key-change-in-production',
  },
  
  // Configuración del entorno actual
  current: {
    url: process.env.NEXTAUTH_URL || 'http://localhost:3000',
    secret: process.env.NEXTAUTH_SECRET || 'development-secret-key-change-in-production',
  }
}
