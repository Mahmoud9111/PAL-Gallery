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

              <StickyCols />
              <Horizantal/>
              <Outro />
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
