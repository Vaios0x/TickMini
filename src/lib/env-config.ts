export const envConfig = {
  // AppKit Configuration
  appKit: {
            projectId: process.env.NEXT_PUBLIC_APPKIT_PROJECT_ID || '1da85635dfe0a0a84f4ab35591ab221c',
    environment: process.env.NODE_ENV || 'development',
  },
  
  // App URLs
  app: {
    url: process.env.NEXT_PUBLIC_APP_URL || 
      (process.env.NODE_ENV === 'production' 
        ? 'https://tick-base.vercel.app' 
        : 'http://localhost:3000'),
    name: 'TickBase',
    description: 'NFT Ticketing Marketplace en Base Network',
  },
  
  // Base Network Configuration - Usar Base Sepolia por defecto para testing
  base: {
    chainId: process.env.NEXT_PUBLIC_CHAIN_ID || '84532', // Base Sepolia
    rpcUrl: process.env.NEXT_PUBLIC_BASE_RPC_URL || 'https://sepolia.base.org',
    explorer: process.env.NEXT_PUBLIC_BASE_EXPLORER || 'https://sepolia.basescan.org',
  },
  
  // Authentication
  auth: {
    secret: process.env.NEXTAUTH_SECRET,
    url: process.env.NEXTAUTH_URL,
  }
}

export const isProduction = process.env.NODE_ENV === 'production'
export const isDevelopment = process.env.NODE_ENV === 'development'
