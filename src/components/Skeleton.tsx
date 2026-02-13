'use client'

import { cn } from '@/lib/utils'

export function SkeletonCard() {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-emerald-500/10 rounded-3xl p-6 space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full skeleton-shimmer" />
        <div className="space-y-2 flex-1">
          <div className="h-4 w-24 rounded skeleton-shimmer" />
          <div className="h-3 w-32 rounded skeleton-shimmer" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 w-full rounded skeleton-shimmer" />
        <div className="h-3 w-3/4 rounded skeleton-shimmer" />
        <div className="h-3 w-1/2 rounded skeleton-shimmer" />
      </div>
      <div className="flex gap-2 pt-4">
        <div className="h-10 flex-1 rounded-xl skeleton-shimmer" />
        <div className="h-10 w-20 rounded-xl skeleton-shimmer" />
      </div>
    </div>
  )
}

export function SkeletonStat() {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-emerald-500/10 rounded-3xl p-6">
      <div className="h-4 w-24 rounded skeleton-shimmer mb-2" />
      <div className="h-8 w-16 rounded skeleton-shimmer" />
    </div>
  )
}