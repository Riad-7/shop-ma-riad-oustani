import jwt from 'jsonwebtoken';
import { env } from '../../../../shared/src/config/env.js';

export const requireAuth = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token missing' });
  }

  try {
    const token = header.split(' ')[1];
    req.user = jwt.verify(token, env.jwtSecret);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
