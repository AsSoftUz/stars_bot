import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import Home from './pages/home/home'
import Stars from './pages/stars/stars'
import Premium from './pages/premium/premium'
import Orders from './pages/orders/orders'
import Tranzaction from './pages/tranzaction/tranzaction'
import TopUp from './pages/topup/topup'
import { BrowserRouter, Routes, Route } from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stars" element={<Stars />} />
        <Route path="/premium" element={<Premium />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/topup" element={<TopUp />} />
        <Route path="/tranzaction" element={<Tranzaction />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
