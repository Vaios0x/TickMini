'use client'

import * as React from 'react'
import { useState } from 'react'
import { TechnicalGuidelinesChecker } from '@/components/compliance/technical-guidelines-checker'
import { InAppAuthentication } from '@/components/auth/in-app-authentication'
import { ClientAgnosticContent } from '@/components/ui/client-agnostic-content'
import { SponsoredTransaction, BatchTransaction } from '@/components/transactions/sponsored-transactions'
import { BatchTransactions, useBatchTransactions } from '@/components/transactions/batch-transactions'

export default function TechnicalGuidelinesDemo() {
  const [authUser, setAuthUser] = useState<any>(null)
  const [authError, setAuthError] = useState<string | null>(null)
  const [shareCount, setShareCount] = useState(0)
  const [batchTransactions, setBatchTransactions] = useState([
    {
      id: '1',
      to: '0x1234567890123456789012345678901234567890',
      data: '0xa9059cbb00000000000000000000000012345678901234567890123456789012345678900000000000000000000000000000000000000000000000000000000000000001',
      value: '0x0',
      gasLimit: '0x5208'
    },
    {
      id: '2',
      to: '0x0987654321098765432109876543210987654321',
      data: '0x23b872dd000000000000000000000000123456789012345678901234567890123456789000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000001',
      value: '0x0',
      gasLimit: '0x5208'
    }
  ])

  const {
    transactions,
    addTransaction,
    removeTransaction,
    clearTransactions,
    executeBatch,
    isLoading: batchLoading,
    error: batchError
  } = useBatchTransactions()

  const handleAuthSuccess = (user: any) => {
    setAuthUser(user)
    setAuthError(null)
  }

  const handleAuthError = (error: string) => {
    setAuthError(error)
    setAuthUser(null)
  }

  const handleShare = () => {
    setShareCount(prev => prev + 1)
    console.log('Compartiendo en feed...')
  }

  const handleOpenUrl = (url: string) => {
    console.log('Abriendo URL:', url)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleTransaction = async (transactionData: any) => {
    console.log('Ejecutando transacción patrocinada:', transactionData)
    await new Promise(resolve => setTimeout(resolve, 2000))
  }

  const handleBatchExecute = async (batchData: any) => {
    console.log('Ejecutando lote de transacciones:', batchData)
    await new Promise(resolve => setTimeout(resolve, 3000))
  }

  const addSampleTransaction = () => {
    const newTx = {
      id: Date.now().toString(),
      to: '0x' + Math.random().toString(16).substr(2, 40),
      data: '0x' + Math.random().toString(16).substr(2, 64),
      value: '0x0',
      gasLimit: '0x5208'
    }
    addTransaction(newTx)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
      padding: 'clamp(1rem, 2vw, 2rem)',
      color: '#ffffff'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: 'clamp(2rem, 4vw, 3rem)',
          padding: 'clamp(2rem, 4vw, 3rem)',
          background: 'rgba(0, 255, 255, 0.1)',
          borderRadius: 'clamp(15px, 4vw, 25px)',
          border: '2px solid rgba(0, 255, 255, 0.3)',
          boxShadow: '0 20px 40px rgba(0, 255, 255, 0.1)'
        }}>
          <h1 style={{
            color: '#00ffff',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: '800',
            margin: '0 0 clamp(1rem, 2vw, 1.5rem) 0',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            textShadow: '0 0 20px rgba(0, 255, 255, 0.5)'
          }}>
            🔧 Technical Guidelines Demo
          </h1>
          <p style={{
            color: '#b0b0b0',
            fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
            margin: 0,
            lineHeight: 1.6,
            maxWidth: '800px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Demostración completa de todas las Technical Guidelines de Base.dev
          </p>
        </div>

        {/* Technical Guidelines Checker */}
        <div style={{
          marginBottom: 'clamp(2rem, 4vw, 3rem)'
        }}>
          <TechnicalGuidelinesChecker />
        </div>

        {/* In-App Authentication */}
        <div style={{
          marginBottom: 'clamp(2rem, 4vw, 3rem)'
        }}>
          <InAppAuthentication
            onAuthSuccess={handleAuthSuccess}
            onAuthError={handleAuthError}
          >
            {authUser ? (
              <div style={{
                background: 'rgba(0, 255, 0, 0.1)',
                border: '2px solid rgba(0, 255, 0, 0.3)',
                borderRadius: 'clamp(8px, 2vw, 12px)',
                padding: 'clamp(1rem, 2.5vw, 1.5rem)',
                textAlign: 'center'
              }}>
                <h4 style={{
                  color: '#00ff00',
                  fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                  fontWeight: '600',
                  margin: '0 0 clamp(0.8rem, 2vw, 1.2rem) 0'
                }}>
                  ✅ Usuario Autenticado
                </h4>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 'clamp(0.8rem, 2vw, 1.2rem)',
                  marginBottom: 'clamp(0.8rem, 2vw, 1.2rem)'
                }}>
                  <img
                    src={authUser.pfpUrl}
                    alt="Avatar"
                    style={{
                      width: 'clamp(40px, 10vw, 60px)',
                      height: 'clamp(40px, 10vw, 60px)',
                      borderRadius: '50%',
                      border: '2px solid #00ff00'
                    }}
                  />
                  <div>
                    <div style={{
                      color: '#ffffff',
                      fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                      fontWeight: '600',
                      marginBottom: 'clamp(0.2rem, 0.5vw, 0.4rem)'
                    }}>
                      {authUser.displayName}
                    </div>
                    <div style={{
                      color: '#b0b0b0',
                      fontSize: 'clamp(0.8rem, 2vw, 1rem)'
                    }}>
                      @{authUser.username}
                    </div>
                  </div>
                </div>
                <p style={{
                  color: '#b0b0b0',
                  fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                  margin: 0,
                  fontStyle: 'italic'
                }}>
                  {authUser.bio}
                </p>
              </div>
            ) : (
              <div style={{
                background: 'rgba(255, 170, 0, 0.1)',
                border: '2px solid rgba(255, 170, 0, 0.3)',
                borderRadius: 'clamp(8px, 2vw, 12px)',
                padding: 'clamp(1rem, 2.5vw, 1.5rem)',
                textAlign: 'center'
              }}>
                <h4 style={{
                  color: '#ffaa00',
                  fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                  fontWeight: '600',
                  margin: '0 0 clamp(0.8rem, 2vw, 1.2rem) 0'
                }}>
                  ⚠️ No Autenticado
                </h4>
                <p style={{
                  color: '#b0b0b0',
                  fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                  margin: 0
                }}>
                  Usa los botones de arriba para autenticarte
                </p>
                {authError && (
                  <p style={{
                    color: '#ff6b6b',
                    fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                    margin: 'clamp(0.8rem, 2vw, 1.2rem) 0 0 0'
                  }}>
                    ❌ {authError}
                  </p>
                )}
              </div>
            )}
          </InAppAuthentication>
        </div>

        {/* Client-Agnostic Content */}
        <div style={{
          marginBottom: 'clamp(2rem, 4vw, 3rem)'
        }}>
          <ClientAgnosticContent
            shareText="Compartir en Feed"
            onShare={handleShare}
            onOpenUrl={handleOpenUrl}
          >
            <div style={{
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: 'clamp(8px, 2vw, 12px)',
              padding: 'clamp(1rem, 2.5vw, 1.5rem)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <h4 style={{
                color: '#00ffff',
                fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                fontWeight: '600',
                margin: '0 0 clamp(0.8rem, 2vw, 1.2rem) 0',
                textAlign: 'center'
              }}>
                📱 Contenido Client-Agnostic
              </h4>
              <p style={{
                color: '#b0b0b0',
                fontSize: 'clamp(0.9rem, 2.2vw, 1.1rem)',
                margin: '0 0 clamp(1rem, 2.5vw, 1.5rem) 0',
                lineHeight: 1.6,
                textAlign: 'center'
              }}>
                Este contenido funciona en cualquier cliente sin comportamientos específicos
              </p>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 'clamp(0.5rem, 1.2vw, 0.8rem)',
                color: '#00ffff',
                fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                fontWeight: '500'
              }}>
                <span>📊</span>
                <span>Compartido {shareCount} veces</span>
              </div>
            </div>
          </ClientAgnosticContent>
        </div>

        {/* Sponsored Transactions */}
        <div style={{
          marginBottom: 'clamp(2rem, 4vw, 3rem)'
        }}>
          <SponsoredTransaction
            onTransaction={handleTransaction}
            description="Transacción patrocinada por Base Paymaster - Sin costo de gas"
          >
            <div style={{
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: 'clamp(8px, 2vw, 12px)',
              padding: 'clamp(1rem, 2.5vw, 1.5rem)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <h4 style={{
                color: '#00ffff',
                fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                fontWeight: '600',
                margin: '0 0 clamp(0.8rem, 2vw, 1.2rem) 0',
                textAlign: 'center'
              }}>
                🆓 Transacción Patrocinada
              </h4>
              <p style={{
                color: '#b0b0b0',
                fontSize: 'clamp(0.9rem, 2.2vw, 1.1rem)',
                margin: 0,
                lineHeight: 1.6,
                textAlign: 'center'
              }}>
                Esta transacción será patrocinada por Base Paymaster
              </p>
            </div>
          </SponsoredTransaction>
        </div>

        {/* Batch Transactions */}
        <div style={{
          marginBottom: 'clamp(2rem, 4vw, 3rem)'
        }}>
          <BatchTransactions
            transactions={transactions}
            onBatchExecute={handleBatchExecute}
          >
            <div style={{
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: 'clamp(8px, 2vw, 12px)',
              padding: 'clamp(1rem, 2.5vw, 1.5rem)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <h4 style={{
                color: '#ffff00',
                fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                fontWeight: '600',
                margin: '0 0 clamp(0.8rem, 2vw, 1.2rem) 0',
                textAlign: 'center'
              }}>
                🔄 Transacciones por Lotes
              </h4>
              <p style={{
                color: '#b0b0b0',
                fontSize: 'clamp(0.9rem, 2.2vw, 1.1rem)',
                margin: '0 0 clamp(1rem, 2.5vw, 1.5rem) 0',
                lineHeight: 1.6,
                textAlign: 'center'
              }}>
                Ejecuta múltiples transacciones en una sola firma
              </p>
              
              <div style={{
                display: 'flex',
                gap: 'clamp(0.8rem, 2vw, 1.2rem)',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
                <button
                  onClick={addSampleTransaction}
                  style={{
                    padding: 'clamp(0.6rem, 1.5vw, 0.8rem) clamp(1rem, 2.5vw, 1.5rem)',
                    background: 'linear-gradient(135deg, #ffff00, #ff8000)',
                    border: 'none',
                    borderRadius: 'clamp(6px, 1.5vw, 8px)',
                    color: '#000000',
                    fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-1px)'
                    e.currentTarget.style.boxShadow = '0 5px 15px rgba(255, 255, 0, 0.3)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  ➕ Agregar Transacción
                </button>
                
                <button
                  onClick={clearTransactions}
                  style={{
                    padding: 'clamp(0.6rem, 1.5vw, 0.8rem) clamp(1rem, 2.5vw, 1.5rem)',
                    background: 'rgba(255, 0, 0, 0.2)',
                    border: '2px solid rgba(255, 0, 0, 0.3)',
                    borderRadius: 'clamp(6px, 1.5vw, 8px)',
                    color: '#ff6b6b',
                    fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 0, 0, 0.3)'
                    e.currentTarget.style.transform = 'translateY(-1px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 0, 0, 0.2)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  🗑️ Limpiar
                </button>
              </div>
            </div>
          </BatchTransactions>
        </div>

        {/* Footer */}
        <div style={{
          textAlign: 'center',
          padding: 'clamp(2rem, 4vw, 3rem)',
          background: 'rgba(0, 255, 255, 0.05)',
          borderRadius: 'clamp(12px, 3vw, 20px)',
          border: '1px solid rgba(0, 255, 255, 0.2)'
        }}>
          <h3 style={{
            color: '#00ffff',
            fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
            fontWeight: '700',
            margin: '0 0 clamp(1rem, 2vw, 1.5rem) 0'
          }}>
            🎯 Technical Guidelines Completadas
          </h3>
          <p style={{
            color: '#b0b0b0',
            fontSize: 'clamp(0.9rem, 2.2vw, 1.1rem)',
            margin: 0,
            lineHeight: 1.6,
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            TickMini cumple con todas las Technical Guidelines de Base.dev para una experiencia óptima en Base app
          </p>
        </div>
      </div>
    </div>
  )
}
