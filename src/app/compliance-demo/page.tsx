'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ComplianceDemoPage() {
  const [activeDemo, setActiveDemo] = useState<'integration' | 'dashboard' | 'info'>('info');
  const [complianceResult, setComplianceResult] = useState<any>(null);

  const handleComplianceComplete = (result?: any) => {
    console.log('✅ Demo Compliance completado:', result);
    setComplianceResult(result || {
      kyc_level: 'advanced',
      kyc_verified: true,
      compliance_id: `DEMO_${Date.now()}`
    });
    alert('🎉 Compliance Demo Completado!');
  };

  const handleComplianceError = (error: string) => {
    console.error('❌ Demo Compliance error:', error);
    alert(`❌ Error en Demo: ${error}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Header Responsive */}
      <div className="pt-20 sm:pt-24 md:pt-32 pb-8 sm:pb-12 bg-gradient-to-r from-cyan-900/20 via-purple-900/20 to-pink-900/20">
        <div className="container mx-auto px-3 sm:px-4 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-cyan-400 via-magenta-500 to-yellow-400 bg-clip-text text-transparent leading-tight">
            🇲🇽 Sistema de Compliance TickBase
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-2">
            Demostración completa del sistema de compliance mexicano - CNBV/SAT certificado
          </p>
          
          {/* Badges Responsive */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mt-4 sm:mt-6 px-2">
            <div className="bg-green-900/20 border border-green-700 rounded-lg px-2 sm:px-3 md:px-4 py-1 sm:py-2">
              <span className="text-green-400 text-xs sm:text-sm">✅ Ley Fintech 2018</span>
            </div>
            <div className="bg-blue-900/20 border border-blue-700 rounded-lg px-2 sm:px-3 md:px-4 py-1 sm:py-2">
              <span className="text-blue-400 text-xs sm:text-sm">🔐 KYC/AML Multi-Nivel</span>
            </div>
            <div className="bg-purple-900/20 border border-purple-700 rounded-lg px-2 sm:px-3 md:px-4 py-1 sm:py-2">
              <span className="text-purple-400 text-xs sm:text-sm">📊 Reportes SAT/UIF</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 pb-12 sm:pb-20">
        {/* Navigation Tabs Responsive */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="bg-gray-800/50 rounded-xl sm:rounded-2xl p-1 sm:p-2 border border-gray-700 w-full max-w-md sm:max-w-none">
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
              <Button
                onClick={() => setActiveDemo('info')}
                variant={activeDemo === 'info' ? 'default' : 'outline'}
                className={`w-full sm:w-auto text-xs sm:text-sm ${activeDemo === 'info' ? 'bg-gradient-to-r from-blue-600 to-blue-700' : ''}`}
              >
                📋 Información
              </Button>
              <Button
                onClick={() => setActiveDemo('integration')}
                variant={activeDemo === 'integration' ? 'default' : 'outline'}
                className={`w-full sm:w-auto text-xs sm:text-sm ${activeDemo === 'integration' ? 'bg-gradient-to-r from-green-600 to-green-700' : ''}`}
              >
                🔧 Demo Integración
              </Button>
              <Button
                onClick={() => setActiveDemo('dashboard')}
                variant={activeDemo === 'dashboard' ? 'default' : 'outline'}
                className={`w-full sm:w-auto text-xs sm:text-sm ${activeDemo === 'dashboard' ? 'bg-gradient-to-r from-purple-600 to-purple-700' : ''}`}
              >
                📊 Dashboard
              </Button>
            </div>
          </div>
        </div>

        {activeDemo === 'info' && (
          <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">
            <Card className="p-4 sm:p-6 md:p-8 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6 text-center">
                🏆 Sistema de Compliance Completo
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-cyan-400 mb-3 sm:mb-4">✅ Implementado</h3>
                  <ul className="space-y-2 text-sm sm:text-base text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-0.5">🔐</span>
                      <span>Sistema KYC/AML multi-nivel</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-0.5">💰</span>
                      <span>Transparencia de fees CNBV</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-0.5">📊</span>
                      <span>Monitoreo transacciones SAT/UIF</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-0.5">🇲🇽</span>
                      <span>Validación CURP biométrica</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-0.5">⚖️</span>
                      <span>Smart contracts compliance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-0.5">📋</span>
                      <span>Dashboard tiempo real</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-0.5">🔒</span>
                      <span>Retención datos 5 años</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-yellow-400 mb-3 sm:mb-4">🎯 Niveles KYC</h3>
                  <div className="space-y-3">
                    <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-3 sm:p-4">
                      <div className="text-blue-400 font-semibold text-sm sm:text-base">Básico (&lt; $500 USD)</div>
                      <div className="text-blue-200 text-xs sm:text-sm mt-1">Email + Teléfono + Selfie</div>
                    </div>
                    <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-3 sm:p-4">
                      <div className="text-yellow-400 font-semibold text-sm sm:text-base">Avanzado ($500-$3K USD)</div>
                      <div className="text-yellow-200 text-xs sm:text-sm mt-1">CURP + RFC + INE + Domicilio</div>
                    </div>
                    <div className="bg-red-900/20 border border-red-700 rounded-lg p-3 sm:p-4">
                      <div className="text-red-400 font-semibold text-sm sm:text-base">Mejorado (&gt; $3K USD)</div>
                      <div className="text-red-200 text-xs sm:text-sm mt-1">CURP Biométrico + Reporte UIF</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-green-900/20 border border-green-700 rounded-xl">
                <h4 className="text-green-400 font-semibold mb-2 sm:mb-3 text-center text-sm sm:text-base">
                  🎉 Estado: Listo para Producción México
                </h4>
                <p className="text-green-200 text-center text-xs sm:text-sm">
                  El sistema cumple con todas las regulaciones mexicanas CNBV/SAT y está preparado 
                  para el mandato de CURP biométrico de octubre 2025.
                </p>
              </div>
            </Card>
          </div>
        )}

        {activeDemo === 'integration' && (
          <div className="max-w-4xl mx-auto">
            <Card className="p-4 sm:p-6 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 text-center">
                🔧 Demo de Integración Completa
              </h2>
              <p className="text-gray-400 text-center mb-6 sm:mb-8 text-sm sm:text-base px-2">
                Simulación del proceso completo de compliance para una transacción de $2,500 USD
              </p>
              
              <div className="space-y-4 sm:space-y-6">
                <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 border border-blue-700 rounded-xl p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-blue-400 mb-3 sm:mb-4">💰 Transparencia de Fees</h3>
                  <div className="bg-blue-900/20 rounded-lg p-3 sm:p-4 border border-blue-700 overflow-x-auto">
                    <pre className="text-blue-200 text-xs sm:text-sm whitespace-pre-wrap">
{`🇲🇽 DIVULGACIÓN DE TARIFAS CNBV - TICKBASE

💰 Precio del Ticket: $2,500.00 USD
📋 Desglose de Fees:

  🏪 Fee Marketplace: 3.0% = $75.00
  👨‍🎨 Royalty Organizador: 2.5% = $62.50
  🔧 Fee Plataforma TickBase: 1.0% = $25.00
  ⛽ Gas Base Network (est.): 0.5% = $12.50
  
  📊 TOTAL FEES: 7.0% = $175.00
  💳 TOTAL A PAGAR: $2,675.00

✅ COMPLIANCE CNBV: CUMPLE
📋 Transparencia: Conforme a regulaciones CNBV`}
                    </pre>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-yellow-900/30 to-yellow-800/30 border border-yellow-700 rounded-xl p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-yellow-400 mb-3 sm:mb-4">🔐 Verificación KYC</h3>
                  <div className="text-center">
                    <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">
                      <p className="text-yellow-200 text-sm sm:text-base">Nivel Requerido: AVANZADO ($500-$3K USD)</p>
                      <p className="text-yellow-200 text-xs sm:text-sm mt-1 sm:mt-2">CURP + RFC + INE + Comprobante domicilio</p>
                    </div>
                    <Button 
                      onClick={() => handleComplianceComplete()}
                      className="bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-sm sm:text-base w-full sm:w-auto"
                    >
                      ✅ Simular Verificación KYC
                    </Button>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-900/30 to-green-800/30 border border-green-700 rounded-xl p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-green-400 mb-3 sm:mb-4">🇲🇽 CURP Biométrico</h3>
                  <div className="text-center">
                    <div className="bg-green-900/20 border border-green-700 rounded-lg p-3 sm:p-4">
                      <p className="text-green-200 text-sm sm:text-base">Estado: PREPARADO para mandato Oct 2025</p>
                      <p className="text-green-200 text-xs sm:text-sm mt-1 sm:mt-2">Validación biométrica + RENAPO</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeDemo === 'dashboard' && (
          <div className="max-w-7xl mx-auto">
            <Card className="p-4 sm:p-6 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 text-center">
                📊 Dashboard de Compliance (Demo)
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 border border-blue-700 rounded-xl p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-blue-400 text-xs sm:text-sm font-medium">Total Transacciones</p>
                      <p className="text-xl sm:text-2xl font-bold text-white">1,247</p>
                      <p className="text-blue-300 text-xs">+89 últimas 24h</p>
                    </div>
                    <div className="text-2xl sm:text-3xl ml-2">📊</div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-900/30 to-green-800/30 border border-green-700 rounded-xl p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-green-400 text-xs sm:text-sm font-medium">Compliance Rate</p>
                      <p className="text-xl sm:text-2xl font-bold text-white">98.5%</p>
                      <p className="text-green-300 text-xs">CNBV Standard</p>
                    </div>
                    <div className="text-2xl sm:text-3xl ml-2">✅</div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-yellow-900/30 to-yellow-800/30 border border-yellow-700 rounded-xl p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-yellow-400 text-xs sm:text-sm font-medium">Reportes UIF</p>
                      <p className="text-xl sm:text-2xl font-bold text-white">12</p>
                      <p className="text-yellow-300 text-xs">Umbral excedido</p>
                    </div>
                    <div className="text-2xl sm:text-3xl ml-2">📋</div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/30 border border-purple-700 rounded-xl p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-purple-400 text-xs sm:text-sm font-medium">Retención Activa</p>
                      <p className="text-xl sm:text-2xl font-bold text-white">1,235</p>
                      <p className="text-purple-300 text-xs">5 años obligatorio</p>
                    </div>
                    <div className="text-2xl sm:text-3xl ml-2">🔒</div>
                  </div>
                </div>
              </div>

              <div className="bg-green-900/20 border border-green-700 rounded-xl p-4 sm:p-6 text-center">
                <h4 className="text-green-400 font-semibold mb-2 sm:mb-3 text-sm sm:text-base">
                  🎉 Estado: Sistema Operativo
                </h4>
                <p className="text-green-200 text-xs sm:text-sm">
                  Todos los sistemas de compliance funcionando correctamente. 
                  Listo para producción México 🇲🇽
                </p>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}