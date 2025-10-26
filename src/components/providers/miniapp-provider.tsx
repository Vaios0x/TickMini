'use client'

import { useEffect } from 'react'
import { sdk } from '@farcaster/miniapp-sdk'

export function MiniAppProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Llamar ready() tan pronto como la app esté lista para ser mostrada
    // Esto oculta la pantalla de carga y muestra la app
    sdk.actions.ready()
  }, [])

  return <>{children}</>
}
