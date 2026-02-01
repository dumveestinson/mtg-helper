import type { Archetype, MatchupGuide } from '../types';

// Mock Standard deck archetypes
export const mockDecks: Archetype[] = [
  {
    name: 'Mono-Red Aggro',
    rank: 1,
    metaShare: 24.5,
    price: 120.50,
    description: 'Fast aggressive red deck with burn spells and efficient creatures',
    colors: ['R'],
    mainboard: [
      { name: 'Kumano Faces Kakkazan', quantity: 4 },
      { name: 'Monastery Swiftspear', quantity: 4 },
      { name: 'Heartfire Hero', quantity: 4 },
      { name: 'Phoenix Chick', quantity: 4 },
      { name: 'Lightning Strike', quantity: 4 },
      { name: 'Play with Fire', quantity: 4 },
      { name: 'Blooded Battlemage', quantity: 4 },
      { name: 'Emberheart Challenger', quantity: 4 },
      { name: 'Monstrous Rage', quantity: 4 },
      { name: 'Mountain', quantity: 20 },
    ],
    sideboard: [
      { name: 'Rending Flame', quantity: 3 },
      { name: 'Torch the Tower', quantity: 3 },
      { name: 'Unlucky Witness', quantity: 3 },
      { name: 'Sheoldred\'s Edict', quantity: 3 },
      { name: 'Case of the Crimson Pulse', quantity: 3 },
    ],
  },
  {
    name: 'Dimir Control',
    rank: 2,
    metaShare: 18.2,
    price: 340.00,
    description: 'Control deck with counterspells, removal, and card draw',
    colors: ['U', 'B'],
    mainboard: [
      { name: 'Go for the Throat', quantity: 4 },
      { name: 'Make Disappear', quantity: 4 },
      { name: 'Liliana of the Veil', quantity: 3 },
      { name: 'Sheoldred, the Apocalypse', quantity: 3 },
      { name: 'Kaito Shizuki', quantity: 3 },
      { name: 'Deep-Cavern Bat', quantity: 4 },
      { name: 'Cut Down', quantity: 4 },
      { name: 'Disdainful Stroke', quantity: 3 },
      { name: 'Island', quantity: 10 },
      { name: 'Swamp', quantity: 10 },
      { name: 'Underground River', quantity: 4 },
    ],
    sideboard: [
      { name: 'Duress', quantity: 4 },
      { name: 'Negate', quantity: 3 },
      { name: 'Virtue of Persistence', quantity: 2 },
      { name: 'Jace, the Perfected Mind', quantity: 2 },
      { name: 'Ashiok, Dream Render', quantity: 2 },
      { name: 'Temporary Lockdown', quantity: 2 },
    ],
  },
  {
    name: 'Selesnya Enchantments',
    rank: 3,
    metaShare: 12.8,
    price: 215.75,
    description: 'Midrange deck utilizing powerful enchantments and creatures',
    colors: ['G', 'W'],
    mainboard: [
      { name: 'Werefox Bodyguard', quantity: 4 },
      { name: 'Ossification', quantity: 4 },
      { name: 'Up the Beanstalk', quantity: 4 },
      { name: 'Virtue of Loyalty', quantity: 3 },
      { name: 'Restless Prairie', quantity: 4 },
      { name: 'Sunfall', quantity: 3 },
      { name: 'Elspeth, Sun\'s Champion', quantity: 2 },
      { name: 'Plains', quantity: 12 },
      { name: 'Forest', quantity: 10 },
      { name: 'Temple Garden', quantity: 4 },
    ],
    sideboard: [
      { name: 'Wedding Announcement', quantity: 3 },
      { name: 'Destroy Evil', quantity: 3 },
      { name: 'Stroke of Midnight', quantity: 3 },
      { name: 'Giant Killer', quantity: 3 },
      { name: 'Shalai, Voice of Plenty', quantity: 3 },
    ],
  },
];

// Mock matchup guides
export const mockMatchups: MatchupGuide[] = [
  {
    myDeck: 'Mono-Red Aggro',
    opponentDeck: 'Dimir Control',
    cardsIn: [
      { name: 'Case of the Crimson Pulse', quantity: 3 },
      { name: 'Unlucky Witness', quantity: 3 },
    ],
    cardsOut: [
      { name: 'Blooded Battlemage', quantity: 3 },
      { name: 'Monstrous Rage', quantity: 3 },
    ],
    strategy: 'Be aggressive but don\'t overextend into sweepers. Save some threats for after they use removal. Case of the Crimson Pulse helps grind through their card advantage.',
  },
  {
    myDeck: 'Mono-Red Aggro',
    opponentDeck: 'Selesnya Enchantments',
    cardsIn: [
      { name: 'Rending Flame', quantity: 3 },
      { name: 'Torch the Tower', quantity: 3 },
    ],
    cardsOut: [
      { name: 'Play with Fire', quantity: 3 },
      { name: 'Kumano Faces Kakkazan', quantity: 3 },
    ],
    strategy: 'Focus on dealing damage quickly before they stabilize. Use removal on key threats like Werefox Bodyguard. Try to win before they land Sunfall or Elspeth.',
  },
  {
    myDeck: 'Dimir Control',
    opponentDeck: 'Mono-Red Aggro',
    cardsIn: [
      { name: 'Duress', quantity: 2 },
      { name: 'Temporary Lockdown', quantity: 2 },
    ],
    cardsOut: [
      { name: 'Disdainful Stroke', quantity: 2 },
      { name: 'Liliana of the Veil', quantity: 2 },
    ],
    strategy: 'Prioritize early interaction. Deep-Cavern Bat is crucial for disruption. Save Go for the Throat for their best threats. Try to survive until Sheoldred stabilizes.',
  },
  {
    myDeck: 'Dimir Control',
    opponentDeck: 'Selesnya Enchantments',
    cardsIn: [
      { name: 'Duress', quantity: 4 },
      { name: 'Negate', quantity: 3 },
      { name: 'Jace, the Perfected Mind', quantity: 2 },
    ],
    cardsOut: [
      { name: 'Cut Down', quantity: 4 },
      { name: 'Go for the Throat', quantity: 3 },
      { name: 'Deep-Cavern Bat', quantity: 2 },
    ],
    strategy: 'This is a slow matchup. Counter their key enchantments and planeswalkers. Duress is excellent here. Win with card advantage and eventually Sheoldred or Kaito.',
  },
  {
    myDeck: 'Selesnya Enchantments',
    opponentDeck: 'Mono-Red Aggro',
    cardsIn: [
      { name: 'Giant Killer', quantity: 3 },
      { name: 'Stroke of Midnight', quantity: 2 },
    ],
    cardsOut: [
      { name: 'Up the Beanstalk', quantity: 3 },
      { name: 'Virtue of Loyalty', quantity: 2 },
    ],
    strategy: 'Prioritize early interaction. Werefox Bodyguard and Ossification are key. Try to survive until turn 4-5 when you can stabilize with Sunfall or bigger threats.',
  },
  {
    myDeck: 'Selesnya Enchantments',
    opponentDeck: 'Dimir Control',
    cardsIn: [
      { name: 'Wedding Announcement', quantity: 3 },
      { name: 'Shalai, Voice of Plenty', quantity: 2 },
    ],
    cardsOut: [
      { name: 'Werefox Bodyguard', quantity: 3 },
      { name: 'Ossification', quantity: 2 },
    ],
    strategy: 'Diversify your threats to avoid getting blown out by single removal. Wedding Announcement creates multiple threats. Shalai protects your board. Don\'t overextend into sweepers.',
  },
];
