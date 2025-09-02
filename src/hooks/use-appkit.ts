import { useAccount, useBalance, useDisconnect, useConnect } from 'wagmi'

export function useAppKitConnection() {
  const { address, isConnected } = useAccount()
  const { data: balanceData } = useBalance({ address })
  const { disconnect } = useDisconnect()
  const { connect, connectors } = useConnect()

  const handleConnect = () => {
    console.log('Conectores disponibles:', connectors)
    
    // Buscar el conector de AppKit específicamente
    const appkitConnector = connectors.find(connector => 
      connector.name.toLowerCase().includes('appkit') || 
      connector.name.toLowerCase().includes('walletconnect')
    )
    
    if (appkitConnector) {
      console.log('Conectando con:', appkitConnector.name)
      connect({ connector: appkitConnector })
    } else if (connectors.length > 0) {
      console.log('Usando primer conector disponible:', connectors[0].name)
      connect({ connector: connectors[0] })
    } else {
      console.error('No hay conectores disponibles')
    }
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
    isOpen: false,
    close: () => {},
    
    // Red y balance
    network: null,
    switchNetwork: () => Promise.resolve(),
    balance: balanceData?.value || BigInt(0),
    formattedBalance: balanceData?.formatted || '0'
  }
}
