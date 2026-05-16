import { Button } from "@/components/Button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const navLinks = [
  { id: "home", to: "/", label: "Home" },
  { id: "skills", to: "/skills", label: "Skills" },
  { id: "projects", to: "/projects", label: "Projects" },
  { id: "achievements", to: "/achievements", label: "Achievement" },
  { id: "contact", to: "/contact", label: "Contact" },
];

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeClass = "text-white bg-white/10 backdrop-blur-xl";
  const linkClass = "px-4 py-2 text-sm font-medium rounded-full transition duration-300";

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${isScrolled ? "glass-strong border-b border-white/10 py-3 shadow-xl shadow-slate-950/10" : "bg-transparent py-5"}`}>
      <div className="container mx-auto flex items-center justify-between px-6">
        <NavLink to="/" className="flex items-center gap-3 text-xl font-semibold tracking-tight text-white">
          <span className="sr-only">Home</span>
        </NavLink>

        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full bg-slate-900/60 px-2 py-2 backdrop-blur-xl">
            {navLinks.map((link) => (
              <NavLink
                key={link.id}
                to={link.to}
                className={({ isActive }) =>
                  `${linkClass} ${isActive ? activeClass : "text-muted-foreground hover:text-white hover:bg-white/5"}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <NavLink to="/contact">
            <Button size="sm">Contact Me</Button>
          </NavLink>
        </div>

        <button
          className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-slate-900/70 text-white shadow-lg shadow-slate-950/20 transition hover:bg-white/10"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden glass-strong border-t border-white/10 backdrop-blur-xl animate-fade-in">
          <div className="container mx-auto px-6 py-5 space-y-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.id}
                to={link.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block rounded-3xl px-5 py-3 text-base font-medium transition ${isActive ? activeClass : "text-muted-foreground hover:text-white hover:bg-white/5"}`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
              <Button size="sm" className="w-full justify-center">Contact Me</Button>
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};
