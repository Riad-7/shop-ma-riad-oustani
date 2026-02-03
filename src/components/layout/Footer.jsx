import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-dark text-white pt-5 pb-4 mt-5">
      <div className="container">
        <div className="row">
          {/* Colonne Marque */}
          <div className="col-md-4 col-lg-4 mb-4">
            <h5 className="text-uppercase fw-bold text-warning mb-3">
              <i className="bi bi-shop me-2"></i>Riad Shop
            </h5>
            <p className="text-white-50 pe-4">
              Votre destination préférée pour les meilleurs produits. Qualité,
              rapidité et service client irréprochable sont nos priorités.
            </p>
          </div>

          {/* Colonne Liens */}
          <div className="col-md-4 col-lg-3 mb-4">
            <h5 className="text-uppercase fw-bold mb-3">Navigation</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link
                  to={"/"}
                  className="text-white-50 text-decoration-none hover-white"
                >
                  <i className="bi bi-chevron-right me-1 small"></i>Accueil
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to={"/products"}
                  className="text-white-50 text-decoration-none hover-white"
                >
                  <i className="bi bi-chevron-right me-1 small"></i>Nos Produits
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to={"/panier"}
                  className="text-white-50 text-decoration-none hover-white"
                >
                  <i className="bi bi-chevron-right me-1 small"></i>Mon Panier
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne Contact */}
          <div className="col-md-4 col-lg-4 mb-4">
            <h5 className="text-uppercase fw-bold mb-3">Contactez-nous</h5>
            <p className="text-white-50 mb-2">
              <i className="bi bi-geo-alt-fill me-2"></i>123 Rue du Commerce,
              Ville
            </p>
            <p className="text-white-50 mb-2">
              <i className="bi bi-envelope-fill me-2"></i>contact@riadshop.com
            </p>
            <p className="text-white-50 mb-2">
              <i className="bi bi-telephone-fill me-2"></i>+212 6 00 00 00 00
            </p>
          </div>
        </div>

        <hr className="mb-4 border-secondary" style={{ opacity: 0.3 }} />

        <div className="row align-items-center">
          <div className="col-md-7 col-lg-8 text-center text-md-start">
            <p className="text-white-50 mb-0">
              © {new Date().getFullYear()}{" "}
              <strong className="text-warning">Riad Shop</strong>. Tous droits
              réservés.
            </p>
          </div>
          <div className="col-md-5 col-lg-4">
            <div className="text-center text-md-end mt-3 mt-md-0">
              {/* Exemple d'icônes sociaux factices */}
              <a
                href="#"
                className="btn btn-outline-light btn-sm rounded-circle me-2"
              >
                <i className="bi bi-facebook"></i>
              </a>
              <a
                href="#"
                className="btn btn-outline-light btn-sm rounded-circle me-2"
              >
                <i className="bi bi-instagram"></i>
              </a>
              <a
                href="#"
                className="btn btn-outline-light btn-sm rounded-circle"
              >
                <i className="bi bi-twitter"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
