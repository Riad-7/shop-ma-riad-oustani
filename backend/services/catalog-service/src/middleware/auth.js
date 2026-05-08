import jwt from 'jsonwebtoken';
import { env } from '../../../../shared/src/config/env.js';

export const requireAuth = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token missing' });
  }

  try {
    req.user = jwt.verify(header.split(' ')[1], env.jwtSecret);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export const requireAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }

  next();
};
