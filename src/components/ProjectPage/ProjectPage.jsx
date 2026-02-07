import { useParams, useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { projects } from "../../data/projects"
import Hero from "../Hero/Hero"
import Choose from "../Choose/Choose"
import Intro from "../Intro/Intro"
import StickyCols from "../StickyCols/StickyCols"
import Choose2 from "../choose2/Choose2"
import Horizantal from "../horizantalimages/horizantal"
import Outro from "../outro/outro"
import LayoutTextFlipDemo from "../layout-text-flip-demo/layout-text-flip-demo"
import DraggableCardsDemo from '../draggableCards/draggable-cards'
import Footer from '../footer/footer'

export default function ProjectPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const project = projects.find((p) => p.id === id)

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#e8e8e8]">
        <div className="text-center">
          <h1 className="text-2xl font-light mb-4">Project not found</h1>
          <Button onClick={() => navigate("/")}>Go Back</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* All Components with Project Data */}
      <Hero project={project} />
      <Choose project={project} />
      <Intro project={project} />
      <LayoutTextFlipDemo project={project} />
      <StickyCols project={project} />
      <Choose2 project={project} />
      <Horizantal project={project} />
      <DraggableCardsDemo />
      <Footer />
    </div>
  )
}
