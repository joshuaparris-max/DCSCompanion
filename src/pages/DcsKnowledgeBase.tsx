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

interface KBItem {
  id: string;
  title: string;
  category: string;
  summary: string;
  links?: { label: string; url: string }[];
  tags?: string[];
}

const DcsKnowledgeBase: React.FC = () => {
  const [kbItems, setKbItems] = useState<KBItem[]>(dcsKnowledgeBase);
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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<Partial<KBItem>>({
    title: '',
    category: 'General',
    summary: '',
    links: [],
  });

  const filtered = kbItems.filter((item) => {
    const matchesCategory = category === 'All' || item.category === category;
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase()) ||
      item.summary.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addKBItem = () => {
    if (!formData.title || !formData.summary) return;
    const newItem: KBItem = {
      id: `kb-${Date.now()}`,
      title: formData.title,
      category: formData.category || 'General',
      summary: formData.summary,
      links: formData.links,
    };
    setKbItems([...kbItems, newItem]);
    setFormData({ title: '', category: 'General', summary: '', links: [] });
    setShowAddForm(false);
  };

  const updateKBItem = (id: string) => {
    if (!formData.title || !formData.summary) return;
    setKbItems(kbItems.map(item =>
      item.id === id
        ? {
            ...item,
            title: formData.title as string,
            category: (formData.category || item.category) as string,
            summary: formData.summary as string,
            links: formData.links,
          }
        : item
    ));
    setEditingId(null);
    setFormData({ title: '', category: 'General', summary: '', links: [] });
  };

  const deleteKBItem = (id: string) => {
    setKbItems(kbItems.filter(item => item.id !== id));
    setFavorites(favorites.filter(fav => fav !== id));
  };

  const startEdit = (item: KBItem) => {
    setFormData(item);
    setEditingId(item.id);
  };

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
            <button onClick={() => setShowAddForm(!showAddForm)} className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700">
              + Add KB Item
            </button>
          </div>

          {showAddForm && (
            <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-4 space-y-2">
              <input
                type="text"
                placeholder="Title"
                value={formData.title || ''}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-2 border rounded text-sm"
              />
              <select
                value={formData.category || 'General'}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-2 border rounded text-sm"
              >
                {categories.filter(c => c !== 'All').map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <textarea
                placeholder="Summary"
                value={formData.summary || ''}
                onChange={e => setFormData({ ...formData, summary: e.target.value })}
                className="w-full p-2 border rounded text-sm"
                rows={3}
              />
              <div className="flex gap-2">
                <button
                  onClick={addKBItem}
                  className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setFormData({ title: '', category: 'General', summary: '', links: [] });
                  }}
                  className="px-3 py-1 bg-gray-400 text-white rounded text-xs hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-max">
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
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                    className="text-blue-600 underline text-xs"
                  >
                    {expandedId === item.id ? 'Hide details' : 'Show details'}
                  </button>
                  <button
                    onClick={() => startEdit(item)}
                    className="text-amber-600 underline text-xs hover:text-amber-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteKBItem(item.id)}
                    className="text-red-600 underline text-xs hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
                {editingId === item.id && (
                  <div className="bg-amber-50 border border-amber-200 rounded p-3 mt-2 space-y-2">
                    <input
                      type="text"
                      placeholder="Title"
                      value={formData.title || ''}
                      onChange={e => setFormData({ ...formData, title: e.target.value })}
                      className="w-full p-2 border rounded text-sm"
                    />
                    <select
                      value={formData.category || item.category}
                      onChange={e => setFormData({ ...formData, category: e.target.value })}
                      className="w-full p-2 border rounded text-sm"
                    >
                      {categories.filter(c => c !== 'All').map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <textarea
                      placeholder="Summary"
                      value={formData.summary || ''}
                      onChange={e => setFormData({ ...formData, summary: e.target.value })}
                      className="w-full p-2 border rounded text-sm"
                      rows={3}
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateKBItem(item.id)}
                        className="px-3 py-1 bg-amber-600 text-white rounded text-xs hover:bg-amber-700"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => {
                          setEditingId(null);
                          setFormData({ title: '', category: 'General', summary: '', links: [] });
                        }}
                        className="px-3 py-1 bg-gray-400 text-white rounded text-xs hover:bg-gray-500"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
                {expandedId === item.id && editingId !== item.id && (
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