'use client'

import * as React from 'react'
import { useState, useEffect } from 'react'

interface UserProfile {
  fid: number
  username: string
  displayName: string
  pfpUrl: string
  bio: string
  followerCount: number
  followingCount: number
}

export function UserProfile() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Cargar perfil de usuario desde Farcaster
  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        // Intentar obtener datos del contexto de Farcaster
        const farcasterData = window.localStorage.getItem('farcaster-user-data')
        
        if (farcasterData) {
          const userData = JSON.parse(farcasterData)
          const profile: UserProfile = {
            fid: userData.fid || 12345,
            username: userData.username || 'tickmini_user',
            displayName: userData.displayName || 'TickMini User',
            pfpUrl: userData.pfpUrl || '/images/default-avatar.png',
            bio: userData.bio || 'Entusiasta de eventos NFT en Base Network',
            followerCount: userData.followerCount || 150,
            followingCount: userData.followingCount || 75
          }
          setUserProfile(profile)
        } else {
          // Fallback para desarrollo
          const mockProfile: UserProfile = {
            fid: 12345,
            username: 'tickmini_user',
            displayName: 'TickMini User',
            pfpUrl: '/images/default-avatar.png',
            bio: 'Entusiasta de eventos NFT en Base Network',
            followerCount: 150,
            followingCount: 75
          }
          setUserProfile(mockProfile)
        }
      } catch (error) {
        console.error('Error loading user profile:', error)
        // Fallback en caso de error
        const fallbackProfile: UserProfile = {
          fid: 12345,
          username: 'tickmini_user',
          displayName: 'TickMini User',
          pfpUrl: '/images/default-avatar.png',
          bio: 'Entusiasta de eventos NFT en Base Network',
          followerCount: 150,
          followingCount: 75
        }
        setUserProfile(fallbackProfile)
      } finally {
        setIsLoading(false)
      }
    }

    loadUserProfile()
  }, [])

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'clamp(0.8rem, 2vw, 1rem)',
        padding: 'clamp(0.5rem, 1vw, 0.8rem)',
        background: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 'clamp(8px, 2vw, 12px)',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <div style={{
          width: 'clamp(32px, 8vw, 40px)',
          height: 'clamp(32px, 8vw, 40px)',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #00ffff, #ff00ff)',
          animation: 'pulse 2s ease-in-out infinite'
        }} />
        <div style={{
          width: 'clamp(100px, 25vw, 150px)',
          height: 'clamp(16px, 4vw, 20px)',
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: 'clamp(4px, 1vw, 6px)',
          animation: 'pulse 2s ease-in-out infinite'
        }} />
      </div>
    )
  }

  if (!userProfile) {
    return null
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 'clamp(0.8rem, 2vw, 1rem)',
      padding: 'clamp(0.5rem, 1vw, 0.8rem)',
      background: 'rgba(0, 0, 0, 0.3)',
      borderRadius: 'clamp(8px, 2vw, 12px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = 'rgba(0, 0, 0, 0.5)'
      e.currentTarget.style.borderColor = 'rgba(0, 255, 255, 0.5)'
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = 'rgba(0, 0, 0, 0.3)'
      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'
    }}
    >
      {/* Avatar */}
      <div style={{
        position: 'relative',
        width: 'clamp(32px, 8vw, 40px)',
        height: 'clamp(32px, 8vw, 40px)',
        borderRadius: '50%',
        overflow: 'hidden',
        border: '2px solid rgba(0, 255, 255, 0.5)',
        boxShadow: '0 0 10px rgba(0, 255, 255, 0.3)'
      }}>
        <img
          src={userProfile.pfpUrl}
          alt={userProfile.displayName}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
          onError={(e) => {
            // Fallback a avatar por defecto
            e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9InVybCgjZ3JhZGllbnQwX2xpbmVhcl8xXzEpIi8+CjxwYXRoIGQ9Ik0yMCAyMEMyNi4wNzExIDIwIDMxIDE1LjA3MTEgMzEgOUgzMUMzMSAxNS4wNzExIDI2LjA3MTEgMjAgMjAgMjBaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMTMgMzJDMzMgMzIgMzMgMjYgMjAgMjZDNyAyNiA3IDMyIDEzIDMyWiIgZmlsbD0id2hpdGUiLz4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQwX2xpbmVhcl8xXzEiIHgxPSIwIiB5MT0iMCIgeDI9IjQwIiB5Mj0iNDAiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iIzAwRkZGRiIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNGRjAwRkYiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K'
          }}
        />
      </div>

      {/* User Info */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(0.2rem, 0.5vw, 0.4rem)',
        minWidth: 0,
        flex: 1
      }}>
        {/* Display Name */}
        <div style={{
          fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
          fontWeight: '600',
          color: '#ffffff',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {userProfile.displayName}
        </div>

        {/* Username - Evitar mostrar 0x addresses según Featured Guidelines */}
        <div style={{
          fontSize: 'clamp(0.8rem, 1.8vw, 1rem)',
          color: '#b0b0b0',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          @{userProfile.username}
        </div>
      </div>

      {/* Status Indicator */}
      <div style={{
        width: 'clamp(8px, 2vw, 10px)',
        height: 'clamp(8px, 2vw, 10px)',
        borderRadius: '50%',
        background: '#00ff00',
        border: '2px solid rgba(0, 0, 0, 0.8)',
        boxShadow: '0 0 5px rgba(0, 255, 0, 0.5)',
        animation: 'pulse 2s ease-in-out infinite'
      }} />
    </div>
  )
}