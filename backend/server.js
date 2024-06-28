// server.js
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import { chatWithClaude } from './claudeService.js';
import multer from 'multer';
import { processImage } from './imageProcessor.js';

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the chat app API' });
});

app.post('/api/messages', (req, res) => {
  const { messages } = req.body;
  console.log('Received messages:', messages);
  res.json({ status: 'Messages received successfully' });
});

app.post('/api/chat-with-claude', upload.array('images'), async (req, res, next) => {
  try {
    let messages = JSON.parse(req.body.messages);
    const settings = JSON.parse(req.body.settings);
    const systemPrompt = req.body.systemPrompt;
    const files = req.files || [];

    const processedImages = await Promise.all(files.map(processImage));

    if (processedImages.length > 0) {
      const lastUserMessage = messages[messages.length - 1];
      lastUserMessage.content = [...lastUserMessage.content, ...processedImages];
    }

    messages = messages.map(({ role, content }) => ({ role, content }));

    const response = await chatWithClaude(messages, settings, systemPrompt);

    // Send the full response back to the frontend
    res.json(response);
  } catch (error) {
    console.error('Error in chat with Claude:', error);
    res.status(500).json({ error: 'Error processing request' });
  }
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});