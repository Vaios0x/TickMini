'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useNotifications, NotificationBanner } from '@/components/notifications/notification-banner'

interface NotificationContextType {
  addNotification: (notification: any) => void
  removeNotification: (id: string) => void
  clearAll: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const { notifications, addNotification, removeNotification, clearAll } = useNotifications()

  return (
    <NotificationContext.Provider value={{ addNotification, removeNotification, clearAll }}>
      {children}
      <NotificationBanner 
        notifications={notifications} 
        onRemove={removeNotification} 
      />
    </NotificationContext.Provider>
  )
}

export function useNotification() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
}
