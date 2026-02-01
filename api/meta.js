
export default async function handler(req, res) {
  try {
    // 1. Fetch the data server-side (bypassing CORS)
    // Using MTG Top8 Standard format page
    const response = await fetch('https://www.mtgtop8.com/format?f=ST');
    
    if (!response.ok) {
      throw new Error(`External source returned ${response.status}`);
    }

    const html = await response.text();

    // 2. Parse the HTML using a regex to find decks and percentages
    // This regex looks for links like <a href="archetype?a=123...">Archetype Name</a> followed eventually by <td>12 %</td>
    // Note: This relies on MTGTop8's specific HTML structure.
    
    // Pattern breakdown:
    // href="archetype\?a=(\d+)  -> Captures ID
    // &[^"]*">                  -> Skips rest of url
    // ([^<]+)<\/a>              -> Captures Name
    // .*?                       -> Skips intermediate tags (non-greedy)
    // <td[^>]*>\s*(\d+)\s*%     -> Captures Percentage
    const regex = /href="archetype\?a=(\d+)&[^"]*">([^<]+)<\/a><\/td>\s*<td[^>]*>\s*(\d+)\s*%/g;
    
    const decks = [];
    let match;
    let rank = 1;

    // 3. Extract data
    // We use a loop because /g flag allows exec to maintain state
    while ((match = regex.exec(html)) !== null) {
      // Limit to top 20 to keep it clean
      if (decks.length >= 20) break;

      decks.push({
        rank: rank++,
        id: match[1], // External ID
        name: match[2].trim(), // e.g., "Simic Aggro"
        metaShare: parseInt(match[3], 10) // e.g., 22
      });
    }

    // If regex failed (site changed), return empty list but 200 OK so frontend handles it gracefully
    if (decks.length === 0) {
        console.warn("Regex matched 0 decks. Site structure might have changed.");
    }

    // Vercel/Node style response
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ decks }));
  } catch (error) {
    console.error('Scraping error:', error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Failed to fetch live meta data' }));
  }
}
