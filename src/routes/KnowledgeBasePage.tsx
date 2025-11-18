import React, { useState } from 'react';
import { dcsKnowledgeBase } from '../data/dcsKnowledgeBase';

const KnowledgeBasePage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const filteredItems = dcsKnowledgeBase.filter(item => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      (item.tags ?? []).some(tag => tag.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = categoryFilter ? item.category === categoryFilter : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">DCS Knowledge Base</h1>
      <div className="flex space-x-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="p-2 border rounded w-full"
        />
        <select
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Categories</option>
          {[...new Set(dcsKnowledgeBase.map(item => item.category))].map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <ul className="space-y-2">
        {filteredItems.map(item => (
          <li key={item.id} className="p-4 bg-white shadow rounded">
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p>{item.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KnowledgeBasePage;