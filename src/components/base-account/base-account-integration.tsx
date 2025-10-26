'use client'

import { ReactNode } from 'react'
import { useBaseAccountCapabilities } from '@/hooks/use-base-account-capabilities'
import { useSponsoredTransactions } from '@/hooks/use-sponsored-transactions-base'
import { useBatchTransactions } from '@/hooks/use-batch-transactions'
import { useTicketingNotifications } from '@/hooks/use-ticketing-notifications'

interface BaseAccountIntegrationProps {
  children: ReactNode
}

export function BaseAccountIntegration({ children }: BaseAccountIntegrationProps) {
  const capabilities = useBaseAccountCapabilities()
  const { canSponsor } = useSponsoredTransactions()
  const { canBatch } = useBatchTransactions()
  const { notifyAchievement } = useTicketingNotifications()

  // Mostrar banner de capacidades si está cargando
  if (capabilities.isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Detectando capacidades de Base Account...</p>
        </div>
      </div>
    )
  }

  // Mostrar error si hay problema
  if (capabilities.error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-yellow-400 text-6xl mb-4">⚠️</div>
          <h2 className="text-white text-2xl font-bold mb-2">Error de Base Account</h2>
          <p className="text-gray-400 mb-4">{capabilities.error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-cyan-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-cyan-400 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Base Account Capabilities Banner */}
      {(capabilities.atomicBatch || capabilities.paymasterService || capabilities.auxiliaryFunds) && (
        <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-b border-cyan-500/30 p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center">
                  <span className="text-cyan-400 text-xl">🚀</span>
                </div>
                <div>
                  <h3 className="text-white text-lg font-semibold">
                    Base Account Detectado
                  </h3>
                  <p className="text-cyan-300 text-sm">
                    Experiencia optimizada disponible
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                {capabilities.atomicBatch && (
                  <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-xs font-medium">
                    ⚡ Batch Transactions
                  </span>
                )}
                {capabilities.paymasterService && (
                  <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs font-medium">
                    💰 Gas Patrocinado
                  </span>
                )}
                {capabilities.auxiliaryFunds && (
                  <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-xs font-medium">
                    💳 Fondos Auxiliares
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative">
        {children}
      </div>

      {/* Base Account Benefits Info */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-gray-900/90 backdrop-blur-xl rounded-lg p-4 border border-gray-700 max-w-sm">
          <h4 className="text-white font-semibold mb-2">🚀 Base Account Benefits</h4>
          <div className="space-y-2 text-sm">
            {capabilities.atomicBatch && (
              <div className="flex items-center space-x-2">
                <span className="text-cyan-400">⚡</span>
                <span className="text-gray-300">Batch transactions disponibles</span>
              </div>
            )}
            {capabilities.paymasterService && (
              <div className="flex items-center space-x-2">
                <span className="text-purple-400">💰</span>
                <span className="text-gray-300">Gas fees patrocinados</span>
              </div>
            )}
            {capabilities.auxiliaryFunds && (
              <div className="flex items-center space-x-2">
                <span className="text-green-400">💳</span>
                <span className="text-gray-300">Fondos auxiliares</span>
              </div>
            )}
            {!capabilities.atomicBatch && !capabilities.paymasterService && !capabilities.auxiliaryFunds && (
              <div className="text-gray-400 text-sm">
                Usando wallet tradicional
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
