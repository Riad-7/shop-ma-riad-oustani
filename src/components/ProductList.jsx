import React, { useState, useEffect } from 'react'
import ProductCard from './ProductCard'

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [inputV, setInputV] = useState('');

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
                <div className="d-flex justify-content-between mb-4">
                    <h2 className="mb-4">Nos Produits</h2>
                    <input type="text" className="form-control-lg mb-4" placeholder="Rechercher un produit..." onChange={(e) => {setInputV(e.target.value)}}/>               
                </div>
                <div className="row g-4">
                    {products.filter((product) => {
                        return inputV.toLowerCase() === '' ? product : product.title.toLowerCase().includes(inputV.toLowerCase())
                    }).map((product) => (
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={product.id}>
                            <ProductCard
                                product={product}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default ProductList