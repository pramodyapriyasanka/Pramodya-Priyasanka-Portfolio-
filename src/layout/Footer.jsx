import { Mail, Phone, MapPin, Github, Linkedin, Twitter, ExternalLink } from "lucide-react"

const FooterLinks = {
  Navigation: [
    { id: "home", label: "Home", href: "/" },
    { id: "skills", label: "Skills", href: "/skills" },
    { id: "projects", label: "Projects", href: "/projects" },
    { id: "achievements", label: "Achievement", href: "/achievements" },
    { id: "contact", label: "Contact", href: "/contact" },
  ],
  Social: [
    { id: "github", icon: Github, href: "https://github.com/pramodyapriyasanka", label: "GitHub" },
    { id: "linkedin", icon: Linkedin, href: "https://www.linkedin.com/in/pramodya-priyasanka-752314224/", label: "LinkedIn" },
    { id: "twitter", icon: Twitter, href: "#", label: "Twitter" },
  ],
}

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden border-t border-border">
      {/* Background glows */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-highlight/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Portfolio</h3>
              <p className="text-muted-foreground text-sm">
                Building scalable intelligent systems. I specialize in robust data architecture, autonomous pipelines, and advanced AI integration to craft data-driven solutions that drive business success.
              </p>
            </div>
            <div className="pt-4">
              <p className="text-xs text-muted-foreground mb-3 font-semibold uppercase">Follow Me</p>
              <div className="flex gap-3">
                {FooterLinks.Social.map((social, idx) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.id}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg glass hover:bg-primary/20 hover:text-primary transition-all duration-300"
                      title={social.label}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Navigation</h4>
            <ul className="space-y-3">
              {FooterLinks.Navigation.map((link, idx) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Services</h4>
            <ul className="space-y-3">
              {[
                { id: "svc-web", label: "AI & Machine Learning Solutions" },
                { id: "svc-mobile", label: "Mobile Development" },
                { id: "svc-uiux", label: "UI/UX Design" },
                { id: "svc-consult-workflow", label: "Automation & Workflow Optimization" },
                { id: "svc-consult-data", label: "Data Analytics & Visualization" },
                { id: "svc-consulting", label: "Consulting" },
                { id: "svc-ai", label: "GenAI & LLM Integration " },
              ].map((service, idx) => (
                <li key={service.id}>
                  <a
                    href={service.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Contact</h4>
            <div className="space-y-4">
              <a
                href="mailto:priyasankapramodya@gmail.com"
                className="flex items-start gap-3 group"
              >
                <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm text-foreground group-hover:text-primary transition-colors">
                    priyasankapramodya@gmail.com
                  </p>
                </div>
              </a>
              <a href="tel:+9479455367" className="flex items-start gap-3 group">
                <Phone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="text-sm text-foreground group-hover:text-primary transition-colors">
                    +94 79 455 367
                  </p>
                </div>
              </a>
              <a
                href="#"
                className="flex items-start gap-3 group"
              >
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="text-sm text-foreground group-hover:text-primary transition-colors">
                    Remote / Global
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            <p>
              © {currentYear} Portfolio. All rights reserved. Built with <span className="text-primary">React</span> & <span className="text-primary">Tailwind</span>.
            </p>
          </div>

          {/* Scroll to Top Button */}
          {/* <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="p-2 rounded-lg glass hover:bg-primary/20 hover:text-primary transition-all duration-300 group"
            title="Scroll to top"
          >
            <svg
              className="w-5 h-5 group-hover:-translate-y-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button> */}
        </div>
      </div>

      {/* Bottom gradient accent */}
      <div className="h-px bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0" />
    </footer>
  )
}
