'use client'

import { useAppKitConnection } from '@/hooks/use-appkit'

export default function TestWalletPage() {
  const { 
    isConnected, 
    address, 
    formattedAddress, 
    connect, 
    disconnect,
    formattedBalance 
  } = useAppKitConnection()

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
      padding: '2rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '2rem'
    }}>
      <h1 style={{
        color: '#00ffff',
        fontSize: '2.5rem',
        textAlign: 'center',
        marginBottom: '2rem'
      }}>
        🔗 Prueba de Conexión de Wallet
      </h1>

      <div style={{
        background: 'rgba(0, 0, 0, 0.3)',
        padding: '2rem',
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(20px)',
        maxWidth: '500px',
        width: '100%'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          alignItems: 'center'
        }}>
          <div style={{
            fontSize: '3rem',
            marginBottom: '1rem'
          }}>
            {isConnected ? '✅' : '🔑'}
          </div>

          <h2 style={{
            color: isConnected ? '#00ff00' : '#00ffff',
            fontSize: '1.5rem',
            marginBottom: '1rem'
          }}>
            {isConnected ? 'Wallet Conectada' : 'Wallet Desconectada'}
          </h2>

          {isConnected ? (
            <>
              <div style={{
                background: 'rgba(0, 255, 0, 0.1)',
                padding: '1rem',
                borderRadius: '15px',
                border: '1px solid rgba(0, 255, 0, 0.3)',
                width: '100%',
                textAlign: 'center'
              }}>
                <p style={{ color: '#ffffff', marginBottom: '0.5rem' }}>
                  <strong>Dirección:</strong>
                </p>
                <p style={{ 
                  color: '#00ff00', 
                  fontFamily: 'monospace',
                  fontSize: '0.9rem',
                  wordBreak: 'break-all'
                }}>
                  {address}
                </p>
              </div>

              <div style={{
                background: 'rgba(0, 255, 0, 0.1)',
                padding: '1rem',
                borderRadius: '15px',
                border: '1px solid rgba(0, 255, 0, 0.3)',
                width: '100%',
                textAlign: 'center'
              }}>
                <p style={{ color: '#ffffff', marginBottom: '0.5rem' }}>
                  <strong>Dirección Formateada:</strong>
                </p>
                <p style={{ color: '#00ff00', fontSize: '1.1rem' }}>
                  {formattedAddress}
                </p>
              </div>

              {formattedBalance && (
                <div style={{
                  background: 'rgba(0, 255, 0, 0.1)',
                  padding: '1rem',
                  borderRadius: '15px',
                  border: '1px solid rgba(0, 255, 0, 0.3)',
                  width: '100%',
                  textAlign: 'center'
                }}>
                  <p style={{ color: '#ffffff', marginBottom: '0.5rem' }}>
                    <strong>Balance:</strong>
                  </p>
                  <p style={{ color: '#00ff00', fontSize: '1.1rem' }}>
                    {formattedBalance}
                  </p>
                </div>
              )}

              <button
                onClick={disconnect}
                style={{
                  background: 'linear-gradient(135deg, #ff4444, #cc0000)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '1rem 2rem',
                  borderRadius: '15px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 25px rgba(255, 68, 68, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(255, 68, 68, 0.4)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 68, 68, 0.3)'
                }}
                tabIndex={0}
                aria-label="Desconectar wallet"
              >
                🔌 Desconectar Wallet
              </button>
            </>
          ) : (
            <button
              onClick={connect}
              style={{
                background: 'linear-gradient(135deg, #00ffff, #ff00ff)',
                color: '#000000',
                border: 'none',
                padding: '1.5rem 3rem',
                borderRadius: '20px',
                fontSize: '1.3rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 10px 30px rgba(0, 255, 255, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 255, 255, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 255, 255, 0.3)'
              }}
              tabIndex={0}
              aria-label="Conectar wallet"
            >
              🔑 Conectar Wallet
            </button>
          )}
        </div>
      </div>

      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        padding: '1.5rem',
        borderRadius: '15px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        maxWidth: '600px',
        width: '100%'
      }}>
        <h3 style={{
          color: '#00ffff',
          fontSize: '1.2rem',
          marginBottom: '1rem',
          textAlign: 'center'
        }}>
          📋 Información de Debug
        </h3>
        <div style={{
          color: '#b0b0b0',
          fontSize: '0.9rem',
          lineHeight: '1.6'
        }}>
          <p><strong>Estado de conexión:</strong> {isConnected ? 'Conectado' : 'Desconectado'}</p>
          <p><strong>Dirección completa:</strong> {address || 'No disponible'}</p>
          <p><strong>Balance:</strong> {formattedBalance || 'No disponible'}</p>
        </div>
      </div>
    </div>
  )
}
