"use client"

import { createContext, useContext, useState } from 'react'

interface Web3ContextType {
  isConnected: boolean
  account: string | null
  connect: () => void
  disconnect: () => void
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined)

interface Web3ProviderProps {
  children: any
}

export function Web3Provider({ children }: Web3ProviderProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [account, setAccount] = useState<string | null>(null)

  const connect = () => {
    // Simulación de conexión de wallet
    setIsConnected(true)
    setAccount('0x1234...5678')
  }

  const disconnect = () => {
    setIsConnected(false)
    setAccount(null)
  }

  const value: Web3ContextType = {
    isConnected,
    account,
    connect,
    disconnect,
  }

  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  )
}

export function useWeb3() {
  const context = useContext(Web3Context)
  if (context === undefined) {
    throw new Error('useWeb3 must be used within a Web3Provider')
  }
  return context
}
