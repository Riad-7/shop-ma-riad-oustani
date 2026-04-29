import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addToCart } from '../features/cart/cartSlice';
import { useDispatch } from 'react-redux';
import { useShop } from '../context/ShopContext';

function ProductDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, loading } = useShop();

  const product = useMemo(
    () => products.find((item) => item._id === id),
    [id, products],
  );

  if (loading) {
    return <div className="container py-5">Chargement...</div>;
  }

  if (!product) {
    return <div className="container py-5">Produit introuvable.</div>;
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card shadow-lg border-0 p-4 rounded-4">
            <div className="row g-4">
              <div className="col-md-5 text-center">
                <img
                  src={product.image}
                  alt={product.title}
                  className="img-fluid rounded-3"
                  style={{
                    maxHeight: "420px",
                    objectFit: "contain",
                  }}
                />
              </div>

              <div className="col-md-7">
                <span className="badge bg-primary mb-3 text-uppercase px-3 py-2">
                  {product.category}
                </span>

                <h2 className="fw-bold mb-3">{product.title}</h2>

                {product.rating && (
                  <div className="mb-3">
                    {"★".repeat(Math.round(product.rating.rate))}
                    {"☆".repeat(5 - Math.round(product.rating.rate))}
                    <span className="text-muted ms-2">
                      ({product.rating.count} avis)
                    </span>
                  </div>
                )}

                <p className="text-secondary mb-4" style={{ lineHeight: "1.6" }}>
                  {product.description}
                </p>

                <h3 className="fw-bold text-success mb-4">
                  {product.price} DH
                </h3>

                <div className="d-flex gap-3">
                  <button className="btn btn-dark px-4" onClick={() => navigate(-1)}>
                    Retour
                  </button>

                  <button
                    className="btn btn-warning px-4 fw-semibold"
                    onClick={() => dispatch(addToCart(product))}
                  >
                    Ajouter au panier
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
