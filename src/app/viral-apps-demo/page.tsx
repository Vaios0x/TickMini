'use client'

import * as React from 'react'
import { IdeaPressureTest } from '@/components/viral/idea-pressure-test'
import { IdentityPlaygrounds } from '@/components/viral/identity-playgrounds'
import { CoCreationLoops } from '@/components/viral/co-creation-loops'
import { LongTermRituals } from '@/components/viral/long-term-rituals'

export default function ViralAppsDemo() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
      padding: 'clamp(1rem, 2vw, 2rem)',
      color: '#ffffff'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: 'clamp(2rem, 4vw, 3rem)',
          padding: 'clamp(2rem, 4vw, 3rem)',
          background: 'rgba(0, 255, 255, 0.1)',
          borderRadius: 'clamp(15px, 4vw, 25px)',
          border: '2px solid rgba(0, 255, 255, 0.3)',
          boxShadow: '0 20px 40px rgba(0, 255, 255, 0.1)'
        }}>
          <h1 style={{
            color: '#00ffff',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: '800',
            margin: '0 0 clamp(1rem, 2vw, 1.5rem) 0',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            textShadow: '0 0 20px rgba(0, 255, 255, 0.5)'
          }}>
            🚀 Viral Apps Demo
          </h1>
          <p style={{
            color: '#b0b0b0',
            fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
            margin: 0,
            lineHeight: 1.6,
            maxWidth: '800px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Diseñando Mini Apps que las personas realmente quieren usar todos los días
          </p>
        </div>

        {/* Introduction */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.8)',
          borderRadius: 'clamp(12px, 3vw, 20px)',
          padding: 'clamp(2rem, 4vw, 3rem)',
          border: '2px solid rgba(0, 255, 255, 0.3)',
          marginBottom: 'clamp(2rem, 4vw, 3rem)',
          textAlign: 'center'
        }}>
          <h2 style={{
            color: '#00ffff',
            fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
            fontWeight: '700',
            margin: '0 0 clamp(1rem, 2vw, 1.5rem) 0',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            🎯 ¿Por qué las Apps se vuelven Virales?
          </h2>
          <p style={{
            color: '#b0b0b0',
            fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
            margin: '0 0 clamp(1.5rem, 3vw, 2rem) 0',
            lineHeight: 1.6,
            maxWidth: '900px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Las Mini Apps que prosperan no son las más complejas — son las que entienden cómo las personas se conectan.
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 'clamp(1rem, 2.5vw, 1.5rem)',
            marginTop: 'clamp(1.5rem, 3vw, 2rem)'
          }}>
            {[
              {
                icon: '👁️',
                title: 'Seen',
                description: 'Hacen que las personas se sientan vistas y reconocidas'
              },
              {
                icon: '🤝',
                title: 'Connected',
                description: 'Crean conexiones genuinas entre usuarios'
              },
              {
                icon: '🔍',
                title: 'Curious',
                description: 'Despiertan curiosidad y ganas de explorar'
              },
              {
                icon: '🏠',
                title: 'Belong',
                description: 'Generan sentido de pertenencia y comunidad'
              }
            ].map((principle, index) => (
              <div
                key={index}
                style={{
                  background: 'rgba(0, 255, 255, 0.05)',
                  border: '1px solid rgba(0, 255, 255, 0.2)',
                  borderRadius: 'clamp(8px, 2vw, 12px)',
                  padding: 'clamp(1rem, 2.5vw, 1.5rem)',
                  textAlign: 'center',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 255, 255, 0.1)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 255, 255, 0.05)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <div style={{
                  fontSize: 'clamp(2rem, 5vw, 3rem)',
                  marginBottom: 'clamp(0.8rem, 2vw, 1.2rem)'
                }}>
                  {principle.icon}
                </div>
                <h3 style={{
                  color: '#00ffff',
                  fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
                  fontWeight: '700',
                  margin: '0 0 clamp(0.5rem, 1vw, 0.8rem) 0'
                }}>
                  {principle.title}
                </h3>
                <p style={{
                  color: '#b0b0b0',
                  fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                  margin: 0,
                  lineHeight: 1.5
                }}>
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Pressure Test */}
        <div style={{
          marginBottom: 'clamp(2rem, 4vw, 3rem)'
        }}>
          <IdeaPressureTest />
        </div>

        {/* Identity Playgrounds */}
        <div style={{
          marginBottom: 'clamp(2rem, 4vw, 3rem)'
        }}>
          <IdentityPlaygrounds />
        </div>

        {/* Co-Creation Loops */}
        <div style={{
          marginBottom: 'clamp(2rem, 4vw, 3rem)'
        }}>
          <CoCreationLoops />
        </div>

        {/* Long-Term Rituals */}
        <div style={{
          marginBottom: 'clamp(2rem, 4vw, 3rem)'
        }}>
          <LongTermRituals />
        </div>

        {/* Implementation Guide */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.8)',
          borderRadius: 'clamp(12px, 3vw, 20px)',
          padding: 'clamp(2rem, 4vw, 3rem)',
          border: '2px solid rgba(0, 255, 255, 0.3)',
          marginBottom: 'clamp(2rem, 4vw, 3rem)'
        }}>
          <h2 style={{
            color: '#00ffff',
            fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
            fontWeight: '700',
            margin: '0 0 clamp(1.5rem, 3vw, 2rem) 0',
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            📋 Guía de Implementación
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'clamp(1.5rem, 3vw, 2rem)'
          }}>
            {[
              {
                step: '1',
                title: 'Pressure-Test tu Idea',
                description: 'Antes de escribir código, evalúa si tu concepto soporta comportamiento social natural',
                actions: [
                  '¿Por qué alguien postearía más de una vez?',
                  '¿La experiencia es mejor con otros?',
                  '¿Qué contenido llenaría el feed?',
                  '¿Qué recompensa emocional siente?'
                ]
              },
              {
                step: '2',
                title: 'Identifica Dimensiones Fuertes',
                description: 'Enfócate en las 1-2 dimensiones sociales que más resuenan con tu concepto',
                actions: [
                  'Repeat-posting potential',
                  'Social lift',
                  'Content momentum',
                  'Emotional payoff'
                ]
              },
              {
                step: '3',
                title: 'Implementa Patrones Sociales',
                description: 'Aplica los patrones que mejor se alinean con tus dimensiones fuertes',
                actions: [
                  'Identity Playgrounds para auto-expresión',
                  'Co-Creation Loops para colaboración',
                  'Long-Term Rituals para hábitos'
                ]
              },
              {
                step: '4',
                title: 'Mide y Optimiza',
                description: 'Define métricas temprano y úsalas para validar tus decisiones',
                actions: [
                  'Métricas de engagement diario',
                  'Tasas de retención semanal',
                  'Crecimiento orgánico mensual',
                  'Satisfacción del usuario'
                ]
              }
            ].map((step, index) => (
              <div
                key={index}
                style={{
                  background: 'rgba(0, 0, 0, 0.5)',
                  border: '2px solid rgba(0, 255, 255, 0.3)',
                  borderRadius: 'clamp(10px, 2vw, 15px)',
                  padding: 'clamp(1.5rem, 3vw, 2rem)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.7)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 255, 255, 0.2)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.5)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'clamp(0.8rem, 2vw, 1.2rem)',
                  marginBottom: 'clamp(1rem, 2vw, 1.5rem)'
                }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #00ffff, #0080ff)',
                    color: '#000000',
                    width: 'clamp(40px, 10vw, 50px)',
                    height: 'clamp(40px, 10vw, 50px)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
                    fontWeight: '700'
                  }}>
                    {step.step}
                  </div>
                  <h3 style={{
                    color: '#00ffff',
                    fontSize: 'clamp(1.1rem, 2.8vw, 1.4rem)',
                    fontWeight: '700',
                    margin: 0
                  }}>
                    {step.title}
                  </h3>
                </div>
                
                <p style={{
                  color: '#b0b0b0',
                  fontSize: 'clamp(0.9rem, 2.2vw, 1.1rem)',
                  lineHeight: 1.6,
                  margin: '0 0 clamp(1rem, 2vw, 1.5rem) 0'
                }}>
                  {step.description}
                </p>
                
                <ul style={{
                  color: '#e0e0e0',
                  fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                  lineHeight: 1.6,
                  margin: 0,
                  paddingLeft: 'clamp(1rem, 2.5vw, 1.5rem)'
                }}>
                  {step.actions.map((action, actionIndex) => (
                    <li key={actionIndex} style={{ marginBottom: 'clamp(0.4rem, 1vw, 0.6rem)' }}>
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Closing Note */}
        <div style={{
          textAlign: 'center',
          padding: 'clamp(2rem, 4vw, 3rem)',
          background: 'rgba(0, 255, 255, 0.05)',
          borderRadius: 'clamp(12px, 3vw, 20px)',
          border: '1px solid rgba(0, 255, 255, 0.2)'
        }}>
          <h3 style={{
            color: '#00ffff',
            fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
            fontWeight: '700',
            margin: '0 0 clamp(1rem, 2vw, 1.5rem) 0'
          }}>
            🎯 Reflexión Final
          </h3>
          <p style={{
            color: '#b0b0b0',
            fontSize: 'clamp(0.9rem, 2.2vw, 1.1rem)',
            margin: '0 0 clamp(1rem, 2vw, 1.5rem) 0',
            lineHeight: 1.6,
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Mientras construyes, pregúntate: <strong style={{ color: '#00ffff' }}>¿Por qué alguien querría regresar? ¿Por qué lo compartiría con un amigo?</strong>
          </p>
          <p style={{
            color: '#b0b0b0',
            fontSize: 'clamp(0.9rem, 2.2vw, 1.1rem)',
            margin: 0,
            lineHeight: 1.6,
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Esas respuestas importan más que cualquier lista de características.
          </p>
        </div>
      </div>
    </div>
  )
}
