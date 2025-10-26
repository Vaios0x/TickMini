'use client'

import * as React from 'react'
import { OptimizedImage } from '@/components/performance/performance-optimizer'

interface OptimizedCoverPhotoProps {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
  quality?: number
  className?: string
  style?: React.CSSProperties
}

export function OptimizedCoverPhoto({
  src,
  alt,
  width = 1200,
  height = 630,
  priority = false,
  quality = 90,
  className,
  style
}: OptimizedCoverPhotoProps) {
  const [isLoaded, setIsLoaded] = React.useState(false)
  const [hasError, setHasError] = React.useState(false)

  const handleLoad = React.useCallback(() => {
    setIsLoaded(true)
  }, [])

  const handleError = React.useCallback(() => {
    setHasError(true)
  }, [])

  // Fallback para imagen de cover photo optimizada
  const fallbackCoverPhoto = (
    <div 
      style={{
        width,
        height,
        background: 'linear-gradient(135deg, #000000 0%, #1a1a2e 50%, #16213e 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 'clamp(15px, 3vw, 20px)',
        border: '2px solid rgba(0, 255, 255, 0.3)',
        boxShadow: '0 10px 30px rgba(0, 255, 255, 0.2)',
        ...style
      }}
      className={className}
    >
      {/* Grid pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        borderRadius: 'inherit'
      }} />
      
      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <div style={{
          fontSize: 'clamp(3rem, 8vw, 5rem)',
          marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
          filter: 'drop-shadow(0 0 20px rgba(0, 255, 255, 0.5))'
        }}>
          🎫
        </div>
        
        <h1 style={{
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          fontWeight: '700',
          background: 'linear-gradient(135deg, #00ffff, #ff00ff, #ffff00)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: 'clamp(0.5rem, 1vw, 1rem)',
          lineHeight: '1.2'
        }}>
          TickMini
        </h1>
        
        <p style={{
          fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
          color: '#ffffff',
          opacity: 0.9,
          marginBottom: 'clamp(0.5rem, 1vw, 1rem)'
        }}>
          NFT Ticketing Marketplace
        </p>
        
        <p style={{
          fontSize: 'clamp(0.8rem, 2vw, 1rem)',
          color: '#b0b0b0',
          opacity: 0.8
        }}>
          Base Network • Blockchain • Events • Web3
        </p>
      </div>
    </div>
  )

  if (hasError) {
    return fallbackCoverPhoto
  }

  return (
    <div style={{ position: 'relative', width, height }}>
      {!isLoaded && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 'clamp(15px, 3vw, 20px)',
          color: '#b0b0b0',
          fontSize: 'clamp(0.8rem, 2vw, 1rem)',
          zIndex: 1
        }}>
          ⏳ Cargando imagen...
        </div>
      )}
      
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: 'clamp(15px, 3vw, 20px)',
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease',
          ...style
        }}
        className={className}
      />
    </div>
  )
}

// Componente específico para cover photo de la app
export function AppCoverPhoto() {
  return (
    <OptimizedCoverPhoto
      src="/images/og-image.svg"
      alt="TickMini - NFT Ticketing Marketplace"
      width={1200}
      height={630}
      priority={true}
      quality={95}
    />
  )
}

// Componente para cover photo de eventos
export function EventCoverPhoto({ 
  eventTitle, 
  eventDate, 
  eventLocation 
}: { 
  eventTitle: string
  eventDate: string
  eventLocation: string 
}) {
  return (
    <div style={{
      width: '100%',
      height: 'clamp(200px, 50vw, 300px)',
      background: 'linear-gradient(135deg, #000000 0%, #1a1a2e 50%, #16213e 100%)',
      borderRadius: 'clamp(15px, 3vw, 20px)',
      border: '2px solid rgba(0, 255, 255, 0.3)',
      boxShadow: '0 10px 30px rgba(0, 255, 255, 0.2)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(1rem, 3vw, 2rem)',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Grid pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px'
      }} />
      
      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          fontSize: 'clamp(2rem, 6vw, 3rem)',
          marginBottom: 'clamp(0.5rem, 1vw, 1rem)',
          filter: 'drop-shadow(0 0 20px rgba(0, 255, 255, 0.5))'
        }}>
          🎭
        </div>
        
        <h2 style={{
          fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
          fontWeight: '700',
          background: 'linear-gradient(135deg, #00ffff, #ff00ff)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: 'clamp(0.5rem, 1vw, 1rem)',
          lineHeight: '1.2'
        }}>
          {eventTitle}
        </h2>
        
        <p style={{
          fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
          color: '#ffffff',
          opacity: 0.9,
          marginBottom: 'clamp(0.3rem, 0.8vw, 0.5rem)'
        }}>
          📅 {eventDate}
        </p>
        
        <p style={{
          fontSize: 'clamp(0.8rem, 1.8vw, 1rem)',
          color: '#b0b0b0',
          opacity: 0.8
        }}>
          📍 {eventLocation}
        </p>
      </div>
    </div>
  )
}
