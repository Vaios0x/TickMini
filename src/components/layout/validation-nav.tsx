'use client'

import Link from 'next/link'
import { useState } from 'react'

interface ValidationNavProps {
  currentPath?: string
}

export function ValidationNav({ currentPath }: ValidationNavProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const navItems = [
    {
      href: '/validator',
      label: 'Sistema',
      icon: '🔍',
      description: 'Sistema principal de validación'
    },
    {
      href: '/validation',
      label: 'Dashboard',
      icon: '📊',
      description: 'Panel de validación activa'
    },
    {
      href: '/events',
      label: 'Eventos',
      icon: '🎫',
      description: 'Ver y gestionar eventos'
    },
    {
      href: '/validator-mobile',
      label: 'Móvil',
      icon: '📱',
      description: 'Validador optimizado para móvil'
    },
    {
      href: '/verify-ticket',
      label: 'Verificar',
      icon: '🔎',
      description: 'Verificar autenticidad de tickets'
    }
  ]

  return (
    <div style={{
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(0, 255, 0, 0.2)',
      borderRadius: '20px',
      padding: '1rem 2rem',
      marginBottom: '2rem',
      boxShadow: '0 8px 32px rgba(0, 255, 0, 0.1)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        marginBottom: '1rem'
      }}>
        <span style={{
          fontSize: '1.2rem',
          color: '#00ff00',
          filter: 'drop-shadow(0 0 8px rgba(0, 255, 0, 0.6))'
        }}>
          🔍
        </span>
        <h3 style={{
          color: '#00ff00',
          fontSize: '1.1rem',
          fontWeight: '600',
          margin: 0,
          textShadow: '0 0 10px rgba(0, 255, 0, 0.4)'
        }}>
          Centro de Validación
        </h3>
      </div>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        alignItems: 'center'
      }}>
        {navItems.map((item) => {
          const isActive = currentPath === item.href
          const isHovered = hoveredItem === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                color: isActive ? '#00ff00' : '#ffffff',
                textDecoration: 'none',
                padding: '0.75rem 1.2rem',
                borderRadius: '15px',
                border: isActive 
                  ? '2px solid rgba(0, 255, 0, 0.4)' 
                  : '1px solid rgba(255, 255, 255, 0.1)',
                background: isActive 
                  ? 'rgba(0, 255, 0, 0.1)' 
                  : isHovered 
                    ? 'rgba(255, 255, 255, 0.05)' 
                    : 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.9rem',
                fontWeight: '500',
                position: 'relative',
                transform: isHovered ? 'translateY(-2px)' : 'none',
                boxShadow: isActive 
                  ? '0 4px 20px rgba(0, 255, 0, 0.2)' 
                  : isHovered 
                    ? '0 4px 15px rgba(255, 255, 255, 0.1)' 
                    : 'none'
              }}
              onMouseEnter={() => setHoveredItem(item.href)}
              onMouseLeave={() => setHoveredItem(null)}
              title={item.description}
            >
              <span style={{
                fontSize: '1.1rem',
                filter: isActive 
                  ? 'drop-shadow(0 0 6px rgba(0, 255, 0, 0.6))' 
                  : 'none'
              }}>
                {item.icon}
              </span>
              <span>{item.label}</span>
              
              {isActive && (
                <div style={{
                  position: 'absolute',
                  bottom: '-2px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '80%',
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, #00ff00, transparent)',
                  borderRadius: '1px'
                }} />
              )}
            </Link>
          )
        })}

        {/* Separador */}
        <div style={{
          width: '1px',
          height: '30px',
          background: 'rgba(255, 255, 255, 0.1)',
          margin: '0 0.5rem'
        }} />

        {/* Indicador de estado */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          background: 'rgba(0, 255, 0, 0.1)',
          border: '1px solid rgba(0, 255, 0, 0.3)',
          borderRadius: '12px',
          fontSize: '0.8rem'
        }}>
          <div style={{
            width: '8px',
            height: '8px',
            background: '#00ff00',
            borderRadius: '50%',
            filter: 'drop-shadow(0 0 4px rgba(0, 255, 0, 0.8))',
            animation: 'pulse 2s infinite'
          }} />
          <span style={{
            color: '#00ff00',
            fontWeight: '500'
          }}>
            Sistema Activo
          </span>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
      `}</style>
    </div>
  )
}