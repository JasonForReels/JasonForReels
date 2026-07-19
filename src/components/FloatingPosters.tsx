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
            localStorage.setItem('tmdb_posters_cache', JSON.stringify({ posters: data.posters }));
            return;
          }
        }
      } catch (err) {
        console.error("Failed to load posters", err);
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

  const columns = 6;

  const columnData = useMemo(() => {
    if (posters.length === 0) return [];
    
    // Distribute posters into columns
    const cols: string[][] = Array.from({ length: columns }).map(() => []);
    posters.forEach((poster, i) => {
      cols[i % columns].push(poster);
    });
    return cols;
  }, [posters]);

  if (posters.length === 0) return null;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-zinc-950 flex gap-2 sm:gap-4 p-2 sm:p-4">
      {/* Dimmed Overlay */}
      <div className="absolute inset-0 z-10 bg-zinc-950/30 backdrop-blur-[1px]" />
      
      {columnData.map((colPosters, colIndex) => {
        // Duplicate posters to create exactly two identical halves for perfect looping
        const baseBlock = [...colPosters, ...colPosters, ...colPosters, ...colPosters];
        const loopingPosters = [...baseBlock, ...baseBlock];
        
        return (
          <div key={colIndex} className="flex-1 flex flex-col relative h-[200vh] -top-[50vh]">
             <div
               style={{ '--duration': `${120 + (colIndex % 3) * 40}s` } as React.CSSProperties}
               className="flex flex-col gap-2 pb-2 sm:gap-4 sm:pb-4 absolute w-full animate-scroll-down"
             >
               {loopingPosters.map((poster, pIndex) => (
                 <img 
                   key={`${colIndex}-${pIndex}`} 
                   src={poster} 
                   alt="" 
                   className="w-full aspect-[2/3] object-cover rounded-lg sm:rounded-xl shadow-2xl opacity-80 bg-zinc-900" 
                   onError={(e) => { e.currentTarget.style.opacity = '0'; }}
                 />
               ))}
             </div>
          </div>
        );
      })}
    </div>
  );
}

