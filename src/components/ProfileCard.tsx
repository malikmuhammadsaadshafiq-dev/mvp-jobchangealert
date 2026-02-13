'use client'

import { Bell, BellOff, Mail, Trash2, ExternalLink, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Profile {
  id: string
  name: string
  title: string
  company: string
  previousCompany: string
  changeDate: string
  status: 'monitoring' | 'changed' | 'enriched' | 'contacted'
  email: string
  linkedInUrl: string
  notes: string
  alertEnabled: boolean
}

interface ProfileCardProps {
  profile: Profile
  onDelete: (id: string) => void
  onToggleAlert: (id: string) => void
  onEnrich: (id: string) => void
  onContact: (id: string) => void
}

export function ProfileCard({ profile, onDelete, onToggleAlert, onEnrich, onContact }: ProfileCardProps) {
  const statusColors = {
    monitoring: 'bg-white/10 text-white/60',
    changed: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    enriched: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    contacted: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  }

  const statusLabels = {
    monitoring: 'Monitoring',
    changed: 'Job Changed',
    enriched: 'Enriched',
    contacted: 'Contacted',
  }

  return (
    <div className="group bg-white/5 backdrop-blur-lg border border-emerald-500/20 rounded-3xl p-6 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/10">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center text-black font-bold text-lg">
            {profile.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <div>
            <h3 className="font-semibold text-white leading-tight">{profile.name}</h3>
            <p className="text-sm text-white/60">{profile.title}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onToggleAlert(profile.id)}
            className={cn(
              "p-2 rounded-full transition-all duration-200 active:scale-95",
              profile.alertEnabled ? "bg-emerald-500/20 text-emerald-400" : "bg-white/10 text-white/40 hover:text-white/60"
            )}
            title={profile.alertEnabled ? "Disable alerts" : "Enable alerts"}
          >
            {profile.alertEnabled ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
          </button>
          <button
            onClick={() => onDelete(profile.id)}
            className="p-2 rounded-full bg-white/10 text-white/40 hover:text-red-400 hover:bg-red-500/20 transition-all duration-200 active:scale-95"
            title="Remove profile"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-white/40">Current:</span>
          <span className="text-white font-medium">{profile.company}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-white/40">Previous:</span>
          <span className="text-white/60">{profile.previousCompany}</span>
        </div>
        {profile.email && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-white/40">Email:</span>
            <span className="text-emerald-400 font-medium">{profile.email}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-white/40">Changed:</span>
          <span className="text-white/60">{new Date(profile.changeDate).toLocaleDateString()}</span>
        </div>
      </div>

      {profile.notes && (
        <p className="text-sm text-white/50 mb-4 line-clamp-2">{profile.notes}</p>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <span className={cn("px-3 py-1 rounded-full text-xs font-medium border", statusColors[profile.status])}>
          {statusLabels[profile.status]}
        </span>
        <div className="flex gap-2">
          {profile.status === 'changed' && (
            <button
              onClick={() => onEnrich(profile.id)}
              className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-medium hover:bg-emerald-500/30 transition-all active:scale-95 flex items-center gap-1"
            >
              <Mail className="w-3 h-3" />
              Enrich
            </button>
          )}
          {(profile.status === 'enriched' || profile.status === 'changed') && profile.status !== 'contacted' && (
            <button
              onClick={() => onContact(profile.id)}
              className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 text-xs font-medium hover:bg-cyan-500/30 transition-all active:scale-95 flex items-center gap-1"
            >
              <CheckCircle className="w-3 h-3" />
              Mark Contacted
            </button>
          )}
          <a
            href={`https://${profile.linkedInUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg bg-white/10 text-white/60 hover:text-white hover:bg-white/20 transition-all active:scale-95"
          >
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  )
}