'use client'

import { useState, useEffect } from 'react'
import { ProfileCard } from '@/components/ProfileCard'
import { DashboardStats } from '@/components/DashboardStats'
import { SettingsPanel } from '@/components/SettingsPanel'
import { Toast } from '@/components/Toast'
import { SkeletonCard } from '@/components/SkeletonCard'
import { Search, Plus, Bell, Settings, LayoutDashboard, Users } from 'lucide-react'

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

export default function JobChangeAlert() {
  const [activeTab, setActiveTab] = useState('home')
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('date')
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [userName, setUserName] = useState('Alex Morgan')
  
  const [formData, setFormData] = useState({
    name: '',
    linkedInUrl: '',
    company: '',
    title: ''
  })
  
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    const savedProfiles = localStorage.getItem('jobChangeProfiles')
    const savedDarkMode = localStorage.getItem('jca_darkMode')
    const savedUserName = localStorage.getItem('jca_userName')
    
    if (savedDarkMode) setDarkMode(JSON.parse(savedDarkMode))
    if (savedUserName) setUserName(savedUserName)
    
    if (savedProfiles) {
      setProfiles(JSON.parse(savedProfiles))
    } else {
      setProfiles([
        {
          id: '1',
          name: 'Sarah Chen',
          title: 'VP of Engineering',
          company: 'Stripe',
          previousCompany: 'Netflix',
          changeDate: '2024-03-15',
          status: 'changed',
          email: 's.chen@stripe.com',
          linkedInUrl: 'linkedin.com/in/sarahchen',
          notes: 'Previously led the platform infrastructure team at Netflix. Expert in distributed systems and high-scale architecture.',
          alertEnabled: true
        },
        {
          id: '2',
          name: 'Michael Rodriguez',
          title: 'Director of Enterprise Sales',
          company: 'Salesforce',
          previousCompany: 'HubSpot',
          changeDate: '2024-03-12',
          status: 'enriched',
          email: 'm.rodriguez@salesforce.com',
          linkedInUrl: 'linkedin.com/in/mrodriguez',
          notes: 'Closed $50M+ in ARR at HubSpot. Strong relationships with Fortune 500 C-suites.',
          alertEnabled: true
        },
        {
          id: '3',
          name: 'Emily Watson',
          title: 'Chief Technology Officer',
          company: 'Airbnb',
          previousCompany: 'Uber',
          changeDate: '2024-03-10',
          status: 'contacted',
          email: 'emily.w@airbnb.com',
          linkedInUrl: 'linkedin.com/in/emilywatson',
          notes: 'Former Uber engineering lead. Specializes in marketplace dynamics and pricing algorithms.',
          alertEnabled: false
        },
        {
          id: '4',
          name: 'James Liu',
          title: 'Senior Product Manager',
          company: 'Google',
          previousCompany: 'Meta',
          changeDate: '2024-03-08',
          status: 'changed',
          email: 'jamesliu@google.com',
          linkedInUrl: 'linkedin.com/in/jamesliu',
          notes: 'Led Messenger growth initiatives at Meta. Deep expertise in consumer social products.',
          alertEnabled: true
        },
        {
          id: '5',
          name: 'Olivia Martinez',
          title: 'Head of Global Marketing',
          company: 'Spotify',
          previousCompany: 'Adobe',
          changeDate: '2024-03-05',
          status: 'monitoring',
          email: '',
          linkedInUrl: 'linkedin.com/in/oliviamartinez',
          notes: 'Award-winning campaign leader. Strong background in creative brand strategy.',
          alertEnabled: true
        },
        {
          id: '6',
          name: 'David Kim',
          title: 'Principal Solutions Architect',
          company: 'AWS',
          previousCompany: 'Microsoft',
          changeDate: '2024-03-01',
          status: 'enriched',
          email: 'dkim@aws.amazon.com',
          linkedInUrl: 'linkedin.com/in/davidkim',
          notes: 'Cloud infrastructure expert. Previously architected Azure solutions for enterprise clients.',
          alertEnabled: true
        },
        {
          id: '7',
          name: 'Sophia Anderson',
          title: 'VP of People Operations',
          company: 'Notion',
          previousCompany: 'Slack',
          changeDate: '2024-02-28',
          status: 'changed',
          email: 'sophia@notion.so',
          linkedInUrl: 'linkedin.com/in/sophiaanderson',
          notes: 'Scaling high-performance teams. Expert in remote-first culture development.',
          alertEnabled: true
        },
        {
          id: '8',
          name: 'Marcus Johnson',
          title: 'Finance Director',
          company: 'Bloomberg',
          previousCompany: 'Goldman Sachs',
          changeDate: '2024-02-25',
          status: 'monitoring',
          email: '',
          linkedInUrl: 'linkedin.com/in/marcusjohnson',
          notes: 'Former investment banker with deep fintech expertise. CFA charterholder.',
          alertEnabled: false
        },
        {
          id: '9',
          name: 'Lisa Zhang',
          title: 'Engineering Manager',
          company: 'Figma',
          previousCompany: 'Dropbox',
          changeDate: '2024-02-20',
          status: 'contacted',
          email: 'lisa.zhang@figma.com',
          linkedInUrl: 'linkedin.com/in/lisazhang',
          notes: 'Leading design systems engineering. Previously built collaboration features at Dropbox.',
          alertEnabled: true
        },
        {
          id: '10',
          name: 'Alex Thompson',
          title: 'Chief Revenue Officer',
          company: 'Zoom',
          previousCompany: 'Cisco',
          changeDate: '2024-02-18',
          status: 'enriched',
          email: 'alex.thompson@zoom.us',
          linkedInUrl: 'linkedin.com/in/alexthompson',
          notes: '20+ years in enterprise sales. Deep network in the collaboration software space.',
          alertEnabled: true
        },
        {
          id: '11',
          name: 'Rachel Green',
          title: 'Design Director',
          company: 'Canva',
          previousCompany: 'Pinterest',
          changeDate: '2024-02-15',
          status: 'changed',
          email: 'rachel@canva.com',
          linkedInUrl: 'linkedin.com/in/rachelgreen',
          notes: 'Expert in design systems and creative tools. Led Pinterest design language evolution.',
          alertEnabled: true
        },
        {
          id: '12',
          name: 'Kevin Patel',
          title: 'Lead DevOps Engineer',
          company: 'Datadog',
          previousCompany: 'New Relic',
          changeDate: '2024-02-10',
          status: 'monitoring',
          email: '',
          linkedInUrl: 'linkedin.com/in/kevinpatel',
          notes: 'Observability and monitoring specialist. Kubernetes and cloud-native architecture expert.',
          alertEnabled: true
        }
      ])
    }
    
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!loading) {
      localStorage.setItem('jobChangeProfiles', JSON.stringify(profiles))
    }
  }, [profiles, loading])

  useEffect(() => {
    localStorage.setItem('jca_darkMode', JSON.stringify(darkMode))
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  useEffect(() => {
    localStorage.setItem('jca_userName', userName)
  }, [userName])

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [toast])

  const filteredProfiles = profiles
    .filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(b.changeDate).getTime() - new Date(a.changeDate).getTime()
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      if (sortBy === 'company') return a.company.localeCompare(b.company)
      return 0
    })

  const handleDelete = (id: string) => {
    setProfiles(prev => prev.filter(p => p.id !== id))
    setToast({ message: 'Profile removed from monitoring', type: 'success' })
  }

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errors: Record<string, string> = {}
    
    if (!formData.name.trim()) errors.name = 'Full name is required'
    if (!formData.linkedInUrl.trim()) errors.linkedInUrl = 'LinkedIn profile URL is required'
    if (!formData.company.trim()) errors.company = 'Current company is required'
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    const newProfile: Profile = {
      id: Date.now().toString(),
      name: formData.name.trim(),
      title: formData.title.trim() || 'Unknown Position',
      company: formData.company.trim(),
      previousCompany: 'Unknown',
      changeDate: new Date().toISOString().split('T')[0],
      status: 'monitoring',
      email: '',
      linkedInUrl: formData.linkedInUrl.trim(),
      notes: '',
      alertEnabled: true
    }

    setProfiles(prev => [newProfile, ...prev])
    setIsAddModalOpen(false)
    setFormData({ name: '', linkedInUrl: '', company: '', title: '' })
    setFormErrors({})
    setToast({ message: 'Profile added to monitoring list', type: 'success' })
  }

  const toggleAlert = (id: string) => {
    setProfiles(prev => prev.map(p => 
      p.id === id ? { ...p, alertEnabled: !p.alertEnabled } : p
    ))
  }

  const enrichContact = (id: string) => {
    setProfiles(prev => prev.map(p => {
      if (p.id === id) {
        const domain = p.company.toLowerCase().replace(/\s+/g, '') + '.com'
        const email = p.name.toLowerCase().replace(/\s+/g, '.') + '@' + domain
        return { ...p, status: 'enriched', email: email }
      }
      return p
    }))
    setToast({ message: 'Contact enriched with work email', type: 'success' })
  }

  const markAsContacted = (id: string) => {
    setProfiles(prev => prev.map(p => 
      p.id === id ? { ...p, status: 'contacted' } : p
    ))
    setToast({ message: 'Marked as contacted and synced to CRM', type: 'success' })
  }

  const exportData = () => {
    const dataStr = JSON.stringify(profiles, null, 2)
    navigator.clipboard.writeText(dataStr)
    setToast({ message: 'Data exported to clipboard', type: 'success' })
  }

  const stats = {
    total: profiles.length,
    changed: profiles.filter(p => p.status !== 'monitoring').length,
    enriched: profiles.filter(p => p.status === 'enriched' || p.status === 'contacted').length,
    contacted: profiles.filter(p => p.status === 'contacted').length,
    hotLeads: profiles.filter(p => p.status === 'changed' && p.alertEnabled).length
  }

  return (
    <div className={`min-h-screen aurora-bg relative overflow-hidden ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-cyan-950 to-blue-950 text-white font-sans">
        <nav className="sticky top-0 z-50 bg-white/5 backdrop-blur-lg border-b border-emerald-500/20">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-lg flex items-center justify-center">
                <Bell className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-bold tracking-tight">JobChangeAlert</span>
            </div>
            
            <div className="flex items-center gap-1 bg-white/5 rounded-full p-1">
              <button
                onClick={() => setActiveTab('home')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${activeTab === 'home' ? 'bg-gradient-to-r from-emerald-400 to-cyan-400 text-black shadow-lg shadow-emerald-500/25' : 'text-white/70 hover:text-white hover:bg-white/10'}`}
              >
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">Monitored</span>
              </button>
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${activeTab === 'dashboard' ? 'bg-gradient-to-r from-emerald-400 to-cyan-400 text-black shadow-lg shadow-emerald-500/25' : 'text-white/70 hover:text-white hover:bg-white/10'}`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${activeTab === 'settings' ? 'bg-gradient-to-r from-emerald-400 to-cyan-400 text-black shadow-lg shadow-emerald-500/25' : 'text-white/70 hover:text-white hover:bg-white/10'}`}
              >
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Settings</span>
              </button>
            </div>
          </div>
        </nav>

        <main className="max-w-6xl mx-auto px-4 py-8">
          {activeTab === 'home' && (
            <div className="space-y-6 fade-in-up" style={{'--delay': '0s'} as React.CSSProperties}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-4xl font-bold tracking-tight mb-1" style={{fontSize: 'clamp(1.75rem, 4vw, 2.5rem)'}}>Monitored Profiles</h1>
                  <p className="text-white/60">Track job changes and trigger timely outreach</p>
                </div>
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-500 hover:to-cyan-500 text-black font-semibold px-6 py-3 rounded-xl shadow-lg shadow-emerald-500/25 transition-all duration-200 active:scale-95 flex items-center gap-2 w-fit"
                >
                  <Plus className="w-5 h-5" />
                  Add Profile
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="text"
                    placeholder="Search by name, company, or title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/5 border border-emerald-500/20 rounded-xl pl-10 pr-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/20 transition-all"
                  />
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white/5 border border-emerald-500/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-400/50 cursor-pointer"
                >
                  <option value="date" className="bg-slate-900">Sort by Date</option>
                  <option value="name" className="bg-slate-900">Sort by Name</option>
                  <option value="company" className="bg-slate-900">Sort by Company</option>
                </select>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
                </div>
              ) : filteredProfiles.length === 0 ? (
                <div className="text-center py-16 bg-white/5 backdrop-blur-lg border border-emerald-500/20 rounded-3xl">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white/40" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No profiles found</h3>
                  <p className="text-white/60 mb-6">Start monitoring LinkedIn profiles for job changes</p>
                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-500 hover:to-cyan-500 text-black font-semibold px-6 py-3 rounded-xl shadow-lg shadow-emerald-500/25 transition-all duration-200 active:scale-95"
                  >
                    Add Your First Profile
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProfiles.map((profile, index) => (
                    <div key={profile.id} className="fade-in-up" style={{'--delay': `${index * 0.05}s`} as React.CSSProperties}>
                      <ProfileCard
                        profile={profile}
                        onDelete={handleDelete}
                        onToggleAlert={toggleAlert}
                        onEnrich={enrichContact}
                        onContact={markAsContacted}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'dashboard' && (
            <DashboardStats 
              stats={stats} 
              recentProfiles={profiles.slice(0, 5)} 
            />
          )}

          {activeTab === 'settings' && (
            <SettingsPanel
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              userName={userName}
              setUserName={setUserName}
              onExport={exportData}
            />
          )}
        </main>

        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-slate-900 border border-emerald-500/20 rounded-3xl p-6 w-full max-w-md shadow-2xl fade-in-up">
              <h2 className="text-2xl font-bold mb-6">Add New Profile</h2>
              <form onSubmit={handleAddSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g., Sarah Chen"
                    className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-emerald-400/50 transition-all ${formErrors.name ? 'border-red-500' : 'border-emerald-500/20'}`}
                  />
                  {formErrors.name && <p className="text-red-400 text-sm mt-1">{formErrors.name}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">LinkedIn URL</label>
                  <input
                    type="text"
                    value={formData.linkedInUrl}
                    onChange={(e) => setFormData({...formData, linkedInUrl: e.target.value})}
                    placeholder="e.g., linkedin.com/in/sarahchen"
                    className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-emerald-400/50 transition-all ${formErrors.linkedInUrl ? 'border-red-500' : 'border-emerald-500/20'}`}
                  />
                  {formErrors.linkedInUrl && <p className="text-red-400 text-sm mt-1">{formErrors.linkedInUrl}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Current Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    placeholder="e.g., Stripe"
                    className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-emerald-400/50 transition-all ${formErrors.company ? 'border-red-500' : 'border-emerald-500/20'}`}
                  />
                  {formErrors.company && <p className="text-red-400 text-sm mt-1">{formErrors.company}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Job Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="e.g., VP of Engineering"
                    className="w-full bg-white/5 border border-emerald-500/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-emerald-400/50 transition-all"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddModalOpen(false)
                      setFormErrors({})
                      setFormData({ name: '', linkedInUrl: '', company: '', title: '' })
                    }}
                    className="flex-1 px-4 py-3 rounded-xl border border-white/20 text-white font-medium hover:bg-white/5 transition-all active:scale-95"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-500 hover:to-cyan-500 text-black font-semibold px-4 py-3 rounded-xl shadow-lg shadow-emerald-500/25 transition-all duration-200 active:scale-95"
                  >
                    Start Monitoring
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </div>
    </div>
  )
}