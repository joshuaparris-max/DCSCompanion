import React, { useState } from 'react';
import { dcsKnowledgeBase } from '../data/dcsKnowledgeBase';
import PageContainer from '../components/Layout/PageContainer';

const categories = [
  'All',
  'ICT',
  'Library',
  'Student Welfare',
  'Enrolments',
  'General',
];

const DcsKnowledgeBase: React.FC = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('kbFavorites') || '[]');
    } catch {
      return [];
    }
  });
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = dcsKnowledgeBase.filter((item) => {
    const matchesCategory = category === 'All' || item.category === category;
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase()) ||
      item.summary.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const updated = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id];
      localStorage.setItem('kbFavorites', JSON.stringify(updated));
      return updated;
    });
  };

  // Import/export for KB favorites
  const exportFavorites = () => {
    const data = JSON.stringify(favorites);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'kb-favorites.json';
    a.click();
    URL.revokeObjectURL(url);
  };
  const importFavorites = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const imported = JSON.parse(reader.result as string);
        if (Array.isArray(imported)) {
          setFavorites(imported);
          localStorage.setItem('kbFavorites', JSON.stringify(imported));
        }
      } catch {}
    };
    reader.readAsText(file);
  };

  return (
    <PageContainer title="DCS Knowledge Base">
      <div className="dashboard-grid grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row gap-2 md:gap-4">
            <input
              className="p-2 border rounded w-full md:w-1/2"
              placeholder="Search by title, category, summary..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <select
              className="p-2 border rounded w-full md:w-48"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-2 mb-2">
            <button className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs" onClick={exportFavorites}>Export Favorites</button>
            <label className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs cursor-pointer">
              Import Favorites
              <input type="file" accept="application/json" className="hidden" onChange={importFavorites} />
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map(item => (
              <div key={item.id} className="bg-white shadow rounded p-4 flex flex-col gap-2 relative">
                <button
                  className={`absolute top-2 right-2 text-xl ${favorites.includes(item.id) ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-500`}
                  title={favorites.includes(item.id) ? 'Unpin from favorites' : 'Pin to favorites'}
                  onClick={() => toggleFavorite(item.id)}
                  aria-label="Pin KB topic"
                >
                  ★
                </button>
                <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded self-start">{item.category}</span>
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-gray-700">{item.summary}</p>
                <button
                  className="self-start text-blue-600 underline text-xs mt-1"
                  onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                >
                  {expandedId === item.id ? 'Hide details' : 'Show details'}
                </button>
                {expandedId === item.id && (
                  <div className="mt-2 p-2 border rounded bg-gray-50">
                    <div className="mb-2 text-sm text-gray-800">{item.summary}</div>
                    {item.links && item.links.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {item.links.map(link => (
                          <a
                            key={link.url}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                          >
                            {link.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="col-span-full text-center text-gray-500">No results found.</div>
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default DcsKnowledgeBase;