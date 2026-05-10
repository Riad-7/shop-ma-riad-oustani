import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useShop } from "../../context/ShopContext";
import "../styles/admin.css";

const AdminLayout = () => {
  const { logoutAdmin } = useShop();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAdmin();
    navigate("/admin/login");
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2>Shop.ma Admin</h2>
        <nav className="admin-nav">
          <NavLink
          
            to="/admin/dashboard"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/products"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Produits
          </NavLink>
          <NavLink
            to="/admin/add-product"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Ajouter Produit
          </NavLink>
          <NavLink
            to="/admin/messages"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Messages Clients
          </NavLink>
        </nav>
        <button onClick={handleLogout} className="admin-logout">
          Déconnexion
        </button>
      </aside>
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
