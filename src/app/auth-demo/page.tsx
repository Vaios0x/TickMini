'use client'

import { useState } from 'react'
import { Shield, User, Key, CheckCircle, AlertCircle, Info } from 'lucide-react'
import { QuickAuthButton } from '@/components/auth/quick-auth-button'
import { useAuthenticatedContext } from '@/hooks/use-authenticated-context'

export default function AuthDemoPage() {
  const [selectedDemo, setSelectedDemo] = useState<'basic' | 'advanced' | 'permissions'>('basic')
  
  const {
    contextUser,
    contextLocation,
    contextClient,
    authenticatedUser,
    userProfile,
    isAuthenticated,
    isLoading,
    error,
    signIn,
    signOut,
    hasPermission,
    canPerformAction,
    getAuthenticatedUserData
  } = useAuthenticatedContext()

  const demoActions = [
    { id: 'createEvent', name: 'Crear Evento', permission: 'createEvents' },
    { id: 'purchaseTicket', name: 'Comprar Ticket', permission: 'purchaseTickets' },
    { id: 'transferTicket', name: 'Transferir Ticket', permission: 'transferTickets' },
    { id: 'updateProfile', name: 'Actualizar Perfil', permission: 'manageProfile' }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 flex items-center justify-center">
              <Shield className="w-8 h-8 mr-3 text-cyan-400" />
              Authentication Demo
            </h1>
            <p className="text-gray-400">
              Demuestra el sistema de autenticación Quick Auth de TickMini
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Authentication Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Auth Demo */}
              {selectedDemo === 'basic' && (
                <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
                  <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <Key className="w-5 h-5 mr-2 text-cyan-400" />
                    Autenticación Básica
                  </h2>
                  <p className="text-gray-400 mb-6">
                    Autenticación instantánea con Farcaster's identity system
                  </p>
                  <QuickAuthButton showUserInfo={true} showProfile={true} />
                </div>
              )}

              {/* Advanced Auth Demo */}
              {selectedDemo === 'advanced' && (
                <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
                  <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <User className="w-5 h-5 mr-2 text-purple-400" />
                    Autenticación Avanzada
                  </h2>
                  <p className="text-gray-400 mb-6">
                    Información detallada del usuario autenticado
                  </p>
                  
                  {isAuthenticated ? (
                    <div className="space-y-4">
                      <div className="bg-gray-800/50 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-white mb-3">Usuario Autenticado</h3>
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
                            <span className="text-gray-400">Dominio:</span>
                            <span className="text-white ml-2">{authenticatedUser?.domain}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Timestamp:</span>
                            <span className="text-white ml-2">
                              {authenticatedUser?.timestamp ? new Date(authenticatedUser.timestamp).toLocaleString() : 'N/A'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {userProfile && (
                        <div className="bg-gray-800/50 rounded-lg p-4">
                          <h3 className="text-lg font-semibold text-white mb-3">Perfil del Usuario</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-400">Username:</span>
                              <span className="text-white ml-2">{userProfile.profile.username}</span>
                            </div>
                            <div>
                              <span className="text-gray-400">Display Name:</span>
                              <span className="text-white ml-2">{userProfile.profile.displayName}</span>
                            </div>
                            <div>
                              <span className="text-gray-400">Bio:</span>
                              <span className="text-white ml-2">{userProfile.profile.bio}</span>
                            </div>
                            <div>
                              <span className="text-gray-400">Avatar:</span>
                              <span className="text-white ml-2 truncate">{userProfile.profile.avatar}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="bg-gray-800/50 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-white mb-3">Estadísticas</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-cyan-400">{userProfile?.stats.eventsCreated || 0}</div>
                            <div className="text-gray-400">Eventos Creados</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-purple-400">{userProfile?.stats.ticketsPurchased || 0}</div>
                            <div className="text-gray-400">Tickets Comprados</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-400">{userProfile?.stats.ticketsTransferred || 0}</div>
                            <div className="text-gray-400">Tickets Transferidos</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-yellow-400">{userProfile?.stats.achievements.length || 0}</div>
                            <div className="text-gray-400">Logros</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-400 mb-4">Inicia sesión para ver la información del usuario</p>
                      <QuickAuthButton />
                    </div>
                  )}
                </div>
              )}

              {/* Permissions Demo */}
              {selectedDemo === 'permissions' && (
                <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
                  <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                    Permisos y Acciones
                  </h2>
                  <p className="text-gray-400 mb-6">
                    Verifica permisos para operaciones sensibles
                  </p>
                  
                  <div className="space-y-4">
                    {demoActions.map((action) => (
                      <div key={action.id} className="bg-gray-800/50 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-white font-semibold">{action.name}</h3>
                            <p className="text-gray-400 text-sm">Permiso: {action.permission}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            {canPerformAction(action.id) ? (
                              <div className="flex items-center space-x-1 text-green-400">
                                <CheckCircle className="w-4 h-4" />
                                <span className="text-sm font-medium">Permitido</span>
                              </div>
                            ) : (
                              <div className="flex items-center space-x-1 text-red-400">
                                <AlertCircle className="w-4 h-4" />
                                <span className="text-sm font-medium">No Permitido</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Demo Selection */}
              <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Seleccionar Demo</h3>
                <div className="space-y-2">
                  {[
                    { id: 'basic', name: 'Autenticación Básica', description: 'Login/Logout simple' },
                    { id: 'advanced', name: 'Autenticación Avanzada', description: 'Información detallada' },
                    { id: 'permissions', name: 'Permisos y Acciones', description: 'Verificación de permisos' }
                  ].map((demo) => (
                    <button
                      key={demo.id}
                      onClick={() => setSelectedDemo(demo.id as any)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedDemo === demo.id
                          ? 'bg-cyan-500/20 border border-cyan-500/50'
                          : 'bg-gray-800/50 hover:bg-gray-700/50'
                      }`}
                    >
                      <div className="font-medium text-white">{demo.name}</div>
                      <div className="text-sm text-gray-400">{demo.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Context Info */}
              <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Mini App Context</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-gray-400">En Mini App:</span>
                    <span className="text-white ml-2">
                      {contextUser ? 'Sí' : 'No'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Ubicación:</span>
                    <span className="text-white ml-2">
                      {contextLocation?.type || 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Cliente:</span>
                    <span className="text-white ml-2">
                      {contextClient?.platformType || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Auth Status */}
              <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Estado de Autenticación</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Autenticado:</span>
                    <span className={isAuthenticated ? 'text-green-400' : 'text-red-400'}>
                      {isAuthenticated ? 'Sí' : 'No'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Cargando:</span>
                    <span className={isLoading ? 'text-yellow-400' : 'text-gray-400'}>
                      {isLoading ? 'Sí' : 'No'}
                    </span>
                  </div>
                  {error && (
                    <div className="text-red-400 text-xs">
                      Error: {error}
                    </div>
                  )}
                </div>
              </div>

              {/* Implementation Info */}
              <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Info className="w-5 h-5 mr-2 text-cyan-400" />
                  Implementación
                </h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <div>• Quick Auth con JWT</div>
                  <div>• Verificación de backend</div>
                  <div>• Permisos granulares</div>
                  <div>• Context + Auth</div>
                  <div>• Auto-autenticación</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
