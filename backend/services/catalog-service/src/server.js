import { createApp } from './app.js';
import { connectDatabase } from '../../../shared/src/config/database.js';
import { env } from '../../../shared/src/config/env.js';
import { Product } from './models/Product.js';
import { seedProducts } from './data/seedProducts.js';

const seedIfNeeded = async () => {
  const count = await Product.countDocuments();
  if (count > 0) {
    return;
  }

  await Product.insertMany(seedProducts);
  console.log('[catalog-service] seed products inserted');
};

const start = async () => {
  await connectDatabase(env.mongoCatalogUri, 'catalog-service');
  await seedIfNeeded();

  const app = createApp();
  app.listen(env.catalogServicePort, () => {
    console.log(`[catalog-service] listening on ${env.catalogServicePort}`);
  });
};

start().catch((error) => {
  console.error('[catalog-service] startup failed', error);
  process.exit(1);
});
