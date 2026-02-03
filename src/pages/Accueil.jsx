import React from "react";
import "../components/accueil.css";
import { Link } from "react-router-dom";
function Accueil() {
  return (
    <>
      <div className="container-fluid bg-light py-5 h-100 d-flex align-items-center justify-content-center">
        <div
          className="card shadow-lg border-0 p-5 rounded-3"
          style={{ maxWidth: "800px" }}
        >
          <div className="card-body text-center">
            <h1 className="display-5 fw-bold text-dark mb-3">
              Bienvenue sur Notre Boutique
            </h1>
            <div
              className="mx-auto mb-4 bg-primary"
              style={{ height: "4px", width: "60px" }}
            ></div>
            <p className="lead text-secondary mb-4">
              Une sélection unique de produits de qualité à des prix
              imbattables. Faites votre choix dès maintenant.
            </p>
            <Link
              to={"/products"}
              className="btn btn-primary btn-lg px-5 rounded-1"
            >
              Explorer la boutique
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Accueil;
