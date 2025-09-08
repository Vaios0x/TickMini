'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { ConnectButton } from '@/components/ui/connect-button'
import './navbar.css'

// Import simple connect button that works immediately
const ConnectButtonSimple = dynamic(
  () => import('@/components/ui/connect-button-simple').then((mod) => ({ default: mod.ConnectButtonSimple })),
  {
    ssr: false,
            loading: () => (
          <button
            disabled
            style={{
              background: 'linear-gradient(135deg, rgba(20, 0, 25, 0.95), rgba(40, 0, 50, 0.98))',
              border: '2px solid #6600ff',
              color: '#ffffff',
              padding: '0.9rem 1.8rem',
              borderRadius: '30px',
              fontSize: '1rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              backdropFilter: 'blur(15px)',
              cursor: 'not-allowed',
              opacity: 0.7
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>🔑</span>
            <span>Cargando...</span>
          </button>
        ),
  }
)

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      // Si cambia a desktop, cerrar el menú mobile
      if (!mobile && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }

    // Set initial state
    handleResize()
    
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [isMobileMenuOpen])

  // Prevenir scroll del body cuando el menú mobile está abierto
  useEffect(() => {
    if (isMobileMenuOpen && isMobile) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
      document.body.classList.remove('menu-transitioning')
    }
  }, [isMobileMenuOpen, isMobile])

  // Función para cerrar el menú mobile
  const closeMobileMenu = () => {
    // Agregar clase para prevenir animaciones durante la transición
    document.body.classList.add('menu-transitioning')
    setIsMobileMenuOpen(false)
    
    // Remover la clase después de que la transición termine
    setTimeout(() => {
      document.body.classList.remove('menu-transitioning')
    }, 300)
  }

  // Función para abrir el menú mobile
  const openMobileMenu = () => {
    // Agregar clase para prevenir animaciones durante la transición
    document.body.classList.add('menu-transitioning')
    setIsMobileMenuOpen(true)
    
    // Remover la clase después de que la transición termine
    setTimeout(() => {
      document.body.classList.remove('menu-transitioning')
    }, 300)
  }

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: isScrolled 
          ? 'rgba(0, 0, 0, 0.95)' 
          : 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(25px)',
        borderBottom: isScrolled 
          ? '1px solid rgba(0, 255, 255, 0.3)' 
          : '1px solid rgba(255, 255, 255, 0.1)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 1.5rem',
        boxShadow: isScrolled 
          ? '0 8px 32px rgba(0, 255, 255, 0.15)' 
          : '0 4px 20px rgba(0, 0, 0, 0.1)'
      }}>
        {/* Efecto de brillo superior con animación */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, #00ffff, #ff00ff, #ffff00, #00ff00, #ff0080, #8000ff)',
          opacity: isScrolled ? 0.8 : 0.5
        }} className="navbar-gradient" />

        {/* Logo con efectos premium */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginRight: 'auto',
          position: 'relative',
          zIndex: 1001
        }}>
          {/* Logo con glow y animación */}
          <div style={{
            fontSize: '2rem',
            filter: 'drop-shadow(0 0 20px rgba(0, 255, 255, 0.6))',
            position: 'relative'
          }}>
            🎫
            {/* Efecto de partículas alrededor del logo */}
            <div style={{
              position: 'absolute',
              top: '-10px',
              left: '-10px',
              right: '-10px',
              bottom: '-10px',
              background: 'radial-gradient(circle, rgba(0, 255, 255, 0.1) 0%, transparent 70%)',
              borderRadius: '50%',
              opacity: 0.6
            }} />
          </div>
          
          {/* Texto del logo con efectos */}
          <Link href="/" style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#00ffff',
            textDecoration: 'none',
            textShadow: '0 0 25px rgba(0, 255, 255, 0.8)',
            position: 'relative',
            transition: 'all 0.3s ease'
          }}>
            TickBase
            {/* Efecto de brillo en el texto */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.3), transparent)',
              opacity: 0.3,
              borderRadius: '4px'
            }} />
          </Link>
        </div>

        {/* Navegación principal con glassmorphism - Solo visible en desktop */}
        {!isMobile && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginRight: '2rem',
            background: 'rgba(255, 255, 255, 0.03)',
            padding: '0.5rem',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)'
          }} className="desktop-nav">
            <Link href="/" style={{
              color: '#ffffff',
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              padding: '0.75rem 1.2rem',
              borderRadius: '15px',
              border: '1px solid transparent',
              position: 'relative',
              overflow: 'hidden'
            }} className="nav-link">
              <span style={{ position: 'relative', zIndex: 1 }}>Inicio</span>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.1), rgba(255, 0, 255, 0.1))',
                opacity: 0,
                transition: 'opacity 0.3s ease'
              }} />
            </Link>
            
            <Link href="/events" style={{
              color: '#ffffff',
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              padding: '0.75rem 1.2rem',
              borderRadius: '15px',
              border: '1px solid transparent',
              position: 'relative',
              overflow: 'hidden'
            }} className="nav-link">
              <span style={{ position: 'relative', zIndex: 1 }}>Eventos</span>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.1), rgba(255, 0, 255, 0.1))',
                opacity: 0,
                transition: 'opacity 0.3s ease'
              }} />
            </Link>
            
            <Link href="/create-event" style={{
              color: '#ffffff',
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              padding: '0.75rem 1.2rem',
              borderRadius: '15px',
              border: '1px solid transparent',
              position: 'relative',
              overflow: 'hidden'
            }} className="nav-link">
              <span style={{ position: 'relative', zIndex: 1 }}>Crear Evento</span>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.1), rgba(255, 0, 255, 0.1))',
                opacity: 0,
                transition: 'opacity 0.3s ease'
              }} />
            </Link>
            
            <Link href="/verify-ticket" style={{
              color: '#ffffff',
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              padding: '0.75rem 1.2rem',
              borderRadius: '15px',
              border: '1px solid transparent',
              position: 'relative',
              overflow: 'hidden'
            }} className="nav-link">
              <span style={{ position: 'relative', zIndex: 1 }}>Verificar Ticket</span>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.1), rgba(255, 0, 255, 0.1))',
                opacity: 0,
                transition: 'opacity 0.3s ease'
              }} />
            </Link>
            
            
            <Link href="/my-tickets" style={{
              color: '#ffffff',
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              padding: '0.75rem 1.2rem',
              borderRadius: '15px',
              border: '1px solid transparent',
              position: 'relative',
              overflow: 'hidden'
            }} className="nav-link">
              <span style={{ position: 'relative', zIndex: 1 }}>Mis Tickets</span>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.1), rgba(255, 0, 255, 0.1))',
                opacity: 0,
                transition: 'opacity 0.3s ease'
              }} />
            </Link>
            
            <Link href="/marketplace" style={{
              color: '#ffffff',
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              padding: '0.75rem 1.2rem',
              borderRadius: '15px',
              border: '1px solid transparent',
              position: 'relative',
              overflow: 'hidden'
            }} className="nav-link">
              <span style={{ position: 'relative', zIndex: 1 }}>🏪 Marketplace</span>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 165, 0, 0.1))',
                opacity: 0,
                transition: 'opacity 0.3s ease'
              }} />
            </Link>
            
            <Link href="/about"
              style={{
                color: '#ffffff',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                padding: '0.75rem 1.2rem',
                borderRadius: '15px',
                border: '1px solid transparent',
                position: 'relative',
                overflow: 'hidden',
                background: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit'
              }} className="nav-link">
              <span style={{ position: 'relative', zIndex: 1 }}>Nosotros</span>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.1), rgba(255, 0, 255, 0.1))',
                opacity: 0,
                transition: 'opacity 0.3s ease'
              }} />
            </Link>
            
            <Link href="/compliance-demo" style={{
              color: '#ffffff',
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              padding: '0.75rem 1.2rem',
              borderRadius: '15px',
              border: '1px solid rgba(0, 255, 100, 0.3)',
              position: 'relative',
              overflow: 'hidden',
              background: 'linear-gradient(135deg, rgba(0, 255, 100, 0.1), rgba(0, 200, 255, 0.1))',
              boxShadow: '0 0 10px rgba(0, 255, 100, 0.2)'
            }} className="nav-link">
              <span style={{ position: 'relative', zIndex: 1 }}>🇲🇽 Compliance</span>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, rgba(0, 255, 100, 0.2), rgba(0, 200, 255, 0.2))',
                opacity: 0,
                transition: 'opacity 0.3s ease'
              }} />
            </Link>
            
            <Link href="/contact" style={{
              color: '#ffffff',
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              padding: '0.75rem 1.2rem',
              borderRadius: '15px',
              border: '1px solid transparent',
              position: 'relative',
              overflow: 'hidden'
            }} className="nav-link">
              <span style={{ position: 'relative', zIndex: 1 }}>Contacto</span>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.1), rgba(255, 0, 255, 0.1))',
                opacity: 0,
                transition: 'opacity 0.3s ease'
              }} />
            </Link>
          </div>
        )}

        {/* Botón Conectar Wallet - Solo visible en desktop */}
        {!isMobile && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            position: 'relative'
          }} className="desktop-wallet">
            <ConnectButtonSimple />
            
            {/* Efecto de partículas flotantes */}
            <div style={{
              position: 'absolute',
              top: '-20px',
              right: '-20px',
              width: '40px',
              height: '40px',
              background: 'radial-gradient(circle, rgba(102, 0, 255, 0.2) 0%, transparent 70%)',
              borderRadius: '50%',
              opacity: 0.4,
              pointerEvents: 'none'
            }} />
          </div>
        )}

        {/* Botón del menú mobile - Solo visible en mobile */}
        {isMobile && (
          <button
            onClick={() => isMobileMenuOpen ? closeMobileMenu() : openMobileMenu()}
            style={{
              display: 'flex',
              background: 'rgba(0, 255, 255, 0.1)',
              border: '2px solid rgba(0, 255, 255, 0.3)',
              color: '#00ffff',
              fontSize: '1.8rem',
              cursor: 'pointer',
              padding: '0.8rem',
              borderRadius: '15px',
              backdropFilter: 'blur(15px)',
              transition: 'all 0.3s ease',
              alignItems: 'center',
              justifyContent: 'center',
              width: '50px',
              height: '50px',
              marginRight: '0.5rem',
              position: 'relative',
              boxShadow: '0 4px 20px rgba(0, 255, 255, 0.3)',
              zIndex: 1002
            }} className="mobile-menu-btn"
            aria-label="Abrir menú de navegación"
          >
            <span style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
              lineHeight: 1,
              filter: 'drop-shadow(0 0 8px rgba(0, 255, 255, 0.6))'
            }}>
              {isMobileMenuOpen ? '✕' : '☰'}
            </span>
          </button>
        )}
      </nav>

      {/* Menú mobile overlay - Separado del navbar para mejor control */}
      {isMobileMenuOpen && isMobile && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.98)',
          backdropFilter: 'blur(30px)',
          zIndex: 998,
          display: 'flex',
          flexDirection: 'column',
          paddingTop: '80px',
          animation: 'slideIn 0.3s ease-out'
        }} className="mobile-menu-overlay">
          
          {/* Contenido del menú mobile */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            padding: '2rem 1rem',
            overflowY: 'auto',
            gap: '1.5rem'
          }} className="mobile-menu-content">
            
            {/* Header del menú mobile */}
            <div style={{
              textAlign: 'center',
              marginBottom: '2rem',
              paddingBottom: '1.5rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <h2 style={{
                color: '#00ffff',
                fontSize: '1.8rem',
                fontWeight: 'bold',
                textShadow: '0 0 20px rgba(0, 255, 255, 0.6)',
                margin: 0,
                wordBreak: 'break-word'
              }}>
                Menú de Navegación
              </h2>
            </div>

            {/* Enlaces de navegación mobile */}
            <Link href="/" style={{
              color: '#ffffff',
              textDecoration: 'none',
              fontSize: '1.3rem',
              fontWeight: '500',
              padding: '1.5rem 2rem',
              borderRadius: '25px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              transition: 'all 0.3s ease',
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(15px)',
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
              minHeight: '70px'
            }} className="nav-link mobile-nav-link" onClick={closeMobileMenu}>
              <span style={{ fontSize: '2rem' }}>🏠</span>
              <span>Inicio</span>
            </Link>
            
            
            <Link href="/create-event" style={{
              color: '#ffffff',
              textDecoration: 'none',
              fontSize: '1.3rem',
              fontWeight: '500',
              padding: '1.5rem 2rem',
              borderRadius: '25px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              transition: 'all 0.3s ease',
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(15px)',
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
              minHeight: '70px'
            }} className="nav-link mobile-nav-link" onClick={closeMobileMenu}>
              <span style={{ fontSize: '2rem' }}>🚀</span>
              <span>Crear Evento</span>
            </Link>
            
            <Link href="/events" style={{
              color: '#ffffff',
              textDecoration: 'none',
              fontSize: '1.3rem',
              fontWeight: '500',
              padding: '1.5rem 2rem',
              borderRadius: '25px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              transition: 'all 0.3s ease',
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(15px)',
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
              minHeight: '70px'
            }} className="nav-link mobile-nav-link" onClick={closeMobileMenu}>
              <span style={{ fontSize: '2rem' }}>🎫</span>
              <span>Eventos</span>
            </Link>
            
            <Link href="/verify-ticket" style={{
              color: '#ffffff',
              textDecoration: 'none',
              fontSize: '1.3rem',
              fontWeight: '500',
              padding: '1.5rem 2rem',
              borderRadius: '25px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              transition: 'all 0.3s ease',
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(15px)',
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
              minHeight: '70px'
            }} className="nav-link mobile-nav-link" onClick={closeMobileMenu}>
              <span style={{ fontSize: '2rem' }}>🔍</span>
              <span>Verificar Ticket</span>
            </Link>
            
            <Link href="/my-tickets" style={{
              color: '#ffffff',
              textDecoration: 'none',
              fontSize: '1.3rem',
              fontWeight: '500',
              padding: '1.5rem 2rem',
              borderRadius: '25px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              transition: 'all 0.3s ease',
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(15px)',
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
              minHeight: '70px'
            }} className="nav-link mobile-nav-link" onClick={closeMobileMenu}>
              <span style={{ fontSize: '2rem' }}>🎫</span>
              <span>Mis Tickets</span>
            </Link>
            
            <Link href="/marketplace" style={{
              color: '#ffffff',
              textDecoration: 'none',
              fontSize: '1.3rem',
              fontWeight: '500',
              padding: '1.5rem 2rem',
              borderRadius: '25px',
              border: '1px solid rgba(255, 215, 0, 0.2)',
              transition: 'all 0.3s ease',
              background: 'rgba(255, 215, 0, 0.05)',
              backdropFilter: 'blur(15px)',
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              boxShadow: '0 4px 20px rgba(255, 215, 0, 0.2)',
              minHeight: '70px'
            }} className="nav-link mobile-nav-link" onClick={closeMobileMenu}>
              <span style={{ fontSize: '2rem' }}>🏪</span>
              <span>Marketplace</span>
            </Link>
            
            <Link href="/compliance-demo" style={{
              color: '#ffffff',
              textDecoration: 'none',
              fontSize: '1.3rem',
              fontWeight: '500',
              padding: '1.5rem 2rem',
              borderRadius: '25px',
              border: '1px solid rgba(0, 255, 100, 0.3)',
              transition: 'all 0.3s ease',
              background: 'rgba(0, 255, 100, 0.05)',
              backdropFilter: 'blur(15px)',
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              boxShadow: '0 4px 20px rgba(0, 255, 100, 0.2)',
              minHeight: '70px'
            }} className="nav-link mobile-nav-link" onClick={closeMobileMenu}>
              <span style={{ fontSize: '2rem' }}>🇲🇽</span>
              <span>Compliance</span>
            </Link>
            
            <Link href="/about"
              onClick={closeMobileMenu}
              style={{
                color: '#ffffff',
                textDecoration: 'none',
                fontSize: '1.3rem',
                fontWeight: '500',
                padding: '1.5rem 2rem',
                borderRadius: '25px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.3s ease',
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(15px)',
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
                minHeight: '70px',
                cursor: 'pointer',
                fontFamily: 'inherit',
                width: '100%'
              }} className="nav-link mobile-nav-link">
              <span style={{ fontSize: '2rem' }}>ℹ️</span>
              <span>Nosotros</span>
            </Link>
            
            <Link href="/contact" style={{
              color: '#ffffff',
              textDecoration: 'none',
              fontSize: '1.3rem',
              fontWeight: '500',
              padding: '1.5rem 2rem',
              borderRadius: '25px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              transition: 'all 0.3s ease',
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(15px)',
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
              minHeight: '70px'
            }} className="nav-link mobile-nav-link" onClick={closeMobileMenu}>
              <span style={{ fontSize: '2rem' }}>📞</span>
              <span>Contacto</span>
            </Link>
            
            {/* Botón mobile de wallet */}
            <div style={{
              marginTop: 'auto',
              paddingTop: '2rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{ width: '100%' }}>
                <ConnectButton onConnect={closeMobileMenu} />
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  )
}
