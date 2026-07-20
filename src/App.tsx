import { ProjectCard } from './components/ProjectCard';
import { FloatingPosters } from './components/FloatingPosters';
import { Header } from './components/Header';
import { projects } from './data';

export default function App() {
  return (
    <main className="min-h-[100dvh] bg-zinc-950 font-sans selection:bg-indigo-500/30 relative flex flex-col">
      <Header />
      <FloatingPosters />
      
      <section id="projects" className="w-full max-w-6xl mx-auto px-6 relative z-10 pt-32" style={{ paddingBottom: 'max(3rem, env(safe-area-inset-bottom))' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 w-full">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </section>
    </main>
  );
}
