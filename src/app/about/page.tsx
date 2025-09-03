'use client'

import React from 'react'
import Link from 'next/link'
import './about.css'

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-content">
          <h1 className="hero-title">🌟 Sobre TickBase</h1>
          <p className="hero-description">
            La revolución del ticketing NFT en Base Network
          </p>
        </div>
      </section>

      {/* Sección Nosotros - Completamente Responsiva */}
      <section 
        className="about-us-section"
        role="region"
        aria-label="Acerca de TickBase"
      >
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="about-header">
            <h2 className="section-title about-title">
              🌟 Nuestra Historia
            </h2>
            <Link href="/" className="back-home-btn">
              ← Volver al Inicio
            </Link>
          </div>
          
          <div className="about-content">
            {/* Historia */}
            <div className="about-story">
              <div className="story-card">
                <div className="story-icon">🚀</div>
                <h3>El Inicio de una Revolución</h3>
                <p>
                  En junio de 2025, nació TickBase con una visión clara: democratizar 
                  el acceso a eventos a través de la tecnología blockchain. Comenzamos 
                  como un pequeño equipo de desarrolladores apasionados por la innovación.
                </p>
                <div className="story-date">Junio 2025</div>
              </div>
              
              <div className="story-card">
                <div className="story-icon">⚡</div>
                <h3>Innovación Constante</h3>
                <p>
                  Tres meses después, en septiembre de 2025, TickBase se ha convertido 
                  en la plataforma líder de ticketing NFT en Base Network, procesando 
                  miles de transacciones diarias.
                </p>
                <div className="story-date">Septiembre 2025</div>
              </div>
            </div>

            {/* Misión y Valores */}
            <div className="mission-values">
              <div className="mission-card">
                <h3>🎯 Nuestra Misión</h3>
                <p>
                  Crear un ecosistema de ticketing NFT accesible, transparente y revolucionario 
                  que conecte a organizadores y asistentes de eventos de manera directa, 
                  eliminando intermediarios y garantizando la autenticidad de cada ticket.
                </p>
              </div>
              
              <div className="values-grid">
                <div className="value-item">
                  <span className="value-icon">🔍</span>
                  <h4>Transparencia</h4>
                  <p>Todas las transacciones son visibles en la blockchain</p>
                </div>
                <div className="value-item">
                  <span className="value-icon">🤝</span>
                  <h4>Inclusión</h4>
                  <p>Accesible para todos, sin barreras geográficas</p>
                </div>
                <div className="value-item">
                  <span className="value-icon">💡</span>
                  <h4>Innovación</h4>
                  <p>Constantemente explorando nuevas tecnologías</p>
                </div>
                <div className="value-item">
                  <span className="value-icon">🌍</span>
                  <h4>Comunidad</h4>
                  <p>Construyendo juntos el futuro de los eventos</p>
                </div>
              </div>
            </div>

            {/* Equipo y Tecnología */}
            <div className="team-tech">
              <div className="team-section">
                <h3>👥 Nuestro Equipo</h3>
                <p>
                  Contamos con un equipo diverso de más de 15 desarrolladores, 
                  diseñadores y expertos en blockchain de 8 países diferentes, 
                  trabajando 24/7 para mantener la plataforma funcionando perfectamente.
                </p>
                <div className="team-stats">
                  <div className="stat">
                    <div className="stat-number">15+</div>
                    <div className="stat-label">Desarrolladores</div>
                  </div>
                  <div className="stat">
                    <div className="stat-number">8+</div>
                    <div className="stat-label">Países</div>
                  </div>
                  <div className="stat">
                    <div className="stat-number">24/7</div>
                    <div className="stat-label">Soporte</div>
                  </div>
                </div>
              </div>
              
              <div className="tech-section">
                <h3>🛠️ Tecnología de Vanguardia</h3>
                <p>
                  Utilizamos las tecnologías más avanzadas del ecosistema blockchain 
                  para garantizar seguridad, escalabilidad y una experiencia de usuario excepcional.
                </p>
                <div className="tech-stack">
                  <div className="tech-item">
                    <span className="tech-icon">🔗</span>
                    <span className="tech-name">Base Network</span>
                  </div>
                  <div className="tech-item">
                    <span className="tech-icon">⚡</span>
                    <span className="tech-name">L2 Scaling</span>
                  </div>
                  <div className="tech-item">
                    <span className="tech-icon">📜</span>
                    <span className="tech-name">Smart Contracts</span>
                  </div>
                  <div className="tech-item">
                    <span className="tech-icon">⚛️</span>
                    <span className="tech-name">React + Next.js</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Logros */}
            <div className="achievements">
              <h3>🏆 Logros en Solo 3 Meses</h3>
              <div className="achievements-grid">
                <div className="achievement-card">
                  <div className="achievement-icon">🎫</div>
                  <div className="achievement-number">50,000+</div>
                  <div className="achievement-label">Tickets NFT Vendidos</div>
                </div>
                <div className="achievement-card">
                  <div className="achievement-icon">🎭</div>
                  <div className="achievement-number">200+</div>
                  <div className="achievement-label">Eventos Activos</div>
                </div>
                <div className="achievement-card">
                  <div className="achievement-icon">👥</div>
                  <div className="achievement-number">15,000+</div>
                  <div className="achievement-label">Usuarios Registrados</div>
                </div>
                <div className="achievement-card">
                  <div className="achievement-icon">⚡</div>
                  <div className="achievement-number">99.9%</div>
                  <div className="achievement-label">Uptime de la Plataforma</div>
                </div>
              </div>
            </div>

            {/* Visión del Futuro */}
            <div className="future-vision">
              <h3>🔮 Visión del Futuro</h3>
              <p>
                Para 2026, TickBase se expandirá globalmente, integrando realidad virtual, 
                inteligencia artificial para la gestión de eventos, y creando experiencias 
                híbridas que combinen lo físico y lo digital de manera revolucionaria.
              </p>
              <div className="vision-features">
                <div className="vision-feature">
                  <span className="vision-icon">🌐</span>
                  <span>Expansión Global</span>
                </div>
                <div className="vision-feature">
                  <span className="vision-icon">🎮</span>
                  <span>Integración VR/AR</span>
                </div>
                <div className="vision-feature">
                  <span className="vision-icon">🤖</span>
                  <span>IA para Eventos</span>
                </div>
                <div className="vision-feature">
                  <span className="vision-icon">🌍</span>
                  <span>Eventos Híbridos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta-section">
        <div className="cta-content">
          <h2>🚀 ¿Listo para el Futuro?</h2>
          <p>
            Únete a la revolución del ticketing NFT en Base Network. 
            Experimenta la próxima generación de eventos digitales.
          </p>
          <div className="cta-buttons">
            <Link href="/events">
              <button className="btn-primary-neon">
                🎫 Explorar Eventos
              </button>
            </Link>
            <Link href="/create-event">
              <button className="btn-secondary-neon">
                🚀 Crear Evento
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
