import React, { useState } from 'react';
import { dcsWorkflows } from '../data/dcsWorkflows';

const WorkflowsPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const filteredWorkflows = dcsWorkflows.filter(workflow => {
    const matchesSearch =
      workflow.title.toLowerCase().includes(search.toLowerCase()) ||
      workflow.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = categoryFilter ? workflow.category === categoryFilter : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Workflows</h1>
      <div className="flex space-x-4">
        <input
          type="text"
          placeholder="Search workflows..."
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
          {[...new Set(dcsWorkflows.map(workflow => workflow.category))].map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <ul className="space-y-2">
        {filteredWorkflows.map(workflow => (
          <li key={workflow.id} className="p-4 bg-white shadow rounded">
            <h2 className="text-xl font-semibold">{workflow.title}</h2>
            <ol className="list-decimal pl-5">
              {workflow.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
            {workflow.notes && <p className="mt-2 italic">Notes: {workflow.notes}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkflowsPage;