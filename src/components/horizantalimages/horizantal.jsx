import { useState, useEffect, useRef } from "react"
import { Menu } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: "1",
    number: "01",
    title: "General Engineering Projects",
    location: "U.S.A.",
    tags: ["#CONSTRUCTION", "#ENGINEERING", "#INFRASTRUCTURE"],
    image: "/4.jpg",
    description: "Comprehensive engineering solutions covering a wide range of construction and infrastructure projects across the United States. Our team specializes in delivering high-quality engineering services that meet the highest standards of safety and efficiency.",
    details: "This project encompasses various engineering disciplines including structural, civil, and mechanical engineering. We've successfully completed numerous projects that have contributed to the nation's infrastructure development."
  },
  {
    id: "2",
    number: "02",
    title: "Asphalt Specialist",
    location: "U.S.A.",
    tags: ["#ASPHALT", "#ROADS", "#PAVING"],
    image: "/5.jpg",
    description: "Expert asphalt paving and road construction services. Our specialized team brings years of experience in creating durable, high-quality road surfaces that withstand the test of time and heavy traffic.",
    details: "We utilize state-of-the-art equipment and premium materials to ensure long-lasting results. Our asphalt projects include highways, parking lots, driveways, and commercial paving solutions."
  },
  {
    id: "3",
    number: "03",
    title: "Electrical & Landscaping",
    location: "U.S.A.",
    tags: ["#ELECTRICAL", "#LANDSCAPING", "#CONSTRUCTION"],
    image: "/6.jpg",
    description: "Integrated electrical and landscaping services that combine functionality with aesthetic appeal. We provide comprehensive solutions for both residential and commercial properties.",
    details: "Our services include electrical installation, maintenance, and upgrades, combined with professional landscaping design and implementation. We create beautiful outdoor spaces that are both functional and visually stunning."
  },
]

const Horizantal = () => {
  const containerRef = useRef(null)
  const scrollTriggerRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const initScrollTrigger = () => {
      const scrollContent = containerRef.current
      if (!scrollContent) return

      // Kill only our own ScrollTrigger if it exists
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill()
        scrollTriggerRef.current = null
      }

      const scrollWidth = scrollContent.scrollWidth
      const windowWidth = window.innerWidth

      if (windowWidth > 768) {
        // Enable horizontal scrolling for larger screens
        gsap.to(scrollContent, {
          x: () => -(scrollWidth - windowWidth),
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: scrollContent,
            start: "top top",
            end: () => "+=" + (scrollWidth - windowWidth),
            scrub: 1.5,
            pin: true,
            id: "horizontal-images-scroll",
            onUpdate: (self) => {
              if (!scrollTriggerRef.current) {
                scrollTriggerRef.current = self
              }
              // Update current index based on scroll progress
              const progress = self.progress
              const newIndex = Math.round(progress * (projects.length - 1))
              setCurrentIndex(newIndex)
            }
          },
        })
        // Get the ScrollTrigger by ID as fallback
        const st = ScrollTrigger.getById("horizontal-images-scroll")
        if (st) scrollTriggerRef.current = st
      } else {
        // For smaller screens, ensure vertical scrolling
        gsap.set(scrollContent, { x: 0 })
      }
    }

    // Initialize on page load
    const timer = setTimeout(() => {
      initScrollTrigger()
    }, 500)

    // Reinitialize on window resize
    window.addEventListener("resize", initScrollTrigger)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("resize", initScrollTrigger)
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill()
        scrollTriggerRef.current = null
      }
      // Also kill by ID as fallback
      const st = ScrollTrigger.getById("horizontal-images-scroll")
      if (st) st.kill()
    }
  }, [])

  return (
    <main 
      ref={containerRef}
      className="relative"
    >
      {/* Horizontal Scroll Section */}
      <section 
        className="flex flex-nowrap h-[100vh] p-4 m-4 gap-4 "
        style={{ width: `${projects.length * 75}vw` }}
      >
        {projects.map((project) => (
          <div
            key={project.id}
            className="relative flex-shrink-0 w-[2200px] h-[98vh] rounded-[6rem] overflow-hidden p-4 "
          >
            {/* Full-bleed Background Image */}
            <div className="absolute inset-0">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              {/* Gradient overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-12 lg:p-16">
              {/* Top Section - Title and Tags */}
              <div className="flex flex-col items-start gap-6 mt-8">
                {/* Difficulty/Tag Badge */}
                <div className="bg-gray-100/90 backdrop-blur-sm rounded-full px-5 py-2.5">
                  <span className="text-gray-900 text-sm font-medium">Easy</span>
                </div>

                {/* Main Title */}
                <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white leading-tight max-w-4xl drop-shadow-lg">
                  {project.title}
                </h1>
              </div>

              {/* Bottom Section - Description and Navigation */}
              <div className="flex items-end justify-between gap-8 flex-wrap">
                {/* Description */}
                <div className="flex-1 min-w-[300px] max-w-2xl">
                  <p className="text-white text-base md:text-lg lg:text-xl leading-relaxed mb-8 drop-shadow-md">
                    {project.description}
                  </p>
                </div>

                {/* Navigation Elements */}
                <div className="flex flex-col items-end gap-4 mb-8">


                  {/* Page Indicators */}
                  <div className="flex items-center gap-2">
                    {projects.map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                          idx === currentIndex
                            ? "bg-gray-100/90 text-gray-900"
                            : "bg-transparent text-white border-2 border-white/50"
                        }`}
                      >
                        <span className="text-sm font-medium">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  )
}

export default Horizantal