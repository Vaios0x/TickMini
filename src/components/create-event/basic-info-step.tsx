'use client'

import { useState } from 'react'
import { EventFormData } from '@/app/create-event/page'

interface BasicInfoStepProps {
  formData: EventFormData
  updateFormData: (data: Partial<EventFormData>) => void
  onNext: () => void
}

const categories = [
  { id: 'tech', name: 'Tecnología', icon: '💻', color: '#00ff00' },
  { id: 'music', name: 'Música', icon: '🎵', color: '#ff00ff' },
  { id: 'art', name: 'Arte', icon: '🎨', color: '#ffff00' },
  { id: 'business', name: 'Negocios', icon: '💼', color: '#8000ff' },
  { id: 'gaming', name: 'Gaming', icon: '🎮', color: '#00ff80' },
  { id: 'food', name: 'Gastronomía', icon: '🍕', color: '#ff0080' },
  { id: 'sports', name: 'Deportes', icon: '⚽', color: '#ff8000' },
  { id: 'education', name: 'Educación', icon: '📚', color: '#00ffff' }
]

export function BasicInfoStep({ formData, updateFormData, onNext }: BasicInfoStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isValidating, setIsValidating] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = 'El título es obligatorio'
    } else if (formData.title.length < 5) {
      newErrors.title = 'El título debe tener al menos 5 caracteres'
    } else if (formData.title.length > 100) {
      newErrors.title = 'El título no puede exceder 100 caracteres'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es obligatoria'
    } else if (formData.description.length < 20) {
      newErrors.description = 'La descripción debe tener al menos 20 caracteres'
    } else if (formData.description.length > 500) {
      newErrors.description = 'La descripción no puede exceder 500 caracteres'
    }

    if (!formData.category) {
      newErrors.category = 'Debes seleccionar una categoría'
    }

    if (!formData.organizer.trim()) {
      newErrors.organizer = 'El organizador es obligatorio'
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

  const handleCategorySelect = (categoryId: string) => {
    updateFormData({ category: categoryId })
    // Limpiar error de categoría
    if (errors.category) {
      setErrors(prev => ({ ...prev, category: '' }))
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

  return (
    <div>
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
          🎯 Información Básica del Evento
        </h2>
        <p style={{
          fontSize: 'clamp(1rem, 3vw, 1.2rem)',
          color: '#b0b0b0',
          maxWidth: 'clamp(300px, 80vw, 600px)',
          margin: '0 auto'
        }}>
          Comienza creando la base de tu evento con información esencial
        </p>
      </div>

      <form style={{
        maxWidth: 'clamp(600px, 90vw, 900px)',
        margin: '0 auto'
      }}>
        {/* Título del Evento */}
        <div style={{ marginBottom: 'clamp(2rem, 4vw, 2.5rem)' }}>
          <label style={{
            display: 'block',
            fontSize: 'clamp(1.1rem, 3vw, 1.3rem)',
            color: '#ffffff',
            marginBottom: 'clamp(0.8rem, 2vw, 1rem)',
            fontWeight: '600'
          }}>
            🎫 Título del Evento *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="Ej: Web3 Summit 2026 - El Futuro de Blockchain"
            style={{
              width: '100%',
              padding: 'clamp(1rem, 2.5vw, 1.2rem)',
              background: 'rgba(255, 255, 255, 0.08)',
              border: `2px solid ${errors.title ? '#ff4444' : 'rgba(255, 255, 255, 0.2)'}`,
              borderRadius: 'clamp(12px, 3vw, 15px)',
              color: '#ffffff',
              fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
              outline: 'none',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(15px)'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = errors.title ? '#ff4444' : '#00ffff'
              e.target.style.boxShadow = errors.title ? '0 0 20px rgba(255, 68, 68, 0.3)' : '0 0 20px rgba(0, 255, 255, 0.3)'
            }}
            onBlur={(e) => {
              e.target.style.borderColor = errors.title ? '#ff4444' : 'rgba(255, 255, 255, 0.2)'
              e.target.style.boxShadow = 'none'
            }}
            tabIndex={0}
            aria-label="Título del evento"
            aria-describedby={errors.title ? 'title-error' : undefined}
            aria-invalid={!!errors.title}
          />
          {errors.title && (
            <div id="title-error" style={{
              color: '#ff4444',
              fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)',
              marginTop: 'clamp(0.5rem, 1.5vw, 0.8rem)',
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(0.5rem, 1.5vw, 0.8rem)'
            }}>
              <span>⚠️</span>
              <span>{errors.title}</span>
            </div>
          )}
          <div style={{
            color: '#888888',
            fontSize: 'clamp(0.7rem, 2.5vw, 0.8rem)',
            marginTop: 'clamp(0.5rem, 1.5vw, 0.8rem)',
            textAlign: 'right'
          }}>
            {formData.title.length}/100 caracteres
          </div>
        </div>

        {/* Descripción del Evento */}
        <div style={{ marginBottom: 'clamp(2rem, 4vw, 2.5rem)' }}>
          <label style={{
            display: 'block',
            fontSize: 'clamp(1.1rem, 3vw, 1.3rem)',
            color: '#ffffff',
            marginBottom: 'clamp(0.8rem, 2vw, 1rem)',
            fontWeight: '600'
          }}>
            📖 Descripción del Evento *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Describe tu evento en detalle. Incluye qué esperar, quién debería asistir, y por qué es único."
            style={{
              width: '100%',
              padding: 'clamp(1rem, 2.5vw, 1.2rem)',
              background: 'rgba(255, 255, 255, 0.08)',
              border: `2px solid ${errors.description ? '#ff4444' : 'rgba(255, 255, 255, 0.2)'}`,
              borderRadius: 'clamp(12px, 3vw, 15px)',
              color: '#ffffff',
              fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
              outline: 'none',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(15px)',
              resize: 'vertical',
              minHeight: 'clamp(100px, 20vw, 120px)',
              fontFamily: 'inherit'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = errors.description ? '#ff4444' : '#00ffff'
              e.target.style.boxShadow = errors.description ? '0 0 20px rgba(255, 68, 68, 0.3)' : '0 0 20px rgba(0, 255, 255, 0.3)'
            }}
            onBlur={(e) => {
              e.target.style.borderColor = errors.description ? '#ff4444' : 'rgba(255, 255, 255, 0.2)'
              e.target.style.boxShadow = 'none'
            }}
            tabIndex={0}
            aria-label="Descripción del evento"
            aria-describedby={errors.description ? 'description-error' : undefined}
            aria-invalid={!!errors.description}
          />
          {errors.description && (
            <div id="description-error" style={{
              color: '#ff4444',
              fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)',
              marginTop: 'clamp(0.5rem, 1.5vw, 0.8rem)',
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(0.5rem, 1.5vw, 0.8rem)'
            }}>
              <span>⚠️</span>
              <span>{errors.description}</span>
            </div>
          )}
          <div style={{
            color: '#888888',
            fontSize: 'clamp(0.7rem, 2.5vw, 0.8rem)',
            marginTop: 'clamp(0.5rem, 1.5vw, 0.8rem)',
            textAlign: 'right'
          }}>
            {formData.description.length}/500 caracteres
          </div>
        </div>

        {/* Categoría */}
        <div style={{ marginBottom: 'clamp(2rem, 4vw, 2.5rem)' }}>
          <label style={{
            display: 'block',
            fontSize: 'clamp(1.1rem, 3vw, 1.3rem)',
            color: '#ffffff',
            marginBottom: 'clamp(0.8rem, 2vw, 1rem)',
            fontWeight: '600'
          }}>
            🏷️ Categoría del Evento *
          </label>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(200px, 40vw, 250px), 1fr))',
            gap: 'clamp(1rem, 2.5vw, 1.5rem)'
          }}>
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                style={{
                  padding: 'clamp(1.2rem, 3vw, 1.5rem)',
                  background: formData.category === category.id 
                    ? `linear-gradient(135deg, ${category.color}20, ${category.color}10)` 
                    : 'rgba(255, 255, 255, 0.05)',
                  border: `2px solid ${formData.category === category.id ? category.color : 'rgba(255, 255, 255, 0.2)'}`,
                  borderRadius: 'clamp(15px, 4vw, 20px)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  transform: formData.category === category.id ? 'scale(1.02)' : 'scale(1)',
                  boxShadow: formData.category === category.id 
                    ? `0 0 20px ${category.color}40` 
                    : '0 5px 15px rgba(0, 0, 0, 0.2)',
                  backdropFilter: 'blur(15px)'
                }}
                onMouseEnter={(e) => {
                  if (formData.category !== category.id) {
                    e.currentTarget.style.transform = 'scale(1.02) translateY(-2px)'
                    e.currentTarget.style.boxShadow = `0 10px 25px ${category.color}30`
                  }
                }}
                onMouseLeave={(e) => {
                  if (formData.category !== category.id) {
                    e.currentTarget.style.transform = 'scale(1)'
                    e.currentTarget.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)'
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`Seleccionar categoría: ${category.name}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleCategorySelect(category.id)
                  }
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'clamp(0.8rem, 2vw, 1rem)'
                }}>
                  <span style={{
                    fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                    filter: formData.category === category.id ? `drop-shadow(0 0 10px ${category.color})` : 'none'
                  }}>
                    {category.icon}
                  </span>
                  <div>
                    <div style={{
                      color: formData.category === category.id ? category.color : '#ffffff',
                      fontWeight: '600',
                      fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
                      marginBottom: 'clamp(0.2rem, 0.5vw, 0.3rem)'
                    }}>
                      {category.name}
                    </div>
                    {formData.category === category.id && (
                      <div style={{
                        fontSize: 'clamp(0.7rem, 2vw, 0.8rem)',
                        color: category.color,
                        fontWeight: '500'
                      }}>
                        ✓ Seleccionado
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {errors.category && (
            <div style={{
              color: '#ff4444',
              fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)',
              marginTop: 'clamp(0.8rem, 2vw, 1rem)',
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(0.5rem, 1.5vw, 0.8rem)'
            }}>
              <span>⚠️</span>
              <span>{errors.category}</span>
            </div>
          )}
        </div>

        {/* Organizador */}
        <div style={{ marginBottom: 'clamp(2rem, 4vw, 2.5rem)' }}>
          <label style={{
            display: 'block',
            fontSize: 'clamp(1.1rem, 3vw, 1.3rem)',
            color: '#ffffff',
            marginBottom: 'clamp(0.8rem, 2vw, 1rem)',
            fontWeight: '600'
          }}>
            👤 Organizador del Evento *
          </label>
          <input
            type="text"
            value={formData.organizer}
            onChange={(e) => handleInputChange('organizer', e.target.value)}
            placeholder="Tu nombre o el nombre de tu organización"
            style={{
              width: '100%',
              padding: 'clamp(1rem, 2.5vw, 1.2rem)',
              background: 'rgba(255, 255, 255, 0.08)',
              border: `2px solid ${errors.organizer ? '#ff4444' : 'rgba(255, 255, 255, 0.2)'}`,
              borderRadius: 'clamp(12px, 3vw, 15px)',
              color: '#ffffff',
              fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
              outline: 'none',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(15px)'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = errors.organizer ? '#ff4444' : '#00ffff'
              e.target.style.boxShadow = errors.organizer ? '0 0 20px rgba(255, 68, 68, 0.3)' : '0 0 20px rgba(0, 255, 255, 0.3)'
            }}
            onBlur={(e) => {
              e.target.style.borderColor = errors.organizer ? '#ff4444' : 'rgba(255, 255, 255, 0.2)'
              e.target.style.boxShadow = 'none'
            }}
            tabIndex={0}
            aria-label="Organizador del evento"
            aria-describedby={errors.organizer ? 'organizer-error' : undefined}
            aria-invalid={!!errors.organizer}
          />
          {errors.organizer && (
            <div id="organizer-error" style={{
              color: '#ff4444',
              fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)',
              marginTop: 'clamp(0.5rem, 1.5vw, 0.8rem)',
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(0.5rem, 1.5vw, 0.8rem)'
            }}>
              <span>⚠️</span>
              <span>{errors.organizer}</span>
            </div>
          )}
        </div>

        {/* Botón Continuar */}
        <div style={{
          textAlign: 'center',
          marginTop: 'clamp(2rem, 5vw, 3rem)'
        }}>
          <button
            type="button"
            onClick={handleNext}
            disabled={isValidating}
            style={{
              background: 'linear-gradient(135deg, #00ffff, #ff00ff, #ffff00)',
              color: '#000000',
              padding: 'clamp(1rem, 3vw, 1.5rem) clamp(2rem, 5vw, 3rem)',
              borderRadius: 'clamp(25px, 6vw, 35px)',
              fontSize: 'clamp(1rem, 3vw, 1.3rem)',
              fontWeight: 'bold',
              border: 'none',
              cursor: isValidating ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 10px 30px rgba(0, 255, 255, 0.4)',
              textTransform: 'uppercase',
              letterSpacing: 'clamp(1px, 1vw, 2px)',
              transform: 'translateY(0)',
              minWidth: 'clamp(200px, 60vw, 300px)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              if (!isValidating) {
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)'
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 255, 255, 0.6)'
              }
            }}
            onMouseLeave={(e) => {
              if (!isValidating) {
                e.currentTarget.style.transform = 'translateY(0) scale(1)'
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 255, 255, 0.4)'
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
          padding: 'clamp(1.5rem, 4vw, 2rem)',
          background: 'rgba(0, 255, 255, 0.05)',
          border: '1px solid rgba(0, 255, 255, 0.2)',
          borderRadius: 'clamp(15px, 4vw, 20px)',
          textAlign: 'center'
        }}>
          <h3 style={{
            color: '#00ffff',
            fontSize: 'clamp(1.1rem, 3vw, 1.3rem)',
            marginBottom: 'clamp(0.8rem, 2vw, 1rem)',
            fontWeight: '600'
          }}>
            💡 Consejos para un Evento Exitoso
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(200px, 40vw, 250px), 1fr))',
            gap: 'clamp(1rem, 2.5vw, 1.5rem)',
            textAlign: 'left'
          }}>
            <div style={{ color: '#b0b0b0', fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)' }}>
              <strong>🎯 Título:</strong> Sé específico y atractivo. Incluye palabras clave relevantes.
            </div>
            <div style={{ color: '#b0b0b0', fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)' }}>
              <strong>📖 Descripción:</strong> Explica claramente qué esperar y por qué asistir.
            </div>
            <div style={{ color: '#b0b0b0', fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)' }}>
              <strong>🏷️ Categoría:</strong> Elige la que mejor represente tu evento para mayor visibilidad.
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
