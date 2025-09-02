'use client'

import * as React from 'react'
import { EventFormData } from '@/app/create-event/page'

interface TicketConfigStepProps {
  formData: EventFormData
  updateFormData: (data: Partial<EventFormData>) => void
  onNext: () => void
  onPrev: () => void
}

const commonBenefits = [
  'Acceso al evento',
  'Certificado NFT',
  'WiFi gratuito',
  'Coffee break',
  'Material del evento',
  'Networking',
  'Acceso a grabaciones',
  'Descuentos en próximos eventos'
]

export function TicketConfigStep({ formData, updateFormData, onNext, onPrev }: TicketConfigStepProps) {
  const [newBenefit, setNewBenefit] = React.useState('')

  const addTicketType = () => {
    const newTicketType = {
      name: '',
      description: '',
      price: 0.05,
      quantity: 100,
      benefits: ['Acceso al evento']
    }
    
    updateFormData({
      ticketTypes: [...formData.ticketTypes, newTicketType]
    })
  }

  const removeTicketType = (index: number) => {
    if (formData.ticketTypes.length > 1) {
      const updatedTickets = formData.ticketTypes.filter((_, i) => i !== index)
      updateFormData({ ticketTypes: updatedTickets })
    }
  }

  const updateTicketType = (index: number, field: string, value: any) => {
    const updatedTickets = [...formData.ticketTypes]
    
    // Convertir el precio a número si es necesario
    if (field === 'price') {
      value = parseFloat(value) || 0
    }
    
    // Convertir la cantidad a número si es necesario
    if (field === 'quantity') {
      value = parseInt(value) || 0
    }
    
    updatedTickets[index] = { ...updatedTickets[index], [field]: value }
    updateFormData({ ticketTypes: updatedTickets })
  }

  const addBenefit = (ticketIndex: number) => {
    if (newBenefit.trim()) {
      const updatedTickets = [...formData.ticketTypes]
      updatedTickets[ticketIndex].benefits.push(newBenefit.trim())
      updateFormData({ ticketTypes: updatedTickets })
      setNewBenefit('')
    }
  }

  const removeBenefit = (ticketIndex: number, benefitIndex: number) => {
    const updatedTickets = [...formData.ticketTypes]
    updatedTickets[ticketIndex].benefits.splice(benefitIndex, 1)
    updateFormData({ ticketTypes: updatedTickets })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    
    // Validación básica
    const isValid = formData.ticketTypes.every(ticket => 
      ticket.name.trim() && ticket.price > 0 && ticket.quantity > 0
    )
    
    if (!isValid) {
      alert('Por favor completa todos los campos obligatorios de los tickets')
      return
    }
    
    onNext()
  }

  const isFormValid = formData.ticketTypes.every(ticket => 
    ticket.name.trim() && ticket.price > 0 && ticket.quantity > 0
  )

  return (
    <div style={{
      width: '100%',
      maxWidth: '100%',
      overflow: 'hidden'
    }}>
      {/* Header del paso */}
      <div style={{
        textAlign: 'center',
        marginBottom: 'clamp(2rem, 5vw, 3rem)'
      }}>
        <h2 style={{
          fontSize: 'clamp(2rem, 6vw, 3rem)',
          color: '#00ffff',
          marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
          textShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
          fontWeight: 'bold'
        }}>
          🎫 Configuración de Tickets
        </h2>
        <p style={{
          fontSize: 'clamp(1rem, 3vw, 1.2rem)',
          color: '#b0b0b0',
          maxWidth: 'clamp(300px, 80vw, 600px)',
          margin: '0 auto'
        }}>
          Define los tipos de tickets, precios y beneficios para tu evento
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{
        maxWidth: 'clamp(700px, 95vw, 1000px)',
        margin: '0 auto',
        overflow: 'hidden',
        width: '100%'
      }}>
        {/* Lista de Tickets */}
        {formData.ticketTypes.map((ticket, ticketIndex) => (
          <div key={ticketIndex} style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            padding: '2rem',
            marginBottom: '2rem',
            position: 'relative'
          }}>
            {/* Header del ticket */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{
                color: '#00ffff',
                fontSize: '1.3rem',
                fontWeight: '600'
              }}>
                🎫 Ticket #{ticketIndex + 1}
              </h3>
              
              {formData.ticketTypes.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeTicketType(ticketIndex)}
                  style={{
                    background: 'rgba(255, 0, 0, 0.2)',
                    color: '#ff6b6b',
                    border: '1px solid rgba(255, 0, 0, 0.3)',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    transition: 'all 0.3s ease'
                  }}
                >
                  ✕
                </button>
              )}
            </div>

            {/* Campos del ticket */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(1.5rem, 3vw, 2rem)',
              marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
              maxWidth: '100%',
              overflow: 'visible',
              padding: '0 1rem',
              alignItems: 'center'
            }}>
                             {/* Nombre del ticket */}
               <div style={{
                 width: '100%',
                 maxWidth: 'clamp(300px, 80vw, 400px)',
                 textAlign: 'center'
               }}>
                 <label style={{
                   display: 'block',
                   fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
                   color: '#ffffff',
                   marginBottom: 'clamp(0.5rem, 1.5vw, 0.8rem)',
                   fontWeight: '500',
                   textAlign: 'center'
                 }}>
                   Nombre del Ticket *
                 </label>
                <input
                  type="text"
                  value={ticket.name}
                  onChange={(e: any) => updateTicketType(ticketIndex, 'name', e.target.value)}
                  placeholder="Ej: Entrada General, VIP, Early Bird"
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    fontSize: '0.9rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '2px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '10px',
                    color: '#ffffff',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e: any) => {
                    e.target.style.border = '2px solid rgba(0, 255, 255, 0.5)'
                    e.target.style.background = 'rgba(255, 255, 255, 0.08)'
                  }}
                  onBlur={(e: any) => {
                    e.target.style.border = '2px solid rgba(255, 255, 255, 0.1)'
                    e.target.style.background = 'rgba(255, 255, 255, 0.05)'
                  }}
                  required
                />
              </div>

                             {/* Precio */}
               <div style={{
                 width: '100%',
                 maxWidth: 'clamp(300px, 80vw, 400px)',
                 textAlign: 'center'
               }}>
                 <label style={{
                   display: 'block',
                   fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
                   color: '#ffffff',
                   marginBottom: 'clamp(0.5rem, 1.5vw, 0.8rem)',
                   fontWeight: '500',
                   textAlign: 'center'
                 }}>
                   Precio (Sepolia) *
                 </label>
                <input
                  type="number"
                  step="0.001"
                  min="0"
                  value={ticket.price}
                  onChange={(e: any) => updateTicketType(ticketIndex, 'price', e.target.value)}
                  placeholder="0.05"
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    fontSize: '0.9rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '2px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '10px',
                    color: '#ffffff',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e: any) => {
                    e.target.style.border = '2px solid rgba(0, 255, 255, 0.5)'
                    e.target.style.background = 'rgba(255, 255, 255, 0.08)'
                  }}
                  onBlur={(e: any) => {
                    e.target.style.border = '2px solid rgba(255, 255, 255, 0.1)'
                    e.target.style.background = 'rgba(255, 255, 255, 0.05)'
                  }}
                  required
                />
              </div>

                             {/* Cantidad */}
               <div style={{
                 width: '100%',
                 maxWidth: 'clamp(300px, 80vw, 400px)',
                 textAlign: 'center'
               }}>
                 <label style={{
                   display: 'block',
                   fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
                   color: '#ffffff',
                   marginBottom: 'clamp(0.5rem, 1.5vw, 0.8rem)',
                   fontWeight: '500',
                   textAlign: 'center'
                 }}>
                   Cantidad Disponible *
                 </label>
                <input
                  type="number"
                  min="1"
                  value={ticket.quantity}
                  onChange={(e: any) => updateTicketType(ticketIndex, 'quantity', parseInt(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    fontSize: '0.9rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '2px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '10px',
                    color: '#ffffff',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e: any) => {
                    e.target.style.border = '2px solid rgba(0, 255, 255, 0.5)'
                    e.target.style.background = 'rgba(255, 255, 255, 0.08)'
                  }}
                  onBlur={(e: any) => {
                    e.target.style.border = '2px solid rgba(255, 255, 255, 0.1)'
                    e.target.style.background = 'rgba(255, 255, 255, 0.05)'
                  }}
                  required
                />
              </div>
            </div>

            {/* Beneficios */}
            <div style={{ 
              marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
              padding: '0 1rem'
            }}>
              <label style={{
                display: 'block',
                fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
                color: '#ffffff',
                marginBottom: 'clamp(0.8rem, 2vw, 1rem)',
                fontWeight: '500',
                textAlign: 'center'
              }}>
                🎁 Beneficios Incluidos
              </label>
              
              {/* Lista de beneficios */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'clamp(0.5rem, 1.5vw, 0.8rem)',
                marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                {ticket.benefits.map((benefit, benefitIndex) => (
                  <div key={benefitIndex} style={{
                    background: 'rgba(0, 255, 255, 0.1)',
                    border: '1px solid rgba(0, 255, 255, 0.3)',
                    borderRadius: '20px',
                    padding: '0.5rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.9rem',
                    color: '#00ffff'
                  }}>
                    <span>✓ {benefit}</span>
                    <button
                      type="button"
                      onClick={() => removeBenefit(ticketIndex, benefitIndex)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#ff6b6b',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        padding: '0',
                        width: '20px',
                        height: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              {/* Agregar nuevo beneficio */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'clamp(1rem, 2vw, 1.5rem)',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                maxWidth: 'clamp(300px, 80vw, 400px)'
              }}>
                <input
                  type="text"
                  value={newBenefit}
                  onChange={(e: any) => setNewBenefit(e.target.value)}
                  placeholder="Agregar nuevo beneficio..."
                  style={{
                    width: '100%',
                    padding: 'clamp(0.8rem, 2vw, 1rem)',
                    fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '2px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 'clamp(10px, 2.5vw, 12px)',
                    color: '#ffffff',
                    textAlign: 'center'
                  }}
                />
                <button
                  type="button"
                  onClick={() => addBenefit(ticketIndex)}
                  disabled={!newBenefit.trim()}
                  style={{
                    background: 'rgba(0, 255, 0, 0.2)',
                    color: '#00ff00',
                    border: '1px solid rgba(0, 255, 0, 0.3)',
                    borderRadius: 'clamp(10px, 2.5vw, 12px)',
                    padding: 'clamp(0.8rem, 2vw, 1rem) clamp(1.5rem, 3vw, 2rem)',
                    cursor: newBenefit.trim() ? 'pointer' : 'not-allowed',
                    fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)',
                    transition: 'all 0.3s ease',
                    width: '100%',
                    maxWidth: 'clamp(200px, 60vw, 250px)'
                  }}
                >
                  ➕ Agregar
                </button>
              </div>

              {/* Beneficios comunes */}
              <div style={{
                marginTop: 'clamp(1rem, 2vw, 1.5rem)',
                padding: 'clamp(1rem, 2vw, 1.5rem)',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: 'clamp(10px, 2.5vw, 15px)',
                textAlign: 'center',
                width: '100%',
                maxWidth: 'clamp(350px, 85vw, 450px)'
              }}>
                <p style={{
                  fontSize: 'clamp(0.7rem, 2.2vw, 0.8rem)',
                  color: '#888888',
                  marginBottom: 'clamp(0.5rem, 1.5vw, 0.8rem)',
                  textAlign: 'center'
                }}>
                  Beneficios comunes que puedes agregar:
                </p>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 'clamp(0.3rem, 1vw, 0.5rem)',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%'
                }}>
                  {commonBenefits.map((benefit) => (
                    <button
                      key={benefit}
                      type="button"
                      onClick={() => {
                        if (!ticket.benefits.includes(benefit)) {
                          updateTicketType(ticketIndex, 'benefits', [...ticket.benefits, benefit])
                        }
                      }}
                      disabled={ticket.benefits.includes(benefit)}
                                             style={{
                         background: ticket.benefits.includes(benefit)
                           ? 'rgba(0, 255, 0, 0.2)'
                           : 'rgba(255, 255, 255, 0.05)',
                         color: ticket.benefits.includes(benefit) ? '#00ff00' : '#888888',
                         border: '1px solid rgba(255, 255, 255, 0.1)',
                         borderRadius: 'clamp(12px, 3vw, 15px)',
                         padding: 'clamp(0.3rem, 1.5vw, 0.5rem) clamp(0.6rem, 2vw, 0.8rem)',
                         fontSize: 'clamp(0.6rem, 2vw, 0.7rem)',
                         cursor: ticket.benefits.includes(benefit) ? 'default' : 'pointer',
                         transition: 'all 0.3s ease',
                         textAlign: 'center',
                         minWidth: 'fit-content'
                       }}
                    >
                      {benefit}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Botón para agregar más tickets */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: 'clamp(2rem, 4vw, 2.5rem)',
          padding: '0 1rem'
        }}>
          <button
            type="button"
            onClick={addTicketType}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#ffffff',
              border: '2px dashed rgba(255, 255, 255, 0.3)',
              borderRadius: '15px',
              padding: '1rem 2rem',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              margin: '0 auto'
            }}
          >
            ➕ Agregar Otro Tipo de Ticket
          </button>
        </div>

        {/* Botones de Navegación */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 'clamp(1rem, 3vw, 2rem)',
          marginTop: 'clamp(2rem, 4vw, 2.5rem)',
          flexWrap: 'wrap',
          width: '100%',
          padding: '0 1rem'
        }}>
          <button
            type="button"
            onClick={onPrev}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#ffffff',
              padding: '1rem 2rem',
              fontSize: '1.1rem',
              fontWeight: '600',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '50px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            ⬅️ Paso Anterior
          </button>

          <button
            type="submit"
            disabled={!isFormValid}
            style={{
              background: isFormValid
                ? 'linear-gradient(135deg, #00ffff, #ff00ff)'
                : 'rgba(255, 255, 255, 0.1)',
              color: isFormValid ? '#000000' : '#666666',
              padding: '1rem 3rem',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '50px',
              cursor: isFormValid ? 'pointer' : 'not-allowed',
              transition: 'all 0.3s ease',
              boxShadow: isFormValid ? '0 0 30px rgba(0, 255, 255, 0.5)' : 'none',
              transform: isFormValid ? 'none' : 'scale(0.95)'
            }}
          >
            {isFormValid ? '📸 Agregar Multimedia' : '⚠️ Completa todos los campos'}
          </button>
        </div>
      </form>

      {/* Información adicional */}
      <div style={{
        marginTop: 'clamp(2rem, 5vw, 3rem)',
        padding: 'clamp(1.5rem, 4vw, 2rem)',
        background: 'rgba(0, 255, 255, 0.05)',
        border: '1px solid rgba(0, 255, 255, 0.2)',
        borderRadius: 'clamp(15px, 4vw, 20px)',
        textAlign: 'center',
        maxWidth: 'clamp(600px, 90vw, 800px)',
        margin: 'clamp(2rem, 5vw, 3rem) auto 0',
        overflow: 'visible'
      }}>
        <h3 style={{
          color: '#00ffff',
          marginBottom: 'clamp(0.8rem, 2vw, 1rem)',
          fontSize: 'clamp(1.1rem, 3vw, 1.3rem)',
          fontWeight: '600'
        }}>
          💡 Consejo
        </h3>
        <p style={{
          color: '#b0b0b0',
          fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)',
          lineHeight: '1.5',
          maxWidth: 'clamp(400px, 80vw, 600px)',
          margin: '0 auto'
        }}>
          Ofrece diferentes niveles de tickets para maximizar las ventas. Los beneficios exclusivos pueden justificar precios más altos.
        </p>
      </div>
    </div>
  )
}
