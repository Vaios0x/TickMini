export const APP_CONFIG = {
  // URLs
  BASE_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  API_BASE_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  
  // NextAuth
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || 'your-secret-key-here-change-in-production',
  
  // Base Network (Coston2 testnet)
  BASE_CHAIN_ID: process.env.NEXT_PUBLIC_BASE_CHAIN_ID || '84531',
  BASE_RPC_URL: process.env.NEXT_PUBLIC_BASE_RPC_URL || 'https://goerli.base.org',
  
  // App
  APP_NAME: 'TickBase',
  APP_DESCRIPTION: 'NFT Ticketing Marketplace en Base Network',
}
