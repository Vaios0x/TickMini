'use client'

import * as React from 'react'
import { useState, useEffect } from 'react'

interface AccountAssociation {
  header: string
  payload: string
  signature: string
}

interface ManifestData {
  accountAssociation: AccountAssociation
  miniapp: {
    version: string
    name: string
    description: string
    iconUrl: string
    homeUrl: string
    canonicalDomain: string
    requiredChains: string[]
    tags: string[]
    requiredCapabilities: string[]
  }
}

export function AccountAssociationStatus() {
  const [manifestData, setManifestData] = useState<ManifestData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSigned, setIsSigned] = useState(false)

  // Verificar el estado del manifest
  const checkManifestStatus = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/.well-known/farcaster.json')
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }
      const data = await response.json()
      setManifestData(data)
      
      // Verificar si el Account Association está firmado
      const hasSignature = data.accountAssociation?.signature && 
                          data.accountAssociation.signature !== ""
      setIsSigned(hasSignature)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setIsLoading(false)
    }
  }

  // Efecto para verificar el estado al cargar el componente
  useEffect(() => {
    checkManifestStatus()
  }, [])

  // Función para abrir Base.dev
  const openBaseDev = () => {
    window.open('https://base.dev', '_blank')
  }

  // Función para abrir Farcaster Tool
  const openFarcasterTool = () => {
    window.open('https://farcaster.xyz', '_blank')
  }

  // Función para copiar el manifest
  const copyManifest = () => {
    if (manifestData) {
      navigator.clipboard.writeText(JSON.stringify(manifestData, null, 2))
      alert('Manifest copiado al portapapeles')
    }
  }

  return (
    <div style={{
      background: 'rgba(0, 0, 0, 0.6)',
      borderRadius: 'clamp(20px, 5vw, 25px)',
      padding: 'clamp(2rem, 4vw, 3rem)',
      border: isSigned 
        ? '2px solid rgba(0, 255, 0, 0.5)' 
        : '2px solid rgba(255, 255, 0, 0.5)',
      backdropFilter: 'blur(20px)',
      marginBottom: 'clamp(2rem, 4vw, 3rem)'
    }}>
      {/* Header con estado */}
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
            color: isSigned ? '#00ff00' : '#ffff00',
            marginBottom: '0.5rem'
          }}>
            {isSigned ? '✅ Account Association Firmado' : '⚠️ Account Association Pendiente'}
          </h2>
          <p style={{
            color: '#b0b0b0',
            fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
            margin: 0
          }}>
            {isSigned 
              ? 'El manifest está firmado y listo para producción'
              : 'El manifest necesita ser firmado para funcionar como Mini App'
            }
          </p>
        </div>
        
        <div style={{
          display: 'flex',
          gap: 'clamp(0.5rem, 1vw, 1rem)',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={checkManifestStatus}
            disabled={isLoading}
            style={{
              padding: 'clamp(0.6rem, 1.5vw, 0.8rem) clamp(1rem, 2vw, 1.5rem)',
              background: isLoading 
                ? 'rgba(100, 100, 100, 0.5)' 
                : 'linear-gradient(135deg, #00ffff, #0080ff)',
              border: 'none',
              borderRadius: 'clamp(8px, 2vw, 12px)',
              color: '#000000',
              fontSize: 'clamp(0.8rem, 2vw, 1rem)',
              fontWeight: '600',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
          >
            {isLoading ? '⏳' : '🔄'}
          </button>
          
          {manifestData && (
            <button
              onClick={copyManifest}
              style={{
                padding: 'clamp(0.6rem, 1.5vw, 0.8rem) clamp(1rem, 2vw, 1.5rem)',
                background: 'linear-gradient(135deg, #ff00ff, #8000ff)',
                border: 'none',
                borderRadius: 'clamp(8px, 2vw, 12px)',
                color: '#ffffff',
                fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            >
              📋
            </button>
          )}
        </div>
      </div>

      {/* Estado del Account Association */}
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
          🔐 Account Association
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 'clamp(1rem, 2vw, 1.5rem)'
        }}>
          <div>
            <h4 style={{ color: '#00ffff', marginBottom: '0.5rem' }}>Header</h4>
            <p style={{ 
              color: manifestData?.accountAssociation?.header ? '#00ff00' : '#ff6b6b',
              fontSize: 'clamp(0.8rem, 2vw, 1rem)',
              wordBreak: 'break-all'
            }}>
              {manifestData?.accountAssociation?.header || 'No firmado'}
            </p>
          </div>
          
          <div>
            <h4 style={{ color: '#ff00ff', marginBottom: '0.5rem' }}>Payload</h4>
            <p style={{ 
              color: manifestData?.accountAssociation?.payload ? '#00ff00' : '#ff6b6b',
              fontSize: 'clamp(0.8rem, 2vw, 1rem)',
              wordBreak: 'break-all'
            }}>
              {manifestData?.accountAssociation?.payload || 'No firmado'}
            </p>
          </div>
          
          <div>
            <h4 style={{ color: '#ffff00', marginBottom: '0.5rem' }}>Signature</h4>
            <p style={{ 
              color: manifestData?.accountAssociation?.signature ? '#00ff00' : '#ff6b6b',
              fontSize: 'clamp(0.8rem, 2vw, 1rem)',
              wordBreak: 'break-all'
            }}>
              {manifestData?.accountAssociation?.signature || 'No firmado'}
            </p>
          </div>
        </div>
      </div>

      {/* Botones de acción para firmar */}
      {!isSigned && (
        <div style={{
          background: 'rgba(255, 255, 0, 0.1)',
          borderRadius: 'clamp(10px, 2vw, 15px)',
          padding: 'clamp(1.5rem, 3vw, 2rem)',
          border: '1px solid rgba(255, 255, 0, 0.3)',
          marginBottom: 'clamp(1.5rem, 3vw, 2rem)'
        }}>
          <h3 style={{
            color: '#ffff00',
            marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
            fontSize: 'clamp(1.1rem, 3vw, 1.3rem)',
            textAlign: 'center'
          }}>
            ✍️ Firmar Manifest
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'clamp(1rem, 2vw, 1.5rem)'
          }}>
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
              🚀 Base.dev (Recomendado)
            </button>
            
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
              🔮 Farcaster.xyz
            </button>
          </div>
        </div>
      )}

      {/* Información del manifest */}
      {manifestData && (
        <div style={{
          background: 'rgba(0, 0, 0, 0.4)',
          borderRadius: 'clamp(10px, 2vw, 15px)',
          padding: 'clamp(1rem, 2vw, 1.5rem)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <h3 style={{
            color: '#ffffff',
            marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
            fontSize: 'clamp(1.1rem, 3vw, 1.3rem)'
          }}>
            📱 Información de la Mini App
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'clamp(1rem, 2vw, 1.5rem)'
          }}>
            <div>
              <h4 style={{ color: '#00ffff', marginBottom: '0.5rem' }}>Nombre</h4>
              <p style={{ color: '#ffffff', fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>
                {manifestData.miniapp.name}
              </p>
            </div>
            
            <div>
              <h4 style={{ color: '#ff00ff', marginBottom: '0.5rem' }}>Versión</h4>
              <p style={{ color: '#ffffff', fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>
                {manifestData.miniapp.version}
              </p>
            </div>
            
            <div>
              <h4 style={{ color: '#ffff00', marginBottom: '0.5rem' }}>Dominio</h4>
              <p style={{ color: '#ffffff', fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>
                {manifestData.miniapp.canonicalDomain}
              </p>
            </div>
            
            <div>
              <h4 style={{ color: '#00ff00', marginBottom: '0.5rem' }}>Capacidades</h4>
              <p style={{ color: '#ffffff', fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>
                {manifestData.miniapp.requiredCapabilities.length} requeridas
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
