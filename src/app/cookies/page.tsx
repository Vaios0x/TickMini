'use client'

import * as React from 'react'
import Link from 'next/link'

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Header de la página */}
      <div className="pt-32 pb-20 bg-gradient-to-r from-cyan-900/20 via-purple-900/20 to-pink-900/20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-magenta-500 to-yellow-400 bg-clip-text text-transparent">
            Política de Cookies
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Información sobre el uso de cookies en TickBase
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
                <h2 className="text-3xl font-bold text-white mb-6">1. ¿Qué son las Cookies?</h2>
                <p className="text-gray-300 mb-4">
                  Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo (computadora, tablet o smartphone) 
                  cuando visitas un sitio web. Estas cookies permiten que el sitio web "recuerde" tus acciones y preferencias 
                  durante un período de tiempo.
                </p>
                <p className="text-gray-300">
                  En TickBase, utilizamos cookies para mejorar tu experiencia de usuario, analizar el tráfico del sitio 
                  y personalizar el contenido.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">2. Tipos de Cookies que Utilizamos</h2>
                
                <h3 className="text-2xl font-semibold text-cyan-400 mb-4">2.1 Cookies Esenciales</h3>
                <p className="text-gray-300 mb-4">
                  Estas cookies son necesarias para el funcionamiento básico de TickBase:
                </p>

                <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
                  <li><strong>Cookies de sesión:</strong> Mantienen tu sesión activa mientras navegas</li>
                  <li><strong>Cookies de autenticación:</strong> Recuerdan tu estado de conexión de wallet</li>
                  <li><strong>Cookies de seguridad:</strong> Protegen contra ataques y fraudes</li>
                  <li><strong>Cookies de funcionalidad:</strong> Permiten características básicas del sitio</li>
                </ul>

                <div className="bg-green-900/20 border border-green-700 rounded-lg p-4 mt-6">
                  <p className="text-green-200 text-sm">
                    <strong>✅ Importante:</strong> Las cookies esenciales no pueden ser deshabilitadas ya que son necesarias 
                    para que TickBase funcione correctamente.
                  </p>
                </div>

                <h3 className="text-2xl font-semibold text-cyan-400 mb-4">2.2 Cookies de Rendimiento</h3>
                <p className="text-gray-300 mb-4">
                  Estas cookies nos ayudan a entender cómo interactúas con TickBase:
                </p>

                <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
                  <li><strong>Cookies analíticas:</strong> Recopilan información sobre el uso del sitio</li>
                  <li><strong>Cookies de métricas:</strong> Miden el rendimiento y velocidad del sitio</li>
                  <li><strong>Cookies de error:</strong> Registran errores para mejorar la experiencia</li>
                  <li><strong>Cookies de navegación:</strong> Analizan patrones de navegación</li>
                </ul>

                <h3 className="text-2xl font-semibold text-cyan-400 mb-4">2.3 Cookies de Funcionalidad</h3>
                <p className="text-gray-300 mb-4">
                  Estas cookies mejoran tu experiencia personalizando el contenido:
                </p>

                <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
                  <li><strong>Cookies de preferencias:</strong> Recuerdan tu idioma y región</li>
                  <li><strong>Cookies de personalización:</strong> Adaptan el contenido a tus intereses</li>
                  <li><strong>Cookies de estado:</strong> Mantienen tus configuraciones</li>
                  <li><strong>Cookies de formularios:</strong> Recuerdan información ingresada</li>
                </ul>

                <h3 className="text-2xl font-semibold text-cyan-400 mb-4">2.4 Cookies de Marketing</h3>
                <p className="text-gray-300 mb-4">
                  Estas cookies se utilizan para mostrar contenido relevante:
                </p>

                <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
                  <li><strong>Cookies de publicidad:</strong> Muestran anuncios relevantes</li>
                  <li><strong>Cookies de seguimiento:</strong> Analizan la efectividad de campañas</li>
                  <li><strong>Cookies de redes sociales:</strong> Integran contenido de redes sociales</li>
                  <li><strong>Cookies de afiliados:</strong> Rastrean referencias y comisiones</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">3. Cookies de Terceros</h2>
                
                <p className="text-gray-300 mb-4">
                  TickBase utiliza servicios de terceros que pueden establecer cookies en tu dispositivo:
                </p>

                <h3 className="text-2xl font-semibold text-cyan-400 mb-4">3.1 Servicios Analíticos</h3>
                <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
                  <li><strong>Google Analytics:</strong> Análisis del tráfico y comportamiento del usuario</li>
                  <li><strong>Mixpanel:</strong> Seguimiento de eventos y conversiones</li>
                  <li><strong>Hotjar:</strong> Análisis de calor y grabaciones de sesión</li>
                </ul>

                <h3 className="text-2xl font-semibold text-cyan-400 mb-4">3.2 Servicios de Blockchain</h3>
                <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
                  <li><strong>Base Network:</strong> Interacción con la blockchain</li>
                  <li><strong>WalletConnect:</strong> Conexión de wallets</li>
                  <li><strong>IPFS:</strong> Almacenamiento de metadatos NFT</li>
                </ul>

                <h3 className="text-2xl font-semibold text-cyan-400 mb-4">3.3 Servicios de Marketing</h3>
                <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
                  <li><strong>Facebook Pixel:</strong> Seguimiento de conversiones</li>
                  <li><strong>Google Ads:</strong> Publicidad y remarketing</li>
                  <li><strong>Twitter Pixel:</strong> Análisis de campañas sociales</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">4. Finalidad de las Cookies</h2>
                
                <h3 className="text-2xl font-semibold text-cyan-400 mb-4">4.1 Funcionalidad del Sitio</h3>
                <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
                  <li>Mantener tu sesión activa</li>
                  <li>Recordar tus preferencias de idioma</li>
                  <li>Gestionar tu carrito de compras</li>
                  <li>Procesar transacciones de manera segura</li>
                  <li>Conectar y mantener tu wallet</li>
                </ul>

                <h3 className="text-2xl font-semibold text-cyan-400 mb-4">4.2 Análisis y Mejoras</h3>
                <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
                  <li>Analizar el uso de la plataforma</li>
                  <li>Identificar áreas de mejora</li>
                  <li>Optimizar el rendimiento del sitio</li>
                  <li>Medir la efectividad de funcionalidades</li>
                  <li>Entender el comportamiento del usuario</li>
                </ul>

                <h3 className="text-2xl font-semibold text-cyan-400 mb-4">4.3 Personalización</h3>
                <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
                  <li>Mostrar contenido relevante</li>
                  <li>Personalizar recomendaciones de eventos</li>
                  <li>Adaptar la interfaz a tus preferencias</li>
                  <li>Recordar configuraciones personalizadas</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">5. Duración de las Cookies</h2>
                
                <h3 className="text-2xl font-semibold text-cyan-400 mb-4">5.1 Cookies de Sesión</h3>
                <p className="text-gray-300 mb-4">
                  Se eliminan automáticamente cuando cierras tu navegador o cierras sesión en TickBase.
                </p>

                <h3 className="text-2xl font-semibold text-cyan-400 mb-4">5.2 Cookies Persistentes</h3>
                <p className="text-gray-300 mb-4">
                  Permanecen en tu dispositivo durante un período específico:
                </p>

                <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
                  <li><strong>Cookies de preferencias:</strong> Hasta 1 año</li>
                  <li><strong>Cookies analíticas:</strong> Hasta 2 años</li>
                  <li><strong>Cookies de marketing:</strong> Hasta 90 días</li>
                  <li><strong>Cookies de autenticación:</strong> Hasta 30 días</li>
                </ul>

                <h3 className="text-2xl font-semibold text-cyan-400 mb-4">5.3 Cookies de Terceros</h3>
                <p className="text-gray-300 mb-4">
                  La duración de las cookies de terceros está determinada por esos servicios y puede variar.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">6. Gestión de Cookies</h2>
                
                <h3 className="text-2xl font-semibold text-cyan-400 mb-4">6.1 Configuración del Navegador</h3>
                <p className="text-gray-300 mb-4">
                  Puedes gestionar las cookies a través de la configuración de tu navegador:
                </p>

                <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
                  <li><strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies</li>
                  <li><strong>Firefox:</strong> Opciones → Privacidad y seguridad → Cookies</li>
                  <li><strong>Safari:</strong> Preferencias → Privacidad → Cookies</li>
                  <li><strong>Edge:</strong> Configuración → Cookies y permisos del sitio</li>
                </ul>

                <h3 className="text-2xl font-semibold text-cyan-400 mb-4">6.2 Panel de Control de TickBase</h3>
                <p className="text-gray-300 mb-4">
                  Próximamente implementaremos un panel de control donde podrás:
                </p>

                <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
                  <li>Gestionar preferencias de cookies por categoría</li>
                  <li>Revisar qué cookies están activas</li>
                  <li>Eliminar cookies específicas</li>
                  <li>Configurar preferencias de privacidad</li>
                </ul>

                <h3 className="text-2xl font-semibold text-cyan-400 mb-4">6.3 Herramientas de Terceros</h3>
                <p className="text-gray-300 mb-4">
                  También puedes usar herramientas especializadas para gestionar cookies:
                </p>

                <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
                  <li><strong>AdBlock:</strong> Bloquea cookies de publicidad</li>
                  <li><strong>Ghostery:</strong> Controla cookies de rastreo</li>
                  <li><strong>Cookie AutoDelete:</strong> Elimina cookies automáticamente</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">7. Impacto de Deshabilitar Cookies</h2>
                
                <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4 mb-6">
                  <p className="text-yellow-200 text-sm">
                    <strong>⚠️ Advertencia:</strong> Deshabilitar ciertas cookies puede afectar la funcionalidad de TickBase.
                  </p>
                </div>

                <h3 className="text-2xl font-semibold text-cyan-400 mb-4">7.1 Cookies Esenciales</h3>
                <p className="text-gray-300 mb-4">
                  Si deshabilitas las cookies esenciales, TickBase no funcionará correctamente:
                </p>

                <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
                  <li>No podrás iniciar sesión</li>
                  <li>No podrás conectar tu wallet</li>
                  <li>No podrás realizar transacciones</li>
                  <li>El sitio puede mostrar errores</li>
                </ul>

                <h3 className="text-2xl font-semibold text-cyan-400 mb-4">7.2 Cookies de Funcionalidad</h3>
                <p className="text-gray-300 mb-4">
                  Deshabilitar estas cookies puede resultar en:
                </p>

                <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
                  <li>Pérdida de preferencias guardadas</li>
                  <li>Contenido no personalizado</li>
                  <li>Configuraciones reiniciadas</li>
                  <li>Experiencia menos fluida</li>
                </ul>

                <h3 className="text-2xl font-semibold text-cyan-400 mb-4">7.3 Cookies de Marketing</h3>
                <p className="text-gray-300 mb-4">
                  Deshabilitar estas cookies puede resultar en:
                </p>

                <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
                  <li>Anuncios menos relevantes</li>
                  <li>Contenido no personalizado</li>
                  <li>Menos opciones de eventos</li>
                  <li>Experiencia menos adaptada</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">8. Cookies y Blockchain</h2>
                
                <p className="text-gray-300 mb-4">
                  TickBase utiliza tecnología blockchain, lo que presenta consideraciones especiales para las cookies:
                </p>

                <h3 className="text-2xl font-semibold text-cyan-400 mb-4">8.1 Transacciones Blockchain</h3>
                <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
                  <li>Las cookies no almacenan información de transacciones</li>
                  <li>Los datos de blockchain son públicos y verificables</li>
                  <li>Las cookies solo gestionan la interfaz de usuario</li>
                  <li>La seguridad se mantiene a nivel de wallet</li>
                </ul>

                <h3 className="text-2xl font-semibold text-cyan-400 mb-4">8.2 Privacidad en Web3</h3>
                <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
                  <li>Las direcciones de wallet son pseudónimas</li>
                  <li>Las cookies no vinculan wallets con identidades reales</li>
                  <li>Respetamos la privacidad de las transacciones</li>
                  <li>Implementamos medidas de anonimización</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">9. Actualizaciones de la Política</h2>
                
                <p className="text-gray-300 mb-4">
                  Esta Política de Cookies puede ser actualizada periódicamente para reflejar:
                </p>

                <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
                  <li>Cambios en la legislación de cookies</li>
                  <li>Nuevas funcionalidades de TickBase</li>
                  <li>Actualizaciones en servicios de terceros</li>
                  <li>Mejoras en la gestión de privacidad</li>
                </ul>

                <p className="text-gray-300">
                  Te notificaremos sobre cambios significativos a través de la plataforma o por email.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">10. Contacto</h2>
                
                <p className="text-gray-300 mb-4">
                  Si tienes preguntas sobre esta Política de Cookies:
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
                  Esta Política de Cookies está relacionada con nuestra{' '}
                  <Link href="/privacy" className="text-cyan-400 hover:text-cyan-300 underline">
                    Política de Privacidad
                  </Link>{' '}
                  y{' '}
                  <Link href="/terms" className="text-cyan-400 hover:text-cyan-300 underline">
                    Términos de Servicio
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
