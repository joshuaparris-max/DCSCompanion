import React, { useState, useEffect } from 'react';
import PageContainer from '../components/Layout/PageContainer';

const SettingsPage: React.FC = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <PageContainer title="Settings">
      <div className="max-w-lg mx-auto p-4 space-y-4">
        <div className="mb-4">
          <label className="font-semibold mr-2">Theme:</label>
          <select
            value={theme}
            onChange={e => setTheme(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        <div className="text-gray-500 text-sm">Your theme preference is saved locally.</div>
      </div>
    </PageContainer>
  );
};

export default SettingsPage;
