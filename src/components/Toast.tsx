'use client'

import { X, CheckCircle, AlertCircle } from 'lucide-react'
import { useEffect } from 'react'

interface ToastProps {
  message: string
  type: 'success' | 'error'
  onClose: () => void
}

export function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slide-in">
      <div className={`
        flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-lg border
        ${type === 'success' 
          ? 'bg-emerald-500/90 border-emerald-400/50 text-white' 
          : 'bg-red-500/90 border-red-400/50 text-white'
        }
      `}>
        {type === 'success' ? (
          <CheckCircle className="w-5 h-5" />
        ) : (
          <AlertCircle className="w-5 h-5" />
        )}
        <span className="font-medium">{message}</span>
        <button 
          onClick={onClose}
          className="ml-2 p-1 hover:bg-white/20 rounded-full transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}