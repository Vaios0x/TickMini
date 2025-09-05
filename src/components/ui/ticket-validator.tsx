'use client'

import React, { useState, useCallback, useRef } from 'react'
import { useTicketValidation, TicketValidationInfo, QRScanResult } from '@/hooks/use-ticket-validation-complex'
import { QRScanner } from './qr-scanner'

interface TicketValidatorProps {
  onValidationComplete?: (result: any) => void
  onError?: (error: string) => void
  className?: string
  mode?: 'single' | 'batch' | 'scanner'
}

export function TicketValidator({ 
  onValidationComplete, 
  onError,
  className = '',
  mode = 'single'
}: TicketValidatorProps) {
  const {
    isValidating,
    isLoading,
    error,
    validateTicket,
    batchValidateTickets,
    getTicketValidationInfo,
    processQRCode,
    useIsAuthorizedValidator,
    resetValidationState
  } = useTicketValidation()

  // Estados locales
  const [currentTokenId, setCurrentTokenId] = useState('')
  const [validationNotes, setValidationNotes] = useState('')
  const [currentTicketInfo, setCurrentTicketInfo] = useState<TicketValidationInfo | null>(null)
  const [isQRScannerOpen, setIsQRScannerOpen] = useState(false)
  const [batchTokenIds, setBatchTokenIds] = useState<string>('')
  const [batchResults, setBatchResults] = useState<any[]>([])
  const [validationResult, setValidationResult] = useState<'valid' | 'invalid' | null>(null)

  // Referencias
  const audioRef = useRef<HTMLAudioElement>(null)

  // Verificar si es validador autorizado
  const { data: isAuthorized, isLoading: isCheckingAuth } = useIsAuthorizedValidator()

  // Efectos de sonido
  const playSound = useCallback((type: 'success' | 'error' | 'scan') => {
    if (audioRef.current) {
      // Crear diferentes tonos según el tipo
      const context = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = context.createOscillator()
      const gainNode = context.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(context.destination)
      
      switch (type) {
        case 'success':
          oscillator.frequency.value = 800
          gainNode.gain.setValueAtTime(0.3, context.currentTime)
          gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.5)
          break
        case 'error':
          oscillator.frequency.value = 300
          oscillator.type = 'sawtooth'
          gainNode.gain.setValueAtTime(0.3, context.currentTime)
          gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.3)
          break
        case 'scan':
          oscillator.frequency.value = 1200
          gainNode.gain.setValueAtTime(0.2, context.currentTime)
          gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.1)
          break
      }
      
      oscillator.start(context.currentTime)
      oscillator.stop(context.currentTime + (type === 'success' ? 0.5 : type === 'error' ? 0.3 : 0.1))
    }
  }, [])

  // Obtener información del ticket
  const handleGetTicketInfo = useCallback(async (tokenId: string) => {
    if (!tokenId.trim()) return

    try {
      const tokenIdNum = parseInt(tokenId)
      if (isNaN(tokenIdNum)) {
        onError?.('Token ID debe ser un número válido')
        return
      }

      const info = await getTicketValidationInfo(tokenIdNum)
      if (info) {
        setCurrentTicketInfo(info)
      }
    } catch (error: any) {
      onError?.(error.message)
    }
  }, [getTicketValidationInfo, onError])

  // Validar ticket individual
  const handleValidateTicket = useCallback(async (isValid: boolean) => {
    if (!currentTokenId.trim()) {
      onError?.('Ingresa un Token ID válido')
      return
    }

    try {
      const tokenIdNum = parseInt(currentTokenId)
      if (isNaN(tokenIdNum)) {
        onError?.('Token ID debe ser un número válido')
        return
      }

      const hash = await validateTicket(tokenIdNum, isValid, validationNotes)
      
      if (hash) {
        setValidationResult(isValid ? 'valid' : 'invalid')
        playSound(isValid ? 'success' : 'error')
        
        onValidationComplete?.({
          tokenId: tokenIdNum,
          isValid,
          notes: validationNotes,
          transactionHash: hash
        })

        // Limpiar formulario después de validación exitosa
        setTimeout(() => {
          setCurrentTokenId('')
          setValidationNotes('')
          setCurrentTicketInfo(null)
          setValidationResult(null)
          resetValidationState()
        }, 3000)
      }
    } catch (error: any) {
      playSound('error')
      onError?.(error.message)
    }
  }, [currentTokenId, validationNotes, validateTicket, onValidationComplete, onError, playSound, resetValidationState])

  // Procesar código QR escaneado
  const handleQRScan = useCallback(async (qrData: string) => {
    setIsQRScannerOpen(false)
    playSound('scan')

    const qrResult = processQRCode(qrData)
    if (qrResult) {
      setCurrentTokenId(qrResult.tokenId.toString())
      await handleGetTicketInfo(qrResult.tokenId.toString())
    }
  }, [processQRCode, handleGetTicketInfo, playSound])

  // Validación en lote
  const handleBatchValidation = useCallback(async () => {
    const tokenIds = batchTokenIds
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)

    if (tokenIds.length === 0) {
      onError?.('Ingresa al menos un Token ID')
      return
    }

    try {
      const validations = tokenIds.map(tokenId => ({
        tokenId: parseInt(tokenId),
        isValid: true, // Por defecto válido, se puede modificar
        notes: 'Validación en lote'
      }))

      const hash = await batchValidateTickets(validations)
      
      if (hash) {
        setBatchResults(validations)
        playSound('success')
        
        onValidationComplete?.({
          type: 'batch',
          validations,
          transactionHash: hash
        })
      }
    } catch (error: any) {
      playSound('error')
      onError?.(error.message)
    }
  }, [batchTokenIds, batchValidateTickets, onValidationComplete, onError, playSound])

  // Renderizado condicional por modo
  const renderSingleMode = () => (
    <div style={{
      background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.05) 0%, rgba(255, 0, 255, 0.05) 100%)',
      borderRadius: '20px',
      padding: '2rem',
      border: '2px solid rgba(0, 255, 255, 0.2)',
      backdropFilter: 'blur(20px)',
      position: 'relative'
    }}>
      {/* Título */}
      <div style={{
        textAlign: 'center',
        marginBottom: '2rem'
      }}>
        <h3 style={{
          fontSize: 'clamp(1.5rem, 4vw, 2rem)',
          fontWeight: '700',
          background: 'linear-gradient(135deg, #00ffff, #ff00ff)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '0.5rem'
        }}>
          🔍 Validador de Tickets
        </h3>
        <p style={{ color: '#b0b0b0', fontSize: '1rem' }}>
          Escanea o ingresa el Token ID para validar un ticket NFT
        </p>
      </div>

      {/* Input y controles */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '2rem',
        flexWrap: 'wrap'
      }}>
        <input
          type="text"
          placeholder="Token ID del ticket"
          value={currentTokenId}
          onChange={(e) => {
            setCurrentTokenId(e.target.value)
            if (error) resetValidationState()
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleGetTicketInfo(currentTokenId)
            }
          }}
          style={{
            flex: '1',
            minWidth: '200px',
            padding: '1rem',
            borderRadius: '15px',
            border: `2px solid ${error ? '#ff4444' : 'rgba(0, 255, 255, 0.3)'}`,
            background: 'rgba(0, 0, 0, 0.3)',
            color: '#ffffff',
            fontSize: '1rem',
            outline: 'none'
          }}
        />
        
        <button
          onClick={() => handleGetTicketInfo(currentTokenId)}
          disabled={isLoading || !currentTokenId.trim()}
          style={{
            padding: '1rem 1.5rem',
            borderRadius: '15px',
            border: 'none',
            background: isLoading || !currentTokenId.trim()
              ? 'rgba(128, 128, 128, 0.3)'
              : 'linear-gradient(135deg, #00ffff, #0080ff)',
            color: '#ffffff',
            fontSize: '0.9rem',
            fontWeight: '600',
            cursor: isLoading || !currentTokenId.trim() ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          {isLoading ? '⏳' : '🔍'} {isLoading ? 'Cargando...' : 'Verificar'}
        </button>

        <button
          onClick={() => setIsQRScannerOpen(true)}
          style={{
            padding: '1rem 1.5rem',
            borderRadius: '15px',
            border: 'none',
            background: 'linear-gradient(135deg, #00ff00, #00cc00)',
            color: '#ffffff',
            fontSize: '0.9rem',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          📱 Escanear QR
        </button>
      </div>

      {/* Información del ticket */}
      {currentTicketInfo && (
        <div style={{
          background: 'rgba(0, 0, 0, 0.4)',
          borderRadius: '15px',
          padding: '1.5rem',
          marginBottom: '2rem',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            <div>
              <h4 style={{ color: '#00ffff', marginBottom: '0.5rem' }}>🎯 Evento</h4>
              <p style={{ color: '#ffffff', fontWeight: '600' }}>{currentTicketInfo.eventInfo.name}</p>
              <p style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>
                {new Date(currentTicketInfo.eventInfo.eventDate * 1000).toLocaleDateString()}
              </p>
              <p style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>
                📍 {currentTicketInfo.eventInfo.location}
              </p>
            </div>

            <div>
              <h4 style={{ color: '#ff00ff', marginBottom: '0.5rem' }}>🎫 Ticket</h4>
              <p style={{ color: '#ffffff' }}>Token ID: #{currentTicketInfo.tokenId}</p>
              <p style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>
                Tipo: {currentTicketInfo.ticketInfo.ticketType}
              </p>
              <p style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>
                💰 {currentTicketInfo.ticketInfo.price} ETH
              </p>
            </div>

            <div>
              <h4 style={{ color: '#ffff00', marginBottom: '0.5rem' }}>✅ Estado</h4>
              <div style={{
                padding: '0.5rem 1rem',
                borderRadius: '10px',
                background: currentTicketInfo.ticketStatus === 'valid' 
                  ? 'rgba(0, 255, 0, 0.2)' 
                  : 'rgba(255, 0, 0, 0.2)',
                border: `1px solid ${currentTicketInfo.ticketStatus === 'valid' ? '#00ff00' : '#ff0000'}`,
                color: currentTicketInfo.ticketStatus === 'valid' ? '#00ff00' : '#ff0000',
                fontWeight: '600',
                textTransform: 'uppercase'
              }}>
                {currentTicketInfo.ticketStatus === 'valid' ? '✅ Válido' : '❌ Inválido'}
              </div>
            </div>
          </div>

          {/* Notas de validación */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              color: '#ffffff',
              fontSize: '0.9rem',
              fontWeight: '600',
              marginBottom: '0.5rem'
            }}>
              📝 Notas de validación (opcional)
            </label>
            <textarea
              value={validationNotes}
              onChange={(e) => setValidationNotes(e.target.value)}
              placeholder="Agrega notas sobre la validación..."
              rows={3}
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                background: 'rgba(0, 0, 0, 0.3)',
                color: '#ffffff',
                fontSize: '0.9rem',
                resize: 'vertical',
                outline: 'none'
              }}
            />
          </div>

          {/* Botones de validación */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center'
          }}>
            <button
              onClick={() => handleValidateTicket(true)}
              disabled={isValidating || !isAuthorized}
              style={{
                flex: '1',
                maxWidth: '200px',
                padding: '1.2rem',
                borderRadius: '15px',
                border: 'none',
                background: isValidating || !isAuthorized
                  ? 'rgba(128, 128, 128, 0.3)'
                  : 'linear-gradient(135deg, #00ff00, #00cc00)',
                color: '#ffffff',
                fontSize: '1rem',
                fontWeight: '700',
                cursor: isValidating || !isAuthorized ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              {isValidating ? '⏳' : '✅'} {isValidating ? 'Validando...' : 'VÁLIDO'}
            </button>

            <button
              onClick={() => handleValidateTicket(false)}
              disabled={isValidating || !isAuthorized}
              style={{
                flex: '1',
                maxWidth: '200px',
                padding: '1.2rem',
                borderRadius: '15px',
                border: 'none',
                background: isValidating || !isAuthorized
                  ? 'rgba(128, 128, 128, 0.3)'
                  : 'linear-gradient(135deg, #ff0000, #cc0000)',
                color: '#ffffff',
                fontSize: '1rem',
                fontWeight: '700',
                cursor: isValidating || !isAuthorized ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              {isValidating ? '⏳' : '❌'} {isValidating ? 'Validando...' : 'INVÁLIDO'}
            </button>
          </div>
        </div>
      )}

      {/* Resultado de validación */}
      {validationResult && (
        <div style={{
          background: validationResult === 'valid' 
            ? 'rgba(0, 255, 0, 0.1)' 
            : 'rgba(255, 0, 0, 0.1)',
          borderRadius: '15px',
          padding: '1.5rem',
          border: `2px solid ${validationResult === 'valid' ? '#00ff00' : '#ff0000'}`,
          textAlign: 'center',
          animation: 'pulse 2s ease-in-out infinite'
        }}>
          <div style={{
            fontSize: '3rem',
            marginBottom: '1rem'
          }}>
            {validationResult === 'valid' ? '✅' : '❌'}
          </div>
          <h3 style={{
            color: validationResult === 'valid' ? '#00ff00' : '#ff0000',
            fontSize: '1.5rem',
            fontWeight: '700',
            marginBottom: '0.5rem'
          }}>
            {validationResult === 'valid' ? 'TICKET VALIDADO' : 'TICKET RECHAZADO'}
          </h3>
          <p style={{
            color: '#b0b0b0',
            fontSize: '1rem'
          }}>
            {validationResult === 'valid' 
              ? 'El ticket ha sido marcado como válido exitosamente'
              : 'El ticket ha sido marcado como inválido'
            }
          </p>
        </div>
      )}
    </div>
  )

  const renderBatchMode = () => (
    <div style={{
      background: 'linear-gradient(135deg, rgba(255, 165, 0, 0.05) 0%, rgba(255, 69, 0, 0.05) 100%)',
      borderRadius: '20px',
      padding: '2rem',
      border: '2px solid rgba(255, 165, 0, 0.2)',
      backdropFilter: 'blur(20px)'
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '2rem'
      }}>
        <h3 style={{
          fontSize: 'clamp(1.5rem, 4vw, 2rem)',
          fontWeight: '700',
          background: 'linear-gradient(135deg, #ffa500, #ff4500)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '0.5rem'
        }}>
          📋 Validación en Lote
        </h3>
        <p style={{ color: '#b0b0b0', fontSize: '1rem' }}>
          Valida múltiples tickets de una sola vez
        </p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <label style={{
          display: 'block',
          color: '#ffffff',
          fontSize: '0.9rem',
          fontWeight: '600',
          marginBottom: '0.5rem'
        }}>
          Token IDs (uno por línea)
        </label>
        <textarea
          value={batchTokenIds}
          onChange={(e) => setBatchTokenIds(e.target.value)}
          placeholder={`1\n2\n3\n...\n\nIngresa un Token ID por línea`}
          rows={8}
          style={{
            width: '100%',
            padding: '1rem',
            borderRadius: '15px',
            border: '2px solid rgba(255, 165, 0, 0.3)',
            background: 'rgba(0, 0, 0, 0.3)',
            color: '#ffffff',
            fontSize: '0.9rem',
            resize: 'vertical',
            outline: 'none',
            fontFamily: 'monospace'
          }}
        />
      </div>

      <button
        onClick={handleBatchValidation}
        disabled={isValidating || !batchTokenIds.trim() || !isAuthorized}
        style={{
          width: '100%',
          padding: '1.2rem',
          borderRadius: '15px',
          border: 'none',
          background: isValidating || !batchTokenIds.trim() || !isAuthorized
            ? 'rgba(128, 128, 128, 0.3)'
            : 'linear-gradient(135deg, #ffa500, #ff4500)',
          color: '#ffffff',
          fontSize: '1rem',
          fontWeight: '700',
          cursor: isValidating || !batchTokenIds.trim() || !isAuthorized ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem'
        }}
      >
        {isValidating ? '⏳ Procesando...' : '🚀 Validar Todos'}
      </button>
    </div>
  )

  // Verificación de autorización
  if (isCheckingAuth) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '3rem',
        color: '#b0b0b0'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
        <div>Verificando permisos de validador...</div>
      </div>
    )
  }

  if (!isAuthorized) {
    return (
      <div style={{
        background: 'rgba(255, 0, 0, 0.1)',
        borderRadius: '20px',
        padding: '3rem',
        border: '2px solid rgba(255, 0, 0, 0.3)',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔒</div>
        <h3 style={{
          color: '#ff6b6b',
          fontSize: '1.5rem',
          fontWeight: '700',
          marginBottom: '1rem'
        }}>
          Acceso Denegado
        </h3>
        <p style={{
          color: '#b0b0b0',
          fontSize: '1rem',
          lineHeight: '1.6'
        }}>
          Tu dirección no está autorizada como validador. Contacta al administrador del sistema.
        </p>
      </div>
    )
  }

  return (
    <div className={className}>
      {/* Navegación de modos */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '2rem',
        justifyContent: 'center'
      }}>
        <button
          onClick={() => setCurrentTokenId('')}
          style={{
            padding: '1rem 1.5rem',
            borderRadius: '15px',
            border: 'none',
            background: mode === 'single' 
              ? 'linear-gradient(135deg, #00ffff, #0080ff)'
              : 'rgba(255, 255, 255, 0.1)',
            color: '#ffffff',
            fontSize: '0.9rem',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          🔍 Individual
        </button>
        
        <button
          style={{
            padding: '1rem 1.5rem',
            borderRadius: '15px',
            border: 'none',
            background: mode === 'batch' 
              ? 'linear-gradient(135deg, #ffa500, #ff4500)'
              : 'rgba(255, 255, 255, 0.1)',
            color: '#ffffff',
            fontSize: '0.9rem',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          📋 Lote
        </button>
      </div>

      {/* Contenido según el modo */}
      {mode === 'single' && renderSingleMode()}
      {mode === 'batch' && renderBatchMode()}

      {/* QR Scanner Modal */}
      <QRScanner
        isOpen={isQRScannerOpen}
        onScan={handleQRScan}
        onError={(error) => onError?.(error)}
        onClose={() => setIsQRScannerOpen(false)}
      />

      {/* Audio element para efectos de sonido */}
      <audio ref={audioRef} style={{ display: 'none' }} />
    </div>
  )
}