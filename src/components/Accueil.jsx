import React from 'react'
import './accueil.css'
import { Link } from 'react-router-dom'
function Accueil() {
  return (
    <>
      <div className="container-fluid bg-ligth py-5 h-100 ">
        <div className="row justify-content-center text-center hero">
          <div className="col-md-8">
            <h1 className="display-4 fw-bold">
              Bienvenue sur Notre Boutique
            </h1>
            <p className="lead text-muted">
              Découvrez nos meilleurs produits aux meilleurs prix.
            </p>
            <Link to={'/products'} className="btn btn-primary btn-lg mt-3 px-4">
              Voir nos produits
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Accueil