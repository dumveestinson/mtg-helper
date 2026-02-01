import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vercel from 'vite-plugin-vercel'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    vercel(),
    {
      name: 'local-api-handler',
      configureServer(server) {
        server.middlewares.use('/api/meta', async (req, res) => {
          try {
            console.log('Fetching live meta data...');
            const response = await fetch('https://www.mtgtop8.com/format?f=ST', {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                }
            });
            
            if (!response.ok) {
              throw new Error(`External source returned ${response.status}`);
            }
        
            const html = await response.text();
            
            // Regex to find deck row.
            // Matches: archetype?a=ID ... >Name</a> ... (some text/tags) ... Number %
            // We use [^]*? to match anything non-greedily including newlines until we find the digits + %
            const regex = /archetype\?a=(\d+)[^>]*>([^<]+)<\/a>[^%]*?(\d+)\s*%/g;
            
            const decks = [];
            let match;
            let rank = 1;

            while ((match = regex.exec(html)) !== null) {
              if (decks.length >= 20) break;
               // Sanity check: Percentage shouldn't be huge
               if (parseInt(match[3]) > 100) continue;

              decks.push({
                rank: rank++,
                id: match[1],
                name: match[2].trim(),
                metaShare: parseInt(match[3], 10)
              });
            }
        
            if (decks.length === 0) {
                console.warn("Regex matched 0 decks.");
            }
        
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ decks }));
          } catch (error) {
            console.error('Scraping error:', error);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Failed to fetch live meta data' }));
          }
        });
      }
    }
  ],
})
