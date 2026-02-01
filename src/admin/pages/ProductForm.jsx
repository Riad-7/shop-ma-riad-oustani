import React, { useState, useEffect } from 'react';
import { useShop } from '../../context/ShopContext';
import { useNavigate, useParams } from 'react-router-dom';

const ProductForm = () => {
  const { addProduct, updateProduct, products } = useShop();
  const navigate = useNavigate();
  const { id } = useParams(); // Si ID présent, c'est une modification

  const [formData, setFormData] = useState({
    title: '', price: '', description: '', category: '', image: ''
  });

  useEffect(() => {
    if (id) {
      const productToEdit = products.find(p => p.id == id); // == car id url est string
      if (productToEdit) setFormData(productToEdit);
    }
  }, [id, products]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = { ...formData, price: Number(formData.price) };
    
    if (id) {
      updateProduct(productData);
    } else {
      addProduct(productData);
    }
    navigate('/admin/products');
  };

  return (
    <div style={{maxWidth: '600px', margin: '0 auto', background: 'white', padding: '30px', borderRadius: '8px'}}>
      <h2 className="admin-title">{id ? 'Modifier le Produit' : 'Ajouter un Produit'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="admin-form-group">
          <label>Titre</label>
          <input className="admin-input" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
        </div>
        <div className="admin-form-group">
          <label>Prix</label>
          <input type="number" className="admin-input" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required />
        </div>
        <div className="admin-form-group">
          <label>Catégorie</label>
          <input className="admin-input" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} required />
        </div>
        <div className="admin-form-group">
          <label>URL Image</label>
          <input className="admin-input" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} required />
        </div>
        <div className="admin-form-group">
          <label>Description</label>
          <textarea className="admin-textarea" rows="4" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required />
        </div>
        <button type="submit" className="admin-btn-submit">{id ? 'Mettre à jour' : 'Ajouter'}</button>
      </form>
    </div>
  );
};

export default ProductForm;