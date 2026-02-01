import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { MetaPage } from './pages/MetaPage';
import { DeckDetailPage } from './pages/DeckDetailPage';
import { SearchPage } from './pages/SearchPage';

type View = 'home' | 'deck' | 'search';

function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedDeckId, setSelectedDeckId] = useState<string | null>(null);

  const handleNavigate = (view: 'home' | 'search') => {
    setCurrentView(view);
    if (view !== 'deck') {
        setSelectedDeckId(null);
    }
    window.scrollTo(0, 0);
  };

  const handleDeckSelect = (deckId: string) => {
    setSelectedDeckId(deckId);
    setCurrentView('deck');
    window.scrollTo(0, 0);
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedDeckId(null);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen selection:bg-violet-500/30 selection:text-violet-200">
      <Navbar onNavigate={handleNavigate} currentView={currentView} />
      
      <main className="pb-20">
        {currentView === 'home' && (
          <MetaPage onDeckSelect={handleDeckSelect} />
        )}
        
        {currentView === 'deck' && selectedDeckId && (
          <DeckDetailPage 
            deckId={selectedDeckId} 
            onBack={handleBackToHome} 
          />
        )}
        
        {currentView === 'search' && (
          <SearchPage />
        )}
      </main>

      <footer className="border-t border-white/5 py-12 bg-slate-950/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <h3 className="text-white font-bold mb-4 bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent inline-block">MTG Sideboarder</h3>
            <p className="text-slate-500 text-sm max-w-md mx-auto mb-4">
                The ultimate companion for competitive Standard play. Analyze the meta, plan your sideboarding, and dominate your FNM.
            </p>
            <p className="text-slate-600 text-xs">
                Unofficial Fan Content. Not approved/endorsed by Wizards. Portions of the materials used are property of Wizards of the Coast. ©Wizards of the Coast LLC.
            </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
