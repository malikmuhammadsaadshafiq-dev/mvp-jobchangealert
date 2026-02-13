'use client'

export function SkeletonCard() {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-emerald-500/20 rounded-3xl p-6 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-white/10" />
          <div className="space-y-2">
            <div className="w-32 h-4 bg-white/10 rounded" />
            <div className="w-24 h-3 bg-white/10 rounded" />
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-white/10" />
      </div>
      <div className="space-y-3 mb-4">
        <div className="w-full h-3 bg-white/10 rounded" />
        <div className="w-3/4 h-3 bg-white/10 rounded" />
        <div className="w-1/2 h-3 bg-white/10 rounded" />
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div className="w-20 h-6 bg-white/10 rounded-full" />
        <div className="flex gap-2">
          <div className="w-16 h-6 bg-white/10 rounded" />
          <div className="w-8 h-6 bg-white/10 rounded" />
        </div>
      </div>
    </div>
  )
}