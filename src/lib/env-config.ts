// Configuración de entorno con valores por defecto para desarrollo
export const ENV_CONFIG = {
  // NextAuth
  NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || 'development-secret-key-change-in-production',
  
  // Entorno
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Base Network
  BASE_CHAIN_ID: process.env.NEXT_PUBLIC_BASE_CHAIN_ID || '84531',
  BASE_RPC_URL: process.env.NEXT_PUBLIC_BASE_RPC_URL || 'https://goerli.base.org',
  
  // App
  APP_NAME: 'TickBase',
  APP_DESCRIPTION: 'NFT Ticketing Marketplace en Base Network'
} as const

// Función para verificar si la configuración es válida
export function validateEnvConfig() {
  const required = ['NEXTAUTH_URL', 'NEXTAUTH_SECRET']
  const missing = required.filter(key => !ENV_CONFIG[key as keyof typeof ENV_CONFIG])
  
  if (missing.length > 0) {
    console.warn(`⚠️ Variables de entorno faltantes: ${missing.join(', ')}`)
    console.warn('📝 Usando valores por defecto para desarrollo')
  }
  
  return missing.length === 0
}
