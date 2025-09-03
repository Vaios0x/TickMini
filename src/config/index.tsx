import { cookieStorage, createStorage, http } from '@wagmi/core'
import { base } from 'wagmi/chains'
import { createConfig } from 'wagmi'
import { walletConnect } from 'wagmi/connectors'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

// Project ID de Reown Dashboard
export const projectId = 'd4181325794a773fbf713afbfbd8b348'

if (!projectId) {
  throw new Error('Project ID is not defined')
}

// Solo usar la red Base
export const networks = [base]

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
  url: 'https://tickbase.app',
  icons: ['https://tickbase.app/icon.png']
}
