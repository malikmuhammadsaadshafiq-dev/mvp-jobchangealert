'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface Alert {
  id: string;
  name: string;
  previousCompany: string;
  newCompany: string;
  previousRole: string;
  newRole: string;
  changeDate: string;
  status: 'new' | 'contacted' | 'enriched' | 'converted';
  email?: string;
  linkedInUrl?: string;
}

interface AlertCardProps {
  alert: Alert;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Alert['status']) => void;
  isDeleting?: boolean;
}

export function AlertCard({ alert, onDelete, onStatusChange, isDeleting }: AlertCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const statusColors = {
    new: 'bg-amber-100 text-amber-800 border-amber-200',
    contacted: 'bg-blue-100 text-blue-800 border-blue-200',
    enriched: 'bg-violet-100 text-violet-800 border-violet-200',
    converted: 'bg-green-100 text-green-800 border-green-200'
  };

  return (
    <div 
      className={cn(
        "bg-white/60 backdrop-blur-lg rounded-3xl border border-violet-200/50 shadow-lg p-6 transition-all duration-300",
        "hover:shadow-xl hover:-translate-y-1",
        isDeleting && "opacity-0 -translate-x-full transition-all duration-500"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${Math.random() * 0.2}s` }}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-violet-950">{alert.name}</h3>
          <p className="text-sm text-violet-700/80">{alert.newRole}</p>
        </div>
        <span className={cn("px-3 py-1 rounded-full text-xs font-medium border", statusColors[alert.status])}>
          {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-violet-400">From:</span>
          <span className="text-violet-900 font-medium">{alert.previousCompany}</span>
          <span className="text-violet-400">→</span>
          <span className="text-violet-900 font-medium">{alert.newCompany}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-violet-600">
          <span>Changed: {new Date(alert.changeDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>
        {alert.email && (
          <div className="text-sm text-violet-700 bg-violet-50/50 rounded-lg p-2">
            📧 {alert.email}
          </div>
        )}
      </div>

      <div className="flex gap-2 pt-4 border-t border-violet-100">
        <select
          value={alert.status}
          onChange={(e) => onStatusChange(alert.id, e.target.value as Alert['status'])}
          className="flex-1 bg-white/80 border border-violet-200 rounded-xl px-3 py-2 text-sm text-violet-900 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
        >
          <option value="new">Mark as New</option>
          <option value="contacted">Mark Contacted</option>
          <option value="enriched">Mark Enriched</option>
          <option value="converted">Mark Converted</option>
        </select>
        <button
          onClick={() => onDelete(alert.id)}
          className="px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors text-sm font-medium active:scale-95"
        >
          Delete
        </button>
      </div>
    </div>
  );
}