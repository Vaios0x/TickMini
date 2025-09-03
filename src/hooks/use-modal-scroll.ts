import { useEffect, useRef } from 'react'

export function useModalScroll(isOpen: boolean) {
  const scrollPosition = useRef(0)

  useEffect(() => {
    // Verificar que estamos en el cliente
    if (typeof window === 'undefined' || typeof document === 'undefined') return

    if (isOpen) {
      // Guardar la posición actual del scroll
      scrollPosition.current = window.pageYOffset || document.documentElement.scrollTop
      
      // Aplicar estilos para bloquear el scroll sin afectar el centrado
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollPosition.current}px`
      document.body.style.left = '0'
      document.body.style.right = '0'
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
      document.body.classList.add('modal-open')
      
      // Asegurar que el modal esté visible y centrado
      document.documentElement.style.scrollBehavior = 'auto'
      
      // Forzar un reflow para asegurar el centrado
      document.body.offsetHeight
      
      // Asegurar que el modal esté por encima de todo
      document.documentElement.style.zIndex = '10000'
      
      console.log('🔒 Scroll bloqueado, posición guardada:', scrollPosition.current)
    } else {
      // Restaurar la posición del scroll
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      document.body.classList.remove('modal-open')
      
      // Restaurar scroll behavior
      document.documentElement.style.scrollBehavior = ''
      document.documentElement.style.zIndex = ''
      
      // Scroll a la posición original
      if (scrollPosition.current > 0) {
        window.scrollTo(0, scrollPosition.current)
      }
      
      console.log('🔓 Scroll restaurado, posición:', scrollPosition.current)
    }

    return () => {
      // Cleanup: restaurar todo al estado original
      if (typeof document !== 'undefined') {
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.left = ''
        document.body.style.right = ''
        document.body.style.width = ''
        document.body.style.overflow = ''
        document.body.classList.remove('modal-open')
        document.documentElement.style.scrollBehavior = ''
        document.documentElement.style.zIndex = ''
      }
      
      if (typeof window !== 'undefined' && scrollPosition.current > 0) {
        window.scrollTo(0, scrollPosition.current)
      }
    }
  }, [isOpen])

  return scrollPosition.current
}
