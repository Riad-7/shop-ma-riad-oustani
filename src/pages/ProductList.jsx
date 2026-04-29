import React, { useState } from "react";
import ProductCard from "../components/products/ProductCard";
import { useShop } from "../context/ShopContext";

function ProductList() {
  const { products, loading } = useShop();
  const [inputV, setInputV] = useState("");

  if (loading) return <p>Chargement...</p>;

  return (
    <>
      <div className="container my-5">
        <div className="bg-white p-4 rounded-3 shadow-sm mb-5 d-flex flex-column flex-md-row justify-content-between align-items-center">
          <h2 className="fw-bold text-primary m-0 mb-3 mb-md-0">
            <i className="bi bi-grid-fill me-2"></i>Nos Produits
          </h2>

          <div className="input-group" style={{ maxWidth: "400px" }}>
            <span className="input-group-text bg-light border-end-0">🔍</span>
            <input
              type="text"
              className="form-control form-control-lg bg-light border-start-0"
              placeholder="Rechercher un produit..."
              onChange={(e) => setInputV(e.target.value)}
              style={{ fontSize: "1rem" }}
            />
          </div>
        </div>

        <div className="row g-4">
          {products
            .filter((product) => {
              return inputV.toLowerCase() === ""
                ? product
                : product.title.toLowerCase().includes(inputV.toLowerCase());
            })
            .map((product) => (
              <div
                className="col-12 col-sm-6 col-md-4 col-lg-3"
                key={product._id}
              >
                <ProductCard product={product} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default ProductList;
