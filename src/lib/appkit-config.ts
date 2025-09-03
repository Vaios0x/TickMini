// Configuración específica para AppKit que evita problemas de WalletConnect
export const appKitConfig = {
  // Solo usar la red Base
  networks: ['base'],
  
  // Configuración del adaptador Wagmi
  adapters: ['wagmi'],
  
  // Configuración de características
  features: {
    analytics: false, // Deshabilitar analytics para evitar problemas
    email: false,     // Deshabilitar email para simplificar
    socials: [],      // Sin redes sociales por ahora
    emailShowWallets: false
  },
  
  // Configuración de WalletConnect
  walletConnect: {
    projectId: 'd4181325794a773fbf713afbfbd8b348',
    metadata: {
      name: 'TickBase',
      description: 'NFT Ticketing Marketplace en Base Network',
      url: 'https://tickbase.app',
      icons: ['https://tickbase.app/icon.png']
    }
  }
}

// Configuración para desarrollo
export const devConfig = {
  ...appKitConfig,
  // Configuraciones específicas para desarrollo
  debug: true,
  // Evitar problemas de SSR en desarrollo
  ssr: false
}

// Configuración para producción
export const prodConfig = {
  ...appKitConfig,
  // Configuraciones específicas para producción
  debug: false,
  ssr: true
}
