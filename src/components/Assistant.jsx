import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { MessageSquare, X, Sparkles } from "lucide-react"

const quickActions = [
  { label: "Services", value: "services" },
  { label: "Skills", value: "skills" },
  { label: "Experience", value: "experience" },
  { label: "Contact", value: "contact" },
  { label: "Availability", value: "availability" },
]

const getResponse = (text) => {
  const t = (text || "").toLowerCase()

  if (/who (are )?you|who's here|who is this/.test(t)) {
    return "I'm the AI assistant for this portfolio — here to help you learn about the owner's work and expertise!"
  }

  if (/service|what do you do|offer|help with/.test(t)) {
    return "Services: AI/ML, GenAI & LLM integration, Full Stack Development, Automation, Analytics, and Cloud/MLOps. Ask for details on any area."
  }

  if (/skill|tech|stack|tools/.test(t)) {
    return "Key tech: Python, TensorFlow, PyTorch, LangChain, OpenAI, React, Next.js, Node.js, SQL, Docker, Azure, AWS. Tell me which tech you want details about."
  }

  if (/experience|projects|background|work/.test(t)) {
    return "The owner focuses on production ML systems, RAG pipelines, ETL & data engineering, and full-stack apps. For specific project details, please use the Contact section to request examples."
  }

  if (/contact|hire|hire me|collab|collaborate/.test(t)) {
    return "To start a conversation about hiring or collaboration, please visit the Contact section — you can send a message or request a meeting there."
  }

  if (/availability|when|start|timeline/.test(t)) {
    return "Availability: typically replies within 24 hours and schedules new engagements weekly. Use the Contact section to share your timeline and get a custom estimate."
  }

  // Fallback — always redirect to Contact instead of saying 'I don't know'
  return "I can help with services, skills, experience, or hiring questions — please visit the Contact section for detailed inquiries or write your question and I'll connect you."
}

export default function Assistant() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hello — I’m here to help. Ask about services, skills, availability, or how to contact the owner.",
    },
  ])
  const [input, setInput] = useState("")
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages, open])

  const push = (role, text) => setMessages((s) => [...s, { role, text }])

  const handleSend = (e) => {
    e && e.preventDefault()
    const t = input.trim()
    if (!t) return
    push("user", t)
    setInput("")
    const reply = getResponse(t)
    setTimeout(() => push("assistant", reply), 400)
  }

  const handleQuick = (value) => {
    push("user", value.charAt(0).toUpperCase() + value.slice(1))
    const reply = getResponse(value)
    setTimeout(() => push("assistant", reply), 300)
    if (value === "contact") {
      // gentle hint for user to navigate
      setTimeout(() => push("assistant", "Open the Contact section (top nav → Contact) to reach out directly."), 700)
    }
  }

  return (
    <div className="assistant-root">
      <button
        aria-label="Open assistant"
        className="assistant-button"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
      </button>

      {open && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="assistant-panel glass rounded-2xl p-4 shadow-2xl">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-2">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">AI Assistant</div>
                <div className="text-xs text-white/80">Professional • Concise • Helpful</div>
              </div>
            </div>
          </div>

          <div ref={scrollRef} className="assistant-scroll mb-3">
            {messages.map((m, i) => (
              <div key={i} className={`mb-3 flex ${m.role === "assistant" ? "justify-start" : "justify-end"}`}>
                <div className={`assistant-bubble ${m.role === "assistant" ? "assistant-assistant" : "assistant-user"}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-2 sm:grid-cols-3 mb-3">
            {quickActions.map((q) => (
              <button key={q.value} type="button" onClick={() => handleQuick(q.value)} className="assistant-quick">
                {q.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSend} className="flex items-center gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask a question…" className="assistant-input" />
            <button type="submit" className="assistant-send">Send</button>
          </form>
        </motion.div>
      )}
    </div>
  )
}
