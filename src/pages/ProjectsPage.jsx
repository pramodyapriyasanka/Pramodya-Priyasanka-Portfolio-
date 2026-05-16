import { Projects } from "@/sections/Projects";

const ProjectsPage = () => {
  return (
    <main className="relative pt-20 min-h-screen bg-slate-950/70 text-white overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute top-16 right-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-16 left-0 h-80 w-80 rounded-full bg-highlight/10 blur-3xl" />
      </div>
      <Projects />
    </main>
  );
};

export default ProjectsPage;