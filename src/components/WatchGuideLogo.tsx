import { Play } from 'lucide-react';

// The WatchGuide app icon, as drawn in the header of watchguide.app
// (the site serves no image file for it), scaled to 64px.
export function WatchGuideLogo() {
  return (
    <div
      role="img"
      aria-label="WatchGuide logo"
      className="w-16 h-16 shrink-0 relative rounded-[22%] bg-gradient-to-br from-[#d900d9] to-[#800080] flex items-center justify-center overflow-hidden shadow-xl shadow-purple-900/40 ring-1 ring-white/10"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,transparent_80%)]" />
      <div className="w-[85%] h-[85%] rounded-full border-[2.5px] border-white/20 flex items-center justify-center">
        <div className="w-[86%] h-[86%] rounded-full border-[3px] border-white/30 flex items-center justify-center">
          <div className="w-[88%] h-[88%] rounded-full border-[4px] border-white/40 flex items-center justify-center bg-white/5">
            <Play className="w-6 h-6 text-white fill-white ml-1 drop-shadow-sm opacity-95" />
          </div>
        </div>
      </div>
    </div>
  );
}
