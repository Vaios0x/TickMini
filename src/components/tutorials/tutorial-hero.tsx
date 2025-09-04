'use client'

interface TutorialHeroProps {
  userProgress: number
}

export function TutorialHero({ userProgress }: TutorialHeroProps) {
  return (
    <section className="tutorial-hero">
      <div className="hero-background">
        {/* Efecto de brillo superior */}
        <div className="hero-glow-top"></div>
        
        {/* Contenido principal */}
        <div className="hero-content">
          <div className="hero-icon">📚</div>
          
          <h1 className="hero-title">
            Academia Web3
            <span className="title-accent">TickBase</span>
          </h1>
          
          <p className="hero-description">
            Domina la tecnología blockchain y Web3 con nuestros tutoriales interactivos. 
            Desde conceptos básicos hasta integraciones avanzadas con Base Network.
          </p>
          
          {/* Estadísticas del usuario */}
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-value">{Math.round(userProgress)}%</div>
              <div className="stat-label">Completado</div>
            </div>
            
            <div className="stat-item">
              <div className="stat-value">8</div>
              <div className="stat-label">Tutoriales</div>
            </div>
            
            <div className="stat-item">
              <div className="stat-value">3</div>
              <div className="stat-label">Niveles</div>
            </div>
          </div>
          
          {/* Botones de acción */}
          <div className="hero-actions">
            <button className="btn-primary-neon">
              <span className="btn-icon">🚀</span>
              Comenzar Aprendizaje
            </button>
            
            <button className="btn-secondary-neon">
              <span className="btn-icon">📖</span>
              Ver Certificaciones
            </button>
          </div>
        </div>
        
        {/* Efectos de partículas flotantes */}
        <div className="hero-particles">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="hero-particle"
              style={{
                '--delay': `${i * 0.8}s`,
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
