'use client'

import { Moon, Sun, Download, User } from 'lucide-react'

interface SettingsPanelProps {
  darkMode: boolean
  setDarkMode: (value: boolean) => void
  userName: string
  setUserName: (value: string) => void
  onExport: () => void
}

export function SettingsPanel({ darkMode, setDarkMode, userName, setUserName, onExport }: SettingsPanelProps) {
  return (
    <div className="max-w-2xl mx-auto space-y-6 fade-in-up" style={{'--delay': '0s'} as React.CSSProperties}>
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2" style={{fontSize: 'clamp(1.75rem, 4vw, 2.5rem)'}}>Settings</h1>
        <p className="text-white/60">Manage your preferences and account</p>
      </div>

      <div className="bg-white/5 backdrop-blur-lg border border-emerald-500/20 rounded-3xl p-6 space-y-6">
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/20">
              <User className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Display Name</h3>
              <p className="text-sm text-white/50">Used for team collaboration</p>
            </div>
          </div>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="bg-white/5 border border-emerald-500/20 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-emerald-400/50 w-48"
          />
        </div>

        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/20">
              {darkMode ? <Moon className="w-5 h-5 text-cyan-400" /> : <Sun className="w-5 h-5 text-cyan-400" />}
            </div>
            <div>
              <h3 className="font-semibold text-white">Dark Mode</h3>
              <p className="text-sm text-white/50">Toggle interface theme</p>
            </div>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${darkMode ? 'bg-emerald-500' : 'bg-white/20'}`}
          >
            <span
              className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-lg transition-transform duration-300 ${darkMode ? 'translate-x-6' : 'translate-x-0'}`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-500/20">
              <Download className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Export Data</h3>
              <p className="text-sm text-white/50">Copy all profile data to clipboard</p>
            </div>
          </div>
          <button
            onClick={onExport}
            className="bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-500 hover:to-cyan-500 text-black font-semibold px-4 py-2 rounded-xl shadow-lg shadow-emerald-500/25 transition-all duration-200 active:scale-95 text-sm"
          >
            Export JSON
          </button>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-lg border border-emerald-500/20 rounded-3xl p-6">
        <h3 className="font-semibold text-white mb-4">Integrations</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#4A154B] flex items-center justify-center text-white text-xs font-bold">Sl</div>
              <span className="text-white">Slack Alerts</span>
            </div>
            <span className="text-emerald-400 text-sm font-medium">Connected</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#00A1E0] flex items-center justify-center text-white text-xs font-bold">Sf</div>
              <span className="text-white">Salesforce CRM</span>
            </div>
            <span className="text-emerald-400 text-sm font-medium">Connected</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#0077B5] flex items-center justify-center text-white text-xs font-bold">in</div>
              <span className="text-white">LinkedIn API</span>
            </div>
            <span className="text-emerald-400 text-sm font-medium">Active</span>
          </div>
        </div>
      </div>
    </div>
  )
}