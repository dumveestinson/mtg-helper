# Product Requirements Document (PRD)

**Project Name:** Standard Rotation Sideboarder
**Version:** 1.0 (MVP)
**Status:** Initialization

## 1. Project Overview
A web application for Magic: The Gathering players focusing on the **Standard** format. It helps users analyze the current "Meta" (most played decks) and visualize sideboard strategies (which cards to swap in/out) against specific matchups.

## 2. Technical Stack
* **Frontend:** React (Latest), Vite.
* **Language:** TypeScript.
* **Styling:** Tailwind CSS (Mobile-first, Dark Mode default).
* **Data Source A (Cards):** [Scryfall API](https://scryfall.com/docs/api) (Public).
* **Data Source B (Meta/Strategy):** Local static JSON (Mock Data) for MVP.

## 3. User Stories

### 3.1. Meta Exploration
* **US-01:** As a user, I want to view a list of current "Tier 1" Standard decks (e.g., Mono-Red Aggro, Dimir Midrange).
* **US-02:** When I select a deck, I want to see its "Stock List" (Mainboard & Sideboard) visualized with card images.

### 3.2. Sideboard Strategy (Core Value)
* **US-03 Matchup Guide:** Inside a specific Deck view, I want to see a strategy table.
* **US-04:** I want to select an "Opponent Archetype" (e.g., playing *against* Control) and see a specific list of:
    * **Cards IN:** Cards from my sideboard I should add.
    * **Cards OUT:** Cards from my main deck I should remove.

### 3.3. Card Search & Filtering
* **US-05:** I want to search for individual cards to view their details.
* **US-06:** The search must automatically filter for `legal:standard` to prevent invalid deck building.

## 4. Data Models

### 4.1. The Scryfall Card (External API)
We fetch these from Scryfall. We only need:
* `id` (UUID)
* `name`
* `mana_cost`
* `image_uris` (normal, small)
* `type_line`
* `legalities` (standard: "legal")

### 4.2. The Archetype (Internal Mock Data)
Since no free API provides structured sideboard guides, we use a local JSON file (`src/data/metaDecks.json`):

```typescript
interface Archetype {
  id: string;
  name: string; // e.g., "Dimir Midrange"
  colors: string[]; // ['U', 'B']
  keyCards: string[]; // Array of card names for the main deck
  matchups: MatchupStrategy[];
}

interface MatchupStrategy {
  opponentArchetypeId: string;
  plan: {
    in: string[]; // Card names to add
    out: string[]; // Card names to remove
    notes: string;
  };
}  

### 5.2 UI/UX Requirements

Theme: Dark mode, clean "gaming" aesthetic.

Responsiveness: Mobile-friendly grid for cards.

Components:

DeckSelector: To choose the active player deck.

MatchupSelector: To choose the opponent deck.

CardVisualizer: Component to render the card image based on the card name.