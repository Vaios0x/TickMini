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
      
      // Force modal to center and focus for accessibility
      setTimeout(() => {
        if (typeof document !== 'undefined') {
          const modalElement = document.querySelector('.checkout-modal-overlay') as HTMLElement
          if (modalElement) {
            modalElement.focus()
            // Force center positioning
            modalElement.style.display = 'flex'
            modalElement.style.alignItems = 'center'
            modalElement.style.justifyContent = 'center'
            
            // Asegurar que el modal esté visible
            modalElement.style.visibility = 'visible'
            modalElement.style.opacity = '1'
            modalElement.style.zIndex = '10000'
          }
        }
      }, 10)
      
      // Asegurar que el modal esté centrado después de un breve delay
      setTimeout(() => {
        if (typeof document !== 'undefined') {
          const modalElement = document.querySelector('.checkout-modal-overlay') as HTMLElement
          if (modalElement) {
            modalElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }
        }
      }, 100)
    }
  }, [isOpen, event])

  console.log('🎫 CheckoutModal render:', { isOpen, hasEvent: !!event, eventTitle: event?.title })
  
  // Early return si no está abierto o no hay evento
  if (!isOpen || !event) {
    console.log('🎫 Modal no se muestra:', { isOpen, hasEvent: !!event })
    return null
  }
  
  // Fallback visual si algo falla
  if (!event.id || !event.title) {
    console.error('🎫 ERROR: Evento inválido para el modal:', event)
    return (
      <div className="checkout-modal-overlay" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000
      }}>
        <div style={{
          background: '#1a1a1a',
          padding: '2rem',
          borderRadius: '10px',
          color: 'white',
          textAlign: 'center'
        }}>
          <h3>Error al cargar el evento</h3>
          <p>No se pudo cargar la información del evento.</p>
          <button onClick={onClose} style={{
            background: '#ff4444',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>
            Cerrar
          </button>
        </div>
      </div>
    )
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
        background: 'rgba(0, 0, 0, 0.95)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000
      }}
    >
      {/* Modal Content */}
      <div className="checkout-modal-content">
        {/* Header con efecto de brillo mejorado */}
        <div className="gradient-shift" />

        {/* Close Button mejorado */}
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onClose()
          }}
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
            zIndex: 11,
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
          padding: 'clamp(0.8rem, 2.5vw, 1.2rem) clamp(1rem, 3vw, 1.5rem) clamp(0.6rem, 1.5vw, 0.8rem) clamp(1rem, 3vw, 1.5rem)',
          textAlign: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, transparent 100%)',
          flexShrink: 0,
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}>
          <h2 
            id="checkout-modal-title"
            style={{
              fontSize: 'clamp(1.3rem, 3.5vw, 1.8rem)',
              color: '#ffffff',
              fontWeight: 'bold',
              marginBottom: '0.3rem',
              textShadow: '0 0 20px rgba(0, 255, 255, 0.5)'
            }}
          >
            🎫 Checkout
          </h2>
          <p style={{
            color: '#b0b0b0',
            fontSize: 'clamp(0.8rem, 2vw, 0.95rem)',
            opacity: 0.9,
            marginBottom: 0
          }}>
            Completa tu compra de tickets NFT
          </p>
        </div>

        {/* Progress Steps mejorados */}
        <div style={{
          padding: 'clamp(0.8rem, 2vw, 1rem) clamp(1rem, 3vw, 2rem)',
          display: 'flex',
          justifyContent: 'center',
          gap: 'clamp(0.5rem, 2vw, 1rem)',
          background: 'rgba(255, 255, 255, 0.02)',
          flexShrink: 0,
          flexWrap: 'wrap'
        }}>
          {[
            { number: 1, label: 'Tickets', icon: '🎫' },
            { number: 2, label: 'Pago', icon: '💳' },
            { number: 3, label: 'Confirmación', icon: '✅' }
          ].map((stepInfo) => (
            <div key={stepInfo.number} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <div style={{
                width: 'clamp(35px, 7vw, 40px)',
                height: 'clamp(35px, 7vw, 40px)',
                borderRadius: '50%',
                background: step >= stepInfo.number 
                  ? 'linear-gradient(135deg, #00ffff, #ff00ff, #ffff00)' 
                  : 'rgba(255, 255, 255, 0.1)',
                color: step >= stepInfo.number ? '#000000' : '#b0b0b0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
                transition: 'all 0.4s ease',
                border: step >= stepInfo.number 
                  ? '2px solid rgba(0, 255, 255, 0.5)' 
                  : '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: step >= stepInfo.number 
                  ? '0 0 20px rgba(0, 255, 255, 0.3)' 
                  : 'none'
              }}>
                {stepInfo.icon}
              </div>
              <span style={{
                color: step >= stepInfo.number ? '#00ffff' : '#808080',
                fontSize: '0.9rem',
                fontWeight: '500',
                transition: 'all 0.3s ease'
              }}>
                {stepInfo.label}
              </span>
            </div>
          ))}
        </div>

        {/* Content Area */}
        <div 
          className="content-scroll"
          style={{
            flex: 1,
            padding: 'clamp(0.8rem, 2vw, 1.5rem) clamp(1rem, 3vw, 2rem)',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(0.8rem, 2vw, 1.5rem)',
            minHeight: 0,
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(0, 255, 255, 0.5) rgba(255, 255, 255, 0.1)',
            // Ajuste para móvil: menos espacio al final para acercar al botón
            paddingBottom: 'clamp(0.8rem, 2vw, 1.5rem)' // Reducido para acercar al botón
          }}
        >
          {step === 1 && (
            /* Step 1: Ticket Selection */
            <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
              <h4 style={{
                color: '#ffffff',
                fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
                marginBottom: 'clamp(0.8rem, 1.5vw, 1rem)',
                textAlign: 'center',
                textShadow: '0 0 15px rgba(255, 255, 255, 0.3)'
              }}>
                🎫 Selecciona tus Tickets
              </h4>

              {/* Event Info Card mejorada */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
                borderRadius: 'clamp(12px, 3vw, 18px)',
                padding: 'clamp(0.8rem, 2vw, 1.2rem)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
                marginBottom: 'clamp(0.8rem, 1.5vw, 1rem)'
              }}>
                                  <div style={{
                    display: 'flex',
                    gap: 'clamp(1rem, 3vw, 2rem)',
                    alignItems: 'center',
                    flexWrap: 'wrap'
                  }}>
                  <div style={{
                    width: 'clamp(80px, 20vw, 120px)',
                    height: 'clamp(80px, 20vw, 120px)',
                    borderRadius: 'clamp(15px, 3vw, 20px)',
                    background: event.image.startsWith('http') 
                      ? `url(${event.image}) center/cover`
                      : 'linear-gradient(135deg, rgba(0, 255, 255, 0.2), rgba(255, 0, 255, 0.2))',
                    border: '2px solid rgba(0, 255, 255, 0.3)',
                    boxShadow: '0 0 20px rgba(0, 255, 255, 0.2)',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'clamp(2rem, 5vw, 3rem)',
                    color: '#00ffff'
                  }}>
                    {event.image.startsWith('http') ? '' : event.image}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h5 style={{
                      color: '#00ffff',
                      fontSize: 'clamp(1.2rem, 3.5vw, 1.5rem)',
                      marginBottom: 'clamp(0.8rem, 2vw, 1rem)',
                      fontWeight: '600',
                      textShadow: '0 0 10px rgba(0, 255, 255, 0.3)'
                    }}>
                      {event.title}
                    </h5>
                    <p style={{
                      color: '#b0b0b0',
                      fontSize: '1rem',
                      marginBottom: '0.75rem',
                      lineHeight: '1.5'
                    }}>
                      📅 {event.date} a las {event.time}
                    </p>
                    <p style={{
                      color: '#b0b0b0',
                      fontSize: '1rem',
                      marginBottom: '0.75rem'
                    }}>
                      📍 {event.location}
                    </p>
                    <p style={{
                      color: '#00ffff',
                      fontSize: '1.2rem',
                      fontWeight: '600'
                    }}>
                      💰 {event.price}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quantity Selector mejorado */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
                borderRadius: 'clamp(15px, 4vw, 25px)',
                padding: 'clamp(1.5rem, 3vw, 2rem)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
              }}>
                <h5 style={{
                  color: '#ffffff',
                  fontSize: 'clamp(1.1rem, 3vw, 1.3rem)',
                  marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
                  textAlign: 'center',
                  textShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
                }}>
                  🔢 Cantidad de Tickets
                </h5>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 'clamp(1rem, 3vw, 2rem)',
                  flexWrap: 'wrap'
                }}>
                  <button
                    onClick={() => setTicketQuantity(Math.max(1, ticketQuantity - 1))}
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      color: '#ffffff',
                      width: 'clamp(50px, 12vw, 60px)',
                      height: 'clamp(50px, 12vw, 60px)',
                      borderRadius: 'clamp(15px, 3vw, 20px)',
                      fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)'
                    }}
                    onMouseEnter={(e: any) => {
                      e.currentTarget.style.transform = 'scale(1.1) translateY(-2px)'
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.4)'
                    }}
                    onMouseLeave={(e: any) => {
                      e.currentTarget.style.transform = 'scale(1) translateY(0)'
                      e.currentTarget.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    -
                  </button>
                  <div style={{
                    fontSize: 'clamp(2rem, 6vw, 3rem)',
                    color: '#00ffff',
                    fontWeight: 'bold',
                    minWidth: 'clamp(80px, 20vw, 100px)',
                    textAlign: 'center',
                    textShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
                    background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.1) 0%, rgba(255, 0, 255, 0.1) 100%)',
                    padding: 'clamp(0.8rem, 2vw, 1rem) clamp(1.5rem, 3vw, 2rem)',
                    borderRadius: 'clamp(15px, 3vw, 20px)',
                    border: '1px solid rgba(0, 255, 255, 0.3)'
                  }}>
                    {ticketQuantity}
                  </div>
                  <button
                    onClick={() => setTicketQuantity(ticketQuantity + 1)}
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      color: '#ffffff',
                      width: 'clamp(50px, 12vw, 60px)',
                      height: 'clamp(50px, 12vw, 60px)',
                      borderRadius: 'clamp(15px, 3vw, 20px)',
                      fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)'
                    }}
                    onMouseEnter={(e: any) => {
                      e.currentTarget.style.transform = 'scale(1.1) translateY(-2px)'
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.4)'
                    }}
                    onMouseLeave={(e: any) => {
                      e.currentTarget.style.transform = 'scale(1) translateY(0)'
                      e.currentTarget.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Price Breakdown mejorado */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
                borderRadius: 'clamp(15px, 4vw, 25px)',
                padding: 'clamp(1.2rem, 2.5vw, 1.5rem)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
              }}>
                <h4 style={{
                  color: '#ffffff',
                  fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                  marginBottom: 'clamp(0.8rem, 1.5vw, 1rem)',
                  textAlign: 'center',
                  textShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
                }}>
                  💰 Resumen de Precios
                </h4>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.8rem'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    color: '#b0b0b0',
                    fontSize: '1rem',
                    padding: '0.6rem',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.05)'
                  }}>
                    <span>Tickets ({ticketQuantity}x {event.price})</span>
                    <span style={{ color: '#00ffff', fontWeight: '600' }}>{totalPrice.toFixed(3)} ETH</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    color: '#b0b0b0',
                    fontSize: '1rem',
                    padding: '0.6rem',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.05)'
                  }}>
                    <span>Comisión de servicio (2.5%)</span>
                    <span style={{ color: '#ff00ff', fontWeight: '600' }}>{serviceFee.toFixed(4)} ETH</span>
                  </div>
                  <div style={{
                    height: '2px',
                    background: 'linear-gradient(90deg, #00ffff, #ff00ff, #ffff00)',
                    margin: '0.8rem 0',
                    borderRadius: '1px'
                  }} />
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    color: '#00ffff',
                    fontSize: '1.3rem',
                    fontWeight: 'bold',
                    padding: '0.8rem',
                    background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.1) 0%, rgba(255, 0, 255, 0.1) 100%)',
                    borderRadius: '18px',
                    border: '1px solid rgba(0, 255, 255, 0.3)',
                    textShadow: '0 0 15px rgba(0, 255, 255, 0.5)'
                  }}>
                    <span>Total</span>
                    <span>{finalTotal.toFixed(4)} ETH</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div style={{ animation: 'fadeInRight 0.5s ease-out' }}>
              <h4 style={{
                color: '#ffffff',
                fontSize: '1.8rem',
                marginBottom: '2rem',
                textAlign: 'center',
                textShadow: '0 0 15px rgba(255, 255, 255, 0.3)'
              }}>
                💳 Método de Pago
              </h4>

              {/* Payment Methods */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                marginBottom: '2rem'
              }}>
                <div
                  onClick={() => setSelectedPaymentMethod('wallet')}
                  style={{
                    background: selectedPaymentMethod === 'wallet' 
                      ? 'linear-gradient(135deg, rgba(0, 255, 255, 0.15) 0%, rgba(255, 0, 255, 0.15) 100%)' 
                      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
                    border: selectedPaymentMethod === 'wallet' 
                      ? '2px solid #00ffff' 
                      : '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '20px',
                    padding: '2rem',
                    cursor: 'pointer',
                    transition: 'all 0.4s ease',
                    boxShadow: selectedPaymentMethod === 'wallet' 
                      ? '0 0 30px rgba(0, 255, 255, 0.3)' 
                      : '0 10px 30px rgba(0, 0, 0, 0.3)',
                    transform: selectedPaymentMethod === 'wallet' ? 'scale(1.02)' : 'scale(1)'
                  }}
                  onMouseEnter={(e: any) => {
                    if (selectedPaymentMethod !== 'wallet') {
                      e.currentTarget.style.transform = 'scale(1.02) translateY(-2px)'
                      e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.4)'
                    }
                  }}
                  onMouseLeave={(e: any) => {
                    if (selectedPaymentMethod !== 'wallet') {
                      e.currentTarget.style.transform = 'scale(1) translateY(0)'
                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)'
                    }
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.5rem'
                  }}>
                    <div style={{
                      fontSize: '2.5rem',
                      filter: selectedPaymentMethod === 'wallet' ? 'drop-shadow(0 0 10px rgba(0, 255, 255, 0.5))' : 'none'
                    }}>
                      🔑
                    </div>
                    <div>
                      <h5 style={{
                        color: '#ffffff',
                        fontSize: '1.3rem',
                        marginBottom: '0.75rem',
                        fontWeight: '600'
                      }}>
                        Wallet de Base Network
                      </h5>
                      <p style={{
                        color: '#b0b0b0',
                        fontSize: '1rem',
                        lineHeight: '1.5'
                      }}>
                        Conecta tu wallet para pagar con ETH
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => setSelectedPaymentMethod('credit')}
                  style={{
                    background: selectedPaymentMethod === 'credit' 
                      ? 'linear-gradient(135deg, rgba(0, 255, 255, 0.15) 0%, rgba(255, 0, 255, 0.15) 100%)' 
                      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
                    border: selectedPaymentMethod === 'credit' 
                      ? '2px solid #00ffff' 
                      : '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '20px',
                    padding: '2rem',
                    cursor: 'pointer',
                    transition: 'all 0.4s ease',
                    boxShadow: selectedPaymentMethod === 'credit' 
                      ? '0 0 30px rgba(0, 255, 255, 0.3)' 
                      : '0 10px 30px rgba(0, 0, 0, 0.3)',
                    transform: selectedPaymentMethod === 'credit' ? 'scale(1.02)' : 'scale(1)'
                  }}
                  onMouseEnter={(e: any) => {
                    if (selectedPaymentMethod !== 'credit') {
                      e.currentTarget.style.transform = 'scale(1.02) translateY(-2px)'
                      e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.4)'
                    }
                  }}
                  onMouseLeave={(e: any) => {
                    if (selectedPaymentMethod !== 'credit') {
                      e.currentTarget.style.transform = 'scale(1) translateY(0)'
                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)'
                    }
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.5rem'
                  }}>
                    <div style={{
                      fontSize: '2.5rem',
                      filter: selectedPaymentMethod === 'credit' ? 'drop-shadow(0 0 10px rgba(0, 255, 255, 0.5))' : 'none'
                    }}>
                      💳
                    </div>
                    <div>
                      <h5 style={{
                        color: '#ffffff',
                        fontSize: '1.3rem',
                        marginBottom: '0.75rem',
                        fontWeight: '600'
                      }}>
                        Tarjeta de Crédito
                      </h5>
                      <p style={{
                        color: '#b0b0b0',
                        fontSize: '1rem',
                        lineHeight: '1.5'
                      }}>
                        Compra ETH con tu tarjeta (MoonPay)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Wallet Address Input mejorado */}
              {selectedPaymentMethod === 'wallet' && (
                <div style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
                  borderRadius: '25px',
                  padding: '2rem',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
                }}>
                  <label style={{
                    color: '#ffffff',
                    fontSize: '1.1rem',
                    marginBottom: '1rem',
                    display: 'block',
                    fontWeight: '500'
                  }}>
                    🔗 Dirección de Wallet
                  </label>
                  <input
                    type="text"
                    placeholder="0x... (opcional)"
                    value={walletAddress}
                    onChange={(e: any) => setWalletAddress(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '15px',
                      padding: '1rem 1.5rem',
                      color: '#ffffff',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={(e: any) => {
                      e.currentTarget.style.borderColor = '#00ffff'
                      e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.3)'
                    }}
                    onBlur={(e: any) => {
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  />
                  <p style={{
                    color: '#808080',
                    fontSize: '0.9rem',
                    marginTop: '1rem',
                    textAlign: 'center'
                  }}>
                    Si no tienes wallet, te ayudaremos a crear una
                  </p>
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            /* Step 3: Confirmation */
            <div style={{ 
              textAlign: 'center',
              animation: 'fadeInUp 0.5s ease-out'
            }}>
              <div style={{
                fontSize: '6rem',
                marginBottom: '1.5rem',
                filter: 'drop-shadow(0 0 20px rgba(0, 255, 255, 0.5))'
              }}>
                🎉
              </div>
              <h4 style={{
                color: '#00ffff',
                fontSize: '2.5rem',
                marginBottom: '1.5rem',
                textShadow: '0 0 20px rgba(0, 255, 255, 0.5)'
              }}>
                ¡Compra Exitosa!
              </h4>
              <p style={{
                color: '#b0b0b0',
                fontSize: '1.2rem',
                marginBottom: '2.5rem',
                lineHeight: '1.6'
              }}>
                Has comprado {ticketQuantity} ticket(s) para {event.title}
              </p>
              <div style={{
                background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.15) 0%, rgba(255, 0, 255, 0.15) 100%)',
                borderRadius: '25px',
                padding: '2rem',
                border: '2px solid rgba(0, 255, 255, 0.3)',
                marginBottom: '2rem',
                boxShadow: '0 0 30px rgba(0, 255, 255, 0.2)'
              }}>
                <p style={{
                  color: '#00ffff',
                  fontSize: '1.2rem',
                  marginBottom: '1rem',
                  fontWeight: '600'
                }}>
                  🎫 Ticket ID: #{Math.random().toString(36).substr(2, 9).toUpperCase()}
                </p>
                <p style={{
                  color: '#b0b0b0',
                  fontSize: '1rem',
                  lineHeight: '1.5'
                }}>
                  Tu ticket NFT será enviado a tu wallet en los próximos minutos
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer con botones de navegación */}
        <div style={{
          padding: 'clamp(1rem, 2.5vw, 1.5rem) clamp(1rem, 3vw, 2rem)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0.02) 100%)',
          flexShrink: 0,
          // Ajuste para móvil: menos espacio arriba del botón para acercar al contenido
          paddingTop: 'clamp(0.8rem, 2vw, 1.2rem)', // Reducido para acercar al contenido
          paddingBottom: 'clamp(1.2rem, 3vw, 1.8rem)' // Padding ajustado abajo
        }}>
          {step === 1 && (
            <button
              onClick={nextStep}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #00ffff, #ff00ff, #ffff00)',
                color: '#000000',
                border: 'none',
                padding: 'clamp(0.5rem, 1.2vw, 0.7rem)', // Mucho más pequeño
                borderRadius: 'clamp(10px, 2vw, 12px)', // Reducido
                fontSize: 'clamp(0.85rem, 2vw, 0.95rem)', // Reducido
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 20px rgba(0, 255, 255, 0.3)', // Reducido
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
              }}
              onMouseEnter={(e: any) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 12px 25px rgba(0, 255, 255, 0.4)' // Reducido
              }}
              onMouseLeave={(e: any) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 255, 255, 0.3)' // Reducido
              }}
            >
              Continuar al Pago →
            </button>
          )}

          {step === 2 && (
            <div style={{
              display: 'flex',
              gap: 'clamp(0.8rem, 1.5vw, 1rem)', // Gap reducido para botones más pequeños
              flexWrap: 'nowrap', // Cambiado de wrap a nowrap para que estén en la misma línea
              alignItems: 'center', // Alinear botones al centro
              justifyContent: 'center' // Cambiado a center para centrar los botones
            }}>
              <button
                onClick={prevStep}
                style={{
                  flex: '0 1 auto', // Cambiado para que no se estire
                  minWidth: 'clamp(120px, 25vw, 150px)', // Ancho mínimo fijo
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  padding: 'clamp(0.5rem, 1.2vw, 0.7rem)', // Mucho más pequeño
                  borderRadius: 'clamp(10px, 2vw, 12px)', // Reducido
                  fontSize: 'clamp(0.85rem, 2vw, 0.95rem)', // Reducido
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e: any) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e: any) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                ← Atrás
              </button>
              <button
                onClick={handlePurchase}
                disabled={isProcessing}
                style={{
                  flex: '1 1 auto', // Cambiado para que ocupe el espacio restante
                  minWidth: 'clamp(180px, 35vw, 220px)', // Ancho mínimo para el botón principal
                  background: isProcessing 
                    ? 'rgba(255, 255, 255, 0.3)' 
                    : 'linear-gradient(135deg, #00ffff, #ff00ff, #ffff00)',
                  color: '#000000',
                  border: 'none',
                  padding: 'clamp(0.5rem, 1.2vw, 0.7rem)', // Mucho más pequeño
                  borderRadius: 'clamp(10px, 2vw, 12px)', // Reducido
                  fontSize: 'clamp(0.85rem, 2vw, 0.95rem)', // Reducido
                  fontWeight: 'bold',
                  cursor: isProcessing ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: isProcessing 
                    ? 'none' 
                    : '0 8px 20px rgba(0, 255, 255, 0.3)', // Reducido
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                }}
                onMouseEnter={(e: any) => {
                  if (!isProcessing) {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 12px 25px rgba(0, 255, 255, 0.4)' // Reducido
                  }
                }}
                onMouseLeave={(e: any) => {
                  if (!isProcessing) {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 255, 255, 0.3)' // Reducido
                  }
                }}
              >
                {isProcessing ? '⏳ Procesando...' : `Pagar ${finalTotal.toFixed(4)} ETH`}
              </button>
            </div>
          )}

          {step === 3 && (
            <button
              onClick={handleClose}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #00ffff, #ff00ff, #ffff00)',
                color: '#000000',
                border: 'none',
                padding: 'clamp(0.5rem, 1.2vw, 0.7rem)', // Mucho más pequeño
                borderRadius: 'clamp(10px, 2vw, 12px)', // Reducido
                fontSize: 'clamp(0.85rem, 2vw, 0.95rem)', // Reducido
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 20px rgba(0, 255, 255, 0.3)', // Reducido
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
              }}
              onMouseEnter={(e: any) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 12px 25px rgba(0, 255, 255, 0.4)' // Reducido
              }}
              onMouseLeave={(e: any) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 255, 255, 0.3)' // Reducido
              }}
            >
              🎉 ¡Perfecto!
            </button>
          )}
        </div>
      </div>


    </div>
  )
}
