'use client'

interface TutorialProgressProps {
  progress: number
}

export function TutorialProgress({ progress }: TutorialProgressProps) {
  const getProgressText = (progress: number) => {
    if (progress === 0) return '¡Comienza tu viaje Web3!'
    if (progress < 30) return '¡Buen comienzo! Sigue aprendiendo'
    if (progress < 70) return '¡Excelente progreso! Ya casi terminas'
    if (progress < 100) return '¡Casi listo! Solo un poco más'
    return '¡Felicidades! Has completado todos los tutoriales'
  }

  return (
    <section className="tutorial-progress">
      {/* Header del progreso */}
      <div className="progress-header">
        <h2 className="progress-title">Tu Progreso de Aprendizaje</h2>
        <div className="progress-percentage">{Math.round(progress)}%</div>
      </div>
      
      {/* Barra de progreso principal */}
      <div className="progress-bar-container">
        <div 
          className="progress-bar-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      {/* Marcadores de progreso */}
      <div className="progress-markers">
        <div className="progress-marker">
          <div className={`marker-dot ${progress >= 25 ? 'active' : ''}`}></div>
          <span className="marker-label">Básico</span>
        </div>
        <div className="progress-marker">
          <div className={`marker-dot ${progress >= 50 ? 'active' : ''}`}></div>
          <span className="marker-label">Intermedio</span>
        </div>
        <div className="progress-marker">
          <div className={`marker-dot ${progress >= 75 ? 'active' : ''}`}></div>
          <span className="marker-label">Avanzado</span>
        </div>
      </div>
      
      {/* Estadísticas detalladas */}
      <div className="progress-stats">
        <div className="progress-stat">
          <div className="stat-number">8</div>
          <div className="stat-text">Tutoriales Disponibles</div>
        </div>
        
        <div className="progress-stat">
          <div className="stat-number">{Math.round(progress / 100 * 8)}</div>
          <div className="stat-text">Completados</div>
        </div>
        
        <div className="progress-stat">
          <div className="stat-number">{8 - Math.round(progress / 100 * 8)}</div>
          <div className="stat-text">Pendientes</div>
        </div>
        
        <div className="progress-stat">
          <div className="stat-number">{progress >= 100 ? '1' : '0'}</div>
          <div className="stat-text">Certificaciones</div>
        </div>
      </div>
      
      {/* Mensaje motivacional */}
      <div className="progress-motivation">
        <p className="motivation-text">{getProgressText(progress)}</p>
      </div>
    </section>
  )
}
