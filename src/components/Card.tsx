'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Briefcase, Building2, Mail, Calendar, ArrowRight } from 'lucide-react'

interface JobChange {
  id: string
  name: string
  previousRole: string
  newRole: string
  previousCompany: string
  newCompany: string
  dateDetected: string
  status: 'hot' | 'monitoring' | 'contacted' | 'enriched'
  email?: string
  avatar?: string
}

interface CardProps {
  job: JobChange
  onDelete: (id: string) => void
  onStatusChange: (id: string, status: JobChange['status']) => void
  style?: React.CSSProperties
}

export function Card({ job, onDelete, onStatusChange, style }: CardProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = () => {
    setIsDeleting(true)
    setTimeout(() => {
      onDelete(job.id)
    }, 300)
  }

  const statusColors = {
    hot: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    monitoring: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    contacted: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    enriched: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  }

  return (
    <div 
      style={style}
      className={cn(
        "group relative bg-white/5 backdrop-blur-lg border border-emerald-500/20 rounded-3xl p-6",
        "hover:bg-white/10 hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/10",
        "transition-all duration-300 hover:-translate-y-1",
        "fade-in-up",
        isDeleting && "animate-fade-out-left opacity-0"
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center text-black font-bold text-lg">
            {job.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h3 className="font-semibold text-white text-lg leading-tight">{job.name}</h3>
            <p className="text-sm text-white/60">{job.newRole}</p>
          </div>
        </div>
        <span className={cn(
          "px-3 py-1 rounded-full text-xs font-medium border",
          statusColors[job.status]
        )}>
          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-sm text-white/70">
          <Building2 className="w-4 h-4 text-emerald-400" />
          <span className="line-through opacity-50">{job.previousCompany}</span>
          <ArrowRight className="w-3 h-3 text-emerald-400" />
          <span className="text-emerald-300 font-medium">{job.newCompany}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-white/70">
          <Briefcase className="w-4 h-4 text-cyan-400" />
          <span>{job.previousRole}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-white/70">
          <Calendar className="w-4 h-4 text-cyan-400" />
          <span>Detected {job.dateDetected}</span>
        </div>

        {job.email && (
          <div className="flex items-center gap-2 text-sm text-white/70">
            <Mail className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-300">{job.email}</span>
          </div>
        )}
      </div>

      <div className="flex gap-2 mt-6 pt-4 border-t border-white/10">
        <button
          onClick={() => onStatusChange(job.id, 'contacted')}
          className="flex-1 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-500 hover:to-cyan-500 text-black font-semibold py-2 px-4 rounded-xl text-sm shadow-lg shadow-emerald-500/25 active:scale-95 transition-all duration-200"
        >
          Mark Contacted
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-500/50 transition-all duration-200 active:scale-95"
        >
          Remove
        </button>
      </div>
    </div>
  )
}