import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Experience } from "@/sections/Experience";
import { motion } from "framer-motion";
import { Cpu, Sparkles, Layers, Cloud, BarChart3, Repeat } from "lucide-react";
import Assistant from "@/components/Assistant";

const services = [
  {
    id: "ai-ml",
    title: "AI & Machine Learning Solutions",
    description: "Developing custom ML models, deep learning architectures, and predictive analytics systems to solve complex business problems.",
    tools: ["TensorFlow", "PyTorch", "Scikit-learn"],
    icon: Cpu,
    iconBg: "from-cyan-500/20 to-blue-500/20",
    iconGlow: "shadow-[0_0_40px_rgba(34,211,238,0.15)]",
    dotColor: "from-cyan-400 to-blue-500",
    badgeBorder: "border-cyan-400/20",
  },
  {
    id: "genai-llm",
    title: "GenAI & LLM Integration",
    description: "Building intelligent agents, RAG pipelines, and fine-tuning Large Language Models for specialized domain applications, including chatbot systems.",
    tools: ["LangChain", "OpenAI", "RAG"],
    icon: Sparkles,
    iconBg: "from-fuchsia-500/20 to-pink-500/20",
    iconGlow: "shadow-[0_0_40px_rgba(236,72,153,0.15)]",
    dotColor: "from-fuchsia-400 to-pink-500",
    badgeBorder: "border-fuchsia-400/20",
  },
  {
    id: "full-stack",
    title: "Full Stack Development",
    description: "Creating scalable, high-performance web applications with modern frameworks, ensuring seamless user experiences.",
    tools: ["React", "Next.js", "Node.js"],
    icon: Layers,
    iconBg: "from-orange-400/20 to-amber-400/20",
    iconGlow: "shadow-[0_0_40px_rgba(251,146,60,0.15)]",
    dotColor: "from-orange-400 to-amber-300",
    badgeBorder: "border-orange-400/20",
  },
  {
    id: "automation",
    title: "Automation & Workflow Optimization",
    description: "Designing automated workflows and intelligent bots to streamline operations and enhance productivity.",
    tools: ["n8n", "Python Scripts", "APIs"],
    icon: Repeat,
    iconBg: "from-emerald-500/20 to-teal-500/20",
    iconGlow: "shadow-[0_0_40px_rgba(16,185,129,0.15)]",
    dotColor: "from-emerald-400 to-teal-400",
    badgeBorder: "border-emerald-400/20",
  },
  {
    id: "analytics",
    title: "Data Analytics & Visualization",
    description: "Transforming raw data into actionable insights through advanced statistical analysis and interactive dashboards.",
    tools: ["Pandas", "PowerBI", "SQL"],
    icon: BarChart3,
    iconBg: "from-sky-500/20 to-cyan-400/20",
    iconGlow: "shadow-[0_0_40px_rgba(56,189,248,0.15)]",
    dotColor: "from-sky-400 to-cyan-500",
    badgeBorder: "border-sky-400/20",
  },
  {
    id: "cloud-mlops",
    title: "Cloud & MLOps",
    description: "Deploying and managing AI solutions on cloud platforms, ensuring scalability, security, and reliability.",
    tools: ["Azure", "AWS", "Docker"],
    icon: Cloud,
    iconBg: "from-indigo-500/20 to-violet-500/20",
    iconGlow: "shadow-[0_0_40px_rgba(99,102,241,0.15)]",
    dotColor: "from-indigo-400 to-violet-500",
    badgeBorder: "border-indigo-400/20",
  },
];

const Home = () => {
  return (
    <main className="relative min-h-screen bg-slate-950/70 text-white overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-highlight/10 blur-3xl" />
      </div>
      <Hero />
      <About />
      <section id="services" className="py-24 bg-slate-950/70">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-secondary-foreground text-sm font-semibold tracking-[0.3em] uppercase">
              Specialized Services
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold text-white">
               Transforming ideas into intelligent digital solutions.
            </h2>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
              AI Engineer, Data Engineer, Data Analyst, and Full Stack Developer focused on building scalable applications, automation systems, and data driven experiences.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <motion.article
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  whileHover={{ y: -6 }}
                  className="group glass rounded-[28px] border border-white/10 p-8 shadow-2xl shadow-black/20 transition hover:border-primary/50 hover:shadow-primary/30"
                >
                  <div className={`flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br ${service.iconBg} text-white mb-6 transition-transform duration-300 group-hover:scale-[1.05] ${service.iconGlow}`}>
                    <Icon className="h-7 w-7 text-white drop-shadow-[0_0_18px_rgba(255,255,255,0.2)]" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">{service.description}</p>
                  <div className="space-y-3">
                    {service.tools.map((tool) => (
                      <div key={tool} className={`inline-flex items-center gap-2 rounded-full border ${service.badgeBorder} bg-white/5 backdrop-blur-xl px-3 py-2 text-sm text-foreground transition duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10 hover:shadow-[0_12px_30px_rgba(255,255,255,0.08)]`}>
                        <span className={`h-2.5 w-2.5 rounded-full bg-gradient-to-r ${service.dotColor} shadow-[0_0_12px_rgba(255,255,255,0.22)]`} />
                        {tool}
                      </div>
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>
      <Experience />
      <Assistant />
    </main>
  );
};

export default Home;