import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'

import TuningBasics from './pages/TuningBasics'
import Platforms from './pages/Platforms'
import TunersAndCosts from './pages/TunersAndCosts'
import PlatformDetail from './pages/PlatformDetail'
import IntlVsIndia from './pages/IntlVsIndia'
import BuildPlanner from './pages/BuildPlanner'

function AppContent() {
  const location = useLocation()

  // Scroll to top on every route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <>
      <Navbar />
      {/* 
        The key attribute forces React to remount this div on every route change,
        which re-triggers the .page-transition CSS animation.
      */}
      <div key={location.pathname} className="page-transition">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/basics" element={<TuningBasics />} />
          <Route path="/platforms" element={<Platforms />} />
          <Route path="/tuners" element={<TunersAndCosts />} />
          <Route path="/platform/:id" element={<PlatformDetail />} />
          <Route path="/intl" element={<IntlVsIndia />} />
          <Route path="/build" element={<BuildPlanner />} />
        </Routes>
      </div>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
