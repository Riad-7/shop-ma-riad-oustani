import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import { User } from './models/User.js';
import { requireAuth } from './middleware/auth.js';
import { signToken } from './utils/token.js';
import { publishEvent } from '../../../shared/src/config/rabbitmq.js';

export const createApp = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/health', (_req, res) => {
    res.json({ service: 'auth-service', status: 'ok' });
  });

  app.post('/auth/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'name, email and password are required' });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: passwordHash,
      role: 'customer',
    });

    await publishEvent('auth.user.registered', {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    });

    return res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  });

  app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = signToken(user);

    await publishEvent('auth.user.logged-in', {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
      at: new Date().toISOString(),
    });

    return res.json({
      accessToken: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  });

  app.get('/auth/me', requireAuth, async (req, res) => {
    const user = await User.findById(req.user.sub).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({ user });
  });

  return app;
};
