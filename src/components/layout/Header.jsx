import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../assets/ana22.jpg";

export default function Header() {
  const panierCount = useSelector((state) => state.cart.items.length);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow py-3 sticky-top">
        <div className="container">
          <Link
            to="/"
            className="navbar-brand d-flex align-items-center fw-bold"
          >
            <img
              src={logo}
              alt="Logo"
              width="40"
              height="40"
              className="rounded-circle me-2 border border-2 border-white"
            />
            <span>
              RIAD<span className="text-warning">SHOP</span>
            </span>
          </Link>

          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 fw-semibold">
              <li className="nav-item px-2">
                <Link className="nav-link active" to="/">
                  Accueil
                </Link>
              </li>
              <li className="nav-item px-2">
                <Link className="nav-link" to="/products">
                  Produits
                </Link>
              </li>
              <li className="nav-item px-2">
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>

            <div className="d-flex align-items-center gap-3">
              <Link
                to="/panier"
                className="btn btn-outline-light position-relative border-0"
                aria-label="Voir le panier"
              >
                <span className="fw-semibold">Panier</span>
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: "0.6rem" }}
                >
                  {panierCount}
                </span>
              </Link>

              <Link
                to="/admin/login"
                className="btn btn-warning text-dark fw-bold px-4 rounded-pill"
              >
                Connexion
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
