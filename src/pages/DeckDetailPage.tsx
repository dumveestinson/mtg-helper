import React from 'react';
import { mockDecks } from '../data/mockMeta';
import { DeckList } from '../components/DeckList';
import { MatchupGuide } from '../components/MatchupGuide';

interface DeckDetailPageProps {
  deckId: string;
  onBack: () => void;
}

export function DeckDetailPage({ deckId, onBack }: DeckDetailPageProps) {
  const deck = mockDecks.find(d => d.name === deckId);

  if (!deck) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl text-rose-500 font-bold mb-4">Deck Not Found</h2>
        <button onClick={onBack} className="text-violet-400 hover:text-violet-300 font-medium underline underline-offset-4">
          Return to Meta
        </button>
      </div>
    );
  }

  // Helper for colors
  const getColorBadge = (c: string) => {
     const colorMap: Record<string, string> = {
        'W': 'bg-amber-100/10 text-amber-200 border-amber-500/20',
        'U': 'bg-sky-100/10 text-sky-200 border-sky-500/20',
        'B': 'bg-slate-300/10 text-slate-200 border-slate-500/20',
        'R': 'bg-rose-100/10 text-rose-200 border-rose-500/20',
        'G': 'bg-emerald-100/10 text-emerald-200 border-emerald-500/20',
     };
     return (
         <span key={c} className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm font-bold border ${colorMap[c] || 'bg-gray-800 text-white'}`}>
             {c}
         </span>
     );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10">
        <button 
          onClick={onBack}
          className="group mb-6 inline-flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors"
        >
          <span className="mr-2 group-hover:-translate-x-1 transition-transform">&larr;</span> 
          Back to Meta Tier List
        </button>
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-white/5">
            <div>
                <div className="flex gap-2 mb-4">
                    {deck.colors.map(getColorBadge)}
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 tracking-tight">{deck.name}</h1>
                <p className="max-w-xl text-lg text-slate-400 leading-relaxed">
                    {deck.description}
                </p>
            </div>
            <div className="flex gap-3">
                 <button className="bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors border border-white/5 disabled:opacity-50" disabled>
                    Export to Arena
                 </button>
                 <button className="bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors shadow-lg shadow-violet-500/20 disabled:opacity-50" disabled>
                    Buy on TCGPlayer
                 </button>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <DeckList deck={deck} />
        </div>
        <div className="lg:col-span-1">
            <MatchupGuide currentDeckName={deck.name} />
        </div>
      </div>
    </div>
  );
}
