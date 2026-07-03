import React, { useState, useEffect } from 'react';

interface JournalEntry {
  id: string;
  date: string;
  title: string;
  content: string;
}

const JournalPage: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState({
    id: '',
    date: new Date().toISOString().split('T')[0],
    title: '',
    content: '',
  });

  useEffect(() => {
    const savedEntries = localStorage.getItem('journalEntries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  const saveEntry = () => {
    const updatedEntries = [...entries, { ...currentEntry, id: Date.now().toString() }];
    setEntries(updatedEntries);
    localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
    setCurrentEntry({ id: '', date: new Date().toISOString().split('T')[0], title: '', content: '' });
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Journal</h1>
      <div className="space-y-2">
        <input
          type="text"
          placeholder="Title"
          value={currentEntry.title}
          onChange={e => setCurrentEntry({ ...currentEntry, title: e.target.value })}
          className="p-2 border rounded w-full"
        />
        <textarea
          placeholder="Write your notes here..."
          value={currentEntry.content}
          onChange={e => setCurrentEntry({ ...currentEntry, content: e.target.value })}
          className="p-2 border rounded w-full"
        />
        <button onClick={saveEntry} className="px-4 py-2 bg-blue-500 text-white rounded">
          Save Entry
        </button>
      </div>
      <ul className="space-y-2">
        {entries.map(entry => (
          <li key={entry.id} className="p-4 bg-white shadow rounded">
            <h2 className="text-xl font-semibold">{entry.title}</h2>
            <p className="text-sm text-gray-500">{entry.date}</p>
            <p>{entry.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JournalPage;