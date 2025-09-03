"use client"

import { useAppKitConnection } from '@/hooks/use-appkit'
import { Button } from './button'
import { Wallet, ChevronDown } from 'lucide-react'
import { useState } from 'react'

export function ConnectButton() {
  const { 
    isConnected, 
    address, 
    formattedAddress, 
    connect, 
    disconnect,
    network,
    formattedBalance 
  } = useAppKitConnection()
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleDisconnect = () => {
    disconnect()
    setIsDropdownOpen(false)
  }

  if (isConnected && address) {
    return (
      <div className="relative">
        <Button
          variant="outline"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center space-x-2"
          tabIndex={0}
          aria-label="Menú de wallet"
        >
          <Wallet className="h-4 w-4" />
          <span>{formattedAddress}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
        
        {isDropdownOpen && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-background border rounded-md shadow-lg z-50">
            <div className="p-2">
              {formattedBalance && (
                <div className="px-3 py-2 text-sm text-muted-foreground border-b">
                  Balance: {formattedBalance}
                </div>
              )}
              <Button
                variant="ghost"
                onClick={handleDisconnect}
                className="w-full justify-start"
                tabIndex={0}
                aria-label="Desconectar wallet"
              >
                Desconectar
              </Button>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <Button
      onClick={connect}
      className="flex items-center space-x-2"
      tabIndex={0}
      aria-label="Conectar wallet"
    >
      <Wallet className="h-4 w-4" />
      <span>Conectar Wallet</span>
    </Button>
  )
}
