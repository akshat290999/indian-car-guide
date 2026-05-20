import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import BrandSearch from './pages/BrandSearch'
import Calculator from './pages/Calculator'
import CarDetail from './pages/CarDetail'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<BrandSearch />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/car/:modelName" element={<CarDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
