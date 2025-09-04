'use client'

import { useState } from 'react'

interface Tutorial {
  id: string
  title: string
  description: string
  category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  duration: string
  tags: string[]
  image: string
  progress?: number
  completed?: boolean
}

interface TutorialCardProps {
  tutorial: Tutorial
  onComplete: (tutorialId: string) => void
  onProgress: (tutorialId: string, progress: number) => void
}

export function TutorialCard({ tutorial, onComplete, onProgress }: TutorialCardProps) {
  const [showDetails, setShowDetails] = useState(false)

  const handleProgressChange = (newProgress: number) => {
    onProgress(tutorial.id, newProgress)
  }

  const handleComplete = () => {
    onComplete(tutorial.id)
  }

  return (
    <div className="tutorial-card">
      {/* Header de la card */}
      <div className="card-header">
        <div className="card-icon">{tutorial.image}</div>
        
        <div className="card-info">
          <h3 className="card-title">{tutorial.title}</h3>
          <p className="card-description">{tutorial.description}</p>
          
          {/* Meta información */}
          <div className="card-meta">
            <div className="meta-item">
              <span className="meta-icon">⏱️</span>
              {tutorial.duration}
            </div>
            
            <div className={`difficulty-badge ${tutorial.difficulty}`}>
              {tutorial.difficulty}
            </div>
          </div>
          
          {/* Tags */}
          <div className="card-tags">
            {tutorial.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Barra de progreso */}
      <div className="card-progress">
        <div className="progress-info">
          <span className="progress-text">Progreso</span>
          <span className="progress-percent">{tutorial.progress || 0}%</span>
        </div>
        
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${tutorial.progress || 0}%` }}
          />
        </div>
      </div>
      
      {/* Acciones */}
      <div className="card-actions">
        {!tutorial.completed ? (
          <button
            className="action-button btn-start"
            onClick={() => handleProgressChange(25)}
          >
            🚀 Comenzar
          </button>
        ) : (
          <button
            className="action-button btn-review"
            onClick={() => setShowDetails(true)}
          >
            🔄 Repasar
          </button>
        )}
        
        <button
          className="action-button btn-progress"
          onClick={() => handleProgressChange(Math.min(100, (tutorial.progress || 0) + 25))}
          disabled={tutorial.completed}
        >
          +25%
        </button>
      </div>
      
      {/* Botón para mostrar detalles */}
      <button
        className="card-details-toggle"
        onClick={() => setShowDetails(!showDetails)}
      >
        📖 {showDetails ? 'Ocultar Detalles' : 'Ver Detalles'}
      </button>
      
      {/* Detalles expandidos */}
      {showDetails && (
        <div className="card-details">
          <div className="details-content">
            <h4>Contenido del Tutorial</h4>
            <ul>
              <li>Introducción y conceptos básicos</li>
              <li>Configuración del entorno</li>
              <li>Implementación paso a paso</li>
              <li>Pruebas y validación</li>
              <li>Mejores prácticas</li>
            </ul>
          </div>
          
          <div className="details-actions">
            <button
              className="btn-complete"
              onClick={handleComplete}
              disabled={tutorial.completed}
            >
              🏆 Marcar como Completado
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
