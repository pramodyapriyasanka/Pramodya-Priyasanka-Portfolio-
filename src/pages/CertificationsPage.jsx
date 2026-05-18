import { useEffect, useState } from "react"
import { supabase } from "@/supabaseClient"

const defaultCertifications = [
  {
    id: "degree-cert",
    title: "Bachelor of Science (BSc) in Software Engineering",
    institution: "Sri Lanka Technological Campus",
    type: "Degree Certification",
    date: "2025",
    description: "Awarded Second Upper Class Honours for completing a rigorous software engineering program with practical projects and research-driven learning.",
    image: "Credentials_Resourses/degree_certificate.jpg",
  },
  {
    id: "drs-appreciation",
    title: "Project Appreciation Letter",
    institution: "Sri Lanka Telecom (SLT)",
    type: "Professional Recognition",
    date: "2025",
    description: "Recognized for meaningful contributions to the Debt Recovery System project, delivering reliable backend and integration work.",
    image: "Credentials_Resourses/SLT_appreciation_letter.jpg",
  },
]

const defaultEducation = [
  {
    id: "bsc-sltc",
    degree: "BSc Software Engineering",
    institution: "Sri Lanka Technological Campus",
    year: "2025",
    description: "Focused on software architecture, full stack development, AI integration, and data engineering best practices.",
  },
  {
    id: "highschool",
    degree: "High School Diploma",
    institution: "Royal College Colombo",
    year: "2021",
    description: "Completed advanced coursework in mathematics, science, and computing, nurturing analytical thinking and problem solving.",
  },
]

const CertificationsPage = () => {
  const [certifications, setCertifications] = useState(defaultCertifications)
  const [education, setEducation] = useState(defaultEducation)

  useEffect(() => {
    const loadCertifications = async () => {
      const { data, error } = await supabase
        .from("certifications")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Failed to load certifications from Supabase:", error)
        return
      }

      if (Array.isArray(data) && data.length > 0) {
        setCertifications(data)
      }
    }

    loadCertifications()
  }, [])

  return (
    <main className="pt-24 min-h-screen bg-slate-950 text-white">
      <section className="container mx-auto px-6 py-24">
        <div className="mx-auto max-w-4xl text-center mb-16">
          <span className="text-secondary-foreground text-sm font-semibold tracking-[0.35em] uppercase">
            Credentials & Education
          </span>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold text-white">
            Certifications and academic milestones.
          </h1>
          <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
            Showcase of my certifications, awards, and education history with a strong focus on AI, software engineering, and data science.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {certifications.map((cert) => (
            <article key={cert.id} className="glass rounded-[28px] border border-white/10 p-8 shadow-2xl shadow-black/20 transition hover:border-primary/50">
              <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-white">{cert.title}</h2>
                  <p className="text-sm text-muted-foreground mt-2">{cert.issuer || cert.institution}</p>
                </div>
                <span className="rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                  {cert.type || "Certification"}
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{cert.description}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{cert.date}</span>
                <span>{cert.id.includes("cert") ? "Certification" : "Achievement"}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-semibold text-white">Education</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              My academic path, degree achievements, and graduation milestones.
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            {education.map((item) => (
              <article key={item.id} className="glass rounded-[28px] border border-white/10 p-8 shadow-2xl shadow-black/20 transition hover:border-primary/50">
                <div className="mb-4">
                  <h3 className="text-2xl font-semibold text-white">{item.degree}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{item.institution}</p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">{item.description}</p>
                <div className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">
                  {item.year}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default CertificationsPage
