'use client'

import React from 'react'

interface VerificationProgressProps {
  current: number
  total: number
  isVisible: boolean
  onClose: () => void
}

export function VerificationProgress({ current, total, isVisible, onClose }: VerificationProgressProps) {
  if (!isVisible) return null

  const percentage = total > 0 ? (current / total) * 100 : 0
  const isComplete = current >= total

  return (
    <div style={{
      position: 'fixed',
      bottom: '2rem',
      right: '2rem',
      background: 'rgba(0, 0, 0, 0.95)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(0, 255, 255, 0.3)',
      borderRadius: '20px',
      padding: '1.5rem',
      width: '350px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.8), 0 0 100px rgba(0, 255, 255, 0.2)',
      zIndex: 1000,
      animation: 'slideInUp 0.3s ease-out'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem'
      }}>
        <h4 style={{
          color: '#00ffff',
          fontSize: '1.1rem',
          fontWeight: '600',
          margin: 0
        }}>
          🔍 Verificación en Progreso
        </h4>
        
        <button
          onClick={onClose}
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#ffffff',
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            fontSize: '1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 0, 0, 0.3)'
            e.currentTarget.style.borderColor = '#ff0000'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'
          }}
        >
          ✕
        </button>
      </div>

      {/* Progress Bar */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '10px',
        height: '8px',
        marginBottom: '1rem',
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${percentage}%`,
          height: '100%',
          background: isComplete 
            ? 'linear-gradient(90deg, #00ff00, #00ffff)' 
            : 'linear-gradient(90deg, #00ffff, #ff00ff)',
          borderRadius: '10px',
          transition: 'width 0.3s ease',
          boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)'
        }} />
      </div>

      {/* Status */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem'
      }}>
        <span style={{
          color: '#b0b0b0',
          fontSize: '0.9rem'
        }}>
          {isComplete ? 'Completado' : 'Procesando...'}
        </span>
        <span style={{
          color: '#00ffff',
          fontSize: '0.9rem',
          fontWeight: '600'
        }}>
          {current} / {total}
        </span>
      </div>

      {/* Progress Details */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '12px',
        padding: '1rem',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0.5rem'
        }}>
          <span style={{
            color: '#b0b0b0',
            fontSize: '0.8rem'
          }}>
            Progreso
          </span>
          <span style={{
            color: '#ffffff',
            fontSize: '0.8rem',
            fontWeight: '600'
          }}>
            {percentage.toFixed(1)}%
          </span>
        </div>
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{
            color: '#b0b0b0',
            fontSize: '0.8rem'
          }}>
            Tiempo estimado
          </span>
          <span style={{
            color: '#ffffff',
            fontSize: '0.8rem'
          }}>
            {isComplete ? 'Completado' : `${Math.ceil((total - current) * 0.5)}s`}
          </span>
        </div>
      </div>

      {/* Completion Message */}
      {isComplete && (
        <div style={{
          marginTop: '1rem',
          padding: '1rem',
          background: 'rgba(0, 255, 0, 0.1)',
          border: '1px solid rgba(0, 255, 0, 0.3)',
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '1.5rem',
            marginBottom: '0.5rem'
          }}>
            ✅
          </div>
          <p style={{
            color: '#00ff00',
            fontSize: '0.9rem',
            margin: 0,
            fontWeight: '600'
          }}>
            ¡Verificación masiva completada!
          </p>
          <p style={{
            color: '#b0b0b0',
            fontSize: '0.8rem',
            margin: '0.5rem 0 0 0'
          }}>
            Revisa el historial para ver todos los resultados
          </p>
        </div>
      )}

      {/* CSS Animations */}
      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
