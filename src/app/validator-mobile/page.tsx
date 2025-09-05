'use client'

import React, { useState, useEffect } from 'react'
import { useTicketValidation } from '@/hooks/use-ticket-validation-complex'
import { ValidationNav } from '@/components/layout/validation-nav'
import { useAccount } from 'wagmi'

export default function ValidatorMobilePage() {
  const { address, isConnected } = useAccount()
  const {
    isValidating,
    isLoading,
    error,
    validateTicket,
    getTicketValidationInfo,
    processQRCode,
    useIsAuthorizedValidator,
    validationStats,
    resetValidationState
  } = useTicketValidation()

  // Estados locales optimizados para móvil
  const [currentTokenId, setCurrentTokenId] = useState('')
  const [validationNotes, setValidationNotes] = useState('')
  const [currentTicketInfo, setCurrentTicketInfo] = useState<any>(null)
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [lastValidation, setLastValidation] = useState<any>(null)
  const [quickActions, setQuickActions] = useState(true)

  // Verificar autorización
  const { data: isAuthorized, isLoading: isCheckingAuth } = useIsAuthorizedValidator()

  // Efectos de vibración para dispositivos móviles
  const vibrate = (pattern: number | number[]) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern)
    }
  }

  // Función para obtener información del ticket
  const handleGetTicketInfo = async (tokenId: string) => {
    if (!tokenId.trim()) return

    try {
      const tokenIdNum = parseInt(tokenId)
      if (isNaN(tokenIdNum)) {
        alert('Token ID debe ser un número válido')
        return
      }

      const info = await getTicketValidationInfo(tokenIdNum)
      if (info) {
        setCurrentTicketInfo(info)
        vibrate(200) // Vibración de confirmación
      }
    } catch (error: any) {
      alert(error.message)
      vibrate([100, 100, 100]) // Vibración de error
    }
  }

  // Función para validar ticket
  const handleValidateTicket = async (isValid: boolean) => {
    if (!currentTokenId.trim()) {
      alert('Ingresa un Token ID válido')
      return
    }

    try {
      const tokenIdNum = parseInt(currentTokenId)
      const hash = await validateTicket(tokenIdNum, isValid, validationNotes)
      
      if (hash) {
        setLastValidation({
          tokenId: tokenIdNum,
          isValid,
          timestamp: Date.now(),
          hash
        })

        // Vibración diferente según el resultado
        vibrate(isValid ? [200, 100, 200] : [400, 200, 400])

        // Limpiar formulario
        setTimeout(() => {
          setCurrentTokenId('')
          setValidationNotes('')
          setCurrentTicketInfo(null)
          resetValidationState()
        }, 3000)
      }
    } catch (error: any) {
      alert(error.message)
      vibrate([100, 100, 100, 100])
    }
  }

  // Simulación de escáner QR (en una implementación real usarías una librería de QR)
  const handleQRScan = () => {
    setIsCameraActive(true)
    
    // Simulación - en la implementación real conectarías con la cámara
    setTimeout(() => {
      const mockQRData = Math.floor(Math.random() * 1000) + 1
      setCurrentTokenId(mockQRData.toString())
      setIsCameraActive(false)
      handleGetTicketInfo(mockQRData.toString())
    }, 2000)
  }

  // Interfaz optimizada para móvil
  if (!isConnected) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #000000, #1a1a2e)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}>
        <div style={{
          background: 'rgba(255, 165, 0, 0.1)',
          borderRadius: '20px',
          padding: '2rem',
          border: '2px solid rgba(255, 165, 0, 0.3)',
          textAlign: 'center',
          maxWidth: '400px'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📱</div>
          <h2 style={{
            color: '#ffa500',
            fontSize: '1.5rem',
            fontWeight: '700',
            marginBottom: '1rem'
          }}>
            Validador Móvil
          </h2>
          <p style={{
            color: '#b0b0b0',
            fontSize: '1rem',
            lineHeight: '1.6',
            marginBottom: '2rem'
          }}>
            Conecta tu wallet para acceder al validador móvil
          </p>
        </div>
      </div>
    )
  }

  if (isCheckingAuth) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #000000, #1a1a2e)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}>
        <div style={{
          textAlign: 'center',
          color: '#b0b0b0'
        }}>
          <div style={{ 
            fontSize: '4rem', 
            marginBottom: '1rem',
            animation: 'spin 2s linear infinite'
          }}>⏳</div>
          <div style={{ fontSize: '1.2rem' }}>Verificando permisos...</div>
        </div>
      </div>
    )
  }

  if (!isAuthorized) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #000000, #1a1a2e)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}>
        <div style={{
          background: 'rgba(255, 0, 0, 0.1)',
          borderRadius: '20px',
          padding: '2rem',
          border: '2px solid rgba(255, 0, 0, 0.3)',
          textAlign: 'center',
          maxWidth: '400px'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔒</div>
          <h2 style={{
            color: '#ff6b6b',
            fontSize: '1.5rem',
            fontWeight: '700',
            marginBottom: '1rem'
          }}>
            Sin Autorización
          </h2>
          <p style={{
            color: '#b0b0b0',
            fontSize: '1rem',
            lineHeight: '1.6'
          }}>
            Tu dirección no está autorizada como validador
          </p>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #000000, #1a1a2e, #16213e)',
      position: 'relative'
    }}>
      {/* Header móvil */}
      <div style={{
        background: 'rgba(0, 0, 0, 0.9)',
        padding: '1rem',
        borderBottom: '2px solid rgba(0, 255, 255, 0.3)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backdropFilter: 'blur(20px)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <h1 style={{
              color: '#00ffff',
              fontSize: '1.5rem',
              fontWeight: '700',
              margin: 0
            }}>
              📱 Validador Móvil
            </h1>
            <p style={{
              color: '#b0b0b0',
              fontSize: '0.8rem',
              margin: 0
            }}>
              {validationStats.totalValidations} validaciones realizadas
            </p>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <div style={{
              background: isConnected ? 'rgba(0, 255, 0, 0.2)' : 'rgba(255, 0, 0, 0.2)',
              borderRadius: '50%',
              width: '12px',
              height: '12px',
              border: `2px solid ${isConnected ? '#00ff00' : '#ff0000'}`
            }} />
            <span style={{ 
              color: '#b0b0b0', 
              fontSize: '0.8rem',
              fontFamily: 'monospace'
            }}>
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </span>
          </div>
        </div>
      </div>

      {/* Navegación de Validador */}
      <div style={{ padding: '0 1rem' }}>
        <ValidationNav currentPath="/validator-mobile" />
      </div>

      {/* Estadísticas móvil */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '0.5rem',
        padding: '1rem',
        background: 'rgba(0, 0, 0, 0.5)'
      }}>
        <div style={{
          background: 'rgba(0, 255, 255, 0.1)',
          borderRadius: '10px',
          padding: '1rem 0.5rem',
          textAlign: 'center',
          border: '1px solid rgba(0, 255, 255, 0.3)'
        }}>
          <div style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#00ffff'
          }}>
            {validationStats.totalValidations}
          </div>
          <div style={{
            fontSize: '0.7rem',
            color: '#b0b0b0'
          }}>
            Total
          </div>
        </div>

        <div style={{
          background: 'rgba(0, 255, 0, 0.1)',
          borderRadius: '10px',
          padding: '1rem 0.5rem',
          textAlign: 'center',
          border: '1px solid rgba(0, 255, 0, 0.3)'
        }}>
          <div style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#00ff00'
          }}>
            {validationStats.validTickets}
          </div>
          <div style={{
            fontSize: '0.7rem',
            color: '#b0b0b0'
          }}>
            Válidos
          </div>
        </div>

        <div style={{
          background: 'rgba(255, 0, 0, 0.1)',
          borderRadius: '10px',
          padding: '1rem 0.5rem',
          textAlign: 'center',
          border: '1px solid rgba(255, 0, 0, 0.3)'
        }}>
          <div style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#ff0000'
          }}>
            {validationStats.invalidTickets}
          </div>
          <div style={{
            fontSize: '0.7rem',
            color: '#b0b0b0'
          }}>
            Inválidos
          </div>
        </div>
      </div>

      {/* Resultado de última validación */}
      {lastValidation && (
        <div style={{
          margin: '1rem',
          background: lastValidation.isValid 
            ? 'rgba(0, 255, 0, 0.1)' 
            : 'rgba(255, 0, 0, 0.1)',
          borderRadius: '15px',
          padding: '1rem',
          border: `2px solid ${lastValidation.isValid ? '#00ff00' : '#ff0000'}`,
          textAlign: 'center',
          animation: 'pulse 2s ease-in-out infinite'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
            {lastValidation.isValid ? '✅' : '❌'}
          </div>
          <div style={{
            color: lastValidation.isValid ? '#00ff00' : '#ff0000',
            fontSize: '1.2rem',
            fontWeight: '700',
            marginBottom: '0.5rem'
          }}>
            {lastValidation.isValid ? 'VALIDADO' : 'RECHAZADO'}
          </div>
          <div style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>
            Ticket #{lastValidation.tokenId}
          </div>
        </div>
      )}

      {/* Escáner QR activo */}
      {isCameraActive && (
        <div style={{
          margin: '1rem',
          background: 'rgba(0, 0, 0, 0.9)',
          borderRadius: '15px',
          padding: '2rem',
          textAlign: 'center',
          border: '2px solid rgba(0, 255, 0, 0.5)'
        }}>
          <div style={{
            width: '200px',
            height: '200px',
            margin: '0 auto',
            border: '3px solid #00ff00',
            borderRadius: '10px',
            position: 'relative',
            background: 'rgba(0, 255, 0, 0.1)',
            animation: 'scan-pulse 2s ease-in-out infinite'
          }}>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '3rem'
            }}>
              📱
            </div>
            
            {/* Línea de escaneo */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: '#00ff00',
              animation: 'scan-line 2s ease-in-out infinite'
            }} />
          </div>
          
          <div style={{
            color: '#00ff00',
            fontSize: '1.2rem',
            fontWeight: '600',
            marginTop: '1rem'
          }}>
            Escaneando código QR...
          </div>
          
          <button
            onClick={() => setIsCameraActive(false)}
            style={{
              marginTop: '1rem',
              padding: '0.8rem 1.5rem',
              borderRadius: '10px',
              border: 'none',
              background: 'rgba(255, 0, 0, 0.3)',
              color: '#ff6b6b',
              cursor: 'pointer'
            }}
          >
            Cancelar
          </button>
        </div>
      )}

      {/* Área principal de validación */}
      <div style={{ padding: '1rem' }}>
        {/* Input para Token ID */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.8)',
          borderRadius: '15px',
          padding: '1.5rem',
          marginBottom: '1rem',
          border: '2px solid rgba(0, 255, 255, 0.3)'
        }}>
          <label style={{
            display: 'block',
            color: '#00ffff',
            fontSize: '1rem',
            fontWeight: '600',
            marginBottom: '0.5rem'
          }}>
            🎫 Token ID
          </label>
          
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            marginBottom: '1rem'
          }}>
            <input
              type="number"
              placeholder="Ingresa Token ID"
              value={currentTokenId}
              onChange={(e) => setCurrentTokenId(e.target.value)}
              style={{
                flex: 1,
                padding: '1rem',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                background: 'rgba(0, 0, 0, 0.5)',
                color: '#ffffff',
                fontSize: '1.1rem',
                outline: 'none'
              }}
            />
            
            <button
              onClick={() => handleGetTicketInfo(currentTokenId)}
              disabled={isLoading || !currentTokenId.trim()}
              style={{
                padding: '1rem 1.2rem',
                borderRadius: '10px',
                border: 'none',
                background: isLoading || !currentTokenId.trim()
                  ? 'rgba(128, 128, 128, 0.3)'
                  : 'linear-gradient(135deg, #00ffff, #0080ff)',
                color: '#ffffff',
                fontSize: '1rem',
                cursor: isLoading || !currentTokenId.trim() ? 'not-allowed' : 'pointer'
              }}
            >
              {isLoading ? '⏳' : '🔍'}
            </button>
          </div>

          {/* Botón QR grande */}
          <button
            onClick={handleQRScan}
            disabled={isCameraActive}
            style={{
              width: '100%',
              padding: '1.2rem',
              borderRadius: '15px',
              border: 'none',
              background: isCameraActive 
                ? 'rgba(128, 128, 128, 0.3)'
                : 'linear-gradient(135deg, #00ff00, #00cc00)',
              color: '#ffffff',
              fontSize: '1.2rem',
              fontWeight: '700',
              cursor: isCameraActive ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.8rem'
            }}
          >
            <span style={{ fontSize: '1.5rem' }}>📱</span>
            {isCameraActive ? 'Escaneando...' : 'Escanear Código QR'}
          </button>
        </div>

        {/* Información del ticket */}
        {currentTicketInfo && (
          <div style={{
            background: 'rgba(0, 0, 0, 0.8)',
            borderRadius: '15px',
            padding: '1.5rem',
            marginBottom: '1rem',
            border: '2px solid rgba(255, 255, 0, 0.3)'
          }}>
            <h3 style={{
              color: '#ffff00',
              fontSize: '1.1rem',
              fontWeight: '700',
              marginBottom: '1rem',
              textAlign: 'center'
            }}>
              📋 Información del Ticket
            </h3>

            <div style={{
              display: 'grid',
              gap: '0.8rem'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                padding: '0.5rem 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <span style={{ color: '#b0b0b0' }}>Evento:</span>
                <span style={{ color: '#ffffff', fontWeight: '600' }}>
                  {currentTicketInfo.eventInfo.name}
                </span>
              </div>

              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                padding: '0.5rem 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <span style={{ color: '#b0b0b0' }}>Token ID:</span>
                <span style={{ color: '#00ffff', fontWeight: '700' }}>
                  #{currentTicketInfo.tokenId}
                </span>
              </div>

              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                padding: '0.5rem 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <span style={{ color: '#b0b0b0' }}>Estado:</span>
                <div style={{
                  padding: '0.2rem 0.8rem',
                  borderRadius: '8px',
                  background: currentTicketInfo.ticketStatus === 'valid' 
                    ? 'rgba(0, 255, 0, 0.2)' 
                    : 'rgba(255, 0, 0, 0.2)',
                  color: currentTicketInfo.ticketStatus === 'valid' ? '#00ff00' : '#ff0000',
                  fontSize: '0.8rem',
                  fontWeight: '600'
                }}>
                  {currentTicketInfo.ticketStatus === 'valid' ? '✅ VÁLIDO' : '❌ INVÁLIDO'}
                </div>
              </div>
            </div>

            {/* Área de notas */}
            <div style={{ marginTop: '1rem' }}>
              <label style={{
                display: 'block',
                color: '#ffffff',
                fontSize: '0.9rem',
                fontWeight: '600',
                marginBottom: '0.5rem'
              }}>
                📝 Notas (opcional)
              </label>
              <textarea
                value={validationNotes}
                onChange={(e) => setValidationNotes(e.target.value)}
                placeholder="Agrega notas sobre la validación..."
                rows={2}
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  background: 'rgba(0, 0, 0, 0.3)',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  resize: 'vertical',
                  outline: 'none'
                }}
              />
            </div>
          </div>
        )}

        {/* Botones de validación grandes */}
        {currentTicketInfo && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.8rem',
            marginBottom: '2rem'
          }}>
            <button
              onClick={() => handleValidateTicket(true)}
              disabled={isValidating}
              style={{
                padding: '1.5rem',
                borderRadius: '15px',
                border: 'none',
                background: isValidating
                  ? 'rgba(128, 128, 128, 0.3)'
                  : 'linear-gradient(135deg, #00ff00, #00cc00)',
                color: '#ffffff',
                fontSize: '1.1rem',
                fontWeight: '700',
                cursor: isValidating ? 'not-allowed' : 'pointer',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '1.5rem', marginBottom: '0.3rem' }}>✅</div>
              {isValidating ? 'Validando...' : 'VÁLIDO'}
            </button>

            <button
              onClick={() => handleValidateTicket(false)}
              disabled={isValidating}
              style={{
                padding: '1.5rem',
                borderRadius: '15px',
                border: 'none',
                background: isValidating
                  ? 'rgba(128, 128, 128, 0.3)'
                  : 'linear-gradient(135deg, #ff0000, #cc0000)',
                color: '#ffffff',
                fontSize: '1.1rem',
                fontWeight: '700',
                cursor: isValidating ? 'not-allowed' : 'pointer',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '1.5rem', marginBottom: '0.3rem' }}>❌</div>
              {isValidating ? 'Validando...' : 'INVÁLIDO'}
            </button>
          </div>
        )}

        {/* Acciones rápidas */}
        {quickActions && (
          <div style={{
            background: 'rgba(0, 0, 0, 0.6)',
            borderRadius: '15px',
            padding: '1rem',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem'
            }}>
              <h4 style={{
                color: '#ffffff',
                fontSize: '1rem',
                margin: 0
              }}>
                ⚡ Acciones Rápidas
              </h4>
              <button
                onClick={() => setQuickActions(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#b0b0b0',
                  fontSize: '1.2rem',
                  cursor: 'pointer'
                }}
              >
                ✕
              </button>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '0.8rem'
            }}>
              <button
                onClick={() => {
                  setCurrentTokenId('')
                  setCurrentTicketInfo(null)
                  setValidationNotes('')
                }}
                style={{
                  padding: '0.8rem',
                  borderRadius: '10px',
                  border: 'none',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                🗑️ Limpiar
              </button>

              <button
                style={{
                  padding: '0.8rem',
                  borderRadius: '10px',
                  border: 'none',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                📊 Stats
              </button>
            </div>
          </div>
        )}
      </div>

      {/* CSS para animaciones móviles */}
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0%, 100% { 
            opacity: 0.8;
            transform: scale(1);
          }
          50% { 
            opacity: 1;
            transform: scale(1.02);
          }
        }

        @keyframes scan-pulse {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
          }
          50% { 
            box-shadow: 0 0 40px rgba(0, 255, 0, 0.6);
          }
        }

        @keyframes scan-line {
          0% { top: 0; }
          100% { top: calc(100% - 2px); }
        }
      `}</style>
    </div>
  )
}