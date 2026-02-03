import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addToCart } from "../../features/cart/cartSlice";

export default function ProductCard({ product }) {
  const shortTitle = product.title.slice(0, 30) + " ...";
  const { id } = useParams();
  const dispatch = useDispatch();
  return (
    <>
      <div
        className="card h-100 border-0 shadow-sm"
        style={{ borderRadius: "16px", transition: "all 0.3s ease" }}
      >
        {/* Zone Image avec padding */}
        <div
          className="d-flex align-items-center justify-content-center p-4"
          style={{
            height: "220px",
            background: "#f8f9fa",
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
          }}
        >
          <img
            src={product.image}
            alt={product.title}
            className="img-fluid"
            style={{
              maxHeight: "100%",
              maxWidth: "100%",
              objectFit: "contain",
              mixBlendMode: "multiply",
            }}
          />
        </div>

        <div className="card-body d-flex flex-column text-center pt-4">
          {/* Catégorie discrète */}
          <div
            className="text-uppercase text-muted small mb-2"
            style={{ fontSize: "0.75rem", letterSpacing: "1px" }}
          >
            {product.category}
          </div>

          {/* Titre */}
          <h5 className="card-title fw-bold text-dark text-truncate mb-2">
            {shortTitle}
          </h5>

          {/* Prix */}
          <h4 className="fw-bold text-primary mb-3">${product.price}</h4>

          {/* Boutons (poussés vers le bas grâce au margin-top-auto) */}
          <div className="mt-auto d-grid gap-2">
            <button
              className="btn btn-dark rounded-pill py-2"
              onClick={() => dispatch(addToCart(product))}
            >
              Ajouter au panier
            </button>
            <Link
              to={`/products/${product.id}`}
              className="btn btn-outline-secondary rounded-pill py-2 btn-sm border-0"
            >
              Voir les détails
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
