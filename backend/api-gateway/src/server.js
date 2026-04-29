import express from 'express';
import cors from 'cors';
import { env } from '../../shared/src/config/env.js';

const app = express();

app.use(cors());
app.use(express.json());

const routeMap = [
  { prefix: '/api/auth', target: env.authServiceUrl },
  { prefix: '/api/products', target: env.catalogServiceUrl },
  { prefix: '/api/orders', target: env.catalogServiceUrl },
  { prefix: '/api/dashboard', target: env.catalogServiceUrl },
  { prefix: '/api/messages', target: env.communicationServiceUrl },
  { prefix: '/api/chat', target: env.communicationServiceUrl },
  { prefix: '/api/events', target: env.communicationServiceUrl },
];

const proxyRequest = async (req, res, target) => {
  const response = await fetch(`${target}${req.originalUrl.replace('/api', '')}`, {
    method: req.method,
    headers: {
      'Content-Type': 'application/json',
      authorization: req.headers.authorization || '',
    },
    body: ['GET', 'HEAD'].includes(req.method) ? undefined : JSON.stringify(req.body),
  });

  if (response.status === 204) {
    return res.status(204).send();
  }

  const payload = await response.json();

  if (!response.ok) {
    return res.status(response.status).json(payload);
  }

  return res.status(response.status).json(payload);
};

for (const route of routeMap) {
  app.use(route.prefix, async (req, res) => {
    try {
      await proxyRequest(req, res, route.target);
    } catch (error) {
      console.error(`[api-gateway] proxy error for ${req.originalUrl}`, error);
      res.status(502).json({ message: 'Upstream service unavailable' });
    }
  });
}

app.get('/health', (_req, res) => {
  res.json({ service: 'api-gateway', status: 'ok' });
});

app.listen(env.gatewayPort, () => {
  console.log(`[api-gateway] listening on ${env.gatewayPort}`);
});
