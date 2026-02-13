'use client'

import { Users, TrendingUp, Mail, CheckCircle, Zap } from 'lucide-react'

interface Stats {
  total: number
  changed: number
  enriched: number
  contacted: number
  hotLeads: number
}

interface Profile {
  id: string
  name: string
  title: string
  company: string
  changeDate: string
  status: string
}

interface DashboardStatsProps {
  stats: Stats
  recentProfiles: Profile[]
}

export function DashboardStats({ stats, recentProfiles }: DashboardStatsProps) {
  const completionRate = stats.total > 0 ? Math.round((stats.contacted / stats.total) * 100) : 0

  return (
    <div className="space-y-6 fade-in-up" style={{'--delay': '0s'} as React.CSSProperties}>
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2" style={{fontSize: 'clamp(1.75rem, 4vw, 2.5rem)'}}>Dashboard</h1>
        <p className="text-white/60">Overview of your job change monitoring activity</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/5 backdrop-blur-lg border border-emerald-500/20 rounded-3xl p-6 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-2xl bg-emerald-500/20">
              <Users className="w-6 h-6 text-emerald-400" />
            </div>
            <span className="text-2xl font-bold text-white">{stats.total}</span>
          </div>
          <p className="text-white/60 text-sm">Total Monitored</p>
        </div>

        <div className="bg-white/5 backdrop-blur-lg border border-emerald-500/20 rounded-3xl p-6 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-2xl bg-amber-500/20">
              <Zap className="w-6 h-6 text-amber-400" />
            </div>
            <span className="text-2xl font-bold text-white">{stats.hotLeads}</span>
          </div>
          <p className="text-white/60 text-sm">Hot Leads</p>
        </div>

        <div className="bg-white/5 backdrop-blur-lg border border-emerald-500/20 rounded-3xl p-6 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-2xl bg-cyan-500/20">
              <Mail className="w-6 h-6 text-cyan-400" />
            </div>
            <span className="text-2xl font-bold text-white">{stats.enriched}</span>
          </div>
          <p className="text-white/60 text-sm">Contacts Enriched</p>
        </div>

        <div className="bg-white/5 backdrop-blur-lg border border-emerald-500/20 rounded-3xl p-6 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-2xl bg-purple-500/20">
              <TrendingUp className="w-6 h-6 text-purple-400" />
            </div>
            <span className="text-2xl font-bold text-white">{completionRate}%</span>
          </div>
          <p className="text-white/60 text-sm">Outreach Rate</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/5 backdrop-blur-lg border border-emerald-500/20 rounded-3xl p-6">
          <h3 className="text-lg font-semibold mb-6">Status Breakdown</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-white/60">Monitoring</span>
                <span className="text-white">{stats.total - stats.changed}</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white/40 rounded-full transition-all duration-500"
                  style={{ width: `${((stats.total - stats.changed) / stats.total) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-amber-400">Job Changed</span>
                <span className="text-white">{stats.changed - stats.enriched}</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-400 rounded-full transition-all duration-500"
                  style={{ width: `${((stats.changed - stats.enriched) / stats.total) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-emerald-400">Enriched</span>
                <span className="text-white">{stats.enriched - stats.contacted}</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${((stats.enriched - stats.contacted) / stats.total) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-cyan-400">Contacted</span>
                <span className="text-white">{stats.contacted}</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-cyan-400 rounded-full transition-all duration-500"
                  style={{ width: `${(stats.contacted / stats.total) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-lg border border-emerald-500/20 rounded-3xl p-6">
          <h3 className="text-lg font-semibold mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {recentProfiles.length === 0 ? (
              <p className="text-white/40 text-sm">No recent activity</p>
            ) : (
              recentProfiles.map((profile) => (
                <div key={profile.id} className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 flex items-center justify-center text-sm font-medium text-emerald-400">
                    {profile.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{profile.name}</p>
                    <p className="text-xs text-white/50 truncate">Moved to {profile.company}</p>
                  </div>
                  <span className="text-xs text-white/40">
                    {new Date(profile.changeDate).toLocaleDateString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}