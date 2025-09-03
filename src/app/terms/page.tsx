'use client'

import * as React from 'react'
import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Header de la página */}
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

      {/* Contenido principal */}
      <div className="container mx-auto px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="glass p-8 rounded-2xl border border-gray-700">
            <div className="prose prose-invert max-w-none">
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">1. Aceptación de los Términos</h2>
                <p className="text-gray-300 mb-4">
                  Al acceder y usar TickBase ("la Plataforma"), aceptas estar sujeto a estos Términos de Servicio ("Términos"). 
                  Si no estás de acuerdo con alguna parte de estos términos, no debes usar nuestros servicios.
                </p>
                <p className="text-gray-300">
                  TickBase es operado por TickBase Team, una plataforma de ticketing NFT construida sobre Base Network.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">2. Descripción del Servicio</h2>
                
                <p className="text-gray-300 mb-4">
                  TickBase proporciona una plataforma descentralizada para:
                </p>

                <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
                  <li>Crear y gestionar eventos con tickets NFT</li>
                  <li>Comprar y vender tickets digitales verificables</li>
                  <li>Gestionar asistencia y verificación de tickets</li>
                  <li>Interactuar con smart contracts en Base Network</li>
                  <li>Conectar wallets y gestionar activos digitales</li>
                </ul>

                <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4 mt-6">
                  <p className="text-blue-200 text-sm">
                    <strong>ℹ️ Información:</strong> TickBase es una plataforma Web3 que utiliza tecnología blockchain. 
                    Las transacciones son irreversibles y se ejecutan en Base Network.
                  </p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">3. Elegibilidad y Registro</h2>
                
                <h3 className="text-2xl font-semibold text-cyan-400 mb-4">3.1 Requisitos de Edad</h3>
                <p className="text-gray-300 mb-4">
                  Debes tener al menos 18 años para usar TickBase. Si eres menor de edad, solo puedes usar la plataforma 
                  bajo la supervisión de un padre o tutor legal.
                </p>

                <h3 className="text-2xl font-semibold text-cyan-400 mb-4">3.2 Conexión de Wallet</h3>
                <p className="text-gray-300 mb-4">
                  Para usar TickBase, debes conectar una wallet compatible con EVM (MetaMask, Coinbase Wallet, etc.). 
                  Eres responsable de mantener la seguridad de tu wallet y claves privadas.
                </p>

                <h3 className="text-2xl font-semibold text-cyan-400 mb-4">3.3 Verificación de Identidad</h3>
                <p className="text-gray-300 mb-4">
                  Podemos requerir verificación de identidad para ciertas funcionalidades o para cumplir con regulaciones legales.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">4. Uso Aceptable</h2>
                
                <h3 className="text-2xl font-semibold text-cyan-400 mb-4">4.1 Conducta Permitida</h3>
                <p className="text-gray-300 mb-4">
                  Puedes usar TickBase para:
                </p>

                <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
                  <li>Crear eventos legítimos y legales</li>
                  <li>Comprar tickets para eventos que te interesen</li>
                  <li>Gestionar tu colección de tickets NFT</li>
                  <li>Interactuar con otros usuarios de manera respetuosa</li>
                  <li>Reportar contenido inapropiado o fraudulento</li>
                </ul>

                <h3 className="text-2xl font-semibold text-cyan-400 mb-4">4.2 Conducta Prohibida</h3>
                <p className="text-gray-300 mb-4">
                  Está prohibido:
                </p>

                <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
                  <li>Usar la plataforma para actividades ilegales o fraudulentas</li>
                  <li>Crear eventos falsos o engañosos</li>
                  <li>Vender tickets a precios excesivos o especulativos</li>
                  <li>Usar bots o scripts automatizados</li>
                  <li>Intentar hackear o comprometer la seguridad</li>
                  <li>Violar derechos de propiedad intelectual</li>
                  <li>Spam o contenido malicioso</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">5. Creación y Gestión de Eventos</h2>
                
                <h3 className="text-2xl font-semibold text-cyan-400 mb-4">5.1 Responsabilidades del Organizador</h3>
                <p className="text-gray-300 mb-4">
                  Como organizador de eventos, eres responsable de:
                </p>

                <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
                  <li>Proporcionar información precisa sobre el evento</li>
                  <li>Cumplir con todas las leyes y regulaciones aplicables</li>
                  <li>Gestionar reembolsos según la política establecida</li>
                  <li>Responder consultas de los asistentes</li>
                  <li>Mantener la calidad del evento prometido</li>
                </ul>

                <h3 className="text-2xl font-semibold text-cyan-400 mb-4">5.2 Verificación de Eventos</h3>
                <p className="text-gray-300 mb-4">
                  TickBase puede verificar eventos para asegurar la calidad y legitimidad. 
                  Nos reservamos el derecho de rechazar o eliminar eventos que no cumplan con nuestros estándares.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">6. Compra y Venta de Tickets</h2>
                
                <h3 className="text-2xl font-semibold text-cyan-400 mb-4">6.1 Proceso de Compra</h3>
                <p className="text-gray-300 mb-4">
                  Al comprar tickets:
                </p>

                <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
                  <li>Confirmas que tienes fondos suficientes en tu wallet</li>
                  <li>Aceptas el precio y las condiciones del evento</li>
                  <li>Reconoces que las transacciones son irreversibles</li>
                  <li>Entiendes que los tickets son NFTs únicos</li>
                </ul>

                <h3 className="text-2xl font-semibold text-cyan-400 mb-4">6.2 Precios y Comisiones</h3>
                <p className="text-gray-300 mb-4">
                  Los precios de los tickets son establecidos por los organizadores. 
                  TickBase puede cobrar comisiones por el uso de la plataforma. 
                  Las tarifas de gas de Base Network son adicionales.
                </p>

                <h3 className="text-2xl font-semibold text-cyan-400 mb-4">6.3 Reembolsos</h3>
                <p className="text-gray-300 mb-4">
                  Las políticas de reembolso son establecidas por cada organizador. 
                  TickBase no garantiza reembolsos automáticos. 
                  Los reembolsos se procesan según los términos del evento.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">7. Propiedad Intelectual</h2>
                
                <h3 className="text-2xl font-semibold text-cyan-400 mb-4">7.1 Contenido de TickBase</h3>
                <p className="text-gray-300 mb-4">
                  TickBase y su contenido están protegidos por derechos de autor, marcas comerciales y otras leyes de propiedad intelectual. 
                  No puedes copiar, modificar o distribuir nuestro contenido sin autorización.
                </p>

                <h3 className="text-2xl font-semibold text-cyan-400 mb-4">7.2 Contenido del Usuario</h3>
                <p className="text-gray-300 mb-4">
                  Conservas los derechos sobre el contenido que subas, pero nos otorgas una licencia para usarlo 
                  en la operación de la plataforma.
                </p>

                <h3 className="text-2xl font-semibold text-cyan-400 mb-4">7.3 NFTs y Contenido Digital</h3>
                <p className="text-gray-300 mb-4">
                  Los tickets NFT pueden contener contenido protegido por derechos de autor. 
                  El uso de este contenido está sujeto a los términos del organizador del evento.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">8. Limitación de Responsabilidad</h2>
                
                <p className="text-gray-300 mb-4">
                  <strong>En la máxima medida permitida por la ley:</strong>
                </p>

                <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
                  <li>TickBase no será responsable por daños indirectos, incidentales o consecuentes</li>
                  <li>Nuestra responsabilidad total está limitada al monto pagado por nuestros servicios</li>
                  <li>No garantizamos la disponibilidad continua de la plataforma</li>
                  <li>No somos responsables por eventos cancelados o modificados por organizadores</li>
                  <li>No garantizamos la seguridad de las transacciones blockchain</li>
                </ul>

                <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4 mt-6">
                  <p className="text-yellow-200 text-sm">
                    <strong>⚠️ Importante:</strong> Las transacciones en blockchain son irreversibles. 
                    Siempre verifica los detalles antes de confirmar una transacción.
                  </p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">9. Indemnización</h2>
                
                <p className="text-gray-300 mb-4">
                  Acuerdas indemnizar y eximir de responsabilidad a TickBase, sus directores, empleados y agentes 
                  de cualquier reclamo, daño, pérdida o gasto (incluyendo honorarios legales) que surja de:
                </p>

                <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
                  <li>Tu uso de la plataforma</li>
                  <li>Tu violación de estos términos</li>
                  <li>Tu violación de derechos de terceros</li>
                  <li>Actividades fraudulentas o ilegales</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">10. Terminación</h2>
                
                <h3 className="text-2xl font-semibold text-cyan-400 mb-4">10.1 Terminación por el Usuario</h3>
                <p className="text-gray-300 mb-4">
                  Puedes cerrar tu cuenta en cualquier momento. Sin embargo, las transacciones blockchain 
                  no pueden ser revertidas.
                </p>

                <h3 className="text-2xl font-semibold text-cyan-400 mb-4">10.2 Terminación por TickBase</h3>
                <p className="text-gray-300 mb-4">
                  Podemos suspender o terminar tu acceso a la plataforma si:
                </p>

                <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
                  <li>Violas estos términos</li>
                  <li>Participas en actividades fraudulentas</li>
                  <li>Pones en riesgo la seguridad de la plataforma</li>
                  <li>No cumples con las leyes aplicables</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">11. Ley Aplicable y Jurisdicción</h2>
                
                <p className="text-gray-300 mb-4">
                  Estos términos se rigen por las leyes de la jurisdicción donde opera TickBase. 
                  Cualquier disputa será resuelta en los tribunales competentes de esa jurisdicción.
                </p>

                <p className="text-gray-300">
                  Si alguna disposición de estos términos es inválida, las demás disposiciones permanecen en pleno vigor.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">12. Cambios en los Términos</h2>
                
                <p className="text-gray-300 mb-4">
                  TickBase puede modificar estos términos en cualquier momento. Los cambios serán notificados:
                </p>

                <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
                  <li>Publicando los nuevos términos en la plataforma</li>
                  <li>Enviando notificaciones por email</li>
                  <li>Mostrando avisos prominentes en la plataforma</li>
                </ul>

                <p className="text-gray-300">
                  El uso continuado de TickBase después de los cambios constituye aceptación de los nuevos términos.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">13. Contacto</h2>
                
                <p className="text-gray-300 mb-4">
                  Si tienes preguntas sobre estos Términos de Servicio:
                </p>

                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-600">
                  <p className="text-gray-300 mb-2">
                    <strong>Email:</strong> legal@tickbase.com
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
                  Estos Términos de Servicio están relacionados con nuestra{' '}
                  <Link href="/privacy" className="text-cyan-400 hover:text-cyan-300 underline">
                    Política de Privacidad
                  </Link>{' '}
                  y{' '}
                  <Link href="/cookies" className="text-cyan-400 hover:text-cyan-300 underline">
                    Política de Cookies
                  </Link>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
