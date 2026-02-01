import React from 'react';
import type { Archetype } from '../types';

interface DeckCardProps {
  deck: Archetype;
  onClick: (deckName: string) => void;
}

export function DeckCard({ deck, onClick }: DeckCardProps) {
  // Helper to map color codes to CSS classes - refined palette
  const getColorClass = (color: string) => {
    const map: Record<string, string> = {
      'W': 'bg-amber-100/90 text-amber-900 border-amber-200',
      'U': 'bg-sky-100/90 text-sky-900 border-sky-200',
      'B': 'bg-slate-300/90 text-slate-900 border-slate-400',
      'R': 'bg-rose-100/90 text-rose-900 border-rose-200',
      'G': 'bg-emerald-100/90 text-emerald-900 border-emerald-200',
    };
    return map[color] || 'bg-slate-100 text-slate-800';
  };

  return (
    <div 
      onClick={() => onClick(deck.name)}
      className="group relative bg-slate-900/40 backdrop-blur-sm rounded-xl border border-white/5 
                 hover:border-violet-500/50 hover:bg-slate-800/60 transition-all duration-300 
                 cursor-pointer overflow-hidden hover:-translate-y-1 hover:shadow-2xl hover:shadow-violet-500/10"
    >
      {/* Decorative gradient blob */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-violet-500/10 rounded-full blur-3xl group-hover:bg-violet-500/20 transition-all duration-500" />

      <div className="p-6 relative z-10">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-slate-100 group-hover:text-white transition-colors">
            {deck.name}
          </h3>
          <div className="flex gap-1">
            {deck.colors.map(c => (
              <span key={c} className={`flex items-center justify-center w-6 h-6 rounded text-xs font-bold border ${getColorClass(c)}`}>
                {c}
              </span>
            ))}
          </div>
        </div>
        
        <p className="text-sm text-slate-400 mb-6 leading-relaxed">
          {deck.description}
        </p>
        
        <div className="pt-4 border-t border-white/5 flex flex-wrap gap-2">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1 w-full">Key Cards</span>
            {deck.mainboard.slice(0, 3).map((card, idx) => (
                <span key={idx} className="text-xs text-slate-300 bg-slate-800/80 px-2 py-1 rounded-md border border-white/5">
                    {card.name}
                </span>
            ))}
        </div>
      </div>
    </div>
  );
}
