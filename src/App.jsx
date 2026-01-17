import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import ProductCard from './components/ProductCard'
import ProductDetail from './components/ProductDetail'
import Footer from './components/Footer'
import { Routes, Route } from 'react-router-dom'
import Accueil from './components/Accueil'
import ProductList from './components/ProductList'
import Panier from './components/Panier'
import Contact from './components/Contact'
import NotFound from './components/NotFound'

function App() {

  return (
    <>

      <Header />
      <Routes>
        <Route path='/' element={<Accueil />} />
        <Route path='/products' element={<ProductList />} />
        <Route path='/panier' element={<Panier />} />
        <Route path='/contact' element={<Contact />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path='*' element={<NotFound />} />



      </Routes>
      
      <Footer />

    </>
  )
}

export default App
