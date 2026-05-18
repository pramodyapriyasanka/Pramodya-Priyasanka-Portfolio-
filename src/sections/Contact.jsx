import { Mail, MapPin, Phone, Send, ArrowRight } from "lucide-react"
import { useState } from "react"
import emailjs from "@emailjs/browser"
import { motion, AnimatePresence } from "framer-motion"

const ContactInfo = [
  {
    id: "contact-email",
    icon: Mail,
    label: "Email",
    value: "priyasankapramodya@gmail.com",
    href: "mailto:priyasankapramodya@gmail.com",
  },
  {
    id: "contact-phone",
    icon: Phone,
    label: "Phone",
    value: "+94 79 455 367",
    href: "tel:+9479455367",
  },
  {
    id: "contact-location",
    icon: MapPin,
    label: "Location",
    value: "Sri Lanka",
    href: "#",
  },
]

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [submitStatus, setSubmitStatus] = useState({ type: null, message: "" })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setSubmitStatus({ type: null, message: "" })
    
    try {
      const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID
      const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

      if (!serviceID || !templateID || !publicKey) {
        throw new Error("EmailJS configuration is missing. Please check your environment variables.")
      }

      
      await emailjs.send(
        serviceID,
        templateID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        publicKey
      )

      setSubmitStatus({ type: "success", message: "Message sent successfully! 🎉" })
      setFormData({ name: "", email: "", message: "" })
      
      setTimeout(() => {
        setSubmitStatus({ type: null, message: "" })
      }, 4000)
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitStatus({
        type: "error",
        message: error.message || "Error submitting form. Please try again later.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  }

  const formVariants = {
    hidden: { opacity: 0, x: -50, filter: "blur(10px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } }
  }

  const infoVariants = {
    hidden: { opacity: 0, x: 50, filter: "blur(10px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut", delay: 0.4 } }
  }

  const statusVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 20 } },
    exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.2 } }
  }

  return (
    <section id="contact" className="py-22 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-highlight/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } }, hidden: {} }}
          className="text-center mx-auto max-w-3xl mb-12 sm:mb-16"
        >
          <motion.span variants={headerVariants} className="text-secondary-foreground text-xs sm:text-sm font-bold tracking-wider uppercase">
            Get In Touch
          </motion.span>
          <motion.h2 variants={headerVariants} className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-secondary-foreground">
            Let's Build
            <span className="font-serif italic font-normal text-white"> something amazing together</span>
          </motion.h2>
          <motion.p variants={headerVariants} className="text-sm sm:text-base text-muted-foreground">
            Have a project in mind or just want to say hi? I'm always open to new opportunities and collaborations.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={formVariants}
            className="glass rounded-3xl overflow-hidden p-6 sm:p-10 order-2 md:order-1 shadow-2xl shadow-primary/5 hover:border-primary/40 transition-colors duration-500"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-bold text-foreground tracking-wide ml-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your Name"
                  className="w-full px-5 py-4 bg-surface/80 rounded-xl border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-foreground placeholder-muted-foreground outline-none text-base shadow-inner"
                />
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-bold text-foreground tracking-wide ml-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="w-full px-5 py-4 bg-surface/80 rounded-xl border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-foreground placeholder-muted-foreground outline-none text-base shadow-inner"
                />
              </div>

              {/* Message Input */}
              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-bold text-foreground tracking-wide ml-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  required
                  placeholder="Your message here..."
                  className="w-full px-5 py-4 bg-surface/80 rounded-xl border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-foreground placeholder-muted-foreground outline-none resize-none text-base shadow-inner"
                />
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-4 bg-primary hover:bg-primary/90 disabled:bg-primary/50 disabled:cursor-not-allowed text-primary-foreground font-bold text-lg tracking-wide rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-primary/25 group"
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin text-xl">⏳</span>
                    <span>Sending your message...</span>
                  </                  >
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </motion.button>

              {/* Status Message */}
              <AnimatePresence>
                {submitStatus.message && (
                  <motion.div
                    variants={statusVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className={`p-4 rounded-xl text-sm font-bold text-center border shadow-md flex items-center justify-center gap-2 ${
                      submitStatus.type === "success"
                        ? "bg-green-500/10 text-green-400 border-green-500/30"
                        : "bg-red-500/10 text-red-400 border-red-500/30"
                    }`}
                  >
                    {submitStatus.type === "success" ? "✨ " : "⚠️ "}
                    {submitStatus.message}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } }
            }}
            className="space-y-6 order-1 md:order-2 flex flex-col justify-center"
          >
            {ContactInfo.map((item) => {
              const Icon = item.icon
              return (
                <motion.a
                  variants={infoVariants}
                  whileHover={{ scale: 1.03, x: 5 }}
                  key={item.id}
                  href={item.href}
                  target={item.label === "Location" ? "_blank" : undefined}
                  rel={item.label === "Location" ? "noopener noreferrer" : undefined}
                  className="group glass rounded-2xl p-6 border-transparent hover:border-primary/40 transition-colors duration-300 
flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 
cursor-pointer shadow-lg shadow-black/20 hover:shadow-primary/10 bg-card/40"
                >
                  <div className="p-4 rounded-xl bg-primary/10 group-hover:bg-primary transition-colors shrink-0 border border-primary/20">
                    <Icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1 group-hover:text-primary transition-colors">
                      {item.label}
                    </h3>
                    <p className="text-xl font-semibold text-foreground wrap-break-word group-hover:text-white transition-colors">
                      {item.value}
                    </p>
                  </div>
                  <ArrowRight className="w-6 h-6 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all shrink-0" />
                </motion.a>
              )
            })}

            {/* Additional CTA */}
            <motion.div 
              variants={infoVariants}
              whileHover={{ scale: 1.02 }}
              className="glass rounded-2xl p-8 border border-primary/30 bg-primary/5 mt-4"
            >
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                Prefer Direct Chat? <span className="text-2xl">👋</span>
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                Connect with me on LinkedIn or reach out via any platform that's most convenient for you. I try to respond to all inquiries within 24 hours!
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}