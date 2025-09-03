'use client'

import * as React from 'react'
import { EventFormData } from '@/app/create-event/page'

interface DateLocationStepProps {
  formData: EventFormData
  updateFormData: (data: Partial<EventFormData>) => void
  onNext: () => void
  onPrev: () => void
}

const countries = [
  { code: 'MX', name: 'México', flag: '🇲🇽' },
  { code: 'US', name: 'Estados Unidos', flag: '🇺🇸' },
  { code: 'CA', name: 'Canadá', flag: '🇨🇦' },
  { code: 'ES', name: 'España', flag: '🇪🇸' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴' },
  { code: 'PE', name: 'Perú', flag: '🇵🇪' },
  { code: 'CL', name: 'Chile', flag: '🇨🇱' },
  { code: 'BR', name: 'Brasil', flag: '🇧🇷' },
  { code: 'VE', name: 'Venezuela', flag: '🇻🇪' }
]

export function DateLocationStep({ formData, updateFormData, onNext, onPrev }: DateLocationStepProps) {
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [isValidating, setIsValidating] = React.useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.startDate) {
      newErrors.startDate = 'La fecha de inicio es obligatoria'
    } else {
      const startDate = new Date(formData.startDate)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (startDate < today) {
        newErrors.startDate = 'La fecha de inicio no puede ser en el pasado'
      }
    }

    if (!formData.endDate) {
      newErrors.endDate = 'La fecha de fin es obligatoria'
    } else if (formData.startDate && formData.endDate) {
      const startDate = new Date(formData.startDate)
      const endDate = new Date(formData.endDate)
      if (endDate < startDate) {
        newErrors.endDate = 'La fecha de fin no puede ser antes que la fecha de inicio'
      }
    }

    if (!formData.startTime) {
      newErrors.startTime = 'La hora de inicio es obligatoria'
    }

    if (!formData.endTime) {
      newErrors.endTime = 'La hora de fin es obligatoria'
    } else if (formData.startTime && formData.endTime && formData.startDate === formData.endDate) {
      if (formData.endTime <= formData.startTime) {
        newErrors.endTime = 'La hora de fin debe ser después de la hora de inicio'
      }
    }

    if (!formData.location) {
      newErrors.location = 'El nombre del lugar es obligatorio'
    }

    if (!formData.address) {
      newErrors.address = 'La dirección es obligatoria'
    }

    if (!formData.city) {
      newErrors.city = 'La ciudad es obligatoria'
    }

    if (!formData.country) {
      newErrors.country = 'Debes seleccionar un país'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof EventFormData, value: string) => {
    updateFormData({ [field]: value })
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleCountrySelect = (countryCode: string) => {
    updateFormData({ country: countryCode })
    // Limpiar error de país
    if (errors.country) {
      setErrors(prev => ({ ...prev, country: '' }))
    }
  }

  const handleNext = async () => {
    if (validateForm()) {
      setIsValidating(true)
      // Simular validación
      await new Promise(resolve => setTimeout(resolve, 500))
      onNext()
    }
  }

  const getMinDate = () => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  }

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
          📅 Fechas y Ubicación del Evento
        </h2>
        <p style={{
          fontSize: 'clamp(1rem, 3vw, 1.2rem)',
          color: '#b0b0b0',
          maxWidth: 'clamp(300px, 80vw, 600px)',
          margin: '0 auto'
        }}>
          Define cuándo y dónde se realizará tu evento
        </p>
      </div>

             <form style={{
         maxWidth: 'clamp(700px, 95vw, 1000px)',
         margin: '0 auto',
         overflow: 'hidden',
         width: '100%'
       }}>
                 {/* Sección de Fechas */}
         <div style={{
           background: 'rgba(255, 0, 255, 0.05)',
           border: '1px solid rgba(255, 0, 255, 0.2)',
           borderRadius: 'clamp(15px, 4vw, 20px)',
           padding: 'clamp(1.5rem, 4vw, 2rem)',
           marginBottom: 'clamp(2rem, 4vw, 2.5rem)'
         }}>
           <h3 style={{
             color: '#ff00ff',
             fontSize: 'clamp(1.3rem, 4vw, 1.6rem)',
             marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
             textAlign: 'center',
             fontWeight: '600'
           }}>
             📅 Fechas del Evento
           </h3>
           
                      <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(2rem, 4vw, 2.5rem)',
              maxWidth: '100%',
              overflow: 'visible',
              padding: '0 1rem',
              alignItems: 'center'
            }}>
             {/* Fecha de Inicio */}
             <div style={{
               width: '100%',
               maxWidth: 'clamp(300px, 80vw, 400px)',
               textAlign: 'center'
             }}>
              <label style={{
                display: 'block',
                fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
                color: '#ffffff',
                marginBottom: 'clamp(0.5rem, 1.5vw, 0.8rem)',
                fontWeight: '500',
                textAlign: 'center'
              }}>
                📅 Fecha de Inicio *
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
                min={getMinDate()}
                style={{
                  width: '100%',
                  padding: 'clamp(0.8rem, 2vw, 1rem)',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: `2px solid ${errors.startDate ? '#ff4444' : 'rgba(255, 255, 255, 0.2)'}`,
                  borderRadius: 'clamp(10px, 2.5vw, 12px)',
                  color: '#ffffff',
                  fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(15px)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = errors.startDate ? '#ff4444' : '#ff00ff'
                  e.target.style.boxShadow = errors.startDate ? '0 0 20px rgba(255, 68, 68, 0.3)' : '0 0 20px rgba(255, 0, 255, 0.3)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.startDate ? '#ff4444' : 'rgba(255, 255, 255, 0.2)'
                  e.target.style.boxShadow = 'none'
                }}
                tabIndex={0}
                aria-label="Fecha de inicio del evento"
                aria-describedby={errors.startDate ? 'startDate-error' : undefined}
                aria-invalid={!!errors.startDate}
              />
              {errors.startDate && (
                <div id="startDate-error" style={{
                  color: '#ff4444',
                  fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)',
                  marginTop: 'clamp(0.5rem, 1.5vw, 0.8rem)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'clamp(0.5rem, 1.5vw, 0.8rem)'
                }}>
                  <span>⚠️</span>
                  <span>{errors.startDate}</span>
                </div>
              )}
            </div>

            {/* Fecha de Fin */}
            <div style={{
              width: '100%',
              maxWidth: 'clamp(300px, 80vw, 400px)',
              textAlign: 'center'
            }}>
              <label style={{
                display: 'block',
                fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
                color: '#ffffff',
                marginBottom: 'clamp(0.5rem, 1.5vw, 0.8rem)',
                fontWeight: '500',
                textAlign: 'center'
              }}>
                📅 Fecha de Fin *
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
                min={formData.startDate || getMinDate()}
                style={{
                  width: '100%',
                  padding: 'clamp(0.8rem, 2vw, 1rem)',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: `2px solid ${errors.endDate ? '#ff4444' : 'rgba(255, 255, 255, 0.2)'}`,
                  borderRadius: 'clamp(10px, 2.5vw, 12px)',
                  color: '#ffffff',
                  fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(15px)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = errors.endDate ? '#ff4444' : '#ff00ff'
                  e.target.style.boxShadow = errors.endDate ? '0 0 20px rgba(255, 68, 68, 0.3)' : '0 0 20px rgba(255, 0, 255, 0.3)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.endDate ? '#ff4444' : 'rgba(255, 255, 255, 0.2)'
                  e.target.style.boxShadow = 'none'
                }}
                tabIndex={0}
                aria-label="Fecha de fin del evento"
                aria-describedby={errors.endDate ? 'endDate-error' : undefined}
                aria-invalid={!!errors.endDate}
              />
              {errors.endDate && (
                <div id="endDate-error" style={{
                  color: '#ff4444',
                  fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)',
                  marginTop: 'clamp(0.5rem, 1.5vw, 0.8rem)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'clamp(0.5rem, 1.5vw, 0.8rem)'
                }}>
                  <span>⚠️</span>
                  <span>{errors.endDate}</span>
                </div>
              )}
            </div>
          </div>
        </div>

                 {/* Sección de Horarios */}
         <div style={{
           background: 'rgba(255, 255, 0, 0.05)',
           border: '1px solid rgba(255, 255, 0, 0.2)',
           borderRadius: 'clamp(15px, 4vw, 20px)',
           padding: 'clamp(1.5rem, 4vw, 2rem)',
           marginBottom: 'clamp(2rem, 4vw, 2.5rem)'
         }}>
           <h3 style={{
             color: '#ffff00',
             fontSize: 'clamp(1.3rem, 4vw, 1.6rem)',
             marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
             textAlign: 'center',
             fontWeight: '600'
           }}>
             🕐 Horarios del Evento
           </h3>
           
                      <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(2rem, 4vw, 2.5rem)',
              maxWidth: '100%',
              overflow: 'visible',
              padding: '0 1rem',
              alignItems: 'center'
            }}>
             {/* Hora de Inicio */}
             <div style={{
               width: '100%',
               maxWidth: 'clamp(300px, 80vw, 400px)',
               textAlign: 'center'
             }}>
              <label style={{
                display: 'block',
                fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
                color: '#ffffff',
                marginBottom: 'clamp(0.5rem, 1.5vw, 0.8rem)',
                fontWeight: '500',
                textAlign: 'center'
              }}>
                🕐 Hora de Inicio *
              </label>
              <input
                type="time"
                value={formData.startTime}
                onChange={(e) => handleInputChange('startTime', e.target.value)}
                style={{
                  width: '100%',
                  padding: 'clamp(0.8rem, 2vw, 1rem)',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: `2px solid ${errors.startTime ? '#ff4444' : 'rgba(255, 255, 255, 0.2)'}`,
                  borderRadius: 'clamp(10px, 2.5vw, 12px)',
                  color: '#ffffff',
                  fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(15px)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = errors.startTime ? '#ff4444' : '#ffff00'
                  e.target.style.boxShadow = errors.startTime ? '0 0 20px rgba(255, 68, 68, 0.3)' : '0 0 20px rgba(255, 255, 0, 0.3)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.startTime ? '#ff4444' : 'rgba(255, 255, 255, 0.2)'
                  e.target.style.boxShadow = 'none'
                }}
                tabIndex={0}
                aria-label="Hora de inicio del evento"
                aria-describedby={errors.startTime ? 'startTime-error' : undefined}
                aria-invalid={!!errors.startTime}
              />
              {errors.startTime && (
                <div id="startTime-error" style={{
                  color: '#ff4444',
                  fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)',
                  marginTop: 'clamp(0.5rem, 1.5vw, 0.8rem)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'clamp(0.5rem, 1.5vw, 0.8rem)'
                }}>
                  <span>⚠️</span>
                  <span>{errors.startTime}</span>
                </div>
              )}
            </div>

            {/* Hora de Fin */}
            <div style={{
              width: '100%',
              maxWidth: 'clamp(300px, 80vw, 400px)',
              textAlign: 'center'
            }}>
              <label style={{
                display: 'block',
                fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
                color: '#ffffff',
                marginBottom: 'clamp(0.5rem, 1.5vw, 0.8rem)',
                fontWeight: '500',
                textAlign: 'center'
              }}>
                🕐 Hora de Fin *
              </label>
              <input
                type="time"
                value={formData.endTime}
                onChange={(e) => handleInputChange('endTime', e.target.value)}
                style={{
                  width: '100%',
                  padding: 'clamp(0.8rem, 2vw, 1rem)',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: `2px solid ${errors.endTime ? '#ff4444' : 'rgba(255, 255, 255, 0.2)'}`,
                  borderRadius: 'clamp(10px, 2.5vw, 12px)',
                  color: '#ffffff',
                  fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(15px)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = errors.endTime ? '#ff4444' : '#ffff00'
                  e.target.style.boxShadow = errors.endTime ? '0 0 20px rgba(255, 68, 68, 0.3)' : '0 0 20px rgba(255, 255, 0, 0.3)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.endTime ? '#ff4444' : 'rgba(255, 255, 255, 0.2)'
                  e.target.style.boxShadow = 'none'
                }}
                tabIndex={0}
                aria-label="Hora de fin del evento"
                aria-describedby={errors.endTime ? 'endTime-error' : undefined}
                aria-invalid={!!errors.endTime}
              />
              {errors.endTime && (
                <div id="endTime-error" style={{
                  color: '#ff4444',
                  fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)',
                  marginTop: 'clamp(0.5rem, 1.5vw, 0.8rem)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'clamp(0.5rem, 1.5vw, 0.8rem)'
                }}>
                  <span>⚠️</span>
                  <span>{errors.endTime}</span>
                </div>
              )}
            </div>
          </div>
        </div>

                 {/* Sección de Ubicación */}
         <div style={{
           background: 'rgba(0, 255, 0, 0.05)',
           border: '1px solid rgba(0, 255, 0, 0.2)',
           borderRadius: 'clamp(15px, 4vw, 20px)',
           padding: 'clamp(1.5rem, 4vw, 2rem)',
           marginBottom: 'clamp(2rem, 4vw, 2.5rem)'
         }}>
           <h3 style={{
             color: '#00ff00',
             fontSize: 'clamp(1.3rem, 4vw, 1.6rem)',
             marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
             textAlign: 'center',
             fontWeight: '600'
           }}>
             📍 Ubicación del Evento
           </h3>
           
                      <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(2rem, 4vw, 2.5rem)',
              maxWidth: '100%',
              overflow: 'visible',
              padding: '0 1rem',
              alignItems: 'center'
            }}>
             {/* Nombre del Lugar */}
             <div style={{
               width: '100%',
               maxWidth: 'clamp(300px, 80vw, 400px)',
               textAlign: 'center'
             }}>
              <label style={{
                display: 'block',
                fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
                color: '#ffffff',
                marginBottom: 'clamp(0.5rem, 1.5vw, 0.8rem)',
                fontWeight: '500',
                textAlign: 'center'
              }}>
                🏢 Nombre del Lugar *
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="Ej: Centro de Convenciones, Auditorio Principal"
                style={{
                  width: '100%',
                  padding: 'clamp(0.8rem, 2vw, 1rem)',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: `2px solid ${errors.location ? '#ff4444' : 'rgba(255, 255, 255, 0.2)'}`,
                  borderRadius: 'clamp(10px, 2.5vw, 12px)',
                  color: '#ffffff',
                  fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(15px)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = errors.location ? '#ff4444' : '#00ff00'
                  e.target.style.boxShadow = errors.location ? '0 0 20px rgba(255, 68, 68, 0.3)' : '0 0 20px rgba(0, 255, 0, 0.3)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.location ? '#ff4444' : 'rgba(255, 255, 255, 0.2)'
                  e.target.style.boxShadow = 'none'
                }}
                tabIndex={0}
                aria-label="Nombre del lugar del evento"
                aria-describedby={errors.location ? 'location-error' : undefined}
                aria-invalid={!!errors.location}
              />
              {errors.location && (
                <div id="location-error" style={{
                  color: '#ff4444',
                  fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)',
                  marginTop: 'clamp(0.5rem, 1.5vw, 0.8rem)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'clamp(0.5rem, 1.5vw, 0.8rem)'
                }}>
                  <span>⚠️</span>
                  <span>{errors.location}</span>
                </div>
              )}
            </div>

            {/* Dirección */}
            <div style={{
              width: '100%',
              maxWidth: 'clamp(300px, 80vw, 400px)',
              textAlign: 'center'
            }}>
              <label style={{
                display: 'block',
                fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
                color: '#ffffff',
                marginBottom: 'clamp(0.5rem, 1.5vw, 0.8rem)',
                fontWeight: '500',
                textAlign: 'center'
              }}>
                🏠 Dirección *
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Ej: Av. Reforma 123, Col. Centro"
                style={{
                  width: '100%',
                  padding: 'clamp(0.8rem, 2vw, 1rem)',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: `2px solid ${errors.address ? '#ff4444' : 'rgba(255, 255, 255, 0.2)'}`,
                  borderRadius: 'clamp(10px, 2.5vw, 12px)',
                  color: '#ffffff',
                  fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(15px)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = errors.address ? '#ff4444' : '#00ff00'
                  e.target.style.boxShadow = errors.address ? '0 0 20px rgba(255, 68, 68, 0.3)' : '0 0 20px rgba(0, 255, 0, 0.3)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.address ? '#ff4444' : 'rgba(255, 255, 255, 0.2)'
                  e.target.style.boxShadow = 'none'
                }}
                tabIndex={0}
                aria-label="Dirección del evento"
                aria-describedby={errors.address ? 'address-error' : undefined}
                aria-invalid={!!errors.address}
              />
              {errors.address && (
                <div id="address-error" style={{
                  color: '#ff4444',
                  fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)',
                  marginTop: 'clamp(0.5rem, 1.5vw, 0.8rem)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'clamp(0.5rem, 1.5vw, 0.8rem)'
                }}>
                  <span>⚠️</span>
                  <span>{errors.address}</span>
                </div>
              )}
            </div>

            {/* Ciudad */}
            <div style={{
              width: '100%',
              maxWidth: 'clamp(300px, 80vw, 400px)',
              textAlign: 'center'
            }}>
              <label style={{
                display: 'block',
                fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
                color: '#ffffff',
                marginBottom: 'clamp(0.5rem, 1.5vw, 0.8rem)',
                fontWeight: '500',
                textAlign: 'center'
              }}>
                🏙️ Ciudad *
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                placeholder="Ej: Ciudad de México, Guadalajara"
                style={{
                  width: '100%',
                  padding: 'clamp(0.8rem, 2vw, 1rem)',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: `2px solid ${errors.city ? '#ff4444' : 'rgba(255, 255, 255, 0.2)'}`,
                  borderRadius: 'clamp(10px, 2.5vw, 12px)',
                  color: '#ffffff',
                  fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(15px)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = errors.city ? '#ff4444' : '#00ff00'
                  e.target.style.boxShadow = errors.city ? '0 0 20px rgba(255, 68, 68, 0.3)' : '0 0 20px rgba(0, 255, 0, 0.3)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.city ? '#ff4444' : 'rgba(255, 255, 255, 0.2)'
                  e.target.style.boxShadow = 'none'
                }}
                tabIndex={0}
                aria-label="Ciudad del evento"
                aria-describedby={errors.city ? 'city-error' : undefined}
                aria-invalid={!!errors.city}
              />
              {errors.city && (
                <div id="city-error" style={{
                  color: '#ff4444',
                  fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)',
                  marginTop: 'clamp(0.5rem, 1.5vw, 0.8rem)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'clamp(0.5rem, 1.5vw, 0.8rem)'
                }}>
                  <span>⚠️</span>
                  <span>{errors.city}</span>
                </div>
              )}
            </div>

            {/* País */}
            <div style={{
              width: '100%',
              maxWidth: 'clamp(400px, 85vw, 600px)',
              textAlign: 'center'
            }}>
              <label style={{
                display: 'block',
                fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
                color: '#ffffff',
                marginBottom: 'clamp(0.8rem, 2vw, 1rem)',
                fontWeight: '500',
                textAlign: 'center'
              }}>
                🌍 País *
              </label>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(100px, 20vw, 120px), 1fr))',
                gap: 'clamp(0.8rem, 1.5vw, 1rem)',
                maxWidth: '100%',
                overflow: 'visible',
                padding: 'clamp(0.5rem, 1vw, 1rem)',
                justifyItems: 'center',
                justifyContent: 'center'
              }}>
                {countries.map((country) => (
                  <div
                    key={country.code}
                    onClick={() => handleCountrySelect(country.code)}
                                         style={{
                       padding: 'clamp(0.8rem, 2vw, 1rem)',
                       background: formData.country === country.code 
                         ? 'linear-gradient(135deg, rgba(0, 255, 0, 0.2), rgba(0, 255, 0, 0.1))' 
                         : 'rgba(255, 255, 255, 0.05)',
                       border: `2px solid ${formData.country === country.code ? '#00ff00' : 'rgba(255, 255, 255, 0.2)'}`,
                       borderRadius: 'clamp(10px, 2.5vw, 12px)',
                       cursor: 'pointer',
                       transition: 'all 0.3s ease',
                       transform: formData.country === country.code ? 'scale(1.02)' : 'scale(1)',
                       boxShadow: formData.country === country.code 
                         ? '0 0 20px rgba(0, 255, 0, 0.4)' 
                         : '0 5px 15px rgba(0, 0, 0, 0.2)',
                       backdropFilter: 'blur(15px)',
                       height: 'clamp(70px, 18vw, 90px)',
                       width: 'clamp(90px, 18vw, 110px)',
                       display: 'flex',
                       alignItems: 'center',
                       justifyContent: 'center',
                       minWidth: 'clamp(90px, 18vw, 110px)',
                       minHeight: 'clamp(70px, 18vw, 90px)'
                     }}
                    onMouseEnter={(e) => {
                      if (formData.country !== country.code) {
                        e.currentTarget.style.transform = 'scale(1.02) translateY(-2px)'
                        e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 255, 0, 0.3)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (formData.country !== country.code) {
                        e.currentTarget.style.transform = 'scale(1)'
                        e.currentTarget.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)'
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={`Seleccionar país: ${country.name}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        handleCountrySelect(country.code)
                      }
                    }}
                  >
                                                                                                                                                                       <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 'clamp(0.3rem, 1vw, 0.5rem)',
                        textAlign: 'center',
                        height: '100%',
                        width: '100%',
                        padding: 'clamp(0.2rem, 0.8vw, 0.4rem)'
                      }}>
                        <span style={{
                          fontSize: 'clamp(1.3rem, 3vw, 1.5rem)',
                          filter: formData.country === country.code ? 'drop-shadow(0 0 10px #00ff00)' : 'none',
                          lineHeight: '1',
                          display: 'block'
                        }}>
                          {country.flag}
                        </span>
                        <div style={{
                          color: formData.country === country.code ? '#00ff00' : '#ffffff',
                          fontWeight: formData.country === country.code ? '600' : '400',
                          fontSize: 'clamp(0.6rem, 1.5vw, 0.7rem)',
                          lineHeight: '1.1',
                          maxWidth: '100%',
                          wordBreak: 'break-word',
                          overflowWrap: 'break-word'
                        }}>
                          {country.name}
                        </div>
                      </div>
                  </div>
                ))}
              </div>
              
              {errors.country && (
                <div style={{
                  color: '#ff4444',
                  fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)',
                  marginTop: 'clamp(0.8rem, 2vw, 1rem)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'clamp(0.5rem, 1.5vw, 0.8rem)'
                }}>
                  <span>⚠️</span>
                  <span>{errors.country}</span>
                </div>
              )}
            </div>
          </div>
        </div>

                 {/* Botones de Navegación */}
         <div style={{
           display: 'flex',
           justifyContent: 'space-between',
           alignItems: 'center',
           gap: 'clamp(1rem, 3vw, 2rem)',
           marginTop: 'clamp(2rem, 5vw, 3rem)',
           flexWrap: 'wrap',
           width: '100%'
         }}>
                     <button
             type="button"
             onClick={onPrev}
             style={{
               background: 'rgba(255, 255, 255, 0.1)',
               color: '#ffffff',
               padding: 'clamp(1rem, 2.5vw, 1.2rem) clamp(1.5rem, 3vw, 2rem)',
               fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
               fontWeight: '600',
               border: '2px solid rgba(255, 255, 255, 0.2)',
               borderRadius: 'clamp(25px, 6vw, 35px)',
               cursor: 'pointer',
               transition: 'all 0.3s ease',
               backdropFilter: 'blur(10px)',
               display: 'flex',
               alignItems: 'center',
               gap: 'clamp(0.5rem, 1.5vw, 0.8rem)',
               minWidth: 'clamp(150px, 40vw, 200px)',
               maxWidth: '100%'
             }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
            tabIndex={0}
            aria-label="Volver al paso anterior"
          >
            ⬅️ Paso Anterior
          </button>

                                           <button
              type="button"
              onClick={handleNext}
              disabled={isValidating}
              style={{
                background: 'linear-gradient(135deg, #00ff00, #00ffff)',
                color: '#000000',
                padding: 'clamp(1rem, 2.5vw, 1.2rem) clamp(2rem, 4vw, 2.5rem)',
                fontSize: 'clamp(0.85rem, 2.2vw, 1rem)',
                fontWeight: 'bold',
                border: 'none',
                borderRadius: 'clamp(25px, 6vw, 35px)',
                cursor: isValidating ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 10px 30px rgba(0, 255, 0, 0.4)',
                textTransform: 'uppercase',
                letterSpacing: 'clamp(0.3px, 0.6vw, 0.8px)',
                transform: 'translateY(0)',
                minWidth: 'clamp(200px, 50vw, 250px)',
                maxWidth: '100%',
                position: 'relative',
                overflow: 'hidden',
                whiteSpace: 'nowrap'
              }}
            onMouseEnter={(e) => {
              if (!isValidating) {
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)'
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 255, 0, 0.6)'
              }
            }}
            onMouseLeave={(e) => {
              if (!isValidating) {
                e.currentTarget.style.transform = 'translateY(0) scale(1)'
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 255, 0, 0.4)'
              }
            }}
            tabIndex={0}
            aria-label="Continuar al siguiente paso"
          >
            {isValidating ? (
              <>
                <div style={{
                  width: 'clamp(16px, 4vw, 20px)',
                  height: 'clamp(16px, 4vw, 20px)',
                  border: '2px solid #000000',
                  borderTop: '2px solid transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  display: 'inline-block',
                  marginRight: 'clamp(0.5rem, 1.5vw, 0.8rem)'
                }} />
                Validando...
              </>
            ) : (
              '🚀 Continuar al Siguiente Paso'
            )}
          </button>
        </div>

                 {/* Información adicional */}
         <div style={{
           marginTop: 'clamp(2rem, 5vw, 3rem)',
           padding: 'clamp(2rem, 5vw, 3rem)',
           background: 'rgba(0, 255, 255, 0.05)',
           border: '1px solid rgba(0, 255, 255, 0.2)',
           borderRadius: 'clamp(15px, 4vw, 20px)',
           textAlign: 'center',
           overflow: 'visible'
         }}>
          <h3 style={{
            color: '#00ffff',
            fontSize: 'clamp(1.1rem, 3vw, 1.3rem)',
            marginBottom: 'clamp(0.8rem, 2vw, 1rem)',
            fontWeight: '600'
          }}>
            💡 Consejos para Fechas y Ubicación
          </h3>
                                                                                                                                                                               <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'clamp(1.5rem, 3.5vw, 2rem)',
                textAlign: 'center',
                maxWidth: '100%',
                overflow: 'visible',
                padding: '0 1rem',
                alignItems: 'center'
              }}>
              <div style={{ 
                color: '#b0b0b0', 
                fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)',
                lineHeight: '1.5',
                padding: 'clamp(0.8rem, 2vw, 1rem)',
                wordBreak: 'normal',
                overflowWrap: 'break-word',
                width: '100%',
                maxWidth: 'clamp(400px, 80vw, 500px)',
                textAlign: 'center'
              }}>
                <strong>📅 Fechas:</strong> Planifica con anticipación y evita fechas conflictivas.
              </div>
              <div style={{ 
                color: '#b0b0b0', 
                fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)',
                lineHeight: '1.5',
                padding: 'clamp(0.8rem, 2vw, 1rem)',
                wordBreak: 'normal',
                overflowWrap: 'break-word',
                width: '100%',
                maxWidth: 'clamp(400px, 80vw, 500px)',
                textAlign: 'center'
              }}>
                <strong>🕐 Horarios:</strong> Considera la duración y horarios convenientes para tu audiencia.
              </div>
              <div style={{ 
                color: '#b0b0b0', 
                fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)',
                lineHeight: '1.5',
                padding: 'clamp(0.8rem, 2vw, 1rem)',
                wordBreak: 'normal',
                overflowWrap: 'break-word',
                width: '100%',
                maxWidth: 'clamp(400px, 80vw, 500px)',
                textAlign: 'center'
              }}>
                <strong>📍 Ubicación:</strong> Elige un lugar accesible y con buena conectividad.
              </div>
            </div>
        </div>

        {/* CSS para la animación de spin */}
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </form>
    </div>
  )
}
