'use client'

import * as React from 'react'
import { useState, useEffect } from 'react'

interface BatchTransaction {
  id: string
  to: string
  data: string
  value?: string
  gasLimit?: string
}

interface BatchTransactionsProps {
  transactions: BatchTransaction[]
  onBatchExecute: (batchData: any) => Promise<void>
  children: React.ReactNode
}

export function BatchTransactions({ 
  transactions, 
  onBatchExecute, 
  children 
}: BatchTransactionsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [batchData, setBatchData] = useState<any>(null)

  // Verificar soporte para EIP-5792
  const [supportsEIP5792, setSupportsEIP5792] = useState(false)

  useEffect(() => {
    checkEIP5792Support()
  }, [])

  const checkEIP5792Support = async () => {
    try {
      // Verificar si el wallet soporta EIP-5792
      if (typeof window !== 'undefined' && window.ethereum) {
        const capabilities = await window.ethereum.request({
          method: 'wallet_getCapabilities'
        })
        
        setSupportsEIP5792(
          capabilities?.wallet_sendCalls?.supported || false
        )
      }
    } catch (error) {
      console.log('EIP-5792 no soportado:', error)
      setSupportsEIP5792(false)
    }
  }

  const handleBatchExecute = async () => {
    setIsLoading(true)
    setError(null)

    try {
      if (supportsEIP5792) {
        // Usar EIP-5792 si está soportado
        const result = await window.ethereum.request({
          method: 'wallet_sendCalls',
          params: {
            calls: transactions.map(tx => ({
              to: tx.to,
              data: tx.data,
              value: tx.value || '0x0',
              gasLimit: tx.gasLimit || '0x0'
            })),
            chainId: '0x2105', // Base mainnet
            capabilities: {
              paymasterService: {
                url: 'https://paymaster.base.org'
              }
            }
          }
        })

        setBatchData(result)
        await onBatchExecute(result)
      } else {
        // Fallback: ejecutar transacciones secuencialmente
        const results = []
        for (const transaction of transactions) {
          const result = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [{
              to: transaction.to,
              data: transaction.data,
              value: transaction.value || '0x0',
              gasLimit: transaction.gasLimit || '0x0'
            }]
          })
          results.push(result)
        }

        setBatchData({ results, fallback: true })
        await onBatchExecute({ results, fallback: true })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error en la transacción por lotes')
    } finally {
      setIsLoading(false)
    }
  }

  const getTransactionType = (data: string) => {
    if (data.startsWith('0xa9059cbb')) return 'Transfer ERC-20'
    if (data.startsWith('0x23b872dd')) return 'Transfer NFT'
    if (data.startsWith('0x095ea7b3')) return 'Approve Token'
    if (data.startsWith('0x42842e0e')) return 'Safe Transfer NFT'
    return 'Custom Transaction'
  }

  return (
    <div style={{
      background: 'rgba(255, 255, 0, 0.05)',
      border: '2px solid rgba(255, 255, 0, 0.3)',
      borderRadius: 'clamp(12px, 3vw, 20px)',
      padding: 'clamp(1.5rem, 3vw, 2.5rem)',
      marginBottom: 'clamp(1rem, 2vw, 1.5rem)'
    }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
        paddingBottom: 'clamp(1rem, 2vw, 1.5rem)',
        borderBottom: '2px solid rgba(255, 255, 0, 0.2)'
      }}>
        <h3 style={{
          color: '#ffff00',
          fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
          fontWeight: '700',
          margin: '0 0 clamp(0.5rem, 1vw, 0.8rem) 0',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          🔄 Batch Transactions (EIP-5792)
        </h3>
        <p style={{
          color: '#b0b0b0',
          fontSize: 'clamp(0.9rem, 2.2vw, 1.1rem)',
          margin: 0,
          lineHeight: 1.5
        }}>
          Múltiples transacciones en una sola firma - Reduce fricción y gas
        </p>
      </div>

      {/* EIP-5792 Support Status */}
      <div style={{
        background: supportsEIP5792 ? 'rgba(0, 255, 0, 0.1)' : 'rgba(255, 170, 0, 0.1)',
        border: `2px solid ${supportsEIP5792 ? '#00ff00' : '#ffaa00'}`,
        borderRadius: 'clamp(8px, 2vw, 12px)',
        padding: 'clamp(1rem, 2.5vw, 1.5rem)',
        marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: 'clamp(1.5rem, 4vw, 2rem)',
          marginBottom: 'clamp(0.5rem, 1vw, 0.8rem)'
        }}>
          {supportsEIP5792 ? '✅' : '⚠️'}
        </div>
        <h4 style={{
          color: supportsEIP5792 ? '#00ff00' : '#ffaa00',
          fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
          fontWeight: '600',
          margin: '0 0 clamp(0.5rem, 1vw, 0.8rem) 0'
        }}>
          {supportsEIP5792 ? 'EIP-5792 Soportado' : 'EIP-5792 No Soportado'}
        </h4>
        <p style={{
          color: '#b0b0b0',
          fontSize: 'clamp(0.8rem, 2vw, 1rem)',
          margin: 0,
          lineHeight: 1.5
        }}>
          {supportsEIP5792 
            ? 'Transacciones por lotes nativas disponibles'
            : 'Usando fallback secuencial (compatible con todos los wallets)'
          }
        </p>
      </div>

      {/* Transactions List */}
      <div style={{
        marginBottom: 'clamp(1.5rem, 3vw, 2rem)'
      }}>
        <h4 style={{
          color: '#ffff00',
          fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
          fontWeight: '600',
          margin: '0 0 clamp(1rem, 2.5vw, 1.5rem) 0',
          textAlign: 'center'
        }}>
          📋 Transacciones en Lote ({transactions.length})
        </h4>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(0.8rem, 2vw, 1.2rem)'
        }}>
          {transactions.map((transaction, index) => (
            <div
              key={transaction.id}
              style={{
                background: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(255, 255, 0, 0.3)',
                borderRadius: 'clamp(8px, 2vw, 12px)',
                padding: 'clamp(1rem, 2.5vw, 1.5rem)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 0, 0.1)'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(0, 0, 0, 0.3)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 'clamp(0.5rem, 1.2vw, 0.8rem)'
              }}>
                <span style={{
                  color: '#ffff00',
                  fontSize: 'clamp(0.9rem, 2.2vw, 1.1rem)',
                  fontWeight: '600'
                }}>
                  #{index + 1} {getTransactionType(transaction.data)}
                </span>
                <span style={{
                  color: '#b0b0b0',
                  fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                  fontFamily: 'monospace'
                }}>
                  {transaction.to.slice(0, 6)}...{transaction.to.slice(-4)}
                </span>
              </div>
              
              <div style={{
                color: '#e0e0e0',
                fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                fontFamily: 'monospace',
                wordBreak: 'break-all',
                lineHeight: 1.4
              }}>
                Data: {transaction.data.slice(0, 20)}...
              </div>
              
              {transaction.value && transaction.value !== '0x0' && (
                <div style={{
                  color: '#00ffff',
                  fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                  marginTop: 'clamp(0.4rem, 1vw, 0.6rem)'
                }}>
                  Value: {transaction.value}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{
        marginBottom: 'clamp(1.5rem, 3vw, 2rem)'
      }}>
        {children}
      </div>

      {/* Execute Button */}
      <button
        onClick={handleBatchExecute}
        disabled={isLoading || transactions.length === 0}
        style={{
          width: '100%',
          padding: 'clamp(1rem, 2.5vw, 1.5rem)',
          background: isLoading || transactions.length === 0
            ? 'rgba(100, 100, 100, 0.5)'
            : 'linear-gradient(135deg, #ffff00, #ff8000)',
          border: 'none',
          borderRadius: 'clamp(8px, 2vw, 12px)',
          color: '#000000',
          fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
          fontWeight: '700',
          cursor: isLoading || transactions.length === 0 ? 'not-allowed' : 'pointer',
          transition: 'all 0.3s ease',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'clamp(0.5rem, 1.2vw, 0.8rem)'
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
        {isLoading ? (
          <>
            <div style={{
              width: 'clamp(16px, 4vw, 20px)',
              height: 'clamp(16px, 4vw, 20px)',
              border: '2px solid rgba(0, 0, 0, 0.1)',
              borderTop: '2px solid #000000',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
            Procesando...
          </>
        ) : (
          <>
            🔄 Ejecutar Lote ({transactions.length})
          </>
        )}
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

      {/* Success Display */}
      {batchData && !error && (
        <div style={{
          background: 'rgba(0, 255, 0, 0.1)',
          border: '1px solid rgba(0, 255, 0, 0.3)',
          borderRadius: 'clamp(6px, 1.5vw, 8px)',
          padding: 'clamp(0.8rem, 2vw, 1rem)',
          marginTop: 'clamp(0.8rem, 2vw, 1rem)',
          color: '#00ff00',
          fontSize: 'clamp(0.8rem, 1.8vw, 1rem)'
        }}>
          ✅ {supportsEIP5792 ? 'Lote ejecutado con EIP-5792' : 'Lote ejecutado secuencialmente'}
        </div>
      )}
    </div>
  )
}

// Hook para manejar transacciones por lotes
export function useBatchTransactions() {
  const [transactions, setTransactions] = useState<BatchTransaction[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const addTransaction = (transaction: BatchTransaction) => {
    setTransactions(prev => [...prev, transaction])
  }

  const removeTransaction = (id: string) => {
    setTransactions(prev => prev.filter(tx => tx.id !== id))
  }

  const clearTransactions = () => {
    setTransactions([])
  }

  const executeBatch = async (onExecute: (batchData: any) => Promise<void>) => {
    setIsLoading(true)
    setError(null)

    try {
      await onExecute(transactions)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error en el lote')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    transactions,
    addTransaction,
    removeTransaction,
    clearTransactions,
    executeBatch,
    isLoading,
    error
  }
}
