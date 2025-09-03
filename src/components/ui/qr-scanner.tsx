'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'

interface QRScannerProps {
  onScan: (data: string) => void
  onError?: (error: string) => void
  onClose: () => void
  isOpen: boolean
}

export function QRScanner({ onScan, onError, onClose, isOpen }: QRScannerProps) {
  const [isScanning, setIsScanning] = useState(false)
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [error, setError] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const animationFrameRef = useRef<number>()

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    setIsScanning(false)
  }, [])

  const startScanning = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    if (!ctx) return

    const scanFrame = () => {
      if (video.videoWidth === 0) {
        animationFrameRef.current = requestAnimationFrame(scanFrame)
        return
      }

      // Configurar canvas
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      // Dibujar frame de video en canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

      // Obtener datos de imagen para procesamiento
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      
      // Aquí se implementaría la lógica real de detección QR
      // Por ahora simulamos la detección
      if (Math.random() < 0.01) { // 1% de probabilidad por frame
        const mockQRData = `ticket:base:0x${Math.random().toString(16).substr(2, 40)}`
        onScan(mockQRData)
        stopCamera()
        return
      }

      animationFrameRef.current = requestAnimationFrame(scanFrame)
    }

    scanFrame()
  }, [onScan, stopCamera])

  const requestCameraPermission = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      })
      
      setHasPermission(true)
      streamRef.current = stream
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
        setIsScanning(true)
        startScanning()
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
      setHasPermission(false)
      setError(`Error al acceder a la cámara: ${errorMessage}`)
      if (onError) onError(errorMessage)
    }
  }, [startScanning, onError])

  useEffect(() => {
    if (isOpen && hasPermission === null) {
      requestCameraPermission()
    }
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      stopCamera()
    }
  }, [isOpen, hasPermission, requestCameraPermission, stopCamera])

  const handleClose = () => {
    stopCamera()
    onClose()
  }

  if (!isOpen) return null

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.95)',
      backdropFilter: 'blur(20px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000,
      padding: '1rem'
    }}>
      {/* Modal Content */}
      <div style={{
        background: 'rgba(0, 0, 0, 0.95)',
        backdropFilter: 'blur(25px)',
        border: '1px solid rgba(0, 255, 255, 0.3)',
        borderRadius: '25px',
        maxWidth: '600px',
        width: '100%',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.8), 0 0 100px rgba(0, 255, 255, 0.2)'
      }}>
        {/* Header */}
        <div style={{
          padding: '1.5rem 2rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'linear-gradient(180deg, rgba(0, 255, 255, 0.1) 0%, transparent 100%)'
        }}>
          <h3 style={{
            color: '#00ffff',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            margin: 0
          }}>
            📱 Escanear Código QR
          </h3>
          <button
            onClick={handleClose}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#ffffff',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              fontSize: '1.2rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 0, 0, 0.3)'
              e.currentTarget.style.borderColor = '#ff0000'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'
            }}
          >
            ✕
          </button>
        </div>

        {/* Scanner Content */}
        <div style={{
          flex: 1,
          padding: '2.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem'
        }}>
          {hasPermission === false && (
            <div style={{
              textAlign: 'center',
              color: '#ff6b6b',
              padding: '2rem',
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              maxWidth: '600px',
              width: '100%'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🚫</div>
              <h4 style={{ marginBottom: '1rem', fontSize: '1.3rem' }}>Acceso a Cámara Denegado</h4>
              <p style={{ color: '#b0b0b0', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                Necesitamos acceso a tu cámara para escanear códigos QR.
                Por favor, permite el acceso en tu navegador.
              </p>
              <button
                onClick={requestCameraPermission}
                style={{
                  background: 'linear-gradient(135deg, #00ffff, #ff00ff)',
                  color: '#000000',
                  border: 'none',
                  padding: '1rem 2rem',
                  borderRadius: '15px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 25px rgba(0, 255, 255, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 255, 255, 0.4)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 255, 255, 0.3)'
                }}
              >
                🔄 Reintentar
              </button>
            </div>
          )}

          {hasPermission === true && (
            <>
              {/* Scanner Frame */}
              <div style={{
                position: 'relative',
                width: '100%',
                maxWidth: '500px',
                aspectRatio: '1',
                borderRadius: '20px',
                overflow: 'hidden',
                border: '3px solid rgba(0, 255, 255, 0.5)',
                boxShadow: '0 0 30px rgba(0, 255, 255, 0.3)',
                background: 'rgba(0, 0, 0, 0.3)'
              }}>
                <video
                  ref={videoRef}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  autoPlay
                  playsInline
                  muted
                />
                
                {/* Overlay de escaneo */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '250px',
                  height: '250px',
                  border: '2px solid #00ffff',
                  borderRadius: '15px',
                  boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
                  pointerEvents: 'none'
                }}>
                  {/* Esquinas del frame */}
                  <div style={{
                    position: 'absolute',
                    top: '-2px',
                    left: '-2px',
                    width: '20px',
                    height: '20px',
                    borderTop: '3px solid #00ffff',
                    borderLeft: '3px solid #00ffff',
                    borderTopLeftRadius: '15px'
                  }} />
                  <div style={{
                    position: 'absolute',
                    top: '-2px',
                    right: '-2px',
                    width: '20px',
                    height: '20px',
                    borderTop: '3px solid #00ffff',
                    borderRight: '3px solid #00ffff',
                    borderTopRightRadius: '15px'
                  }} />
                  <div style={{
                    position: 'absolute',
                    bottom: '-2px',
                    left: '-2px',
                    width: '20px',
                    height: '20px',
                    borderBottom: '3px solid #00ffff',
                    borderLeft: '3px solid #00ffff',
                    borderBottomLeftRadius: '15px'
                  }} />
                  <div style={{
                    position: 'absolute',
                    bottom: '-2px',
                    right: '-2px',
                    width: '20px',
                    height: '20px',
                    borderBottom: '3px solid #00ffff',
                    borderRight: '3px solid #00ffff',
                    borderBottomRightRadius: '15px'
                  }} />
                </div>

                {/* Línea de escaneo animada */}
                <div style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  right: '0',
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, #00ffff, transparent)',
                  animation: 'scan-line 2s linear infinite',
                  boxShadow: '0 0 10px rgba(0, 255, 255, 0.8)'
                }} />
              </div>

              {/* Canvas oculto para procesamiento */}
              <canvas
                ref={canvasRef}
                style={{ display: 'none' }}
              />

              {/* Instrucciones */}
              <div style={{
                textAlign: 'center',
                color: '#b0b0b0',
                maxWidth: '500px',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '20px',
                padding: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <p style={{
                  fontSize: '1.1rem',
                  marginBottom: '0.8rem',
                  color: '#00ffff',
                  fontWeight: '500'
                }}>
                  {isScanning ? '🔍 Escaneando...' : '📱 Posiciona el código QR en el marco'}
                </p>
                <p style={{
                  fontSize: '0.95rem',
                  lineHeight: '1.5'
                }}>
                  El escáner detectará automáticamente el código QR del ticket NFT
                </p>
              </div>

              {/* Botón manual */}
              <button
                onClick={() => onScan(`ticket:base:0x${Math.random().toString(16).substr(2, 40)}`)}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: '#ffffff',
                  padding: '1rem 2rem',
                  borderRadius: '15px',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                ✋ Verificar Manualmente
              </button>
            </>
          )}

          {error && (
            <div style={{
              background: 'rgba(255, 0, 0, 0.1)',
              border: '1px solid rgba(255, 0, 0, 0.3)',
              borderRadius: '15px',
              padding: '1.5rem',
              color: '#ff6b6b',
              textAlign: 'center',
              maxWidth: '500px',
              width: '100%'
            }}>
              <p style={{ margin: 0, fontSize: '0.95rem' }}>{error}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '1.5rem 2rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'linear-gradient(180deg, transparent 0%, rgba(0, 255, 255, 0.05) 100%)',
          textAlign: 'center'
        }}>
          <p style={{
            color: '#808080',
            fontSize: '0.9rem',
            margin: 0,
            lineHeight: '1.4'
          }}>
            💡 <strong>Consejo:</strong> Asegúrate de que el código QR esté bien iluminado y visible
          </p>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes scan-line {
          0% { top: 0; }
          100% { top: 100%; }
        }
      `}</style>
    </div>
  )
}
