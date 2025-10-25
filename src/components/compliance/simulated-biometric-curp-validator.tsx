'use client'

// Validación CURP Biométrica SIMULADA - Para demostración
// No requiere cámara real ni CURP real

import React, { useState } from 'react'
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

export function SimulatedBiometricCURPValidator({
  onValidationComplete,
  onValidationError,
  required = false,
  transactionAmount
}: BiometricCURPProps) {
  const [step, setStep] = useState<'input' | 'camera' | 'processing' | 'completed'>('input')
  const [curp, setCurp] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [validationResult, setValidationResult] = useState<BiometricCURPResult | null>(null)

  // Verificar si es obligatorio según fecha y monto
  const isMandatory = required || 
    transactionAmount >= 3000 || 
    new Date() >= new Date('2025-10-01')

  const validateCURPFormat = (curp: string): boolean => {
    // Formato más flexible para simulación
    const curpRegex = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z\d]\d$/
    return curpRegex.test(curp.replace(/\s/g, '').toUpperCase())
  }

  const simulateCameraCapture = () => {
    setStep('camera')
    
    // Simular captura de cámara después de 2 segundos
    setTimeout(() => {
      setStep('processing')
      simulateBiometricValidation()
    }, 2000)
  }

  const simulateBiometricValidation = async () => {
    setIsProcessing(true)
    
    // Simular delay de procesamiento
    await new Promise(resolve => setTimeout(resolve, 3000 + Math.random() * 2000))

    try {
      // Simular resultado exitoso
      const validationResult: BiometricCURPResult = {
        curp: curp.replace(/\s/g, '').toUpperCase(),
        biometric_verified: true,
        renapo_verified: true,
        face_match_score: 0.92 + Math.random() * 0.06, // 92-98%
        liveness_passed: true,
        validation_id: `SIM_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        valid_until: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 año
        mandatory_compliance: isMandatory
      }

      setValidationResult(validationResult)
      setStep('completed')
      onValidationComplete(validationResult)

    } catch (error) {
      onValidationError('Error en simulación de validación')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleCURPSubmit = () => {
    if (!validateCURPFormat(curp)) {
      onValidationError('Formato de CURP inválido. Use formato: XXXX000000XXXXXXXX0')
      return
    }
    simulateCameraCapture()
  }

  if (step === 'input') {
    return (
      <Card className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-2">
              🇲🇽 Validación CURP Biométrica (SIMULADA)
            </h3>
            {isMandatory && (
              <div className="bg-red-900/20 border border-red-700 rounded-lg p-3 mb-4">
                <p className="text-red-200 text-sm font-semibold">
                  ⚠️ OBLIGATORIO - Transacción &gt; $3,000 USD o fecha posterior a Oct 2025
                </p>
              </div>
            )}
            <p className="text-gray-300 text-sm">
              Ingrese su CURP para validación con RENAPO (SIMULACIÓN)
            </p>
            <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-3 mt-3">
              <p className="text-yellow-200 text-xs">
                🎭 MODO SIMULACIÓN: No se requiere CURP real ni cámara
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                CURP (18 caracteres) - Formato: XXXX000000XXXXXXXX0
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
                  Formato inválido - debe seguir el patrón XXXX000000XXXXXXXX0
                </p>
              )}
            </div>

            <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
              <h4 className="text-blue-400 font-semibold mb-2">Proceso de Validación (SIMULADO):</h4>
              <ul className="text-blue-200 text-sm space-y-1">
                <li>✓ Validación formato CURP</li>
                <li>✓ Verificación con RENAPO (simulada)</li>
                <li>✓ Captura biométrica facial (simulada)</li>
                <li>✓ Detección de vida (simulada)</li>
                <li>✓ Coincidencia biométrica &gt; 85% (simulada)</li>
              </ul>
            </div>

            <Button
              onClick={handleCURPSubmit}
              disabled={!curp || !validateCURPFormat(curp)}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
            >
              🎭 Iniciar Simulación de Validación
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
            📷 Simulando Captura Biométrica
          </h3>
          <p className="text-gray-300">
            Simulando captura de imagen facial...
          </p>
          
          <div className="relative max-w-md mx-auto">
            <div className="w-full h-64 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg border-2 border-green-500 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-2">📷</div>
                <p className="text-green-400 font-semibold">Simulando Cámara</p>
                <p className="text-gray-400 text-sm">Capturando imagen...</p>
              </div>
            </div>
            
            <div className="absolute inset-0 border-4 border-green-400 rounded-lg opacity-50 animate-pulse">
              <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-green-400"></div>
              <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-green-400"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-green-400"></div>
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-green-400"></div>
            </div>
          </div>

          <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-3">
            <p className="text-yellow-200 text-xs">
              🎭 SIMULACIÓN: No se está usando cámara real
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
            🔄 Procesando Validación (SIMULADA)
          </h3>
          
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto"></div>
          
          <div className="space-y-2">
            <p className="text-gray-300">Simulando validación CURP con RENAPO...</p>
            <p className="text-gray-300">Simulando procesamiento biometría facial...</p>
            <p className="text-gray-300">Simulando verificación detección de vida...</p>
          </div>

          <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
            <p className="text-blue-200 text-sm">
              🎭 SIMULACIÓN: Este proceso está siendo simulado para demostración
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
            Validación Completada (SIMULADA)
          </h3>
          
          <div className="bg-green-900/20 border border-green-700 rounded-lg p-4 text-left">
            <h4 className="text-green-400 font-semibold mb-3">Resultados (SIMULADOS):</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-300">CURP:</span>
                <span className="text-white font-mono">{validationResult.curp}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">RENAPO:</span>
                <span className="text-green-400">✓ Verificado (simulado)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Score Biométrico:</span>
                <span className="text-white">
                  {(validationResult.face_match_score * 100).toFixed(1)}% (simulado)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Detección Vida:</span>
                <span className="text-green-400">✓ Pasó (simulado)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Válido hasta:</span>
                <span className="text-white">
                  {validationResult.valid_until.toLocaleDateString('es-MX')}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-3">
            <p className="text-yellow-200 text-xs">
              🎭 SIMULACIÓN: Todos los resultados son simulados para demostración
            </p>
          </div>
        </div>
      </Card>
    )
  }

  return null
}
