'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Home, Ticket, Plus, User, Search, Shield, Globe, FileText, Bell, Settings, Rocket, Zap } from 'lucide-react'

export function BottomNavigation() {
  const pathname = usePathname()

  // Core navigation items - limit to 5 for better UX
  const coreNavItems = [
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

  // Demo items for development
  const demoNavItems = [
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
    },
    {
      href: '/technical-guidelines-demo',
      icon: Settings,
      label: 'Tech',
      isActive: pathname.startsWith('/technical-guidelines-demo')
    },
    {
      href: '/onboarding-optimization-demo',
      icon: Rocket,
      label: 'Onboard',
      isActive: pathname.startsWith('/onboarding-optimization-demo')
    },
    {
      href: '/viral-apps-demo',
      icon: Zap,
      label: 'Viral',
      isActive: pathname.startsWith('/viral-apps-demo')
    }
  ]

  // Use core items for production, include demo items in development
  const navItems = process.env.NODE_ENV === 'development' 
    ? [...coreNavItems, ...demoNavItems] 
    : coreNavItems

  return (
    <nav className="bottom-navigation">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-item ${item.isActive ? 'active' : ''}`}
              aria-label={item.label}
              tabIndex={0}
            >
              <Icon className="nav-icon" size={20} />
              <span className="nav-label">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
