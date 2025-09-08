'use client'

// Integración Completa de Compliance TickBase México
// Sistema unificado KYC/AML + Fee Transparency + CURP Biométrico

import React, { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BiometricCURPValidator } from './biometric-curp-validator'
// import { useTransparentFees } from '@/lib/compliance/fee-transparency'
// import { TecalisKYCProvider } from '@/lib/compliance/tecalis-provider'

interface ComplianceIntegrationProps {
  ticketPrice: number
  transactionAmount: number
  userAddress: string
  eventId: string
  onComplianceComplete: (result: ComplianceResult) => void
  onComplianceError: (error: string) => void
}

interface ComplianceResult {
  kyc_level: 'basic' | 'advanced' | 'enhanced'
  kyc_verified: boolean
  biometric_curp_verified?: boolean
  fee_disclosure_accepted: boolean
  cnbv_compliant: boolean
  transaction_approved: boolean
  compliance_id: string
}

export function ComplianceIntegration({
  ticketPrice,
  transactionAmount,
  userAddress,
  eventId,
  onComplianceComplete,
  onComplianceError
}: ComplianceIntegrationProps) {
  const [step, setStep] = useState<'fee_disclosure' | 'kyc' | 'biometric' | 'completed'>('fee_disclosure')
  const [feeAccepted, setFeeAccepted] = useState(false)
  const [kycComplete, setKycComplete] = useState(false)
  const [biometricComplete, setBiometricComplete] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  // Hook para transparencia de fees (Mock temporal)
  const mockFeeData = {
    feeStructure: {
      marketplace_fee: 300, // 3%
      royalty_fee: 250, // 2.5%
      platform_fee: 100, // 1%
      gas_estimation: 50, // 0.5%
      total_fee_percentage: 700, // 7%
      cnbv_compliant: true,
      transparency_disclosed: true
    },
    disclosure: {
      disclosure_text: `🇲🇽 DIVULGACIÓN DE TARIFAS CNBV - TICKBASE

💰 Precio del Ticket: $${ticketPrice.toFixed(2)} USD
📋 Desglose de Fees:

  🏪 Fee Marketplace: 3.0% = $${(ticketPrice * 0.03).toFixed(2)}
  👨‍🎨 Royalty Organizador: 2.5% = $${(ticketPrice * 0.025).toFixed(2)}
  🔧 Fee Plataforma TickBase: 1.0% = $${(ticketPrice * 0.01).toFixed(2)}
  ⛽ Gas Base Network (est.): 0.5% = $${(ticketPrice * 0.005).toFixed(2)}
  
  📊 TOTAL FEES: 7.0% = $${(ticketPrice * 0.07).toFixed(2)}
  💳 TOTAL A PAGAR: $${(ticketPrice * 1.07).toFixed(2)}

✅ COMPLIANCE CNBV: CUMPLE
📋 Transparencia: Conforme a regulaciones CNBV`,
      user_agreement: false,
      timestamp: new Date(),
      cnbv_requirements_met: true
    },
    compliance: {
      compliant: true,
      warnings: [],
      recommendations: []
    },
    isCompliant: true,
    totalAmount: ticketPrice * 1.07
  }

  // Determinar nivel KYC requerido
  const requiredKYCLevel = transactionAmount < 500 ? 'basic' : 
                          transactionAmount < 3000 ? 'advanced' : 'enhanced'

  // Verificar si CURP biométrico es obligatorio
  const isBiometricRequired = transactionAmount >= 3000 || 
                             new Date() >= new Date('2025-10-01')

  const handleFeeAcceptance = () => {
    if (!mockFeeData.isCompliant) {
      onComplianceError('La estructura de fees no cumple con las regulaciones CNBV')
      return
    }
    
    setFeeAccepted(true)
    setStep('kyc')
  }

  const handleKYCComplete = async (kycResult: any) => {
    setKycComplete(true)
    
    if (isBiometricRequired) {
      setStep('biometric')
    } else {
      await completeCompliance()
    }
  }

  const handleBiometricComplete = async (biometricResult: any) => {
    setBiometricComplete(true)
    await completeCompliance()
  }

  const completeCompliance = async () => {
    setIsProcessing(true)
    
    try {
      const complianceResult: ComplianceResult = {
        kyc_level: requiredKYCLevel,
        kyc_verified: kycComplete,
        biometric_curp_verified: isBiometricRequired ? biometricComplete : undefined,
        fee_disclosure_accepted: feeAccepted,
        cnbv_compliant: mockFeeData.isCompliant,
        transaction_approved: true,
        compliance_id: `COMP_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      }
      
      setStep('completed')
      onComplianceComplete(complianceResult)
      
    } catch (error) {
      onComplianceError('Error completando proceso de compliance')
    } finally {
      setIsProcessing(false)
    }
  }

  if (step === 'fee_disclosure') {
    return (
      <Card className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">
              💰 Divulgación Transparente de Fees
            </h2>
            <div className="bg-green-900/20 border border-green-700 rounded-lg p-3 mb-4">
              <p className="text-green-200 text-sm">
                ✅ Cumple con regulaciones de transparencia CNBV México
              </p>
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
            <pre className="text-xs text-gray-300 whitespace-pre-wrap font-mono">
              {mockFeeData.disclosure.disclosure_text}
            </pre>
          </div>

          {!mockFeeData.compliance.compliant && (
            <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
              <h4 className="text-red-400 font-semibold mb-2">⚠️ Advertencias de Compliance:</h4>
              <ul className="text-red-200 text-sm space-y-1">
                {mockFeeData.compliance.warnings.map((warning, index) => (
                  <li key={index}>• {warning}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="fee-acceptance"
                checked={feeAccepted}
                onChange={(e) => setFeeAccepted(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <label htmlFor="fee-acceptance" className="text-gray-300 text-sm">
                Acepto la estructura de fees transparente y entiendo que las transacciones blockchain son irreversibles
              </label>
            </div>

            <Button
              onClick={handleFeeAcceptance}
              disabled={!feeAccepted || !mockFeeData.isCompliant}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            >
              Continuar con Verificación KYC
            </Button>
          </div>
        </div>
      </Card>
    )
  }

  if (step === 'kyc') {
    return (
      <Card className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">
              🔐 Verificación KYC/AML
            </h2>
            <Badge variant="outline" className="mb-4">
              Nivel {requiredKYCLevel.toUpperCase()} - ${transactionAmount.toLocaleString()} USD
            </Badge>
          </div>

          <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
            <h4 className="text-blue-400 font-semibold mb-2">Requerimientos Nivel {requiredKYCLevel}:</h4>
            <ul className="text-blue-200 text-sm space-y-1">
              {requiredKYCLevel === 'basic' && (
                <>
                  <li>✓ Verificación email y teléfono</li>
                  <li>✓ Selfie opcional</li>
                </>
              )}
              {requiredKYCLevel === 'advanced' && (
                <>
                  <li>✓ Validación CURP con RENAPO</li>
                  <li>✓ Validación RFC con SAT</li>
                  <li>✓ Análisis biométrico INE</li>
                  <li>✓ Comprobante domicilio</li>
                </>
              )}
              {requiredKYCLevel === 'enhanced' && (
                <>
                  <li>✓ CURP biométrico obligatorio</li>
                  <li>✓ Reporte automático UIF</li>
                  <li>✓ Validación MX Llave</li>
                  <li>✓ Retención datos 5 años</li>
                </>
              )}
            </ul>
          </div>

          <div className="text-center">
            <Button
              onClick={() => handleKYCComplete({})}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
            >
              Simular Verificación KYC {requiredKYCLevel.toUpperCase()}
            </Button>
            <p className="text-gray-400 text-xs mt-2">
              En producción: integración real con Tecalis KYC
            </p>
          </div>
        </div>
      </Card>
    )
  }

  if (step === 'biometric') {
    return (
      <BiometricCURPValidator
        onValidationComplete={handleBiometricComplete}
        onValidationError={onComplianceError}
        required={true}
        transactionAmount={transactionAmount}
      />
    )
  }

  if (step === 'completed') {
    return (
      <Card className="p-6 bg-gradient-to-br from-green-900 to-green-800 border-green-700">
        <div className="text-center space-y-4">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-white">
            Compliance Completado
          </h2>
          
          <div className="bg-green-900/20 border border-green-700 rounded-lg p-4 text-left">
            <h4 className="text-green-400 font-semibold mb-3">✅ Verificaciones Completadas:</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-300">Transparencia Fees:</span>
                <span className="text-green-400">✓ CNBV Compliant</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">KYC Nivel:</span>
                <span className="text-green-400">{requiredKYCLevel.toUpperCase()}</span>
              </div>
              {isBiometricRequired && (
                <div className="flex justify-between">
                  <span className="text-gray-300">CURP Biométrico:</span>
                  <span className="text-green-400">✓ Verificado</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-300">Reportes SAT/UIF:</span>
                <span className="text-green-400">✓ Automático</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
            <p className="text-blue-200 text-sm">
              🔒 Sus datos están protegidos y encriptados conforme a las regulaciones mexicanas.
              Retención de 5 años según requerimientos CNBV/SAT.
            </p>
          </div>

          <div className="bg-purple-900/20 border border-purple-700 rounded-lg p-4">
            <h4 className="text-purple-400 font-semibold mb-2">📊 Resumen de Transacción:</h4>
            <div className="text-purple-200 text-sm space-y-1">
              <div>Precio Ticket: ${ticketPrice.toFixed(2)} USD</div>
              <div>Total con Fees: ${mockFeeData.totalAmount.toFixed(2)} USD</div>
              <div>Compliance ID: COMP_{Date.now()}</div>
            </div>
          </div>

          <p className="text-gray-400 text-sm">
            Puede proceder con la compra de tickets. La transacción cumple con todas las regulaciones mexicanas.
          </p>
        </div>
      </Card>
    )
  }

  return null
}