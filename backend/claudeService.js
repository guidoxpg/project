// claudeService.js
import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';
import { extractShipmentDataTool } from './tools/extractShipmentDataTool.js';

dotenv.config();

const apiKey = process.env.ANTHROPIC_API_KEY;
if (!apiKey) {
  throw new Error('ANTHROPIC_API_KEY is not set');
}

const anthropic = new Anthropic({
  apiKey: apiKey,
});

export async function chatWithClaude(messages, settings, systemPrompt) {
  try {
    const sanitizedMessages = messages.map(({ role, content }) => ({ role, content }));
    const systemPromptContent = systemPrompt ? [{ type: 'text', text: systemPrompt }] : undefined;

    const apiParams = {
      model: settings.model.value,
      temperature: settings.temperature.value,
      top_p: settings.pValue.value,
      top_k: settings.kValue.value,
      max_tokens: settings.maxLength.value,
      messages: sanitizedMessages,
      system: systemPromptContent,
      //tools: [extractShipmentDataTool], // Add the new tool here
      ///tool_choice: { type: "tool",  name: "extract_shipment_data" }

    };

    console.log('API Parameters:', apiParams);

    const response = await anthropic.messages.create(apiParams);

    console.log('Response:', response);

    return response;
  } catch (error) {
    console.error('Error calling Claude API:', error);
    throw new Error('Failed to get response from Claude');
  }
}