export type AskDcsOptions = {
  question: string;
  kbContext?: string;
};

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = 'llama-3.3-70b-versatile'; // Updated to your Groq-supported model

// Rate limiting: max 10 questions per user per day
const QUESTIONS_PER_DAY = 10;
const RATE_LIMIT_WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours

interface RateLimitData {
  count: number;
  resetTime: number;
}

function getRateLimitData(userId: string): RateLimitData {
  const key = `llm_rate_limit_${userId}`;
  const stored = localStorage.getItem(key);
  if (!stored) return { count: 0, resetTime: Date.now() + RATE_LIMIT_WINDOW_MS };
  const data = JSON.parse(stored);
  if (Date.now() > data.resetTime) return { count: 0, resetTime: Date.now() + RATE_LIMIT_WINDOW_MS };
  return data;
}

function updateRateLimit(userId: string, data: RateLimitData): void {
  localStorage.setItem(`llm_rate_limit_${userId}`, JSON.stringify(data));
}

function isRateLimited(userId: string): { limited: boolean; remaining: number; resetIn: string } {
  const data = getRateLimitData(userId);
  const remaining = Math.max(0, QUESTIONS_PER_DAY - data.count);
  return { limited: data.count >= QUESTIONS_PER_DAY, remaining, resetIn: new Date(data.resetTime).toLocaleTimeString() };
}
export async function askDcsLLM(opts: AskDcsOptions, userId?: string): Promise<string> {
  if (userId) {
    const status = isRateLimited(userId);
    if (status.limited) return `Rate limit: ${status.remaining} questions left today.`;
    const data = getRateLimitData(userId);
    updateRateLimit(userId, { ...data, count: data.count + 1 });
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
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
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
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
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
// 1. Add VITE_GROQ_API_KEY=your-key-here to your .env.local file.
// 2. Call askDcsLLM({ question, kbContext }, userId) from your chat UI.
// 3. Rate limiting: 10 questions per user per day via localStorage.
