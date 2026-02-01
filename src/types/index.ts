// Scryfall API types
export interface ScryfallCard {
  id: string;
  name: string;
  mana_cost?: string;
  cmc: number;
  type_line: string;
  oracle_text?: string;
  colors?: string[];
  color_identity?: string[];
  set: string;
  set_name: string;
  rarity: string;
  image_uris?: {
    small: string;
    normal: string;
    large: string;
    png: string;
    art_crop: string;
    border_crop: string;
  };
  legalities: {
    standard: string;
    [format: string]: string;
  };
}

// Deck archetype
export interface Archetype {
  id?: string; // External ID for live data (e.g. MTGTop8 ID)
  name: string;
  description: string;
  colors: string[];
  mainboard: DeckCard[];
  sideboard: DeckCard[];
  rank?: number;
  metaShare?: number;
  price?: number;
}

// Card in deck with quantity
export interface DeckCard {
  name: string;
  quantity: number;
}

// Sideboard guide for matchup
export interface MatchupGuide {
  myDeck: string;
  opponentDeck: string;
  cardsIn: DeckCard[];
  cardsOut: DeckCard[];
  strategy: string;
}
