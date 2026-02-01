import React from 'react';
import { mockDecks } from '../data/mockMeta';
import { DeckCard } from '../components/DeckCard';

interface MetaPageProps {
  onDeckSelect: (deckId: string) => void;
}

export function MetaPage({ onDeckSelect }: MetaPageProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <span className="text-violet-400 font-bold uppercase tracking-widest text-xs mb-2 block">Current Season</span>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            Standard <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-500">Meta Tier List</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-slate-400 leading-relaxed">
            Explore the top performing decks in the current Standard format. <br className="hidden md:block"/> Select a deck to view complete lists and sideboard guides.
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {mockDecks.map((deck) => (
          <DeckCard 
            key={deck.name} 
            deck={deck} 
            onClick={() => onDeckSelect(deck.name)} 
          />
        ))}
      </div>
    </div>
  );
}
