'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface TransactionStatusProps {
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
  error?: string | null
  txHash?: string | null
  onClose?: () => void
  title?: string
  description?: string
  type?: 'create_event' | 'buy_ticket' | 'verify_ticket' | 'transfer_ticket'
}

export function TransactionStatus({
  isLoading,
  isSuccess,
  isError,
  error,
  txHash,
  onClose,
  title = 'Transacción',
  description = 'Procesando transacción en blockchain...',
  type = 'buy_ticket'
}: TransactionStatusProps) {
  if (!isLoading && !isSuccess && !isError) return null

  const getTypeIcon = () => {
    switch (type) {
      case 'create_event':
        return '🎪'
      case 'buy_ticket':
        return '🎫'
      case 'verify_ticket':
        return '🔍'
      case 'transfer_ticket':
        return '↗️'
      default:
        return '⚡'
    }
  }

  const getTypeColor = () => {
    switch (type) {
      case 'create_event':
        return '#ff00ff'
      case 'buy_ticket':
        return '#00ffff'
      case 'verify_ticket':
        return '#00ff00'
      case 'transfer_ticket':
        return '#ffff00'
      default:
        return '#ffffff'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 10000,
        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(20, 20, 40, 0.95) 100%)',
        backdropFilter: 'blur(20px)',
        borderRadius: '20px',
        border: `2px solid ${getTypeColor()}40`,
        padding: '2rem',
        minWidth: '400px',
        maxWidth: '500px',
        boxShadow: `0 20px 40px rgba(0, 0, 0, 0.5), 0 0 80px ${getTypeColor()}20`,
        textAlign: 'center'
      }}
    >
      {/* Overlay para cerrar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          zIndex: -1
        }}
        onClick={onClose}
      />

      {/* Botón de cerrar */}
      {(isSuccess || isError) && onClose && (
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '50%',
            width: '30px',
            height: '30px',
            color: '#ffffff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1rem'
          }}
        >
          ✕
        </button>
      )}

      {/* Contenido del modal */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Icon y loading */}
        <div style={{ marginBottom: '1.5rem' }}>
          {isLoading ? (
            <div style={{ position: 'relative' }}>
              <div style={{
                fontSize: '3rem',
                marginBottom: '1rem',
                filter: `drop-shadow(0 0 20px ${getTypeColor()})`
              }}>
                {getTypeIcon()}
              </div>
              <div style={{
                width: '40px',
                height: '40px',
                border: `3px solid ${getTypeColor()}40`,
                borderTop: `3px solid ${getTypeColor()}`,
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto'
              }} />
            </div>
          ) : isSuccess ? (
            <div style={{
              fontSize: '4rem',
              marginBottom: '1rem',
              filter: 'drop-shadow(0 0 20px #00ff0080)',
              animation: 'pulse 2s ease-in-out infinite'
            }}>
              ✅
            </div>
          ) : isError ? (
            <div style={{
              fontSize: '4rem',
              marginBottom: '1rem',
              filter: 'drop-shadow(0 0 20px #ff444480)'
            }}>
              ❌
            </div>
          ) : null}
        </div>

        {/* Título y descripción */}
        <h3 style={{
          color: isSuccess ? '#00ff00' : isError ? '#ff4444' : getTypeColor(),
          fontSize: '1.5rem',
          marginBottom: '1rem',
          fontWeight: 'bold',
          textShadow: `0 0 20px ${isSuccess ? '#00ff0050' : isError ? '#ff444450' : getTypeColor() + '50'}`
        }}>
          {isLoading ? `Procesando ${title}...` : 
           isSuccess ? `${title} Exitosa` : 
           isError ? `Error en ${title}` : title}
        </h3>

        <p style={{
          color: '#b0b0b0',
          fontSize: '1rem',
          marginBottom: '1.5rem',
          lineHeight: '1.5'
        }}>
          {isLoading ? description :
           isSuccess ? 'La transacción se completó exitosamente en Base Network.' :
           isError ? (error || 'Ocurrió un error procesando la transacción.') :
           description}
        </p>

        {/* Hash de transacción */}
        {txHash && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '12px',
            padding: '1rem',
            marginBottom: '1.5rem',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <p style={{
              color: '#ffffff',
              fontSize: '0.9rem',
              marginBottom: '0.5rem',
              fontWeight: '600'
            }}>
              📄 Hash de Transacción:
            </p>
            <code style={{
              color: getTypeColor(),
              fontSize: '0.8rem',
              wordBreak: 'break-all',
              background: 'rgba(0, 0, 0, 0.3)',
              padding: '0.5rem',
              borderRadius: '8px',
              display: 'block'
            }}>
              {txHash}
            </code>
          </div>
        )}

        {/* Información adicional */}
        {(isLoading || isSuccess) && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#00ffff', fontSize: '1.2rem', marginBottom: '0.3rem' }}>⚡</div>
              <div style={{ color: '#888', fontSize: '0.8rem' }}>Gas Optimizado</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#00ff00', fontSize: '1.2rem', marginBottom: '0.3rem' }}>🔒</div>
              <div style={{ color: '#888', fontSize: '0.8rem' }}>Seguro</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#ff00ff', fontSize: '1.2rem', marginBottom: '0.3rem' }}>🚀</div>
              <div style={{ color: '#888', fontSize: '0.8rem' }}>Base Network</div>
            </div>
          </div>
        )}

        {/* Botones de acción */}
        {isSuccess && txHash && (
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => window.open(`https://basescan.org/tx/${txHash}`, '_blank')}
              style={{
                background: 'linear-gradient(135deg, #00ffff, #ff00ff)',
                color: '#000000',
                border: 'none',
                padding: '0.8rem 1.5rem',
                borderRadius: '12px',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 255, 255, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              🔍 Ver en BaseScan
            </button>
          </div>
        )}
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
      `}</style>
    </motion.div>
  )
}