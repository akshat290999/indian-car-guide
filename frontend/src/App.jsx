import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'

import TuningBasics from './pages/TuningBasics'
import Platforms from './pages/Platforms'
import TunersAndCosts from './pages/TunersAndCosts'
import PlatformDetail from './pages/PlatformDetail'
import IntlVsIndia from './pages/IntlVsIndia'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/basics" element={<TuningBasics />} />
        <Route path="/platforms" element={<Platforms />} />
        <Route path="/tuners" element={<TunersAndCosts />} />
        <Route path="/platform/:id" element={<PlatformDetail />} />
        <Route path="/intl" element={<IntlVsIndia />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
