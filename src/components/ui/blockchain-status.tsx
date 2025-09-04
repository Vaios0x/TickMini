'use client'

import React from 'react'
import { useAccount, useChainId } from 'wagmi'
import { useRealBlockchainTickets } from '@/hooks/use-real-blockchain-tickets'
import { useRealEvents } from '@/hooks/use-real-events'
import { Badge } from '@/components/ui/badge'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RefreshCw, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

interface BlockchainStatusProps {
  className?: string
}

export function BlockchainStatus({ className }: BlockchainStatusProps) {
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  
  const {
    tickets: realTickets,
    isLoading: ticketsLoading,
    error: ticketsError,
    refreshTickets,
    totalTickets,
    validTickets,
    balance: realBalance
  } = useRealBlockchainTickets()

  const {
    events: realEvents,
    isLoading: eventsLoading,
    error: eventsError,
    refreshEvents,
    totalEvents,
    activeEvents,
    eventCounter
  } = useRealEvents()

  const isLoading = ticketsLoading || eventsLoading
  const hasError = ticketsError || eventsError
  const hasRealData = realTickets.length > 0 || realEvents.length > 0

  const getChainName = (chainId: number) => {
    switch (chainId) {
      case 84532: return 'Base Sepolia'
      case 8453: return 'Base Mainnet'
      default: return `Chain ${chainId}`
    }
  }

  const getStatusIcon = () => {
    if (isLoading) return <Loader2 className="h-4 w-4 animate-spin" />
    if (hasError) return <AlertCircle className="h-4 w-4 text-red-500" />
    if (hasRealData) return <CheckCircle className="h-4 w-4 text-green-500" />
    return <AlertCircle className="h-4 w-4 text-yellow-500" />
  }

  const getStatusText = () => {
    if (isLoading) return 'Conectando...'
    if (hasError) return 'Error de conexión'
    if (hasRealData) return 'Conectado'
    return 'Sin datos'
  }

  const getStatusColor = () => {
    if (isLoading) return 'bg-blue-100 text-blue-800'
    if (hasError) return 'bg-red-100 text-red-800'
    if (hasRealData) return 'bg-green-100 text-green-800'
    return 'bg-yellow-100 text-yellow-800'
  }

  if (!isConnected) {
    return (
      <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className || ''}`}>
        <div className="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 className="text-sm font-medium flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-yellow-500" />
            Estado de Blockchain
          </h3>
        </div>
        <div className="p-6 pt-0">
          <p className="text-sm text-muted-foreground">
            Conecta tu wallet para ver el estado de la blockchain
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className || ''}`}>
      <div className="flex flex-col space-y-1.5 p-6 pb-3">
        <h3 className="text-sm font-medium flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            Estado de Blockchain
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              refreshTickets()
              refreshEvents()
            }}
            disabled={isLoading}
          >
            <RefreshCw className={`h-3 w-3 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </h3>
      </div>
      <div className="p-6 pt-0 space-y-3">
        {/* Estado general */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Estado:</span>
          <Badge className={getStatusColor()}>
            {getStatusText() as React.ReactNode}
          </Badge>
        </div>

        {/* Red */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Red:</span>
          <Badge variant="outline">
            {getChainName(chainId)}
          </Badge>
        </div>

        {/* Wallet */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Wallet:</span>
          <span className="text-xs font-mono">
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </span>
        </div>

        {/* Tickets */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Tickets:</span>
          <div className="flex gap-2">
            <Badge variant="outline">
              {totalTickets} total
            </Badge>
            <Badge variant="outline">
              {validTickets} válidos
            </Badge>
          </div>
        </div>

        {/* Eventos */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Eventos:</span>
          <div className="flex gap-2">
            <Badge variant="outline">
              {totalEvents} total
            </Badge>
            <Badge variant="outline">
              {activeEvents} activos
            </Badge>
          </div>
        </div>

        {/* Balance de tokens */}
        {realBalance > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Balance NFT:</span>
            <Badge variant="outline">
              {realBalance} tokens
            </Badge>
          </div>
        )}

        {/* Errores */}
        {hasError && (
          <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-md">
            <p className="text-xs text-red-600">
              {ticketsError || eventsError}
            </p>
          </div>
        )}

        {/* Información adicional */}
        {hasRealData && (
          <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded-md">
            <p className="text-xs text-green-600">
              ✅ Datos reales de blockchain cargados
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
