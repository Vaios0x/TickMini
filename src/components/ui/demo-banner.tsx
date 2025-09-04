'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DEMO_CONFIG, demoUtils } from '@/lib/demo-config'

export function DemoBanner() {
  const [isVisible, setIsVisible] = useState(false) // DESACTIVADO
  const [isExpanded, setIsExpanded] = useState(false)

  // Banner demo desactivado - usando contratos reales
  return null

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
          background: 'linear-gradient(135deg, #ff00ff20, #00ffff20, #ffff0020)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderTop: 'none',
          padding: isExpanded ? '1rem' : '0.8rem',
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
          gap: '1rem',
          flexWrap: 'wrap',
          position: 'relative',
          zIndex: 1
        }}>
          {/* Contenido principal */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            flex: 1
          }}>
            {/* Icono animado */}
            <div style={{
              fontSize: '1.5rem',
              animation: 'pulse 2s ease-in-out infinite',
              filter: 'drop-shadow(0 0 10px rgba(255, 0, 255, 0.5))'
            }}>
              🎭
            </div>

            {/* Texto principal */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.2rem'
            }}>
              <div style={{
                color: '#ffffff',
                fontWeight: 'bold',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span>MODO DEMO ACTIVO</span>
                <span style={{
                  background: 'linear-gradient(135deg, #00ff00, #00ffff)',
                  color: '#000000',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '12px',
                  fontSize: '0.7rem',
                  fontWeight: 'bold',
                  animation: 'glow 2s ease-in-out infinite alternate'
                }}>
                  GRATIS
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
                      fontSize: '0.85rem',
                      lineHeight: '1.4',
                      marginTop: '0.5rem'
                    }}
                  >
                    <div style={{ marginBottom: '0.5rem' }}>
                      <strong>🌟 Características del Demo:</strong>
                    </div>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: '0.8rem',
                      marginBottom: '0.8rem'
                    }}>
                      <div>
                        <strong style={{ color: '#00ffff' }}>✨ Transacciones Gratuitas:</strong><br />
                        <span style={{ fontSize: '0.8rem' }}>
                          Crear eventos, comprar tickets y verificar - todo patrocinado
                        </span>
                      </div>
                      <div>
                        <strong style={{ color: '#ff00ff' }}>🔗 Base Sepolia:</strong><br />
                        <span style={{ fontSize: '0.8rem' }}>
                          Red de prueba segura - sin riesgo de fondos reales
                        </span>
                      </div>
                      <div>
                        <strong style={{ color: '#ffff00' }}>🎫 NFTs Reales:</strong><br />
                        <span style={{ fontSize: '0.8rem' }}>
                          Experimenta con NFTs reales en blockchain
                        </span>
                      </div>
                    </div>
                    
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '8px',
                      padding: '0.8rem',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                      <div style={{ marginBottom: '0.5rem' }}>
                        <strong style={{ color: '#00ff00' }}>💡 Límites Demo Diarios:</strong>
                      </div>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '1rem',
                        fontSize: '0.8rem',
                        textAlign: 'center'
                      }}>
                        <div>
                          <div style={{ color: '#00ffff' }}>🎪 Eventos</div>
                          <div>{demoUtils.getDailyLimit('create_event')} por día</div>
                        </div>
                        <div>
                          <div style={{ color: '#ff00ff' }}>🎫 Tickets</div>
                          <div>{demoUtils.getDailyLimit('buy_ticket')} por día</div>
                        </div>
                        <div>
                          <div style={{ color: '#ffff00' }}>🔍 Verificaciones</div>
                          <div>{demoUtils.getDailyLimit('verify_ticket')} por día</div>
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
                      fontSize: '0.85rem'
                    }}
                  >
                    Transacciones gratuitas en Base Sepolia • Perfecto para aprender blockchain
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Botones de acción */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.8rem',
            flexShrink: 0
          }}>
            {/* Botón de expandir/contraer */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                padding: '0.5rem 0.8rem',
                color: '#ffffff',
                cursor: 'pointer',
                fontSize: '0.8rem',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
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
              {isExpanded ? '🔼 Menos Info' : '🔽 Más Info'}
            </button>

            {/* Enlace a documentación */}
            <a
              href="https://docs.base.org/using-base/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'linear-gradient(135deg, #00ffff, #ff00ff)',
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
                e.currentTarget.style.boxShadow = '0 5px 15px rgba(0, 255, 255, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              📚 Docs Base
            </a>

            {/* Botón de cerrar */}
            <button
              onClick={() => setIsVisible(false)}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                color: '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.9rem',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 0, 0, 0.2)'
                e.currentTarget.style.borderColor = '#ff4444'
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