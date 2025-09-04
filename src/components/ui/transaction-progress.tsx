'use client'

import { useState, useEffect } from 'react'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle, XCircle, Loader2, ExternalLink, RefreshCw } from 'lucide-react'

interface TransactionStep {
  id: string
  title: string
  description: string
  status: 'pending' | 'loading' | 'success' | 'error'
  hash?: string
  error?: string
}

interface TransactionProgressProps {
  steps: TransactionStep[]
  onRetry?: () => void
  onClose?: () => void
  className?: string
}

export function TransactionProgress({ 
  steps, 
  onRetry, 
  onClose, 
  className 
}: TransactionProgressProps) {
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    // Encontrar el primer paso que no esté completado
    const firstIncompleteStep = steps.findIndex(step => 
      step.status === 'pending' || step.status === 'loading'
    )
    setCurrentStep(firstIncompleteStep >= 0 ? firstIncompleteStep : steps.length - 1)
  }, [steps])

  const getStepIcon = (step: TransactionStep) => {
    switch (step.status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />
      case 'loading':
        return <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
      default:
        return <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
    }
  }

  const getStepColor = (step: TransactionStep) => {
    switch (step.status) {
      case 'success':
        return 'border-green-200 bg-green-50'
      case 'error':
        return 'border-red-200 bg-red-50'
      case 'loading':
        return 'border-blue-200 bg-blue-50'
      default:
        return 'border-gray-200 bg-gray-50'
    }
  }

  const hasError = steps.some(step => step.status === 'error')
  const isComplete = steps.every(step => step.status === 'success')
  const isLoading = steps.some(step => step.status === 'loading')

  return (
    <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className || ''}`}>
      <div className="flex flex-col space-y-1.5 p-6 pb-3">
        <h3 className="text-lg font-semibold flex items-center justify-between">
          <span>Progreso de Transacción</span>
          <div className="flex gap-2">
            {hasError && onRetry && (
              <Button
                variant="outline"
                size="sm"
                onClick={onRetry}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                <RefreshCw className="h-3 w-3 mr-1" />
                Reintentar
              </Button>
            )}
            {onClose && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                disabled={isLoading}
              >
                Cerrar
              </Button>
            )}
          </div>
        </h3>
      </div>
      <div className="p-6 pt-0 space-y-4">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`p-4 rounded-lg border transition-all duration-200 ${getStepColor(step)}`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                {getStepIcon(step)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-sm">{step.title}</h4>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      step.status === 'success' ? 'text-green-600 border-green-200' :
                      step.status === 'error' ? 'text-red-600 border-red-200' :
                      step.status === 'loading' ? 'text-blue-600 border-blue-200' :
                      'text-gray-600 border-gray-200'
                    }`}
                  >
                    {step.status === 'success' ? 'Completado' :
                     step.status === 'error' ? 'Error' :
                     step.status === 'loading' ? 'Procesando...' :
                     'Pendiente'}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {step.description}
                </p>
                
                {step.hash && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Hash:</span>
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {step.hash.slice(0, 10)}...{step.hash.slice(-8)}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => window.open(`https://sepolia.basescan.org/tx/${step.hash}`, '_blank')}
                    >
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                )}
                
                {step.error && (
                  <div className="mt-2 p-2 bg-red-100 border border-red-200 rounded text-xs text-red-600">
                    {step.error}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {/* Resumen del estado */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Estado general:</span>
            <Badge 
              variant="outline"
              className={
                isComplete ? 'text-green-600 border-green-200' :
                hasError ? 'text-red-600 border-red-200' :
                isLoading ? 'text-blue-600 border-blue-200' :
                'text-gray-600 border-gray-200'
              }
            >
              {isComplete ? 'Completado' :
               hasError ? 'Error' :
               isLoading ? 'En progreso' :
               'Pendiente'}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
