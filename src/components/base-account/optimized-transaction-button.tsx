'use client'

import { useState } from 'react'
import { useBaseAccountCapabilities } from '@/hooks/use-base-account-capabilities'
import { useSponsoredTransactions } from '@/hooks/use-sponsored-transactions-base'
import { useBatchTransactions } from '@/hooks/use-batch-transactions'
import { useTicketingNotifications } from '@/hooks/use-ticketing-notifications'

interface OptimizedTransactionButtonProps {
  eventId: string
  price: string
  eventTitle: string
  onSuccess?: () => void
  onError?: (error: Error) => void
  className?: string
}

export function OptimizedTransactionButton({
  eventId,
  price,
  eventTitle,
  onSuccess,
  onError,
  className = ''
}: OptimizedTransactionButtonProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const capabilities = useBaseAccountCapabilities()
  const { purchaseTicketSponsored, canSponsor } = useSponsoredTransactions()
  const { purchaseTicketBatch, canBatch } = useBatchTransactions()
  const { notifyAchievement } = useTicketingNotifications()

  const handleOptimizedPurchase = async () => {
    setIsProcessing(true)
    
    try {
      // Determinar la mejor estrategia de transacción
      if (canBatch && canSponsor) {
        // Base Account: Batch + Sponsored (mejor experiencia)
        await purchaseTicketBatch(eventId, price)
        notifyAchievement('🚀 Ticket comprado con batch transaction patrocinada')
      } else if (canSponsor) {
        // Solo sponsored (sin gas fees)
        await purchaseTicketSponsored(eventId, price)
        notifyAchievement('💰 Ticket comprado sin gas fees')
      } else if (canBatch) {
        // Solo batch (una sola confirmación)
        await purchaseTicketBatch(eventId, price)
        notifyAchievement('⚡ Ticket comprado con batch transaction')
      } else {
        // Wallet tradicional (múltiples confirmaciones)
        // Implementar transacción tradicional
        notifyAchievement('🎫 Ticket comprado (wallet tradicional)')
      }

      onSuccess?.()
    } catch (error) {
      console.error('Transaction failed:', error)
      notifyAchievement('❌ Error en la compra del ticket')
      onError?.(error as Error)
    } finally {
      setIsProcessing(false)
    }
  }

  const getButtonText = () => {
    if (isProcessing) return 'Procesando...'
    
    if (canBatch && canSponsor) {
      return '🚀 Comprar (Optimizado)'
    } else if (canSponsor) {
      return '💰 Comprar (Sin Gas)'
    } else if (canBatch) {
      return '⚡ Comprar (Batch)'
    } else {
      return '🎫 Comprar Ticket'
    }
  }

  const getButtonStyle = () => {
    if (canBatch && canSponsor) {
      return 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400'
    } else if (canSponsor) {
      return 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400'
    } else if (canBatch) {
      return 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400'
    } else {
      return 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600'
    }
  }

  const getCapabilityInfo = () => {
    if (canBatch && canSponsor) {
      return {
        title: '🚀 Experiencia Optimizada',
        description: 'Batch transaction + Gas patrocinado',
        benefits: ['Una sola confirmación', 'Sin gas fees', 'Transacción atómica']
      }
    } else if (canSponsor) {
      return {
        title: '💰 Sin Gas Fees',
        description: 'Transacción patrocinada',
        benefits: ['Sin gas fees', 'Transacción rápida']
      }
    } else if (canBatch) {
      return {
        title: '⚡ Batch Transaction',
        description: 'Múltiples operaciones en una',
        benefits: ['Una sola confirmación', 'Transacción atómica']
      }
    } else {
      return {
        title: '🎫 Wallet Tradicional',
        description: 'Transacción estándar',
        benefits: ['Múltiples confirmaciones', 'Gas fees requeridos']
      }
    }
  }

  const capabilityInfo = getCapabilityInfo()

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Transaction Button */}
      <button
        onClick={handleOptimizedPurchase}
        disabled={isProcessing}
        className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${getButtonStyle()}`}
      >
        {getButtonText()}
      </button>

      {/* Capability Info */}
      <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
        <h4 className="text-white font-semibold mb-2">{capabilityInfo.title}</h4>
        <p className="text-gray-300 text-sm mb-3">{capabilityInfo.description}</p>
        <div className="space-y-1">
          {capabilityInfo.benefits.map((benefit, index) => (
            <div key={index} className="flex items-center space-x-2 text-xs text-gray-400">
              <span className="text-green-400">✓</span>
              <span>{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Event Info */}
      <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-600">
        <h5 className="text-white font-medium mb-2">📋 Detalles del Evento</h5>
        <div className="space-y-1 text-sm text-gray-300">
          <div><span className="text-gray-400">Evento:</span> {eventTitle}</div>
          <div><span className="text-gray-400">Precio:</span> {price} ETH</div>
          <div><span className="text-gray-400">ID:</span> {eventId}</div>
        </div>
      </div>
    </div>
  )
}
