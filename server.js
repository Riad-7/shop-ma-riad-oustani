import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { CohereClient } from 'cohere-ai';

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Cohere Setup
const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

// Chat Endpoint
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const response = await cohere.chat({
      message: message,
      preamble: "You are a helpful assistant for an e-commerce shop called 'Shop Ma Riad'. You help customers with their questions about products, orders, and general inquiries. Be polite and concise.",
    });

    const reply = response.text;
    res.json({ reply });
  } catch (error) {
    console.error('Error calling Cohere:', error);
    res.status(500).json({ error: 'Something went wrong processing your request.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
