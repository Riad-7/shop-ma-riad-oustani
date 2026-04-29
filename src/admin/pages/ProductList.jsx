import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { formatPrice } from '../../utils/formatPrice';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const { products, deleteProduct } = useShop();
  const navigate = useNavigate();
  const [filterCat, setFilterCat] = useState('all');
  const [filterPrice, setFilterPrice] = useState('all');

  const categories = ['all', ...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter((p) => {
    const matchCat = filterCat === 'all' || p.category === filterCat;
    let matchPrice = true;
    if (filterPrice === 'low') matchPrice = p.price < 500;
    if (filterPrice === 'mid') matchPrice = p.price >= 500 && p.price < 1500;
    if (filterPrice === 'high') matchPrice = p.price >= 1500;
    return matchCat && matchPrice;
  });

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">Gestion des Produits</h1>
        <button className="admin-btn-submit" onClick={() => navigate('/admin/add-product')}>+ Nouveau Produit</button>
      </div>

      <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', background: 'white', padding: '15px', borderRadius: '8px' }}>
        <select onChange={(e) => setFilterCat(e.target.value)} className="admin-select">
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select onChange={(e) => setFilterPrice(e.target.value)} className="admin-select">
          <option value="all">Tous les prix</option>
          <option value="low">Moins de 500 DH</option>
          <option value="mid">500 - 1500 DH</option>
          <option value="high">Plus de 1500 DH</option>
        </select>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Titre</th>
            <th>Prix</th>
            <th>Categorie</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((p) => (
            <tr key={p._id}>
              <td><img src={p.image} alt="" style={{ width: '40px', height: '40px', objectFit: 'contain' }} /></td>
              <td>{p.title}</td>
              <td>{formatPrice(p.price)}</td>
              <td>{p.category}</td>
              <td>
                <button onClick={() => navigate(`/admin/edit-product/${p._id}`)} className="admin-btn-edit">Modifier</button>
                <button onClick={() => { if (window.confirm('Supprimer ?')) deleteProduct(p._id); }} className="admin-btn-delete">Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
