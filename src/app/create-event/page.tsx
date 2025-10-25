'use client'

import * as React from 'react'
import { StepIndicator } from '@/components/create-event/step-indicator'
import { BasicInfoStep } from '@/components/create-event/basic-info-step'
import { DateLocationStep } from '@/components/create-event/date-location-step'
import { TicketConfigStep } from '@/components/create-event/ticket-config-step'
import { MultimediaStep } from '@/components/create-event/multimedia-step'
import { FinalConfigStep } from '@/components/create-event/final-config-step'
import { useContractTransactions } from '@/hooks/use-contract-transactions'
import { useSponsoredTransactions } from '@/hooks/use-sponsored-transactions'
import { SuccessModal } from '@/components/modals/success-modal'
import { useCreatedEvents } from '@/hooks/use-created-events'
import { getBestEventImage } from '@/lib/default-images'

export interface EventFormData {
  // Información básica
  title: string
  description: string
  category: string
  organizer: string
  
  // Fechas y ubicación
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  location: string
  address: string
  city: string
  country: string
  
  // Configuración de tickets
  ticketTypes: Array<{
    name: string
    description: string
    price: number
    quantity: number
    benefits: string[]
  }>
  
  // Multimedia
  images: string[]
  videos: string[]
  documents: string[]
  
  // Configuración final
  blockchain: string
  royaltyPercentage: number
  termsAccepted: boolean
}

const initialFormData: EventFormData = {
  title: '',
  description: '',
  category: '',
  organizer: '',
  startDate: '',
  endDate: '',
  startTime: '',
  endTime: '',
  location: '',
  address: '',
  city: '',
  country: '',
  ticketTypes: [
    {
      name: 'General',
      description: 'Acceso general al evento',
      price: 0.05,
      quantity: 100,
      benefits: ['Acceso al evento', 'Certificado de participación']
    }
  ],
  images: [],
  videos: [],
  documents: [],
  blockchain: 'base',
  royaltyPercentage: 5,
  termsAccepted: false
}

export default function CreateEventPage() {
  const [currentStep, setCurrentStep] = React.useState(1)
  const [formData, setFormData] = React.useState<EventFormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 })
  const [windowSize, setWindowSize] = React.useState({ width: 0, height: 0 })
  const [showSuccessModal, setShowSuccessModal] = React.useState(false)
  const [successData, setSuccessData] = React.useState({
    eventName: '',
    transactionHash: '',
    eventDate: '',
    location: ''
  })
  
  // Hooks para transacciones blockchain
  const {
    createEvent,
    isTransactionLoading,
    isTransactionSuccess,
    isTransactionError,
    transactionError,
    transactionHash,
    resetTransactionState
  } = useContractTransactions()
  
  // Hook para transacciones patrocinadas (DESACTIVADO - no se usa)
  // const {
  //   executeDemoTransaction,
  //   isSponsoredTxLoading,
  //   sponsoredTxError,
  //   sponsoredTxHash,
  //   resetSponsoredState
  // } = useSponsoredTransactions()

  // Hook para manejar eventos creados
  const { addEvent } = useCreatedEvents()

  // Monitorear cambios en currentStep
  React.useEffect(() => {
    console.log('🎯 useEffect: currentStep changed to:', currentStep)
  }, [currentStep])

  // Track mouse position and window size for parallax effects
  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }
    
    // Set initial window size
    handleResize()
    
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const updateFormData = (data: Partial<EventFormData>) => {
    setFormData(prev => ({ ...prev, ...data }))
  }

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const navigateToStep = (step: number) => {
    if (step >= 1 && step <= 5) {
      setCurrentStep(step)
    }
  }

  const handleSubmit = async () => {
    try {
      // Validación básica
      if (!formData.title || !formData.description || !formData.category || !formData.termsAccepted) {
        throw new Error('Por favor completa todos los campos obligatorios')
      }

      setIsSubmitting(true)
      resetTransactionState()
      // resetSponsoredState() - DESACTIVADO (no se usa)
      
      // Preparar datos del evento para blockchain
      const eventDate = new Date(`${formData.startDate} ${formData.startTime}`).getTime() / 1000
      const totalTickets = formData.ticketTypes.reduce((sum, ticket) => sum + ticket.quantity, 0)
      
      const eventData = {
        name: formData.title,
        description: formData.description,
        eventDate: Math.floor(eventDate),
        location: `${formData.location}, ${formData.city}, ${formData.country}`,
        totalTickets,
        metadataURI: `ipfs://QmDemo${Date.now()}` // En producción, subir a IPFS real
      }

      console.log('🚀 Creando evento en blockchain:', eventData)

      // Usar solo transacciones reales (sin fallback demo)
      const txResult = await createEvent(eventData)

      if (txResult && txResult.hash) {
        // Preparar datos para el modal de éxito
        const eventDate = new Date(`${formData.startDate} ${formData.startTime}`).toLocaleDateString('es-MX', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
        
        const location = `${formData.location}, ${formData.city}, ${formData.country}`
        
        // Guardar el evento en el almacenamiento local
        const createdEvent = addEvent({
          title: formData.title,
          description: formData.description,
          date: formData.startDate,
          time: formData.startTime,
          location: formData.location,
          city: formData.city,
          country: formData.country,
          category: formData.category,
          organizer: formData.organizer,
          image: getBestEventImage(formData.images[0], formData.category),
          ticketTypes: formData.ticketTypes,
          transactionHash: txResult.hash,
          eventId: txResult.eventId,
          isActive: true
        })
        
        console.log('🎉 Evento guardado localmente:', createdEvent)
        
        setSuccessData({
          eventName: formData.title,
          transactionHash: txResult.hash,
          eventDate: eventDate,
          location: location
        })
        
        setShowSuccessModal(true)
        
        // Resetear formulario después de mostrar el modal
        setTimeout(() => {
          setFormData(initialFormData)
          setCurrentStep(1)
        }, 100)
      } else {
        throw new Error('No se pudo crear el evento')
      }
    } catch (error) {
      alert(`Error: ${error instanceof Error ? error.message : 'Error desconocido'}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInfoStep
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
          />
        )
      case 2:
        return (
          <DateLocationStep
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )
      case 3:
        return (
          <TicketConfigStep
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )
      case 4:
        return (
          <MultimediaStep
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )
      case 5:
        return (
          <FinalConfigStep
            formData={formData}
            updateFormData={updateFormData}
            onSubmit={handleSubmit}
            onPrev={prevStep}
            isSubmitting={isSubmitting}
          />
        )
      default:
        return null
    }
  }

  const getProgressPercentage = () => {
    return (currentStep / 5) * 100
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
      position: 'relative',
      overflow: 'hidden',
      paddingTop: '80px'
    }}>
      {/* Dynamic Background Effects */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
          radial-gradient(circle at ${windowSize.width - mousePosition.x}px ${windowSize.height - mousePosition.y}px, rgba(255, 0, 255, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 20% 80%, rgba(0, 255, 0, 0.08) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 255, 0, 0.08) 0%, transparent 50%)
        `,
        pointerEvents: 'none',
        transition: 'all 0.1s ease'
      }} />
      
      {/* Animated Grid Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        animation: 'grid-move 20s linear infinite',
        pointerEvents: 'none'
      }} />

      <div style={{
        maxWidth: 'clamp(800px, 95vw, 1200px)',
        margin: '0 auto',
        padding: 'clamp(1rem, 3vw, 2rem)',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: 'clamp(2rem, 5vw, 3rem)',
          padding: 'clamp(2rem, 5vw, 3rem) clamp(1rem, 3vw, 2rem)',
          background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.08) 0%, rgba(255, 0, 255, 0.08) 50%, rgba(0, 255, 255, 0.08) 100%)',
          backdropFilter: 'blur(25px)',
          borderRadius: 'clamp(20px, 5vw, 40px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4), 0 0 120px rgba(0, 255, 255, 0.08)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Header Background Glow Effects */}
          <div style={{
            position: 'absolute',
            top: '-60%',
            left: '-60%',
            width: '220%',
            height: '220%',
            background: 'radial-gradient(circle, rgba(0, 255, 255, 0.08) 0%, transparent 60%)',
            animation: 'pulse 8s ease-in-out infinite'
          }} />
          <div style={{
            position: 'absolute',
            bottom: '-60%',
            right: '-60%',
            width: '220%',
            height: '220%',
            background: 'radial-gradient(circle, rgba(255, 0, 255, 0.08) 0%, transparent 60%)',
            animation: 'pulse 8s ease-in-out infinite reverse'
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
              background: 'linear-gradient(45deg, #00ffff 0%, #ff00ff 25%, #ffff00 50%, #00ff00 75%, #00ffff 100%)',
              backgroundSize: '400% 400%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
              fontWeight: '900',
              textShadow: '0 0 50px rgba(0, 255, 255, 0.8)',
              letterSpacing: 'clamp(2px, 1vw, 4px)',
              animation: 'gradient-shift 4s ease-in-out infinite',
              lineHeight: '1.1'
            }}>
              🚀 Crear Evento NFT
            </h1>
            
            <p style={{
              fontSize: 'clamp(1rem, 3vw, 1.3rem)',
              color: '#e0e0e0',
              maxWidth: 'clamp(400px, 80vw, 700px)',
              margin: '0 auto',
              lineHeight: '1.6',
              fontWeight: '300',
              opacity: '0.9'
            }}>
              Crea tu evento en Base Network y vende tickets NFT únicos
            </p>

            {/* Base Network Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'clamp(0.5rem, 2vw, 1rem)',
              background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.12), rgba(255, 0, 255, 0.12))',
              border: '2px solid rgba(0, 255, 255, 0.4)',
              borderRadius: 'clamp(20px, 6vw, 35px)',
              padding: 'clamp(0.8rem, 2vw, 1.2rem) clamp(1.5rem, 3vw, 2.5rem)',
              marginTop: 'clamp(1.5rem, 4vw, 2rem)',
              boxShadow: '0 0 40px rgba(0, 255, 255, 0.3)',
              backdropFilter: 'blur(15px)',
              position: 'relative',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              <span style={{ 
                fontSize: 'clamp(1.2rem, 4vw, 1.8rem)', 
                filter: 'drop-shadow(0 0 15px rgba(0, 255, 255, 0.6))',
                animation: 'pulse 2s ease-in-out infinite'
              }}>🔵</span>
              <span style={{ 
                color: '#00ffff', 
                fontWeight: '700', 
                fontSize: 'clamp(0.9rem, 3vw, 1.3rem)', 
                textShadow: '0 0 20px rgba(0, 255, 255, 0.6)',
                letterSpacing: '0.5px'
              }}>
                Base Network (L2 de Coinbase)
              </span>
              <span style={{ 
                background: 'linear-gradient(135deg, rgba(0, 255, 0, 0.25), rgba(0, 255, 255, 0.25))', 
                color: '#00ff00', 
                padding: 'clamp(0.3rem, 1vw, 0.4rem) clamp(0.6rem, 2vw, 1rem)', 
                borderRadius: 'clamp(12px, 3vw, 18px)', 
                fontSize: 'clamp(0.7rem, 2vw, 0.85rem)', 
                fontWeight: '700',
                border: '1px solid rgba(0, 255, 0, 0.4)',
                textShadow: '0 0 10px rgba(0, 255, 0, 0.5)',
                boxShadow: '0 0 20px rgba(0, 255, 0, 0.3)'
              }}>
                TESTNET
              </span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: 'clamp(10px, 2.5vw, 15px)',
          height: 'clamp(8px, 2vw, 12px)',
          marginBottom: 'clamp(1rem, 3vw, 2rem)',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <div style={{
            width: `${getProgressPercentage()}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #00ffff, #ff00ff, #ffff00, #00ff00)',
            backgroundSize: '400% 100%',
            borderRadius: 'clamp(10px, 2.5vw, 15px)',
            transition: 'width 0.5s ease',
            animation: 'gradient-shift 4s ease-in-out infinite',
            boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)'
          }} />
        </div>

        {/* Status Message */}
        <div style={{
          textAlign: 'center',
          marginBottom: 'clamp(2rem, 5vw, 3rem)',
          color: '#b0b0b0',
          fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
          fontWeight: '500'
        }}>
          Paso {currentStep} de 5 • {getProgressPercentage()}% completado
        </div>

        {/* Step Indicator */}
        <StepIndicator
          currentStep={currentStep}
          onStepClick={navigateToStep}
        />

        {/* Current Step Content */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(20px)',
          borderRadius: 'clamp(20px, 5vw, 30px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: 'clamp(2rem, 5vw, 3rem)',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3), 0 0 100px rgba(0, 255, 255, 0.05)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Content Background Glow */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'clamp(300px, 80vw, 500px)',
            height: 'clamp(300px, 80vw, 500px)',
            background: 'radial-gradient(circle, rgba(0, 255, 255, 0.05) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(60px)',
            pointerEvents: 'none'
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            {renderCurrentStep()}
          </div>
        </div>
      </div>

      {/* Modal de Éxito */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        eventName={successData.eventName}
        transactionHash={successData.transactionHash}
        eventDate={successData.eventDate}
        location={successData.location}
      />

      {/* CSS Animations */}
      <style>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
      `}</style>
    </div>
  )
}
