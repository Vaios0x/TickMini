// API Route para validación CURP biométrica - Compliance México
// Demo endpoint para integración con Tecalis KYC

import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { curp, selfie_data, transaction_amount, mandatory_date } = body

    // Validaciones básicas
    if (!curp || !selfie_data) {
      return NextResponse.json(
        { error: 'CURP y selfie_data son requeridos' },
        { status: 400 }
      )
    }

    // Simular validación CURP formato
    const curpRegex = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/
    
    if (!curpRegex.test(curp)) {
      return NextResponse.json(
        { error: 'Formato de CURP inválido' },
        { status: 400 }
      )
    }

    // Simular delay de procesamiento biométrico
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000))

    // Simular respuesta de validación biométrica exitosa
    const mockResponse = {
      success: true,
      renapo_match: true,
      face_match_score: 0.87 + Math.random() * 0.12, // 87-99%
      liveness_passed: true,
      validation_id: `CURP_${Date.now()}_${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      curp_verified: curp,
      timestamp: new Date().toISOString(),
      
      // Datos adicionales de compliance
      compliance_info: {
        provider: 'Tecalis KYC (Demo)',
        cnbv_certified: true,
        retention_period: '5_years',
        mexican_law_compliant: true,
        biometric_curp_mandatory: new Date() >= new Date(mandatory_date || '2025-10-01'),
        transaction_amount_usd: transaction_amount,
        kyc_level: transaction_amount >= 3000 ? 'enhanced' : 
                   transaction_amount >= 500 ? 'advanced' : 'basic'
      },

      // Metadata del proceso
      processing_info: {
        ocr_quality: 'HIGH',
        face_quality: 'HIGH',
        document_authenticity: 'VERIFIED',
        liveness_score: 0.94 + Math.random() * 0.05,
        processing_time_ms: 2000 + Math.random() * 3000
      }
    }

    // Simular algunos casos de fallo ocasionales (5% de probabilidad)
    if (Math.random() < 0.05) {
      return NextResponse.json({
        success: false,
        error: 'BIOMETRIC_MATCH_FAILED',
        message: 'Score biométrico insuficiente. Intente con mejor iluminación.',
        face_match_score: 0.70 + Math.random() * 0.14, // 70-84%
        retry_allowed: true
      }, { status: 422 })
    }

    // Simular fallo de liveness detection (3% probabilidad)
    if (Math.random() < 0.03) {
      return NextResponse.json({
        success: false,
        error: 'LIVENESS_DETECTION_FAILED',
        message: 'Detección de vida falló. Asegúrese de estar presente durante la captura.',
        liveness_passed: false,
        retry_allowed: true
      }, { status: 422 })
    }

    console.log('🇲🇽 CURP Biométrico validado:', {
      curp: curp,
      score: mockResponse.face_match_score,
      validation_id: mockResponse.validation_id,
      compliance: mockResponse.compliance_info.kyc_level
    })

    return NextResponse.json(mockResponse)

  } catch (error) {
    console.error('Error en validación CURP biométrica:', error)
    return NextResponse.json(
      { 
        error: 'INTERNAL_SERVER_ERROR',
        message: 'Error interno del servidor durante validación biométrica' 
      },
      { status: 500 }
    )
  }
}

// Endpoint GET para información de compliance
export async function GET() {
  return NextResponse.json({
    service: 'CURP Biometric Validation',
    provider: 'Tecalis KYC (Demo Mode)',
    compliance: {
      cnbv_certified: true,
      mexican_law: 'Ley Fintech 2018',
      mandatory_date: '2025-10-01',
      supported_documents: ['INE', 'Pasaporte Mexicano'],
      retention_period: '5 years',
      encryption: 'AES-256'
    },
    thresholds: {
      minimum_face_score: 0.85,
      liveness_required: true,
      max_attempts: 3
    },
    status: 'operational',
    version: '1.0.0',
    last_updated: '2025-09-08'
  })
}