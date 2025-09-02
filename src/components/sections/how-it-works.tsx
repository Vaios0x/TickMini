"use client"

import { motion } from 'framer-motion'
import { Search, CreditCard, Ticket, CheckCircle } from 'lucide-react'

const steps = [
  {
    icon: Search,
    title: 'Explora Eventos',
    description: 'Descubre eventos increíbles en nuestra plataforma. Filtra por categoría, fecha, ubicación y precio.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: CreditCard,
    title: 'Compra con Crypto',
    description: 'Paga con ETH, USDC o cualquier token compatible con Base Network. Transacciones rápidas y seguras.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Ticket,
    title: 'Recibe tu NFT',
    description: 'Tu ticket se mintea automáticamente como NFT único. Incluye metadatos del evento y beneficios exclusivos.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: CheckCircle,
    title: 'Disfruta el Evento',
    description: 'Presenta tu NFT en la entrada. Escaneo QR instantáneo y validación en blockchain.',
    color: 'from-orange-500 to-red-500',
  },
]

export function HowItWorks() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {steps.map((step, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="text-center group"
        >
          {/* Step Number */}
          <div className="relative mb-6">
            <div className="w-16 h-16 mx-auto bg-gradient-to-r from-muted to-muted/50 rounded-full flex items-center justify-center text-2xl font-bold text-muted-foreground mb-4">
              {index + 1}
            </div>
            
            {/* Icon */}
            <div className={`absolute inset-0 w-16 h-16 mx-auto bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300`}>
              <step.icon className="h-8 w-8 text-white" />
            </div>
          </div>

          {/* Content */}
          <h3 className="text-xl font-semibold text-foreground mb-3">
            {step.title}
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {step.description}
          </p>

          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div className="hidden lg:block absolute top-8 left-full w-8 h-0.5 bg-gradient-to-r from-muted to-transparent transform -translate-y-1/2" />
          )}
        </motion.div>
      ))}
    </div>
  )
}
