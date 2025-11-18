import { defineString } from 'firebase-functions/params';
import * as functions from 'firebase-functions';
import * as cors from 'cors';

const groqApiKey = defineString('GROQ_API_KEY');

const corsHandler = cors({ origin: true });

export const askDcsLLM = functions.https.onRequest((request, response) => {
  corsHandler(request, response, async () => {
    if (request.method !== 'POST') {
      response.status(405).json({ error: 'Method not allowed' });
      return;
    }

    try {
      const { question, kbContext } = request.body;
      
      if (!question) {
        response.status(400).json({ error: 'Question is required' });
        return;
      }

      const messages = [
        {
          role: 'system',
          content:
            'You are a helpful assistant for Dubbo Christian School. Use the following DCS context if relevant, and say "I\'m not sure" if you don\'t know.\n' +
            (kbContext ? `DCS Context:\n${kbContext}` : ''),
        },
        { role: 'user', content: question },
      ];

      const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${groqApiKey.value()}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages,
          max_tokens: 512,
          temperature: 0.2,
          stream: false,
        }),
      });

      if (!groqResponse.ok) {
        const error = await groqResponse.json();
        response.status(groqResponse.status).json({ error: error.error?.message || 'LLM API error' });
        return;
      }

      const data = await groqResponse.json();
      const answer = data.choices?.[0]?.message?.content || 'No answer from LLM.';
      
      response.json({ answer });
    } catch (error: any) {
      functions.logger.error('Error calling Groq API:', error);
      response.status(500).json({ error: error.message || 'Internal server error' });
    }
  });
});
