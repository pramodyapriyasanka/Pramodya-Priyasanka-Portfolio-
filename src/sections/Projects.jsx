import { useEffect, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { AnimatedBorderButton } from "@/components/AnimatedBorderButton"
import { motion } from "framer-motion"
import { supabase } from "@/supabaseClient"

const renderProjectDescription = (description) => {
  if (!description) return null

  const lines = description.split(/\r?\n/)
  const blocks = []
  let paragraphLines = []
  let listItems = []

  const flushParagraph = () => {
    if (paragraphLines.length > 0) {
      blocks.push({ type: "paragraph", content: paragraphLines.join(" ") })
      paragraphLines = []
    }
  }

  const flushList = () => {
    if (listItems.length > 0) {
      blocks.push({ type: "list", content: listItems })
      listItems = []
    }
  }

  lines.forEach((line) => {
    const trimmed = line.trim()
    const match = trimmed.match(/^([\-*•]|\d+[.)])\s+(.*)$/)

    if (match) {
      flushParagraph()
      listItems.push(match[2])
    } else if (trimmed === "") {
      flushParagraph()
      flushList()
    } else {
      paragraphLines.push(trimmed)
    }
  })

  flushParagraph()
  flushList()

  return blocks.map((block, index) => {
    if (block.type === "list") {
      return (
        <ul key={`project-desc-list-${index}`} className="list-disc list-inside text-sm leading-relaxed space-y-2 text-muted-foreground">
          {block.content.map((item, itemIndex) => (
            <li key={`project-desc-item-${itemIndex}`} className="text-sm leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      )
    }

    return (
      <p key={`project-desc-para-${index}`} className="text-sm leading-relaxed whitespace-pre-wrap text-muted-foreground">
        {block.content}
      </p>
    )
  })
}

export const Projects = () => {
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false })

      console.log("[Projects Test] Current State Data:", data)

      if (error) throw error

      setProjects(data || [])
    } catch (err) {
      console.error("[Projects] Fetch exception:", err.message || err)
      setProjects([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()

    const handleDataChange = () => {
      fetchProjects()
    }
    window.addEventListener('portfolio-data-changed', handleDataChange)

    return () => {
      window.removeEventListener('portfolio-data-changed', handleDataChange)
    }
  }, [])

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
  }

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  }

  return (
    <section id="projects" className="py-22 relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-highlight/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }} 
          variants={containerVariants}
          className="text-center mx-auto max-w-3xl mb-16"
        >
          <motion.span variants={headerVariants} className="text-secondary-foreground text-sm font-bold tracking-wider uppercase">
            Featured Work
          </motion.span>
          <motion.h2 variants={headerVariants} className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-secondary-foreground">
            Projects that <br className="hidden sm:block" />
            <span className="font-serif italic font-normal text-white"> make an impact.</span>
          </motion.h2>
          <motion.p variants={headerVariants} className="text-muted-foreground text-lg leading-relaxed">
            A collection of web and mobile applications I’ve built to solve real-world problems through thoughtful design and solid engineering.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {projects && projects.length > 0 ? (
            projects.map((project, idx) => {
              const projectImage = project.image && project.image.trim() !== "" ? project.image : "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800";
              const projectLink = project.github_link && project.github_link !== '#' && project.github_link.trim() !== "" 
                ? (project.github_link.startsWith('http') ? project.github_link : `https://${project.github_link}`) 
                : null;

              return (
                <div
                  key={project.id || idx}
                  className="group relative rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/40 transition-all duration-300 flex flex-col h-full bg-card/40 border border-white/5"
                >
                  <div className="relative overflow-hidden aspect-video border-b border-white/5 w-full h-full custom-image-container">
                    <img
                      src={projectImage}
                      alt={project.title || 'Project'}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800' }}
                    />
                    
                    <div 
                      className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-[2px] transition-all duration-300 custom-overlay"
                      style={{ 
                        opacity: 0.3,
                        zIndex: 999,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0
                      }}
                    >
                      {projectLink && (
                        <a
                          href={projectLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shadow-2xl flex items-center justify-center transition-all duration-200 hover:scale-110"
                          style={{ 
                            width: '56px', 
                            height: '56px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#ffffff',
                            color: '#000000',
                            borderRadius: '50%',
                            border: '1px solid rgba(255, 255, 255, 0.2)'
                          }}
                          title="View on GitHub"
                        >
                          <svg 
                            width="26" 
                            height="26" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2.5" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          >
                            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                            <path d="M9 18c-4.51 2-5-2-7-2" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="p-8 flex flex-col flex-grow space-y-4 relative z-10">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-2xl font-bold group-hover:text-primary transition-colors text-foreground leading-tight">
                        {project.title || 'Untitled Project'}
                      </h3>
                      <ArrowUpRight className="w-6 h-6 flex-shrink-0 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </div>

                    <div className="flex-grow space-y-3">
                      {renderProjectDescription(project.description || '')}
                    </div>

                    <div className="flex flex-wrap gap-2 pt-4 border-t border-border/40">
                      {project.tags?.map((tag, tagIdx) => (
                        <span
                          key={`${project.id || idx}-tag-${tagIdx}`}
                          className="px-3.5 py-1.5 rounded-full bg-primary/10 text-xs font-semibold text-primary/80 group-hover:text-primary border border-primary/20 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No projects available yet.</p>
            </div>
          )}
        </div>

        <style>{`
          .custom-image-container .custom-overlay {
            opacity: 0.15 !important;
            background-color: rgba(0, 0, 0, 0.3) !important;
          }
          .custom-image-container:hover .custom-overlay {
            opacity: 1 !important;
            background-color: rgba(0, 0, 0, 0.7) !important;
          }
        `}</style>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center mt-16"
        >
          <AnimatedBorderButton className="group flex items-center gap-2 px-8 py-4 text-lg border-primary/40" onClick={() => window.location.href = "/projects"}>
            View All Projects
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </AnimatedBorderButton>
        </motion.div>
      </div>
    </section>
  )
}