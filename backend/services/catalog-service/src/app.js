import express from 'express';
import cors from 'cors';
import { Product } from './models/Product.js';
import { Order } from './models/Order.js';
import { requireAuth, requireAdmin } from './middleware/auth.js';
import { publishEvent } from '../../../shared/src/config/rabbitmq.js';

export const createApp = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/health', (_req, res) => {
    res.json({ service: 'catalog-service', status: 'ok' });
  });

  app.get('/products', async (_req, res) => {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({ products });
  });

  app.get('/products/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.json({ product });
  });

  app.post('/products', requireAuth, requireAdmin, async (req, res) => {
    const product = await Product.create(req.body);
    await publishEvent('product.created', {
      productId: product._id.toString(),
      title: product.title,
      category: product.category,
      at: product.createdAt,
    });
    res.status(201).json({ product });
  });

  app.put('/products/:id', requireAuth, requireAdmin, async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await publishEvent('product.updated', {
      productId: product._id.toString(),
      title: product.title,
      at: new Date().toISOString(),
    });

    return res.json({ product });
  });

  app.delete('/products/:id', requireAuth, requireAdmin, async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await publishEvent('product.deleted', {
      productId: product._id.toString(),
      title: product.title,
      at: new Date().toISOString(),
    });

    return res.status(204).send();
  });

  app.post('/orders', async (req, res) => {
    const { customerName, customerEmail, items, total } = req.body;

    if (!customerName || !customerEmail || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'customer and cart items are required' });
    }

    const order = await Order.create({
      customerName,
      customerEmail,
      items,
      total,
      status: 'pending',
    });

    await publishEvent('order.created', {
      orderId: order._id.toString(),
      total: order.total,
      itemCount: order.items.length,
      customerEmail: order.customerEmail,
      at: order.createdAt,
    });

    return res.status(201).json({ order });
  });

  app.get('/orders', requireAuth, requireAdmin, async (_req, res) => {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ orders });
  });

  app.get('/dashboard/stats', requireAuth, requireAdmin, async (_req, res) => {
    const [totalProducts, orders, recentProducts] = await Promise.all([
      Product.countDocuments(),
      Order.find(),
      Product.find().sort({ createdAt: -1 }).limit(5),
    ]);

    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

    res.json({
      stats: {
        totalProducts,
        totalOrders: orders.length,
        totalRevenue,
      },
      recentProducts,
    });
  });

  return app;
};
