'use client'

import * as React from 'react'

interface ClientAgnosticContentProps {
  children: React.ReactNode
  shareText?: string
  onShare?: () => void
  onOpenUrl?: (url: string) => void
}

export function ClientAgnosticContent({ 
  children, 
  shareText = "Compartir en Feed",
  onShare,
  onOpenUrl 
}: ClientAgnosticContentProps) {
  
  // URLs genéricas - no específicas de cliente
  const genericUrls = {
    base: 'https://base.org',
    twitter: 'https://twitter.com',
    discord: 'https://discord.gg',
    documentation: 'https://docs.base.org',
    support: 'https://support.base.org'
  }

  // Texto neutral - no menciona clientes específicos
  const neutralText = {
    share: shareText,
    open: "Abrir enlace",
    connect: "Conectar",
    explore: "Explorar",
    learn: "Aprender más",
    support: "Soporte"
  }

  const handleShare = () => {
    if (onShare) {
      onShare()
    } else {
      // Fallback para compartir
      if (navigator.share) {
        navigator.share({
          title: 'TickMini',
          text: 'Descubre eventos increíbles con tickets NFT en Base Network',
          url: window.location.href
        })
      } else {
        // Fallback para copiar al portapapeles
        navigator.clipboard.writeText(window.location.href)
        alert('Enlace copiado al portapapeles')
      }
    }
  }

  const handleOpenUrl = (url: string) => {
    if (onOpenUrl) {
      onOpenUrl(url)
    } else {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div style={{
      background: 'rgba(0, 255, 255, 0.05)',
      border: '2px solid rgba(0, 255, 255, 0.3)',
      borderRadius: 'clamp(12px, 3vw, 20px)',
      padding: 'clamp(1.5rem, 3vw, 2.5rem)',
      marginBottom: 'clamp(1rem, 2vw, 1.5rem)'
    }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
        paddingBottom: 'clamp(1rem, 2vw, 1.5rem)',
        borderBottom: '2px solid rgba(0, 255, 255, 0.2)'
      }}>
        <h3 style={{
          color: '#00ffff',
          fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
          fontWeight: '700',
          margin: '0 0 clamp(0.5rem, 1vw, 0.8rem) 0',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          🌐 Client-Agnostic Content
        </h3>
        <p style={{
          color: '#b0b0b0',
          fontSize: 'clamp(0.9rem, 2.2vw, 1.1rem)',
          margin: 0,
          lineHeight: 1.5
        }}>
          Lenguaje neutral y URLs genéricas - Compatible con cualquier cliente
        </p>
      </div>

      {/* Content */}
      <div style={{
        marginBottom: 'clamp(1.5rem, 3vw, 2rem)'
      }}>
        {children}
      </div>

      {/* Action Buttons */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(0.8rem, 2vw, 1.2rem)',
        marginBottom: 'clamp(1.5rem, 3vw, 2rem)'
      }}>
        {/* Share Button */}
        <button
          onClick={handleShare}
          style={{
            width: '100%',
            padding: 'clamp(1rem, 2.5vw, 1.5rem)',
            background: 'linear-gradient(135deg, #00ffff, #0080ff)',
            border: 'none',
            borderRadius: 'clamp(8px, 2vw, 12px)',
            color: '#000000',
            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(0.5rem, 1.2vw, 0.8rem)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 255, 255, 0.4)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          📤 {neutralText.share}
        </button>

        {/* External Links */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 'clamp(0.8rem, 2vw, 1.2rem)'
        }}>
          <button
            onClick={() => handleOpenUrl(genericUrls.base)}
            style={{
              padding: 'clamp(0.8rem, 2vw, 1.2rem)',
              background: 'rgba(0, 255, 255, 0.1)',
              border: '2px solid rgba(0, 255, 255, 0.3)',
              borderRadius: 'clamp(6px, 1.5vw, 8px)',
              color: '#00ffff',
              fontSize: 'clamp(0.9rem, 2.2vw, 1.1rem)',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'clamp(0.4rem, 1vw, 0.6rem)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0, 255, 255, 0.2)'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(0, 255, 255, 0.1)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            🔗 {neutralText.open} Base
          </button>

          <button
            onClick={() => handleOpenUrl(genericUrls.documentation)}
            style={{
              padding: 'clamp(0.8rem, 2vw, 1.2rem)',
              background: 'rgba(255, 0, 255, 0.1)',
              border: '2px solid rgba(255, 0, 255, 0.3)',
              borderRadius: 'clamp(6px, 1.5vw, 8px)',
              color: '#ff00ff',
              fontSize: 'clamp(0.9rem, 2.2vw, 1.1rem)',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'clamp(0.4rem, 1vw, 0.6rem)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 0, 255, 0.2)'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 0, 255, 0.1)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            📚 {neutralText.learn}
          </button>
        </div>
      </div>

      {/* Guidelines */}
      <div style={{
        background: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 'clamp(8px, 2vw, 12px)',
        padding: 'clamp(1rem, 2.5vw, 1.5rem)',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <h4 style={{
          color: '#00ffff',
          fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
          fontWeight: '600',
          margin: '0 0 clamp(0.8rem, 2vw, 1.2rem) 0',
          textAlign: 'center'
        }}>
          ✅ Directrices Client-Agnostic
        </h4>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 'clamp(0.8rem, 2vw, 1.2rem)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(0.5rem, 1.2vw, 0.8rem)',
            padding: 'clamp(0.6rem, 1.5vw, 0.8rem)',
            background: 'rgba(0, 255, 0, 0.1)',
            borderRadius: 'clamp(4px, 1vw, 6px)',
            border: '1px solid rgba(0, 255, 0, 0.3)'
          }}>
            <span style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)' }}>🚫</span>
            <span style={{
              color: '#00ff00',
              fontSize: 'clamp(0.8rem, 2vw, 1rem)',
              fontWeight: '500'
            }}>
              Sin URLs específicas de cliente
            </span>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(0.5rem, 1.2vw, 0.8rem)',
            padding: 'clamp(0.6rem, 1.5vw, 0.8rem)',
            background: 'rgba(0, 255, 0, 0.1)',
            borderRadius: 'clamp(4px, 1vw, 6px)',
            border: '1px solid rgba(0, 255, 0, 0.3)'
          }}>
            <span style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)' }}>💬</span>
            <span style={{
              color: '#00ff00',
              fontSize: 'clamp(0.8rem, 2vw, 1rem)',
              fontWeight: '500'
            }}>
              Lenguaje neutral en UI
            </span>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(0.5rem, 1.2vw, 0.8rem)',
            padding: 'clamp(0.6rem, 1.5vw, 0.8rem)',
            background: 'rgba(0, 255, 0, 0.1)',
            borderRadius: 'clamp(4px, 1vw, 6px)',
            border: '1px solid rgba(0, 255, 0, 0.3)'
          }}>
            <span style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)' }}>🔗</span>
            <span style={{
              color: '#00ff00',
              fontSize: 'clamp(0.8rem, 2vw, 1rem)',
              fontWeight: '500'
            }}>
              Sin deeplinks a otros clientes
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
