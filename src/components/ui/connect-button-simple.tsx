'use client'

import { useAppKitConnection } from '@/hooks/use-appkit'
import { useState, useEffect, useRef } from 'react'
import './neon-button.css'

interface ConnectButtonSimpleProps {
  onConnect?: () => void
}

export function ConnectButtonSimple({ onConnect }: ConnectButtonSimpleProps = {}) {
  const { connect, isConnected, formattedAddress, disconnect, formattedBalance } = useAppKitConnection()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleClick = () => {
    if (isConnected) {
      setIsDropdownOpen(!isDropdownOpen)
    } else {
      console.log('Connect button clicked!')
      if (connect) {
        connect()
        onConnect?.() // Call onConnect callback if provided
      } else {
        console.error('AppKit connect function not available')
      }
    }
  }

  const handleDisconnect = () => {
    disconnect()
    setIsDropdownOpen(false)
  }

  if (isConnected && formattedAddress) {
    return (
      <div style={{ position: 'relative' }} ref={dropdownRef}>
        <button 
          onClick={handleClick}
          style={{
            background: 'linear-gradient(135deg, rgba(20, 0, 25, 0.95), rgba(40, 0, 50, 0.98))',
            border: '2px solid #6600ff',
            color: '#ffffff',
            padding: '0.9rem 1.8rem',
            borderRadius: '30px',
            fontSize: '1rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '0.8rem',
            backdropFilter: 'blur(15px)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden'
          }}
          className="neon-button-connected neon-dark-purple"
        >
          {/* Efecto de glow neon pulsante */}
          <div 
            className="neon-glow"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: '30px',
              background: 'transparent',
              boxShadow: '0 0 20px rgba(102, 0, 255, 0.6), inset 0 0 20px rgba(102, 0, 255, 0.1)',
              animation: 'neonPulse 2s ease-in-out infinite'
            }} 
          />
          
          {/* Borde neon animado */}
          <div 
            className="neon-border"
            style={{
              position: 'absolute',
              top: '-2px',
              left: '-2px',
              right: '-2px',
              bottom: '-2px',
              borderRadius: '32px',
              background: 'linear-gradient(45deg, #6600ff, #330080, #6600ff, #6600cc)',
              backgroundSize: '400% 400%',
              animation: 'neonBorder 3s ease-in-out infinite',
              zIndex: -1
            }} 
          />
          
          {/* Partículas flotantes neon */}
          <div className="neon-particles">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="neon-particle"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + i * 10}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${4 + i * 0.5}s`,
                  background: '#6600ff'
                }}
              />
            ))}
          </div>
          
          <span style={{ fontSize: '1.2rem', zIndex: 1, position: 'relative' }}>🟢</span>
          <span style={{ zIndex: 1, position: 'relative' }}>{formattedAddress}</span>
          <span style={{ fontSize: '0.8rem', zIndex: 1, position: 'relative' }}>▼</span>
        </button>
        
        {isDropdownOpen && (
          <div style={{
            position: 'absolute',
            right: 0,
            top: 'calc(100% + 8px)',
            minWidth: '200px',
            background: 'rgba(0, 0, 0, 0.95)',
            border: '2px solid #6600ff',
            borderRadius: '15px',
            backdropFilter: 'blur(15px)',
            boxShadow: '0 8px 32px rgba(102, 0, 255, 0.2)',
            zIndex: 1000
          }}>
            <div style={{
              padding: '0.8rem 1.2rem',
              borderBottom: '1px solid rgba(102, 0, 255, 0.2)',
              fontSize: '0.9rem',
              color: '#6600ff'
            }}>
              <div>🌐 Red: Base Sepolia</div>
              {formattedBalance && (
                <div style={{ marginTop: '0.4rem' }}>💰 Balance: {formattedBalance}</div>
              )}
            </div>
            <button
              onClick={handleDisconnect}
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                color: '#ffffff',
                padding: '0.8rem 1.2rem',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                borderRadius: '0 0 13px 13px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(102, 0, 255, 0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
              }}
            >
              🔓 Desconectar
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <button 
      onClick={handleClick}
      style={{
        background: 'linear-gradient(135deg, rgba(20, 0, 25, 0.95), rgba(40, 0, 50, 0.98))',
        border: '2px solid #6600ff',
        color: '#ffffff',
        padding: '0.9rem 1.8rem',
        borderRadius: '30px',
        fontSize: '1rem',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: '0.8rem',
        backdropFilter: 'blur(15px)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden'
      }}
      className="neon-button-connect neon-dark-purple"
    >
      {/* Efecto de glow neon pulsante */}
      <div 
        className="neon-glow"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: '30px',
          background: 'transparent',
          boxShadow: '0 0 20px rgba(102, 0, 255, 0.6), inset 0 0 20px rgba(102, 0, 255, 0.1)',
          animation: 'neonPulse 2s ease-in-out infinite'
        }} 
      />
      
      {/* Borde neon animado */}
      <div 
        className="neon-border"
        style={{
          position: 'absolute',
          top: '-2px',
          left: '-2px',
          right: '-2px',
          bottom: '-2px',
          borderRadius: '32px',
          background: 'linear-gradient(45deg, #6600ff, #330080, #6600ff, #6600cc)',
          backgroundSize: '400% 400%',
          animation: 'neonBorder 3s ease-in-out infinite',
          zIndex: -1
        }} 
      />
      
      {/* Partículas flotantes neon */}
      <div className="neon-particles">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="neon-particle"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + i * 0.5}s`,
              background: '#6600ff'
            }}
          />
        ))}
      </div>
      
      <span style={{ fontSize: '1.2rem', zIndex: 1, position: 'relative' }}>🔑</span>
      <span style={{ zIndex: 1, position: 'relative' }}>Conectar Wallet</span>
    </button>
  )
}