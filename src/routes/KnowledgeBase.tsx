import React, { useState } from 'react';
import { dcsKbDocs, KbDoc } from '../data/dcsKb';

const KnowledgeBase: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoc, setSelectedDoc] = useState<KbDoc | null>(null);

  const filteredDocs = dcsKbDocs.filter(
    (doc) =>
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">DCS Knowledge Base</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="p-4 bg-gray-100 rounded shadow cursor-pointer hover:bg-gray-200"
            onClick={() => setSelectedDoc(doc)}
          >
            <h2 className="text-lg font-bold">{doc.title}</h2>
            <p className="text-sm text-gray-600">{doc.category}</p>
            <p className="text-sm">{doc.summary}</p>
          </div>
        ))}
      </div>
      {selectedDoc && (
        <div className="mt-4 p-4 bg-white rounded shadow">
          <h2 className="text-xl font-bold mb-2">{selectedDoc.title}</h2>
          <p className="text-sm text-gray-600 mb-2">Category: {selectedDoc.category}</p>
          <p className="text-sm mb-4">Tags: {selectedDoc.tags.join(', ')}</p>
          <p>{selectedDoc.body}</p>
          <button
            onClick={() => setSelectedDoc(null)}
            className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default KnowledgeBase;