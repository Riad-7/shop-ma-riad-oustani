import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate()
    const [products, setProducts] = useState({});

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [id])

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-10">

                    <div className="card shadow-lg border-0 p-4 rounded-4">

                        <div className="row g-4">

                            {/* IMAGE */}
                            <div className="col-md-5 text-center">
                                <img
                                    src={products.image}
                                    alt={products.title}
                                    className="img-fluid rounded-3"
                                    style={{
                                        maxHeight: "420px",
                                        objectFit: "contain"
                                    }}
                                />
                            </div>

                            {/* DETAILS */}
                            <div className="col-md-7">

                                {/* CATEGORY BADGE */}
                                <span className="badge bg-primary mb-3 text-uppercase px-3 py-2">
                                    {products.category}
                                </span>

                                {/* TITLE */}
                                <h2 className="fw-bold mb-3">{products.title}</h2>

                                {/* RATING */}
                                {products.rating && (
                                    <div className="mb-3">
                                        {"★".repeat(Math.round(products.rating.rate))}
                                        {"☆".repeat(5 - Math.round(products.rating.rate))}
                                        <span className="text-muted ms-2">
                                            ({products.rating.count} avis)
                                        </span>
                                    </div>
                                )}

                                {/* DESCRIPTION */}
                                <p className="text-secondary mb-4" style={{ lineHeight: "1.6" }}>
                                    {products.description}
                                </p>

                                {/* PRICE */}
                                <h3 className="fw-bold text-success mb-4">
                                    {products.price} $
                                </h3>

                                {/* BUTTONS */}
                                <div className="d-flex gap-3">
                                    <button className="btn btn-dark px-4" onClick={() => navigate(-1)}>
                                        ← Retour
                                    </button>

                                    <button className="btn btn-warning px-4 fw-semibold">
                                        🛒 Ajouter au panier
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
