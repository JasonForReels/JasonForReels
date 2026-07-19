import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ArrowDown } from 'lucide-react';

export function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalized coordinates from -0.5 to 0.5
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const springConfig = { damping: 50, stiffness: 400 };
  const glowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-100, 100]), springConfig);
  const glowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-100, 100]), springConfig);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[80vh] px-6 py-24 overflow-hidden">
      {/* Background Glow */}
      <motion.div 
        style={{ x: glowX, y: glowY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-3xl text-center space-y-6"
      >
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center px-4 py-1.5 text-sm font-medium rounded-full bg-white/5 border border-white/10 text-zinc-300 cursor-default"
        >
          <span className="flex w-2 h-2 mr-2.5 bg-indigo-500 rounded-full animate-pulse"></span>
          Building next-gen applications
        </motion.div>
        
        <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight text-white leading-tight">
          Crafting digital <br className="hidden md:block"/> experiences.
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          From native Apple ecosystem tracking utilities to AI-powered cinematic analysis. Exploring the intersection of design, data, and technology.
        </p>
      </motion.div>

      <motion.button 
        onClick={scrollToProjects}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-12 text-zinc-500 flex flex-col items-center gap-3 hover:text-white transition-colors cursor-pointer"
      >
        <span className="text-xs tracking-[0.2em] uppercase font-medium">Explore Projects</span>
        <ArrowDown className="w-4 h-4 animate-bounce opacity-70" />
      </motion.button>
    </section>
  );
}
