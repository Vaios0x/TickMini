'use client'

import * as React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { 
  Home, 
  Ticket, 
  Plus, 
  User, 
  Search, 
  Shield, 
  Globe, 
  FileText, 
  Bell,
  Menu,
  Settings
} from 'lucide-react'

export function OptimizedNavigation() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const mainNavItems = [
    {
      href: '/',
      icon: Home,
      label: 'Inicio',
      isActive: pathname === '/'
    },
    {
      href: '/events',
      icon: Search,
      label: 'Eventos',
      isActive: pathname.startsWith('/events')
    },
    {
      href: '/create-event',
      icon: Plus,
      label: 'Crear',
      isActive: pathname.startsWith('/create-event')
    },
    {
      href: '/my-tickets',
      icon: Ticket,
      label: 'Mis Tickets',
      isActive: pathname.startsWith('/my-tickets')
    }
  ]

  const secondaryNavItems = [
    {
      href: '/profile',
      icon: User,
      label: 'Perfil',
      isActive: pathname.startsWith('/profile')
    },
    {
      href: '/auth-demo',
      icon: Shield,
      label: 'Auth',
      isActive: pathname.startsWith('/auth-demo')
    },
    {
      href: '/navigation-demo',
      icon: Globe,
      label: 'Nav',
      isActive: pathname.startsWith('/navigation-demo')
    },
    {
      href: '/manifest-demo',
      icon: FileText,
      label: 'Manifest',
      isActive: pathname.startsWith('/manifest-demo')
    },
    {
      href: '/notifications-demo',
      icon: Bell,
      label: 'Notif',
      isActive: pathname.startsWith('/notifications-demo')
    }
  ]

  return (
    <>
      {/* Bottom Navigation - Primary Actions */}
      <nav 
        className="fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-xl border-t border-white/10"
        style={{
          paddingBottom: 'env(safe-area-inset-bottom)'
        }}
      >
        <div className="flex items-center justify-around px-2 py-2">
          {mainNavItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200 min-h-[44px] min-w-[44px] ${
                  item.isActive
                    ? 'bg-cyan-500/20 text-cyan-400'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
                aria-label={item.label}
                style={{
                  touchAction: 'manipulation' // Optimización para touch
                }}
              >
                <Icon className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            )
          })}
          
          {/* Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200 min-h-[44px] min-w-[44px] ${
              isMenuOpen
                ? 'bg-cyan-500/20 text-cyan-400'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
            aria-label="Menú"
            style={{
              touchAction: 'manipulation'
            }}
          >
            <Menu className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">Menú</span>
          </button>
        </div>
      </nav>

      {/* Side Menu - Secondary Actions */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        >
          <div 
            className="fixed right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-black/95 backdrop-blur-xl border-l border-white/10 p-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            style={{
              paddingTop: 'env(safe-area-inset-top)',
              paddingBottom: 'env(safe-area-inset-bottom)'
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-white">TickMini</h2>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Cerrar menú"
              >
                <Settings className="h-5 w-5 text-gray-400" />
              </button>
            </div>

            {/* Navigation Items */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                Herramientas de Desarrollo
              </h3>
              
              {secondaryNavItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      item.isActive
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                    aria-label={item.label}
                    style={{
                      touchAction: 'manipulation'
                    }}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                )
              })}
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-xs text-gray-500 text-center">
                TickMini v1.0.0 - Base Network
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// Componente de navegación optimizada para mobile
export function MobileOptimizedNavigation() {
  const pathname = usePathname()

  const navItems = [
    {
      href: '/',
      icon: Home,
      label: 'Inicio',
      isActive: pathname === '/'
    },
    {
      href: '/events',
      icon: Search,
      label: 'Eventos',
      isActive: pathname.startsWith('/events')
    },
    {
      href: '/create-event',
      icon: Plus,
      label: 'Crear',
      isActive: pathname.startsWith('/create-event')
    },
    {
      href: '/my-tickets',
      icon: Ticket,
      label: 'Tickets',
      isActive: pathname.startsWith('/my-tickets')
    },
    {
      href: '/profile',
      icon: User,
      label: 'Perfil',
      isActive: pathname.startsWith('/profile')
    }
  ]

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-xl border-t border-white/10"
      style={{
        paddingBottom: 'env(safe-area-inset-bottom)'
      }}
    >
      <div className="flex items-center justify-around px-1 py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-2 px-2 rounded-lg transition-all duration-200 min-h-[44px] min-w-[44px] ${
                item.isActive
                  ? 'bg-cyan-500/20 text-cyan-400'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
              aria-label={item.label}
              style={{
                touchAction: 'manipulation'
              }}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
