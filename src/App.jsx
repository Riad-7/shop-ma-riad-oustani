import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/layout/Header";
import ProductCard from "./components/products/ProductCard";
import ProductDetail from "./pages/ProductDetail";
import Footer from "./components/layout/Footer";
import { Routes, Route } from "react-router-dom";
import Accueil from "./pages/Accueil";
import ProductList from "./pages/ProductList";
import Panier from "./pages/Panier";
import Contact from "./pages/Contact";
import NotFound from "./components/NotFound";
import { ShopProvider } from "./context/ShopContext";
import AdminLogin from "./admin/pages/AdminLogin";
import AdminLayout from "./admin/components/AdminLayout";
import Dashboard from "./admin/pages/Dashboard";
import ProductListAdmin from "./admin/pages/ProductList";
import ProductForm from "./admin/pages/ProductForm";
import ProtectedRoute from "./admin/components/ProtectedRoute";
import AdminMessages from "./admin/pages/AdminMessages";
const ShopRoutes = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/panier" element={<Panier />} />
        
      </Routes>

      <Footer />
    
    </>
  )
}
function App() {
  return (
    <>
      <ShopProvider>
          <Routes>
            {/* Routes Admin (Layout Séparé) */}
            <Route path="/admin/login" element={<AdminLogin />} />

            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />{" "}
              {/* Redirection implicite vers Dashboard */}
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="products" element={<ProductListAdmin />} />
              <Route path="add-product" element={<ProductForm />} />
              <Route path="edit-product/:id" element={<ProductForm />} />
              {/* NOUVELLE ROUTE de messages recevoires */}
              <Route path="messages" element={<AdminMessages />} />
            </Route>

            {/* Routes Shop (Layout Classique) */}
            <Route path="/*" element={<ShopRoutes />} />
          </Routes>
      </ShopProvider>
    </>
  );
}

export default App;
