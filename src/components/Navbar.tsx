import React from 'react';

interface NavbarProps {
  onNavigate: (view: 'home' | 'search') => void;
  currentView: 'home' | 'deck' | 'search';
}

export function Navbar({ onNavigate, currentView }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <div className="flex-shrink-0 cursor-pointer group" onClick={() => onNavigate('home')}>
              <h1 className="text-xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent group-hover:to-fuchsia-400 transition-all">
                MTG Sideboarder
              </h1>
            </div>
            
            <div className="flex items-center space-x-1">
                <button
                  onClick={() => onNavigate('home')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    currentView === 'home' || currentView === 'deck'
                      ? 'bg-white/10 text-white shadow-lg shadow-violet-500/10'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Meta Decks
                </button>
                <button
                  onClick={() => onNavigate('search')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    currentView === 'search'
                      ? 'bg-white/10 text-white shadow-lg shadow-violet-500/10'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Card Search
                </button>
              </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
