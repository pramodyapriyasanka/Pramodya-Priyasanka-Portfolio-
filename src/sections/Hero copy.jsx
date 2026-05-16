import {Button} from "@/components/Button";  
import { ArrowRight, ChevronDown, ChevronUp, Facebook, Github, Linkedin, Download} from "lucide-react";
import { AnimatedBorderButton } from "@/components/AnimatedBorderButton";
import { useState, useEffect } from "react";


const skills = [
  { id: "skill-python", name: "Python" },
  { id: "skill-java", name: "Java" },
  { id: "skill-html", name: "HTML" },
  { id: "skill-flutter", name: "Flutter" },
  { id: "skill-mongo", name: "MongoDB" },
  { id: "skill-sql", name: "SQL" },
  { id: "skill-tailwind", name: "Tailwind CSS" },
  { id: "skill-gh-actions", name: "GitHub Actions" },
  { id: "skill-docker", name: "Docker" },
  { id: "skill-django", name: "Django" },
  { id: "skill-aws", name: "AWS" },
  { id: "skill-js", name: "JavaScript" },
  { id: "skill-react", name: "React" },
  { id: "skill-node", name: "Node.js" },
  { id: "skill-figma", name: "Figma" },
  { id: "skill-postman", name: "Postman" },
  { id: "skill-flask", name: "Flask" },
  { id: "skill-fastapi", name: "FastAPI" },
  { id: "skill-ml", name: "Machine Learning" },
  { id: "skill-ai", name: "AI Integration" },
];

const dots = Array.from({ length: 30 }).map((_, i) => ({
  id: `dot-${i}`,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  duration: 15 + Math.random() * 20,
}));

export const Hero = () => {
  const [isNearEnd, setIsNearEnd] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Calculate if user is near the bottom of the page (within 800px from end)
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const distanceFromEnd = documentHeight - (scrollPosition + windowHeight)
      
      // Show "Go Up" when within 800px from the end
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
  return (  
    <section className="relative min-h-screen flex items-center overflow-hidden"> 
      {/* bg */}
      <div className="absolute inset-0">
        <img src="/hero-bg.jpg" alt="Hero image" className="w-full h-full object-cover opacity-40"  />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/80 to-background"/>  
      </div>
      
      {/* Green Dots */}
      <div className="absolute inset-0 pointer-events-none">
        {dots.map((dot) => (
          <div
            key={dot.id}
            className="absolute w-1.5 h-1.5 rounded-full opacity-60"
            style={{
              backgroundColor: "#20B2A6",
              left: dot.left,
              top: dot.top,
              animation: `slow-drift ${dot.duration}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>
      
      {/* content */}
      <div className="container mx-auto px-4 sm:px-6 relative pt-24 md:pt-32 pb-16 md:pb-20 z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start lg:items-center">
          {/* left column -text content  */}
          <div className="space-y-8 animate-fade-in animation-delay-500">
            <div className="animate-fade-in">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-primary ">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse"/>Software Engineer • Developer
              </span>
            </div>
            
            {/* headline */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in animation-delay-100">
                Crafting <span className="text-primary glow-text"> intelligent,</span> <br/> end-to-end digital experiences<br />
                <span className="font-serif italic font-normal text-white">with precision.</span> 
              </h1>

              <p className="text-lg text-muted-foreground max-w-lg animate-fade-in animation-delay-200">
                Hi there! I'm a passionate software engineer dedicated to building efficient and scalable web applications. 
                With expertise in both frontend and backend development, I create seamless digital experiences that drive success.
              </p>
            </div>
            
            {/* CTAs */}
            <div className="flex items-center gap-4 flex-nowrap animate-fade-in animation-delay-300 overflow-x-auto">
              <Button size="lg">
                Contact Me <ArrowRight className="w-5 h-5"/>
              </Button>
              <AnimatedBorderButton>
                  <Download className="w-5 h-5"/>
        Download CV
              </AnimatedBorderButton>
            </div>
            
            {/* social links */}
            <div className="flex items-center gap-4 animate-fade-in animation-delay-400">
              <span className="text-sm text-muted-foreground">Follow Me: </span>
              {[
                { id: "social-github", icon: Github, href: "#" },
                { id: "social-linkedin", icon: Linkedin, href: "#" },
                { id: "social-facebook", icon: Facebook, href: "#" },
              ].map((social) => (
                <a key={social.id} href={social.href} className="p-2 rounded-full glass hover:bg-primary/40 hover:text-primay transition-all duration-300">
                  {<social.icon className="w-5 h-5 transition-all duration-300 hover:text-primary-foreground "/>}
                </a>
              ))} 
            </div>
          </div>
          
          {/* right column - profile image */}
          <div className="relative animate-fade-in animation-delay-300 flex justify-center md:justify-end  md:self-center lg:self-center   ">
            {/* Profile Image */}
            <div className="relative max-w-md  md:max-w-sm mx-auto  md:mx-0    ">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/30 via-transparent to-primary/10 blur-2xl animate-pulse"/>
              <div className="relative glass rounded-3xl p-2 glow-border">
                <img 
                  src="profile-photo.jpg" 
                  alt="Portfolio profile" 
                  className="w-full h-full aspect-[4/5] object-cover rounded-2xl"
                />

                {/* Floating Badge  */}
                <div className="absolute -bottom-4 md:-right-4 lg:-right-6 right-1/2 translate-x-1/2 md:translate-x-0 glass rounded-xl px-4 py-3 animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm font-medium">Available For Work</span>
                  </div>
                </div>
                
                {/* Stats Badge */}
                <div className="absolute -top-4 md:-left-4 left-1/2 -translate-x-1/2 md:-translate-x-0 glass rounded-xl px-4 py-3 animate-float animation-delay-500">
                  <div className="text-2xl font-bold text-primary">6+</div>
                  <div className="text-xs text-muted-foreground">Months of Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* skills section */}
        <div className="mt-20 animate-fade-in animation-delay-600">
          <p className="text-sm text-muted-foreground mb-6 text-center animate-fade-in animation-delay-500">Technologies I work with:</p>
          <div className="overflow-x-hidden">
            <div className="flex animate-marquee">
              {[...skills,...skills].map((skill, idx) => (
                <div key={`${skill.id}-${idx}`} className="px-8 py-2  flex-shrink-0 ">
                  <span className="text-xl font-semibold text-muted-foreground/50 hover:text-muted-foreground transition-colors ">{skill.name}</span>
                </div>
              ))}
            </div> 
          </div>
        </div>
      </div>
      
      {/* Smart Scroll Button */}
      <button
        onClick={isNearEnd ? scrollToTop : scrollToNext}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-fade-in animation-delay-800 flex flex-col items-center gap-2 px-4 py-3 rounded-lg   hover:text-primary transition-all duration-300 group "
        title={isNearEnd ? "Go to top" : "Scroll to next section"}
      >
        <span className="text-xs uppercase tracking-wider font-semibold text-foreground/70 group-hover:text-primary transition-colors">
          {isNearEnd ? "Go Up" : "Scroll Down"}
        </span>
        <div className="flex flex-col items-center">
          {isNearEnd ? (
            <ChevronUp className="w-5 h-5 animate-bounce group-hover:-translate-y-1 transition-transform" />
          ) : (
            <ChevronDown className="w-5 h-5 animate-bounce group-hover:translate-y-1 transition-transform" />
          )}
        </div>
      </button>
    </section>
  )
}