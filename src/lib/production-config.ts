export const productionConfig = {
  auth: {
    secret: process.env.NEXTAUTH_SECRET,
    url: process.env.NEXTAUTH_URL,
  },
  dynamic: {
    environmentId: process.env.DYNAMIC_ENVIRONMENT_ID,
    apiKey: process.env.DYNAMIC_API_KEY,
  },
  base: {
    chainId: process.env.NEXT_PUBLIC_CHAIN_ID || '8453',
    rpcUrl: process.env.NEXT_PUBLIC_BASE_RPC_URL || 'https://mainnet.base.org',
    explorer: process.env.NEXT_PUBLIC_BASE_EXPLORER || 'https://basescan.org',
  }
}

export const isProduction = process.env.NODE_ENV === 'production'
export const isDevelopment = process.env.NODE_ENV === 'development'
