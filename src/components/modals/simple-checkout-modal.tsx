'use client'

import React from 'react'

interface SimpleCheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  event: {
    id: number
    title: string
    price: string
  }
}

export function SimpleCheckoutModal({ isOpen, onClose, event }: SimpleCheckoutModalProps) {
  if (!isOpen) return null

  console.log('🎫 SimpleCheckoutModal render:', { isOpen, event })

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.9)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        padding: '1rem'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
    >
      <div 
        style={{
          background: '#1a1a1a',
          border: '2px solid #00ffff',
          borderRadius: '20px',
          padding: '2rem',
          maxWidth: '500px',
          width: '100%',
          color: '#ffffff',
          boxShadow: '0 0 50px rgba(0, 255, 255, 0.5)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ color: '#00ffff', marginBottom: '1rem' }}>
            🎫 Checkout Simple
          </h2>
          <p style={{ color: '#b0b0b0' }}>
            Evento: {event.title}
          </p>
          <p style={{ color: '#00ff00', fontSize: '1.2rem', fontWeight: 'bold' }}>
            Precio: {event.price}
          </p>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button
            onClick={onClose}
            style={{
              background: 'linear-gradient(135deg, #00ffff, #ff00ff)',
              color: '#000000',
              border: 'none',
              padding: '1rem 2rem',
              borderRadius: '15px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              margin: '0.5rem'
            }}
          >
            ✅ Confirmar Compra
          </button>
          
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              padding: '1rem 2rem',
              borderRadius: '15px',
              fontSize: '1.1rem',
              cursor: 'pointer',
              margin: '0.5rem'
            }}
          >
            ❌ Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}
