import amqp from 'amqplib';
import { env } from './env.js';

let connectionPromise;

const createConnection = async () => {
  const connection = await amqp.connect(env.rabbitMqUrl);

  connection.on('close', () => {
    connectionPromise = undefined;
  });

  connection.on('error', () => {
    connectionPromise = undefined;
  });

  return connection;
};

const getConnection = async () => {
  if (!connectionPromise) {
    connectionPromise = createConnection().catch((error) => {
      connectionPromise = undefined;
      throw error;
    });
  }

  return connectionPromise;
};

export const createChannel = async () => {
  const connection = await getConnection();
  const channel = await connection.createChannel();
  await channel.assertExchange(env.rabbitMqExchange, 'topic', { durable: true });
  return channel;
};

export const publishEvent = async (routingKey, payload) => {
  const channel = await createChannel();
  channel.publish(
    env.rabbitMqExchange,
    routingKey,
    Buffer.from(JSON.stringify(payload)),
    { persistent: true },
  );
};

export const consumeEvents = async ({ queue, patterns, onMessage }) => {
  const channel = await createChannel();
  await channel.assertQueue(queue, { durable: true });

  for (const pattern of patterns) {
    await channel.bindQueue(queue, env.rabbitMqExchange, pattern);
  }

  await channel.consume(queue, async (message) => {
    if (!message) {
      return;
    }

    try {
      const content = JSON.parse(message.content.toString());
      await onMessage(content, message.fields.routingKey);
      channel.ack(message);
    } catch (error) {
      console.error(`[rabbitmq] consumer failed for ${message.fields.routingKey}`, error);
      channel.nack(message, false, false);
    }
  });
};
