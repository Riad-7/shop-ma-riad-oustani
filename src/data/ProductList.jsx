import React, { useState, useEffect } from 'react'
import products from './Products'
import ProductCard from '../components/ProductCard'

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => { if (!res.ok) throw new Error('Erreur'); return res.json(); })
            .then(data => { setProducts(data); setLoading(false); })
            .catch(err => { setError(err.message); setLoading(false); });
    }, []);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p style={{ color: 'red' }}>Erreur: {error}</p>;

    return (
        <>
            <div className="container my-5">
                <h2 className="mb-4">Nos Produits</h2>

                <div className="row g-4">
                    {products.map((product) => (
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={product.id}>
                            <ProductCard
                                title={product.title}
                                price={product.price}
                                image={product.image}
                                category={product.category}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default ProductList