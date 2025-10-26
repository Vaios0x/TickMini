'use client'

import { UserProfile } from '@/components/user/user-profile'
import { OnboardingFlow } from '@/components/onboarding/onboarding-flow'
import { QuickAuthButton } from '@/components/auth/quick-auth-button'
import { useMiniAppContext } from '@/hooks/use-miniapp-context'
import { useAuthenticatedContext } from '@/hooks/use-authenticated-context'
import { useState, useEffect } from 'react'

export default function ProfilePage() {
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false)
  const { user, location, client, isInMiniApp } = useMiniAppContext()
  const { 
    isAuthenticated, 
    authenticatedUser, 
    userProfile, 
    canPerformAction 
  } = useAuthenticatedContext()

  useEffect(() => {
    // Verificar si el usuario ha visto el onboarding
    const seenOnboarding = localStorage.getItem('tickmini-onboarding-seen')
    if (!seenOnboarding) {
      setShowOnboarding(true)
    } else {
      setHasSeenOnboarding(true)
    }
  }, [])

  // Si no estamos en Mini App, el ContextAwareWrapper ya maneja esto
  if (!isInMiniApp) {
    return null
  }

  const handleOnboardingComplete = () => {
    setShowOnboarding(false)
    setHasSeenOnboarding(true)
    localStorage.setItem('tickmini-onboarding-seen', 'true')
  }

  if (showOnboarding) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Mi Perfil
            </h1>
            <p className="text-gray-400">
              Gestiona tu perfil y ve tus tickets NFT
            </p>
          </div>

          {/* Authentication Section */}
          <div className="mb-8">
            <QuickAuthButton 
              showUserInfo={true} 
              showProfile={true}
              variant="primary"
              size="lg"
            />
          </div>

          {/* Profile Content */}
          <UserProfile />

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-900/50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-3">
                🎫 Mis Tickets NFT
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Ve y gestiona todos tus tickets NFT
              </p>
              <a
                href="/my-tickets"
                className="inline-block bg-cyan-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-cyan-400 transition-colors"
              >
                Ver Tickets
              </a>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-3">
                🚀 Crear Evento
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Crea tu propio evento y vende tickets NFT
              </p>
              {canPerformAction('createEvent') ? (
                <a
                  href="/create-event"
                  className="inline-block bg-purple-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-400 transition-colors"
                >
                  Crear Ahora
                </a>
              ) : (
                <div className="text-gray-400 text-sm">
                  {isAuthenticated ? 'No tienes permisos para crear eventos' : 'Inicia sesión para crear eventos'}
                </div>
              )}
            </div>
          </div>

          {/* Authentication Status */}
          {isAuthenticated && (
            <div className="mt-8 bg-green-500/10 border border-green-500/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-400 mb-3">
                ✅ Autenticación Activa
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">FID:</span>
                  <span className="text-white ml-2">{authenticatedUser?.fid}</span>
                </div>
                <div>
                  <span className="text-gray-400">Autenticado:</span>
                  <span className="text-green-400 ml-2">
                    {authenticatedUser?.authenticated ? 'Sí' : 'No'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Puede crear eventos:</span>
                  <span className="text-white ml-2">
                    {canPerformAction('createEvent') ? 'Sí' : 'No'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Puede comprar tickets:</span>
                  <span className="text-white ml-2">
                    {canPerformAction('purchaseTicket') ? 'Sí' : 'No'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
