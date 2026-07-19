export function Footer() {
  return (
    <footer className="relative z-10 w-full py-8 md:py-12 border-t border-white/5 mt-auto bg-zinc-950/50 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-zinc-500 text-sm">
          &copy; {new Date().getFullYear()} JasonForReels. All rights reserved.
        </p>
        <div className="flex items-center gap-8 text-sm font-medium text-zinc-400">
          <a href="https://watchguide.app" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WatchGuide</a>
          <a href="https://cinebrace.ai.studio" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">CineBrace</a>
        </div>
      </div>
    </footer>
  );
}
