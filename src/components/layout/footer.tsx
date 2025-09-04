'use client'

import Link from 'next/link'

export function Footer() {
  return (
    <footer style={{
      background: 'rgba(0, 0, 0, 0.9)',
      backdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Efecto de brillo inferior */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'linear-gradient(90deg, #00ffff, #ff00ff, #ffff00, #00ff00)',
        backgroundSize: '200% 100%'
      }} className="gradient-shift-fast" />
      
      {/* Efectos de fondo */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 20%, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(255, 0, 255, 0.1) 0%, transparent 50%)
        `,
        pointerEvents: 'none'
      }} />

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '4rem 2rem 2rem 2rem',
        position: 'relative',
        zIndex: 1
      }}>
        
        {/* Main Footer Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem'
        }}>
          
          {/* Brand Section */}
          <div>
            <div style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #00ffff, #ff00ff, #ffff00)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
              letterSpacing: '1px',
              marginBottom: '1rem'
            }} className="gradient-shift">
              TickBase
            </div>
            <p style={{
              color: '#b0b0b0',
              fontSize: '1rem',
              lineHeight: '1.6',
              marginBottom: '1.5rem'
            }}>
              Plataforma revolucionaria de venta y gestión de boletos NFT en Base Network. 
              El futuro del ticketing está aquí.
            </p>
            <div style={{
              display: 'flex',
              gap: '1rem'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }} className="social-icon">
                🐦
              </div>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }} className="social-icon">
                📘
              </div>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }} className="social-icon">
                💬
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{
              color: '#ffffff',
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '1.5rem',
              textShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
            }}>
              Enlaces Rápidos
            </h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
                             <Link href="/events" style={{
                 color: '#b0b0b0',
                 textDecoration: 'none',
                 transition: 'all 0.3s ease',
                 fontSize: '1rem'
               }} className="footer-link">
                 🎫 Eventos
               </Link>
               <Link href="/create-event" style={{
                 color: '#b0b0b0',
                 textDecoration: 'none',
                 transition: 'all 0.3s ease',
                 fontSize: '1rem'
               }} className="footer-link">
                 🚀 Crear Evento
               </Link>
              <Link href="/about" style={{
                color: '#b0b0b0',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                fontSize: '1rem'
              }} className="footer-link">
                ℹ️ Acerca de
              </Link>
              <Link href="/support" style={{
                color: '#b0b0b0',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                fontSize: '1rem'
              }} className="footer-link">
                🆘 Soporte
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 style={{
              color: '#ffffff',
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '1.5rem',
              textShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
            }}>
              Recursos
            </h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              <Link href="/docs" style={{
                color: '#b0b0b0',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                fontSize: '1rem'
              }} className="footer-link">
                📚 Documentación
              </Link>
              <Link href="/api" style={{
                color: '#b0b0b0',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                fontSize: '1rem'
              }} className="footer-link">
                🔌 API
              </Link>
              <Link href="/tutorials" style={{
                color: '#b0b0b0',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                fontSize: '1rem'
              }} className="footer-link">
                🎓 Tutoriales
              </Link>
              <Link href="/blog" style={{
                color: '#b0b0b0',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                fontSize: '1rem'
              }} className="footer-link">
                📝 Blog
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 style={{
              color: '#ffffff',
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '1.5rem',
              textShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
            }}>
              Contacto
            </h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              <div style={{
                color: '#b0b0b0',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                📧 hello@tickbase.xyz
              </div>
              <div style={{
                color: '#b0b0b0',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                🌐 tickbase.xyz
              </div>
              <div style={{
                color: '#b0b0b0',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                📍 Base Network
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '20px',
          padding: '2rem',
          marginBottom: '3rem',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{
            color: '#ffffff',
            fontSize: '1.5rem',
            fontWeight: '600',
            marginBottom: '1rem'
          }}>
            🚀 Mantente Actualizado
          </h3>
          <p style={{
            color: '#b0b0b0',
            fontSize: '1rem',
            marginBottom: '1.5rem'
          }}>
            Recibe las últimas noticias sobre eventos NFT y actualizaciones de la plataforma
          </p>
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <input 
              type="email" 
              placeholder="tu@email.com"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '25px',
                padding: '0.75rem 1.5rem',
                color: '#ffffff',
                fontSize: '1rem',
                minWidth: '300px',
                outline: 'none'
              }}
            />
            <button style={{
              background: 'linear-gradient(45deg, #00ffff, #ff00ff)',
              color: '#000000',
              border: 'none',
              padding: '0.75rem 2rem',
              borderRadius: '25px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)'
            }} className="btn-primary-neon">
              Suscribirse
            </button>
          </div>
        </div>

        {/* Bottom Section */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          paddingTop: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem'
        }}>
          
          {/* Made by Vai0sx */}
          <div style={{
            textAlign: 'center',
            marginBottom: '1rem'
          }}>
            <p style={{
              color: '#b0b0b0',
              fontSize: '1.1rem',
              marginBottom: '0.5rem'
            }}>
              Made with ❤️ by
            </p>
            <Link 
              href="https://t.me/Vai0sx" 
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#00ffff',
                textDecoration: 'none',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                textShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
                transition: 'all 0.3s ease',
                display: 'inline-block'
              }} 
              className="vai0sx-link"
            >
              Vai0sx
            </Link>
            <p style={{
              color: '#b0b0b0',
              fontSize: '0.9rem',
              marginTop: '0.5rem'
            }}>
              Blockchain & Web3 Developer
            </p>
          </div>

          {/* Copyright */}
          <div style={{
            color: '#808080',
            fontSize: '0.9rem',
            textAlign: 'center'
          }}>
                          © 2025 TickBase. Todos los derechos reservados. 
            Construido en Base Network con tecnología blockchain.
          </div>

          {/* Legal Links */}
          <div style={{
            display: 'flex',
            gap: '2rem',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <Link href="/privacy" style={{
              color: '#808080',
              textDecoration: 'none',
              fontSize: '0.9rem',
              transition: 'all 0.3s ease'
            }} className="footer-link">
              Privacidad
            </Link>
            <Link href="/terms" style={{
              color: '#808080',
              textDecoration: 'none',
              fontSize: '0.9rem',
              transition: 'all 0.3s ease'
            }} className="footer-link">
              Términos
            </Link>
            <Link href="/cookies" style={{
              color: '#808080',
              textDecoration: 'none',
              fontSize: '0.9rem',
              transition: 'all 0.3s ease'
            }} className="footer-link">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
