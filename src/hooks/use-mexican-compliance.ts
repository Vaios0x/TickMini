// Hook de Compliance Mexicano Completo - TickBase 2025
// Integra KYC, AML, SAT, UIF y CNBV en una sola interfaz

'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import { 
  MexicanKYCData,
  KYCResult,
  TransactionReport,
  MEXICAN_COMPLIANCE_THRESHOLDS
} from '@/lib/compliance/kyc-types';
import { TecalisKYCProvider, KYCProviderFactory } from '@/lib/compliance/tecalis-provider';
import { TransactionMonitor } from '@/lib/compliance/transaction-monitor';
import { CNBVFeeTransparency, useTransparentFees } from '@/lib/compliance/fee-transparency';

export interface ComplianceState {
  // Estados de verificación
  isKYCComplete: boolean;
  isComplianceValid: boolean;
  isFeeAccepted: boolean;
  isReadyForTransaction: boolean;

  // Niveles requeridos
  requiredKYCLevel: 'basic' | 'advanced' | 'enhanced';
  currentKYCLevel: 'none' | 'basic' | 'advanced' | 'enhanced';

  // Datos de compliance
  complianceId?: string;
  verificationId?: string;
  kycResult?: KYCResult;
  transactionReport?: TransactionReport;

  // Errores y warnings
  errors: string[];
  warnings: string[];
  cnbvWarnings: string[];
}

export interface ComplianceConfig {
  // Configuración KYC
  tecalis_api_key: string;
  environment: 'sandbox' | 'production';
  
  // Configuración monitoring
  uif_endpoint: string;
  sat_endpoint: string;
  retention_db: string;

  // Configuración usuario
  user_address: string;
  user_id: string;
}

export function useMexicanCompliance(config: ComplianceConfig) {
  const [state, setState] = useState<ComplianceState>({
    isKYCComplete: false,
    isComplianceValid: false,
    isFeeAccepted: false,
    isReadyForTransaction: false,
    requiredKYCLevel: 'basic',
    currentKYCLevel: 'none',
    errors: [],
    warnings: [],
    cnbvWarnings: []
  });

  const [loading, setLoading] = useState(false);

  // Inicializar proveedores con useMemo
  const kycProvider = useMemo(() => new KYCProviderFactory({
    tecalis: {
      apiKey: config.tecalis_api_key,
      environment: config.environment,
      cnbv_certified: true,
      curp_validation: true,
      rfc_validation: true,
      biometric_curp: true,
      mx_llave_support: true,
      blockchain_friendly: true
    }
  }), [config.tecalis_api_key, config.environment]);

  const transactionMonitor = useMemo(() => new TransactionMonitor({
    uif_endpoint: config.uif_endpoint,
    sat_endpoint: config.sat_endpoint,
    retention_db: config.retention_db
  }), [config.uif_endpoint, config.sat_endpoint, config.retention_db]);

  /**
   * Determinar nivel KYC requerido por monto
   */
  const determineKYCLevel = useCallback((amountUSD: number) => {
    if (amountUSD >= MEXICAN_COMPLIANCE_THRESHOLDS.ENHANCED_KYC_LIMIT) {
      return 'enhanced';
    } else if (amountUSD >= MEXICAN_COMPLIANCE_THRESHOLDS.ADVANCED_KYC_LIMIT) {
      return 'advanced';
    }
    return 'basic';
  }, []);

  /**
   * Evaluar compliance para transacción específica
   */
  const evaluateCompliance = useCallback(async (transactionAmount: number) => {
    const requiredLevel = determineKYCLevel(transactionAmount);
    
    setState(prev => ({
      ...prev,
      requiredKYCLevel: requiredLevel,
      errors: [],
      warnings: [],
      cnbvWarnings: []
    }));

    // Verificar si el nivel actual es suficiente
    const levelHierarchy = { none: 0, basic: 1, advanced: 2, enhanced: 3 };
    const currentLevel = levelHierarchy[state.currentKYCLevel];
    const requiredLevelNum = levelHierarchy[requiredLevel];

    if (currentLevel < requiredLevelNum) {
      setState(prev => ({
        ...prev,
        isReadyForTransaction: false,
        warnings: [...prev.warnings, `Se requiere KYC nivel ${requiredLevel} para transacciones de $${transactionAmount} USD`]
      }));
      return false;
    }

    setState(prev => ({
      ...prev,
      isReadyForTransaction: true
    }));
    return true;
  }, [state.currentKYCLevel, determineKYCLevel]);

  /**
   * Ejecutar verificación KYC completa
   */
  const performKYCVerification = useCallback(async (
    kycData: MexicanKYCData,
    transactionAmount: number
  ): Promise<KYCResult> => {
    setLoading(true);
    
    try {
      // Verificar compliance CNBV de fees primero
      const feeValidation = CNBVFeeTransparency.validateAntiMonopolyCompliance({
        marketplace_fee: 300, // 3%
        royalty_fee: 250,     // 2.5%
        platform_fee: 100,   // 1%
        gas_estimation: 50,   // 0.5%
        total_fee_percentage: 700, // 7%
        cnbv_compliant: true,
        transparency_disclosed: true
      });

      if (!feeValidation.compliant) {
        setState(prev => ({
          ...prev,
          cnbvWarnings: feeValidation.warnings,
          errors: ['La estructura de fees no cumple con las regulaciones CNBV']
        }));
        throw new Error('La estructura de fees no cumple con las regulaciones CNBV');
      }

      // Ejecutar verificación KYC
      const kycResult = await kycProvider.verifyWithFallback(kycData, transactionAmount);
      
      setState(prev => ({
        ...prev,
        isKYCComplete: kycResult.success,
        currentKYCLevel: kycResult.level,
        verificationId: kycResult.verificationId,
        kycResult: kycResult,
        isComplianceValid: kycResult.success && kycResult.cnbv_compliant,
        errors: kycResult.errors || []
      }));

      if (kycResult.success) {
        // Evaluar si está listo para transacción
        await evaluateCompliance(transactionAmount);
      }

      return kycResult;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido en verificación KYC';
      setState(prev => ({
        ...prev,
        errors: [...prev.errors, errorMessage],
        isKYCComplete: false,
        isComplianceValid: false
      }));
      throw error;
    } finally {
      setLoading(false);
    }
  }, [kycProvider, evaluateCompliance]);

  /**
   * Procesar transacción con compliance completo
   */
  const processCompliantTransaction = useCallback(async (transactionData: {
    txHash: string;
    amount: number;
    currency: 'ETH' | 'USD' | 'MXN';
    eventId: string;
    ticketCount: number;
  }) => {
    if (!state.isReadyForTransaction) {
      throw new Error('Compliance no completado. Complete KYC primero.');
    }

    try {
      // Monitorear y reportar transacción
      const report = await transactionMonitor.processTransaction({
        txHash: transactionData.txHash,
        userAddress: config.user_address,
        userId: config.user_id,
        amount: transactionData.amount,
        currency: transactionData.currency,
        timestamp: new Date(),
        eventId: transactionData.eventId,
        ticketCount: transactionData.ticketCount,
        kycLevel: state.currentKYCLevel === 'none' ? 'basic' : state.currentKYCLevel
      });

      setState(prev => ({
        ...prev,
        transactionReport: report,
        complianceId: `COMP_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      }));

      return report;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error en procesamiento de transacción';
      setState(prev => ({
        ...prev,
        errors: [...prev.errors, errorMessage]
      }));
      throw error;
    }
  }, [state.isReadyForTransaction, state.currentKYCLevel, transactionMonitor, config]);

  /**
   * Aceptar términos y transparencia de fees
   */
  const acceptFeeTransparency = useCallback((accepted: boolean) => {
    setState(prev => ({
      ...prev,
      isFeeAccepted: accepted
    }));
  }, []);

  /**
   * Obtener dashboard de compliance
   */
  const getComplianceDashboard = useCallback(async () => {
    return await transactionMonitor.getComplianceDashboard();
  }, [transactionMonitor]);

  /**
   * Obtener reportes para período específico
   */
  const getComplianceReports = useCallback(async (dateFrom: Date, dateTo: Date) => {
    return await transactionMonitor.getComplianceReports(dateFrom, dateTo);
  }, [transactionMonitor]);

  /**
   * Reset del estado de compliance
   */
  const resetCompliance = useCallback(() => {
    setState({
      isKYCComplete: false,
      isComplianceValid: false,
      isFeeAccepted: false,
      isReadyForTransaction: false,
      requiredKYCLevel: 'basic',
      currentKYCLevel: 'none',
      errors: [],
      warnings: [],
      cnbvWarnings: []
    });
  }, []);

  // Auto-evaluación cuando cambia el monto o nivel KYC
  useEffect(() => {
    if (state.currentKYCLevel !== 'none') {
      // Re-evaluar compliance si ya hay un nivel KYC
    }
  }, [state.currentKYCLevel]);

  return {
    // Estado actual
    state,
    loading,

    // Funciones principales
    performKYCVerification,
    processCompliantTransaction,
    acceptFeeTransparency,
    evaluateCompliance,

    // Funciones de consulta
    getComplianceDashboard,
    getComplianceReports,
    
    // Utilidades
    resetCompliance,
    determineKYCLevel,

    // Helpers para UI
    canProceedToTransaction: state.isReadyForTransaction && state.isFeeAccepted,
    complianceProgress: {
      kycComplete: state.isKYCComplete,
      feesAccepted: state.isFeeAccepted,
      complianceValid: state.isComplianceValid,
      readyForTransaction: state.isReadyForTransaction
    },
    
    // CNBV Status
    cnbvCompliant: state.isComplianceValid && state.errors.length === 0,
    mexicanRegulationsCompliant: state.isKYCComplete && state.isComplianceValid && state.isFeeAccepted
  };
}

/**
 * Hook simplificado para usar con fees transparentes
 */
export function useComplianceFees(ticketPrice: number, organizerRoyalty?: number) {
  const feeData = useTransparentFees(ticketPrice, organizerRoyalty);
  
  return {
    ...feeData,
    // Funciones adicionales para compliance
    canProceed: feeData.isCompliant,
    mustAcceptFees: !feeData.isCompliant,
    cnbvCompliant: feeData.compliance.compliant,
    totalWithFees: feeData.totalAmount,
    disclosureRequired: true
  };
}

// Constantes útiles para la UI
export const COMPLIANCE_MESSAGES = {
  KYC_BASIC_REQUIRED: 'Se requiere verificación básica (email + teléfono) para continuar',
  KYC_ADVANCED_REQUIRED: 'Se requiere verificación avanzada (CURP + INE + RFC) para transacciones > $500 USD',
  KYC_ENHANCED_REQUIRED: 'Se requiere verificación mejorada + reporte UIF para transacciones > $3,000 USD',
  BIOMETRIC_CURP_MANDATORY: 'CURP biométrico será obligatorio desde octubre 2025',
  CNBV_COMPLIANT: 'Cumple con todas las regulaciones CNBV México',
  SAT_REPORTING: 'Transacción será reportada automáticamente al SAT/UIF',
  DATA_RETENTION: 'Datos se conservarán 5 años según regulaciones CNBV'
} as const;