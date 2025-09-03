"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, Bell, CheckCircle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    
    if (!email) {
      toast({
        title: "Error",
        description: "Por favor ingresa tu email",
        variant: "destructive",
      })
      return
    }

    if (!email.includes('@')) {
      toast({
        title: "Email inválido",
        description: "Por favor ingresa un email válido",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    
    // Simular API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubscribed(true)
      setEmail('')
      
      toast({
        title: "¡Suscripción exitosa!",
        description: "Te mantendremos informado sobre nuevos eventos y actualizaciones",
        variant: "success",
      })
    }, 1000)
  }

  if (isSubscribed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-12 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-2xl border border-green-200 dark:border-green-800"
      >
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-foreground mb-2">
          ¡Gracias por suscribirte!
        </h3>
        <p className="text-muted-foreground mb-6">
          Te enviaremos las últimas noticias sobre eventos, nuevas funcionalidades y ofertas exclusivas.
        </p>
        <button
          onClick={() => setIsSubscribed(false)}
          tabIndex={0}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
        >
          Suscribir otro email
        </button>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <div className="max-w-2xl mx-auto">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-20 h-20 mx-auto bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full flex items-center justify-center mb-6"
        >
          <Bell className="h-10 w-10 text-primary" />
        </motion.div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Mantente Informado
        </h2>
        
        {/* Description */}
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          Recibe las últimas noticias sobre eventos, nuevas funcionalidades, 
          ofertas exclusivas y actualizaciones de la plataforma.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              tabIndex={0}
              aria-label="Email para newsletter"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="sm:w-auto inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            tabIndex={0}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                Suscribiendo...
              </>
            ) : (
              'Suscribirse'
            )}
          </button>
        </form>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-muted-foreground"
        >
          <div className="flex items-center justify-center space-x-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Sin spam</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Cancelar cuando quieras</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Ofertas exclusivas</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
