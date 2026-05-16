import { useState, useEffect } from "react"
import { addPortfolioDataItem, loadPortfolioData, savePortfolioData } from "@/utils/portfolioStorage"

const formDefaults = {
  section: "project",
  title: "",
  description: "",
  github: "",
  image: "",
  tags: "",
  category: "",
  type: "",
  institution: "",
  date: "",
  degree: "",
  year: "",
  school: "",
}

const sectionOptions = [
  { id: "project", label: "Project" },
  { id: "skill", label: "Skill Category" },
  { id: "certification", label: "Certification" },
  { id: "education", label: "Education" },
]

const AdminPage = () => {
  const [form, setForm] = useState(formDefaults)
  const [status, setStatus] = useState("")
  const [activeTab, setActiveTab] = useState("add")
  const [data, setData] = useState({
    projects: [],
    skills: [],
    certifications: [],
    educations: [],
  })
  const [editingItem, setEditingItem] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedFile(file)
      // Convert file to base64
      const reader = new FileReader()
      reader.onload = (e) => {
        setForm((prev) => ({ ...prev, image: e.target.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  useEffect(() => {
    setData({
      projects: loadPortfolioData("portfolio_projects", []),
      skills: loadPortfolioData("portfolio_skills", []),
      certifications: loadPortfolioData("portfolio_certifications", []),
      educations: loadPortfolioData("portfolio_educations", []),
    })
  }, [])

  const refreshData = () => {
    setData({
      projects: loadPortfolioData("portfolio_projects", []),
      skills: loadPortfolioData("portfolio_skills", []),
      certifications: loadPortfolioData("portfolio_certifications", []),
      educations: loadPortfolioData("portfolio_educations", []),
    })
  }

  const notifyPortfolioUpdate = () => {
    refreshData()
    console.log("[Admin] Dispatching portfolio-data-changed event", { projects: data.projects })
    window.dispatchEvent(new CustomEvent("portfolio-data-changed"))
  }

  const handleChange = (key) => (event) => {
    setForm((prev) => ({ ...prev, [key]: event.target.value }))
  }

  const handleEdit = (section, item) => {
    setEditingItem({ section, item })
    setForm({
      section,
      title: item.title || "",
      description: item.description || "",
      github: item.github || "",
      image: item.image || "",
      tags: item.tag ? item.tag.join(", ") : item.items ? item.items.join(", ") : "",
      category: item.category || "",
      type: item.type || "",
      institution: item.institution || "",
      date: item.date || "",
      degree: item.degree || "",
      year: item.year || "",
      school: item.school || "",
    })
    setActiveTab("add")
  }

  const handleDelete = (section, itemId) => {
    const key = `portfolio_${section}s`
    const current = loadPortfolioData(key, [])
    let filtered
    if (section === "skill") {
      filtered = current.filter((_, index) => index !== itemId)
    } else {
      filtered = current.filter(item => item.id !== itemId)
    }
    savePortfolioData(key, filtered)
    notifyPortfolioUpdate()
    setStatus("Item deleted successfully.")
  }

  const handleUpdate = (event) => {
    event.preventDefault()
    if (!editingItem) return

    const { section, item } = editingItem
    const key = `portfolio_${section}s`
    const current = loadPortfolioData(key, [])
    let updated
    if (section === "skill") {
      updated = current.map((existing, index) => {
        if (index === item.id) {
          return {
            category: form.category || existing.category,
            items: form.tags.split(",").map(tag => tag.trim()).filter(Boolean) || existing.items,
          }
        }
        return existing
      })
    } else {
      updated = current.map(existing => {
        if (existing.id === item.id) {
          return {
            ...existing,
            title: form.title || existing.title,
            description: form.description || existing.description,
            github: form.github || existing.github,
            image: form.image || existing.image,
            tag: form.tags.split(",").map(tag => tag.trim()).filter(Boolean) || existing.tag,
            items: form.tags.split(",").map(tag => tag.trim()).filter(Boolean) || existing.items,
            category: form.category || existing.category,
            type: form.type || existing.type,
            institution: form.institution || existing.institution,
            date: form.date || existing.date,
            degree: form.degree || existing.degree,
            year: form.year || existing.year,
            school: form.school || existing.school,
          }
        }
        return existing
      })
    }
    savePortfolioData(key, updated)
    notifyPortfolioUpdate()
    setStatus("Item updated successfully.")
    setEditingItem(null)
    setForm(formDefaults)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (editingItem) {
      handleUpdate(event)
      return
    }

    const now = new Date().toISOString()

    if (form.section === "project") {
      const rawGithub = form.github || form.institution || "#"
      const normalizedGithub = rawGithub && rawGithub !== "#"
        ? rawGithub.startsWith("http")
          ? rawGithub
          : `https://${rawGithub}`
        : "#"
      const project = {
        id: `project-${now}`,
        title: form.title || "New Project",
        description: form.description || "Project description will appear here.",
        github: normalizedGithub,
        image: form.image || "https://via.placeholder.com/900x560?text=Project+Image",
        tag: form.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      }
      console.log("[Admin] Adding project:", project)
      addPortfolioDataItem("portfolio_projects", project)
      setStatus("Project added successfully.")
    }

    if (form.section === "skill") {
      const skill = {
        category: form.category || "New skill category",
        items: form.tags.split(",").map((item) => item.trim()).filter(Boolean),
      }
      addPortfolioDataItem("portfolio_skills", skill)
      setStatus("Skill category added successfully.")
    }

    if (form.section === "certification") {
      const certification = {
        id: `cert-${now}`,
        title: form.title || "Certification Title",
        institution: form.institution || "Institution Name",
        type: form.type || "Certification",
        date: form.date || "Year",
        description: form.description || "Certification description.",
        image: form.image || "https://via.placeholder.com/800x500?text=Certification+Image",
      }
      addPortfolioDataItem("portfolio_certifications", certification)
      setStatus("Certification added successfully.")
    }

    if (form.section === "education") {
      const education = {
        id: `edu-${now}`,
        degree: form.degree || "Degree Title",
        institution: form.institution || "Institution Name",
        year: form.year || "Graduation Year",
        description: form.description || "Education description.",
        school: form.school || "University / College",
      }
      addPortfolioDataItem("portfolio_educations", education)
      setStatus("Education item added successfully.")
    }

    notifyPortfolioUpdate()
    setForm((prev) => ({ ...formDefaults, section: prev.section }))
  }

  return (
    <main className="pt-24 min-h-screen bg-slate-950 text-white">
      <div className="container mx-auto px-6 py-24">
        <div className="mx-auto max-w-4xl text-center mb-12">
          <span className="text-secondary-foreground text-sm font-semibold tracking-[0.35em] uppercase">
            Admin Panel
          </span>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold text-white">
            Manage portfolio content instantly.
          </h1>
          <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
            Add projects, skill categories, certifications, and education entries directly from this admin interface.
          </p>
        </div>

        <div className="glass rounded-4xl border border-white/10 p-8 shadow-2xl shadow-black/20">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm text-muted-foreground">
                Section
                <select
                  value={form.section}
                  onChange={handleChange("section")}
                  className="w-full rounded-3xl border border-border/50 bg-background/80 px-4 py-3 text-sm text-white outline-none focus:border-primary"
                >
                  {sectionOptions.map((option) => (
                    <option key={option.id} value={option.id}>{option.label}</option>
                  ))}
                </select>
              </label>

              <label className="space-y-2 text-sm text-muted-foreground">
                Title
                <input
                  value={form.title}
                  onChange={handleChange("title")}
                  placeholder="Title"
                  className="w-full rounded-3xl border border-border/50 bg-background/80 px-4 py-3 text-sm text-white outline-none focus:border-primary"
                />
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm text-muted-foreground">
                Institution / Project Link
                <input
                  value={form.institution}
                  onChange={handleChange("institution")}
                  placeholder="Institution or external link"
                  className="w-full rounded-3xl border border-border/50 bg-background/80 px-4 py-3 text-sm text-white outline-none focus:border-primary"
                />
              </label>

              <label className="space-y-2 text-sm text-muted-foreground">
                GitHub Link
                <input
                  value={form.github}
                  onChange={handleChange("github")}
                  placeholder="https://github.com/owner/repo"
                  className="w-full rounded-3xl border border-border/50 bg-background/80 px-4 py-3 text-sm text-white outline-none focus:border-primary"
                />
              </label>

              <label className="space-y-2 text-sm text-muted-foreground">
                Category / Type
                <input
                  value={form.type || form.category}
                  onChange={(event) => {
                    if (form.section === "skill") {
                      setForm((prev) => ({ ...prev, category: event.target.value }))
                    } else {
                      setForm((prev) => ({ ...prev, type: event.target.value }))
                    }
                  }}
                  placeholder={form.section === "skill" ? "Skills category" : "Certification type"}
                  className="w-full rounded-3xl border border-border/50 bg-background/80 px-4 py-3 text-sm text-white outline-none focus:border-primary"
                />
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm text-muted-foreground">
                Degree / Education Label
                <input
                  value={form.degree}
                  onChange={handleChange("degree")}
                  placeholder="Degree (Example: BSc Software Engineering)"
                  className="w-full rounded-3xl border border-border/50 bg-background/80 px-4 py-3 text-sm text-white outline-none focus:border-primary"
                />
              </label>

              <label className="space-y-2 text-sm text-muted-foreground">
                Graduation Year
                <input
                  value={form.year}
                  onChange={handleChange("year")}
                  placeholder="2025"
                  className="w-full rounded-3xl border border-border/50 bg-background/80 px-4 py-3 text-sm text-white outline-none focus:border-primary"
                />
              </label>
            </div>

            <div className="space-y-4">
              <label className="space-y-2 text-sm text-muted-foreground">
                Image URL / Media
                <input
                  value={form.image}
                  onChange={handleChange("image")}
                  placeholder="https://example.com/image.png or upload file below"
                  className="w-full rounded-3xl border border-border/50 bg-background/80 px-4 py-3 text-sm text-white outline-none focus:border-primary"
                />
              </label>

              <label className="space-y-2 text-sm text-muted-foreground">
                Or Upload Image File
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full rounded-3xl border border-border/50 bg-background/80 px-4 py-3 text-sm text-white outline-none focus:border-primary file:mr-4 file:py-2 file:px-4 file:rounded-2xl file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                />
                {selectedFile && (
                  <p className="text-xs text-green-400 mt-1">Selected: {selectedFile.name}</p>
                )}
              </label>
            </div>

            <label className="space-y-2 text-sm text-muted-foreground">
              Tags / Items (comma separated)
              <input
                value={form.tags}
                onChange={handleChange("tags")}
                placeholder="React, Node.js, AI" 
                className="w-full rounded-3xl border border-border/50 bg-background/80 px-4 py-3 text-sm text-white outline-none focus:border-primary"
              />
            </label>

            <label className="space-y-2 text-sm text-muted-foreground">
              Description
              <textarea
                value={form.description}
                onChange={handleChange("description")}
                placeholder="Enter a short description."
                rows={5}
                className="w-full rounded-3xl border border-border/50 bg-background/80 px-4 py-3 text-sm text-white outline-none focus:border-primary resize-none"
              />
            </label>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 rounded-3xl bg-primary px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary-foreground transition hover:bg-primary/90"
              >
                {editingItem ? "Update Content" : "Save Content"}
              </button>
              {editingItem && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingItem(null)
                    setForm(formDefaults)
                  }}
                  className="rounded-3xl bg-gray-500/20 px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-gray-300 transition hover:bg-gray-500/30"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
          {status && (
            <div className="mt-6 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 p-4 text-emerald-200">
              {status}
            </div>
          )}
        </div>

        {/* View/Edit Section */}
        <div className="glass rounded-4xl border border-white/10 p-8 shadow-2xl shadow-black/20 mt-8">
          <h2 className="text-2xl font-bold text-white mb-6">View & Edit Existing Content</h2>
          
          <div className="space-y-6">
            {/* Projects */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Projects</h3>
              <div className="space-y-4">
                {data.projects.map((project) => (
                  <div key={project.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                    <div className="flex-1">
                      <h4 className="font-medium text-white">{project.title}</h4>
                      <p className="text-sm text-muted-foreground">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.tag?.map((tag) => (
                          <span key={tag} className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit("project", project)}
                        className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-xl hover:bg-blue-500/30 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete("project", project.id)}
                        className="px-4 py-2 bg-red-500/20 text-red-300 rounded-xl hover:bg-red-500/30 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Skills</h3>
              <div className="space-y-4">
                {data.skills.map((skill, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                    <div className="flex-1">
                      <h4 className="font-medium text-white">{skill.category}</h4>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {skill.items?.map((item) => (
                          <span key={item} className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit("skill", { ...skill, id: index })}
                        className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-xl hover:bg-blue-500/30 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete("skill", index)}
                        className="px-4 py-2 bg-red-500/20 text-red-300 rounded-xl hover:bg-red-500/30 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Certifications</h3>
              <div className="space-y-4">
                {data.certifications.map((cert) => (
                  <div key={cert.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                    <div className="flex-1">
                      <h4 className="font-medium text-white">{cert.title}</h4>
                      <p className="text-sm text-muted-foreground">{cert.institution} - {cert.date}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit("certification", cert)}
                        className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-xl hover:bg-blue-500/30 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete("certification", cert.id)}
                        className="px-4 py-2 bg-red-500/20 text-red-300 rounded-xl hover:bg-red-500/30 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Educations */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Education</h3>
              <div className="space-y-4">
                {data.educations.map((edu) => (
                  <div key={edu.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                    <div className="flex-1">
                      <h4 className="font-medium text-white">{edu.degree}</h4>
                      <p className="text-sm text-muted-foreground">{edu.institution} - {edu.year}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit("education", edu)}
                        className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-xl hover:bg-blue-500/30 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete("education", edu.id)}
                        className="px-4 py-2 bg-red-500/20 text-red-300 rounded-xl hover:bg-red-500/30 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default AdminPage
