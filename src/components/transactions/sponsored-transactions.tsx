'use client'

import * as React from 'react'
import { useState } from 'react'

interface SponsoredTransactionProps {
  onTransaction: (transactionData: any) => Promise<void>
  children: React.ReactNode
  description?: string
}

export function SponsoredTransaction({ 
  onTransaction, 
  children, 
  description = 'Transacción patrocinada por Base Paymaster' 
}: SponsoredTransactionProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleTransaction = async (transactionData: any) => {
    setIsLoading(true)
    setError(null)

    try {
      // Simular configuración de Base Paymaster
      const sponsoredTransaction = {
        ...transactionData,
        sponsored: true,
        paymaster: {
          url: 'https://paymaster.base.org',
          data: '0x' // Datos del paymaster
        }
      }

      await onTransaction(sponsoredTransaction)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error en la transacción')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{
      position: 'relative',
      background: 'rgba(0, 255, 255, 0.05)',
      border: '1px solid rgba(0, 255, 255, 0.2)',
      borderRadius: 'clamp(10px, 2vw, 15px)',
      padding: 'clamp(1rem, 2vw, 1.5rem)',
      marginBottom: 'clamp(1rem, 2vw, 1.5rem)'
    }}>
      {/* Sponsored Badge */}
      <div style={{
        position: 'absolute',
        top: 'clamp(0.5rem, 1vw, 0.8rem)',
        right: 'clamp(0.5rem, 1vw, 0.8rem)',
        background: 'linear-gradient(135deg, #00ffff, #0080ff)',
        color: '#000000',
        padding: 'clamp(0.2rem, 0.5vw, 0.4rem) clamp(0.5rem, 1vw, 0.8rem)',
        borderRadius: 'clamp(4px, 1vw, 6px)',
        fontSize: 'clamp(0.7rem, 1.5vw, 0.9rem)',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }}>
        🆓 Patrocinado
      </div>

      {/* Content */}
      <div style={{
        paddingTop: 'clamp(1.5rem, 3vw, 2rem)'
      }}>
        {children}
      </div>

      {/* Description */}
      <p style={{
        color: '#b0b0b0',
        fontSize: 'clamp(0.8rem, 1.8vw, 1rem)',
        margin: 'clamp(0.8rem, 2vw, 1rem) 0 0 0',
        fontStyle: 'italic'
      }}>
        {description}
      </p>

      {/* Error Display */}
      {error && (
        <div style={{
          background: 'rgba(255, 0, 0, 0.1)',
          border: '1px solid rgba(255, 0, 0, 0.3)',
          borderRadius: 'clamp(6px, 1.5vw, 8px)',
          padding: 'clamp(0.8rem, 2vw, 1rem)',
          marginTop: 'clamp(0.8rem, 2vw, 1rem)',
          color: '#ff6b6b',
          fontSize: 'clamp(0.8rem, 1.8vw, 1rem)'
        }}>
          ❌ {error}
        </div>
      )}

      {/* Loading Indicator */}
      {isLoading && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(0.5rem, 1vw, 0.8rem)',
          marginTop: 'clamp(0.8rem, 2vw, 1rem)',
          padding: 'clamp(0.8rem, 2vw, 1rem)',
          background: 'rgba(0, 255, 255, 0.1)',
          borderRadius: 'clamp(6px, 1.5vw, 8px)',
          border: '1px solid rgba(0, 255, 255, 0.3)'
        }}>
          <div style={{
            width: 'clamp(16px, 4vw, 20px)',
            height: 'clamp(16px, 4vw, 20px)',
            border: '2px solid rgba(255, 255, 255, 0.1)',
            borderTop: '2px solid #00ffff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          <span style={{
            color: '#00ffff',
            fontSize: 'clamp(0.8rem, 1.8vw, 1rem)',
            fontWeight: '500'
          }}>
            Procesando transacción patrocinada...
          </span>
        </div>
      )}
    </div>
  )
}

// Componente para transacciones por lotes (EIP-5792)
export function BatchTransaction({ 
  transactions, 
  onBatchExecute,
  children 
}: { 
  transactions: any[]
  onBatchExecute: (batchData: any) => Promise<void>
  children: React.ReactNode 
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleBatchExecute = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Simular EIP-5792 batch transaction
      const batchData = {
        calls: transactions,
        sponsored: true,
        paymaster: {
          url: 'https://paymaster.base.org',
          data: '0x'
        }
      }

      await onBatchExecute(batchData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error en la transacción por lotes')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{
      background: 'rgba(255, 255, 0, 0.05)',
      border: '1px solid rgba(255, 255, 0, 0.2)',
      borderRadius: 'clamp(10px, 2vw, 15px)',
      padding: 'clamp(1rem, 2vw, 1.5rem)',
      marginBottom: 'clamp(1rem, 2vw, 1.5rem)'
    }}>
      {/* Batch Badge */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'clamp(0.5rem, 1vw, 0.8rem)',
        marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
        padding: 'clamp(0.5rem, 1vw, 0.8rem)',
        background: 'rgba(255, 255, 0, 0.1)',
        borderRadius: 'clamp(6px, 1.5vw, 8px)',
        border: '1px solid rgba(255, 255, 0, 0.3)'
      }}>
        <span style={{
          fontSize: 'clamp(1.2rem, 3vw, 1.5rem)'
        }}>
          🔄
        </span>
        <div>
          <h3 style={{
            color: '#ffff00',
            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            fontWeight: '700',
            margin: 0
          }}>
            Transacción por Lotes (EIP-5792)
          </h3>
          <p style={{
            color: '#b0b0b0',
            fontSize: 'clamp(0.8rem, 1.8vw, 1rem)',
            margin: 0
          }}>
            {transactions.length} transacciones en una sola firma
          </p>
        </div>
      </div>

      {/* Content */}
      {children}

      {/* Batch Execute Button */}
      <button
        onClick={handleBatchExecute}
        disabled={isLoading || transactions.length === 0}
        style={{
          width: '100%',
          padding: 'clamp(0.8rem, 2vw, 1.2rem)',
          background: isLoading || transactions.length === 0
            ? 'rgba(100, 100, 100, 0.5)'
            : 'linear-gradient(135deg, #ffff00, #ff8000)',
          border: 'none',
          borderRadius: 'clamp(8px, 2vw, 12px)',
          color: '#000000',
          fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
          fontWeight: '700',
          cursor: isLoading || transactions.length === 0 ? 'not-allowed' : 'pointer',
          transition: 'all 0.3s ease',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          marginTop: 'clamp(1rem, 2vw, 1.5rem)'
        }}
        onMouseEnter={(e) => {
          if (!isLoading && transactions.length > 0) {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 10px 20px rgba(255, 255, 0, 0.4)'
          }
        }}
        onMouseLeave={(e) => {
          if (!isLoading && transactions.length > 0) {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }
        }}
      >
        {isLoading ? '⏳ Procesando...' : `🔄 Ejecutar Lote (${transactions.length})`}
      </button>

      {/* Error Display */}
      {error && (
        <div style={{
          background: 'rgba(255, 0, 0, 0.1)',
          border: '1px solid rgba(255, 0, 0, 0.3)',
          borderRadius: 'clamp(6px, 1.5vw, 8px)',
          padding: 'clamp(0.8rem, 2vw, 1rem)',
          marginTop: 'clamp(0.8rem, 2vw, 1rem)',
          color: '#ff6b6b',
          fontSize: 'clamp(0.8rem, 1.8vw, 1rem)'
        }}>
          ❌ {error}
        </div>
      )}
    </div>
  )
}

// Hook para transacciones patrocinadas
export function useSponsoredTransactions() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const executeSponsoredTransaction = async (transactionData: any) => {
    setIsLoading(true)
    setError(null)

    try {
      // Simular ejecución de transacción patrocinada
      const result = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            hash: '0x' + Math.random().toString(16).substr(2, 64),
            sponsored: true,
            gasUsed: '0',
            gasPrice: '0'
          })
        }, 2000)
      })

      return result
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error en la transacción')
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return {
    executeSponsoredTransaction,
    isLoading,
    error
  }
}
