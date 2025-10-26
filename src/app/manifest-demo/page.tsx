'use client'

import * as React from 'react'
import { useState } from 'react'
import { AccountAssociationStatus } from '@/components/manifest/account-association-status'

export default function ManifestDemoPage() {
  const [manifestData, setManifestData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Función para obtener el manifest actual
  const fetchManifest = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/.well-known/farcaster.json')
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }
      const data = await response.json()
      setManifestData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setIsLoading(false)
    }
  }

  // Función para copiar el manifest al portapapeles
  const copyManifest = () => {
    if (manifestData) {
      navigator.clipboard.writeText(JSON.stringify(manifestData, null, 2))
      alert('Manifest copiado al portapapeles')
    }
  }

  // Función para abrir Base.dev en nueva pestaña
  const openBaseDev = () => {
    window.open('https://base.dev', '_blank')
  }

  // Función para abrir Farcaster Manifest Tool
  const openFarcasterTool = () => {
    window.open('https://farcaster.xyz', '_blank')
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #000000 0%, #1a1a2e 50%, #16213e 100%)',
      padding: 'clamp(2rem, 5vw, 4rem)',
      color: '#ffffff'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: 'clamp(3rem, 6vw, 4rem)'
        }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #00ffff, #ff00ff, #ffff00)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: 'clamp(1rem, 2vw, 1.5rem)'
          }}>
            📋 Manifest de Farcaster
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 3vw, 1.3rem)',
            color: '#b0b0b0',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Configuración y firma del manifest para TickMini como Mini App de Farcaster en Base
          </p>
        </div>

        {/* Account Association Status */}
        <AccountAssociationStatus />

        {/* Proceso de Firma */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.6)',
          borderRadius: 'clamp(20px, 5vw, 25px)',
          padding: 'clamp(2rem, 4vw, 3rem)',
          marginBottom: 'clamp(2rem, 4vw, 3rem)',
          border: '2px solid rgba(255, 255, 0, 0.3)',
          backdropFilter: 'blur(20px)'
        }}>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            fontWeight: '700',
            color: '#ffff00',
            marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
            textAlign: 'center'
          }}>
            ✍️ Proceso de Firma del Manifest
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: 'clamp(1.5rem, 3vw, 2rem)',
            marginBottom: 'clamp(2rem, 4vw, 3rem)'
          }}>
            {/* Opción 1: Base Build */}
            <div style={{
              background: 'rgba(0, 255, 255, 0.1)',
              padding: 'clamp(1.5rem, 3vw, 2rem)',
              borderRadius: 'clamp(15px, 3vw, 20px)',
              border: '2px solid rgba(0, 255, 255, 0.3)',
              textAlign: 'center'
            }}>
              <h3 style={{ 
                color: '#00ffff', 
                marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
                fontSize: 'clamp(1.2rem, 3vw, 1.5rem)'
              }}>
                🚀 Base Build (Recomendado)
              </h3>
              
              <div style={{
                textAlign: 'left',
                marginBottom: 'clamp(1.5rem, 3vw, 2rem)'
              }}>
                <p style={{ color: '#ffffff', margin: '0.5rem 0' }}>1. Visita <strong>base.dev</strong></p>
                <p style={{ color: '#ffffff', margin: '0.5rem 0' }}>2. Ve a <strong>Preview → Account Association</strong></p>
                <p style={{ color: '#ffffff', margin: '0.5rem 0' }}>3. Ingresa tu dominio: <strong>tickmini.app</strong></p>
                <p style={{ color: '#ffffff', margin: '0.5rem 0' }}>4. Haz clic en <strong>Verify → Sign</strong></p>
                <p style={{ color: '#ffffff', margin: '0.5rem 0' }}>5. Firma el mensaje en tu wallet</p>
                <p style={{ color: '#ffffff', margin: '0.5rem 0' }}>6. Copia el <strong>accountAssociation</strong></p>
                <p style={{ color: '#ffffff', margin: '0.5rem 0' }}>7. Pégalo en el manifest</p>
                <p style={{ color: '#ffffff', margin: '0.5rem 0' }}>8. Redespliega la aplicación</p>
              </div>
              
              <button
                onClick={openBaseDev}
                style={{
                  width: '100%',
                  padding: 'clamp(0.8rem, 2vw, 1.2rem)',
                  background: 'linear-gradient(135deg, #00ffff, #0080ff)',
                  border: 'none',
                  borderRadius: 'clamp(10px, 2vw, 15px)',
                  color: '#000000',
                  fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
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
                🌐 Abrir Base.dev
              </button>
            </div>

            {/* Opción 2: Farcaster */}
            <div style={{
              background: 'rgba(255, 0, 255, 0.1)',
              padding: 'clamp(1.5rem, 3vw, 2rem)',
              borderRadius: 'clamp(15px, 3vw, 20px)',
              border: '2px solid rgba(255, 0, 255, 0.3)',
              textAlign: 'center'
            }}>
              <h3 style={{ 
                color: '#ff00ff', 
                marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
                fontSize: 'clamp(1.2rem, 3vw, 1.5rem)'
              }}>
                🔮 Farcaster Tool
              </h3>
              
              <div style={{
                textAlign: 'left',
                marginBottom: 'clamp(1.5rem, 3vw, 2rem)'
              }}>
                <p style={{ color: '#ffffff', margin: '0.5rem 0' }}>1. Ve a <strong>farcaster.xyz</strong></p>
                <p style={{ color: '#ffffff', margin: '0.5rem 0' }}>2. Navega a <strong>Developers → Manifest Tool</strong></p>
                <p style={{ color: '#ffffff', margin: '0.5rem 0' }}>3. Ingresa tu dominio: <strong>tickmini.app</strong></p>
                <p style={{ color: '#ffffff', margin: '0.5rem 0' }}>4. Haz clic en <strong>Refresh</strong></p>
                <p style={{ color: '#ffffff', margin: '0.5rem 0' }}>5. Selecciona <strong>Generate Account Association</strong></p>
                <p style={{ color: '#ffffff', margin: '0.5rem 0' }}>6. Copia el objeto generado</p>
                <p style={{ color: '#ffffff', margin: '0.5rem 0' }}>7. Pégalo en el manifest</p>
                <p style={{ color: '#ffffff', margin: '0.5rem 0' }}>8. Redespliega la aplicación</p>
              </div>
              
              <button
                onClick={openFarcasterTool}
                style={{
                  width: '100%',
                  padding: 'clamp(0.8rem, 2vw, 1.2rem)',
                  background: 'linear-gradient(135deg, #ff00ff, #8000ff)',
                  border: 'none',
                  borderRadius: 'clamp(10px, 2vw, 15px)',
                  color: '#ffffff',
                  fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 10px 20px rgba(255, 0, 255, 0.4)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                🌐 Abrir Farcaster.xyz
              </button>
            </div>
          </div>
        </div>

        {/* Manifest JSON */}
        {manifestData && (
          <div style={{
            background: 'rgba(0, 0, 0, 0.8)',
            borderRadius: 'clamp(20px, 5vw, 25px)',
            padding: 'clamp(2rem, 4vw, 3rem)',
            border: '2px solid rgba(0, 255, 0, 0.3)',
            backdropFilter: 'blur(20px)'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.5rem, 4vw, 2rem)',
              fontWeight: '700',
              color: '#00ff00',
              marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
              textAlign: 'center'
            }}>
              📄 Manifest JSON Actual
            </h2>
            
            <pre style={{
              background: 'rgba(0, 0, 0, 0.6)',
              padding: 'clamp(1rem, 2vw, 1.5rem)',
              borderRadius: 'clamp(10px, 2vw, 15px)',
              border: '1px solid rgba(0, 255, 0, 0.3)',
              color: '#00ff00',
              fontSize: 'clamp(0.8rem, 2vw, 1rem)',
              lineHeight: '1.5',
              overflow: 'auto',
              maxHeight: '400px'
            }}>
              {JSON.stringify(manifestData, null, 2)}
            </pre>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div style={{
            background: 'rgba(255, 0, 0, 0.2)',
            border: '2px solid rgba(255, 0, 0, 0.5)',
            borderRadius: 'clamp(15px, 3vw, 20px)',
            padding: 'clamp(1rem, 2vw, 1.5rem)',
            marginTop: 'clamp(1rem, 2vw, 1.5rem)',
            color: '#ff6b6b',
            textAlign: 'center'
          }}>
            <h3 style={{ margin: '0 0 0.5rem 0' }}>❌ Error</h3>
            <p style={{ margin: 0 }}>{error}</p>
          </div>
        )}

        {/* Información adicional */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.4)',
          borderRadius: 'clamp(15px, 3vw, 20px)',
          padding: 'clamp(1.5rem, 3vw, 2rem)',
          marginTop: 'clamp(2rem, 4vw, 3rem)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          textAlign: 'center'
        }}>
          <h3 style={{
            color: '#ffffff',
            marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
            fontSize: 'clamp(1.2rem, 3vw, 1.5rem)'
          }}>
            📚 Información Importante
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 'clamp(1rem, 2vw, 1.5rem)',
            textAlign: 'left'
          }}>
            <div>
              <h4 style={{ color: '#00ffff', marginBottom: '0.5rem' }}>🔗 URL del Manifest</h4>
              <p style={{ color: '#b0b0b0', fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>
                https://tickmini.app/.well-known/farcaster.json
              </p>
            </div>
            <div>
              <h4 style={{ color: '#ff00ff', marginBottom: '0.5rem' }}>✅ Estado Actual</h4>
              <p style={{ color: '#b0b0b0', fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>
                Manifest configurado, pendiente de firma
              </p>
            </div>
            <div>
              <h4 style={{ color: '#ffff00', marginBottom: '0.5rem' }}>🚀 Próximos Pasos</h4>
              <p style={{ color: '#b0b0b0', fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>
                1. Firmar manifest<br/>
                2. Redesplegar app<br/>
                3. Verificar funcionamiento
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
