import { cookieStorage, createStorage, http } from '@wagmi/core'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet, arbitrum, polygon, base } from '@reown/appkit/networks'

// Project ID de Reown Dashboard
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || '4ccf59710d194b5674bc0b4b1645e61f'

if (!projectId) {
  throw new Error('Project ID is not defined')
}

export const networks = [mainnet, arbitrum, polygon, base]

// Configuración del Wagmi Adapter
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage
  }),
  ssr: true,
  projectId,
  networks
})

export const config = wagmiAdapter.wagmiConfig
