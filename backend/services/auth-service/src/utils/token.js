import jwt from 'jsonwebtoken';
import { env } from '../../../../shared/src/config/env.js';

export const signToken = (user) =>
  jwt.sign(
    {
      sub: user._id.toString(),
      email: user.email,
      role: user.role,
      name: user.name,
    },
    env.jwtSecret,
    { expiresIn: '1d' },
  );
