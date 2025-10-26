'use client'

import * as React from 'react'
import { useState, useEffect } from 'react'

interface Ritual {
  id: string
  name: string
  description: string
  frequency: 'daily' | 'weekly' | 'monthly'
  icon: string
  color: string
  participants: number
  nextOccurrence: number
  isActive: boolean
  streak: number
  rewards: string[]
}

interface RitualPost {
  id: string
  ritualId: string
  author: {
    username: string
    displayName: string
    pfpUrl: string
  }
  content: string
  timestamp: number
  likes: number
  comments: number
  streak: number
}

export function LongTermRituals() {
  const [rituals, setRituals] = useState<Ritual[]>([])
  const [posts, setPosts] = useState<RitualPost[]>([])
  const [selectedRitual, setSelectedRitual] = useState<string | null>(null)

  useEffect(() => {
    // Cargar rituales
    const loadRituals = () => {
      const mockRituals: Ritual[] = [
        {
          id: '1',
          name: 'Daily Event Discovery',
          description: 'Comparte un evento que descubriste hoy',
          frequency: 'daily',
          icon: '🔍',
          color: '#00ffff',
          participants: 1247,
          nextOccurrence: Date.now() + 3600000,
          isActive: true,
          streak: 5,
          rewards: ['Discovery Badge', 'Early Bird NFT', 'Community Points']
        },
        {
          id: '2',
          name: 'Weekly Ticket Showcase',
          description: 'Muestra tu colección de tickets NFT de la semana',
          frequency: 'weekly',
          icon: '🎫',
          color: '#ff00ff',
          participants: 892,
          nextOccurrence: Date.now() + 86400000 * 3,
          isActive: true,
          streak: 2,
          rewards: ['Collector Badge', 'Rare Ticket NFT', 'VIP Access']
        },
        {
          id: '3',
          name: 'Monthly Base Network Celebration',
          description: 'Celebra los logros de Base Network este mes',
          frequency: 'monthly',
          icon: '🎉',
          color: '#00ff00',
          participants: 2156,
          nextOccurrence: Date.now() + 86400000 * 15,
          isActive: true,
          streak: 1,
          rewards: ['Base Pioneer Badge', 'Exclusive Event Access', 'Governance Token']
        },
        {
          id: '4',
          name: 'Friday NFT Art Share',
          description: 'Comparte arte NFT relacionado con tickets',
          frequency: 'weekly',
          icon: '🎨',
          color: '#ffaa00',
          participants: 634,
          nextOccurrence: Date.now() + 86400000 * 2,
          isActive: true,
          streak: 3,
          rewards: ['Artist Badge', 'Creative NFT', 'Gallery Feature']
        }
      ]
      setRituals(mockRituals)
    }

    loadRituals()
  }, [])

  useEffect(() => {
    // Cargar posts de rituales
    const loadRitualPosts = () => {
      const mockPosts: RitualPost[] = [
        {
          id: '1',
          ritualId: '1',
          author: {
            username: 'eventhunter',
            displayName: 'Event Hunter',
            pfpUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=eventhunter'
          },
          content: '🔍 Daily Discovery: Encontré un increíble evento de música NFT en Base Network. ¡Los tickets son únicos y transferibles!',
          timestamp: Date.now() - 7200000,
          likes: 23,
          comments: 8,
          streak: 7
        },
        {
          id: '2',
          ritualId: '2',
          author: {
            username: 'ticketcollector',
            displayName: 'Ticket Collector',
            pfpUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ticketcollector'
          },
          content: '🎫 Weekly Showcase: Mi colección de tickets NFT de esta semana incluye 3 eventos raros de Base Network. ¡Cada uno es único!',
          timestamp: Date.now() - 86400000,
          likes: 45,
          comments: 12,
          streak: 4
        },
        {
          id: '3',
          ritualId: '3',
          author: {
            username: 'basecelebrator',
            displayName: 'Base Celebrator',
            pfpUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=basecelebrator'
          },
          content: '🎉 Monthly Celebration: Base Network ha crecido increíblemente este mes. ¡Más de 1000 eventos NFT creados!',
          timestamp: Date.now() - 172800000,
          likes: 67,
          comments: 15,
          streak: 2
        }
      ]
      setPosts(mockPosts)
    }

    loadRitualPosts()
  }, [])

  const handleJoinRitual = (ritualId: string) => {
    setRituals(prev => prev.map(ritual => 
      ritual.id === ritualId 
        ? { ...ritual, participants: ritual.participants + 1 }
        : ritual
    ))
  }

  const handleCreateRitualPost = (ritualId: string) => {
    const ritual = rituals.find(r => r.id === ritualId)
    if (!ritual) return

    const newPost: RitualPost = {
      id: Date.now().toString(),
      ritualId,
      author: {
        username: 'currentuser',
        displayName: 'Current User',
        pfpUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=currentuser'
      },
      content: `Participando en ${ritual.name}: ¡Mi contribución al ritual!`,
      timestamp: Date.now(),
      likes: 0,
      comments: 0,
      streak: 1
    }

    setPosts(prev => [newPost, ...prev])
  }

  const getFrequencyLabel = (frequency: string) => {
    switch (frequency) {
      case 'daily': return 'Diario'
      case 'weekly': return 'Semanal'
      case 'monthly': return 'Mensual'
      default: return frequency
    }
  }

  const getTimeUntilNext = (timestamp: number) => {
    const now = Date.now()
    const diff = timestamp - now
    
    if (diff <= 0) return '¡Ahora!'
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    
    if (days > 0) return `${days}d ${hours}h`
    if (hours > 0) return `${hours}h ${minutes}m`
    return `${minutes}m`
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
          ⏰ Long-Term Rituals
        </h2>
        <p style={{
          color: '#b0b0b0',
          fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
          margin: 0,
          lineHeight: 1.6
        }}>
          Rituales regulares que crean hábitos y comunidad
        </p>
      </div>

      {/* Rituals Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 'clamp(1.5rem, 3vw, 2rem)',
        marginBottom: 'clamp(2rem, 4vw, 3rem)'
      }}>
        {rituals.map((ritual) => (
          <div
            key={ritual.id}
            style={{
              background: 'rgba(0, 0, 0, 0.5)',
              border: `2px solid ${ritual.color}40`,
              borderRadius: 'clamp(10px, 2vw, 15px)',
              padding: 'clamp(1.5rem, 3vw, 2rem)',
              transition: 'all 0.3s ease',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0, 0, 0, 0.7)'
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = `0 10px 20px ${ritual.color}20`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(0, 0, 0, 0.5)'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            {/* Ritual Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(0.8rem, 2vw, 1.2rem)',
              marginBottom: 'clamp(1rem, 2vw, 1.5rem)'
            }}>
              <div style={{
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                color: ritual.color
              }}>
                {ritual.icon}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  color: ritual.color,
                  fontSize: 'clamp(1.1rem, 2.8vw, 1.4rem)',
                  fontWeight: '700',
                  margin: '0 0 clamp(0.4rem, 1vw, 0.6rem) 0'
                }}>
                  {ritual.name}
                </h3>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'clamp(0.5rem, 1.2vw, 0.8rem)',
                  flexWrap: 'wrap'
                }}>
                  <span style={{
                    background: ritual.color,
                    color: '#000000',
                    padding: 'clamp(0.3rem, 0.8vw, 0.5rem) clamp(0.6rem, 1.5vw, 0.8rem)',
                    borderRadius: 'clamp(4px, 1vw, 6px)',
                    fontSize: 'clamp(0.7rem, 1.8vw, 0.9rem)',
                    fontWeight: '600',
                    textTransform: 'uppercase'
                  }}>
                    {getFrequencyLabel(ritual.frequency)}
                  </span>
                  <span style={{
                    color: '#b0b0b0',
                    fontSize: 'clamp(0.8rem, 2vw, 1rem)'
                  }}>
                    {ritual.participants} participantes
                  </span>
                </div>
              </div>
            </div>

            {/* Ritual Description */}
            <p style={{
              color: '#e0e0e0',
              fontSize: 'clamp(0.9rem, 2.2vw, 1.1rem)',
              lineHeight: 1.6,
              margin: '0 0 clamp(1rem, 2vw, 1.5rem) 0'
            }}>
              {ritual.description}
            </p>

            {/* Next Occurrence */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: 'clamp(6px, 1.5vw, 8px)',
              padding: 'clamp(0.8rem, 2vw, 1.2rem)',
              marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
              border: `1px solid ${ritual.color}40`
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{
                  color: ritual.color,
                  fontSize: 'clamp(0.9rem, 2.2vw, 1.1rem)',
                  fontWeight: '600'
                }}>
                  Próximo: {getTimeUntilNext(ritual.nextOccurrence)}
                </span>
                <span style={{
                  color: '#b0b0b0',
                  fontSize: 'clamp(0.8rem, 2vw, 1rem)'
                }}>
                  Streak: {ritual.streak}
                </span>
              </div>
            </div>

            {/* Rewards */}
            <div style={{
              marginBottom: 'clamp(1rem, 2vw, 1.5rem)'
            }}>
              <h4 style={{
                color: ritual.color,
                fontSize: 'clamp(0.9rem, 2.2vw, 1.1rem)',
                fontWeight: '600',
                margin: '0 0 clamp(0.5rem, 1.2vw, 0.8rem) 0'
              }}>
                🏆 Recompensas
              </h4>
              <div style={{
                display: 'flex',
                gap: 'clamp(0.4rem, 1vw, 0.6rem)',
                flexWrap: 'wrap'
              }}>
                {ritual.rewards.map((reward, index) => (
                  <span
                    key={index}
                    style={{
                      background: `${ritual.color}20`,
                      color: ritual.color,
                      padding: 'clamp(0.3rem, 0.8vw, 0.5rem) clamp(0.6rem, 1.5vw, 0.8rem)',
                      borderRadius: 'clamp(4px, 1vw, 6px)',
                      fontSize: 'clamp(0.7rem, 1.8vw, 0.9rem)',
                      fontWeight: '500'
                    }}
                  >
                    {reward}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div style={{
              display: 'flex',
              gap: 'clamp(0.8rem, 2vw, 1.2rem)'
            }}>
              <button
                onClick={() => handleJoinRitual(ritual.id)}
                style={{
                  flex: 1,
                  padding: 'clamp(0.8rem, 2vw, 1rem)',
                  background: `linear-gradient(135deg, ${ritual.color}, ${ritual.color}80)`,
                  border: 'none',
                  borderRadius: 'clamp(6px, 1.5vw, 8px)',
                  color: '#000000',
                  fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)'
                  e.currentTarget.style.boxShadow = `0 5px 15px ${ritual.color}40`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                🤝 Unirse
              </button>
              
              <button
                onClick={() => handleCreateRitualPost(ritual.id)}
                style={{
                  flex: 1,
                  padding: 'clamp(0.8rem, 2vw, 1rem)',
                  background: 'transparent',
                  border: `2px solid ${ritual.color}`,
                  borderRadius: 'clamp(6px, 1.5vw, 8px)',
                  color: ritual.color,
                  fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${ritual.color}20`
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                📝 Participar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Ritual Posts */}
      <div style={{
        background: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 'clamp(10px, 2vw, 15px)',
        padding: 'clamp(1.5rem, 3vw, 2rem)',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <h3 style={{
          color: '#00ffff',
          fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
          fontWeight: '700',
          margin: '0 0 clamp(1.5rem, 3vw, 2rem) 0',
          textAlign: 'center'
        }}>
          📱 Posts de Rituales
        </h3>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(1rem, 2vw, 1.5rem)'
        }}>
          {posts.map((post) => {
            const ritual = rituals.find(r => r.id === post.ritualId)
            return (
              <div
                key={post.id}
                style={{
                  background: 'rgba(0, 0, 0, 0.3)',
                  border: `1px solid ${ritual?.color || '#00ffff'}40`,
                  borderRadius: 'clamp(8px, 2vw, 12px)',
                  padding: 'clamp(1rem, 2.5vw, 1.5rem)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.5)'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.3)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'clamp(0.8rem, 2vw, 1.2rem)',
                  marginBottom: 'clamp(0.8rem, 2vw, 1.2rem)'
                }}>
                  <img
                    src={post.author.pfpUrl}
                    alt="Avatar"
                    style={{
                      width: 'clamp(32px, 8vw, 40px)',
                      height: 'clamp(32px, 8vw, 40px)',
                      borderRadius: '50%',
                      border: `2px solid ${ritual?.color || '#00ffff'}`
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
                        fontSize: 'clamp(0.9rem, 2.2vw, 1.1rem)',
                        fontWeight: '600',
                        margin: 0
                      }}>
                        {post.author.displayName}
                      </h4>
                      <span style={{
                        color: ritual?.color || '#00ffff',
                        fontSize: 'clamp(0.7rem, 1.8vw, 0.9rem)',
                        fontWeight: '600'
                      }}>
                        🔥 Streak: {post.streak}
                      </span>
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
                
                <p style={{
                  color: '#e0e0e0',
                  fontSize: 'clamp(0.9rem, 2.2vw, 1.1rem)',
                  lineHeight: 1.6,
                  margin: '0 0 clamp(0.8rem, 2vw, 1.2rem) 0'
                }}>
                  {post.content}
                </p>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'clamp(1rem, 2.5vw, 1.5rem)',
                  paddingTop: 'clamp(0.8rem, 2vw, 1.2rem)',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <span style={{
                    color: '#b0b0b0',
                    fontSize: 'clamp(0.8rem, 2vw, 1rem)'
                  }}>
                    ❤️ {post.likes}
                  </span>
                  <span style={{
                    color: '#b0b0b0',
                    fontSize: 'clamp(0.8rem, 2vw, 1rem)'
                  }}>
                    💬 {post.comments}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
