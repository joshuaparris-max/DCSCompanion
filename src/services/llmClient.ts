export type AskDcsOptions = {
  question: string;
  kbContext?: string;
};

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = 'llama-3.3-70b-versatile'; // Updated to your Groq-supported model

export async function askDcsLLM(opts: AskDcsOptions): Promise<string> {
  if (!GROQ_API_KEY) {
    return 'LLM is not configured yet. Please set VITE_GROQ_API_KEY in your .env file.';
  }
  const messages = [
    {
      role: 'system',
      content:
        'You are a helpful assistant for Dubbo Christian School. Use the following DCS context if relevant, and say “I’m not sure” if you don’t know.\n' +
        (opts.kbContext ? `DCS Context:\n${opts.kbContext}` : ''),
    },
    { role: 'user', content: opts.question },
  ];
  try {
    const res = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        max_tokens: 512,
        temperature: 0.2,
        stream: false,
      }),
    });
    if (!res.ok) {
      let errorMsg = `LLM API error: ${res.status} ${res.statusText}`;
      try {
        const errData = await res.json();
        if (errData.error && errData.error.message) {
          errorMsg += `\n${errData.error.message}`;
        }
      } catch {}
      return errorMsg;
    }
    const data = await res.json();
    return data.choices?.[0]?.message?.content || 'No answer from LLM.';
  } catch (err: any) {
    return `LLM request failed: ${err.message || err}`;
  }
}

// Usage:
// 1. Add VITE_GROQ_API_KEY=your-key-here to your .env file.
// 2. Change MODEL or GROQ_API_URL above if needed.
// 3. Call askDcsLLM({ question, kbContext }) from your chat UI.
