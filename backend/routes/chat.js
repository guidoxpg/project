import express from 'express';
import { callClaudeAPI } from '../services/claudeService.js';

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const { message, model, conversationHistory = [], temperature, pValue, kValue, maxLength } = req.body;

    console.log("Received conversation history:", conversationHistory);

    const requestPayload = {
      model: model || 'claude-3-5-sonnet-20240620',
      messages: conversationHistory,
      max_tokens: maxLength,
      temperature: temperature,
      top_p: pValue,
      top_k: kValue,
    };

    console.log("Request Payload:", requestPayload);

    const assistantReply = await callClaudeAPI(requestPayload);

    res.json({ reply: assistantReply, model: model || 'claude-3-5-sonnet-20240620' });
  } catch (error) {
    console.error('Error in chat route:', error.message);
    next(error);  // Pass error to the error handling middleware
  }
});

export default router;
