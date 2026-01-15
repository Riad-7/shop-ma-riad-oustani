import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function ProductDetail() {
    const { id } = useParams()
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [id])

    

    return (
        <>
            <div className="card shadow-sm p-2" style={{ width: "20rem" }}>
                <img
                    src={image}
                    alt={name}
                    className="card-img-top mb-2"
                    style={{ height: "250px", objectFit: "cover" }}
                />

                <div className="card-body">
                    <h5 className="card-title">{name}</h5>

                    <p className="text-muted">{description}</p>

                    <p className="fw-bold mb-1">${price}</p>

                    <p className="text-primary mb-1">
                        Catégorie : <span className="fw-semibold">{category}</span>
                    </p>

                    
                    <p className="mb-3">
                        <span className="text-warning">⭐ {rating}</span> / 5
                    </p>

                    {inStock ? (
                        <span className="badge bg-success mb-2">In Stock</span>
                    ) : (
                        <span className="badge bg-danger mb-2">Out of Stock</span>
                    )}
                </div>
            </div>
        </>
    )
}

export default ProductDetail