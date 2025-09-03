export const envConfig = {
  // AppKit Configuration
  appKit: {
    projectId: process.env.NEXT_PUBLIC_APPKIT_PROJECT_ID || 'd4181325794a773fbf713afbfbd8b348',
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
  
  // Base Network Configuration
  base: {
    chainId: process.env.NEXT_PUBLIC_CHAIN_ID || '8453',
    rpcUrl: process.env.NEXT_PUBLIC_BASE_RPC_URL || 'https://mainnet.base.org',
    explorer: process.env.NEXT_PUBLIC_BASE_EXPLORER || 'https://basescan.org',
  },
  
  // Authentication
  auth: {
    secret: process.env.NEXTAUTH_SECRET,
    url: process.env.NEXTAUTH_URL,
  }
}

export const isProduction = process.env.NODE_ENV === 'production'
export const isDevelopment = process.env.NODE_ENV === 'development'
