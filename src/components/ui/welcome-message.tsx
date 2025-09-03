'use client'

import React from 'react'

interface WelcomeMessageProps {
  onStartVerification: () => void
}

export function WelcomeMessage({ onStartVerification }: WelcomeMessageProps) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.08) 0%, rgba(255, 0, 255, 0.08) 100%)',
      borderRadius: '25px',
      padding: '3rem 2rem',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      textAlign: 'center',
      marginTop: '2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Glow Effects */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '200%',
        background: 'radial-gradient(circle, rgba(0, 255, 255, 0.1) 0%, transparent 70%)',
        animation: 'pulse 4s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-50%',
        right: '-50%',
        width: '200%',
        height: '200%',
        background: 'radial-gradient(circle, rgba(255, 0, 255, 0.1) 0%, transparent 70%)',
        animation: 'pulse 4s ease-in-out infinite reverse'
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          fontSize: '5rem',
          marginBottom: '1.5rem',
          filter: 'drop-shadow(0 0 30px rgba(0, 255, 255, 0.6))',
          animation: 'float 3s ease-in-out infinite'
        }}>
          🎫
        </div>
        
        <h2 style={{
          color: '#00ffff',
          fontSize: '2.5rem',
          marginBottom: '1rem',
          fontWeight: 'bold',
          textShadow: '0 0 20px rgba(0, 255, 255, 0.5)'
        }}>
          ¡Bienvenido a TickBase!
        </h2>
        
        <p style={{
          color: '#e0e0e0',
          fontSize: '1.2rem',
          marginBottom: '2rem',
          lineHeight: '1.6',
          maxWidth: '600px',
          margin: '0 auto 2rem auto'
        }}>
          Tu plataforma de verificación de tickets NFT en Base Network. 
          Comienza verificando tu primer ticket para experimentar la potencia de la blockchain.
        </p>

        {/* Feature Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2.5rem',
          maxWidth: '800px',
          margin: '0 auto 2.5rem auto'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '15px',
            padding: '1.5rem',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{
              fontSize: '2.5rem',
              marginBottom: '1rem',
              filter: 'drop-shadow(0 0 15px rgba(0, 255, 255, 0.5))'
            }}>
              🔍
            </div>
            <h3 style={{
              color: '#00ffff',
              fontSize: '1.1rem',
              marginBottom: '0.5rem',
              fontWeight: '600'
            }}>
              Verificación Instantánea
            </h3>
            <p style={{
              color: '#b0b0b0',
              fontSize: '0.9rem',
              lineHeight: '1.4'
            }}>
              Verifica tickets NFT en segundos con tecnología blockchain
            </p>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '15px',
            padding: '1.5rem',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{
              fontSize: '2.5rem',
              marginBottom: '1rem',
              filter: 'drop-shadow(0 0 15px rgba(255, 0, 255, 0.5))'
            }}>
              📱
            </div>
            <h3 style={{
              color: '#ff00ff',
              fontSize: '1.1rem',
              marginBottom: '0.5rem',
              fontWeight: '600'
            }}>
              Escáner QR
            </h3>
            <p style={{
              color: '#b0b0b0',
              fontSize: '0.9rem',
              lineHeight: '1.4'
            }}>
              Escanea códigos QR directamente desde tu dispositivo
            </p>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '15px',
            padding: '1.5rem',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{
              fontSize: '2.5rem',
              marginBottom: '1rem',
              filter: 'drop-shadow(0 0 15px rgba(0, 255, 0, 0.5))'
            }}>
              🔗
            </div>
            <h3 style={{
              color: '#00ff00',
              fontSize: '1.1rem',
              marginBottom: '0.5rem',
              fontWeight: '600'
            }}>
              Base Network
            </h3>
            <p style={{
              color: '#b0b0b0',
              fontSize: '0.9rem',
              lineHeight: '1.4'
            }}>
              Construido sobre la L2 de Coinbase para máxima eficiencia
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={onStartVerification}
          style={{
            background: 'linear-gradient(135deg, #00ffff 0%, #ff00ff 100%)',
            color: '#000000',
            border: 'none',
            padding: '1.2rem 2.5rem',
            borderRadius: '20px',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 10px 30px rgba(0, 255, 255, 0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.8rem',
            margin: '0 auto',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)'
            e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 255, 255, 0.6)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)'
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 255, 255, 0.4)'
          }}
        >
          🚀 Comenzar Verificación
        </button>

        {/* Additional Info */}
        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          background: 'rgba(0, 255, 255, 0.05)',
          borderRadius: '15px',
          border: '1px solid rgba(0, 255, 255, 0.2)',
          maxWidth: '600px',
          margin: '2rem auto 0 auto'
        }}>
          <h4 style={{
            color: '#00ffff',
            fontSize: '1.1rem',
            marginBottom: '1rem',
            fontWeight: '600'
          }}>
            💡 ¿Cómo funciona?
          </h4>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '1rem',
            textAlign: 'left'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{
                background: '#00ffff',
                color: '#000000',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.8rem',
                fontWeight: 'bold'
              }}>
                1
              </span>
              <span style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>
                Ingresa el ID del ticket
              </span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{
                background: '#ff00ff',
                color: '#000000',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.8rem',
                fontWeight: 'bold'
              }}>
                2
              </span>
              <span style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>
                Verificación en blockchain
              </span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{
                background: '#00ff00',
                color: '#000000',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.8rem',
                fontWeight: 'bold'
              }}>
                3
              </span>
              <span style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>
                Resultado instantáneo
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { 
            opacity: 0.3;
            transform: scale(1);
          }
          50% { 
            opacity: 0.6;
            transform: scale(1.1);
          }
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px);
          }
          50% { 
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  )
}
