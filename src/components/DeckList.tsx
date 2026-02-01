import React from 'react';
import type { Archetype, DeckCard } from '../types';

interface DeckListProps {
  deck: Archetype;
}

export function DeckList({ deck }: DeckListProps) {
  const getImageUrl = (name: string) => 
    `https://api.scryfall.com/cards/named?exact=${encodeURIComponent(name)}&format=image`;

  const CardGrid = ({ cards, title }: { cards: DeckCard[], title: string }) => (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-2">
        <h3 className="text-xl font-bold text-white">
            {title}
        </h3>
        <span className="text-xs font-mono font-medium text-slate-500 bg-slate-900 px-2 py-1 rounded-md border border-white/5">
            {cards.reduce((acc, c) => acc + c.quantity, 0)} cards
        </span>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {cards.map((card, idx) => (
          <div key={`${card.name}-${idx}`} className="group relative">
            <div className="aspect-[2.5/3.5] bg-slate-900 rounded-xl overflow-hidden border border-white/5 shadow-md transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-violet-500/20 group-hover:-translate-y-2 group-hover:border-violet-500/50">
                <img 
                    loading="lazy"
                    src={getImageUrl(card.name)} 
                    alt={card.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://placehold.co/400x560/1e293b/475569?text=No+Image';
                    }}
                />
                
                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            
            {/* Quantity Badge */}
            <div className="absolute -top-2 -right-2 bg-slate-900 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border border-violet-500/50 shadow-lg z-10">
              {card.quantity}
            </div>
            
            {/* Name label on hover for aesthetics/accessibility */}
            <div className="mt-2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-x-0 -bottom-8 pointer-events-none z-20">
                <span className="text-xs text-white bg-black/80 px-2 py-1 rounded backdrop-blur-sm shadow-xl whitespace-nowrap">
                    {card.name}
                </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <CardGrid cards={deck.mainboard} title="Mainboard" />
      <CardGrid cards={deck.sideboard} title="Sideboard" />
    </div>
  );
}
