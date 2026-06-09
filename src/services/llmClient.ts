export type AskDcsOptions = {
  question: string;
  kbContext?: string;
};

// Groq API endpoint
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

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
  if (!GROQ_API_KEY) {
    return 'LLM service not configured. Please set VITE_GROQ_API_KEY environment variable.';
  }

  if (userId) {
    const status = isRateLimited(userId);
    if (status.limited) return `Rate limit: ${status.remaining} questions left today. Resets at ${status.resetIn}.`;
    const data = getRateLimitData(userId);
    updateRateLimit(userId, { ...data, count: data.count + 1 });
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    // System prompt for DCS knowledge base assistant
    const systemPrompt = opts.kbContext
      ? `You are a helpful DCS (Dundee Community School) assistant. Use the following knowledge base context to answer questions:\n\n${opts.kbContext}\n\nIf the answer is not in the knowledge base, provide helpful general information.`
      : 'You are a helpful DCS (Dundee Community School) assistant.';

    const res = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: opts.question },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    if (!res.ok) {
      const error = await res.text();
      console.error('Groq API error:', error);
      return `LLM API error: ${res.status} ${res.statusText}`;
    }
    
    const data = await res.json();
    return data.choices?.[0]?.message?.content || 'No answer from LLM.';
  } catch (err: any) {
    if (err.name === 'AbortError') return 'LLM request timed out. Please try again.';
    console.error('LLM error:', err);
    return `LLM request failed: ${err.message || err}`;
  }
}

// Usage:
// 1. Set VITE_GROQ_API_KEY in .env.local (dev) or GitHub Secrets (production)
// 2. Call askDcsLLM({ question, kbContext }, userId) from your chat UI
// 3. Rate limiting: 10 questions per user per day via localStorage
// 4. API key is sent securely only to Groq API (uses HTTPS)
