import { createApp } from './app.js';
import { connectDatabase } from '../../../shared/src/config/database.js';
import { consumeEvents } from '../../../shared/src/config/rabbitmq.js';
import { env } from '../../../shared/src/config/env.js';
import { EventLog } from './models/EventLog.js';

const CONSUMER_RETRY_DELAY_MS = 5000;

const startConsumer = async () => {
  await consumeEvents({
    queue: 'communication-service-events',
    patterns: ['product.*', 'order.*', 'auth.*', 'communication.*'],
    onMessage: async (payload, routingKey) => {
      await EventLog.create({ routingKey, payload });
    },
  });

  console.log('[communication-service] RabbitMQ consumer started');
};

const startConsumerWithRetry = async () => {
  try {
    await startConsumer();
  } catch (error) {
    console.error('[communication-service] RabbitMQ connection failed, retrying...', error);
    setTimeout(startConsumerWithRetry, CONSUMER_RETRY_DELAY_MS);
  }
};

const start = async () => {
  await connectDatabase(env.mongoCommUri, 'communication-service');

  const app = createApp();
  app.listen(env.communicationServicePort, () => {
    console.log(`[communication-service] listening on ${env.communicationServicePort}`);
  });

  void startConsumerWithRetry();
};

start().catch((error) => {
  console.error('[communication-service] startup failed', error);
  process.exit(1);
});
