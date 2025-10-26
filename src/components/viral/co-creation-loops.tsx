'use client'

import * as React from 'react'
import { useState, useEffect } from 'react'

interface CoCreationPost {
  id: string
  author: {
    username: string
    displayName: string
    pfpUrl: string
  }
  content: string
  type: 'event' | 'collaboration' | 'challenge' | 'remix'
  timestamp: number
  likes: number
  comments: number
  remixes: number
  isRemix?: boolean
  originalPostId?: string
  collaborators?: string[]
}

export function CoCreationLoops() {
  const [posts, setPosts] = useState<CoCreationPost[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [newPostContent, setNewPostContent] = useState('')

  useEffect(() => {
    // Cargar posts de co-creación
    const loadCoCreationPosts = () => {
      const mockPosts: CoCreationPost[] = [
        {
          id: '1',
          author: {
            username: 'eventmaster',
            displayName: 'Event Master',
            pfpUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=eventmaster'
          },
          content: '🎫 Organizando el primer Base Network NFT Concert! ¿Quién se apunta?',
          type: 'event',
          timestamp: Date.now() - 3600000,
          likes: 23,
          comments: 8,
          remixes: 5,
          collaborators: ['tickmaster', 'nftcollector', 'basefan']
        },
        {
          id: '2',
          author: {
            username: 'tickmaster',
            displayName: 'TickMaster',
            pfpUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tickmaster'
          },
          content: '🔥 Remix: Agregando soporte para tickets grupales al Base NFT Concert!',
          type: 'remix',
          timestamp: Date.now() - 1800000,
          likes: 15,
          comments: 3,
          remixes: 2,
          isRemix: true,
          originalPostId: '1'
        },
        {
          id: '3',
          author: {
            username: 'nftcollector',
            displayName: 'NFT Collector',
            pfpUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=nftcollector'
          },
          content: '💡 Challenge: Crear la colección de tickets más rara de Base Network. ¡Empezamos con 10 eventos únicos!',
          type: 'challenge',
          timestamp: Date.now() - 900000,
          likes: 31,
          comments: 12,
          remixes: 8,
          collaborators: ['eventmaster', 'basefan', 'cryptoartist']
        },
        {
          id: '4',
          author: {
            username: 'basefan',
            displayName: 'Base Fan',
            pfpUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=basefan'
          },
          content: '🎨 Colaborando en el diseño de tickets NFT para el Base Hackathon. ¡Necesitamos más artistas!',
          type: 'collaboration',
          timestamp: Date.now() - 450000,
          likes: 19,
          comments: 6,
          remixes: 3,
          collaborators: ['cryptoartist', 'designer', 'developer']
        }
      ]
      setPosts(mockPosts)
    }

    loadCoCreationPosts()
  }, [])

  const handleCreatePost = async () => {
    if (!newPostContent.trim()) return

    setIsCreating(true)
    
    // Simular creación de post
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const newPost: CoCreationPost = {
      id: Date.now().toString(),
      author: {
        username: 'currentuser',
        displayName: 'Current User',
        pfpUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=currentuser'
      },
      content: newPostContent,
      type: 'event',
      timestamp: Date.now(),
      likes: 0,
      comments: 0,
      remixes: 0
    }
    
    setPosts(prev => [newPost, ...prev])
    setNewPostContent('')
    setIsCreating(false)
  }

  const handleRemix = (originalPost: CoCreationPost) => {
    const remixContent = `🔄 Remix: ${originalPost.content}`
    setNewPostContent(remixContent)
  }

  const handleCollaborate = (post: CoCreationPost) => {
    // Simular colaboración
    setPosts(prev => prev.map(p => 
      p.id === post.id 
        ? { 
            ...p, 
            collaborators: [...(p.collaborators || []), 'currentuser'],
            comments: p.comments + 1
          }
        : p
    ))
  }

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case 'event': return '🎫'
      case 'collaboration': return '🤝'
      case 'challenge': return '🏆'
      case 'remix': return '🔄'
      default: return '📝'
    }
  }

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case 'event': return '#00ffff'
      case 'collaboration': return '#00ff00'
      case 'challenge': return '#ffaa00'
      case 'remix': return '#ff00ff'
      default: return '#b0b0b0'
    }
  }

  return (
    <div style={{
      background: 'rgba(0, 0, 0, 0.8)',
      borderRadius: 'clamp(12px, 3vw, 20px)',
      padding: 'clamp(2rem, 4vw, 3rem)',
      border: '2px solid rgba(0, 255, 255, 0.3)',
      marginBottom: 'clamp(2rem, 4vw, 3rem)'
    }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: 'clamp(2rem, 4vw, 3rem)',
        paddingBottom: 'clamp(1rem, 2vw, 1.5rem)',
        borderBottom: '2px solid rgba(0, 255, 255, 0.2)'
      }}>
        <h2 style={{
          color: '#00ffff',
          fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
          fontWeight: '700',
          margin: '0 0 clamp(1rem, 2vw, 1.5rem) 0',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          🤝 Co-Creation Loops
        </h2>
        <p style={{
          color: '#b0b0b0',
          fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
          margin: 0,
          lineHeight: 1.6
        }}>
          Colabora y construye sobre las contribuciones de otros
        </p>
      </div>

      {/* Create Post */}
      <div style={{
        background: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 'clamp(10px, 2vw, 15px)',
        padding: 'clamp(1.5rem, 3vw, 2rem)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        marginBottom: 'clamp(2rem, 4vw, 3rem)'
      }}>
        <h3 style={{
          color: '#00ffff',
          fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
          fontWeight: '700',
          margin: '0 0 clamp(1rem, 2vw, 1.5rem) 0',
          textAlign: 'center'
        }}>
          🚀 Iniciar Co-Creación
        </h3>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(1rem, 2vw, 1.5rem)'
        }}>
          <textarea
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            placeholder="¿Qué quieres crear o colaborar? Ej: 🎫 Organizando un evento NFT..."
            style={{
              width: '100%',
              minHeight: 'clamp(100px, 25vw, 120px)',
              padding: 'clamp(1rem, 2.5vw, 1.5rem)',
              background: 'rgba(0, 0, 0, 0.3)',
              border: '2px solid rgba(0, 255, 255, 0.3)',
              borderRadius: 'clamp(8px, 2vw, 12px)',
              color: '#ffffff',
              fontSize: 'clamp(0.9rem, 2.2vw, 1.1rem)',
              resize: 'vertical',
              fontFamily: 'inherit'
            }}
          />
          
          <button
            onClick={handleCreatePost}
            disabled={isCreating || !newPostContent.trim()}
            style={{
              width: '100%',
              padding: 'clamp(1rem, 2.5vw, 1.5rem)',
              background: isCreating || !newPostContent.trim()
                ? 'rgba(100, 100, 100, 0.5)'
                : 'linear-gradient(135deg, #00ffff, #0080ff)',
              border: 'none',
              borderRadius: 'clamp(8px, 2vw, 12px)',
              color: '#000000',
              fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
              fontWeight: '700',
              cursor: isCreating || !newPostContent.trim() ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
            onMouseEnter={(e) => {
              if (!isCreating && newPostContent.trim()) {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 255, 255, 0.4)'
              }
            }}
            onMouseLeave={(e) => {
              if (!isCreating && newPostContent.trim()) {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }
            }}
          >
            {isCreating ? (
              <>
                <div style={{
                  width: 'clamp(16px, 4vw, 20px)',
                  height: 'clamp(16px, 4vw, 20px)',
                  border: '2px solid rgba(0, 0, 0, 0.1)',
                  borderTop: '2px solid #000000',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  display: 'inline-block',
                  marginRight: 'clamp(0.5rem, 1.2vw, 0.8rem)'
                }} />
                Creando...
              </>
            ) : (
              '🚀 Crear Post'
            )}
          </button>
        </div>
      </div>

      {/* Posts Feed */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(1.5rem, 3vw, 2rem)'
      }}>
        {posts.map((post) => (
          <div
            key={post.id}
            style={{
              background: 'rgba(0, 0, 0, 0.5)',
              border: `2px solid ${getPostTypeColor(post.type)}40`,
              borderRadius: 'clamp(10px, 2vw, 15px)',
              padding: 'clamp(1.5rem, 3vw, 2rem)',
              transition: 'all 0.3s ease',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0, 0, 0, 0.7)'
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = `0 10px 20px ${getPostTypeColor(post.type)}20`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(0, 0, 0, 0.5)'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            {/* Post Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(0.8rem, 2vw, 1.2rem)',
              marginBottom: 'clamp(1rem, 2vw, 1.5rem)'
            }}>
              <img
                src={post.author.pfpUrl}
                alt="Avatar"
                style={{
                  width: 'clamp(40px, 10vw, 50px)',
                  height: 'clamp(40px, 10vw, 50px)',
                  borderRadius: '50%',
                  border: `2px solid ${getPostTypeColor(post.type)}`
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'clamp(0.5rem, 1.2vw, 0.8rem)',
                  marginBottom: 'clamp(0.2rem, 0.5vw, 0.4rem)'
                }}>
                  <h4 style={{
                    color: '#ffffff',
                    fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                    fontWeight: '600',
                    margin: 0
                  }}>
                    {post.author.displayName}
                  </h4>
                  <span style={{
                    color: getPostTypeColor(post.type),
                    fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                    fontWeight: '600'
                  }}>
                    {getPostTypeIcon(post.type)} {post.type.toUpperCase()}
                  </span>
                  {post.isRemix && (
                    <span style={{
                      color: '#ff00ff',
                      fontSize: 'clamp(0.7rem, 1.8vw, 0.9rem)',
                      fontWeight: '600'
                    }}>
                      🔄 REMIX
                    </span>
                  )}
                </div>
                <p style={{
                  color: '#b0b0b0',
                  fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                  margin: 0
                }}>
                  @{post.author.username} • {new Date(post.timestamp).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Post Content */}
            <div style={{
              marginBottom: 'clamp(1rem, 2vw, 1.5rem)'
            }}>
              <p style={{
                color: '#e0e0e0',
                fontSize: 'clamp(0.9rem, 2.2vw, 1.1rem)',
                lineHeight: 1.6,
                margin: 0
              }}>
                {post.content}
              </p>
            </div>

            {/* Collaborators */}
            {post.collaborators && post.collaborators.length > 0 && (
              <div style={{
                background: 'rgba(0, 255, 0, 0.1)',
                border: '1px solid rgba(0, 255, 0, 0.3)',
                borderRadius: 'clamp(6px, 1.5vw, 8px)',
                padding: 'clamp(0.8rem, 2vw, 1.2rem)',
                marginBottom: 'clamp(1rem, 2vw, 1.5rem)'
              }}>
                <h5 style={{
                  color: '#00ff00',
                  fontSize: 'clamp(0.9rem, 2.2vw, 1.1rem)',
                  fontWeight: '600',
                  margin: '0 0 clamp(0.5rem, 1.2vw, 0.8rem) 0'
                }}>
                  🤝 Colaboradores
                </h5>
                <div style={{
                  display: 'flex',
                  gap: 'clamp(0.4rem, 1vw, 0.6rem)',
                  flexWrap: 'wrap'
                }}>
                  {post.collaborators.map((collaborator, index) => (
                    <span
                      key={index}
                      style={{
                        background: 'rgba(0, 255, 0, 0.2)',
                        color: '#00ff00',
                        padding: 'clamp(0.3rem, 0.8vw, 0.5rem) clamp(0.6rem, 1.5vw, 0.8rem)',
                        borderRadius: 'clamp(4px, 1vw, 6px)',
                        fontSize: 'clamp(0.7rem, 1.8vw, 0.9rem)',
                        fontWeight: '500'
                      }}
                    >
                      @{collaborator}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Post Actions */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(1rem, 2.5vw, 1.5rem)',
              paddingTop: 'clamp(1rem, 2vw, 1.5rem)',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'clamp(0.4rem, 1vw, 0.6rem)',
                  background: 'transparent',
                  border: 'none',
                  color: '#b0b0b0',
                  fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#00ffff'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#b0b0b0'
                }}
              >
                ❤️ {post.likes}
              </button>
              
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'clamp(0.4rem, 1vw, 0.6rem)',
                  background: 'transparent',
                  border: 'none',
                  color: '#b0b0b0',
                  fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#00ff00'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#b0b0b0'
                }}
              >
                💬 {post.comments}
              </button>
              
              <button
                onClick={() => handleRemix(post)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'clamp(0.4rem, 1vw, 0.6rem)',
                  background: 'transparent',
                  border: 'none',
                  color: '#b0b0b0',
                  fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#ff00ff'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#b0b0b0'
                }}
              >
                🔄 {post.remixes}
              </button>
              
              <button
                onClick={() => handleCollaborate(post)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'clamp(0.4rem, 1vw, 0.6rem)',
                  background: 'linear-gradient(135deg, #00ff00, #0080ff)',
                  border: 'none',
                  color: '#000000',
                  fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                  fontWeight: '600',
                  padding: 'clamp(0.4rem, 1vw, 0.6rem) clamp(0.8rem, 2vw, 1.2rem)',
                  borderRadius: 'clamp(4px, 1vw, 6px)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)'
                  e.currentTarget.style.boxShadow = '0 5px 15px rgba(0, 255, 0, 0.3)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                🤝 Colaborar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
