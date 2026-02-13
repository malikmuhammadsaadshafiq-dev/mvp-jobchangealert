'use client';

interface EmptyStateProps {
  onAddClick: () => void;
}

export function EmptyState({ onAddClick }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-24 h-24 bg-violet-100 rounded-full flex items-center justify-center mb-6">
        <svg className="w-12 h-12 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-violet-950 mb-2">No job changes detected yet</h3>
      <p className="text-violet-700/70 max-w-md mb-6">
        Start monitoring LinkedIn profiles to get alerted when decision makers change roles. Add your first prospect to begin.
      </p>
      <button
        onClick={onAddClick}
        className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-medium rounded-2xl px-6 py-3 shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 hover:-translate-y-0.5 transition-all active:scale-95"
      >
        Add Your First Prospect
      </button>
    </div>
  );
}