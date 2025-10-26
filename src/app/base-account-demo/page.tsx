'use client'

import { useState } from 'react'
import { useBaseAccountCapabilities } from '@/hooks/use-base-account-capabilities'
import { useSponsoredTransactions } from '@/hooks/use-sponsored-transactions-base'
import { useBatchTransactions } from '@/hooks/use-batch-transactions'
import { OptimizedTransactionButton } from '@/components/base-account/optimized-transaction-button'

export default function BaseAccountDemoPage() {
  const [selectedEvent, setSelectedEvent] = useState({
    id: 'event-1',
    title: '🎵 Concierto de Rock',
    price: '0.05'
  })

  const capabilities = useBaseAccountCapabilities()
  const { canSponsor } = useSponsoredTransactions()
  const { canBatch } = useBatchTransactions()

  const demoEvents = [
    { id: 'event-1', title: '🎵 Concierto de Rock', price: '0.05' },
    { id: 'event-2', title: '🎭 Teatro Clásico', price: '0.03' },
    { id: 'event-3', title: '🎮 Gaming Tournament', price: '0.02' }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">
              🚀 Base Account Demo
            </h1>
            <p className="text-gray-400">
              Demuestra las capacidades avanzadas de Base Account en TickMini
            </p>
          </div>

          {/* Capabilities Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className={`p-6 rounded-lg border-2 ${capabilities.atomicBatch ? 'border-cyan-400 bg-cyan-500/10' : 'border-gray-600 bg-gray-800/50'}`}>
              <div className="text-center">
                <div className="text-4xl mb-2">⚡</div>
                <h3 className="text-lg font-semibold text-white mb-2">Atomic Batch</h3>
                <p className="text-sm text-gray-400 mb-2">Múltiples transacciones en una</p>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${capabilities.atomicBatch ? 'bg-cyan-500/20 text-cyan-300' : 'bg-gray-600/20 text-gray-400'}`}>
                  {capabilities.atomicBatch ? 'Disponible' : 'No disponible'}
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-lg border-2 ${capabilities.paymasterService ? 'border-purple-400 bg-purple-500/10' : 'border-gray-600 bg-gray-800/50'}`}>
              <div className="text-center">
                <div className="text-4xl mb-2">💰</div>
                <h3 className="text-lg font-semibold text-white mb-2">Paymaster Service</h3>
                <p className="text-sm text-gray-400 mb-2">Gas fees patrocinados</p>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${capabilities.paymasterService ? 'bg-purple-500/20 text-purple-300' : 'bg-gray-600/20 text-gray-400'}`}>
                  {capabilities.paymasterService ? 'Disponible' : 'No disponible'}
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-lg border-2 ${capabilities.auxiliaryFunds ? 'border-green-400 bg-green-500/10' : 'border-gray-600 bg-gray-800/50'}`}>
              <div className="text-center">
                <div className="text-4xl mb-2">💳</div>
                <h3 className="text-lg font-semibold text-white mb-2">Auxiliary Funds</h3>
                <p className="text-sm text-gray-400 mb-2">Fondos auxiliares</p>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${capabilities.auxiliaryFunds ? 'bg-green-500/20 text-green-300' : 'bg-gray-600/20 text-gray-400'}`}>
                  {capabilities.auxiliaryFunds ? 'Disponible' : 'No disponible'}
                </div>
              </div>
            </div>
          </div>

          {/* Demo Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Event Selection */}
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
              <h2 className="text-xl font-semibold text-white mb-4">
                🎫 Seleccionar Evento
              </h2>
              <div className="space-y-3">
                {demoEvents.map((event) => (
                  <div
                    key={event.id}
                    onClick={() => setSelectedEvent(event)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedEvent.id === event.id
                        ? 'border-cyan-400 bg-cyan-500/10'
                        : 'border-gray-600 bg-gray-800/50 hover:border-gray-500'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-white font-medium">{event.title}</h3>
                        <p className="text-gray-400 text-sm">{event.price} ETH</p>
                      </div>
                      {selectedEvent.id === event.id && (
                        <span className="text-cyan-400">✓</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Transaction Demo */}
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
              <h2 className="text-xl font-semibold text-white mb-4">
                🚀 Transacción Optimizada
              </h2>
              <OptimizedTransactionButton
                eventId={selectedEvent.id}
                price={selectedEvent.price}
                eventTitle={selectedEvent.title}
                onSuccess={() => {
                  console.log('Transaction successful!')
                }}
                onError={(error) => {
                  console.error('Transaction failed:', error)
                }}
              />
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              ✨ Beneficios de Base Account
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
                <div className="text-cyan-400 text-3xl mb-3">⚡</div>
                <h3 className="text-lg font-semibold text-white mb-2">Atomic Batch</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Combina múltiples transacciones en una sola operación atómica
                </p>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Una sola confirmación</li>
                  <li>• Transacción atómica</li>
                  <li>• Menos gas fees</li>
                </ul>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
                <div className="text-purple-400 text-3xl mb-3">💰</div>
                <h3 className="text-lg font-semibold text-white mb-2">Paymaster Service</h3>
                <p className="text-gray-400 text-sm mb-4">
                  La aplicación paga los gas fees, no el usuario
                </p>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Sin gas fees para el usuario</li>
                  <li>• Transacciones gratuitas</li>
                  <li>• Mejor UX</li>
                </ul>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
                <div className="text-green-400 text-3xl mb-3">🔐</div>
                <h3 className="text-lg font-semibold text-white mb-2">Passkey Auth</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Autenticación con biometría del dispositivo
                </p>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Más seguro</li>
                  <li>• Más rápido</li>
                  <li>• Sin contraseñas</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Implementation Info */}
          <div className="mt-12 bg-gray-900/50 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">
              🔧 Implementación Técnica
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-cyan-400 mb-2">Capacidades Detectadas</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Atomic Batch:</span>
                    <span className={capabilities.atomicBatch ? 'text-green-400' : 'text-red-400'}>
                      {capabilities.atomicBatch ? 'Sí' : 'No'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Paymaster Service:</span>
                    <span className={capabilities.paymasterService ? 'text-green-400' : 'text-red-400'}>
                      {capabilities.paymasterService ? 'Sí' : 'No'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Auxiliary Funds:</span>
                    <span className={capabilities.auxiliaryFunds ? 'text-green-400' : 'text-red-400'}>
                      {capabilities.auxiliaryFunds ? 'Sí' : 'No'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-purple-400 mb-2">Estrategia de Transacción</h3>
                <div className="text-sm text-gray-300">
                  {canBatch && canSponsor ? (
                    <div className="text-cyan-400">
                      🚀 Batch + Sponsored (Óptima)
                    </div>
                  ) : canSponsor ? (
                    <div className="text-purple-400">
                      💰 Solo Sponsored
                    </div>
                  ) : canBatch ? (
                    <div className="text-cyan-400">
                      ⚡ Solo Batch
                    </div>
                  ) : (
                    <div className="text-gray-400">
                      🎫 Wallet Tradicional
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
