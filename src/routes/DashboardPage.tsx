import React from 'react';

const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white shadow rounded">
          <h2 className="text-xl font-semibold">Today</h2>
          <ul className="list-disc pl-5">
            <li>Top 3 workflows I use often</li>
            <li>Pinned rooms</li>
            <li>Pinned KB topics</li>
          </ul>
        </div>
        <div className="p-4 bg-white shadow rounded">
          <h2 className="text-xl font-semibold">Quick Links</h2>
          <ul className="list-disc pl-5">
            <li><a href="https://example.com" target="_blank" rel="noopener noreferrer">Open Sentral</a></li>
            <li><a href="https://example.com" target="_blank" rel="noopener noreferrer">Open Email</a></li>
            <li><a href="https://example.com" target="_blank" rel="noopener noreferrer">Open Library System</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;