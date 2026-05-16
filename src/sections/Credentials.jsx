import { ChevronRight, ChevronLeft, X, ZoomIn, ZoomOut, RotateCcw } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const credentials = [
  {
    id: "transcript",
    title: "Bachelor of Science (BSc) in Software Engineering",
    institution: "Sri Lanka Technological Campus",
    type: "Transcript",
    date: "2021 - 2025",
    description: "This official academic transcript highlights my GPA and coursework in Software Engineering, through which I earned Second Upper Class Honours.",
    images: ["Credentials_Resourses/transcript1.jpg", "Credentials_Resourses/transcript2.jpg"],
  },
  {
    id: "drs-appreciation",
    title: "DRS project appreciation letter",
    institution: "Sri Lanka Telecom (SLT)",
    type: "Appreciation Letter",
    date: "2025",
    description: "I received an appreciation letter from Sri Lanka Telecom (SLT) for my contributions to the Debt Recovery System project, recognizing my dedication and impact on the project’s success.",
    images: ["Credentials_Resourses/SLT_appreciation_letter.jpg"],
  },
  {
    id: "degree-cert",
    title: "SLTC Degree Certification",
    institution: "Sri Lanka Technological Campus",
    type: "Certification",
    date: "2025",
    description: "This official degree certificate from Sri Lanka Technological Campus confirms the successful completion of my Bachelor of Science (BSc) in Software Engineering, awarded with Second Upper Class Honours.",
    images: ["Credentials_Resourses/degree_certificate.jpg"],
  },
]

export const Credentials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedCredential, setSelectedCredential] = useState(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [panX, setPanX] = useState(0)
  const [panY, setPanY] = useState(0)
  const [isPanning, setIsPanning] = useState(false)
  const [panStart, setPanStart] = useState({ x: 0, y: 0 })
  const [showHint, setShowHint] = useState(false)
  const imageRef = useRef(null)
  const containerRef = useRef(null)
  const hintTimeoutRef = useRef(null)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % credentials.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + credentials.length) % credentials.length)
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  // Zoom controls
  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.2, 3))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.2, 1))
  }

  const handleResetZoom = () => {
    setZoom(1)
    setPanX(0)
    setPanY(0)
  }

  // Mouse wheel zoom for desktop
  const handleWheel = (e) => {
    e.preventDefault()
    if (e.deltaY < 0) {
      handleZoomIn()
    } else {
      handleZoomOut()
    }
  }

  // Desktop panning with mouse
  const handleMouseDown = (e) => {
    if (zoom > 1) {
      setIsPanning(true)
      setPanStart({ x: e.clientX - panX, y: e.clientY - panY })
    }
  }

  const handleMouseMove = (e) => {
    if (isPanning && zoom > 1) {
      setPanX(e.clientX - panStart.x)
      setPanY(e.clientY - panStart.y)
    }
  }

  const handleMouseUp = () => {
    setIsPanning(false)
  }

  // Touch events for mobile pinch zoom
  const touchStartDistance = useRef(0)
  const touchStartZoom = useRef(1)
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)

  const handleCarouselTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }

  const handleCarouselTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX
    const touchEndY = e.changedTouches[0].clientY
    const diffX = touchStartX.current - touchEndX
    const diffY = touchStartY.current - touchEndY
    const threshold = 50

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > threshold) {
      if (diffX > 0) {
        nextSlide()
      } else {
        prevSlide()
      }
    }
  }

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0]
      const touch2 = e.touches[1]
      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      )
      touchStartDistance.current = distance
      touchStartZoom.current = zoom
    } else if (e.touches.length === 1 && zoom > 1) {
      setIsPanning(true)
      setPanStart({ x: e.touches[0].clientX - panX, y: e.touches[0].clientY - panY })
    }
  }

  const handleTouchMove = (e) => {
    if (e.touches.length === 2) {
      e.preventDefault()
      const touch1 = e.touches[0]
      const touch2 = e.touches[1]
      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      )
      const scale = distance / touchStartDistance.current
      const newZoom = Math.max(1, Math.min(touchStartZoom.current * scale, 3))
      setZoom(newZoom)
    } else if (e.touches.length === 1 && isPanning && zoom > 1) {
      e.preventDefault()
      setPanX(e.touches[0].clientX - panStart.x)
      setPanY(e.touches[0].clientY - panStart.y)
    }
  }

  const handleTouchEnd = () => {
    setIsPanning(false)
  }

  useEffect(() => {
    if (selectedCredential) {
      handleResetZoom()
      setSelectedImageIndex(0)
      setShowHint(true)
      
      document.body.style.overflow = 'hidden'
      
      if (hintTimeoutRef.current) clearTimeout(hintTimeoutRef.current)
      hintTimeoutRef.current = setTimeout(() => {
        setShowHint(false)
      }, 3000)
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      if (hintTimeoutRef.current) clearTimeout(hintTimeoutRef.current)
      document.body.style.overflow = 'unset'
    }
  }, [selectedCredential])

  const nextImageSide = () => {
    if (selectedCredential && selectedImageIndex < selectedCredential.images.length - 1) {
      setSelectedImageIndex((prev) => prev + 1)
      handleResetZoom()
    }
  }

  const prevImageSide = () => {
    if (selectedImageIndex > 0) {
      setSelectedImageIndex((prev) => prev - 1)
      handleResetZoom()
    }
  }

  return (
    <section id="credentials" className="py-22 relative overflow-hidden">
      {/* bg glows */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-highlight/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 w-full">
        {/* section header */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2, duration: 0.6 } }
          }}
          className="text-center mx-auto max-w-3xl mb-16"
        >
          <motion.span 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="text-secondary-foreground text-sm font-bold tracking-wider uppercase"
          >
            Credentials & Achievements
          </motion.span>
          <motion.h2 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="font-serif italic font-normal text-white text-4xl md:text-5xl mt-4 mb-6 text-secondary-foreground"
          >
            My Academic and Professional
            <span className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-secondary-foreground"> Journey</span>
          </motion.h2>
          <motion.p 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="text-muted-foreground leading-relaxed text-lg"
          >
            Official recognition of my educational achievements and professional certifications.
          </motion.p>
        </motion.div>

        {/* Carousel Container */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-7xl mx-auto px-2 md:px-0" 
          onTouchStart={handleCarouselTouchStart} 
          onTouchEnd={handleCarouselTouchEnd}
        >
          {/* Credential Card */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentIndex}
                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="glass rounded-2xl overflow-hidden p-8 md:p-12 shadow-2xl shadow-primary/10 border border-primary/20 bg-card/60"
              >
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {/* Image */}
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="relative group cursor-pointer" 
                    onClick={() => setSelectedCredential(credentials[currentIndex])}
                  >
                    <div className="relative overflow-hidden rounded-xl aspect-square bg-black shadow-lg">
                      <img
                        src={credentials[currentIndex].images[0]}
                        alt={credentials[currentIndex].title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80" />
                      
                      {/* Click to expand hint */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <motion.div 
                          whileHover={{ scale: 1.1 }}
                          className="text-center"
                        >
                          <div className="bg-primary shadow-[0_0_20px_rgba(32,178,166,0.5)] rounded-full p-4 mb-2 flex justify-center">
                            <ZoomIn className="w-8 h-8 text-primary-foreground" />
                          </div>
                          <p className="text-white text-sm font-semibold tracking-wide drop-shadow-md">Click to view full</p>
                        </motion.div>
                      </div>

                      {/* Multiple sides indicator */}
                      {credentials[currentIndex].images.length > 1 && (
                        <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full shadow-md z-10">
                          {credentials[currentIndex].images.length} Pages
                        </div>
                      )}
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div className="space-y-6">
                    <div className="inline-block">
                      <span className="px-4 py-1.5 bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider rounded-full border border-primary/40 shadow-[0_0_10px_rgba(32,178,166,0.1)]">
                        {credentials[currentIndex].type}
                      </span>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                      {credentials[currentIndex].title}
                    </h3>

                    <h4 className="text-primary font-bold text-xl drop-shadow-sm">
                      {credentials[currentIndex].institution}
                    </h4>

                    <p className="inline-flex items-center px-3 py-1 bg-surface/80 rounded-lg text-muted-foreground text-sm font-semibold">
                      {credentials[currentIndex].date}
                    </p>

                    <p className="text-muted-foreground leading-relaxed text-lg">
                      {credentials[currentIndex].description}
                    </p>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedCredential(credentials[currentIndex])}
                      className="mt-6 px-8 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/80 transition-all font-bold tracking-wide shadow-lg shadow-primary/20 flex items-center gap-2"
                    >
                      <ZoomIn className="w-5 h-5"/>
                      View Full Document
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons for Carousel */}
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: "rgba(32,178,166,0.2)" }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 w-14 h-14 items-center justify-center rounded-full glass hover:text-primary z-10 border border-border/50 shadow-xl"
              aria-label="Previous credential"
            >
              <ChevronLeft className="w-8 h-8" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: "rgba(32,178,166,0.2)" }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 w-14 h-14 items-center justify-center rounded-full glass hover:text-primary z-10 border border-border/50 shadow-xl"
              aria-label="Next credential"
            >
              <ChevronRight className="w-8 h-8" />
            </motion.button>
          </div>

          {/* Dot Navigation */}
          <div className="flex justify-center items-center gap-4 mt-8">
            {credentials.map((cred, index) => (
              <button
                key={cred.id}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? "bg-primary w-4 h-4 shadow-[0_0_10px_rgba(32,178,166,0.5)]"
                    : "bg-surface w-2.5 h-2.5 hover:bg-muted-foreground"
                }`}
                aria-label={`Go to credential ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Modal/Popup for Full Image */}
      <AnimatePresence>
        {selectedCredential && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/95 backdrop-blur-sm" 
            onClick={() => setSelectedCredential(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-auto max-h-[95vh] bg-surface rounded-3xl overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCredential(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 hover:bg-red-500 transition-colors shadow-lg border border-white/20 group"
                aria-label="Close"
              >
                <X className="w-6 h-6 text-white group-hover:text-white" />
              </button>

              {/* Zoom Controls - Desktop */}
              <div className="absolute top-4 left-4 z-20 hidden md:flex gap-2 bg-black/50 backdrop-blur-xl p-2 rounded-xl border border-white/10 shadow-lg">
                <button
                  onClick={handleZoomIn}
                  className="p-2 rounded-lg bg-surface/80 hover:bg-primary hover:text-white text-muted-foreground transition-all duration-300"
                  aria-label="Zoom in"
                  title="Zoom In (scroll wheel)"
                >
                  <ZoomIn className="w-5 h-5" />
                </button>
                <button
                  onClick={handleZoomOut}
                  className="p-2 rounded-lg bg-surface/80 hover:bg-primary hover:text-white text-muted-foreground transition-all duration-300"
                  aria-label="Zoom out"
                  title="Zoom Out (scroll wheel)"
                >
                  <ZoomOut className="w-5 h-5" />
                </button>
                <div className="flex items-center px-4 py-2 text-sm font-bold text-white border-l border-white/20 ml-2">
                  {Math.round(zoom * 100)}%
                </div>
                <button
                  onClick={handleResetZoom}
                  className="p-2 rounded-lg bg-surface/80 hover:bg-primary hover:text-white text-muted-foreground transition-all duration-300"
                  aria-label="Reset zoom"
                  title="Reset"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>

              {/* Multiple Sides Navigation - Top Right */}
              {selectedCredential.images.length > 1 && (
                <div className="absolute top-4 right-16 z-20 flex items-center gap-3 bg-black/50 backdrop-blur-xl px-4 py-2 rounded-xl border border-white/10 shadow-lg">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImageSide();
                    }}
                    disabled={selectedImageIndex === 0}
                    className="p-1.5 rounded-lg bg-surface hover:bg-primary hover:text-white text-foreground transition-colors disabled:opacity-30 disabled:hover:bg-surface disabled:hover:text-foreground disabled:cursor-not-allowed"
                    aria-label="Previous side"
                    title="Previous side"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="text-sm font-bold text-white min-w-[50px] text-center tracking-widest">
                    {selectedImageIndex + 1}/{selectedCredential.images.length}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImageSide();
                    }}
                    disabled={selectedImageIndex === selectedCredential.images.length - 1}
                    className="p-1.5 rounded-lg bg-surface hover:bg-primary hover:text-white text-foreground transition-colors disabled:opacity-30 disabled:hover:bg-surface disabled:hover:text-foreground disabled:cursor-not-allowed"
                    aria-label="Next side"
                    title="Next side"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}

              {/* Mobile Zoom Hint */}
              <AnimatePresence>
                {showHint && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 md:hidden text-xs font-semibold text-white bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-lg"
                  >
                    Pinch to zoom • Drag to pan
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Image Container - scrollable and zoomable */}
              <div
                ref={containerRef}
                className="relative overflow-auto max-h-[95vh] rounded-3xl flex items-center justify-center bg-background/50"
                style={{ touchAction: zoom > 1 ? 'none' : 'auto', cursor: zoom > 1 ? (isPanning ? 'grabbing' : 'grab') : 'default' }}
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <motion.img
                  layoutId={`credential-img-${selectedCredential.id}`}
                  ref={imageRef}
                  src={selectedCredential.images[selectedImageIndex]}
                  alt={`${selectedCredential.title} - Side ${selectedImageIndex + 1}`}
                  className="h-auto max-h-[95vh] w-auto transition-transform duration-200 select-none shadow-2xl"
                  style={{
                    transform: `scale(${zoom}) translate(${panX / zoom}px, ${panY / zoom}px)`,
                  }}
                  draggable={false}
                />
              </div>

              {/* Info Footer */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 pt-20 pointer-events-none">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-1 drop-shadow-md">
                  {selectedCredential.title}
                  {selectedCredential.images.length > 1 && (
                    <span className="text-primary text-sm ml-3 font-semibold px-2 py-0.5 bg-primary/20 rounded border border-primary/30">
                      Page {selectedImageIndex + 1}
                    </span>
                  )}
                </h3>
                <p className="text-secondary-foreground text-sm font-semibold tracking-wide drop-shadow-sm">{selectedCredential.institution}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}