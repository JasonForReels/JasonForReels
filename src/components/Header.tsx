import { motion } from 'motion/react';

export function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 py-6 px-6 md:px-12 flex justify-between items-center max-w-6xl mx-auto">
      <div className="font-display font-bold text-xl tracking-tight text-white">
        JasonForReels
      </div>
      <div className="flex items-center gap-6">
        <a 
          href="https://x.com/jasonforreels" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md transition-all text-sm font-medium text-white"
        >
          <img 
            src="https://cdn.brandfetch.io/idS5WhqBbM/theme/light/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1768324498338" 
            alt="X" 
            className="w-3.5 h-3.5 object-contain brightness-0 invert" 
          />
          <span>Follow</span>
        </a>
      </div>
    </header>
  );
}
