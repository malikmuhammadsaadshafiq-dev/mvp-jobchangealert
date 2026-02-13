'use client';

import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
  delay?: number;
}

export function StatsCard({ title, value, subtitle, trend, icon, delay = 0 }: StatsCardProps) {
  return (
    <div 
      className={cn(
        "bg-white/60 backdrop-blur-lg rounded-3xl border border-violet-200/50 shadow-lg p-6",
        "hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      )}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-violet-100/50 rounded-2xl">
          {icon}
        </div>
        {trend && (
          <span className={cn(
            "text-xs font-medium px-2 py-1 rounded-full",
            trend === 'up' && "bg-green-100 text-green-700",
            trend === 'down' && "bg-red-100 text-red-700",
            trend === 'neutral' && "bg-gray-100 text-gray-700"
          )}>
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} 12%
          </span>
        )}
      </div>
      <h3 className="text-3xl font-bold text-violet-950 mb-1">{value}</h3>
      <p className="text-sm text-violet-700/80 font-medium">{title}</p>
      {subtitle && <p className="text-xs text-violet-500 mt-2">{subtitle}</p>}
    </div>
  );
}