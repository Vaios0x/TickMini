'use client'

import * as React from 'react'
import { useState, useEffect } from 'react'

interface IdentityProfile {
  id: string
  username: string
  displayName: string
  pfpUrl: string
  bio: string
  theme: 'cyber' | 'neon' | 'minimal' | 'vibrant'
  badges: string[]
  ticketCollection: {
    total: number
    rare: number
    events: string[]
  }
  socialStats: {
    followers: number
    following: number
    posts: number
    reputation: number
  }
}

export function IdentityPlaygrounds() {
  const [profile, setProfile] = useState<IdentityProfile | null>(null)
  const [isCustomizing, setIsCustomizing] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState<'cyber' | 'neon' | 'minimal' | 'vibrant'>('cyber')

  useEffect(() => {
    // Cargar perfil del usuario
    const loadProfile = async () => {
      const mockProfile: IdentityProfile = {
        id: '1',
        username: 'tickmaster',
        displayName: 'TickMaster Pro',
        pfpUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tickmaster',
        bio: 'Event enthusiast & NFT collector | Base Network advocate',
        theme: 'cyber',
        badges: ['Early Adopter', 'Event Organizer', 'Base Pioneer'],
        ticketCollection: {
          total: 47,
          rare: 12,
          events: ['Base Hackathon', 'NFT NYC', 'DevCon', 'Crypto Art Week']
        },
        socialStats: {
          followers: 1234,
          following: 567,
          posts: 89,
          reputation: 95
        }
      }
      setProfile(mockProfile)
    }

    loadProfile()
  }, [])

  const themes = {
    cyber: {
      name: 'Cyber',
      colors: {
        primary: '#00ffff',
        secondary: '#0080ff',
        accent: '#ff00ff',
        background: '#0a0a0a'
      },
      description: 'Futurista y tecnológico'
    },
    neon: {
      name: 'Neon',
      colors: {
        primary: '#ff00ff',
        secondary: '#00ff00',
        accent: '#ffff00',
        background: '#1a1a2e'
      },
      description: 'Brillante y vibrante'
    },
    minimal: {
      name: 'Minimal',
      colors: {
        primary: '#ffffff',
        secondary: '#b0b0b0',
        accent: '#00ffff',
        background: '#000000'
      },
      description: 'Limpio y elegante'
    },
    vibrant: {
      name: 'Vibrant',
      colors: {
        primary: '#ff8000',
        secondary: '#00ff80',
        accent: '#8000ff',
        background: '#2e1a1a'
      },
      description: 'Colorido y energético'
    }
  }

  const handleThemeChange = (theme: keyof typeof themes) => {
    setSelectedTheme(theme)
    if (profile) {
      setProfile(prev => prev ? { ...prev, theme } : null)
    }
  }

  const handleCustomize = () => {
    setIsCustomizing(true)
    // Simular personalización
    setTimeout(() => {
      setIsCustomizing(false)
    }, 2000)
  }

  if (!profile) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 'clamp(2rem, 4vw, 3rem)',
        background: 'rgba(0, 255, 255, 0.05)',
        borderRadius: 'clamp(10px, 2vw, 15px)',
        border: '1px solid rgba(0, 255, 255, 0.2)'
      }}>
        <div style={{
          width: 'clamp(24px, 6vw, 32px)',
          height: 'clamp(24px, 6vw, 32px)',
          border: '3px solid rgba(255, 255, 255, 0.1)',
          borderTop: '3px solid #00ffff',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <span style={{
          marginLeft: 'clamp(1rem, 2vw, 1.5rem)',
          color: '#00ffff',
          fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
          fontWeight: '600'
        }}>
          Cargando perfil...
        </span>
      </div>
    )
  }

  const currentTheme = themes[profile.theme]

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
          🎨 Identity Playgrounds
        </h2>
        <p style={{
          color: '#b0b0b0',
          fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
          margin: 0,
          lineHeight: 1.6
        }}>
          Personaliza tu identidad y exprésate en TickMini
        </p>
      </div>

      {/* Profile Display */}
      <div style={{
        background: `linear-gradient(135deg, ${currentTheme.colors.background}, ${currentTheme.colors.primary}20)`,
        border: `2px solid ${currentTheme.colors.primary}`,
        borderRadius: 'clamp(12px, 3vw, 20px)',
        padding: 'clamp(2rem, 4vw, 3rem)',
        marginBottom: 'clamp(2rem, 4vw, 3rem)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Profile Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(1rem, 2.5vw, 1.5rem)',
          marginBottom: 'clamp(1.5rem, 3vw, 2rem)'
        }}>
          <div style={{ position: 'relative' }}>
            <img
              src={profile.pfpUrl}
              alt="Profile"
              style={{
                width: 'clamp(60px, 15vw, 80px)',
                height: 'clamp(60px, 15vw, 80px)',
                borderRadius: '50%',
                border: `3px solid ${currentTheme.colors.primary}`,
                boxShadow: `0 0 20px ${currentTheme.colors.primary}40`
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: '-5px',
              right: '-5px',
              width: 'clamp(20px, 5vw, 24px)',
              height: 'clamp(20px, 5vw, 24px)',
              background: currentTheme.colors.primary,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 'clamp(0.8rem, 2vw, 1rem)',
              color: '#000000',
              fontWeight: '700'
            }}>
              ✓
            </div>
          </div>
          
          <div style={{ flex: 1 }}>
            <h3 style={{
              color: currentTheme.colors.primary,
              fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
              fontWeight: '700',
              margin: '0 0 clamp(0.4rem, 1vw, 0.6rem) 0'
            }}>
              {profile.displayName}
            </h3>
            <p style={{
              color: '#b0b0b0',
              fontSize: 'clamp(0.9rem, 2.2vw, 1.1rem)',
              margin: '0 0 clamp(0.8rem, 2vw, 1.2rem) 0'
            }}>
              @{profile.username}
            </p>
            <p style={{
              color: '#e0e0e0',
              fontSize: 'clamp(0.8rem, 2vw, 1rem)',
              margin: 0,
              lineHeight: 1.5
            }}>
              {profile.bio}
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: 'clamp(0.8rem, 2vw, 1.2rem)',
          marginBottom: 'clamp(1.5rem, 3vw, 2rem)'
        }}>
          {[
            { label: 'Followers', value: profile.socialStats.followers, icon: '👥' },
            { label: 'Following', value: profile.socialStats.following, icon: '👤' },
            { label: 'Posts', value: profile.socialStats.posts, icon: '📝' },
            { label: 'Reputation', value: profile.socialStats.reputation, icon: '⭐' }
          ].map((stat, index) => (
            <div
              key={index}
              style={{
                background: 'rgba(0, 0, 0, 0.3)',
                border: `1px solid ${currentTheme.colors.primary}40`,
                borderRadius: 'clamp(6px, 1.5vw, 8px)',
                padding: 'clamp(0.8rem, 2vw, 1.2rem)',
                textAlign: 'center'
              }}
            >
              <div style={{
                fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
                marginBottom: 'clamp(0.4rem, 1vw, 0.6rem)'
              }}>
                {stat.icon}
              </div>
              <div style={{
                color: currentTheme.colors.primary,
                fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
                fontWeight: '700',
                marginBottom: 'clamp(0.2rem, 0.5vw, 0.4rem)'
              }}>
                {stat.value}
              </div>
              <div style={{
                color: '#b0b0b0',
                fontSize: 'clamp(0.7rem, 1.8vw, 0.9rem)'
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Badges */}
        <div style={{
          marginBottom: 'clamp(1.5rem, 3vw, 2rem)'
        }}>
          <h4 style={{
            color: currentTheme.colors.primary,
            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            fontWeight: '600',
            margin: '0 0 clamp(0.8rem, 2vw, 1.2rem) 0'
          }}>
            🏆 Badges
          </h4>
          <div style={{
            display: 'flex',
            gap: 'clamp(0.6rem, 1.5vw, 0.8rem)',
            flexWrap: 'wrap'
          }}>
            {profile.badges.map((badge, index) => (
              <div
                key={index}
                style={{
                  background: `linear-gradient(135deg, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})`,
                  color: '#000000',
                  padding: 'clamp(0.4rem, 1vw, 0.6rem) clamp(0.8rem, 2vw, 1.2rem)',
                  borderRadius: 'clamp(4px, 1vw, 6px)',
                  fontSize: 'clamp(0.7rem, 1.8vw, 0.9rem)',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
              >
                {badge}
              </div>
            ))}
          </div>
        </div>

        {/* Ticket Collection */}
        <div>
          <h4 style={{
            color: currentTheme.colors.primary,
            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            fontWeight: '600',
            margin: '0 0 clamp(0.8rem, 2vw, 1.2rem) 0'
          }}>
            🎫 Ticket Collection
          </h4>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
            gap: 'clamp(0.8rem, 2vw, 1.2rem)'
          }}>
            <div style={{
              background: 'rgba(0, 0, 0, 0.3)',
              border: `1px solid ${currentTheme.colors.primary}40`,
              borderRadius: 'clamp(6px, 1.5vw, 8px)',
              padding: 'clamp(0.8rem, 2vw, 1.2rem)',
              textAlign: 'center'
            }}>
              <div style={{
                color: currentTheme.colors.primary,
                fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
                fontWeight: '700',
                marginBottom: 'clamp(0.4rem, 1vw, 0.6rem)'
              }}>
                {profile.ticketCollection.total}
              </div>
              <div style={{
                color: '#b0b0b0',
                fontSize: 'clamp(0.7rem, 1.8vw, 0.9rem)'
              }}>
                Total Tickets
              </div>
            </div>
            <div style={{
              background: 'rgba(0, 0, 0, 0.3)',
              border: `1px solid ${currentTheme.colors.accent}40`,
              borderRadius: 'clamp(6px, 1.5vw, 8px)',
              padding: 'clamp(0.8rem, 2vw, 1.2rem)',
              textAlign: 'center'
            }}>
              <div style={{
                color: currentTheme.colors.accent,
                fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
                fontWeight: '700',
                marginBottom: 'clamp(0.4rem, 1vw, 0.6rem)'
              }}>
                {profile.ticketCollection.rare}
              </div>
              <div style={{
                color: '#b0b0b0',
                fontSize: 'clamp(0.7rem, 1.8vw, 0.9rem)'
              }}>
                Rare NFTs
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Theme Customization */}
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
          margin: '0 0 clamp(1rem, 2vw, 1.5rem) 0',
          textAlign: 'center'
        }}>
          🎨 Personalizar Tema
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 'clamp(1rem, 2.5vw, 1.5rem)',
          marginBottom: 'clamp(1.5rem, 3vw, 2rem)'
        }}>
          {Object.entries(themes).map(([key, theme]) => (
            <button
              key={key}
              onClick={() => handleThemeChange(key as keyof typeof themes)}
              style={{
                background: selectedTheme === key 
                  ? `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`
                  : 'rgba(0, 0, 0, 0.3)',
                border: `2px solid ${selectedTheme === key ? theme.colors.primary : 'rgba(255, 255, 255, 0.2)'}`,
                borderRadius: 'clamp(8px, 2vw, 12px)',
                padding: 'clamp(1rem, 2.5vw, 1.5rem)',
                color: selectedTheme === key ? '#000000' : '#ffffff',
                fontSize: 'clamp(0.9rem, 2.2vw, 1.1rem)',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textAlign: 'center'
              }}
              onMouseEnter={(e) => {
                if (selectedTheme !== key) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }
              }}
              onMouseLeave={(e) => {
                if (selectedTheme !== key) {
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.3)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }
              }}
            >
              <div style={{
                fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                marginBottom: 'clamp(0.5rem, 1vw, 0.8rem)'
              }}>
                {theme.name === 'Cyber' && '🤖'}
                {theme.name === 'Neon' && '💫'}
                {theme.name === 'Minimal' && '⚪'}
                {theme.name === 'Vibrant' && '🌈'}
              </div>
              <div style={{
                fontWeight: '700',
                marginBottom: 'clamp(0.4rem, 1vw, 0.6rem)'
              }}>
                {theme.name}
              </div>
              <div style={{
                fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                opacity: 0.8
              }}>
                {theme.description}
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={handleCustomize}
          disabled={isCustomizing}
          style={{
            width: '100%',
            padding: 'clamp(1rem, 2.5vw, 1.5rem)',
            background: isCustomizing 
              ? 'rgba(100, 100, 100, 0.5)'
              : 'linear-gradient(135deg, #00ffff, #0080ff)',
            border: 'none',
            borderRadius: 'clamp(8px, 2vw, 12px)',
            color: '#000000',
            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            fontWeight: '700',
            cursor: isCustomizing ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}
          onMouseEnter={(e) => {
            if (!isCustomizing) {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 255, 255, 0.4)'
            }
          }}
          onMouseLeave={(e) => {
            if (!isCustomizing) {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }
          }}
        >
          {isCustomizing ? (
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
              Personalizando...
            </>
          ) : (
            '🎨 Personalizar Perfil'
          )}
        </button>
      </div>
    </div>
  )
}
