"use client"

import { SessionProvider } from 'next-auth/react'

interface AuthProviderProps {
  children: any
}

export function AuthProvider({ children }: AuthProviderProps) {
  return (
    <SessionProvider refetchInterval={0} refetchOnWindowFocus={false}>
      {children}
    </SessionProvider>
  )
}
