import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { Button } from "../ui/button"
import { projects } from "../../data/projects"

export default function ProjectDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const project = projects.find((p) => p.id === id)

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light mb-4">Project not found</h1>
          <Button onClick={() => navigate("/")}>Go Back</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 sticky top-0 bg-white z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <div className="space-y-6">
            <div className="relative w-full aspect-[16/9] overflow-hidden bg-gray-100 rounded-lg">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-8">
            {/* Project Number and Tags */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-light text-gray-900">N°{project.number}</span>
                <div className="flex gap-2 flex-wrap">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-gray-600 border border-gray-300 px-3 py-1.5 rounded bg-white font-normal"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-5xl lg:text-6xl font-light tracking-tight text-gray-900 leading-tight">
              {project.title}
            </h1>

            {/* Location */}
            <p className="text-lg text-gray-600 tracking-wider">{project.location}</p>

            {/* Description */}
            <div className="space-y-4 pt-4 border-t border-gray-200">
              <h2 className="text-2xl font-light text-gray-900">About This Project</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {project.description}
              </p>
            </div>

            {/* Details */}
            <div className="space-y-4 pt-4 border-t border-gray-200">
              <h2 className="text-2xl font-light text-gray-900">Project Details</h2>
              <p className="text-gray-700 leading-relaxed">
                {project.details}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

