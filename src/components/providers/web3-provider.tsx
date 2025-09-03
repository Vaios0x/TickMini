"use client"

import React, { useState } from 'react'

interface Web3ContextType {
  isConnected: boolean
  account: string | null
  connect: () => void
  disconnect: () => void
}

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

  return (
    <div>
      {children}
    </div>
  )
}

export function useWeb3() {
  return {
    isConnected: false,
    account: null,
    connect: () => {},
    disconnect: () => {}
  }
}
