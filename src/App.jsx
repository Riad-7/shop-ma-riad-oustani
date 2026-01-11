import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import ProductCard from './components/ProductCard'
import Footer from './components/Footer'
import products from './data/Products'

function App() {

  return (
    <>
      <Header />
      <div className="container my-5">
        <h2 className="mb-4">Nos Produits</h2>

        <div className="row g-4">
          {products.map((product) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={product.id}>
              <ProductCard
                name={product.name}
                price={product.price}
                image={product.image}
                inStock={product.inStock}
              />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default App
