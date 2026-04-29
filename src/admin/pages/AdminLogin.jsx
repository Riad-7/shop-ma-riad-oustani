import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import '../styles/admin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { loginAdmin } = useShop();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await loginAdmin(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Email ou mot de passe incorrect');
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Admin Login</h2>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label>Email</label>
            <input type="email" className="admin-input" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="admin-form-group">
            <label>Mot de passe</label>
            <input type="password" className="admin-input" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="admin-btn-submit" style={{ width: '100%' }}>Se connecter</button>
        </form>
        <button onClick={() => navigate('/')} className="admin-back-btn">Retour au Shop</button>
        <p>email : admin@shop.ma</p>
        <p>password : 123456</p>
      </div>
    </div>
  );
};

export default AdminLogin;
