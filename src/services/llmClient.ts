export type AskDcsOptions = {
  question: string;
  kbContext?: string;
};

// Cloud Function URL - replace YOUR_PROJECT_ID with your actual Firebase project ID
const CLOUD_FUNCTION_URL = 'https://us-central1-REPLACE_WITH_YOUR_PROJECT_ID.cloudfunctions.net/askDcsLLM';

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
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    // Call Firebase Cloud Function (no CORS issues)
    const res = await fetch(CLOUD_FUNCTION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: opts.question,
        kbContext: opts.kbContext,
      }),
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    if (!res.ok) {
      const error = await res.json();
      return `LLM API error: ${error.error || res.statusText}`;
    }
    
    const data = await res.json();
    return data.answer || 'No answer from LLM.';
  } catch (err: any) {
    if (err.name === 'AbortError') return 'LLM request timed out. Please try again.';
    return `LLM request failed: ${err.message || err}`;
  }
}

// Usage:
// 1. Deploy Cloud Function: cd functions && npm run deploy
// 2. Update CLOUD_FUNCTION_URL with your Firebase project ID
// 3. Add VITE_GROQ_API_KEY to Firebase Functions secrets
// 4. Call askDcsLLM({ question, kbContext }, userId) from your chat UI.
// 5. Rate limiting: 10 questions per user per day via localStorage.
