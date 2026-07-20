import { useEffect, useState, useMemo } from 'react';

export function FloatingPosters() {
  const [posters, setPosters] = useState<string[]>([]);
  
  useEffect(() => {
    const fetchPosters = async () => {
      let hasValidPosters = false;
      
      // Try local storage cache first for instant load
      try {
        const cached = localStorage.getItem('tmdb_posters_cache');
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed.posters && parsed.posters.length > 0) {
            setPosters(parsed.posters);
            hasValidPosters = true;
          }
        }
      } catch (e) {
        // Ignore parse errors
      }

      try {
        const res = await fetch('/api/posters');
        if (res.ok) {
          const data = await res.json();
          if (data.posters && data.posters.length > 0) {
            setPosters(data.posters);
            localStorage.setItem('tmdb_posters_cache', JSON.stringify({ posters: data.posters, timestamp: Date.now() }));
            return;
          }
        }
      } catch (err) {
        // Backend might not exist on static deployments
      }

      // Fallback to direct TMDB fetch for static deployments
      try {
        const apiKey = "f011d1fa3817ec54bdeaf6ede16bc937";
        const res = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`);
        if (res.ok) {
          const data = await res.json();
          if (data.results) {
            const tmdbPosters = data.results
              .filter((m: any) => m.poster_path)
              .map((m: any) => `https://image.tmdb.org/t/p/w500${m.poster_path}`);
            
            if (tmdbPosters.length > 0) {
              setPosters(tmdbPosters);
              localStorage.setItem('tmdb_posters_cache', JSON.stringify({ posters: tmdbPosters, timestamp: Date.now() }));
              return;
            }
          }
        }
      } catch (err) {
        console.error("Direct TMDB fetch failed", err);
      }
      
      if (!hasValidPosters) {
        // Fallback posters if API fails and no cache exists
        const fallback = [
          "https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg",
          "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
          "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
          "https://image.tmdb.org/t/p/w500/gEU2QlsUUQZnD0sB4b9861P2FfO.jpg",
          "https://image.tmdb.org/t/p/w500/7rrB2A9G2OqDkY8BqTOrC3XWn9J.jpg",
          "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8OSqEpAWV.jpg",
          "https://image.tmdb.org/t/p/w500/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg",
          "https://image.tmdb.org/t/p/w500/3xnWaLQjelJDDF7LT1WBo6f4BRe.jpg",
          "https://image.tmdb.org/t/p/w500/fqv8v6AycXKsivp1T5yKtLbxc34.jpg",
          "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2IGkp3LuB.jpg",
          "https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIhq1400wHLILG.jpg",
          "https://image.tmdb.org/t/p/w500/A4j8S6moJS2zNtRR8oWF08gRnL5.jpg"
        ];
        setPosters(fallback);
        localStorage.setItem('tmdb_posters_cache', JSON.stringify({ posters: fallback }));
      }
    };
    fetchPosters();
  }, []);

  const [columns, setColumns] = useState(6);

  useEffect(() => {
    const handleResize = () => {
      setColumns(window.innerWidth < 640 ? 3 : window.innerWidth < 1024 ? 4 : 6);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const columnData = useMemo(() => {
    if (posters.length === 0) return [];
    
    // Ensure we have enough posters to avoid empty columns
    let filledPosters = [...posters];
    if (filledPosters.length > 0) {
      while (filledPosters.length < columns * 4) {
        filledPosters = [...filledPosters, ...posters];
      }
    }
    
    // Distribute posters into columns
    const cols: string[][] = Array.from({ length: columns }).map(() => []);
    filledPosters.forEach((poster, i) => {
      cols[i % columns].push(poster);
    });
    return cols;
  }, [posters, columns]);

  if (posters.length === 0) return null;

  return (
    <div className="fixed -inset-10 z-0 overflow-hidden pointer-events-none bg-zinc-950 flex gap-2 sm:gap-4 p-4 sm:p-8">
      {/* Dimmed Overlay */}
      <div className="absolute inset-0 z-10 bg-zinc-950/40 backdrop-blur-[2px]" />
      
      {columnData.map((colPosters, colIndex) => {
        // Ensure baseBlock has enough posters to cover ~150vh for perfect looping
        // 12 posters per column is extremely safe and keeps DOM nodes low
        const targetBaseLength = 12;
        const repeatCount = Math.ceil(targetBaseLength / Math.max(1, colPosters.length));
        
        const baseBlock = [];
        for (let i = 0; i < repeatCount; i++) {
          baseBlock.push(...colPosters);
        }
        const loopingPosters = [...baseBlock, ...baseBlock];
        
        return (
          <div key={colIndex} className="flex-1 flex flex-col relative h-[200vh] -top-[50vh]">
             <div
               style={{ animation: `scroll-down ${200 + (colIndex % 3) * 40}s linear infinite` }}
               className="flex flex-col gap-2 pb-2 sm:gap-4 sm:pb-4 absolute w-full"
             >
               {loopingPosters.map((poster, pIndex) => (
                 <img 
                   key={`${colIndex}-${pIndex}`} 
                   src={poster} 
                   alt="" 
                   className="w-full aspect-[2/3] object-cover rounded-lg sm:rounded-xl shadow-2xl opacity-80 bg-zinc-900" 
                   onError={(e) => { 
                     if (!e.currentTarget.src.includes('data:image')) {
                       e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 300'%3E%3Crect width='200' height='300' fill='%2318181b'/%3E%3C/svg%3E";
                     }
                   }}
                 />
               ))}
             </div>
          </div>
        );
      })}
    </div>
  );
}

