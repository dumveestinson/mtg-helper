import React, { useState, useMemo } from 'react';
import { mockDecks, mockMatchups } from '../data/mockMeta';
import type { DeckCard } from '../types';

interface MatchupGuideProps {
  currentDeckName: string;
}

export function MatchupGuide({ currentDeckName }: MatchupGuideProps) {
  const [opponentDeckName, setOpponentDeckName] = useState<string>('');

  const availableOpponents = useMemo(() => {
    return mockDecks
      .filter(d => d.name !== currentDeckName)
      .map(d => d.name);
  }, [currentDeckName]);

  const guide = useMemo(() => {
    return mockMatchups.find(
      m => m.myDeck === currentDeckName && m.opponentDeck === opponentDeckName
    );
  }, [currentDeckName, opponentDeckName]);

  const CardList = ({ cards, type }: { cards: DeckCard[], type: 'in' | 'out' }) => (
    <div className={`p-5 rounded-xl border relative overflow-hidden ${type === 'in' ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-rose-500/5 border-rose-500/20'}`}>
      
      {/* Label Badge */}
      <div className={`absolute top-0 right-0 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-bl-lg ${type === 'in' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>
        {type === 'in' ? 'Sideboard' : 'Mainboard'}
      </div>

      <h4 className={`text-sm uppercase font-extrabold mb-4 flex items-center gap-2 ${type === 'in' ? 'text-emerald-400' : 'text-rose-400'}`}>
        {type === 'in' ? (
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-lg">+</span>
        ) : (
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 text-lg">-</span>
        )}
        {type === 'in' ? 'Cards In' : 'Cards Out'}
      </h4>
      <ul className="space-y-3">
        {cards.map((c, idx) => (
          <li key={idx} className="flex justify-between items-center text-sm p-2 rounded hover:bg-white/5 transition-colors">
            <span className="text-slate-200 font-medium">{c.name}</span>
            <span className="text-slate-500 font-mono bg-slate-900 px-2 py-0.5 rounded text-xs border border-white/5">x{c.quantity}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl border border-white/5 p-6 mt-8 sticky top-24 shadow-2xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Sideboard Guide</h2>
        <p className="text-slate-400 text-sm">Select an opponent archetype to generate your plan.</p>
      </div>

      <div className="mb-8">
        <label htmlFor="opponent-select" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">
          Playing Against
        </label>
        <div className="relative">
            <select
            id="opponent-select"
            value={opponentDeckName}
            onChange={(e) => setOpponentDeckName(e.target.value)}
            className="block w-full rounded-xl border border-white/10 bg-slate-800 text-white shadow-lg focus:border-violet-500 focus:ring-violet-500 sm:text-sm p-4 appearance-none cursor-pointer hover:bg-slate-750 transition-colors"
            >
            <option value="">-- Select Opponent --</option>
            {availableOpponents.map(name => (
                <option key={name} value={name}>{name}</option>
            ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
        </div>
      </div>

      {opponentDeckName && !guide && (
        <div className="text-center py-10 text-slate-500 bg-slate-950/30 rounded-xl border border-dashed border-slate-800">
          No guide data available for this matchup yet.
        </div>
      )}

      {guide && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-slate-800/50 p-5 rounded-xl border-l-4 border-violet-500">
            <h3 className="text-xs font-bold text-violet-400 uppercase tracking-wider mb-2">Strategy Plan</h3>
            <p className="text-slate-300 leading-relaxed text-sm">
              {guide.strategy}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <CardList cards={guide.cardsIn} type="in" />
            <CardList cards={guide.cardsOut} type="out" />
          </div>
        </div>
      )}
    </div>
  );
}
