import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

let cachedPosters: string[] = [];
let nextFetchTime: number = 0;

function getNextSASTMidnightWeek(): number {
  const now = new Date();
  // Current time in SAST (UTC+2)
  const d = new Date(now.getTime() + 2 * 3600 * 1000);
  // Get days until Sunday (0)
  const day = d.getUTCDay();
  const daysUntilSunday = (7 - day) % 7 || 7; 
  d.setUTCDate(d.getUTCDate() + daysUntilSunday);
  d.setUTCHours(0, 0, 0, 0); // Midnight
  // Convert back to UTC time timestamp
  return d.getTime() - 2 * 3600 * 1000;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.get("/api/posters", async (req, res) => {
    try {
      const now = Date.now();
      if (cachedPosters.length === 0 || now > nextFetchTime) {
        const apiKey = process.env.TMDB_API_KEY || "f011d1fa3817ec54bdeaf6ede16bc937";
        // Fetch popular/trending movies
        const response = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`);
        const data = await response.json();
        
        if (data.results) {
          const posters = data.results
            .filter((m: any) => m.poster_path)
            .map((m: any) => `https://image.tmdb.org/t/p/w500${m.poster_path}`);
            
          if (posters.length > 0) {
            cachedPosters = posters;
            nextFetchTime = getNextSASTMidnightWeek();
          }
        }
      }
      
      res.json({ posters: cachedPosters });
    } catch (error) {
      console.error("TMDB error:", error);
      if (cachedPosters.length > 0) {
        res.json({ posters: cachedPosters });
      } else {
        res.status(500).json({ error: "Failed to fetch posters" });
      }
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
