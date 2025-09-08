// KYC/AML Types for TickBase Mexico Compliance
// Cumplimiento CNBV 2025

export interface MexicanKYCData {
  // Nivel básico (< $3,000 USD / $56,000 MXN)
  basicVerification: {
    email: string;
    phone: string;
    selfie?: File;
    isVerified: boolean;
  };
  
  // Nivel avanzado (> $3,000 USD) - OBLIGATORIO SAT
  advancedVerification?: {
    curp: string;           // RENAPO validation
    rfc: string;            // SAT validation  
    ine_front: File;        // INE frente
    ine_back: File;         // INE reverso
    selfie: File;           // Biométrico
    address_proof: File;    // Comprobante domicilio
    biometric_match: boolean; // CURP biométrico Oct 2025
    mx_llave?: string;      // Identidad digital oficial
    isVerified: boolean;
  };
}

export interface KYCResult {
  success: boolean;
  level: 'basic' | 'advanced' | 'enhanced';
  verificationId: string;
  cnbv_compliant: boolean;
  sat_reported: boolean;
  errors?: string[];
  validUntil: Date;
}

export interface TecalisKYCConfig {
  apiKey: string;
  environment: 'sandbox' | 'production';
  cnbv_certified: true;
  curp_validation: true;
  rfc_validation: true; 
  biometric_curp: true;
  mx_llave_support: true;
  blockchain_friendly: true;
}

export interface TransactionReport {
  txHash: string;
  userId: string;
  amount: number;
  currency: string;
  timestamp: Date;
  kycLevel: string;
  sat_threshold_exceeded: boolean; // > $56,000 MXN
  uif_reported: boolean; // Unidad de Inteligencia Financiera
  retention_until: Date; // 5 años obligatorio
}

export interface ComplianceThresholds {
  BASIC_KYC_LIMIT: 500; // USD
  ADVANCED_KYC_LIMIT: 3000; // USD  
  ENHANCED_KYC_LIMIT: 12500; // USD - Enhanced level
  SAT_REPORTING_LIMIT: 56000; // MXN (~$3,000 USD)
  UIF_REPORTING_LIMIT: 56000; // MXN - Real time reporting
}

export const MEXICAN_COMPLIANCE_THRESHOLDS: ComplianceThresholds = {
  BASIC_KYC_LIMIT: 500,
  ADVANCED_KYC_LIMIT: 3000,
  ENHANCED_KYC_LIMIT: 12500,
  SAT_REPORTING_LIMIT: 56000,
  UIF_REPORTING_LIMIT: 56000
};

// Octubre 2025 - Nuevas regulaciones biométricas
export interface BiometricCURPValidation {
  curp: string;
  biometric_data: string; // Base64 encoded
  renapo_verified: boolean;
  face_match_score: number; // >= 0.85 required
  liveness_detection: boolean;
  mandatory_date: '2025-10-01'; // Fecha obligatoria
}

export interface SATReportingRequirement {
  threshold: 56000; // MXN
  report_to: 'UIF'; // Unidad de Inteligencia Financiera
  frequency: 'real_time';
  retention: '5_years';
  format: 'XML_SAT_STANDARD';
}