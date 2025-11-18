import React, { useState } from 'react';
import { askDcs } from '../services/askDcs';
import { dcsKbDocs } from '../data/dcsKb';

const AskDcs: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    setLoading(true);
    setAnswer('');

    const relevantDocs = dcsKbDocs.filter(
      (doc) =>
        doc.title.toLowerCase().includes(question.toLowerCase()) ||
        doc.body.toLowerCase().includes(question.toLowerCase())
    );

    const snippets = relevantDocs.map((doc) => doc.body);

    try {
      const response = await askDcs(question, snippets);
      setAnswer(response);
    } catch (error) {
      setAnswer('Error: Unable to fetch answer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Ask DCS</h1>
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask about DCS..."
        className="w-full p-2 border rounded mb-4"
      ></textarea>
      <button
        onClick={handleAsk}
        disabled={loading}
        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {loading ? 'Asking...' : 'Ask DCS'}
      </button>
      {answer && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h2 className="text-lg font-bold">Answer</h2>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default AskDcs;