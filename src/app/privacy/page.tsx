'use client';

import * as React from 'react';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="pt-32 pb-20 bg-gradient-to-r from-cyan-900/20 via-purple-900/20 to-pink-900/20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-magenta-500 to-yellow-400 bg-clip-text text-transparent">
            Política de Privacidad
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Protegemos tu privacidad y datos personales en TickBase
          </p>
          <p className="text-sm text-gray-400 mt-4">
            Última actualización: {new Date().toLocaleDateString('es-ES')}
          </p>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="container mx-auto px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="glass p-8 rounded-2xl border border-gray-700">
            <div className="prose prose-invert max-w-none">
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">1. Información General</h2>
                <p className="text-gray-300 mb-4">
                  TickBase ("nosotros", "nuestra", "nos") es una plataforma de ticketing NFT construida sobre Base Network. 
                  Esta Política de Privacidad describe cómo recopilamos, usamos y protegemos tu información personal.
                </p>
                <p className="text-gray-300">
                  Al usar TickBase, aceptas las prácticas descritas en esta política.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">2. Información que Recopilamos</h2>
                
                <h3 className="text-2xl font-semibold text-cyan-400 mb-4">2.1 Información del Usuario</h3>
                <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
                  <li>Nombre y apellidos</li>
                  <li>Dirección de correo electrónico</li>
                  <li>Dirección de wallet (MetaMask, Coinbase Wallet, etc.)</li>
                  <li>Información del perfil (opcional)</li>
                </ul>

                <h3 className="text-2xl font-semibold text-cyan-400 mb-4">2.2 Información de Transacciones</h3>
                <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
                  <li>Historial de compras de tickets NFT</li>
                  <li>Eventos creados y gestionados</li>
                  <li>Interacciones con smart contracts</li>
                  <li>Direcciones de transacciones blockchain</li>
                </ul>

                <h3 className="text-2xl font-semibold text-cyan-400 mb-4">2.3 Información Técnica</h3>
                <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
                  <li>Dirección IP y ubicación geográfica</li>
                  <li>Tipo de dispositivo y navegador</li>
                  <li>Cookies y tecnologías de seguimiento</li>
                  <li>Logs del servidor y análisis de uso</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">3. Cómo Usamos tu Información</h2>
                
                <h3 className="text-2xl font-semibold text-cyan-400 mb-4">3.1 Propósitos Principales</h3>
                <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
                  <li>Proporcionar y mantener la plataforma TickBase</li>
                  <li>Procesar transacciones y gestionar tickets NFT</li>
                  <li>Conectar wallets y verificar identidades</li>
                  <li>Gestionar eventos y crear tickets</li>
                  <li>Proporcionar soporte al cliente</li>
                </ul>

                <h3 className="text-2xl font-semibold text-cyan-400 mb-4">3.2 Mejoras y Análisis</h3>
                <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
                  <li>Analizar el uso de la plataforma</li>
                  <li>Mejorar la funcionalidad y experiencia del usuario</li>
                  <li>Desarrollar nuevas características</li>
                  <li>Prevenir fraudes y abusos</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">4. Compartir Información</h2>
                
                <p className="text-gray-300 mb-4">
                  <strong>No vendemos, alquilamos ni compartimos tu información personal</strong> con terceros, excepto en las siguientes circunstancias:
                </p>

                <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
                  <li><strong>Con tu consentimiento:</strong> Solo cuando nos autorices explícitamente</li>
                  <li><strong>Proveedores de servicios:</strong> Empresas que nos ayudan a operar TickBase</li>
                  <li><strong>Cumplimiento legal:</strong> Cuando la ley lo requiera</li>
                  <li><strong>Protección de derechos:</strong> Para proteger nuestros derechos y seguridad</li>
                  <li><strong>Blockchain pública:</strong> Las transacciones NFT son visibles en Base Network</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">5. Seguridad de Datos</h2>
                
                <p className="text-gray-300 mb-4">
                  Implementamos medidas de seguridad técnicas y organizativas para proteger tu información:
                </p>

                <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
                  <li>Encriptación de datos en tránsito y en reposo</li>
                  <li>Acceso restringido a información personal</li>
                  <li>Monitoreo continuo de seguridad</li>
                  <li>Auditorías regulares de seguridad</li>
                  <li>Cumplimiento de estándares de la industria</li>
                </ul>

                <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4 mt-6">
                  <p className="text-yellow-200 text-sm">
                    <strong>⚠️ Importante:</strong> Las direcciones de wallet y transacciones blockchain son públicas por naturaleza. 
                    Nunca compartas tus claves privadas o frases semilla.
                  </p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">6. Tus Derechos</h2>
                
                <p className="text-gray-300 mb-4">Como usuario de TickBase, tienes los siguientes derechos:</p>

                <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
                  <li><strong>Acceso:</strong> Solicitar una copia de tu información personal</li>
                  <li><strong>Rectificación:</strong> Corregir información inexacta o incompleta</li>
                  <li><strong>Eliminación:</strong> Solicitar la eliminación de tu información</li>
                  <li><strong>Portabilidad:</strong> Recibir tu información en formato estructurado</li>
                  <li><strong>Oposición:</strong> Oponerte al procesamiento de tus datos</li>
                  <li><strong>Retirada del consentimiento:</strong> Revocar el consentimiento en cualquier momento</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">7. Cookies y Tecnologías de Seguimiento</h2>
                
                <p className="text-gray-300 mb-4">
                  Utilizamos cookies y tecnologías similares para mejorar tu experiencia:
                </p>

                <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
                  <li><strong>Cookies esenciales:</strong> Necesarias para el funcionamiento básico</li>
                  <li><strong>Cookies de rendimiento:</strong> Para analizar el uso y rendimiento</li>
                  <li><strong>Cookies de funcionalidad:</strong> Para recordar tus preferencias</li>
                  <li><strong>Cookies de marketing:</strong> Para mostrar contenido relevante</li>
                </ul>

                <p className="text-gray-300">
                  Puedes gestionar tus preferencias de cookies en la configuración de tu navegador.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">8. Retención de Datos</h2>
                
                <p className="text-gray-300 mb-4">
                  Conservamos tu información personal solo durante el tiempo necesario para:
                </p>

                <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
                  <li>Proporcionar nuestros servicios</li>
                  <li>Cumplir con obligaciones legales</li>
                  <li>Resolver disputas y hacer cumplir acuerdos</li>
                  <li>Mantener la seguridad de la plataforma</li>
                </ul>

                <p className="text-gray-300">
                  Los datos de transacciones blockchain se mantienen permanentemente en Base Network.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">9. Transferencias Internacionales</h2>
                
                <p className="text-gray-300 mb-4">
                  TickBase opera globalmente. Tu información puede ser transferida y procesada en países fuera de tu residencia.
                </p>

                <p className="text-gray-300">
                  Garantizamos que todas las transferencias cumplan con las leyes de protección de datos aplicables.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">10. Menores de Edad</h2>
                
                <p className="text-gray-300 mb-4">
                  TickBase no está dirigido a menores de 18 años. No recopilamos intencionalmente información personal de menores.
                </p>

                <p className="text-gray-300">
                  Si eres menor de edad, no uses esta plataforma sin el consentimiento de tus padres o tutores.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">11. Cambios en esta Política</h2>
                
                <p className="text-gray-300 mb-4">
                  Podemos actualizar esta Política de Privacidad ocasionalmente. Te notificaremos sobre cambios significativos:
                </p>

                <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
                  <li>Publicando la nueva política en TickBase</li>
                  <li>Enviando notificaciones por email</li>
                  <li>Mostrando avisos en la plataforma</li>
                </ul>

                <p className="text-gray-300">
                  El uso continuado de TickBase después de los cambios constituye aceptación de la nueva política.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">12. Contacto</h2>
                
                <p className="text-gray-300 mb-4">
                  Si tienes preguntas sobre esta Política de Privacidad o el tratamiento de tus datos:
                </p>

                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-600">
                  <p className="text-gray-300 mb-2">
                    <strong>Email:</strong> privacy@tickbase.com
                  </p>
                  <p className="text-gray-300 mb-2">
                    <strong>Soporte:</strong> soporte@tickbase.com
                  </p>
                  <p className="text-gray-300">
                    <strong>Website:</strong> tickbase.vercel.app
                  </p>
                </div>
              </section>

              <div className="mt-12 pt-8 border-t border-gray-600">
                <p className="text-gray-400 text-center text-sm">
                  Esta Política de Privacidad es parte de los{' '}
                  <Link href="/terms" className="text-cyan-400 hover:text-cyan-300 underline">
                    Términos de Servicio
                  </Link>{' '}
                  de TickBase.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
