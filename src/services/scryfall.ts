import type { ScryfallCard } from '../types';

const SCRYFALL_API_BASE = 'https://api.scryfall.com';

/**
 * Search for cards by name with "legal:standard" filter
 */
export async function searchCards(query: string): Promise<ScryfallCard[]> {
  try {
    const searchQuery = `${query} legal:standard`;
    const url = `${SCRYFALL_API_BASE}/cards/search?q=${encodeURIComponent(searchQuery)}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      if (response.status === 404) {
        return []; // No cards found
      }
      throw new Error(`Scryfall API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error searching cards:', error);
    throw error;
  }
}

/**
 * Get a specific card by exact name
 */
export async function getCardByName(name: string): Promise<ScryfallCard | null> {
  try {
    const url = `${SCRYFALL_API_BASE}/cards/named?exact=${encodeURIComponent(name)}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      if (response.status === 404) {
        return null; // Card not found
      }
      throw new Error(`Scryfall API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching card:', error);
    throw error;
  }
}

/**
 * Get multiple cards by names (with standard legality check)
 */
export async function getCardsByNames(names: string[]): Promise<ScryfallCard[]> {
  const results: ScryfallCard[] = [];
  
  for (const name of names) {
    try {
      const card = await getCardByName(name);
      if (card && card.legalities.standard === 'legal') {
        results.push(card);
      }
    } catch (error) {
      console.error(`Error fetching card ${name}:`, error);
    }
  }
  
  return results;
}

/**
 * Check if a card is legal in Standard
 */
export async function isStandardLegal(cardName: string): Promise<boolean> {
  try {
    const card = await getCardByName(cardName);
    return card?.legalities.standard === 'legal';
  } catch (error) {
    console.error('Error checking legality:', error);
    return false;
  }
}
