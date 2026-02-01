import React, { useState } from 'react';
import { searchCards } from '../services/scryfall';
import type { ScryfallCard } from '../types';

export function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ScryfallCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    setHasSearched(true);
    
    try {
      const cards = await searchCards(query);
      setResults(cards);
    } catch (err) {
      setError('Failed to fetch cards. Please try again.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold text-white mb-6">Card Search</h1>
        <p className="text-slate-400 mb-8 text-lg">
          Find cards legal in Standard. <br />
          <span className="text-xs uppercase tracking-widest text-violet-400 font-semibold mt-2 inline-block">Automated Legality Filter Active</span>
        </p>

        <form onSubmit={handleSearch} className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl blur opacity-20 group-focus-within:opacity-50 transition duration-500"></div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a card name..."
            className="relative w-full bg-slate-900 border border-white/10 rounded-xl py-5 px-8 text-white placeholder-slate-500 focus:outline-none focus:ring-0 text-xl shadow-2xl"
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-3 top-3 bottom-3 bg-violet-600 hover:bg-violet-500 text-white font-medium rounded-lg px-8 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-violet-500/25"
          >
            {loading ? (
                <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Searching
                </span>
            ) : 'Search'}
          </button>
        </form>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-200 px-6 py-4 rounded-xl text-center max-w-2xl mx-auto mb-12 backdrop-blur-sm">
          {error}
        </div>
      )}

      {hasSearched && !loading && results.length === 0 && !error && (
        <div className="text-center text-slate-500 py-20 bg-slate-900/40 rounded-3xl border border-white/5 mx-auto max-w-2xl">
          <p className="text-lg">No standard-legal cards found for "{query}".</p>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {results.map((card) => {
            const imageUri = card.image_uris?.normal || 
                             (card as any).card_faces?.[0]?.image_uris?.normal || 
                             'https://placehold.co/488x680?text=No+Image';

            return (
                <div key={card.id} className="group relative bg-slate-900 rounded-2xl p-2 pb-4 shadow-xl border border-white/5 hover:border-violet-500/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-violet-500/10">
                    <div className="aspect-[2.5/3.5] overflow-hidden rounded-xl bg-slate-950 relative">
                        {/* Shimmer loading effect placeholder could go here */}
                        <img 
                            src={imageUri} 
                            alt={card.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                    </div>
                    <div className="px-2 pt-4">
                        <h3 className="text-slate-200 font-semibold truncate text-sm">{card.name}</h3>
                        <div className="flex justify-between items-center mt-2">
                            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">{card.rarity}</span>
                            <span className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded border border-white/5">
                                {card.set}
                            </span>
                        </div>
                    </div>
                </div>
            );
        })}
      </div>
    </div>
  );
}
