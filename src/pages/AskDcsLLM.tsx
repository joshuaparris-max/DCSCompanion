import React, { useState, useRef, useEffect } from 'react';
import { getKbContext } from '../data/dcsKnowledgeBase';
import { askDcsLLM } from '../services/llmClient';
import MarkdownMessage from '../components/MarkdownMessage';
import PageContainer from '../components/layout/PageContainer';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const initialMessages: Message[] = [
  {
    id: 'welcome',
    role: 'assistant',
    content: 'Ask questions about Dubbo Christian School. This will later use my own LLM integration.',
  },
];

const AskDcsLLM: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [recentQuestions, setRecentQuestions] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('recentQuestions') || '[]');
    } catch {
      return [];
    }
  });
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    setRecentQuestions(prev => {
      const updated = [input, ...prev.filter(q => q !== input)].slice(0, 5);
      localStorage.setItem('recentQuestions', JSON.stringify(updated));
      return updated;
    });
    const userMsg: Message = { id: Date.now() + '-user', role: 'user', content: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput('');
    setLoading(true);
    const kbContext = getKbContext(input);
    try {
      const answer = await askDcsLLM({ question: input, kbContext });
      setMessages((msgs) => [
        ...msgs,
        {
          id: Date.now() + '-assistant',
          role: 'assistant',
          content: answer,
        },
      ]);
    } catch (err: any) {
      setMessages((msgs) => [
        ...msgs,
        {
          id: Date.now() + '-assistant',
          role: 'assistant',
          content: 'Error: ' + (err.message || err),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer title="Ask DCS (LLM)">
      <div className="flex flex-col h-full max-h-[80vh]">
        <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Ask DCS (LLM)</h1>
        <div className="mb-2 text-gray-600">Ask questions about Dubbo Christian School. This will later use my own LLM integration.</div>
        {recentQuestions.length > 0 && (
          <div className="mb-2">
            <div className="text-xs font-semibold mb-1 text-gray-500">Recent Questions:</div>
            <div className="flex flex-wrap gap-2">
              {recentQuestions.map(q => (
                <button
                  key={q}
                  className="px-2 py-1 bg-gray-200 rounded text-xs hover:bg-blue-100"
                  onClick={() => setInput(q)}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}
        <div
          ref={chatRef}
          className="flex-1 overflow-y-auto bg-gray-100 rounded p-4 mb-2 space-y-2"
          style={{ minHeight: 200 }}
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`max-w-xl px-3 py-2 rounded-lg text-sm whitespace-pre-line ${
                msg.role === 'user'
                  ? 'bg-blue-500 text-white self-end ml-auto'
                  : 'bg-gray-200 text-gray-900 self-start mr-auto'
              }`}
            >
              {msg.role === 'assistant' ? (
                <MarkdownMessage content={msg.content} />
              ) : (
                msg.content
              )}
            </div>
          ))}
          {loading && (
            <div className="text-gray-500 italic">Thinking…</div>
          )}
        </div>
        <form
          className="flex gap-2"
          onSubmit={e => {
            e.preventDefault();
            handleSend();
          }}
        >
          <input
            className="flex-1 p-2 border rounded"
            placeholder="Type your question…"
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={loading}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            disabled={loading || !input.trim()}
          >
            Ask
          </button>
        </form>
      </div>
    </PageContainer>
  );
};

export default AskDcsLLM;