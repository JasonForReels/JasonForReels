import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { Check, ExternalLink, MonitorSmartphone } from 'lucide-react';
import { apps } from '../data';
import { WatchGuideLogo } from './WatchGuideLogo';

const logos: Record<string, ReactNode> = {
  watchguide: <WatchGuideLogo />,
  reelmeter: <img src="/reelmeter-icon.png" alt="Reelmeter logo" className="w-16 h-16 shrink-0" />,
};

export function AppsPage() {
  return (
    <section id="apps" className="w-full max-w-4xl mx-auto px-6 relative z-10 pt-32 pb-16">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl sm:text-6xl font-display font-bold text-white tracking-tight mb-12"
      >
        Apps
      </motion.h1>

      <div className="flex flex-col gap-8 md:gap-12">
        {apps.map((app, index) => (
          <motion.article
            key={app.id}
            id={app.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 + index * 0.2 }}
            className="relative flex flex-col gap-6 p-6 sm:p-10 rounded-3xl overflow-hidden border border-white/20 bg-zinc-900/30 backdrop-blur-xl shadow-2xl"
          >
            {/* Subtle glass reflection */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4 sm:gap-5">
                {logos[app.id]}
                <div className="flex flex-col items-start gap-2">
                  <h2 className="text-4xl sm:text-5xl font-display font-bold text-white tracking-tight">{app.title}</h2>
                  {app.comingSoon && (
                    <span className="text-xs font-semibold uppercase tracking-wider text-white px-2.5 py-1 rounded-full bg-white/10 border border-white/20">
                      Coming soon
                    </span>
                  )}
                </div>
              </div>
              {!app.comingSoon && (
                <a
                  href={app.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="self-start sm:self-auto flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-all text-sm font-medium text-white"
                >
                  <span>Visit site</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>

            {app.platforms && (
              <div className="flex items-center gap-2 self-start text-zinc-300 bg-black/20 px-3 py-1.5 rounded-full border border-white/5">
                {app.platforms.includes('iOS') ? (
                  <img src="https://cdn.brandfetch.io/idnrCPuv87/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1729268375158" alt="Apple" className="w-4 h-4 object-contain brightness-0 invert" />
                ) : (
                  <MonitorSmartphone className="w-4 h-4" />
                )}
                <span className="text-sm font-medium">{app.platforms.join(', ')}</span>
              </div>
            )}

            <p className="text-lg text-zinc-300 leading-relaxed">{app.description}</p>

            <ul className="flex flex-col gap-3">
              {app.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-zinc-300">
                  <Check className="w-5 h-5 mt-0.5 shrink-0 text-white" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2">
              {app.tags.map((tag) => (
                <span key={tag} className="text-xs font-medium text-zinc-400 px-2.5 py-1 rounded-full border border-white/10">
                  {tag}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
