import { useEffect, useState } from "react"
import { loadPortfolioData } from "@/utils/portfolioStorage"
import {
  MessageCircle,
  Users,
  ShieldCheck,
  Compass,
  Handshake,
  Brain,
  Clock,
  Lightbulb,
  TrendingUp,
  BookOpen,
  FlaskConical,
  Database,
  Eye,
  BarChart,
  Settings
} from "lucide-react"

const customSkillIconMap = {
  python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  sql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  mysql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  postgresql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  mongodb: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  java: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  javascript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  react: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  nodejs: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  node: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  aws: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
  azure: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
  gcp: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
  html: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  css: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  python3: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  django: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
  flask: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
  tensorflow: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
  pytorch: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
  docker: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  kubernetes: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
}

const getCustomSkillIcon = (name) => {
  const key = name.toLowerCase().replace(/[^a-z0-9]/g, "")
  if (customSkillIconMap[key]) return { icon: customSkillIconMap[key] }
  return { isCustomText: true }
}

const languageSkills = [
  { name: "Python",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "SQL",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "Java",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "C#",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
  { name: "HTML/CSS",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
]

const dataEngineeringCloudSkills = [
  { name: "ETL Pipelines",  lucide: TrendingUp },
  { name: "Apache Airflow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg" },
  { name: "AWS",            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg" },
  { name: "Azure",          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
  { name: "GCP",            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
  { name: "Snowflake",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg", isSnowflake: true },
  { name: "Vercel",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", invert: true },
  { name: "Data Validation",lucide: ShieldCheck },
  { name: "Workflow Auto",  lucide: Settings },
  { name: "Data Warehouse", lucide: Database },
]

const databaseSkills = [
  { name: "MySQL",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "MongoDB",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Firebase",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
]

const frontendSkills = [
  { name: "React",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", invert: true },
  { name: ".NET",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg" },
  { name: "Angular",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg" },
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" },
]

const backendSkills = [
  { name: "Node.js",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Express.js",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", invert: true },
  { name: "Django",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
  { name: "Flask",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg", invert: true },
  { name: "Spring Boot", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
  { name: "FastAPI",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
]

const mlAiDataScienceSkills = [
  { name: "Scikit-learn",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", isSklearn: true },
  { name: "TensorFlow",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
  { name: "PyTorch",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
  { name: "KNN",           lucide: Brain },
  { name: "PyCaret",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "SHAP",          lucide: Lightbulb },
  { name: "NLP",           lucide: MessageCircle },
  { name: "OpenAI API",    lucide: Brain },
  { name: "RAG",           lucide: BookOpen },
  { name: "LLMs",          lucide: Brain },
  { name: "AI Agents",     lucide: Users },
  { name: "Genetic Algos", lucide: Compass },
  { name: "Predictive",    lucide: TrendingUp },
  { name: "Pandas",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
  { name: "NumPy",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
  { name: "Jupyter",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg" },
  { name: "MLflow",        lucide: TrendingUp },
]

const computerVisionSkills = [
  { name: "Roboflow",         lucide: FlaskConical },
  { name: "Image Annotation", lucide: Eye },
  { name: "Detection Models", lucide: Lightbulb },
  { name: "Object Detection", lucide: Eye },
]

const dataAnalyticsSkills = [
  { name: "Power BI",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg", isPowerBI: true },
  { name: "Tableau",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", isTableau: true },
  { name: "Excel",      lucide: BarChart },
  { name: "Matplotlib", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Seaborn",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
]

const devopsAutomationSkills = [
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "CI/CD",  lucide: TrendingUp },
  { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", invert: true },
  { name: "Copilot",lucide: Brain },
  { name: "n8n",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", isN8n: true },
]

const interpersonalSkills = [
  { name: "Critical Thinking",    icon: Brain,         color: "cyan",    tags: ["Analytical", "Problem Solving", "Data-Driven"] },
  { name: "Team Collaboration",   icon: Users,         color: "violet",  tags: ["Cross-functional", "Agile", "Sync"] },
  { name: "Adaptability",         icon: Compass,       color: "amber",   tags: ["Fast Learner", "Flexible", "Multi-domain"] },
  { name: "Leadership",           icon: Handshake,     color: "pink",    tags: ["Mentoring", "Ownership", "Initiative"] },
  { name: "Time Management",      icon: Clock,         color: "emerald", tags: ["Deadline-driven", "Prioritization", "Efficient"] },
  { name: "Creativity & Innovation", icon: Lightbulb,  color: "orange",  tags: ["Creative", "Innovation", "Inventive"] },
  { name: "Continuous Learning",  icon: BookOpen,      color: "sky",     tags: ["Self-driven", "Certifications", "Growth"] },
  { name: "Research & Development",icon: FlaskConical, color: "rose",    tags: ["R&D", "Experimental", "Systematic"] },
  { name: "Communication",        icon: MessageCircle, color: "teal",    tags: ["Clarity", "Storytelling", "Stakeholder"] },
]

const colorMap = {
  cyan:    { bg: "bg-cyan-500/10",    border: "border-cyan-500/20",    icon: "text-cyan-400",    tag: "text-cyan-400/70 border-cyan-400/20" },
  violet:  { bg: "bg-violet-500/10",  border: "border-violet-500/20",  icon: "text-violet-400",  tag: "text-violet-400/70 border-violet-400/20" },
  amber:   { bg: "bg-amber-500/10",   border: "border-amber-500/20",   icon: "text-amber-400",   tag: "text-amber-400/70 border-amber-400/20" },
  pink:    { bg: "bg-pink-500/10",    border: "border-pink-500/20",    icon: "text-pink-400",    tag: "text-pink-400/70 border-pink-400/20" },
  emerald: { bg: "bg-emerald-500/10", border: "border-emerald-500/20", icon: "text-emerald-400", tag: "text-emerald-400/70 border-emerald-400/20" },
  orange:  { bg: "bg-orange-500/10",  border: "border-orange-500/20",  icon: "text-orange-400",  tag: "text-orange-400/70 border-orange-400/20" },
  sky:     { bg: "bg-sky-500/10",     border: "border-sky-500/20",     icon: "text-sky-400",     tag: "text-sky-400/70 border-sky-400/20" },
  rose:    { bg: "bg-rose-500/10",    border: "border-rose-500/20",    icon: "text-rose-400",    tag: "text-rose-400/70 border-rose-400/20" },
  teal:    { bg: "bg-teal-500/10",    border: "border-teal-500/20",    icon: "text-teal-400",    tag: "text-teal-400/70 border-teal-400/20" },
}

const SectionHeader = ({ emoji, emojiBg, title, borderColor = "border-cyan-400" }) => (
  <div className="flex items-center gap-3 mb-6 mt-12">
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${emojiBg}`}>
      {emoji}
    </div>
    <h2 className={`text-2xl font-bold text-white border-b-2 ${borderColor} pb-0.5`}>{title}</h2>
    <div className="flex-1 h-px bg-white/8" />
  </div>
)

const SkillIconCard = ({ skill }) => {
  const LucideIcon = skill.lucide
  const displayName = skill.isN8n ? "n8n" : skill.isSnowflake ? "Snowflake" : skill.isPowerBI ? "Power BI" : skill.isTableau ? "Tableau" : skill.isSklearn ? "Scikit-learn" : skill.name

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/8 bg-[#0d1017] p-4 flex flex-col items-center gap-3 cursor-pointer transition-all duration-500 hover:border-cyan-400/50 hover:bg-[#141820] hover:-translate-y-2 hover:scale-105 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] min-h-[130px] justify-center">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-cyan-500/10 to-transparent pointer-events-none rounded-2xl" />
      <div className="relative w-14 h-14 rounded-xl flex items-center justify-center group-hover:animate-pulse">
        {LucideIcon ? (
          <LucideIcon className="w-10 h-10 text-violet-400 drop-shadow-md" />
        ) : skill.isN8n ? (
          <span className="text-2xl font-black text-orange-400 drop-shadow-md">n8n</span>
        ) : skill.isSnowflake ? (
          <span className="text-2xl font-black text-sky-400 drop-shadow-md">❄</span>
        ) : skill.isPowerBI ? (
          <span className="text-xl font-black text-yellow-400 drop-shadow-md">PBI</span>
        ) : skill.isTableau ? (
          <span className="text-xl font-black text-blue-400 drop-shadow-md">TAB</span>
        ) : skill.isSklearn ? (
          <span className="text-[10px] font-black text-orange-400 text-center leading-tight drop-shadow-md">sklearn</span>
        ) : skill.isCustomText ? (
          <span className="text-2xl font-black text-slate-200 drop-shadow-md">{skill.name.slice(0, 2).toUpperCase()}</span>
        ) : (
          <img
            src={skill.icon}
            alt={skill.name}
            className={`w-14 h-14 rounded-xl object-contain drop-shadow-md transition-transform duration-500 group-hover:rotate-3 ${skill.invert ? "invert brightness-90" : ""}`}
          />
        )}
      </div>
      <span className="relative text-[11px] font-semibold text-slate-400 uppercase tracking-wider text-center leading-tight px-1 group-hover:text-cyan-300 transition-colors duration-300">
        {displayName}
      </span>
    </div>
  )
}

const InterpersonalCard = ({ skill }) => {
  const Icon = skill.icon
  const c = colorMap[skill.color]
  return (
    <article className={`relative overflow-hidden rounded-2xl border ${c.border} bg-[#0d1017] p-6 flex flex-col gap-4 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] group`}>
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${c.bg} pointer-events-none`} />
      <div className="relative flex items-start gap-4">
        <div className={`w-12 h-12 rounded-xl ${c.bg} flex items-center justify-center flex-shrink-0 group-hover:rotate-6 transition-transform duration-500`}>
          <Icon className={`w-6 h-6 ${c.icon}`} />
        </div>
        <div>
          <h3 className="text-base font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all duration-300">{skill.name}</h3>
        </div>
      </div>
      <div className="relative flex flex-wrap gap-2">
        {skill.tags.map((tag) => (
          <span key={tag} className={`text-[10px] uppercase tracking-wider font-medium border rounded-full px-3 py-1 ${c.tag} transition-colors duration-300 group-hover:border-white/20 group-hover:text-white/90`}>
            {tag}
          </span>
        ))}
      </div>
    </article>
  )
}

// ─── Main page ─────────────────────────────────────────────────────────────────

const SkillsPage = () => {
  const [customSkills, setCustomSkills] = useState([])

  useEffect(() => {
    const loadSkills = () => {
      const savedSkills = loadPortfolioData("portfolio_skills", [])
      setCustomSkills(savedSkills)
    }
    loadSkills()
    window.addEventListener("portfolio-data-changed", loadSkills)
    return () => window.removeEventListener("portfolio-data-changed", loadSkills)
  }, [])

  const allSkillCategories = [
    ...customSkills.map(skill => ({
      name: skill.category,
      icon: Brain,
      color: "blue",
      tags: skill.items || []
    })),
    { name: "Programming Languages",         icon: "⌨️", color: "amber",   tags: languageSkills },
    { name: "Data Engineering & Cloud",       icon: Database, color: "cyan",    tags: dataEngineeringCloudSkills },
    { name: "Databases",                      icon: Database, color: "green",   tags: databaseSkills },
    { name: "Frontend Development",           icon: "💻", color: "blue",    tags: frontendSkills },
    { name: "Backend Development",            icon: "⚙️", color: "purple",  tags: backendSkills },
    { name: "ML/AI & Data Science",           icon: Brain,    color: "red",     tags: mlAiDataScienceSkills },
    { name: "Computer Vision",                icon: Eye,      color: "orange",  tags: computerVisionSkills },
    { name: "Data Analytics & Visualization", icon: BarChart, color: "emerald", tags: dataAnalyticsSkills },
    { name: "Soft Skills",                    icon: Users,    color: "pink",    tags: interpersonalSkills },
  ]

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        /* ─── GPU hints ─── */
        .sk-orb, .sk-aurora, .sk-spark, .sk-pulse {
          will-change: transform, opacity;
          backface-visibility: hidden;
        }

        /* ─── Orbs ─── */
        @keyframes sk-orb-1 {
          0%   { transform: translate(-50%,-50%) translateY(0px)   scale(1);    }
          35%  { transform: translate(-50%,-50%) translateY(-18px)  scale(1.05); }
          65%  { transform: translate(-50%,-50%) translateY(-30px)  scale(1.10); }
          100% { transform: translate(-50%,-50%) translateY(0px)   scale(1);    }
        }
        @keyframes sk-orb-2 {
          0%   { transform: translateY(0px)  scale(1);    }
          40%  { transform: translateY(-22px) scale(1.06); }
          100% { transform: translateY(0px)  scale(1);    }
        }
        @keyframes sk-orb-3 {
          0%   { transform: translateY(0px)  scale(1);    }
          50%  { transform: translateY(-14px) scale(1.03); }
          100% { transform: translateY(0px)  scale(1);    }
        }
        .sk-orb-1 { animation: sk-orb-1 24s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite; }
        .sk-orb-2 { animation: sk-orb-2 19s cubic-bezier(0.37, 0, 0.63, 1) infinite 3s; }
        .sk-orb-3 { animation: sk-orb-3 30s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite 1.5s; }

        /* ─── Aurora ─── */
        @keyframes sk-aurora {
          0%   { transform: translateX(-20%) translateY(0%)   skewX(0deg);   opacity: 0.55; }
          25%  { transform: translateX(-5%)  translateY(-5%)  skewX(1.5deg); opacity: 0.72; }
          50%  { transform: translateX(20%)  translateY(-8%)  skewX(0deg);   opacity: 0.80; }
          75%  { transform: translateX(5%)   translateY(-3%)  skewX(-1deg);  opacity: 0.66; }
          100% { transform: translateX(-20%) translateY(0%)   skewX(0deg);   opacity: 0.55; }
        }
        .sk-aurora { animation: sk-aurora 28s cubic-bezier(0.37, 0, 0.63, 1) infinite; }

        /* ─── Sparkles ─── */
        @keyframes sk-spark-a {
          0%   { transform: translateY(0px)   translateX(0px) scale(1);    opacity: 0.18; }
          35%  { transform: translateY(-13px)  translateX(5px) scale(1.14); opacity: 0.28; }
          70%  { transform: translateY(-7px)   translateX(-3px)scale(0.9);  opacity: 0.12; }
          100% { transform: translateY(0px)   translateX(0px) scale(1);    opacity: 0.18; }
        }
        @keyframes sk-spark-b {
          0%   { transform: translateY(0px)  translateX(0px)  scale(1);   opacity: 0.16; }
          50%  { transform: translateY(-17px) translateX(-5px) scale(1.2); opacity: 0.25; }
          100% { transform: translateY(0px)  translateX(0px)  scale(1);   opacity: 0.16; }
        }
        @keyframes sk-spark-c {
          0%   { transform: translateY(0px)  translateX(0px) scale(1);    opacity: 0.14; }
          45%  { transform: translateY(-10px) translateX(6px) scale(1.1);  opacity: 0.22; }
          85%  { transform: translateY(-15px) translateX(2px) scale(0.94); opacity: 0.10; }
          100% { transform: translateY(0px)  translateX(0px) scale(1);    opacity: 0.14; }
        }
        .sk-spark-a { animation: sk-spark-a 14s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite; }
        .sk-spark-b { animation: sk-spark-b 20s cubic-bezier(0.37, 0, 0.63, 1) infinite 2.5s; }
        .sk-spark-c { animation: sk-spark-c 17s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite 4.5s; }
        .sk-spark-d { animation: sk-spark-b 22s cubic-bezier(0.37, 0, 0.63, 1) infinite 1s; }

        /* ─── Pulse ─── */
        @keyframes sk-pulse {
          0%   { transform: scale(1);    opacity: 0.12; }
          50%  { transform: scale(1.10); opacity: 0.22; }
          100% { transform: scale(1);    opacity: 0.12; }
        }
        .sk-pulse { animation: sk-pulse 18s cubic-bezier(0.37, 0, 0.63, 1) infinite; }

        /* ─── Noise ─── */
        .sk-noise {
          background-image: radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 28px 28px;
        }

        /* ─── Heading entrance ─── */
        @keyframes sk-rise {
          0%   { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0px);  }
        }
        .sk-badge  { animation: sk-rise 0.5s cubic-bezier(0.22, 1, 0.36, 1) both 0.10s; }
        .sk-title  { animation: sk-rise 0.6s cubic-bezier(0.22, 1, 0.36, 1) both 0.22s; }
        .sk-body   { animation: sk-rise 0.6s cubic-bezier(0.22, 1, 0.36, 1) both 0.38s; }

        /* ─── Section label slide-in ─── */
        @keyframes sk-label {
          0%   { opacity: 0; transform: translateX(-10px); }
          100% { opacity: 1; transform: translateX(0px);   }
        }
        .sk-section-label { animation: sk-label 0.5s cubic-bezier(0.22, 1, 0.36, 1) both; }
      `}} />

      <main className="relative pt-20 min-h-screen bg-[#080b10] text-white overflow-hidden">

        {/* ── Ambient background glows ── */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="sk-orb sk-orb-1 absolute top-[10%] left-1/2 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[100px] opacity-60 mix-blend-screen" />
          <div className="sk-orb sk-orb-2 absolute top-[40%] right-[-10%] h-[400px] w-[400px] rounded-full bg-violet-500/10 blur-[100px] opacity-50 mix-blend-screen" />
          <div className="sk-orb sk-orb-3 absolute bottom-[-10%] left-[-10%] h-[600px] w-[600px] rounded-full bg-amber-500/10 blur-[120px] opacity-40 mix-blend-screen" />
        </div>

        <section className="relative z-10 container mx-auto px-6 py-20 lg:py-24 max-w-7xl">

          {/* ── Inner depth layer (matches AchievementsPage) ── */}
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[40px]">
            <div className="sk-aurora absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(14,41,78,0.22),_transparent_35%),radial-gradient(circle_at_left,_rgba(34,211,238,0.08),_transparent_28%),radial-gradient(circle_at_right,_rgba(139,92,246,0.07),_transparent_30%)] mix-blend-screen opacity-95" />
            <div className="absolute inset-0 sk-noise opacity-12" />
            <div className="sk-spark sk-spark-a absolute left-[8%]   top-[12%]    h-1.5 w-1.5 rounded-full bg-white/15    blur-sm" />
            <div className="sk-spark sk-spark-b absolute left-[20%]  bottom-[28%] h-2   w-2   rounded-full bg-cyan-400/20  blur-sm" />
            <div className="sk-spark sk-spark-c absolute right-[15%] top-[20%]    h-1.5 w-1.5 rounded-full bg-violet-400/18 blur-sm" />
            <div className="sk-spark sk-spark-d absolute right-[28%] bottom-[15%] h-2   w-2   rounded-full bg-amber-400/16 blur-sm" />
            <div className="sk-pulse absolute left-[50%] top-[40%] h-64 w-64 rounded-full bg-[#0f172a]/20 blur-[200px] opacity-55" />
          </div>

          {/* ── Page heading (same rhythm as AchievementsPage) ── */}
          <div className="mx-auto mb-16 max-w-3xl text-center flex flex-col items-center">
            <span className="sk-badge inline-flex items-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase text-cyan-400/80 border border-cyan-400/20 rounded-full px-4 py-1.5 mb-4 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
              Skills Library
            </span>
            <h1 className="sk-title mt-4 text-4xl md:text-5xl font-black text-white leading-tight">
              Technologies &amp; Tools
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400 drop-shadow-sm">
                I Work With
              </span>
            </h1>
            <p className="sk-body mx-auto mt-4 max-w-xl text-slate-400 text-lg leading-relaxed">
              A curated set of languages, frameworks, and interpersonal strengths I bring to every project.
            </p>
          </div>

          {/* ── Dynamic skill categories ── */}
          {allSkillCategories.map((category) => (
            <div key={category.name}>
              <div className="sk-section-label">
                <SectionHeader
                  emoji={typeof category.icon === "string" ? category.icon : "🛠️"}
                  emojiBg={`bg-${category.color}-500/15`}
                  title={category.name}
                  borderColor={`border-${category.color}-400`}
                />
              </div>
              {category.name === "Interpersonal Strengths" || category.name === "Soft Skills" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.tags.map((skill) => (
                    <InterpersonalCard key={skill.name} skill={skill} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-3">
                  {category.tags.map((tag) => {
                    const skillData = typeof tag === "string" ? { name: tag, ...getCustomSkillIcon(tag) } : tag
                    return <SkillIconCard key={skillData.name} skill={skillData} />
                  })}
                </div>
              )}
            </div>
          ))}

        </section>
      </main>
    </>
  )
}

export default SkillsPage