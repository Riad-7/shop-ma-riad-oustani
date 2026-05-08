import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '../../../.env');
const localEnvPath = path.resolve(__dirname, '../../../.env.local');

dotenv.config({
  path: envPath,
});

dotenv.config({
  path: localEnvPath,
  override: true,
});

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'super-secret-jwt-key',
  rabbitMqUrl: process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672',
  rabbitMqExchange: process.env.RABBITMQ_EXCHANGE || 'shop.events',
  mongoAuthUri: process.env.MONGO_AUTH_URI || 'mongodb://localhost:27017/shop_auth',
  mongoCatalogUri: process.env.MONGO_CATALOG_URI || 'mongodb://localhost:27017/shop_catalog',
  mongoCommUri: process.env.MONGO_COMM_URI || 'mongodb://localhost:27017/shop_communication',
  adminName: process.env.ADMIN_NAME || 'Shop Admin',
  adminEmail: process.env.ADMIN_EMAIL || 'admin@shop.ma',
  adminPassword: process.env.ADMIN_PASSWORD || '123456',
  authServicePort: Number(process.env.AUTH_SERVICE_PORT || 4001),
  catalogServicePort: Number(process.env.CATALOG_SERVICE_PORT || 4002),
  communicationServicePort: Number(process.env.COMMUNICATION_SERVICE_PORT || 4003),
  gatewayPort: Number(process.env.GATEWAY_PORT || 8080),
  authServiceUrl: process.env.AUTH_SERVICE_URL || 'http://localhost:4001',
  catalogServiceUrl: process.env.CATALOG_SERVICE_URL || 'http://localhost:4002',
  communicationServiceUrl: process.env.COMMUNICATION_SERVICE_URL || 'http://localhost:4003',
};
