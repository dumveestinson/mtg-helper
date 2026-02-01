# MTG Helper - Standard Rotation Sideboarder

A sideboard helper tool for Magic: The Gathering Standard format. This app helps players find optimal sideboard strategies for different matchups in the current Standard meta.

## Features

- **Deck Selection**: Choose your deck and opponent's deck from the current Standard meta
- **Sideboard Guides**: Get detailed sideboard plans with cards to bring in and take out
- **Matchup Strategies**: Learn key strategies for each matchup
- **Standard Legal Cards**: Integrated with Scryfall API to enforce Standard legality

## Available Decks

- **Mono-Red Aggro**: Fast aggressive red deck with burn spells and efficient creatures
- **Dimir Control**: Control deck with counterspells, removal, and card draw
- **Selesnya Enchantments**: Midrange deck utilizing powerful enchantments and creatures

## Tech Stack

- **React** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Scryfall API** - Card data and legality checking

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/     # React components
├── services/       # API services (Scryfall)
├── types/          # TypeScript type definitions
├── data/           # Mock meta data and deck lists
├── App.tsx         # Main application component
└── main.tsx        # Application entry point
```

## API Integration

The app uses the Scryfall API to:
- Search for cards by name
- Verify Standard legality
- Fetch card data and images

All API calls automatically filter for `legal:standard` to ensure only Standard-legal cards are used.
