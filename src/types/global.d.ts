/// <reference types="next" />
/// <reference types="next/image-types/global" />
/// <reference types="react" />
/// <reference types="react-dom" />

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

  // Declaraciones JSX para resolver errores de TypeScript
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any
    }
  }
}

export {}
