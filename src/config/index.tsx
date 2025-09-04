import { cookieStorage, createStorage, http } from '@wagmi/core'
import { base, baseSepolia } from 'wagmi/chains'
import { createConfig } from 'wagmi'
import { walletConnect } from 'wagmi/connectors'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

// Project ID de Reown Dashboard
export const projectId = process.env.NEXT_PUBLIC_APPKIT_PROJECT_ID || '1da85635dfe0a0a84f4ab35591ab221c'

if (!projectId) {
  throw new Error('Project ID is not defined')
}

// Usar Base Sepolia para demo y testing (GRATIS)
// Cambiar a [base] solo para producción con ETH real
export const networks = [baseSepolia, base]

// Create the Wagmi Adapter
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage
  }),
  ssr: true,
  projectId,
  networks
})

// Configuración de Wagmi usando el adaptador
export const config = wagmiAdapter.wagmiConfig

// Metadata para la aplicación
export const metadata = {
  name: 'TickBase',
  description: 'NFT Ticketing Marketplace en Base Network',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://tick-base.vercel.app',
  icons: [`${process.env.NEXT_PUBLIC_APP_URL || 'https://tick-base.vercel.app'}/icon.png`]
}
