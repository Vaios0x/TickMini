import { Loader2 } from 'lucide-react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  text?: string
}

const sizeClasses: Record<string, string> = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-12 w-12',
}

export function LoadingSpinner({ 
  size = 'md', 
  className = '',
  text 
}: LoadingSpinnerProps) {
  const sizeClass = sizeClasses[size] || sizeClasses.md
  const combinedClass = `animate-spin text-primary ${sizeClass} ${className}`.trim()
  
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <Loader2 className={combinedClass} />
      {text && (
        <p className="text-sm text-muted-foreground">{text}</p>
      )}
    </div>
  )
}

export function LoadingSpinnerInline({ 
  size = 'sm', 
  className = ''
}: Omit<LoadingSpinnerProps, 'text'>) {
  const sizeClass = sizeClasses[size] || sizeClasses.sm
  const combinedClass = `animate-spin text-primary ${sizeClass} ${className}`.trim()
  
  return <Loader2 className={combinedClass} />
}
