'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DEMO_CONFIG, demoUtils } from '@/lib/demo-config'

export function DemoBanner() {
  const [isVisible, setIsVisible] = useState(true) // ACTIVADO
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detectar si es móvil
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          background: 'linear-gradient(135deg, #ff6b6b20, #4ecdc420, #45b7d120)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderTop: 'none',
          padding: isExpanded ? (isMobile ? '0.8rem' : '1rem') : (isMobile ? '0.6rem' : '0.8rem'),
          transition: 'padding 0.3s ease'
        }}
      >
        {/* Efectos de fondo animados */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(90deg, transparent 0%, rgba(0, 255, 255, 0.1) 50%, transparent 100%)',
          animation: 'slide 3s ease-in-out infinite alternate',
          pointerEvents: 'none'
        }} />
        
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: isMobile ? '0.5rem' : '1rem',
          flexWrap: 'wrap',
          position: 'relative',
          zIndex: 1,
          padding: isMobile ? '0 0.5rem' : '0 1rem'
        }}>
          {/* Contenido principal */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: isMobile ? '0.5rem' : '1rem',
            flex: 1,
            minWidth: 0 // Para permitir que el texto se contraiga
          }}>
            {/* Icono animado */}
            <div style={{
              fontSize: isMobile ? '1.2rem' : '1.5rem',
              animation: 'pulse 2s ease-in-out infinite',
              filter: 'drop-shadow(0 0 10px rgba(255, 107, 107, 0.5))',
              flexShrink: 0
            }}>
              ⚠️
            </div>

            {/* Texto principal */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.2rem',
              minWidth: 0,
              flex: 1
            }}>
              <div style={{
                color: '#ffffff',
                fontWeight: 'bold',
                fontSize: isMobile ? '0.85rem' : '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                flexWrap: 'wrap'
              }}>
                <span>TESTNET DEMO</span>
                <span style={{
                  background: 'linear-gradient(135deg, #ff6b6b, #4ecdc4)',
                  color: '#000000',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '12px',
                  fontSize: isMobile ? '0.6rem' : '0.7rem',
                  fontWeight: 'bold',
                  animation: 'glow 2s ease-in-out infinite alternate',
                  whiteSpace: 'nowrap'
                }}>
                  NOT REAL
                </span>
              </div>
              
              {/* Descripción expandible */}
              <AnimatePresence>
                {isExpanded ? (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{
                      color: '#b0b0b0',
                      fontSize: isMobile ? '0.75rem' : '0.85rem',
                      lineHeight: '1.4',
                      marginTop: '0.5rem'
                    }}
                  >
                    <div style={{ marginBottom: '0.5rem' }}>
                      <strong>⚠️ IMPORTANTE - ESTO ES UN DEMO:</strong>
                    </div>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: '0.8rem',
                      marginBottom: '0.8rem'
                    }}>
                      <div>
                        <strong style={{ color: '#ff6b6b' }}>🚫 NO ES REAL:</strong><br />
                        <span style={{ fontSize: isMobile ? '0.7rem' : '0.8rem' }}>
                          Las transacciones son solo de prueba en Base Sepolia
                        </span>
                      </div>
                      <div>
                        <strong style={{ color: '#4ecdc4' }}>🔗 TESTNET:</strong><br />
                        <span style={{ fontSize: isMobile ? '0.7rem' : '0.8rem' }}>
                          Red de prueba - no uses fondos reales
                        </span>
                      </div>
                      <div>
                        <strong style={{ color: '#45b7d1' }}>🎫 DEMO GRATUITO:</strong><br />
                        <span style={{ fontSize: isMobile ? '0.7rem' : '0.8rem' }}>
                          Experimenta sin riesgo - perfecto para aprender
                        </span>
                      </div>
                    </div>
                    
                    <div style={{
                      background: 'rgba(255, 107, 107, 0.1)',
                      borderRadius: '8px',
                      padding: isMobile ? '0.6rem' : '0.8rem',
                      border: '1px solid rgba(255, 107, 107, 0.2)'
                    }}>
                      <div style={{ marginBottom: '0.5rem' }}>
                        <strong style={{ color: '#ff6b6b' }}>🚨 RECUERDA:</strong>
                      </div>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                        gap: isMobile ? '0.5rem' : '1rem',
                        fontSize: isMobile ? '0.7rem' : '0.8rem',
                        textAlign: isMobile ? 'left' : 'center'
                      }}>
                        <div>
                          <div style={{ color: '#ff6b6b' }}>💰 Sin Dinero Real</div>
                          <div>Todas las transacciones son simuladas</div>
                        </div>
                        <div>
                          <div style={{ color: '#4ecdc4' }}>🔗 Base Sepolia</div>
                          <div>Red de prueba para desarrollo</div>
                        </div>
                        <div>
                          <div style={{ color: '#45b7d1' }}>🎓 Para Aprender</div>
                          <div>Experimenta sin riesgo</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      color: '#b0b0b0',
                      fontSize: isMobile ? '0.75rem' : '0.85rem'
                    }}
                  >
                    {isMobile ? 'Demo en Base Sepolia - No es real' : 'Demo en Base Sepolia • Las transacciones no son reales • Perfecto para aprender'}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Botones de acción */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: isMobile ? '0.4rem' : '0.8rem',
            flexShrink: 0,
            flexWrap: 'wrap'
          }}>
            {/* Botón de expandir/contraer */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                padding: isMobile ? '0.4rem 0.6rem' : '0.5rem 0.8rem',
                color: '#ffffff',
                cursor: 'pointer',
                fontSize: isMobile ? '0.7rem' : '0.8rem',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {isExpanded ? (isMobile ? '🔼' : '🔼 Menos') : (isMobile ? '🔽' : '🔽 Más')}
            </button>

            {/* Enlace a documentación - Solo en desktop */}
            {!isMobile && (
              <a
                href="https://docs.base.org/get-started/base"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'linear-gradient(135deg, #4ecdc4, #45b7d1)',
                  color: '#000000',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.5rem 0.8rem',
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)'
                  e.currentTarget.style.boxShadow = '0 5px 15px rgba(78, 205, 196, 0.4)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                📚 Docs Base
              </a>
            )}

            {/* Botón de cerrar */}
            <button
              onClick={() => setIsVisible(false)}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                width: isMobile ? '26px' : '30px',
                height: isMobile ? '26px' : '30px',
                color: '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: isMobile ? '0.8rem' : '0.9rem',
                transition: 'all 0.3s ease',
                flexShrink: 0
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 107, 107, 0.2)'
                e.currentTarget.style.borderColor = '#ff6b6b'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* CSS Animations */}
        <style>{`
          @keyframes slide {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }
          
          @keyframes glow {
            0% { box-shadow: 0 0 5px rgba(0, 255, 0, 0.5); }
            100% { box-shadow: 0 0 20px rgba(0, 255, 255, 0.8); }
          }
        `}</style>
      </motion.div>
    </AnimatePresence>
  )
}