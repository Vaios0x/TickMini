'use client'

import * as React from 'react'
import { useState } from 'react'
import { useNeynarNotifications } from '@/hooks/use-neynar-notifications'

export function NeynarNotificationManager() {
  const {
    isSDKLoaded,
    isLoading,
    error,
    notificationToken,
    isNotificationEnabled,
    handleAddMiniApp,
    checkNotificationStatus
  } = useNeynarNotifications()

  const [showDetails, setShowDetails] = useState(false)

  // Función para agregar Mini App
  const handleAddApp = async () => {
    try {
      const result = await handleAddMiniApp()
      
      if (result.added && result.notificationDetails) {
        alert('✅ Mini App agregada y notificaciones habilitadas!')
      } else {
        alert('⚠️ Mini App agregada pero notificaciones no habilitadas')
      }
    } catch (err) {
      alert(`❌ Error: ${err instanceof Error ? err.message : 'Error desconocido'}`)
    }
  }

  // Función para verificar estado
  const handleCheckStatus = () => {
    const status = checkNotificationStatus()
    console.log('📊 Estado de notificaciones:', status)
    setShowDetails(!showDetails)
  }

  return (
    <div style={{
      background: 'rgba(0, 0, 0, 0.6)',
      borderRadius: 'clamp(20px, 5vw, 25px)',
      padding: 'clamp(2rem, 4vw, 3rem)',
      border: isNotificationEnabled 
        ? '2px solid rgba(0, 255, 0, 0.5)' 
        : '2px solid rgba(255, 255, 0, 0.5)',
      backdropFilter: 'blur(20px)',
      marginBottom: 'clamp(2rem, 4vw, 3rem)'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
        flexWrap: 'wrap',
        gap: 'clamp(1rem, 2vw, 1.5rem)'
      }}>
        <div>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            fontWeight: '700',
            color: isNotificationEnabled ? '#00ff00' : '#ffff00',
            marginBottom: '0.5rem'
          }}>
            {isNotificationEnabled ? '🔔 Notificaciones Habilitadas' : '⚠️ Notificaciones Pendientes'}
          </h2>
          <p style={{
            color: '#b0b0b0',
            fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
            margin: 0
          }}>
            {isNotificationEnabled 
              ? 'Las notificaciones están activas y funcionando'
              : 'Agrega la Mini App para habilitar notificaciones'
            }
          </p>
        </div>
        
        <div style={{
          display: 'flex',
          gap: 'clamp(0.5rem, 1vw, 1rem)',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={handleCheckStatus}
            style={{
              padding: 'clamp(0.6rem, 1.5vw, 0.8rem) clamp(1rem, 2vw, 1.5rem)',
              background: 'linear-gradient(135deg, #00ffff, #0080ff)',
              border: 'none',
              borderRadius: 'clamp(8px, 2vw, 12px)',
              color: '#000000',
              fontSize: 'clamp(0.8rem, 2vw, 1rem)',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
          >
            📊 Estado
          </button>
        </div>
      </div>

      {/* Estado del SDK */}
      <div style={{
        background: 'rgba(0, 0, 0, 0.4)',
        borderRadius: 'clamp(10px, 2vw, 15px)',
        padding: 'clamp(1rem, 2vw, 1.5rem)',
        marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <h3 style={{
          color: '#ffffff',
          marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
          fontSize: 'clamp(1.1rem, 3vw, 1.3rem)'
        }}>
          🔧 Estado del SDK
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 'clamp(1rem, 2vw, 1.5rem)'
        }}>
          <div>
            <h4 style={{ color: '#00ffff', marginBottom: '0.5rem' }}>SDK Cargado</h4>
            <p style={{ 
              color: isSDKLoaded ? '#00ff00' : '#ff6b6b',
              fontSize: 'clamp(0.9rem, 2vw, 1rem)'
            }}>
              {isSDKLoaded ? '✅ Sí' : '❌ No'}
            </p>
          </div>
          
          <div>
            <h4 style={{ color: '#ff00ff', marginBottom: '0.5rem' }}>Notificaciones</h4>
            <p style={{ 
              color: isNotificationEnabled ? '#00ff00' : '#ff6b6b',
              fontSize: 'clamp(0.9rem, 2vw, 1rem)'
            }}>
              {isNotificationEnabled ? '✅ Habilitadas' : '❌ Deshabilitadas'}
            </p>
          </div>
          
          <div>
            <h4 style={{ color: '#ffff00', marginBottom: '0.5rem' }}>Token</h4>
            <p style={{ 
              color: notificationToken ? '#00ff00' : '#ff6b6b',
              fontSize: 'clamp(0.9rem, 2vw, 1rem)',
              wordBreak: 'break-all'
            }}>
              {notificationToken ? '✅ Disponible' : '❌ No disponible'}
            </p>
          </div>
        </div>
      </div>

      {/* Botón para agregar Mini App */}
      {!isNotificationEnabled && (
        <div style={{
          background: 'rgba(255, 255, 0, 0.1)',
          borderRadius: 'clamp(10px, 2vw, 15px)',
          padding: 'clamp(1.5rem, 3vw, 2rem)',
          border: '1px solid rgba(255, 255, 0, 0.3)',
          marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
          textAlign: 'center'
        }}>
          <h3 style={{
            color: '#ffff00',
            marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
            fontSize: 'clamp(1.1rem, 3vw, 1.3rem)'
          }}>
            🚀 Agregar Mini App
          </h3>
          
          <p style={{
            color: '#b0b0b0',
            marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
            fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
            lineHeight: '1.6'
          }}>
            Para recibir notificaciones, primero debes agregar TickMini como Mini App en tu cliente de Farcaster.
          </p>
          
          <button
            onClick={handleAddApp}
            disabled={!isSDKLoaded || isLoading}
            style={{
              padding: 'clamp(0.8rem, 2vw, 1.2rem) clamp(2rem, 4vw, 3rem)',
              background: (!isSDKLoaded || isLoading) 
                ? 'rgba(100, 100, 100, 0.5)' 
                : 'linear-gradient(135deg, #00ffff, #0080ff)',
              border: 'none',
              borderRadius: 'clamp(10px, 2vw, 15px)',
              color: '#000000',
              fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
              fontWeight: '600',
              cursor: (!isSDKLoaded || isLoading) ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              minWidth: 'clamp(200px, 50vw, 300px)'
            }}
            onMouseEnter={(e) => {
              if (isSDKLoaded && !isLoading) {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 255, 255, 0.4)'
              }
            }}
            onMouseLeave={(e) => {
              if (isSDKLoaded && !isLoading) {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }
            }}
          >
            {isLoading ? '⏳ Agregando...' : '🔔 Agregar Mini App'}
          </button>
        </div>
      )}

      {/* Detalles del estado */}
      {showDetails && (
        <div style={{
          background: 'rgba(0, 0, 0, 0.4)',
          borderRadius: 'clamp(10px, 2vw, 15px)',
          padding: 'clamp(1rem, 2vw, 1.5rem)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          marginBottom: 'clamp(1.5rem, 3vw, 2rem)'
        }}>
          <h3 style={{
            color: '#ffffff',
            marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
            fontSize: 'clamp(1.1rem, 3vw, 1.3rem)'
          }}>
            📊 Detalles del Estado
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 'clamp(1rem, 2vw, 1.5rem)'
          }}>
            <div>
              <h4 style={{ color: '#00ffff', marginBottom: '0.5rem' }}>SDK Loaded</h4>
              <p style={{ color: '#ffffff', fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>
                {isSDKLoaded ? 'true' : 'false'}
              </p>
            </div>
            
            <div>
              <h4 style={{ color: '#ff00ff', marginBottom: '0.5rem' }}>Notifications Enabled</h4>
              <p style={{ color: '#ffffff', fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>
                {isNotificationEnabled ? 'true' : 'false'}
              </p>
            </div>
            
            <div>
              <h4 style={{ color: '#ffff00', marginBottom: '0.5rem' }}>Token</h4>
              <p style={{ 
                color: '#ffffff', 
                fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                wordBreak: 'break-all',
                fontFamily: 'monospace'
              }}>
                {notificationToken || 'null'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div style={{
          background: 'rgba(255, 0, 0, 0.2)',
          border: '2px solid rgba(255, 0, 0, 0.5)',
          borderRadius: 'clamp(10px, 2vw, 15px)',
          padding: 'clamp(1rem, 2vw, 1.5rem)',
          marginTop: 'clamp(1rem, 2vw, 1.5rem)',
          color: '#ff6b6b',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0' }}>❌ Error</h3>
          <p style={{ margin: 0 }}>{error}</p>
        </div>
      )}
    </div>
  )
}
