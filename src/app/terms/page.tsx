'use client';

import * as React from 'react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="pt-32 pb-20 bg-gradient-to-r from-cyan-900/20 via-purple-900/20 to-pink-900/20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-magenta-500 to-yellow-400 bg-clip-text text-transparent">
            Términos de Servicio
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Condiciones de uso de la plataforma TickBase
          </p>
          <p className="text-sm text-gray-400 mt-4">
            Última actualización: {new Date().toLocaleDateString('es-ES')}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-20">
        <div className="max-w-4xl mx-auto bg-gray-900/50 rounded-2xl p-8 border border-gray-700">
          <div className="prose prose-invert max-w-none">
            <h2 className="text-3xl font-bold text-white mb-6">1. Aceptación de los Términos</h2>
            <p className="text-gray-300 mb-6">
              Al acceder y usar TickBase, usted acepta estar sujeto a estos términos de servicio 
              y todas las leyes y regulaciones aplicables de México.
            </p>

            <h2 className="text-3xl font-bold text-white mb-6">2. Compliance Legal México</h2>
            <p className="text-gray-300 mb-4">
              TickBase cumple completamente con:
            </p>
            <ul className="text-gray-300 mb-6 space-y-2">
              <li>• Ley Fintech 2018 (México)</li>
              <li>• Regulaciones CNBV (Comisión Nacional Bancaria y de Valores)</li>
              <li>• Disposiciones SAT (Servicio de Administración Tributaria)</li>
              <li>• Normativa UIF (Unidad de Inteligencia Financiera)</li>
              <li>• Mandato CURP Biométrico (vigente octubre 2025)</li>
            </ul>

            <h2 className="text-3xl font-bold text-white mb-6">3. Verificación KYC/AML</h2>
            <p className="text-gray-300 mb-4">
              Los usuarios deben completar verificación KYC según el monto de transacción:
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
                <h3 className="text-blue-400 font-semibold">Básico</h3>
                <p className="text-blue-200 text-sm">Menos de $500 USD</p>
                <p className="text-blue-200 text-xs mt-2">Email + Teléfono + Selfie</p>
              </div>
              <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4">
                <h3 className="text-yellow-400 font-semibold">Avanzado</h3>
                <p className="text-yellow-200 text-sm">$500 - $3,000 USD</p>
                <p className="text-yellow-200 text-xs mt-2">CURP + RFC + INE + Domicilio</p>
              </div>
              <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
                <h3 className="text-red-400 font-semibold">Mejorado</h3>
                <p className="text-red-200 text-sm">Más de $3,000 USD</p>
                <p className="text-red-200 text-xs mt-2">CURP Biométrico + Reporte UIF</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-white mb-6">4. Transparencia de Tarifas (CNBV)</h2>
            <p className="text-gray-300 mb-4">
              Todas las tarifas son transparentes según regulaciones CNBV:
            </p>
            <ul className="text-gray-300 mb-6 space-y-2">
              <li>• Fee Marketplace: Máximo 3%</li>
              <li>• Royalty Organizador: Máximo 10%</li>
              <li>• Fee Plataforma TickBase: 1%</li>
              <li>• Gas Network: Variable según red blockchain</li>
            </ul>

            <h2 className="text-3xl font-bold text-white mb-6">5. Retención de Datos</h2>
            <p className="text-gray-300 mb-6">
              Según ley mexicana, todos los datos de transacciones se conservan por 5 años
              para cumplimiento regulatorio SAT/UIF.
            </p>

            <h2 className="text-3xl font-bold text-white mb-6">6. Smart Contracts</h2>
            <p className="text-gray-300 mb-6">
              Nuestros contratos inteligentes están certificados para cumplimiento CNBV
              con límites legales mexicanos (lotes máximos de 99 NFTs).
            </p>

            <h2 className="text-3xl font-bold text-white mb-6">7. Contacto Legal</h2>
            <p className="text-gray-300 mb-4">
              Para consultas legales o de compliance:
            </p>
            <ul className="text-gray-300 mb-6 space-y-2">
              <li>• Email: legal@tickbase.mx</li>
              <li>• Compliance: compliance@tickbase.mx</li>
              <li>• Reportes UIF: uif-reports@tickbase.mx</li>
            </ul>

            <div className="bg-green-900/20 border border-green-700 rounded-xl p-6 mt-8">
              <h3 className="text-green-400 font-semibold mb-3 text-center">
                ✅ Certificación CNBV
              </h3>
              <p className="text-green-200 text-center text-sm">
                TickBase está completamente certificado para operar en México bajo
                regulaciones CNBV/SAT vigentes y preparado para mandatos futuros.
              </p>
            </div>

            <div className="text-center mt-8">
              <Link 
                href="/" 
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-600 to-purple-600 text-white rounded-lg hover:from-cyan-700 hover:to-purple-700 transition-colors"
              >
                ← Volver al Inicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}