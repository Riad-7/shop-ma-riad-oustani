import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { apiRequest } from '../services/api';

const ShopContext = createContext();
const AUTH_STORAGE_KEY = 'shopAdminAuth';

export const ShopProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [orders, setOrders] = useState([]);
  const [dashboardStats, setDashboardStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [adminUser, setAdminUser] = useState(() => {
    const saved = sessionStorage.getItem(AUTH_STORAGE_KEY);
    return saved ? JSON.parse(saved).user : null;
  });
  const [token, setToken] = useState(() => {
    const saved = sessionStorage.getItem(AUTH_STORAGE_KEY);
    return saved ? JSON.parse(saved).token : null;
  });

  const saveAuth = (authPayload) => {
    sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authPayload));
    setAdminUser(authPayload.user);
    setToken(authPayload.token);
  };

  const clearAuth = () => {
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    setAdminUser(null);
    setToken(null);
    setMessages([]);
    setOrders([]);
    setDashboardStats({
      totalProducts: 0,
      totalOrders: 0,
      totalRevenue: 0,
    });
  };

  const loadProducts = useCallback(async () => {
    const data = await apiRequest('/products');
    setProducts(data.products);
    return data.products;
  }, []);

  const loadOrders = useCallback(async (authToken = token) => {
    if (!authToken) {
      return [];
    }

    const data = await apiRequest('/orders', { token: authToken });
    setOrders(data.orders);
    return data.orders;
  }, [token]);

  const loadMessages = useCallback(async (authToken = token) => {
    if (!authToken) {
      return [];
    }

    const data = await apiRequest('/messages', { token: authToken });
    setMessages(data.messages);
    return data.messages;
  }, [token]);

  const loadDashboard = useCallback(async (authToken = token) => {
    if (!authToken) {
      return null;
    }

    const data = await apiRequest('/dashboard/stats', { token: authToken });
    setDashboardStats(data.stats);
    return data;
  }, [token]);

  useEffect(() => {
    const initialize = async () => {
      try {
        await loadProducts();

        if (token) {
          await Promise.all([loadMessages(token), loadOrders(token), loadDashboard(token)]);
        }
      } catch (error) {
        console.error('Initialization failed:', error);
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, [loadDashboard, loadMessages, loadOrders, loadProducts, token]);

  const loginAdmin = async (email, password) => {
    const data = await apiRequest('/auth/login', {
      method: 'POST',
      body: { email, password },
    });

    const authPayload = {
      token: data.accessToken,
      user: data.user,
    };

    saveAuth(authPayload);
    await Promise.all([
      loadMessages(authPayload.token),
      loadOrders(authPayload.token),
      loadDashboard(authPayload.token),
    ]);

    return data.user;
  };

  const logoutAdmin = () => {
    clearAuth();
  };

  const addProduct = async (product) => {
    const data = await apiRequest('/products', {
      method: 'POST',
      token,
      body: product,
    });
    setProducts((current) => [data.product, ...current]);
    await loadDashboard(token);
    return data.product;
  };

  const updateProduct = async (updatedProduct) => {
    const data = await apiRequest(`/products/${updatedProduct._id}`, {
      method: 'PUT',
      token,
      body: updatedProduct,
    });
    setProducts((current) =>
      current.map((product) => (product._id === data.product._id ? data.product : product)),
    );
    await loadDashboard(token);
    return data.product;
  };

  const deleteProduct = async (id) => {
    await apiRequest(`/products/${id}`, {
      method: 'DELETE',
      token,
    });
    setProducts((current) => current.filter((product) => product._id !== id));
    await loadDashboard(token);
  };

  const addOrder = async ({ customerName, customerEmail, items, total }) => {
    const data = await apiRequest('/orders', {
      method: 'POST',
      body: {
        customerName,
        customerEmail,
        items,
        total,
      },
    });

    if (token) {
      await Promise.all([loadOrders(token), loadDashboard(token)]);
    }

    return data.order;
  };

  const sendMessage = async (msgData) => {
    const data = await apiRequest('/messages', {
      method: 'POST',
      body: msgData,
    });

    if (token) {
      await loadMessages(token);
    }

    return data.message;
  };

  const markAsRead = async (id) => {
    const data = await apiRequest(`/messages/${id}/read`, {
      method: 'PATCH',
      token,
    });

    setMessages((current) =>
      current.map((message) => (message._id === id ? data.message : message)),
    );
  };

  const deleteMessage = async (id) => {
    await apiRequest(`/messages/${id}`, {
      method: 'DELETE',
      token,
    });
    setMessages((current) => current.filter((message) => message._id !== id));
  };

  const getStats = () => dashboardStats;

  return (
    <ShopContext.Provider
      value={{
        products,
        messages,
        orders,
        loading,
        token,
        adminUser,
        loginAdmin,
        logoutAdmin,
        addProduct,
        updateProduct,
        deleteProduct,
        addOrder,
        getStats,
        sendMessage,
        markAsRead,
        deleteMessage,
        loadProducts,
        loadDashboard,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);
