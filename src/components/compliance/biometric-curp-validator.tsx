'use client'

// Validación CURP Biométrica - Obligatorio Octubre 2025 México
// Integración con RENAPO y sistema biométrico certificado

import React, { useState, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

interface BiometricCURPProps {
  onValidationComplete: (result: BiometricCURPResult) => void
  onValidationError: (error: string) => void
  required?: boolean
  transactionAmount: number
}

interface BiometricCURPResult {
  curp: string
  biometric_verified: boolean
  renapo_verified: boolean
  face_match_score: number
  liveness_passed: boolean
  validation_id: string
  valid_until: Date
  mandatory_compliance: boolean
}

export function BiometricCURPValidator({
  onValidationComplete,
  onValidationError,
  required = false,
  transactionAmount
}: BiometricCURPProps) {
  const [step, setStep] = useState<'input' | 'camera' | 'processing' | 'completed'>('input')
  const [curp, setCurp] = useState('')
  const [selfieData, setSelfieData] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [validationResult, setValidationResult] = useState<BiometricCURPResult | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  // Verificar si es obligatorio según fecha y monto
  const isMandatory = required || 
    transactionAmount >= 3000 || 
    new Date() >= new Date('2025-10-01')

  const validateCURPFormat = (curp: string): boolean => {
    const curpRegex = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/
    return curpRegex.test(curp.replace(/\s/g, '').toUpperCase())
  }

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user',
          width: { ideal: 640 },
          height: { ideal: 480 }
        } 
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setStep('camera')
      }
    } catch (error) {
      onValidationError('No se pudo acceder a la cámara. Verifique los permisos.')
    }
  }, [onValidationError])

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
  }, [])

  const captureSelfie = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current
      const video = videoRef.current
      const context = canvas.getContext('2d')
      
      if (context) {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        context.drawImage(video, 0, 0, canvas.width, canvas.height)
        
        const imageData = canvas.toDataURL('image/jpeg', 0.8)
        setSelfieData(imageData)
        stopCamera()
        setStep('processing')
        processBiometricValidation(imageData)
      }
    }
  }, [stopCamera])

  const processBiometricValidation = async (imageData: string) => {
    setIsProcessing(true)
    
    try {
      // Simular validación biométrica CURP con RENAPO
      const response = await fetch('/api/compliance/biometric-curp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          curp: curp.replace(/\s/g, '').toUpperCase(),
          selfie_data: imageData,
          transaction_amount: transactionAmount,
          mandatory_date: '2025-10-01'
        })
      })

      if (!response.ok) {
        throw new Error(`Validación falló: ${response.status}`)
      }

      const result = await response.json()
      
      // Validar resultado mínimo requerido
      if (result.face_match_score < 0.85) {
        throw new Error('Score biométrico insuficiente. Intente nuevamente con mejor iluminación.')
      }

      if (!result.liveness_passed) {
        throw new Error('Detección de vida falló. Asegúrese de estar presente durante la captura.')
      }

      const validationResult: BiometricCURPResult = {
        curp: curp.replace(/\s/g, '').toUpperCase(),
        biometric_verified: true,
        renapo_verified: result.renapo_match,
        face_match_score: result.face_match_score,
        liveness_passed: result.liveness_passed,
        validation_id: result.validation_id,
        valid_until: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 año
        mandatory_compliance: isMandatory
      }

      setValidationResult(validationResult)
      setStep('completed')
      onValidationComplete(validationResult)

    } catch (error) {
      onValidationError(error instanceof Error ? error.message : 'Error de validación')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleCURPSubmit = () => {
    if (!validateCURPFormat(curp)) {
      onValidationError('Formato de CURP inválido. Verifique los 18 caracteres.')
      return
    }
    startCamera()
  }

  if (step === 'input') {
    return (
      <Card className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-2">
              🇲🇽 Validación CURP Biométrica
            </h3>
            {isMandatory && (
              <div className="bg-red-900/20 border border-red-700 rounded-lg p-3 mb-4">
                <p className="text-red-200 text-sm font-semibold">
                  ⚠️ OBLIGATORIO - Transacción &gt; $3,000 USD o fecha posterior a Oct 2025
                </p>
              </div>
            )}
            <p className="text-gray-300 text-sm">
              Ingrese su CURP para validación con RENAPO
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                CURP (18 caracteres)
              </label>
              <Input
                type="text"
                value={curp}
                onChange={(e) => setCurp(e.target.value.toUpperCase())}
                placeholder="XXXX000000XXXXXXXX0"
                className="bg-gray-800 border-gray-600 text-white"
              />
              {curp && !validateCURPFormat(curp) && (
                <p className="text-red-400 text-xs mt-1">
                  Formato inválido - debe tener 18 caracteres
                </p>
              )}
            </div>

            <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
              <h4 className="text-blue-400 font-semibold mb-2">Proceso de Validación:</h4>
              <ul className="text-blue-200 text-sm space-y-1">
                <li>✓ Validación formato CURP</li>
                <li>✓ Verificación con RENAPO</li>
                <li>✓ Captura biométrica facial</li>
                <li>✓ Detección de vida (liveness)</li>
                <li>✓ Coincidencia biométrica &gt; 85%</li>
              </ul>
            </div>

            <Button
              onClick={handleCURPSubmit}
              disabled={!curp || !validateCURPFormat(curp)}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
            >
              Continuar con Validación Biométrica
            </Button>
          </div>
        </div>
      </Card>
    )
  }

  if (step === 'camera') {
    return (
      <Card className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-bold text-white">
            📷 Captura Biométrica
          </h3>
          <p className="text-gray-300">
            Posicione su rostro en el centro y mantenga una buena iluminación
          </p>
          
          <div className="relative">
            <video
              ref={videoRef}
              autoPlay
              muted
              className="w-full max-w-md mx-auto rounded-lg border-2 border-green-500"
              style={{ transform: 'scaleX(-1)' }}
            />
            <canvas ref={canvasRef} className="hidden" />
            
            <div className="absolute inset-0 border-4 border-green-400 rounded-lg opacity-50 animate-pulse max-w-md mx-auto">
              <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-green-400"></div>
              <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-green-400"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-green-400"></div>
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-green-400"></div>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={captureSelfie}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            >
              📸 Capturar Imagen
            </Button>
            
            <Button
              onClick={() => {
                stopCamera()
                setStep('input')
              }}
              variant="outline"
              className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Cancelar
            </Button>
          </div>

          <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-3">
            <p className="text-yellow-200 text-xs">
              💡 Consejos: Retire lentes, evite sombras, mire directamente a la cámara
            </p>
          </div>
        </div>
      </Card>
    )
  }

  if (step === 'processing') {
    return (
      <Card className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-bold text-white">
            🔄 Procesando Validación
          </h3>
          
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto"></div>
          
          <div className="space-y-2">
            <p className="text-gray-300">Validando CURP con RENAPO...</p>
            <p className="text-gray-300">Procesando biometría facial...</p>
            <p className="text-gray-300">Verificando detección de vida...</p>
          </div>

          <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
            <p className="text-blue-200 text-sm">
              Este proceso puede tomar hasta 30 segundos. No cierre la ventana.
            </p>
          </div>
        </div>
      </Card>
    )
  }

  if (step === 'completed' && validationResult) {
    return (
      <Card className="p-6 bg-gradient-to-br from-green-900 to-green-800 border-green-700">
        <div className="text-center space-y-4">
          <div className="text-6xl mb-4">✅</div>
          <h3 className="text-2xl font-bold text-white">
            Validación Completada
          </h3>
          
          <div className="bg-green-900/20 border border-green-700 rounded-lg p-4 text-left">
            <h4 className="text-green-400 font-semibold mb-3">Resultados:</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-300">CURP:</span>
                <span className="text-white font-mono">{validationResult.curp}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">RENAPO:</span>
                <span className={validationResult.renapo_verified ? "text-green-400" : "text-red-400"}>
                  {validationResult.renapo_verified ? "✓ Verificado" : "✗ No verificado"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Score Biométrico:</span>
                <span className="text-white">
                  {(validationResult.face_match_score * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Detección Vida:</span>
                <span className={validationResult.liveness_passed ? "text-green-400" : "text-red-400"}>
                  {validationResult.liveness_passed ? "✓ Pasó" : "✗ Falló"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Válido hasta:</span>
                <span className="text-white">
                  {validationResult.valid_until.toLocaleDateString('es-MX')}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-3">
            <p className="text-blue-200 text-xs">
              🔒 Validación almacenada de forma segura y encriptada conforme a regulaciones mexicanas
            </p>
          </div>
        </div>
      </Card>
    )
  }

  return null
}