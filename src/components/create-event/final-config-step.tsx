'use client'

import { EventFormData } from '@/app/create-event/page'
import React from 'react'

interface FinalConfigStepProps {
  formData: EventFormData
  updateFormData: (data: Partial<EventFormData>) => void
  onSubmit: () => void
  onPrev: () => void
  isSubmitting: boolean
}

const blockchainOptions = [
  { id: 'base', name: 'Base Network', icon: '🔵', description: 'L2 de Coinbase, bajas tarifas' }
]

export function FinalConfigStep({ formData, updateFormData, onSubmit, onPrev, isSubmitting }: FinalConfigStepProps) {
  const handleSubmit = (e: any) => {
    e.preventDefault()
    
    if (!formData.termsAccepted) {
      alert('Debes aceptar los términos y condiciones para continuar')
      return
    }
    
    onSubmit()
  }

  return (
    <div>
      {/* Header del paso */}
      <div style={{
        textAlign: 'center',
        marginBottom: '3rem'
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          color: '#00ffff',
          marginBottom: '1rem',
          textShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
          fontWeight: 'bold'
        }}>
          ⚙️ Configuración Final
        </h2>
        <p style={{
          fontSize: '1.1rem',
          color: '#b0b0b0',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Últimos ajustes antes de crear tu evento en blockchain
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        {/* Resumen del Evento */}
        <div style={{
          background: 'rgba(0, 255, 255, 0.05)',
          border: '1px solid rgba(0, 255, 255, 0.2)',
          borderRadius: '20px',
          padding: '2rem',
          marginBottom: '3rem'
        }}>
          <h3 style={{
            color: '#00ffff',
            fontSize: '1.5rem',
            marginBottom: '1.5rem',
            textAlign: 'center'
          }}>
            📋 Resumen del Evento
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            <div>
              <h4 style={{ color: '#ffffff', marginBottom: '0.5rem' }}>🎯 Información Básica</h4>
              <p style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>
                <strong>Título:</strong> {formData.title || 'No especificado'}<br/>
                <strong>Categoría:</strong> {formData.category || 'No especificado'}<br/>
                <strong>Organizador:</strong> {formData.organizer || 'No especificado'}
              </p>
            </div>
            
            <div>
              <h4 style={{ color: '#ffffff', marginBottom: '0.5rem' }}>📍 Fecha & Ubicación</h4>
              <p style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>
                <strong>Fecha:</strong> {formData.startDate ? `${formData.startDate} - ${formData.endDate}` : 'No especificado'}<br/>
                <strong>Hora:</strong> {formData.startTime ? `${formData.startTime} - ${formData.endTime}` : 'No especificado'}<br/>
                <strong>Lugar:</strong> {formData.location || 'No especificado'}
              </p>
            </div>
            
            <div>
              <h4 style={{ color: '#ffffff', marginBottom: '0.5rem' }}>🎫 Tickets</h4>
              <p style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>
                <strong>Tipos:</strong> {formData.ticketTypes.length} tipo(s)<br/>
                <strong>Total disponible:</strong> {formData.ticketTypes.reduce((sum, ticket) => sum + ticket.quantity, 0)} tickets
              </p>
            </div>
          </div>
        </div>

        {/* Configuración de Blockchain */}
        <div style={{ marginBottom: '3rem' }}>
          <label style={{
            display: 'block',
            fontSize: '1.2rem',
            color: '#ffffff',
            marginBottom: '1rem',
            fontWeight: '500'
          }}>
            🔗 Red Blockchain *
          </label>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem'
          }}>
            {blockchainOptions.map((option) => (
              <div
                key={option.id}
                style={{
                  padding: '1.5rem',
                  background: 'rgba(0, 255, 255, 0.1)',
                  border: '2px solid #00ffff',
                  borderRadius: '15px',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  opacity: '0.8'
                }}
              >
                <span style={{ fontSize: '2rem' }}>{option.icon}</span>
                <div>
                  <div style={{
                    color: '#00ffff',
                    fontWeight: '600',
                    marginBottom: '0.3rem'
                  }}>
                    {option.name}
                  </div>
                  <div style={{
                    fontSize: '0.8rem',
                    color: '#b0b0b0'
                  }}>
                    {option.description}
                  </div>
                </div>
                <div style={{
                  marginLeft: 'auto',
                  fontSize: '0.8rem',
                  color: '#00ff00',
                  fontWeight: '500'
                }}>
                  ✓ Seleccionado
                </div>
              </div>
            ))}
          </div>
          <p style={{
            fontSize: '0.9rem',
            color: '#888888',
            marginTop: '1rem',
            textAlign: 'center',
            fontStyle: 'italic'
          }}>
            Base Network es la única red blockchain soportada actualmente
          </p>
        </div>

        {/* Porcentaje de Royalties */}
        <div style={{ marginBottom: '3rem' }}>
          <label style={{
            display: 'block',
            fontSize: '1.2rem',
            color: '#ffffff',
            marginBottom: '1rem',
            fontWeight: '500'
          }}>
            💰 Porcentaje de Royalties
          </label>
          
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '15px',
            padding: '2rem',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '2rem',
              color: '#00ffff',
              marginBottom: '1rem'
            }}>
              {formData.royaltyPercentage}%
            </div>
            
            <input
              type="range"
              min="0"
              max="20"
              step="1"
              value={formData.royaltyPercentage}
              onChange={(e: any) => updateFormData({ royaltyPercentage: parseInt(e.target.value) })}
              style={{
                width: '100%',
                height: '8px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '4px',
                outline: 'none',
                marginBottom: '1rem'
              }}
            />
            
            <p style={{
              fontSize: '0.9rem',
              color: '#b0b0b0',
              lineHeight: '1.5'
            }}>
              Los royalties te permiten ganar un porcentaje de cada reventa de tickets NFT. 
              Un 5% es estándar en la industria.
            </p>
          </div>
        </div>

        {/* Términos y Condiciones */}
        <div style={{ marginBottom: '3rem' }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '15px',
            padding: '2rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              <input
                type="checkbox"
                id="terms"
                checked={formData.termsAccepted}
                onChange={(e: any) => updateFormData({ termsAccepted: e.target.checked })}
                style={{
                  width: '20px',
                  height: '20px',
                  marginTop: '0.2rem'
                }}
              />
              <div>
                <label htmlFor="terms" style={{
                  fontSize: '1.1rem',
                  color: '#ffffff',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}>
                  Acepto los términos y condiciones *
                </label>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#b0b0b0',
                  marginTop: '0.5rem',
                  lineHeight: '1.5'
                }}>
                  Al crear este evento, confirmo que tengo los derechos para organizarlo y 
                  que toda la información proporcionada es veraz. Entiendo que los tickets 
                  se crearán como NFTs en la blockchain seleccionada y estarán sujetos a 
                  las leyes aplicables.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Información de Costos */}
        <div style={{
          background: 'rgba(0, 255, 0, 0.05)',
          border: '1px solid rgba(0, 255, 0, 0.2)',
          borderRadius: '15px',
          padding: '2rem',
          marginBottom: '3rem',
          textAlign: 'center'
        }}>
          <h3 style={{
            color: '#00ff00',
            fontSize: '1.3rem',
            marginBottom: '1rem'
          }}>
            💡 Información Importante
          </h3>
          <p style={{
            color: '#b0b0b0',
            fontSize: '0.9rem',
            lineHeight: '1.5'
          }}>
            Al crear tu evento en blockchain, se cobrará una pequeña tarifa de gas por la 
            transacción. Esta tarifa varía según la red seleccionada y la congestión de la red. 
            Los tickets NFT se crearán de forma permanente e inmutable.
          </p>
        </div>

                 {/* Botones de Navegación */}
         <div style={{
           display: 'flex',
           justifyContent: 'space-between',
           alignItems: 'center',
           gap: '2rem'
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
           
           {/* Mensaje sobre navegación libre */}
           <div style={{
             textAlign: 'center',
             flex: 1,
             margin: '0 1rem'
           }}>
             <p style={{
               color: '#888888',
               fontSize: '0.8rem',
               margin: 0,
               fontStyle: 'italic'
             }}>
               💡 Puedes revisar cualquier paso anterior haciendo clic en el indicador superior
             </p>
           </div>

          <button
            type="submit"
            disabled={!formData.termsAccepted || isSubmitting}
            style={{
              background: formData.termsAccepted && !isSubmitting
                ? 'linear-gradient(135deg, #00ff00, #00ffff)'
                : 'rgba(255, 255, 255, 0.1)',
              color: formData.termsAccepted && !isSubmitting ? '#000000' : '#666666',
              padding: '1rem 3rem',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '50px',
              cursor: formData.termsAccepted && !isSubmitting ? 'pointer' : 'not-allowed',
              transition: 'all 0.3s ease',
              boxShadow: formData.termsAccepted && !isSubmitting ? '0 0 30px rgba(0, 255, 0, 0.5)' : 'none',
              transform: formData.termsAccepted && !isSubmitting ? 'none' : 'scale(0.95)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            {isSubmitting ? (
              <>
                <div style={{
                  width: '20px',
                  height: '20px',
                  border: '2px solid #000000',
                  borderTop: '2px solid transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                Creando Evento...
              </>
            ) : (
              <>
                🚀 Crear Evento en Blockchain
              </>
            )}
          </button>
        </div>
      </form>

      {/* Información adicional */}
      <div style={{
        marginTop: '3rem',
        padding: '2rem',
        background: 'rgba(0, 255, 255, 0.05)',
        border: '1px solid rgba(0, 255, 255, 0.2)',
        borderRadius: '15px',
        textAlign: 'center'
      }}>
        <h3 style={{
          color: '#00ffff',
          marginBottom: '1rem',
          fontSize: '1.2rem'
        }}>
          🎉 ¡Estás a punto de crear tu evento!
        </h3>
        <p style={{
          color: '#b0b0b0',
          fontSize: '0.9rem',
          lineHeight: '1.5'
        }}>
          Una vez creado, tu evento estará disponible para la venta de tickets NFT. 
          Los usuarios podrán comprar tickets de forma segura usando criptomonedas.
        </p>
      </div>

      {/* CSS para la animación de spin */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
