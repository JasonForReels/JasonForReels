import { ProjectCard } from './components/ProjectCard';
import { FloatingPosters } from './components/FloatingPosters';
import { Header } from './components/Header';
import { projects } from './data';

export default function App() {
  return (
    <main className="min-h-screen bg-zinc-950 font-sans selection:bg-indigo-500/30 relative flex flex-col">
      <Header />
      <FloatingPosters />
      
      <section id="projects" className="w-full max-w-6xl mx-auto px-6 pb-12 md:pb-20 relative z-10 pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 w-full">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </section>
    </main>
  );
}
