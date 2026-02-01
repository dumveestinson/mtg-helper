import { useState } from 'react';
import { mockDecks, mockMatchups } from './data/mockMeta';
import type { MatchupGuide } from './types';

function App() {
  const [myDeck, setMyDeck] = useState<string>('');
  const [opponentDeck, setOpponentDeck] = useState<string>('');
  const [matchup, setMatchup] = useState<MatchupGuide | null>(null);

  const handleFindMatchup = () => {
    if (!myDeck || !opponentDeck) {
      return;
    }

    const found = mockMatchups.find(
      (m) => m.myDeck === myDeck && m.opponentDeck === opponentDeck
    );

    setMatchup(found || null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Standard Rotation Sideboarder
        </h1>

        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Select Decks</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                My Deck
              </label>
              <select
                value={myDeck}
                onChange={(e) => setMyDeck(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Select Your Deck --</option>
                {mockDecks.map((deck) => (
                  <option key={deck.name} value={deck.name}>
                    {deck.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Opponent's Deck
              </label>
              <select
                value={opponentDeck}
                onChange={(e) => setOpponentDeck(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Select Opponent --</option>
                {mockDecks.map((deck) => (
                  <option key={deck.name} value={deck.name}>
                    {deck.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleFindMatchup}
            disabled={!myDeck || !opponentDeck}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded transition"
          >
            Get Sideboard Guide
          </button>
        </div>

        {matchup && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">
              {matchup.myDeck} vs {matchup.opponentDeck}
            </h2>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 text-green-400">
                Strategy
              </h3>
              <p className="text-gray-300">{matchup.strategy}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-green-400">
                  Cards In
                </h3>
                <ul className="space-y-2">
                  {matchup.cardsIn.map((card, idx) => (
                    <li
                      key={idx}
                      className="bg-gray-700 rounded px-4 py-2 flex justify-between"
                    >
                      <span>{card.name}</span>
                      <span className="text-gray-400">x{card.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-red-400">
                  Cards Out
                </h3>
                <ul className="space-y-2">
                  {matchup.cardsOut.map((card, idx) => (
                    <li
                      key={idx}
                      className="bg-gray-700 rounded px-4 py-2 flex justify-between"
                    >
                      <span>{card.name}</span>
                      <span className="text-gray-400">x{card.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {!matchup && myDeck && opponentDeck && (
          <div className="bg-yellow-900 border border-yellow-700 rounded-lg p-4 text-yellow-200">
            No sideboard guide found for this matchup. Try another combination.
          </div>
        )}

        <div className="mt-8 bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Available Decks</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockDecks.map((deck) => (
              <div key={deck.name} className="bg-gray-700 rounded p-4">
                <h3 className="font-semibold text-lg mb-2">{deck.name}</h3>
                <p className="text-sm text-gray-400 mb-2">
                  {deck.description}
                </p>
                <div className="flex gap-1">
                  {deck.colors.map((color) => (
                    <span
                      key={color}
                      className="inline-block w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold"
                      style={{
                        backgroundColor:
                          color === 'R'
                            ? '#D32F2F'
                            : color === 'U'
                            ? '#1976D2'
                            : color === 'B'
                            ? '#424242'
                            : color === 'G'
                            ? '#388E3C'
                            : color === 'W'
                            ? '#FFF9C4'
                            : '#757575',
                        color:
                          color === 'W' ? '#000' : '#fff',
                      }}
                    >
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
