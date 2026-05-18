import { Button } from "@/components/Button"
import { ArrowRight, ChevronDown, ChevronUp, Github, Linkedin, Download, Facebook } from "lucide-react"
import { AnimatedBorderButton } from "@/components/AnimatedBorderButton"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const skills = [
  { id: "skill-python", name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { id: "skill-java", name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
  { id: "skill-js", name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
  { id: "skill-react", name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { id: "skill-node", name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { id: "skill-flutter", name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg" },
  { id: "skill-mongo", name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
  { id: "skill-sql", name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
  { id: "skill-tailwind", name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { id: "skill-docker", name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
  { id: "skill-aws", name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
  { id: "skill-ml", name: "Machine Learning", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg" },
]

const heroParticles = [
  { left: "5%", top: "82%", size: 2, duration: "16s", delay: "0s", opacity: 0.18 },
  { left: "20%", top: "90%", size: 2, duration: "12s", delay: "1.2s", opacity: 0.24 },
  { left: "13%", top: "60%", size: 3, duration: "18s", delay: "0.8s", opacity: 0.16 },
  { left: "72%", top: "85%", size: 2, duration: "14s", delay: "0.5s", opacity: 0.2 },
  { left: "82%", top: "65%", size: 3, duration: "17s", delay: "1.6s", opacity: 0.22 },
  { left: "90%", top: "78%", size: 2, duration: "13s", delay: "0.4s", opacity: 0.16 },
  { left: "42%", top: "92%", size: 2, duration: "19s", delay: "2s", opacity: 0.15 },
  { left: "55%", top: "88%", size: 3, duration: "15s", delay: "1.1s", opacity: 0.18 },
  { left: "35%", top: "70%", size: 2, duration: "14s", delay: "0.9s", opacity: 0.17 },
  { left: "62%", top: "54%", size: 2, duration: "16s", delay: "2.4s", opacity: 0.14 },
  { left: "75%", top: "52%", size: 2, duration: "20s", delay: "1.8s", opacity: 0.2 },
  { left: "47%", top: "40%", size: 2, duration: "18s", delay: "0.3s", opacity: 0.16 },
]

export const Hero = () => {
  const [isNearEnd, setIsNearEnd] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const distanceFromEnd = documentHeight - (scrollPosition + windowHeight)
      setIsNearEnd(distanceFromEnd < 800)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToNext = () => {
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: "easeOut" }
    },
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      <motion.div 
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero-bg.jpg')" }}
        />
      </motion.div>

      <div className="absolute inset-0 opacity-50 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/20 rounded-full blur-[100px] mix-blend-screen" 
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 -left-20 w-80 h-80 bg-highlight/20 rounded-full blur-[100px] mix-blend-screen" 
        />
        <div className="absolute top-10 left-[-12%] h-[400px] w-[400px] rounded-full bg-primary/8 blur-[120px] hero-ambient-orb" />
        <div className="absolute bottom-[-5%] right-[-10%] h-[350px] w-[350px] rounded-full bg-[#00e5c0]/6 blur-[80px] hero-ambient-orb" />
        <div className="absolute top-[30%] right-10 h-[250px] w-[250px] rounded-full bg-[#008978]/5 blur-[60px] hero-ambient-orb" />
        <div className="absolute inset-0 hero-grid-pattern pointer-events-none" />
        <div className="absolute inset-0 hero-noise-overlay pointer-events-none" />
        {heroParticles.map((particle, idx) => (
          <div
            key={`particle-${idx}`}
            className="hero-particle"
            style={{
              left: particle.left,
              top: particle.top,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDuration: particle.duration,
              animationDelay: particle.delay,
              opacity: particle.opacity,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10 w-full">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl mx-auto">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-10 order-2 md:order-1 pt-8 md:pt-0"
          >
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="mb-2"
                >
                  Hi, I'm
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="text-primary glow-text mb-2"
                >
                  Pramodya
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.0 }}
                  className="text-primary glow-text"
                >
                  Priyasanka
                </motion.div>
              </div>
              <h2 className="text-xl md:text-2xl text-secondary-foreground font-semibold tracking-wide">
                Data Engineer & AI Engineer 
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
               Building scalable intelligent systems. I specialize in robust data architecture, autonomous pipelines, and advanced AI integration to craft data-driven solutions that drive business success.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row flex-wrap items-center sm:items-start md:items-center gap-4 sm:gap-6">
              <Button size="lg" className="group w-full sm:w-auto shrink-0 text-base hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 button-glow">
                Get In Touch <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <AnimatedBorderButton
                className="w-full sm:w-auto shrink-0 text-base button-glow"
                onClick={() => {
                  const files = [
                    { url: "/CV/Pramodya Priyasanka   Data engineering cv .pdf", filename: "Pramodya Priyasanka Data Engineering CV.pdf" },
                    { url: "/CV/Pramodya Priyasanka AI Cv.pdf", filename: "Pramodya Priyasanka AI CV.pdf" }
                  ];

                  files.forEach((file, index) => {
                    setTimeout(() => {
                      const a = document.createElement("a");
                      a.href = file.url;
                      a.download = file.filename;
                      a.target = "_blank";
                      a.rel = "noopener noreferrer";
                      document.body.appendChild(a);
                      a.click();
                      a.remove();
                    }, index * 500);
                  });
                }}
              >
                <Download className="w-5 h-5 mr-2" />
                Download CV
              </AnimatedBorderButton>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 pt-4">
              <span className="text-sm text-muted-foreground font-bold tracking-wider uppercase">Follow Me</span>
              <div className="flex gap-4">
                {[
                  { id: "social-github", icon: Github, href: "https://github.com/pramodyapriyasanka", label: "GitHub" },
                  { id: "social-linkedin", icon: Linkedin, href: "https://www.linkedin.com/in/pramodya-priyasanka-752314224/", label: "LinkedIn" },
                  { id: "social-facebook", icon: Facebook, href: "#", label: "Facebook" },
                ].map((social) => {
                  const Icon = social.icon
                  return (
                    <motion.a
                      whileHover={{ scale: 1.1, y: -4 }}
                      whileTap={{ scale: 0.95 }}
                      key={social.id}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={social.label}
                      className="p-3.5 rounded-xl glass hover:bg-primary/20 hover:text-primary transition-all duration-300 group hover:glow-border"
                    >
                      <Icon className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
                    </motion.a>
                  )
                })}
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="flex justify-center md:justify-end order-1 md:order-2 relative"
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-[10%] left-[20%] w-2 h-2 bg-cyan-400/30 rounded-full blur-sm animate-pulse" style={{ animationDelay: '0s', animationDuration: '3s' }} />
              <div className="absolute top-[15%] right-[25%] w-1.5 h-1.5 bg-blue-400/40 rounded-full blur-sm animate-pulse" style={{ animationDelay: '1s', animationDuration: '4s' }} />
              <div className="absolute bottom-[20%] left-[15%] w-2.5 h-2.5 bg-teal-400/25 rounded-full blur-sm animate-pulse" style={{ animationDelay: '2s', animationDuration: '5s' }} />
              <div className="absolute bottom-[15%] right-[20%] w-1 h-1 bg-purple-400/35 rounded-full blur-sm animate-pulse" style={{ animationDelay: '0.5s', animationDuration: '3.5s' }} />
              <div className="absolute top-[40%] left-[10%] w-1.5 h-1.5 bg-cyan-300/20 rounded-full blur-sm animate-pulse" style={{ animationDelay: '1.5s', animationDuration: '4.5s' }} />
              <div className="absolute bottom-[35%] right-[10%] w-2 h-2 bg-blue-300/30 rounded-full blur-sm animate-pulse" style={{ animationDelay: '2.5s', animationDuration: '3.8s' }} />
            </div>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-[300px] h-[300px] md:w-[380px] md:h-[380px] lg:w-[480px] lg:h-[480px] rounded-full bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-teal-500/10 blur-2xl opacity-60"
              />
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className="relative"
            >
              {/* Pulse Rings Animation - Inner Ring (Teal) */}
              <motion.div
                animate={{ scale: [1, 1.08, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute rounded-full pointer-events-none"
                style={{
                  inset: "-10px",
                  border: "2px dashed rgba(29, 158, 117, 0.7)",
                }}
              />
              {/* Pulse Rings Animation - Outer Ring (Blue) */}
              <motion.div
                animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute rounded-full pointer-events-none"
                style={{
                  inset: "-24px",
                  border: "1px dashed rgba(55, 138, 221, 0.5)",
                }}
              />

              <div className="relative w-[260px] h-[260px] md:w-[320px] md:h-[320px] lg:w-[420px] lg:h-[420px] flex items-center justify-center backdrop-blur-xl bg-white/5 rounded-full border border-white/10 shadow-[0_0_60px_rgba(34,211,238,0.15)] hover:shadow-[0_0_80px_rgba(34,211,238,0.25)] transition-all duration-500">
                
                <div className="absolute inset-2 rounded-full z-10 glass-strong overflow-hidden transition-transform duration-500 hover:scale-[1.02] backdrop-blur-2xl bg-white/10">
                  <img
                    src="/image%202.png"
                    alt="Portfolio profile"
                    className="w-full h-full object-cover scale-105"
                  />
                </div>

                <div className="absolute top-0 left-0 right-0 bottom-0 rounded-full ring-1 ring-white/10 shadow-[inset_0_0_40px_rgba(255,255,255,0.08)]" />
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="w-full mt-24 lg:mt-32"
        >
          <div className="flex flex-col items-center mb-8">
            <h3 className="text-sm text-muted-foreground font-bold uppercase tracking-[0.2em] mb-2">
              Technologies I Work With
            </h3>
            <div className="w-16 h-1 bg-primary/30 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ x: "-100%" }}
                 animate={{ x: "200%" }}
                 transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                 className="w-1/2 h-full bg-primary"
               />
            </div>
          </div>
          
          <div className="[mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] overflow-hidden py-4 hover:[&>div]:[animation-play-state:paused]">
            <div className="flex gap-6 animate-marquee-image w-max">
              {[...skills, ...skills, ...skills].map((skill, idx) => (
                <div 
                  key={`${skill.id}-${idx}`} 
                  className="flex-shrink-0 flex items-center gap-3 px-6 py-3.5 glass-strong rounded-xl hover:bg-white/5 transition-all duration-300 hover:border-primary/40 group cursor-default shadow-sm"
                >
                  <motion.img 
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    src={skill.icon} 
                    alt={skill.name} 
                    className="w-9 h-9 object-contain drop-shadow-md" 
                  />
                  <span className="text-base font-bold text-muted-foreground group-hover:text-primary transition-colors whitespace-nowrap">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        onClick={isNearEnd ? scrollToTop : scrollToNext}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 px-4 py-3 rounded-xl hover:text-primary transition-all duration-300 group glass hover:bg-white/5 hover:border-primary/30"
        title={isNearEnd ? "Go to top" : "Scroll to next section"}
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-foreground/70 group-hover:text-primary transition-colors">
          {isNearEnd ? "Go Up" : "Scroll Down"}
        </span>
        <div className="flex flex-col items-center">
          {isNearEnd ? (
            <ChevronUp className="w-5 h-5 animate-bounce group-hover:-translate-y-1 transition-transform" />
          ) : (
            <ChevronDown className="w-5 h-5 animate-bounce group-hover:translate-y-1 transition-transform" />
          )}
        </div>
      </motion.button>
    </section>
  )
}