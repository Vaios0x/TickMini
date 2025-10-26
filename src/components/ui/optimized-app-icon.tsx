'use client'

import * as React from 'react'

interface OptimizedAppIconProps {
  size?: number
  className?: string
  style?: React.CSSProperties
  showLabel?: boolean
}

export function OptimizedAppIcon({
  size = 64,
  className,
  style,
  showLabel = false
}: OptimizedAppIconProps) {
  const iconSize = Math.max(size, 44) // Mínimo 44px según Featured Guidelines

  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: showLabel ? 'clamp(0.5rem, 1vw, 0.8rem)' : 0,
        ...style
      }}
      className={className}
    >
      {/* Icono principal */}
      <div style={{
        width: iconSize,
        height: iconSize,
        background: 'linear-gradient(135deg, #000000 0%, #1a1a2e 50%, #16213e 100%)',
        borderRadius: 'clamp(12px, 3vw, 20px)',
        border: '2px solid rgba(0, 255, 255, 0.5)',
        boxShadow: '0 8px 25px rgba(0, 255, 255, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)'
        e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 255, 255, 0.5)'
        e.currentTarget.style.borderColor = 'rgba(0, 255, 255, 0.8)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)'
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 255, 255, 0.3)'
        e.currentTarget.style.borderColor = 'rgba(0, 255, 255, 0.5)'
      }}
      >
        {/* Grid pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '8px 8px',
          borderRadius: 'inherit'
        }} />
        
        {/* Ticket icon */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          fontSize: `${iconSize * 0.4}px`,
          filter: 'drop-shadow(0 0 10px rgba(0, 255, 255, 0.5))',
          animation: 'pulse 2s ease-in-out infinite'
        }}>
          🎫
        </div>
        
        {/* Glow effect */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '120%',
          height: '120%',
          background: 'radial-gradient(circle, rgba(0, 255, 255, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'pulse 3s ease-in-out infinite'
        }} />
      </div>
      
      {/* Label opcional */}
      {showLabel && (
        <span style={{
          fontSize: 'clamp(0.7rem, 1.5vw, 0.9rem)',
          color: '#ffffff',
          fontWeight: '600',
          textAlign: 'center',
          whiteSpace: 'nowrap',
          opacity: 0.9
        }}>
          TickMini
        </span>
      )}
    </div>
  )
}

// Componente específico para el icono de la app
export function AppIcon({ size = 64 }: { size?: number }) {
  return (
    <OptimizedAppIcon 
      size={size}
      showLabel={false}
    />
  )
}

// Componente para icono con label
export function AppIconWithLabel({ size = 64 }: { size?: number }) {
  return (
    <OptimizedAppIcon 
      size={size}
      showLabel={true}
    />
  )
}

// Componente para icono de navegación
export function NavigationAppIcon() {
  return (
    <OptimizedAppIcon 
      size={44}
      showLabel={true}
      style={{
        minWidth: '44px',
        minHeight: '44px'
      }}
    />
  )
}

// Componente para icono de favoritos
export function FavoriteAppIcon({ isFavorite = false }: { isFavorite?: boolean }) {
  return (
    <div style={{
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <OptimizedAppIcon size={44} />
      {isFavorite && (
        <div style={{
          position: 'absolute',
          top: '-5px',
          right: '-5px',
          width: '20px',
          height: '20px',
          background: 'linear-gradient(135deg, #ff00ff, #ff0080)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          color: '#ffffff',
          fontWeight: 'bold',
          boxShadow: '0 2px 8px rgba(255, 0, 255, 0.5)',
          animation: 'pulse 1.5s ease-in-out infinite'
        }}>
          ❤️
        </div>
      )}
    </div>
  )
}
