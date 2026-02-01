import React from 'react';
import { Navigate } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';

const ProtectedRoute = ({ children }) => {
  const { adminUser } = useShop();
  if (!adminUser) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

export default ProtectedRoute;