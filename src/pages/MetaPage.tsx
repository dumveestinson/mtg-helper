import React, { useEffect, useState } from 'react';
import { mockDecks } from '../data/mockMeta';
import type { Archetype } from '../types';

interface MetaPageProps {
  onDeckSelect: (deck: Archetype) => void;
}

export function MetaPage({ onDeckSelect }: MetaPageProps) {
  const [data, setData] = useState<Archetype[]>(mockDecks);
  const [loading, setLoading] = useState(true);
  const [usingLive, setUsingLive] = useState(false);


  // Helper to guess colors from name (since scraping doesn't give us colors easily)
  const guessColors = (name: string): string[] => {
    const n = name.toLowerCase();
    const colors: string[] = [];
    if (n.includes('white') || n.includes('mono-white') || n.includes('azorius') || n.includes('selesnya') || n.includes('esper') || n.includes('bant') || n.includes('jeskai') || n.includes('naya') || n.includes('abzan') || n.includes('boros') || n.includes('orzhov')) colors.push('W');
    if (n.includes('blue') || n.includes('mono-blue') || n.includes('azorius') || n.includes('dimir') || n.includes('esper') || n.includes('grixis') || n.includes('jeskai') || n.includes('bant') || n.includes('sultai') || n.includes('izzet') || n.includes('simic')) colors.push('U');
    if (n.includes('black') || n.includes('mono-black') || n.includes('dimir') || n.includes('rakdos') || n.includes('golgari') || n.includes('esper') || n.includes('grixis') || n.includes('jund') || n.includes('abzan') || n.includes('sultai') || n.includes('orzhov')) colors.push('B');
    if (n.includes('red') || n.includes('mono-red') || n.includes('rakdos') || n.includes('gruul') || n.includes('jund') || n.includes('grixis') || n.includes('jeskai') || n.includes('naya') || n.includes('marduk') || n.includes('boros') || n.includes('izzet')) colors.push('R');
    if (n.includes('green') || n.includes('mono-green') || n.includes('selesnya') || n.includes('gruul') || n.includes('golgari') || n.includes('bant') || n.includes('jund') || n.includes('naya') || n.includes('abzan') || n.includes('sultai') || n.includes('simic')) colors.push('G');
    if (colors.length === 0) colors.push('C'); // Colorless/Unknown fallback
    // Dedupe
    return [...new Set(colors)];
  };

  useEffect(() => {
    fetch('/api/meta')
      .then(res => {
         if (!res.ok) throw new Error("API not OK");
         return res.json();
      })
      .then(json => {
        if (json.decks && json.decks.length > 0) {
          const transformedDecks: Archetype[] = json.decks.map((d: any) => ({
            id: d.id, // Parse ID from scraper
            name: d.name,
            rank: d.rank,
            metaShare: d.metaShare,
            price: 0, 
            description: 'Live data from MTGTop8',
            colors: guessColors(d.name),
            mainboard: [], 
            sideboard: []
          }));
          setData(transformedDecks);
          setUsingLive(true);
        }
      })
      .catch(err => console.error("Live fetch failed, using mock", err))
      .finally(() => setLoading(false));
  }, []);

  const getColorClass = (color: string) => {
    const map: Record<string, string> = {
      'W': 'bg-amber-100/90 text-amber-900 border-amber-200',
      'U': 'bg-sky-100/90 text-sky-900 border-sky-200',
      'B': 'bg-slate-300/90 text-slate-900 border-slate-400',
      'R': 'bg-rose-100/90 text-rose-900 border-rose-200',
      'G': 'bg-emerald-100/90 text-emerald-900 border-emerald-200',
      'C': 'bg-slate-200 text-slate-600 border-slate-300'
    };
    return map[color] || 'bg-slate-100 text-slate-800';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <div className="flex justify-center items-center gap-2 mb-4">
             <span className={`h-2 w-2 rounded-full ${usingLive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-500'}`}></span>
             <span className={`text-xs font-bold uppercase tracking-widest ${usingLive ? 'text-emerald-400' : 'text-slate-500'}`}>
                {usingLive ? "Live Data Connected" : "Offline / Snapshot Mode"}
            </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            Standard <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-500">Meta Tier List</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-slate-400 leading-relaxed">
            Real-time analysis of the current Standard metagame. <br className="hidden md:block"/> 
            {usingLive ? "Sourced directly from live tournament results." : "Displaying curated snapshot data."}
        </p>
      </div>
      
      <div className="bg-slate-900/40 backdrop-blur-sm rounded-xl border border-white/5 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-slate-300">
            <thead className="bg-slate-950/50 text-xs uppercase font-bold text-slate-500 tracking-wider">
                <tr>
                    <th className="px-6 py-4 text-center w-20">Rank</th>
                    <th className="px-6 py-4">Archetype</th>
                    <th className="px-6 py-4 text-center">Meta Share</th>
                    <th className="px-6 py-4 text-right">Price (Est)</th>
                    <th className="px-6 py-4 w-10"></th>
                </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading && (
                  <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                          <div className="flex justify-center items-center gap-2">
                             <svg className="animate-spin h-5 w-5 text-violet-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                             Fetching live data...
                          </div>
                      </td>
                  </tr>
              )}
              {!loading && data.map((deck) => (
                <tr 
                  key={deck.name} 
                  onClick={() => onDeckSelect(deck)}
                  className="group hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${deck.rank && deck.rank <= 3 ? 'bg-violet-500/20 text-violet-300 ring-1 ring-violet-500/50' : 'text-slate-500 bg-slate-800'}`}>
                        {deck.rank || '-'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                        <div className="flex gap-1 shrink-0">
                            {deck.colors.map(c => (
                                <span key={c} className={`flex items-center justify-center w-5 h-5 rounded text-[10px] font-bold border ${getColorClass(c)}`}>
                                    {c}
                                </span>
                            ))}
                        </div>
                        <div>
                            <div className="font-bold text-slate-100 group-hover:text-violet-400 transition-colors text-lg">{deck.name}</div>
                            {/* Only show description if available/meaningful */}
                             {!usingLive && <div className="text-xs text-slate-500 truncate max-w-[200px] sm:max-w-xs">{deck.description}</div>}
                        </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 align-middle">
                    <div className="flex items-center gap-3 justify-center">
                        <span className="font-mono text-slate-300 font-bold w-12 text-right">{deck.metaShare || 0}%</span>
                        <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full" 
                                style={{ width: `${Math.min((deck.metaShare || 0) * 3, 100)}%` }} // Multiplier to make small percentages visible
                            ></div>
                        </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-emerald-400">
                    {deck.price ? `$${deck.price.toFixed(0)}` : <span className="text-slate-600 text-xs">--</span>}
                  </td>
                  <td className="px-6 py-4 text-slate-600 text-right group-hover:text-violet-400">
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
