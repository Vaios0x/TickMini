/// <reference types="next" />
/// <reference types="next/image-types/global" />

// Declaraciones específicas para Next.js
declare module 'next' {
  interface NextPage {
    getLayout?: (page: React.ReactElement) => React.ReactNode
  }
}

// Asegurar que JSX funcione correctamente con Next.js
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any
    }
  }
}
