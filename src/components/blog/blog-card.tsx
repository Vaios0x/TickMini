'use client'

import { useState } from 'react'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  author: {
    name: string
    avatar: string
    role: string
  }
  publishedAt: string
  readTime: string
  image: string
  featured?: boolean
  views: number
  likes: number
}

interface BlogCardProps {
  post: BlogPost
  onLike: (postId: string) => void
}

export function BlogCard({ post, onLike }: BlogCardProps) {
  const [isLiked, setIsLiked] = useState(false)

  const handleLike = () => {
    if (!isLiked) {
      setIsLiked(true)
      onLike(post.id)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  return (
    <article className="blog-card">
      {/* Header de la card */}
      <div className="card-header">
        <div className="card-icon">{post.image}</div>
        
        <div className="card-info">
          <h3 className="card-title">{post.title}</h3>
          <p className="card-excerpt">{post.excerpt}</p>
          
          {/* Meta información */}
          <div className="card-meta">
            <div className="meta-item">
              <span className="meta-icon">⏱️</span>
              {post.readTime}
            </div>
            
            <div className="meta-item">
              <span className="meta-icon">📅</span>
              {formatDate(post.publishedAt)}
            </div>
          </div>
          
          {/* Tags */}
          <div className="card-tags">
            {post.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Información del autor */}
      <div className="card-author">
        <div className="author-avatar">{post.author.avatar}</div>
        <div className="author-info">
          <div className="author-name">{post.author.name}</div>
          <div className="author-role">{post.author.role}</div>
        </div>
      </div>
      
      {/* Estadísticas del artículo */}
      <div className="card-stats">
        <div className="stat-item">
          <div className="stat-value">{formatNumber(post.views)}</div>
          <div className="stat-label">Vistas</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-value">{formatNumber(post.likes)}</div>
          <div className="stat-label">Me gusta</div>
        </div>
      </div>
      
      {/* Acciones */}
      <div className="card-actions">
        <button className="action-button btn-read">
          📖 Leer Artículo
        </button>
        
        <button 
          className={`action-button btn-like ${isLiked ? 'liked' : ''}`}
          onClick={handleLike}
        >
          {isLiked ? '❤️' : '🤍'} {isLiked ? 'Me gusta' : 'Me gusta'}
        </button>
      </div>
    </article>
  )
}
