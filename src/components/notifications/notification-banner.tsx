'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Bell, CheckCircle, AlertCircle, Info } from 'lucide-react'

interface Notification {
  id: string
  type: 'success' | 'error' | 'info' | 'warning'
  title: string
  message: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

interface NotificationBannerProps {
  notifications: Notification[]
  onRemove: (id: string) => void
}

export function NotificationBanner({ notifications, onRemove }: NotificationBannerProps) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="max-w-sm bg-black/90 backdrop-blur-lg border border-white/20 rounded-lg p-4 shadow-2xl"
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                {notification.type === 'success' && (
                  <CheckCircle className="h-5 w-5 text-green-400" />
                )}
                {notification.type === 'error' && (
                  <AlertCircle className="h-5 w-5 text-red-400" />
                )}
                {notification.type === 'warning' && (
                  <AlertCircle className="h-5 w-5 text-yellow-400" />
                )}
                {notification.type === 'info' && (
                  <Info className="h-5 w-5 text-blue-400" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-white">
                  {notification.title}
                </h4>
                <p className="text-sm text-gray-300 mt-1">
                  {notification.message}
                </p>
                
                {notification.action && (
                  <button
                    onClick={notification.action.onClick}
                    className="mt-2 text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded transition-colors"
                  >
                    {notification.action.label}
                  </button>
                )}
              </div>
              
              <button
                onClick={() => onRemove(notification.id)}
                className="flex-shrink-0 text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

// Hook para manejar notificaciones
export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newNotification = { ...notification, id }
    
    setNotifications(prev => [...prev, newNotification])
    
    // Auto-remove after duration
    if (notification.duration !== 0) {
      setTimeout(() => {
        removeNotification(id)
      }, notification.duration || 5000)
    }
  }

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAll
  }
}
