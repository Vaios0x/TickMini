'use client'

import React, { useState } from 'react'
import { CheckoutModal } from './checkout-modal'

export function CheckoutModalTest() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const testEvent = {
    id: 1,
    title: 'Concierto de Rock en Base Network',
    description: 'El mejor concierto de rock en la blockchain',
    date: '15 de Diciembre, 2025',
    time: '20:00',
    location: 'Base Network Arena',
    price: '0.05 ETH',
    image: '🎸',
    category: 'Música',
    organizer: 'Base Events DAO'
  }

  const handleOpenModal = () => {
    console.log('🔘 Botón clickeado, abriendo modal...')
    setIsModalOpen(true)
    console.log('🔘 Estado del modal:', true)
  }

  const handleCloseModal = () => {
    console.log('🔘 Cerrando modal...')
    setIsModalOpen(false)
    console.log('🔘 Estado del modal:', false)
  }

  console.log('🔘 CheckoutModalTest render:', { isModalOpen })

  return (
    <div style={{ 
      padding: '2rem', 
      textAlign: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
      color: '#ffffff'
    }}>
      <h1 style={{ marginBottom: '2rem' }}>🧪 Test del Modal de Checkout</h1>
      
      <div style={{ marginBottom: '2rem' }}>
        <p>Estado del modal: <strong>{isModalOpen ? 'ABIERTO' : 'CERRADO'}</strong></p>
        <p>Evento: <strong>{testEvent.title}</strong></p>
      </div>
      
      <button
        onClick={handleOpenModal}
        style={{
          background: 'linear-gradient(135deg, #00ffff, #ff00ff)',
          color: '#000000',
          border: 'none',
          padding: '1rem 2rem',
          borderRadius: '15px',
          fontSize: '1.1rem',
          fontWeight: 'bold',
          cursor: 'pointer',
          margin: '1rem',
          boxShadow: '0 10px 30px rgba(0, 255, 255, 0.3)',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)'
          e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 255, 255, 0.5)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 255, 255, 0.3)'
        }}
      >
        🎫 Abrir Modal de Checkout
      </button>

      {/* Debug info */}
      <div style={{ 
        marginTop: '2rem', 
        padding: '1rem', 
        background: 'rgba(255, 255, 255, 0.1)', 
        borderRadius: '10px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        maxWidth: '600px',
        margin: '2rem auto'
      }}>
        <h3 style={{ color: '#00ffff', marginBottom: '1rem' }}>🐛 Debug Info</h3>
        <div style={{ textAlign: 'left', fontSize: '0.9rem' }}>
          <p><strong>isModalOpen:</strong> {String(isModalOpen)}</p>
          <p><strong>Modal Component:</strong> {isModalOpen ? 'Renderizando...' : 'No renderizado'}</p>
          <p><strong>Event Data:</strong> {JSON.stringify(testEvent, null, 2)}</p>
        </div>
      </div>

      {/* Modal Component */}
      <CheckoutModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        event={testEvent}
      />
    </div>
  )
}
