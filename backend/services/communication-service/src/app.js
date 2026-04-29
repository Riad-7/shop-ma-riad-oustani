import express from 'express';
import cors from 'cors';
import { Message } from './models/Message.js';
import { EventLog } from './models/EventLog.js';
import { requireAuth, requireAdmin } from './middleware/auth.js';
import { publishEvent } from '../../../shared/src/config/rabbitmq.js';
import { buildChatReply } from './utils/chatReply.js';

export const createApp = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/health', (_req, res) => {
    res.json({ service: 'communication-service', status: 'ok' });
  });

  app.post('/messages', async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All contact fields are required' });
    }

    const createdMessage = await Message.create({ name, email, subject, message });

    await publishEvent('communication.message.created', {
      messageId: createdMessage._id.toString(),
      email: createdMessage.email,
      subject: createdMessage.subject,
      at: createdMessage.createdAt,
    });

    return res.status(201).json({ message: createdMessage });
  });

  app.get('/messages', requireAuth, requireAdmin, async (_req, res) => {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json({ messages });
  });

  app.patch('/messages/:id/read', requireAuth, requireAdmin, async (req, res) => {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true },
    );

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    return res.json({ message });
  });

  app.delete('/messages/:id', requireAuth, requireAdmin, async (req, res) => {
    const message = await Message.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    return res.status(204).send();
  });

  app.post('/chat', async (req, res) => {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: 'Message is required' });
    }

    return res.json(buildChatReply(message));
  });

  app.get('/events', requireAuth, requireAdmin, async (_req, res) => {
    const events = await EventLog.find().sort({ createdAt: -1 }).limit(50);
    res.json({ events });
  });

  return app;
};
