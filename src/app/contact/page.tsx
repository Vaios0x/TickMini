'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast'
import '@/app/contact.css'

interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    if (name) {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simular envío del formulario
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: "Mensaje enviado",
        description: "Gracias por contactarnos. Te responderemos pronto.",
        variant: "default",
      })

      // Limpiar formulario
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al enviar el mensaje. Inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: '📍',
      title: 'Ubicación',
      content: 'Base Network, L2 Ethereum',
      description: 'Descentralizado y global'
    },
    {
      icon: '📧',
      title: 'Email',
      content: 'contacto@tickbase.com',
      description: 'Respuesta en 24 horas'
    },
    {
      icon: '💬',
      title: 'Soporte',
      content: 'soporte@tickbase.com',
      description: 'Ayuda técnica disponible'
    },
    {
      icon: '🌐',
      title: 'Website',
      content: 'tickbase.vercel.app',
      description: 'Plataforma principal'
    }
  ]

  const socialLinks = [
    {
      name: 'Twitter',
      url: 'https://twitter.com/tickbase',
      icon: '🐦',
      color: 'hover:text-blue-400'
    },
    {
      name: 'Discord',
      url: 'https://discord.gg/tickbase',
      icon: '🎮',
      color: 'hover:text-purple-400'
    },
    {
      name: 'Telegram',
      url: 'https://t.me/tickbase',
      icon: '📱',
      color: 'hover:text-blue-500'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/Vaios0x/TickBase',
      icon: '💻',
      color: 'hover:text-gray-400'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Header de la página */}
      <div className="pt-32 pb-20 bg-gradient-to-r from-cyan-900/20 via-purple-900/20 to-pink-900/20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-magenta-500 to-yellow-400 bg-clip-text text-transparent">
            Contáctanos
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            ¿Tienes preguntas sobre TickBase? ¿Quieres crear eventos NFT? 
            ¿Necesitas soporte técnico? Estamos aquí para ayudarte.
          </p>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="container mx-auto px-4 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Información de contacto */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-white">
                Información de Contacto
              </h3>
              <p className="text-gray-300 mb-8">
                TickBase es la plataforma líder en ticketing NFT sobre Base Network. 
                Conectamos organizadores con audiencias globales a través de la tecnología blockchain.
              </p>
            </div>

            {/* Tarjetas de información */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <div key={index} className="glass p-6 rounded-xl border border-gray-700 contact-info-card">
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl contact-icon">{info.icon}</div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-1">
                        {info.title}
                      </h4>
                      <p className="text-cyan-400 font-medium mb-1">
                        {info.content}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {info.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Enlaces sociales */}
            <div>
              <h4 className="text-xl font-semibold text-white mb-4">
                Síguenos en Redes Sociales
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-2xl transition-colors duration-300 ${social.color} social-link`}
                    aria-label={`Seguir en ${social.name}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Formulario de contacto */}
          <div className="glass p-8 rounded-2xl border border-gray-700 contact-form">
            <h3 className="text-2xl font-bold mb-6 text-white">
              Envíanos un Mensaje
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Nombre Completo *
                  </label>
                                     <input
                     name="name"
                     value={formData.name}
                     onChange={handleInputChange}
                     className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-cyan-400 focus:outline-none contact-input"
                     placeholder="Tu nombre completo"
                   />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                                     <input
                     name="email"
                     type="email"
                     value={formData.email}
                     onChange={handleInputChange}
                     className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-cyan-400 focus:outline-none contact-input"
                     placeholder="tu@email.com"
                   />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                  Asunto *
                </label>
                                 <input
                   name="subject"
                   value={formData.subject}
                   onChange={handleInputChange}
                   className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-cyan-400 focus:outline-none contact-input"
                   placeholder="¿En qué podemos ayudarte?"
                 />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Mensaje *
                </label>
                                 <textarea
                   name="message"
                   required
                   rows={5}
                   value={formData.message}
                   onChange={handleInputChange}
                   className="w-full px-4 py-3 bg-gray-800 border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-cyan-400 focus:outline-none resize-none contact-textarea"
                   placeholder="Cuéntanos más detalles sobre tu consulta..."
                 />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-cyan-500 to-magenta-500 hover:from-cyan-600 hover:to-magenta-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed contact-submit-btn"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Enviando...</span>
                  </div>
                ) : (
                  'Enviar Mensaje'
                )}
              </button>
            </form>

            {/* Información adicional */}
            <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-600">
              <p className="text-sm text-gray-400 text-center">
                📧 También puedes escribirnos directamente a{' '}
                <a 
                  href="mailto:contacto@tickbase.com" 
                  className="text-cyan-400 hover:text-cyan-300 underline"
                >
                  contacto@tickbase.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* FAQ rápida */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center mb-8 text-white">
            Preguntas Frecuentes
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass p-6 rounded-xl border border-gray-700 faq-card">
              <h4 className="text-lg font-semibold text-white mb-3">
                ¿Cómo creo mi primer evento NFT?
              </h4>
              <p className="text-gray-300">
                Ve a "Crear Evento" y sigue los pasos. Necesitarás conectar tu wallet y tener ETH en Base Network.
              </p>
            </div>
            
            <div className="glass p-6 rounded-xl border border-gray-700 faq-card">
              <h4 className="text-lg font-semibold text-white mb-3">
                ¿Qué wallets son compatibles?
              </h4>
              <p className="text-gray-300">
                MetaMask, Coinbase Wallet, WalletConnect y cualquier wallet compatible con EVM en Base Network.
              </p>
            </div>
            
            <div className="glass p-6 rounded-xl border border-gray-700 faq-card">
              <h4 className="text-lg font-semibold text-white mb-3">
                ¿Cuánto cuesta crear un evento?
              </h4>
              <p className="text-gray-300">
                Solo pagas las tarifas de gas de Base Network, que son muy bajas (centavos de dólar).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
