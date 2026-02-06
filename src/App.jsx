import { HashRouter, Routes, Route } from "react-router-dom"
import MainLayout from './layouts/MainLayout'
import HomePage from './components/HomePage/HomePage'
import ProjectPage from './components/ProjectPage/ProjectPage'
import PreloaderII from './components/Preloader/PreloaderII'
import DraggableCardsDemo from './components/draggableCards/draggable-cards'
import Footer from './components/footer/footer'
import TextBorderDemo from './components/textBorder/textBorder'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<PreloaderII />} />
          <Route path="/home" element={
            <>
              <HomePage />

            </>
          } />
          <Route path="/project/:id" element={<ProjectPage />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
