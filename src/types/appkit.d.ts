declare module '@reown/appkit/react' {
  export interface AppKitAccount {
    address: string
    caipAddress: string
    isConnected: boolean
  }

  export interface AppKitNetwork {
    id: number
    name: string
    chainId: string
  }

  export interface AppKitBalance {
    balance: bigint
    formattedBalance: string
    symbol: string
  }

  export function useAppKit(): {
    open: () => void
    close: () => void
    isOpen: boolean
  }

  export function useAppKitAccount(): AppKitAccount

  export function useAppKitNetwork(): {
    network: AppKitNetwork | null
    switchNetwork: (networkId: number) => Promise<void>
  }

  export function useAppKitBalance(): AppKitBalance

  export function useDisconnect(): {
    disconnect: () => void
  }
}

declare module '@reown/appkit/networks' {
  export const mainnet: any
  export const arbitrum: any
  export const polygon: any
  export const base: any
}

declare module '@reown/appkit-adapter-wagmi' {
  export class WagmiAdapter {
    constructor(config: any)
    wagmiConfig: any
  }
}
