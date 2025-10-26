'use client'

import * as React from 'react'
import { useState } from 'react'

interface PressureTestResult {
  repeatPosting: {
    score: number
    feedback: string
    examples: string[]
  }
  socialLift: {
    score: number
    feedback: string
    examples: string[]
  }
  contentMomentum: {
    score: number
    feedback: string
    examples: string[]
  }
  emotionalPayoff: {
    score: number
    feedback: string
    examples: string[]
  }
  overallScore: number
  recommendations: string[]
}

export function IdeaPressureTest() {
  const [isTesting, setIsTesting] = useState(false)
  const [results, setResults] = useState<PressureTestResult | null>(null)

  const runPressureTest = async () => {
    setIsTesting(true)
    
    // Simular análisis de presión del concepto TickMini
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    const testResults: PressureTestResult = {
      repeatPosting: {
        score: 8,
        feedback: "TickMini tiene excelente potencial de repetición. Los usuarios naturalmente compartirán eventos, compras de tickets, y experiencias en tiempo real.",
        examples: [
          "Compartir tickets NFT recién comprados",
          "Postear experiencias en eventos",
          "Mostrar colección de tickets",
          "Actualizar estado de eventos favoritos"
        ]
      },
      socialLift: {
        score: 9,
        feedback: "Fuerte potencial social. Los eventos son inherentemente sociales y generan conversaciones, recomendaciones y experiencias compartidas.",
        examples: [
          "Amigos descubren eventos juntos",
          "Comentarios en eventos populares",
          "Recomendaciones entre usuarios",
          "Experiencias grupales en eventos"
        ]
      },
      contentMomentum: {
        score: 7,
        feedback: "Buen momentum de contenido. Los eventos generan contenido orgánico y los usuarios crean contenido alrededor de sus experiencias.",
        examples: [
          "Eventos trending generan más posts",
          "Fotos y videos de eventos",
          "Reviews y recomendaciones",
          "Contenido generado por la comunidad"
        ]
      },
      emotionalPayoff: {
        score: 8,
        feedback: "Alto payoff emocional. Los tickets NFT y eventos crean sentido de pertenencia, logro y conexión con la comunidad.",
        examples: [
          "Orgullo por tickets NFT únicos",
          "Satisfacción por descubrir eventos",
          "Conexión con la comunidad Base",
          "Logro por asistir a eventos exclusivos"
        ]
      },
      overallScore: 8,
      recommendations: [
        "Implementar Identity Playgrounds para personalización de perfiles",
        "Crear Co-Creation Loops para eventos colaborativos",
        "Establecer Long-Term Rituals para engagement regular",
        "Fomentar sharing de experiencias en tiempo real"
      ]
    }
    
    setResults(testResults)
    setIsTesting(false)
  }

  const getScoreColor = (score: number) => {
    if (score >= 8) return '#00ff00'
    if (score >= 6) return '#ffaa00'
    return '#ff0000'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 8) return 'Excelente'
    if (score >= 6) return 'Bueno'
    return 'Necesita Mejora'
  }

  return (
    <div style={{
      background: 'rgba(0, 0, 0, 0.8)',
      borderRadius: 'clamp(12px, 3vw, 20px)',
      padding: 'clamp(2rem, 4vw, 3rem)',
      border: '2px solid rgba(0, 255, 255, 0.3)',
      marginBottom: 'clamp(2rem, 4vw, 3rem)'
    }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: 'clamp(2rem, 4vw, 3rem)',
        paddingBottom: 'clamp(1rem, 2vw, 1.5rem)',
        borderBottom: '2px solid rgba(0, 255, 255, 0.2)'
      }}>
        <h2 style={{
          color: '#00ffff',
          fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
          fontWeight: '700',
          margin: '0 0 clamp(1rem, 2vw, 1.5rem) 0',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          🔬 Pressure Test: TickMini
        </h2>
        <p style={{
          color: '#b0b0b0',
          fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
          margin: 0,
          lineHeight: 1.6
        }}>
          Evaluación del potencial viral y social de TickMini
        </p>
      </div>

      {/* Test Button */}
      <div style={{
        textAlign: 'center',
        marginBottom: 'clamp(2rem, 4vw, 3rem)'
      }}>
        <button
          onClick={runPressureTest}
          disabled={isTesting}
          style={{
            padding: 'clamp(1.2rem, 3vw, 1.8rem) clamp(2rem, 5vw, 3rem)',
            background: isTesting 
              ? 'rgba(100, 100, 100, 0.5)'
              : 'linear-gradient(135deg, #00ffff, #0080ff)',
            border: 'none',
            borderRadius: 'clamp(12px, 3vw, 20px)',
            color: '#000000',
            fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
            fontWeight: '700',
            cursor: isTesting ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            boxShadow: '0 10px 30px rgba(0, 255, 255, 0.3)'
          }}
          onMouseEnter={(e) => {
            if (!isTesting) {
              e.currentTarget.style.transform = 'translateY(-3px)'
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 255, 255, 0.5)'
            }
          }}
          onMouseLeave={(e) => {
            if (!isTesting) {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 255, 255, 0.3)'
            }
          }}
        >
          {isTesting ? (
            <>
              <div style={{
                width: 'clamp(20px, 5vw, 24px)',
                height: 'clamp(20px, 5vw, 24px)',
                border: '3px solid rgba(0, 0, 0, 0.1)',
                borderTop: '3px solid #000000',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                display: 'inline-block',
                marginRight: 'clamp(0.8rem, 2vw, 1.2rem)'
              }} />
              Analizando...
            </>
          ) : (
            '🚀 Ejecutar Pressure Test'
          )}
        </button>
      </div>

      {/* Results */}
      {results && (
        <div>
          {/* Overall Score */}
          <div style={{
            textAlign: 'center',
            marginBottom: 'clamp(2rem, 4vw, 3rem)',
            padding: 'clamp(1.5rem, 3vw, 2rem)',
            background: 'rgba(0, 255, 255, 0.1)',
            borderRadius: 'clamp(10px, 2vw, 15px)',
            border: '2px solid rgba(0, 255, 255, 0.3)'
          }}>
            <div style={{
              fontSize: 'clamp(3rem, 8vw, 5rem)',
              fontWeight: '800',
              color: getScoreColor(results.overallScore),
              marginBottom: 'clamp(0.8rem, 2vw, 1.2rem)'
            }}>
              {results.overallScore}/10
            </div>
            <h3 style={{
              color: getScoreColor(results.overallScore),
              fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
              fontWeight: '700',
              margin: '0 0 clamp(0.5rem, 1vw, 0.8rem) 0'
            }}>
              {getScoreLabel(results.overallScore)} Potencial Viral
            </h3>
            <p style={{
              color: '#b0b0b0',
              fontSize: 'clamp(0.9rem, 2.2vw, 1.1rem)',
              margin: 0,
              lineHeight: 1.6
            }}>
              TickMini tiene un fuerte potencial para convertirse en una app viral
            </p>
          </div>

          {/* Dimension Scores */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'clamp(1.5rem, 3vw, 2rem)',
            marginBottom: 'clamp(2rem, 4vw, 3rem)'
          }}>
            {[
              {
                key: 'repeatPosting',
                title: 'Repeat-Posting Potential',
                icon: '🔄',
                description: '¿Por qué alguien postearía más de una vez?'
              },
              {
                key: 'socialLift',
                title: 'Social Lift',
                icon: '👥',
                description: '¿La experiencia es mejor con otros involucrados?'
              },
              {
                key: 'contentMomentum',
                title: 'Content Momentum',
                icon: '📈',
                description: '¿Qué contenido llenaría naturalmente el feed?'
              },
              {
                key: 'emotionalPayoff',
                title: 'Emotional Payoff',
                icon: '❤️',
                description: '¿Qué recompensa emocional siente al abrir la app?'
              }
            ].map((dimension) => {
              const data = results[dimension.key as keyof PressureTestResult] as any
              return (
                <div
                  key={dimension.key}
                  style={{
                    background: 'rgba(0, 0, 0, 0.5)',
                    border: `2px solid ${getScoreColor(data.score)}`,
                    borderRadius: 'clamp(10px, 2vw, 15px)',
                    padding: 'clamp(1.5rem, 3vw, 2rem)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = `0 10px 20px ${getScoreColor(data.score)}40`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 'clamp(1rem, 2vw, 1.5rem)'
                  }}>
                    <div>
                      <div style={{
                        fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                        marginBottom: 'clamp(0.5rem, 1vw, 0.8rem)'
                      }}>
                        {dimension.icon}
                      </div>
                      <h4 style={{
                        color: '#ffffff',
                        fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
                        fontWeight: '600',
                        margin: '0 0 clamp(0.4rem, 1vw, 0.6rem) 0'
                      }}>
                        {dimension.title}
                      </h4>
                    </div>
                    <div style={{
                      background: getScoreColor(data.score),
                      color: '#000000',
                      padding: 'clamp(0.4rem, 1vw, 0.6rem) clamp(0.8rem, 2vw, 1.2rem)',
                      borderRadius: 'clamp(6px, 1.5vw, 8px)',
                      fontSize: 'clamp(0.9rem, 2.2vw, 1.1rem)',
                      fontWeight: '700'
                    }}>
                      {data.score}/10
                    </div>
                  </div>
                  
                  <p style={{
                    color: '#b0b0b0',
                    fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                    margin: '0 0 clamp(1rem, 2vw, 1.5rem) 0',
                    lineHeight: 1.5
                  }}>
                    {dimension.description}
                  </p>
                  
                  <div style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: 'clamp(6px, 1.5vw, 8px)',
                    padding: 'clamp(0.8rem, 2vw, 1.2rem)',
                    marginBottom: 'clamp(1rem, 2vw, 1.5rem)'
                  }}>
                    <p style={{
                      color: '#e0e0e0',
                      fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                      margin: '0 0 clamp(0.8rem, 2vw, 1.2rem) 0',
                      lineHeight: 1.6
                    }}>
                      {data.feedback}
                    </p>
                  </div>
                  
                  <div>
                    <h5 style={{
                      color: '#00ffff',
                      fontSize: 'clamp(0.9rem, 2.2vw, 1.1rem)',
                      fontWeight: '600',
                      margin: '0 0 clamp(0.8rem, 2vw, 1.2rem) 0'
                    }}>
                      Ejemplos:
                    </h5>
                    <ul style={{
                      color: '#b0b0b0',
                      fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                      lineHeight: 1.6,
                      margin: 0,
                      paddingLeft: 'clamp(1rem, 2.5vw, 1.5rem)'
                    }}>
                      {data.examples.map((example: string, index: number) => (
                        <li key={index} style={{ marginBottom: 'clamp(0.4rem, 1vw, 0.6rem)' }}>
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Recommendations */}
          <div style={{
            background: 'rgba(0, 255, 0, 0.1)',
            border: '2px solid rgba(0, 255, 0, 0.3)',
            borderRadius: 'clamp(10px, 2vw, 15px)',
            padding: 'clamp(1.5rem, 3vw, 2rem)'
          }}>
            <h3 style={{
              color: '#00ff00',
              fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
              fontWeight: '700',
              margin: '0 0 clamp(1rem, 2vw, 1.5rem) 0',
              textAlign: 'center'
            }}>
              🎯 Recomendaciones de Implementación
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: 'clamp(0.8rem, 2vw, 1.2rem)'
            }}>
              {results.recommendations.map((recommendation, index) => (
                <div
                  key={index}
                  style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: 'clamp(6px, 1.5vw, 8px)',
                    padding: 'clamp(0.8rem, 2vw, 1.2rem)',
                    border: '1px solid rgba(0, 255, 0, 0.3)'
                  }}
                >
                  <div style={{
                    color: '#00ff00',
                    fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                    fontWeight: '600',
                    lineHeight: 1.5
                  }}>
                    {recommendation}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
