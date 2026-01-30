import { useState, useEffect, useRef } from "react"
import { ChevronDown, Info } from "lucide-react"
import { Button } from "../ui/button"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useNavigate } from "react-router-dom"

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: "1",
    number: "01",
    title: "General Engineering Projects",
    location: "U.S.A.",
    tags: ["#CONSTRUCTION", "#ENGINEERING", "#INFRASTRUCTURE"],
    image: "/3.jpg",
  },
  {
    id: "2",
    number: "02",
    title: "Asphalt Specialist",
    location: "U.S.A.",
    tags: ["#ASPHALT", "#ROADS", "#PAVING"],
    image: "/2.jpg",
  },
  {
    id: "3",
    number: "03",
    title: "Electrical & Landscaping",
    location: "U.S.A.",
    tags: ["#ELECTRICAL", "#LANDSCAPING", "#CONSTRUCTION"],
    image: "/1.jpg",
  },
  {
    id: "4",
    number: "03",
    title: "Electrical & Landscaping",
    location: "U.S.A.",
    tags: ["#ELECTRICAL", "#LANDSCAPING", "#CONSTRUCTION"],
    image: "/1.jpg",
  },
]

export default function HomePage() {
  const [selectedIndustry] = useState("ALL")
  const containerRef = useRef(null)
  const scrollTriggerRef = useRef(null)
  const navigate = useNavigate()

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
            id: "homepage-horizontal-scroll",
            onUpdate: (self) => {
              if (!scrollTriggerRef.current) {
                scrollTriggerRef.current = self
              }
            }
          },
        })
        // Get the ScrollTrigger by ID as fallback
        const st = ScrollTrigger.getById("homepage-horizontal-scroll")
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
      const st = ScrollTrigger.getById("homepage-horizontal-scroll")
      if (st) st.kill()
    }
  }, [])

  return (
    <>
      {/* Main Content */}
      <main 
        ref={containerRef}
        className=""
      >
        {/* Horizontal Scroll Section */}
        <section className=" w-[4200px] h-screen flex-shrink-0 flex  bg-white">
          <div className="w-full h-full px-6 flex items-center">
            <div className="flex items-center gap-32 h-full w-full mt-64">

              {/* Left side - Text content */}
              <div className="flex-shrink-0 ml-60 w-96 h-full flex flex-col justify-center">
                {/* Industry Filter */}
                <div className="mb-44">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-sm text-gray-600 hover:text-gray-900 group"
                    onClick={() => {}}
                  >
                    Industry: <span className="ml-2 font-semibold text-gray-900">{selectedIndustry}</span>
                    <ChevronDown className="ml-2 w-4 h-4" />
                  </Button>
                </div>

                {/* Hero Title */}
                <div className="space-y-4">
                  <h2 className="text-[8rem] leading-none font-light tracking-tight text-gray-900">
                    Our
                  </h2>
                  <h2 className="text-[8rem] leading-none font-light tracking-tight text-gray-900">History</h2>
                </div>
              </div>

              {/* Right side - Horizontal Scrolling Cards */}
              <div
                className="flex gap-6 flex-shrink-0"
                style={{ 
                  display: "flex",
                  flexWrap: "nowrap",
                }}
              >
                {projects.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => navigate(`/project/${project.id}`)}
                    className="bg-white border border-gray-300 cursor-pointer transition-all duration-500 hover:border-blue-400 hover:shadow-lg flex-shrink-0 w-[800px]"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-light text-gray-900">N°{project.number}</span>
                        <Info className="w-4 h-4 text-gray-500" />
                      </div>
                      <div className="flex gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs text-gray-600 border border-gray-300 px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Image */}
                    <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>

                    {/* Footer */}
                    <div className="p-6">
                      <h3 className="text-2xl font-light mb-2 text-gray-900">{project.title}</h3>
                      <p className="text-base text-gray-600 tracking-wider">{project.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

