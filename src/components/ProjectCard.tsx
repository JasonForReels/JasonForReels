import React, { MouseEvent, useCallback, useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'motion/react';
import { ExternalLink, MonitorSmartphone } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const isAppleExclusive = project.platforms?.includes('iOS');
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group relative flex flex-col justify-center items-center p-6 sm:p-8 rounded-3xl overflow-hidden transition-all duration-500 isolation-isolate border border-white/20 bg-zinc-900/30 hover:bg-zinc-900/50 backdrop-blur-xl shadow-2xl aspect-auto min-h-[200px] sm:min-h-[240px]"
    >
      {/* Interactive Cursor Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100 z-[1]"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.1),
              transparent 80%
            )
          `
        }}
      />
        
      {/* Subtle glass reflection */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent z-[2]" />
      <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-white/10 via-transparent to-transparent z-[2]" />

      <div className="flex flex-col items-center gap-6 relative z-10 w-full text-center">
        <h3 className="text-4xl sm:text-5xl font-display font-bold text-white tracking-tight drop-shadow-xl">{project.title}</h3>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-zinc-300 bg-black/20 px-3 py-1.5 rounded-full border border-white/5">
            {isAppleExclusive ? (
              <img src="https://cdn.brandfetch.io/idnrCPuv87/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1729268375158" alt="Apple" className="w-4 h-4 object-contain brightness-0 invert" />
            ) : (
              <MonitorSmartphone className="w-4 h-4" />
            )}
            <span className="text-sm font-medium">
              {project.platforms?.join(', ')}
            </span>
          </div>
          
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 hover:scale-110 border border-white/10 transition-all duration-300 shadow-lg"
            aria-label={`Visit ${project.title}`}
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
