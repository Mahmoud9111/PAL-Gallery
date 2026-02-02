import { HashRouter, Routes, Route } from "react-router-dom"
import MainLayout from './layouts/MainLayout'
import HomePage from './components/HomePage/HomePage'
import ProjectPage from './components/ProjectPage/ProjectPage'
import PreloaderII from './components/Preloader/PreloaderII'
function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={
            <>
              <HomePage />
            </>
          } />
          <Route path="/start" element={<HomePage />} />
          <Route path="/project/:id" element={<ProjectPage />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
