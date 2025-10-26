'use client'

import * as React from 'react'

interface LoadingIndicatorProps {
  size?: 'small' | 'medium' | 'large'
  color?: string
  text?: string
  fullScreen?: boolean
}

export function LoadingIndicator({ 
  size = 'medium', 
  color = '#00ffff',
  text,
  fullScreen = false 
}: LoadingIndicatorProps) {
  const sizeMap = {
    small: 'clamp(20px, 5vw, 24px)',
    medium: 'clamp(32px, 8vw, 40px)',
    large: 'clamp(48px, 12vw, 60px)'
  }

  const spinnerSize = sizeMap[size]

  const spinner = (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'clamp(0.8rem, 2vw, 1rem)'
    }}>
      {/* Spinner */}
      <div style={{
        width: spinnerSize,
        height: spinnerSize,
        border: `3px solid rgba(255, 255, 255, 0.1)`,
        borderTop: `3px solid ${color}`,
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }} />
      
      {/* Text */}
      {text && (
        <p style={{
          color: '#ffffff',
          fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
          fontWeight: '500',
          textAlign: 'center',
          margin: 0
        }}>
          {text}
        </p>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        backdropFilter: 'blur(10px)'
      }}>
        {spinner}
      </div>
    )
  }

  return spinner
}

// Componente de loading para acciones específicas
export function ActionLoadingIndicator({ action }: { action: string }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 'clamp(0.5rem, 1vw, 0.8rem)',
      padding: 'clamp(0.5rem, 1vw, 0.8rem)',
      background: 'rgba(0, 0, 0, 0.6)',
      borderRadius: 'clamp(8px, 2vw, 12px)',
      border: '1px solid rgba(0, 255, 255, 0.3)',
      backdropFilter: 'blur(10px)'
    }}>
      <div style={{
        width: 'clamp(16px, 4vw, 20px)',
        height: 'clamp(16px, 4vw, 20px)',
        border: `2px solid rgba(255, 255, 255, 0.1)`,
        borderTop: `2px solid #00ffff`,
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }} />
      <span style={{
        color: '#ffffff',
        fontSize: 'clamp(0.8rem, 2vw, 1rem)',
        fontWeight: '500'
      }}>
        {action}...
      </span>
    </div>
  )
}

// Componente de loading para botones
export function ButtonLoadingIndicator() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 'clamp(0.3rem, 0.8vw, 0.5rem)'
    }}>
      <div style={{
        width: 'clamp(12px, 3vw, 16px)',
        height: 'clamp(12px, 3vw, 16px)',
        border: `2px solid rgba(255, 255, 255, 0.1)`,
        borderTop: `2px solid currentColor`,
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }} />
      <span>Cargando...</span>
    </div>
  )
}

// Componente de loading para listas
export function ListLoadingIndicator({ count = 3 }: { count?: number }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'clamp(1rem, 2vw, 1.5rem)'
    }}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(0.8rem, 2vw, 1rem)',
            padding: 'clamp(1rem, 2vw, 1.5rem)',
            background: 'rgba(0, 0, 0, 0.3)',
            borderRadius: 'clamp(10px, 2vw, 15px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            animation: 'pulse 2s ease-in-out infinite',
            animationDelay: `${index * 0.2}s`
          }}
        >
          {/* Avatar placeholder */}
          <div style={{
            width: 'clamp(40px, 10vw, 50px)',
            height: 'clamp(40px, 10vw, 50px)',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            animation: 'pulse 2s ease-in-out infinite'
          }} />
          
          {/* Content placeholder */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(0.3rem, 0.8vw, 0.5rem)'
          }}>
            <div style={{
              width: '60%',
              height: 'clamp(16px, 4vw, 20px)',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: 'clamp(4px, 1vw, 6px)',
              animation: 'pulse 2s ease-in-out infinite'
            }} />
            <div style={{
              width: '40%',
              height: 'clamp(12px, 3vw, 16px)',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: 'clamp(4px, 1vw, 6px)',
              animation: 'pulse 2s ease-in-out infinite'
            }} />
          </div>
        </div>
      ))}
    </div>
  )
}
