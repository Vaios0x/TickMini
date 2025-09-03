'use client'

import { useState } from 'react'
import './neon-button.css'

interface NeonButtonVariantsProps {
  onColorChange?: (color: string) => void
}

export function NeonButtonVariants({ onColorChange }: NeonButtonVariantsProps) {
  const [selectedColor, setSelectedColor] = useState('cyan')
  
  const colors = [
    // Colores brillantes
    { name: 'cyan', label: 'Cian', class: 'neon-cyan', isDark: false },
    { name: 'blue', label: 'Azul', class: 'neon-blue', isDark: false },
    { name: 'green', label: 'Verde', class: 'neon-green', isDark: false },
    { name: 'purple', label: 'Púrpura', class: 'neon-purple', isDark: false },
    
    // Colores oscuros con letras blancas
    { name: 'dark-red', label: 'Rojo Oscuro', class: 'neon-dark-red', isDark: true },
    { name: 'dark-orange', label: 'Naranja Oscuro', class: 'neon-dark-orange', isDark: true },
    { name: 'dark-yellow', label: 'Amarillo Oscuro', class: 'neon-dark-yellow', isDark: true },
    { name: 'dark-pink', label: 'Rosa Oscuro', class: 'neon-dark-pink', isDark: true },
    { name: 'dark-cyan', label: 'Cian Oscuro', class: 'neon-dark-cyan', isDark: true },
    { name: 'dark-blue', label: 'Azul Oscuro', class: 'neon-dark-blue', isDark: true },
    { name: 'dark-green', label: 'Verde Oscuro', class: 'neon-dark-green', isDark: true },
    { name: 'dark-purple', label: 'Púrpura Oscuro', class: 'neon-dark-purple', isDark: true }
  ]

  const handleColorChange = (color: string) => {
    setSelectedColor(color)
    onColorChange?.(color)
  }

  const getColorValue = (colorName: string) => {
    switch (colorName) {
      case 'cyan': return '#00ffff'
      case 'blue': return '#0080ff'
      case 'green': return '#00ff80'
      case 'purple': return '#8000ff'
      case 'dark-red': return '#ff0000'
      case 'dark-orange': return '#ff6600'
      case 'dark-yellow': return '#ffcc00'
      case 'dark-pink': return '#ff0080'
      case 'dark-cyan': return '#00ccff'
      case 'dark-blue': return '#0066ff'
      case 'dark-green': return '#00cc66'
      case 'dark-purple': return '#6600ff'
      default: return '#00ffff'
    }
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      padding: '1.5rem',
      background: 'rgba(0, 0, 0, 0.9)',
      borderRadius: '15px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      maxWidth: '800px',
      width: '100%'
    }}>
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '1rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        paddingBottom: '1rem'
      }}>
        <span style={{ color: '#ffffff', fontSize: '1rem', fontWeight: '600' }}>🎨 Selecciona el Color Neon</span>
      </div>
      
      {/* Colores brillantes */}
      <div style={{ marginBottom: '1rem' }}>
        <span style={{ color: '#ffffff', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>✨ Colores Brillantes:</span>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {colors.filter(c => !c.isDark).map((color) => (
            <button
              key={color.name}
              onClick={() => handleColorChange(color.name)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                border: `2px solid ${getColorValue(color.name)}`,
                background: color.name === selectedColor 
                  ? `${getColorValue(color.name)}20`
                  : 'transparent',
                color: getColorValue(color.name),
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '0.8rem',
                fontWeight: '500',
                minWidth: '80px'
              }}
              className={color.class}
            >
              {color.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Colores oscuros */}
      <div>
        <span style={{ color: '#ffffff', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>🌑 Colores Oscuros (Letras Blancas):</span>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {colors.filter(c => c.isDark).map((color) => (
            <button
              key={color.name}
              onClick={() => handleColorChange(color.name)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                border: `2px solid ${getColorValue(color.name)}`,
                background: color.name === selectedColor 
                  ? `${getColorValue(color.name)}20`
                  : 'transparent',
                color: getColorValue(color.name),
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '0.8rem',
                fontWeight: '500',
                minWidth: '100px'
              }}
              className={color.class}
            >
              {color.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// Componente de demostración del botón neon
export function NeonButtonDemo() {
  const [currentColor, setCurrentColor] = useState('cyan')
  
  const getColorClass = () => {
    return `neon-${currentColor}`
  }

  const getColorValue = () => {
    switch (currentColor) {
      case 'cyan': return '#00ffff'
      case 'blue': return '#0080ff'
      case 'green': return '#00ff80'
      case 'purple': return '#8000ff'
      case 'dark-red': return '#ff0000'
      case 'dark-orange': return '#ff6600'
      case 'dark-yellow': return '#ffcc00'
      case 'dark-pink': return '#ff0080'
      case 'dark-cyan': return '#00ccff'
      case 'dark-blue': return '#0066ff'
      case 'dark-green': return '#00cc66'
      case 'dark-purple': return '#6600ff'
      default: return '#00ffff'
    }
  }

  const getBackgroundColor = () => {
    if (currentColor.startsWith('dark-')) {
      switch (currentColor) {
        case 'dark-red': return 'linear-gradient(135deg, rgba(20, 0, 0, 0.95), rgba(40, 0, 0, 0.98))'
        case 'dark-orange': return 'linear-gradient(135deg, rgba(25, 10, 0, 0.95), rgba(50, 20, 0, 0.98))'
        case 'dark-yellow': return 'linear-gradient(135deg, rgba(25, 25, 0, 0.95), rgba(50, 50, 0, 0.98))'
        case 'dark-pink': return 'linear-gradient(135deg, rgba(25, 0, 20, 0.95), rgba(50, 0, 40, 0.98))'
        case 'dark-cyan': return 'linear-gradient(135deg, rgba(0, 20, 25, 0.95), rgba(0, 40, 50, 0.98))'
        case 'dark-blue': return 'linear-gradient(135deg, rgba(0, 10, 25, 0.95), rgba(0, 20, 50, 0.98))'
        case 'dark-green': return 'linear-gradient(135deg, rgba(0, 25, 10, 0.95), rgba(0, 50, 20, 0.98))'
        case 'dark-purple': return 'linear-gradient(135deg, rgba(20, 0, 25, 0.95), rgba(40, 0, 50, 0.98))'
        default: return 'linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(0, 20, 40, 0.95))'
      }
    }
    return 'linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(0, 20, 40, 0.95))'
  }

  const getTextColor = () => {
    return currentColor.startsWith('dark-') ? '#ffffff' : getColorValue()
  }

  const getGradientColors = () => {
    const mainColor = getColorValue()
    if (currentColor.startsWith('dark-')) {
      switch (currentColor) {
        case 'dark-red': return `${mainColor}, #800000, ${mainColor}, #cc0000`
        case 'dark-orange': return `${mainColor}, #cc6600, ${mainColor}, #ff9933`
        case 'dark-yellow': return `${mainColor}, #cc9900, ${mainColor}, #ffdd33`
        case 'dark-pink': return `${mainColor}, #800040, ${mainColor}, #cc0066`
        case 'dark-cyan': return `${mainColor}, #006680, ${mainColor}, #0099cc`
        case 'dark-blue': return `${mainColor}, #003380, ${mainColor}, #0066cc`
        case 'dark-green': return `${mainColor}, #006633, ${mainColor}, #009966`
        case 'dark-purple': return `${mainColor}, #330080, ${mainColor}, #6600cc`
        default: return `${mainColor}, #0080ff, ${mainColor}, #00ff80`
      }
    }
    return `${mainColor}, #0080ff, ${mainColor}, #00ff80`
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
      alignItems: 'center',
      padding: '2rem',
      background: 'linear-gradient(135deg, #0a0a0a, #1a1a2e)',
      minHeight: '100vh'
    }}>
      <h1 style={{ 
        color: '#ffffff', 
        fontSize: '2.5rem', 
        marginBottom: '1rem',
        textAlign: 'center',
        textShadow: '0 0 20px rgba(0, 255, 255, 0.5)'
      }}>
        🎨 Botón Neon Personalizable
      </h1>
      
      <p style={{
        color: '#cccccc',
        fontSize: '1.1rem',
        textAlign: 'center',
        maxWidth: '600px',
        marginBottom: '1rem'
      }}>
        Explora diferentes estilos neon, desde colores brillantes hasta tonos oscuros con letras blancas
      </p>
      
      <NeonButtonVariants onColorChange={setCurrentColor} />
      
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {/* Botón de conexión */}
        <button 
          style={{
            background: getBackgroundColor(),
            border: `2px solid ${getColorValue()}`,
            color: getTextColor(),
            padding: '1rem 2rem',
            borderRadius: '30px',
            fontSize: '1rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            backdropFilter: 'blur(15px)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden'
          }}
          className={`neon-button-connect ${getColorClass()}`}
        >
          {/* Efecto de glow neon pulsante */}
          <div 
            className="neon-glow"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: '30px',
              background: 'transparent',
              boxShadow: `0 0 20px ${getColorValue()}80, inset 0 0 20px ${getColorValue()}20`,
              animation: 'neonPulse 2s ease-in-out infinite'
            }} 
          />
          
          {/* Borde neon animado */}
          <div 
            className="neon-border"
            style={{
              position: 'absolute',
              top: '-2px',
              left: '-2px',
              right: '-2px',
              bottom: '-2px',
              borderRadius: '32px',
              background: `linear-gradient(45deg, ${getGradientColors()})`,
              backgroundSize: '400% 400%',
              animation: 'neonBorder 3s ease-in-out infinite',
              zIndex: -1
            }} 
          />
          
          {/* Partículas flotantes neon */}
          <div className="neon-particles">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="neon-particle"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + i * 10}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${4 + i * 0.5}s`,
                  background: getColorValue()
                }}
              />
            ))}
          </div>
          
          <span style={{ fontSize: '1.2rem', zIndex: 1, position: 'relative' }}>🔑</span>
          <span style={{ zIndex: 1, position: 'relative' }}>Conectar Wallet</span>
        </button>
        
        {/* Botón conectado */}
        <button 
          style={{
            background: getBackgroundColor(),
            border: `2px solid ${getColorValue()}`,
            color: getTextColor(),
            padding: '1rem 2rem',
            borderRadius: '30px',
            fontSize: '1rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            backdropFilter: 'blur(15px)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden'
          }}
          className={`neon-button-connected ${getColorClass()}`}
        >
          {/* Efecto de glow neon pulsante */}
          <div 
            className="neon-glow"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: '30px',
              background: 'transparent',
              boxShadow: `0 0 20px ${getColorValue()}80, inset 0 0 20px ${getColorValue()}20`,
              animation: 'neonPulse 2s ease-in-out infinite'
            }} 
          />
          
          {/* Borde neon animado */}
          <div 
            className="neon-border"
            style={{
              position: 'absolute',
              top: '-2px',
              left: '-2px',
              right: '-2px',
              bottom: '-2px',
              borderRadius: '32px',
              background: `linear-gradient(45deg, ${getGradientColors()})`,
              backgroundSize: '400% 400%',
              animation: 'neonBorder 3s ease-in-out infinite',
              zIndex: -1
            }} 
          />
          
          {/* Partículas flotantes neon */}
          <div className="neon-particles">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="neon-particle"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + i * 10}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${4 + i * 0.5}s`,
                  background: getColorValue()
                }}
              />
            ))}
          </div>
          
          <span style={{ fontSize: '1.2rem', zIndex: 1, position: 'relative' }}>🟢</span>
          <span style={{ zIndex: 1, position: 'relative' }}>0xDF63...0E88</span>
          <span style={{ fontSize: '0.8rem', zIndex: 1, position: 'relative' }}>▼</span>
        </button>
      </div>
      
      <div style={{
        color: '#ffffff',
        textAlign: 'center',
        maxWidth: '700px',
        lineHeight: '1.6',
        background: 'rgba(0, 0, 0, 0.7)',
        padding: '2rem',
        borderRadius: '15px',
        border: `1px solid ${getColorValue()}40`
      }}>
        <h3 style={{ color: getColorValue(), marginBottom: '1rem', fontSize: '1.3rem' }}>✨ Características del Botón Neon:</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', textAlign: 'left' }}>
          <div>
            <h4 style={{ color: getColorValue(), marginBottom: '0.5rem' }}>🎭 Animaciones:</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li>🌟 <strong>Borde Pulsante:</strong> Se prende y apaga suavemente</li>
              <li>💫 <strong>Glow Interno:</strong> Resplandor que pulsa desde el centro</li>
              <li>🎨 <strong>Gradiente Animado:</strong> Colores que fluyen continuamente</li>
              <li>✨ <strong>Partículas Flotantes:</strong> Puntos que se mueven suavemente</li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: getColorValue(), marginBottom: '0.5rem' }}>🎨 Colores:</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li>🌈 <strong>4 Colores Brillantes:</strong> Cian, Azul, Verde, Púrpura</li>
              <li>🌑 <strong>8 Colores Oscuros:</strong> Con fondos negros y letras blancas</li>
              <li>🎯 <strong>Personalizable:</strong> Cambia entre todos los estilos</li>
              <li>🎭 <strong>Efectos Hover:</strong> Animaciones adicionales al interactuar</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
