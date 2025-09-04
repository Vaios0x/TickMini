'use client'

export function BlogHero() {
  return (
    <section className="blog-hero">
      <div className="hero-background">
        {/* Efecto de brillo superior */}
        <div className="hero-glow-top"></div>
        
        {/* Contenido principal */}
        <div className="hero-content">
          <div className="hero-icon">📝</div>
          
          <h1 className="hero-title">
            Blog Web3
            <span className="title-accent">TickBase</span>
          </h1>
          
          <p className="hero-description">
            Descubre las últimas tendencias, tutoriales y análisis del ecosistema blockchain y Web3. 
            Mantente actualizado con contenido de expertos en la industria.
          </p>
          
          {/* Estadísticas del blog */}
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-value">8</div>
              <div className="stat-label">Artículos</div>
            </div>
            
            <div className="stat-item">
              <div className="stat-value">7</div>
              <div className="stat-label">Categorías</div>
            </div>
            
            <div className="stat-item">
              <div className="stat-value">15K+</div>
              <div className="stat-label">Lectores</div>
            </div>
          </div>
          
          {/* Botones de acción */}
          <div className="hero-actions">
            <button className="btn-primary-neon">
              <span className="btn-icon">📚</span>
              Explorar Artículos
            </button>
            
            <button className="btn-secondary-neon">
              <span className="btn-icon">📧</span>
              Suscribirse
            </button>
          </div>
        </div>
        
        {/* Efectos de partículas flotantes */}
        <div className="hero-particles">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="hero-particle"
              style={{
                '--delay': `${i * 0.6}s`,
                '--size': `${Math.random() * 8 + 4}px`,
                '--x': `${Math.random() * 80 + 10}%`,
                '--y': `${Math.random() * 60 + 20}%`
              } as React.CSSProperties}
            />
          ))}
        </div>
        
        {/* Efecto de brillo inferior */}
        <div className="hero-glow-bottom"></div>
      </div>
    </section>
  )
}
