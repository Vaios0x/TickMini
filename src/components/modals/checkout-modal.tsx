'use client'

import React, { useState } from 'react'
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
  }
}

export function CheckoutModal({ isOpen, onClose, event }: CheckoutModalProps) {
  const [ticketQuantity, setTicketQuantity] = useState(1)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('wallet')
  const [walletAddress, setWalletAddress] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [step, setStep] = useState(1)

  if (!isOpen) return null

  console.log('🎫 CheckoutModal ABIERTO:', { isOpen, event: event?.title, timestamp: new Date().toISOString() })

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
    if (step === 3) {
      onClose()
      setStep(1)
      setTicketQuantity(1)
    } else {
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
    <div className="checkout-modal-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(15px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000,
      padding: '1rem'
    }}>
      {/* Modal Content */}
      <div className="checkout-modal-content" style={{
        background: 'rgba(0, 0, 0, 0.95)',
        backdropFilter: 'blur(25px)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        borderRadius: '30px',
        maxWidth: '700px',
        width: '100%',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.8)'
      }}>
        {/* Header con efecto de brillo mejorado */}
        <div className="gradient-shift" style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, #00ffff, #ff00ff, #ffff00, #00ffff)',
          backgroundSize: '400% 100%',
          zIndex: 2
        }} />

        {/* Close Button mejorado */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#ffffff',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            fontSize: '1.5rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            zIndex: 1,
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
        >
          ✕
        </button>

        {/* Modal Header mejorado */}
        <div style={{
          padding: '2.5rem 2.5rem 1.5rem 2.5rem',
          textAlign: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, transparent 100%)',
          flexShrink: 0,
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            color: '#ffffff',
            fontWeight: 'bold',
            marginBottom: '0.75rem',
            textShadow: '0 0 20px rgba(0, 255, 255, 0.5)'
          }}>
            🎫 Checkout
          </h2>
          <p style={{
            color: '#b0b0b0',
            fontSize: '1.1rem',
            opacity: 0.9
          }}>
            Completa tu compra de tickets NFT
          </p>
        </div>

        {/* Progress Steps mejorados */}
        <div style={{
          padding: '1.5rem 2.5rem',
          display: 'flex',
          justifyContent: 'center',
          gap: '1.5rem',
          background: 'rgba(255, 255, 255, 0.02)',
          flexShrink: 0
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
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: step >= stepInfo.number 
                  ? 'linear-gradient(135deg, #00ffff, #ff00ff, #ffff00)' 
                  : 'rgba(255, 255, 255, 0.1)',
                color: step >= stepInfo.number ? '#000000' : '#b0b0b0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '1.3rem',
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
        <div style={{
          flex: 1,
          padding: '2rem 2.5rem',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem'
        }}>
          {step === 1 && (
            /* Step 1: Ticket Selection */
            <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
              <h4 style={{
                color: '#ffffff',
                fontSize: '1.8rem',
                marginBottom: '2rem',
                textAlign: 'center',
                textShadow: '0 0 15px rgba(255, 255, 255, 0.3)'
              }}>
                🎫 Selecciona tus Tickets
              </h4>

              {/* Event Info Card mejorada */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
                borderRadius: '25px',
                padding: '2rem',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                marginBottom: '2rem'
              }}>
                <div style={{
                  display: 'flex',
                  gap: '2rem',
                  alignItems: 'center'
                }}>
                  <div style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '20px',
                    background: `url(${event.image}) center/cover`,
                    border: '2px solid rgba(0, 255, 255, 0.3)',
                    boxShadow: '0 0 20px rgba(0, 255, 255, 0.2)'
                  }} />
                  <div style={{ flex: 1 }}>
                    <h5 style={{
                      color: '#00ffff',
                      fontSize: '1.5rem',
                      marginBottom: '1rem',
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
                borderRadius: '25px',
                padding: '2rem',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
              }}>
                <h5 style={{
                  color: '#ffffff',
                  fontSize: '1.3rem',
                  marginBottom: '1.5rem',
                  textAlign: 'center',
                  textShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
                }}>
                  🔢 Cantidad de Tickets
                </h5>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '2rem'
                }}>
                  <button
                    onClick={() => setTicketQuantity(Math.max(1, ticketQuantity - 1))}
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      color: '#ffffff',
                      width: '60px',
                      height: '60px',
                      borderRadius: '20px',
                      fontSize: '2rem',
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
                    fontSize: '3rem',
                    color: '#00ffff',
                    fontWeight: 'bold',
                    minWidth: '100px',
                    textAlign: 'center',
                    textShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
                    background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.1) 0%, rgba(255, 0, 255, 0.1) 100%)',
                    padding: '1rem 2rem',
                    borderRadius: '20px',
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
                      width: '60px',
                      height: '60px',
                      borderRadius: '20px',
                      fontSize: '2rem',
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
                borderRadius: '25px',
                padding: '2rem',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
              }}>
                <h4 style={{
                  color: '#ffffff',
                  fontSize: '1.3rem',
                  marginBottom: '1.5rem',
                  textAlign: 'center',
                  textShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
                }}>
                  💰 Resumen de Precios
                </h4>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    color: '#b0b0b0',
                    fontSize: '1.1rem',
                    padding: '0.75rem',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '15px',
                    border: '1px solid rgba(255, 255, 255, 0.05)'
                  }}>
                    <span>Tickets ({ticketQuantity}x {event.price})</span>
                    <span style={{ color: '#00ffff', fontWeight: '600' }}>{totalPrice.toFixed(3)} ETH</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    color: '#b0b0b0',
                    fontSize: '1.1rem',
                    padding: '0.75rem',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '15px',
                    border: '1px solid rgba(255, 255, 255, 0.05)'
                  }}>
                    <span>Comisión de servicio (2.5%)</span>
                    <span style={{ color: '#ff00ff', fontWeight: '600' }}>{serviceFee.toFixed(4)} ETH</span>
                  </div>
                  <div style={{
                    height: '2px',
                    background: 'linear-gradient(90deg, #00ffff, #ff00ff, #ffff00)',
                    margin: '1rem 0',
                    borderRadius: '1px'
                  }} />
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    color: '#00ffff',
                    fontSize: '1.4rem',
                    fontWeight: 'bold',
                    padding: '1rem',
                    background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.1) 0%, rgba(255, 0, 255, 0.1) 100%)',
                    borderRadius: '20px',
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
            /* Step 2: Payment Method */
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
          padding: '2rem 2.5rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0.02) 100%)',
          flexShrink: 0
        }}>
          {step === 1 && (
            <button
              onClick={nextStep}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #00ffff, #ff00ff, #ffff00)',
                color: '#000000',
                border: 'none',
                padding: '1.2rem',
                borderRadius: '20px',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 10px 30px rgba(0, 255, 255, 0.4)',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
              }}
              onMouseEnter={(e: any) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 255, 255, 0.6)'
              }}
              onMouseLeave={(e: any) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 255, 255, 0.4)'
              }}
            >
              Continuar al Pago →
            </button>
          )}

          {step === 2 && (
            <div style={{
              display: 'flex',
              gap: '1.5rem'
            }}>
              <button
                onClick={prevStep}
                style={{
                  flex: 1,
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  padding: '1.2rem',
                  borderRadius: '20px',
                  fontSize: '1.1rem',
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
                  flex: 2,
                  background: isProcessing 
                    ? 'rgba(255, 255, 255, 0.3)' 
                    : 'linear-gradient(135deg, #00ffff, #ff00ff, #ffff00)',
                  color: '#000000',
                  border: 'none',
                  padding: '1.2rem',
                  borderRadius: '20px',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  cursor: isProcessing ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: isProcessing 
                    ? 'none' 
                    : '0 10px 30px rgba(0, 255, 255, 0.4)',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                }}
                onMouseEnter={(e: any) => {
                  if (!isProcessing) {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 255, 255, 0.6)'
                  }
                }}
                onMouseLeave={(e: any) => {
                  if (!isProcessing) {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 255, 255, 0.4)'
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
                padding: '1.2rem',
                borderRadius: '20px',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 10px 30px rgba(0, 255, 255, 0.4)',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
              }}
              onMouseEnter={(e: any) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 255, 255, 0.6)'
              }}
              onMouseLeave={(e: any) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 255, 255, 0.4)'
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
