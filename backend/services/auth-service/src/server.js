import bcrypt from 'bcryptjs';
import { createApp } from './app.js';
import { connectDatabase } from '../../../shared/src/config/database.js';
import { env } from '../../../shared/src/config/env.js';
import { User } from './models/User.js';

const bootstrapAdmin = async () => {
  const existingAdmin = await User.findOne({ email: env.adminEmail });
  if (existingAdmin) {
    return;
  }

  const passwordHash = await bcrypt.hash(env.adminPassword, 10);
  await User.create({
    name: env.adminName,
    email: env.adminEmail,
    password: passwordHash,
    role: 'admin',
  });

  console.log('[auth-service] default admin created');
};

const start = async () => {
  await connectDatabase(env.mongoAuthUri, 'auth-service');
  await bootstrapAdmin();

  const app = createApp();
  app.listen(env.authServicePort, () => {
    console.log(`[auth-service] listening on ${env.authServicePort}`);
  });
};

start().catch((error) => {
  console.error('[auth-service] startup failed', error);
  process.exit(1);
});
