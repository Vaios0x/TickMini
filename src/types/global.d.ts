/// <reference types="next" />
/// <reference types="next/image-types/global" />

// Declaraciones globales para la aplicación
declare global {
  // Tipos para variables de entorno
  namespace NodeJS {
    interface ProcessEnv {
      NEXTAUTH_URL: string
      NEXTAUTH_SECRET: string
      NEXT_PUBLIC_BASE_CHAIN_ID: string
      NEXT_PUBLIC_BASE_RPC_URL: string
      NODE_ENV: 'development' | 'production' | 'test'
    }
  }
}

export {}
