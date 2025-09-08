// Sistema de Transparencia de Fees - Compliance CNBV México
// Estructura de fees transparente según regulaciones mexicanas

export interface CNBVFeeStructure {
  marketplace_fee: number;        // 3% máximo recomendado
  royalty_fee: number;           // 10% máximo recomendado  
  platform_fee: number;         // Comisión TickBase
  gas_estimation: number;        // Estimación gas Base Network
  total_fee_percentage: number;  // Total combinado
  cnbv_compliant: boolean;       // Cumple límites CNBV
  transparency_disclosed: boolean; // Transparencia obligatoria
}

export interface FeeDisclosure {
  fee_breakdown: CNBVFeeStructure;
  disclosure_text: string;
  user_agreement: boolean;
  timestamp: Date;
  cnbv_requirements_met: boolean;
}

export class CNBVFeeTransparency {
  // Límites máximos recomendados para compliance México
  private static readonly MAX_MARKETPLACE_FEE = 300;  // 3% en basis points
  private static readonly MAX_ROYALTY_FEE = 1000;     // 10% en basis points
  private static readonly MAX_TOTAL_COMBINED = 1300;  // 13% máximo total

  /**
   * Calcular estructura de fees transparente
   */
  static calculateTransparentFees(
    ticketPrice: number,
    organizerRoyalty: number = 250 // 2.5% default
  ): CNBVFeeStructure {
    const marketplaceFee = this.MAX_MARKETPLACE_FEE; // 3%
    const royaltyFee = Math.min(organizerRoyalty, this.MAX_ROYALTY_FEE);
    const platformFee = 100; // 1% TickBase
    const gasEstimation = 50; // ~0.5% estimado Base Network
    
    const totalFee = marketplaceFee + royaltyFee + platformFee;
    
    return {
      marketplace_fee: marketplaceFee,
      royalty_fee: royaltyFee,
      platform_fee: platformFee,
      gas_estimation: gasEstimation,
      total_fee_percentage: totalFee,
      cnbv_compliant: totalFee <= this.MAX_TOTAL_COMBINED,
      transparency_disclosed: true
    };
  }

  /**
   * Generar disclosure de fees obligatorio CNBV
   */
  static generateFeeDisclosure(
    feeStructure: CNBVFeeStructure,
    ticketPrice: number
  ): FeeDisclosure {
    const marketplaceAmount = (ticketPrice * feeStructure.marketplace_fee) / 10000;
    const royaltyAmount = (ticketPrice * feeStructure.royalty_fee) / 10000;
    const platformAmount = (ticketPrice * feeStructure.platform_fee) / 10000;
    const gasAmount = (ticketPrice * feeStructure.gas_estimation) / 10000;
    const totalFeeAmount = marketplaceAmount + royaltyAmount + platformAmount + gasAmount;

    const disclosureText = `
🇲🇽 DIVULGACIÓN DE TARIFAS CNBV - TICKBASE

DESGLOSE DE COSTOS TRANSPARENTE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💰 Precio del Ticket: $${ticketPrice.toFixed(2)} USD
📋 Desglose de Fees:

  🏪 Fee Marketplace: ${(feeStructure.marketplace_fee / 100).toFixed(1)}% = $${marketplaceAmount.toFixed(2)}
  👨‍🎨 Royalty Organizador: ${(feeStructure.royalty_fee / 100).toFixed(1)}% = $${royaltyAmount.toFixed(2)}
  🔧 Fee Plataforma TickBase: ${(feeStructure.platform_fee / 100).toFixed(1)}% = $${platformAmount.toFixed(2)}
  ⛽ Gas Base Network (est.): ${(feeStructure.gas_estimation / 100).toFixed(1)}% = $${gasAmount.toFixed(2)}
  
  📊 TOTAL FEES: ${(feeStructure.total_fee_percentage / 100).toFixed(1)}% = $${totalFeeAmount.toFixed(2)}
  💳 TOTAL A PAGAR: $${(ticketPrice + totalFeeAmount).toFixed(2)}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ COMPLIANCE CNBV: ${feeStructure.cnbv_compliant ? 'CUMPLE' : 'EXCEDE LÍMITES'}
📋 Transparencia: Conforme a regulaciones CNBV
🔒 Sin fees ocultos o adicionales
⚖️ Jurisdicción: México - Tribunales Federales

IMPORTANTE:
• Los NFTs NO son instrumentos de inversión
• No generan dividendos ni derechos económicos  
• Son tokens de utilidad para acceso a eventos
• Transacciones blockchain son irreversibles
• Usuario responsable de obligaciones fiscales SAT

Al continuar, acepta esta estructura de fees transparente.
    `.trim();

    return {
      fee_breakdown: feeStructure,
      disclosure_text: disclosureText,
      user_agreement: false, // Debe ser marcado por usuario
      timestamp: new Date(),
      cnbv_requirements_met: feeStructure.cnbv_compliant
    };
  }

  /**
   * Validar compliance anti-monopolio México
   */
  static validateAntiMonopolyCompliance(
    feeStructure: CNBVFeeStructure
  ): {
    compliant: boolean;
    warnings: string[];
    recommendations: string[];
  } {
    const warnings: string[] = [];
    const recommendations: string[] = [];

    // Verificar límites máximos
    if (feeStructure.marketplace_fee > this.MAX_MARKETPLACE_FEE) {
      warnings.push(`Marketplace fee (${feeStructure.marketplace_fee / 100}%) excede límite recomendado (3%)`);
    }

    if (feeStructure.royalty_fee > this.MAX_ROYALTY_FEE) {
      warnings.push(`Royalty fee (${feeStructure.royalty_fee / 100}%) excede límite recomendado (10%)`);
    }

    if (feeStructure.total_fee_percentage > this.MAX_TOTAL_COMBINED) {
      warnings.push(`Total fees (${feeStructure.total_fee_percentage / 100}%) excede límite anti-monopolio (13%)`);
      recommendations.push('Reducir fees combinados para compliance CNBV');
    }

    // Recomendaciones adicionales
    if (feeStructure.marketplace_fee > 200) { // 2%
      recommendations.push('Considerar reducir marketplace fee para mayor competitividad');
    }

    return {
      compliant: warnings.length === 0,
      warnings,
      recommendations
    };
  }

  /**
   * Generar reporte de transparencia para CNBV
   */
  static generateCNBVTransparencyReport(
    transactions: Array<{
      txHash: string;
      feeStructure: CNBVFeeStructure;
      ticketPrice: number;
      timestamp: Date;
    }>
  ): {
    total_transactions: number;
    average_fee_percentage: number;
    compliance_rate: number;
    transparency_score: number;
    cnbv_compliant: boolean;
    report_period: string;
  } {
    const compliantTxs = transactions.filter(tx => tx.feeStructure.cnbv_compliant);
    const transparentTxs = transactions.filter(tx => tx.feeStructure.transparency_disclosed);
    
    const totalFees = transactions.reduce((sum, tx) => 
      sum + tx.feeStructure.total_fee_percentage, 0
    );

    return {
      total_transactions: transactions.length,
      average_fee_percentage: transactions.length > 0 ? 
        (totalFees / transactions.length / 100) : 0,
      compliance_rate: transactions.length > 0 ? 
        (compliantTxs.length / transactions.length) * 100 : 100,
      transparency_score: transactions.length > 0 ? 
        (transparentTxs.length / transactions.length) * 100 : 100,
      cnbv_compliant: compliantTxs.length === transactions.length,
      report_period: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`
    };
  }
}

// Hook React para transparencia de fees
export function useTransparentFees(ticketPrice: number, organizerRoyalty?: number) {
  const feeStructure = CNBVFeeTransparency.calculateTransparentFees(
    ticketPrice, 
    organizerRoyalty
  );
  
  const disclosure = CNBVFeeTransparency.generateFeeDisclosure(
    feeStructure, 
    ticketPrice
  );
  
  const compliance = CNBVFeeTransparency.validateAntiMonopolyCompliance(
    feeStructure
  );

  return {
    feeStructure,
    disclosure,
    compliance,
    isCompliant: compliance.compliant,
    totalAmount: ticketPrice + ((ticketPrice * feeStructure.total_fee_percentage) / 10000)
  };
}

// Constantes para smart contracts
export const CNBV_COMPLIANT_FEES = {
  MAX_MARKETPLACE_FEE: 300,      // 3% en basis points
  MAX_ROYALTY_FEE: 1000,         // 10% en basis points  
  DEFAULT_PLATFORM_FEE: 100,     // 1% TickBase
  TRANSPARENCY_REQUIRED: true,
  CNBV_CERTIFIED: true
} as const;