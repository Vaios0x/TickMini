'use client'

import * as React from 'react'
import { ThemeProvider, ThemeToggle } from '@/components/ui/theme-provider'
import { Home, Ticket, Plus, User, Search, Settings, Menu } from 'lucide-react'

export default function DesignGuidelinesDemoPage() {
  const [showSideNav, setShowSideNav] = React.useState(false)

  return (
    <ThemeProvider>
      <div className="layout-portrait">
        {/* Header with core actions */}
        <header className="core-actions">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary">Design Guidelines Demo</h1>
            <div className="flex items-center gap-md">
              <ThemeToggle />
              <button
                onClick={() => setShowSideNav(!showSideNav)}
                className="touch-target btn-neutral"
                aria-label="Menu"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="content-portrait breathing-room">
          {/* Typography Demo */}
          <section className="surface-elevated breathing-room group-spacing">
            <h2 className="text-3xl font-bold text-primary">Typography</h2>
            <p className="text-secondary">
              Inter font with proper contrast ratios for accessibility
            </p>
            
            <div className="group-spacing">
              <h1 className="text-5xl font-bold text-primary">Heading 1</h1>
              <h2 className="text-4xl font-semibold text-primary">Heading 2</h2>
              <h3 className="text-3xl font-medium text-primary">Heading 3</h3>
              <h4 className="text-2xl font-medium text-primary">Heading 4</h4>
              <h5 className="text-xl font-medium text-primary">Heading 5</h5>
              <h6 className="text-lg font-medium text-primary">Heading 6</h6>
              
              <p className="text-base text-primary">
                Body text with normal weight and proper line height for readability.
              </p>
              <p className="text-sm text-secondary">
                Secondary text with reduced opacity for hierarchy.
              </p>
              <p className="text-xs text-tertiary">
                Tertiary text for captions and metadata.
              </p>
            </div>
          </section>

          {/* Color Palette Demo */}
          <section className="surface-elevated breathing-room group-spacing">
            <h2 className="text-3xl font-bold text-primary">Color Palette</h2>
            <p className="text-secondary">
              Primary, Secondary, and Neutral colors with semantic tokens
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
              <div className="surface breathing-room">
                <h3 className="text-xl font-semibold text-primary mb-sm">Primary</h3>
                <div className="btn-primary touch-target mb-sm">Primary Button</div>
                <div className="text-primary">Primary Text</div>
              </div>
              
              <div className="surface breathing-room">
                <h3 className="text-xl font-semibold text-primary mb-sm">Secondary</h3>
                <div className="btn-secondary touch-target mb-sm">Secondary Button</div>
                <div className="text-secondary">Secondary Text</div>
              </div>
              
              <div className="surface breathing-room">
                <h3 className="text-xl font-semibold text-primary mb-sm">Neutral</h3>
                <div className="btn-neutral touch-target mb-sm">Neutral Button</div>
                <div className="text-tertiary">Tertiary Text</div>
              </div>
            </div>
          </section>

          {/* Spacing Demo */}
          <section className="surface-elevated breathing-room group-spacing">
            <h2 className="text-3xl font-bold text-primary">Spacing System</h2>
            <p className="text-secondary">
              Consistent 8px base spacing with semantic utilities
            </p>
            
            <div className="group-spacing">
              <div className="surface p-xs">
                <span className="text-sm">Extra Small (4px)</span>
              </div>
              <div className="surface p-sm">
                <span className="text-sm">Small (8px)</span>
              </div>
              <div className="surface p-md">
                <span className="text-sm">Medium (16px)</span>
              </div>
              <div className="surface p-lg">
                <span className="text-sm">Large (24px)</span>
              </div>
              <div className="surface p-xl">
                <span className="text-sm">Extra Large (32px)</span>
              </div>
            </div>
          </section>

          {/* Touch Interactions Demo */}
          <section className="surface-elevated breathing-room group-spacing">
            <h2 className="text-3xl font-bold text-primary">Touch Interactions</h2>
            <p className="text-secondary">
              Minimum 44px targets with proper feedback
            </p>
            
            <div className="flex flex-wrap gap-md">
              <button className="touch-target btn-primary">
                <Home size={20} />
                <span className="ml-sm">Home</span>
              </button>
              
              <button className="touch-target-comfortable btn-secondary">
                <Ticket size={20} />
                <span className="ml-sm">Tickets</span>
              </button>
              
              <button className="touch-target-large btn-neutral">
                <Plus size={20} />
                <span className="ml-sm">Create</span>
              </button>
            </div>
          </section>

          {/* Layout Demo */}
          <section className="surface-elevated breathing-room group-spacing">
            <h2 className="text-3xl font-bold text-primary">Layout</h2>
            <p className="text-secondary">
              Core actions visible, limited buttons, clear CTAs
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              <div className="surface breathing-room">
                <h3 className="text-lg font-semibold text-primary mb-sm">Primary Actions</h3>
                <div className="btn-primary touch-target mb-sm">Create Event</div>
                <div className="btn-secondary touch-target">Browse Events</div>
              </div>
              
              <div className="surface breathing-room">
                <h3 className="text-lg font-semibold text-primary mb-sm">Secondary Actions</h3>
                <div className="btn-neutral touch-target mb-sm">Settings</div>
                <div className="btn-neutral touch-target">Help</div>
              </div>
            </div>
          </section>

          {/* Gesture Support Demo */}
          <section className="surface-elevated breathing-room group-spacing">
            <h2 className="text-3xl font-bold text-primary">Gesture Support</h2>
            <p className="text-secondary">
              Common gestures: tap, swipe, pinch
            </p>
            
            <div className="gesture-swipe surface breathing-room">
              <h3 className="text-lg font-semibold text-primary mb-sm">Swipeable Content</h3>
              <p className="text-secondary">
                This area supports swipe gestures for navigation
              </p>
            </div>
          </section>
        </main>

        {/* Bottom Navigation */}
        <nav className="bottom-navigation">
          <div className="flex items-center justify-around">
            <button className="nav-item active">
              <Home className="nav-icon" size={20} />
              <span className="nav-label">Inicio</span>
            </button>
            
            <button className="nav-item">
              <Search className="nav-icon" size={20} />
              <span className="nav-label">Eventos</span>
            </button>
            
            <button className="nav-item">
              <Plus className="nav-icon" size={20} />
              <span className="nav-label">Crear</span>
            </button>
            
            <button className="nav-item">
              <Ticket className="nav-icon" size={20} />
              <span className="nav-label">Tickets</span>
            </button>
            
            <button className="nav-item">
              <User className="nav-icon" size={20} />
              <span className="nav-label">Perfil</span>
            </button>
          </div>
        </nav>

        {/* Side Navigation */}
        <div className={`side-navigation ${showSideNav ? 'open' : ''}`}>
          <div className="flex items-center justify-between mb-lg">
            <h2 className="text-xl font-semibold text-primary">Settings</h2>
            <button
              onClick={() => setShowSideNav(false)}
              className="touch-target btn-neutral"
              aria-label="Close menu"
            >
              ×
            </button>
          </div>
          
          <div className="group-spacing">
            <button className="side-nav-item">
              <Settings className="nav-icon" size={20} />
              <span>Settings</span>
            </button>
            
            <button className="side-nav-item">
              <User className="nav-icon" size={20} />
              <span>Profile</span>
            </button>
            
            <button className="side-nav-item">
              <Ticket className="nav-icon" size={20} />
              <span>My Tickets</span>
            </button>
          </div>
        </div>

        {/* Backdrop for side navigation */}
        {showSideNav && (
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setShowSideNav(false)}
          />
        )}
      </div>
    </ThemeProvider>
  )
}
