import { ArrowUpRight, Github } from "lucide-react"
import { AnimatedBorderButton } from "@/components/AnimatedBorderButton"
import { motion } from "framer-motion"
import { loadPortfolioData } from "@/utils/portfolioStorage"

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

const projects = [
  {
    id: "smart-baby-cradle",
    title: "Smart Baby Cradle",
    description: "This project introduces a smart cradle system that automates baby monitoring using Arduino, NodeMCU, and the Blynk IoT platform. It detects baby movement and sends real-time notifications to parents, ensuring peace of mind and enhanced safety for infants.",
    image: "/projects/smart_baby_cradle.png",
    tag: ["Arduino", "NodeMCU", "Blynk IoT"],
    github: "#",
  },
]

export const Projects = () => {
  const storedProjects = loadPortfolioData("portfolio_projects", [])
  const safeStoredProjects = Array.isArray(storedProjects) ? storedProjects : []

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } }
  }

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
  }

  return (
    <section id="projects" className="py-22 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-highlight/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
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

        {/* Projects Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="grid md:grid-cols-2 gap-8 lg:gap-12"
        >
          {[...safeStoredProjects, ...projects].map((project, idx) => {
            const rawLink = project.github && project.github !== '#' ? project.github : project.institution || null
            const safeHref = rawLink && rawLink !== '#' ? (rawLink.startsWith('http') ? rawLink : `https://${rawLink}`) : null
            return (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="group glass rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/40 transition-all duration-300 md:row-span-1 flex flex-col h-full bg-card/40"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden aspect-video border-b border-white/5">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

                {/* Overlay Links */}
                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                  {safeHref ? (
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      href={safeHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 rounded-full glass hover:bg-primary hover:text-primary-foreground text-white transition-all shadow-lg"
                    >
                      <Github className="w-6 h-6" />
                    </motion.a>
                  ) : (
                    <div className="p-4 rounded-full glass text-white/50" title="No GitHub link provided">
                      <Github className="w-6 h-6" />
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-grow space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-2xl font-bold group-hover:text-primary transition-colors text-foreground leading-tight">
                    {project.title}
                  </h3>
                  <ArrowUpRight className="w-6 h-6 flex-shrink-0 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>

                <div className="flex-grow space-y-3">
                  {renderProjectDescription(project.description)}
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-border/40">
                  {(project.tag || []).map((tag, tagIdx) => (
                    <span
                      key={`${project.id}-tag-${tagIdx}`}
                      className="px-3.5 py-1.5 rounded-full bg-primary/10 text-xs font-semibold text-primary/80 group-hover:text-primary border border-primary/20 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )
          })}
        </motion.div>

        {/* View All CTA */}
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