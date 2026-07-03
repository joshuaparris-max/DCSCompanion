const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

export async function askDcs(question: string, kbSnippets: string[]): Promise<string> {
  if (!GROQ_API_KEY) {
    return 'No Groq API key configured. Add VITE_GROQ_API_KEY=... to a .env file.';
  }

  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful assistant for staff at Dubbo Christian School (DCS) in NSW, Australia. ' +
            'Answer only about DCS using the provided context. If the answer is not in the context, say you are not sure ' +
            'and suggest where Josh might look (Sentral, DCS staff handbook, school website, etc.).',
        },
        {
          role: 'user',
          content: `Question: ${question}\n\nContext:\n${kbSnippets.join('\n\n---\n\n')}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`Groq API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content ?? 'No answer from model.';
}