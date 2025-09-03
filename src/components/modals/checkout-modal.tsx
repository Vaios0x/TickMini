'use client'

import React, { useState, useEffect } from 'react'
import { useModalScroll } from '@/hooks/use-modal-scroll'
import './checkout-modal.css'

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  event: {
    id: number
    title: string
    description: string
    date: string
    time: string
    location: string
    price: string
    image: string
    category: string
    organizer: string
  } | null
}

export function CheckoutModal({ isOpen, onClose, event }: CheckoutModalProps) {
  const [ticketQuantity, setTicketQuantity] = useState(1)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('wallet')
  const [walletAddress, setWalletAddress] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [step, setStep] = useState(1)

  // Use custom hook for modal scroll management
  useModalScroll(isOpen)

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      console.log('🎫 Modal abriéndose para evento:', event?.title)
      setStep(1)
      setTicketQuantity(1)
      setSelectedPaymentMethod('wallet')
      setWalletAddress('')
      setIsProcessing(false)
    }
  }, [isOpen, event])

  console.log('🎫 CheckoutModal render:', { isOpen, hasEvent: !!event, eventTitle: event?.title })
  
  // Early return si no está abierto o no hay evento
  if (!isOpen || !event) {
    console.log('🎫 Modal no se muestra:', { isOpen, hasEvent: !!event })
    return null
  }
  
  // Verificación adicional de seguridad
  if (!event.id || !event.title) {
    console.error('🎫 ERROR: Evento inválido para el modal:', event)
    return null
  }
  
  console.log('🎫 Modal se va a mostrar para:', event.title)

  const priceInEth = parseFloat(event.price.split(' ')[0])
  const totalPrice = priceInEth * ticketQuantity
  const serviceFee = totalPrice * 0.025 // 2.5% service fee
  const finalTotal = totalPrice + serviceFee

  const handlePurchase = async () => {
    setIsProcessing(true)
    // Simular proceso de compra
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsProcessing(false)
    setStep(3) // Mostrar confirmación
  }

  const handleClose = () => {
    onClose()
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  return (
    <div 
      className="checkout-modal-overlay" 
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
      tabIndex={-1}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999, // Aumentado significativamente
        background: 'rgba(0, 0, 0, 0.95)', // Más opaco
        backdropFilter: 'blur(15px)',
        isolation: 'isolate' // Forzar nuevo stacking context
      }}
    >
      {/* Modal Content */}
      <div 
        className="checkout-modal-content"
        style={{
          position: 'relative',
          maxHeight: '85vh',
          maxWidth: '550px',
          width: '95vw',
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
          border: '2px solid #00ffff',
          borderRadius: '20px',
          padding: '2rem',
          overflow: 'hidden', // Cambiado de auto a hidden
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.9), 0 0 80px rgba(0, 255, 255, 0.4)',
          zIndex: 100000, // Asegurar que esté por encima
          isolation: 'isolate'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header con efecto de brillo mejorado */}
        <div 
          className="gradient-shift"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            zIndex: 1
          }}
        />

        {/* Close Button mejorado */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#ffffff',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            fontSize: '1.2rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            zIndex: 12,
            backdropFilter: 'blur(10px)'
          }}
          onMouseEnter={(e: any) => {
            e.currentTarget.style.background = 'rgba(255, 0, 0, 0.3)'
            e.currentTarget.style.borderColor = '#ff0000'
            e.currentTarget.style.transform = 'scale(1.1)'
          }}
          onMouseLeave={(e: any) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'
            e.currentTarget.style.transform = 'scale(1)'
          }}
          tabIndex={0}
          aria-label="Cerrar modal"
        >
          ✕
        </button>

        {/* Modal Header mejorado */}
        <div style={{
          padding: '1rem 0',
          textAlign: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          marginBottom: '2rem',
          position: 'relative',
          zIndex: 2
        }}>
          <h2 
            id="checkout-modal-title"
            style={{
              color: '#00ffff',
              fontSize: '2rem',
              fontWeight: 'bold',
              margin: 0,
              textShadow: '0 0 20px rgba(0, 255, 255, 0.5)'
            }}
          >
            🎫 Comprar Ticket
          </h2>
          <p style={{
            color: '#b0b0b0',
            margin: '0.5rem 0 0 0',
            fontSize: '1rem'
          }}>
            {event.title}
          </p>
        </div>

        {/* Contenido del modal según el paso */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          {step === 1 && (
            <div className="step-content">
              {/* Información del evento */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '1.5rem',
                borderRadius: '15px',
                marginBottom: '2rem',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <h3 style={{ color: '#ffffff', marginBottom: '1rem' }}>📅 Detalles del Evento</h3>
                <div style={{ display: 'grid', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#b0b0b0' }}>Fecha:</span>
                    <span style={{ color: '#ffffff' }}>{event.date}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#b0b0b0' }}>Hora:</span>
                    <span style={{ color: '#ffffff' }}>{event.time}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#b0b0b0' }}>Ubicación:</span>
                    <span style={{ color: '#ffffff' }}>{event.location}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#b0b0b0' }}>Organizador:</span>
                    <span style={{ color: '#ffffff' }}>{event.organizer}</span>
                  </div>
                </div>
              </div>

              {/* Cantidad de tickets */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '1.5rem',
                borderRadius: '15px',
                marginBottom: '2rem',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <h3 style={{ color: '#ffffff', marginBottom: '1rem' }}>🎫 Cantidad de Tickets</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>
                  <button
                    onClick={() => setTicketQuantity(Math.max(1, ticketQuantity - 1))}
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#ffffff',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      fontSize: '1.5rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    -
                  </button>
                  <span style={{ 
                    color: '#00ffff', 
                    fontSize: '2rem', 
                    fontWeight: 'bold',
                    minWidth: '60px',
                    textAlign: 'center'
                  }}>
                    {ticketQuantity}
                  </span>
                  <button
                    onClick={() => setTicketQuantity(ticketQuantity + 1)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#ffffff',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      fontSize: '1.5rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Resumen de precios */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '1.5rem',
                borderRadius: '15px',
                marginBottom: '2rem',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <h3 style={{ color: '#ffffff', marginBottom: '1rem' }}>💰 Resumen de Precios</h3>
                <div style={{ display: 'grid', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#b0b0b0' }}>Precio por ticket:</span>
                    <span style={{ color: '#ffffff' }}>{event.price}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#b0b0b0' }}>Subtotal:</span>
                    <span style={{ color: '#ffffff' }}>{totalPrice.toFixed(3)} ETH</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#b0b0b0' }}>Comisión (2.5%):</span>
                    <span style={{ color: '#ffffff' }}>{serviceFee.toFixed(3)} ETH</span>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                    paddingTop: '0.5rem',
                    marginTop: '0.5rem'
                  }}>
                    <span style={{ color: '#00ffff', fontWeight: 'bold' }}>Total:</span>
                    <span style={{ color: '#00ffff', fontWeight: 'bold', fontSize: '1.2rem' }}>
                      {finalTotal.toFixed(3)} ETH
                    </span>
                  </div>
                </div>
              </div>

              {/* Botón de siguiente paso */}
              <button
                onClick={nextStep}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #00ffff, #0080ff)',
                  color: '#000000',
                  border: 'none',
                  padding: '1rem',
                  borderRadius: '15px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e: any) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 255, 255, 0.4)'
                }}
                onMouseLeave={(e: any) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                Continuar al Pago
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="step-content">
              <h3 style={{ color: '#ffffff', marginBottom: '1rem' }}>💳 Método de Pago</h3>
              
              {/* Selección de método de pago */}
              <div style={{ marginBottom: '2rem' }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  border: selectedPaymentMethod === 'wallet' ? '2px solid #00ffff' : '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="wallet"
                    checked={selectedPaymentMethod === 'wallet'}
                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                    style={{ accentColor: '#00ffff' }}
                  />
                  <span style={{ color: '#ffffff' }}>🔗 Wallet (Base Network)</span>
                </label>
              </div>

              {/* Información de la wallet */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '1.5rem',
                borderRadius: '15px',
                marginBottom: '2rem',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <h4 style={{ color: '#ffffff', marginBottom: '1rem' }}>🔐 Conectar Wallet</h4>
                <p style={{ color: '#b0b0b0', marginBottom: '1rem' }}>
                  Para completar la compra, necesitas conectar tu wallet compatible con Base Network.
                </p>
                <button
                  style={{
                    background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.8rem 1.5rem',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e: any) => {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(255, 107, 53, 0.4)'
                  }}
                  onMouseLeave={(e: any) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  🔗 Conectar Wallet
                </button>
              </div>

              {/* Botones de navegación */}
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  onClick={prevStep}
                  style={{
                    flex: 1,
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    padding: '1rem',
                    borderRadius: '15px',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  ← Volver
                </button>
                <button
                  onClick={handlePurchase}
                  disabled={isProcessing}
                  style={{
                    flex: 1,
                    background: isProcessing ? 'rgba(255, 255, 255, 0.3)' : 'linear-gradient(135deg, #00ffff, #0080ff)',
                    color: isProcessing ? '#b0b0b0' : '#000000',
                    border: 'none',
                    padding: '1rem',
                    borderRadius: '15px',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: isProcessing ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {isProcessing ? '⏳ Procesando...' : '✅ Confirmar Compra'}
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="step-content" style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '4rem',
                marginBottom: '1rem'
              }}>
                🎉
              </div>
              <h3 style={{ color: '#00ffff', marginBottom: '1rem' }}>¡Compra Exitosa!</h3>
              <p style={{ color: '#b0b0b0', marginBottom: '2rem' }}>
                Tu ticket NFT ha sido creado y enviado a tu wallet. 
                Recibirás una confirmación en breve.
              </p>
              
              <div style={{
                background: 'rgba(0, 255, 255, 0.1)',
                padding: '1.5rem',
                borderRadius: '15px',
                marginBottom: '2rem',
                border: '1px solid rgba(0, 255, 255, 0.3)'
              }}>
                <h4 style={{ color: '#00ffff', marginBottom: '0.5rem' }}>📋 Detalles de la Transacción</h4>
                <p style={{ color: '#ffffff', margin: '0.5rem 0' }}>
                  <strong>Evento:</strong> {event.title}
                </p>
                <p style={{ color: '#ffffff', margin: '0.5rem 0' }}>
                  <strong>Tickets:</strong> {ticketQuantity}
                </p>
                <p style={{ color: '#ffffff', margin: '0.5rem 0' }}>
                  <strong>Total:</strong> {finalTotal.toFixed(3)} ETH
                </p>
              </div>

              <button
                onClick={handleClose}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #00ffff, #0080ff)',
                  color: '#000000',
                  border: 'none',
                  padding: '1rem',
                  borderRadius: '15px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e: any) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 255, 255, 0.4)'
                }}
                onMouseLeave={(e: any) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                Cerrar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
