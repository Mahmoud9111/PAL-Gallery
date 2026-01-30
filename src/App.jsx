import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainLayout from './layouts/MainLayout'
import HomePage from './components/HomePage/HomePage'
import Hero from './components/Hero/Hero'
import Welcome from './components/Welcome/Welcome'
import Choose from './components/Choose/Choose'
import StickyCols from './components/StickyCols/StickyCols'
import ProjectDetail from './components/projectDetail/ProjectDetail'
import Intro from './components/Intro/Intro'
import Horizantal from './components/horizantalimages/horizantal'
import Outro from './components/outro/outro'
import LayoutTextFlipDemo from './components/layout-text-flip-demo/layout-text-flip-demo'
import Choose2 from './components/choose2/Choose2'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={
            <>
              <HomePage />
              <Hero />
              <Choose />
              <Intro/>
              <LayoutTextFlipDemo/>
              <StickyCols />
              <Choose2 />
              <Horizantal/>
            </>
          } />
          <Route path="/start" element={<HomePage />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
