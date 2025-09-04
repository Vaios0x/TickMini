'use client'

import { motion } from 'framer-motion'
import { 
  MessageCircle, 
  Mail, 
  Phone, 
  Clock, 
  HelpCircle, 
  BookOpen,
  Video,
  FileText,
  Users,
  Zap,
  Star,
  Heart
} from 'lucide-react'
import './support.css'

export default function SupportPage() {
  const supportCategories = [
    {
      id: 1,
      title: 'Centro de Ayuda',
      description: 'Encuentra respuestas a las preguntas más frecuentes',
      icon: HelpCircle,
      color: '#00ffff',
      link: '#help-center'
    },
    {
      id: 2,
      title: 'Documentación',
      description: 'Guías completas y tutoriales paso a paso',
      icon: BookOpen,
      color: '#ff00ff',
      link: '/docs'
    },
    {
      id: 3,
      title: 'Video Tutoriales',
      description: 'Aprende con contenido visual interactivo',
      icon: Video,
      color: '#ffff00',
      link: '#tutorials'
    },
    {
      id: 4,
      title: 'Base de Conocimientos',
      description: 'Artículos técnicos y soluciones detalladas',
      icon: FileText,
      color: '#00ff00',
      link: '#knowledge-base'
    }
  ]

  const contactMethods = [
    {
      method: 'Email',
      value: 'support@tickbase.xyz',
      icon: Mail,
      response: 'Respuesta en 24h',
      color: '#00ffff'
    },
    {
      method: 'Chat en Vivo',
      value: 'Disponible 24/7',
      icon: MessageCircle,
      response: 'Respuesta inmediata',
      color: '#ff00ff'
    },
    {
      method: 'Telegram',
      value: '@TickBaseSupport',
      icon: Users,
      response: 'Respuesta en 2h',
      color: '#ffff00'
    }
  ]

  const faqs = [
    {
      question: '¿Cómo puedo crear mi primer evento?',
      answer: 'Sigue nuestra guía paso a paso en la sección de documentación. Es muy sencillo y solo toma unos minutos.'
    },
    {
      question: '¿Qué wallets son compatibles?',
      answer: 'Soportamos todas las wallets principales de Base Network: MetaMask, WalletConnect, Coinbase Wallet y más.'
    },
    {
      question: '¿Cómo funciona la verificación de tickets?',
      answer: 'Utiliza nuestro escáner QR integrado o ingresa el código del ticket para verificar su autenticidad en tiempo real.'
    },
    {
      question: '¿Puedo revender mis tickets?',
      answer: 'Sí, puedes revender tus tickets NFT en nuestro marketplace secundario de forma segura y transparente.'
    }
  ]

  return (
    <div className="support-container">
      {/* Hero Section */}
      <section className="support-hero">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="hero-title">
            <span className="title-gradient">Soporte</span>
            <span className="title-neon">TickBase</span>
          </h1>
          <p className="hero-description">
            Estamos aquí para ayudarte en cada paso de tu viaje con TickBase
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Disponibilidad</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">&lt;2h</span>
              <span className="stat-label">Respuesta</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">99.9%</span>
              <span className="stat-label">Satisfacción</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Support Categories */}
      <section className="support-categories">
        <div className="section-header">
          <h2>🛠️ ¿En qué podemos ayudarte?</h2>
          <p>Selecciona la opción que mejor se adapte a tu necesidad</p>
        </div>
        
        <div className="categories-grid">
          {supportCategories.map((category, index) => (
            <motion.div
              key={category.id}
              className="support-category-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                y: -10,
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              <div className="category-icon-wrapper" style={{ borderColor: category.color }}>
                <category.icon className="category-icon" style={{ color: category.color }} />
              </div>
              <h3 className="category-title">{category.title}</h3>
              <p className="category-description">{category.description}</p>
              <button className="category-btn" style={{ borderColor: category.color }}>
                Explorar
                <Zap className="btn-icon" />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Methods */}
      <section className="contact-methods">
        <div className="section-header">
          <h2>📞 Contáctanos</h2>
          <p>Elige el método que prefieras para recibir ayuda</p>
        </div>
        
        <div className="contact-grid">
          {contactMethods.map((contact, index) => (
            <motion.div
              key={contact.method}
              className="contact-card"
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="contact-icon" style={{ backgroundColor: contact.color }}>
                <contact.icon className="icon" />
              </div>
              <div className="contact-info">
                <h3 className="contact-method">{contact.method}</h3>
                <p className="contact-value">{contact.value}</p>
                <span className="response-time">{contact.response}</span>
              </div>
              <button className="contact-btn">
                Contactar
                <MessageCircle className="btn-icon" />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="section-header">
          <h2>❓ Preguntas Frecuentes</h2>
          <p>Respuestas rápidas a las dudas más comunes</p>
        </div>
        
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="faq-item"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ x: 10 }}
            >
              <div className="faq-question">
                <h3>{faq.question}</h3>
                <HelpCircle className="faq-icon" />
              </div>
              <p className="faq-answer">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Community Support */}
      <section className="community-support">
        <div className="section-header">
          <h2>🌟 Comunidad TickBase</h2>
          <p>Conecta con otros usuarios y obtén ayuda de la comunidad</p>
        </div>
        
        <div className="community-cards">
          <motion.div 
            className="community-card"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="community-icon">
              <Users className="icon-large" />
            </div>
            <h3>Grupo de Telegram</h3>
            <p>Únete a nuestra comunidad activa de usuarios y desarrolladores</p>
            <button className="community-btn">
              Unirse
              <Heart className="btn-icon" />
            </button>
          </motion.div>

          <motion.div 
            className="community-card"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="community-icon">
              <Star className="icon-large" />
            </div>
            <h3>Programa de Embajadores</h3>
            <p>Ayuda a otros usuarios y gana recompensas por tu contribución</p>
            <button className="community-btn">
              Participar
              <Zap className="btn-icon" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
