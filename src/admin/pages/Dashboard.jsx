import React from 'react';
import { useShop } from '../../context/ShopContext';
import { formatPrice } from '../../utils/formatPrice';

const Dashboard = () => {
  const { products, getStats } = useShop();
  const stats = getStats();
  
  const latestProducts = products.slice(0, 5);

  return (
    <div>
      <h1 className="admin-title">Tableau de Bord</h1>
      
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <h3>Total Produits</h3>
          <p className="admin-stat-number">{stats.totalProducts}</p>
        </div>
        <div className="admin-stat-card">
          <h3>Total Commandes</h3>
          <p className="admin-stat-number">{stats.totalOrders}</p>
        </div>
        <div className="admin-stat-card">
          <h3>Revenu Total</h3>
          <p className="admin-stat-number">{formatPrice(stats.totalRevenue)}</p>
        </div>
      </div>

      <h2 className="admin-title" style={{fontSize: '20px', marginTop: '40px'}}>Derniers 5 produits ajoutés</h2>
      <table className="admin-table" style={{marginTop: '20px'}}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Nom</th>
            <th>Prix</th>
            <th>Catégorie</th>
          </tr>
        </thead>
        <tbody>
          {latestProducts.map(p => (
            <tr key={p.id}>
              <td><img src={p.image} alt="" style={{width: '40px', height: '40px', objectFit: 'contain'}}/></td>
              <td>{p.title.substring(0, 30)}...</td>
              <td>{formatPrice(p.price)}</td>
              <td>{p.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;