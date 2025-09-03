// Fix para problemas de WalletConnect en AppKit
export const walletConnectFix = {
  // Configuración para evitar errores de módulos
  resolve: {
    fallback: {
      fs: false,
      net: false,
      tls: false,
      crypto: false,
      stream: false,
      url: false,
      zlib: false,
      http: false,
      https: false,
      assert: false,
      os: false,
      path: false,
    },
  },
  // Configuración para módulos externos
  externals: ['pino-pretty', 'lokijs', 'encoding'],
}

// Configuración específica para AppKit
export const appKitConfig = {
  // Evitar problemas de SSR
  ssr: false,
  // Configuración de red Base
  networks: ['base'],
  // Configuración de adaptadores
  adapters: ['wagmi'],
}
