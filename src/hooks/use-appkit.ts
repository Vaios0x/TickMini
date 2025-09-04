import { useAccount, useBalance, useDisconnect } from 'wagmi'

export function useAppKitConnection() {
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const { data: balanceData } = useBalance({ 
    address: address as `0x${string}` | undefined
  })

  const handleConnect = () => {
    // Evitar múltiples llamadas
    if (typeof window === 'undefined') return
    
    // Import modal directly and call open
    import('@/context').then(({ modal }) => {
      if (modal && modal.open) {
        console.log('🔗 Abriendo modal de conexión...')
        modal.open()
      } else {
        console.warn('⚠️ Modal no disponible')
      }
    }).catch((error) => {
      console.error('Error abriendo modal:', error)
    })
  }

  const handleDisconnect = () => {
    disconnect()
  }

  const formatAddress = (address: string) => {
    if (!address) return ''
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return {
    // Estado de conexión
    isConnected,
    address,
    caipAddress: address,
    formattedAddress: address ? formatAddress(address) : '',
    
    // Funciones de conexión
    connect: handleConnect,
    disconnect: handleDisconnect,
    
    // Estado del modal
    open: handleConnect,
    close: () => {},
    
    // Red y balance
    network: null,
    switchNetwork: () => Promise.resolve(),
    balance: balanceData?.value || BigInt(0),
    formattedBalance: balanceData?.formatted ? `${balanceData.formatted.slice(0, 6)} ${balanceData.symbol}` : '0'
  }
}
