import React, { createContext, useState, useEffect, useContext } from 'react';

const ShopContext = createContext();



export const ShopProvider = ({ children }) => {

    // --- 1. GESTION DES MESSAGES ---
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('shopMessages');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('shopMessages', JSON.stringify(messages));
  }, [messages]);

  // Fonction appelée par la page Contact
  const sendMessage = (msgData) => {
    const newMessage = {
      id: Date.now(),
      date: new Date().toISOString(),
      isRead: false, // Pour savoir si l'admin l'a lu
      ...msgData
    };
    setMessages([newMessage, ...messages]); // Le plus récent en premier
  };

  // Fonction pour l'Admin (Marquer comme lu / Supprimer)
  const markAsRead = (id) => {
    setMessages(messages.map(m => m.id === id ? { ...m, isRead: true } : m));
  };

  const deleteMessage = (id) => {
    setMessages(messages.filter(m => m.id !== id));
  };


  // --- Gestion des Produits ---
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Charger les produits (API + LocalStorage pour les modifs)
  useEffect(() => {
    const fetchProducts = async () => {
      const localProducts = localStorage.getItem('shopProducts');
      
      if (localProducts) {
        setProducts(JSON.parse(localProducts));
        setLoading(false);
      } else {
        try {
          const res = await fetch("https://fakestoreapi.com/products");
          const data = await res.json();
          setProducts(data);
          localStorage.setItem('shopProducts', JSON.stringify(data));
        } catch (error) {
          console.error("Erreur fetch:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchProducts();
  }, []);

  // Sauvegarder dans LocalStorage à chaque modif
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('shopProducts', JSON.stringify(products));
    }
  }, [products]);

  // --- Gestion des Commandes (Admin Stats) ---
  const [orders, setOrders] = useState(() => {
    return JSON.parse(localStorage.getItem('shopOrders')) || [];
  });

  useEffect(() => {
    localStorage.setItem('shopOrders', JSON.stringify(orders));
  }, [orders]);

  // --- Gestion de l'Authentification Admin ---
  const [adminUser, setAdminUser] = useState(() => {
    return sessionStorage.getItem('adminUser') ? JSON.parse(sessionStorage.getItem('adminUser')) : null;
  });

  const loginAdmin = (email, password) => {
    // Identifiants hardcodés pour la démo
    if (email === "admin@shop.ma" && password === "123456") {
      const user = { email, role: 'admin' };
      setAdminUser(user);
      sessionStorage.setItem('adminUser', JSON.stringify(user));
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setAdminUser(null);
    sessionStorage.removeItem('adminUser');
  };

  // --- Actions Admin (CRUD & Orders) ---
  const addProduct = (product) => {
    const newProduct = { ...product, id: Date.now(), rating: { rate: 0, count: 0 } };
    setProducts([newProduct, ...products]); // Ajout en haut de liste
  };

  const updateProduct = (updatedProduct) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const addOrder = (totalAmount) => {
    const newOrder = {
      id: Date.now(),
      date: new Date().toISOString(),
      total: totalAmount
    };
    setOrders([...orders, newOrder]);
  };

  // Stats pour le Dashboard
  const getStats = () => {
    const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
    return {
      totalProducts: products.length,
      totalOrders: orders.length,
      totalRevenue
    };
  };

  return (
    <ShopContext.Provider value={{
      products, loading,
      adminUser, loginAdmin, logoutAdmin,
      addProduct, updateProduct, deleteProduct,
      addOrder, getStats, orders,
      messages, sendMessage, markAsRead, deleteMessage
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);