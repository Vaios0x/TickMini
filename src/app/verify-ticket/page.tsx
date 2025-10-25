'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useTicketVerification } from '@/hooks/use-ticket-verification'
import { QRScanner } from '@/components/ui/qr-scanner'
import { VerificationHistoryComponent } from '@/components/ui/verification-history'
import { TicketDetailsModal } from '@/components/ui/ticket-details-modal'
import { BulkVerification } from '@/components/ui/bulk-verification'
import { VerificationProgress } from '@/components/ui/verification-progress'
import { VerificationStats } from '@/components/ui/verification-stats'
import { WelcomeMessage } from '@/components/ui/welcome-message'
import { TicketVerificationResult } from '@/hooks/use-ticket-verification'
import './verify-ticket.css'

export default function VerifyTicketPage() {
  const {
    isVerifying,
    verificationResult,
    verificationHistory,
    error,
    verifyTicket,
    verifyTicketByQR,
    verifyMultipleTickets,
    clearHistory,
    exportHistory,
    clearError
  } = useTicketVerification()
  
  const searchParams = useSearchParams()
  const [ticketId, setTicketId] = useState('')
  const [isQRScannerOpen, setIsQRScannerOpen] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [showStats, setShowStats] = useState(true)
  const [selectedHistoryEntry, setSelectedHistoryEntry] = useState<TicketVerificationResult | null>(null)
  const [bulkProgress, setBulkProgress] = useState({ current: 0, total: 0, isVisible: false })

  // Pre-llenar el campo con el ticketId de la URL
  useEffect(() => {
    const ticketIdFromUrl = searchParams.get('ticketId')
    if (ticketIdFromUrl) {
      setTicketId(String(ticketIdFromUrl))
      // Auto-verificar si viene de Mis Tickets
      setTimeout(() => {
        verifyTicket(String(ticketIdFromUrl))
      }, 500)
    }
  }, [searchParams, verifyTicket])

  const handleVerify = async (ticketIdToVerify?: string) => {
    const idToVerify = ticketIdToVerify || ticketId
    if (!idToVerify || !String(idToVerify).trim()) {
      return
    }
    await verifyTicket(String(idToVerify))
  }

  const handleQRScan = (qrData: string) => {
    setIsQRScannerOpen(false)
    verifyTicketByQR(qrData)
  }

  const handleViewHistoryDetails = (entry: any) => {
    setSelectedHistoryEntry(entry.result)
    setShowHistory(false)
  }

  const handleBulkVerification = async (ticketIds: string[]) => {
    if (!ticketIds || ticketIds.length === 0) return
    
    setBulkProgress({ current: 0, total: ticketIds.length, isVisible: true })
    
    try {
      for (let i = 0; i < ticketIds.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 500))
        setBulkProgress(prev => ({ ...prev, current: i + 1 }))
      }
      
      setTimeout(() => {
        setBulkProgress(prev => ({ ...prev, isVisible: false }))
      }, 3000)
    } catch (error) {
      console.error('Error en verificación en lote:', error)
      setBulkProgress(prev => ({ ...prev, isVisible: false }))
    }
  }

  const handleStartVerification = () => {
    const ticketInput = document.getElementById('ticket-id-input') as HTMLInputElement
    if (ticketInput) {
      ticketInput.focus()
    }
  }

  return (
    <div style={{
      minHeight: 'calc(100vh - 80px)',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
      padding: '1rem 0',
      marginTop: '20px'
    }}>
      <div style={{
        maxWidth: '900px',
        width: '100%',
        margin: '0 auto',
        padding: '0 1.5rem',
        boxSizing: 'border-box'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '2rem 1.5rem',
          background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.1) 0%, rgba(255, 0, 255, 0.1) 100%)',
          marginBottom: '1.5rem',
          borderRadius: '25px',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 80px rgba(0, 255, 255, 0.1)'
        }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            color: '#00ffff',
            marginBottom: '1rem',
            textShadow: '0 0 30px rgba(0, 255, 255, 0.5)',
            fontWeight: 'bold'
          }}>
            🔍 Verificar Ticket NFT
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
            color: '#b0b0b0',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Verifica la autenticidad de cualquier ticket NFT en nuestra plataforma blockchain
          </p>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.08) 0%, rgba(255, 0, 255, 0.08) 100%)',
          backdropFilter: 'blur(20px)',
          borderRadius: '25px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          padding: '2rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 80px rgba(0, 255, 255, 0.1)',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: '1.5rem',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          <div style={{
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: 'radial-gradient(circle, rgba(0, 255, 255, 0.1) 0%, transparent 70%)',
            animation: 'pulse 4s ease-in-out infinite'
          }} />
          <div style={{
            position: 'absolute',
            bottom: '-50%',
            right: '-50%',
            width: '200%',
            height: '200%',
            background: 'radial-gradient(circle, rgba(255, 0, 255, 0.1) 0%, transparent 70%)',
            animation: 'pulse 4s ease-in-out infinite reverse'
          }} />
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              position: 'relative',
              marginBottom: '2rem',
              width: '100%',
              maxWidth: '600px',
              margin: '0 auto 2rem auto'
            }}>
              <div style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '1.2rem',
                color: '#00ffff',
                filter: 'drop-shadow(0 0 10px rgba(0, 255, 255, 0.5))'
              }}>
                🎫
              </div>
              <input
                id="ticket-id-input"
                type="text"
                placeholder="Ingresa el ID del ticket o Token ID"
                value={ticketId}
                onChange={(e) => {
                  setTicketId(e.target.value)
                  if (error) {
                    clearError()
                  }
                }}
                style={{
                  width: '100%',
                  padding: '1.2rem 1rem 1.2rem 3rem',
                  background: 'rgba(0, 0, 0, 0.3)',
                  border: `2px solid ${error ? '#ff4444' : 'rgba(0, 255, 255, 0.3)'}`,
                  borderRadius: '15px',
                  color: '#ffffff',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.border = '2px solid #00ffff'
                  e.target.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.3)'
                }}
                onBlur={(e) => {
                  e.target.style.border = `2px solid ${error ? '#ff4444' : 'rgba(0, 255, 255, 0.3)'}`
                  e.target.style.boxShadow = 'none'
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && ticketId.trim()) {
                    handleVerify()
                  }
                }}
                tabIndex={0}
                aria-label="ID del ticket para verificar"
                aria-describedby={error ? 'ticket-error' : undefined}
                aria-invalid={!!error}
              />
              {error && (
                <div id="ticket-error" style={{
                  color: '#ff4444',
                  fontSize: '0.9rem',
                  marginTop: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span>⚠️</span>
                  <span>{error}</span>
                </div>
              )}
            </div>

            <div style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
              width: '100%',
              maxWidth: '600px',
              margin: '0 auto 1.5rem auto'
            }}>
              <button 
                onClick={() => handleVerify()}
                disabled={isVerifying || !ticketId.trim()}
                style={{
                  flex: '1 1 200px',
                  background: isVerifying || !ticketId.trim()
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'linear-gradient(135deg, #00ffff 0%, #ff00ff 100%)',
                  color: isVerifying || !ticketId.trim() ? '#666666' : '#000000',
                  border: 'none',
                  padding: '1.2rem',
                  borderRadius: '15px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: isVerifying || !ticketId.trim() ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: isVerifying || !ticketId.trim() ? 'none' : '0 10px 30px rgba(0, 255, 255, 0.3)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  if (!isVerifying && ticketId.trim()) {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 255, 255, 0.4)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isVerifying && ticketId.trim()) {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 255, 255, 0.3)'
                  }
                }}
              >
                <span style={{
                  position: 'relative',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}>
                  {isVerifying ? (
                    <>
                      <div style={{
                        width: '20px',
                        height: '20px',
                        border: '2px solid #000000',
                        borderTop: '2px solid transparent',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }} />
                      Verificando...
                    </>
                  ) : (
                    '🔍 Verificar Ticket'
                  )}
                </span>
              </button>

              <button
                onClick={() => setIsQRScannerOpen(true)}
                style={{
                  background: 'linear-gradient(135deg, #00ff00 0%, #00ffff 100%)',
                  color: '#000000',
                  border: 'none',
                  padding: '1.2rem 1.5rem',
                  borderRadius: '15px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 25px rgba(0, 255, 0, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 255, 0, 0.4)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 255, 0, 0.3)'
                }}
              >
                📱 Escanear QR
              </button>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem',
              marginTop: '1.5rem',
              flexWrap: 'wrap',
              width: '100%',
              maxWidth: '600px',
              margin: '1.5rem auto 0 auto'
            }}>
              <button
                onClick={() => setShowStats(!showStats)}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: '#ffffff',
                  padding: '0.8rem 1.2rem',
                  borderRadius: '12px',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                📊 {showStats ? 'Ocultar' : 'Mostrar'} Estadísticas
              </button>
              
              <button
                onClick={() => setShowHistory(!showHistory)}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: '#ffffff',
                  padding: '0.8rem 1.2rem',
                  borderRadius: '12px',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                📋 {showHistory ? 'Ocultar' : 'Mostrar'} Historial
              </button>
            </div>

            {!verificationResult && verificationHistory.length === 0 ? (
              <WelcomeMessage onStartVerification={handleStartVerification} />
            ) : verificationResult ? (
              <div style={{
                background: 'rgba(0, 255, 0, 0.05)',
                borderRadius: '20px',
                padding: '2rem',
                border: '1px solid rgba(0, 255, 0, 0.2)',
                backdropFilter: 'blur(10px)',
                marginTop: '2rem'
              }}>
                <div style={{
                  textAlign: 'center',
                  marginBottom: '2rem'
                }}>
                  <div style={{
                    fontSize: '4rem',
                    marginBottom: '1rem',
                    filter: 'drop-shadow(0 0 20px rgba(0, 255, 0, 0.5))'
                  }}>
                    ✅
                  </div>
                  <h3 style={{
                    color: '#00ff00',
                    fontSize: '1.8rem',
                    marginBottom: '0.5rem',
                    fontWeight: 'bold'
                  }}>
                    Ticket Válido
                  </h3>
                  <p style={{
                    color: '#b0b0b0',
                    fontSize: '1rem'
                  }}>
                    Este ticket NFT es auténtico y válido
                  </p>
                  
                  <button
                    onClick={() => setSelectedHistoryEntry(verificationResult)}
                    style={{
                      background: 'linear-gradient(135deg, #00ff00, #00ffff)',
                      color: '#000000',
                      border: 'none',
                      padding: '0.8rem 1.5rem',
                      borderRadius: '12px',
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 5px 15px rgba(0, 255, 0, 0.3)',
                      marginTop: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      margin: '1rem auto 0 auto'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 255, 0, 0.4)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = '0 5px 15px rgba(0, 255, 0, 0.3)'
                    }}
                  >
                    🔍 Ver Detalles Completos
                  </button>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '1.5rem'
                }}>
                  <div>
                    <h4 style={{ color: '#ffffff', marginBottom: '0.8rem', fontSize: '1.1rem' }}>🎯 Información del Evento</h4>
                    <div style={{ color: '#b0b0b0', fontSize: '0.9rem', lineHeight: '1.6' }}>
                      <div><strong>Evento:</strong> {verificationResult.ticket.eventName}</div>
                      <div><strong>Fecha:</strong> {verificationResult.ticket.eventDate}</div>
                      <div><strong>Ubicación:</strong> {verificationResult.ticket.eventLocation}</div>
                      <div><strong>Tipo de Ticket:</strong> {verificationResult.ticket.ticketType}</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 style={{ color: '#ffffff', marginBottom: '0.8rem', fontSize: '1.1rem' }}>💰 Detalles de Compra</h4>
                    <div style={{ color: '#b0b0b0', fontSize: '0.9rem', lineHeight: '1.6' }}>
                      <div><strong>Precio:</strong> {verificationResult.ticket.price}</div>
                      <div><strong>Fecha de Compra:</strong> {verificationResult.ticket.purchaseDate}</div>
                      <div><strong>Estado:</strong> <span style={{ color: '#00ff00' }}>{verificationResult.ticket.status}</span></div>
                      <div><strong>Token ID:</strong> {verificationResult.ticket.id}</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 style={{ color: '#ffffff', marginBottom: '0.8rem', fontSize: '1.1rem' }}>👤 Propietario</h4>
                    <div style={{ color: '#b0b0b0', fontSize: '0.9rem', lineHeight: '1.6' }}>
                      <div><strong>Wallet:</strong> {verificationResult.ticket.owner}</div>
                    </div>
                    
                    <h4 style={{ color: '#ffffff', marginBottom: '0.8rem', fontSize: '1.1rem', marginTop: '1rem' }}>🎁 Beneficios</h4>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.5rem'
                    }}>
                      {verificationResult.ticket.benefits.map((benefit: string, index: number) => (
                        <div key={index} style={{
                          background: 'rgba(0, 255, 0, 0.1)',
                          border: '1px solid rgba(0, 255, 0, 0.3)',
                          borderRadius: '15px',
                          padding: '0.3rem 0.8rem',
                          fontSize: '0.8rem',
                          color: '#00ff00'
                        }}>
                          ✓ {benefit}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {error && (
              <div style={{
                background: 'rgba(255, 0, 0, 0.1)',
                border: '1px solid rgba(255, 0, 0, 0.3)',
                borderRadius: '15px',
                padding: '1.5rem',
                marginTop: '2rem',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '1rem',
                  filter: 'drop-shadow(0 0 15px rgba(255, 0, 0, 0.5))'
                }}>
                  ❌
                </div>
                <h3 style={{
                  color: '#ff6b6b',
                  fontSize: '1.3rem',
                  marginBottom: '0.5rem',
                  fontWeight: 'bold'
                }}>
                  Error en la Verificación
                </h3>
                <p style={{
                  color: '#b0b0b0',
                  fontSize: '1rem',
                  lineHeight: '1.5'
                }}>
                  {error}
                </p>
              </div>
            )}

            <div style={{
              textAlign: 'center',
              marginTop: '2rem'
            }}>
              <p style={{
                fontSize: '0.9rem',
                color: '#888888',
                marginBottom: '1rem'
              }}>
                💡 También puedes escanear el código QR del ticket
              </p>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1rem',
                flexWrap: 'wrap'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.8rem',
                  color: '#00ffff'
                }}>
                  ✓ Verificación instantánea
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.8rem',
                  color: '#ff00ff'
                }}>
                  ✓ Historial completo
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.8rem',
                  color: '#ffff00'
                }}>
                  ✓ Seguridad blockchain
                </div>
              </div>
            </div>
          </div>
        </div>

        <BulkVerification
          onVerifyMultiple={handleBulkVerification}
          isVerifying={isVerifying}
        />

        {showStats && <VerificationStats history={verificationHistory} />}

        {showHistory && (
          <VerificationHistoryComponent
            history={verificationHistory}
            onClear={clearHistory}
            onExport={exportHistory}
            onViewDetails={handleViewHistoryDetails}
          />
        )}
      </div>

      <QRScanner
        isOpen={isQRScannerOpen}
        onScan={handleQRScan}
        onError={(error) => console.error('QR Scanner Error:', error)}
        onClose={() => setIsQRScannerOpen(false)}
      />

      <TicketDetailsModal
        isOpen={!!selectedHistoryEntry}
        onClose={() => setSelectedHistoryEntry(null)}
        ticketData={selectedHistoryEntry}
      />

      <VerificationProgress
        current={bulkProgress.current}
        total={bulkProgress.total}
        isVisible={bulkProgress.isVisible}
        onClose={() => setBulkProgress(prev => ({ ...prev, isVisible: false }))}
      />
    </div>
  )
}
