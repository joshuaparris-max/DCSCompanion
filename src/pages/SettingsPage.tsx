import React, { useState, useEffect, useRef } from 'react';
import PageContainer from '../components/Layout/PageContainer';

const SettingsPage: React.FC = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [backupStatus, setBackupStatus] = useState('');
  const importInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const exportLocalData = () => {
    const data = Object.fromEntries(
      Array.from({ length: localStorage.length }, (_, index) => localStorage.key(index))
        .filter((key): key is string => Boolean(key))
        .map(key => [key, localStorage.getItem(key)]),
    );
    const backup = {
      app: 'DCS Companion',
      version: 1,
      exportedAt: new Date().toISOString(),
      data,
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `dcs-companion-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setBackupStatus(`Exported ${Object.keys(data).length} local settings and records.`);
  };

  const importLocalData = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    try {
      const parsed = JSON.parse(await file.text()) as { app?: string; data?: Record<string, unknown> };
      if (parsed.app !== 'DCS Companion' || !parsed.data || typeof parsed.data !== 'object') {
        throw new Error('This is not a DCS Companion backup.');
      }
      Object.entries(parsed.data).forEach(([key, value]) => {
        if (typeof value === 'string') localStorage.setItem(key, value);
      });
      setBackupStatus('Backup restored. Reloading the app...');
      window.setTimeout(() => window.location.reload(), 700);
    } catch (error) {
      setBackupStatus(error instanceof Error ? error.message : 'Could not restore that backup.');
    }
  };

  return (
    <PageContainer title="Settings">
      <div className="max-w-lg mx-auto p-4 space-y-4">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Settings</h1>
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
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950/40">
          <h2 className="font-semibold text-gray-900 dark:text-white">Local data backup</h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            Download or restore this browser's focus, priorities, pinned links, favourites, tasks, announcements, and chat history.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" onClick={exportLocalData} className="rounded bg-blue-700 px-3 py-2 text-sm font-semibold text-white">
              Download backup
            </button>
            <button type="button" onClick={() => importInputRef.current?.click()} className="rounded border border-blue-700 px-3 py-2 text-sm font-semibold text-blue-800 dark:text-blue-200">
              Restore backup
            </button>
            <input ref={importInputRef} type="file" accept="application/json" onChange={importLocalData} className="hidden" />
          </div>
          {backupStatus && <p role="status" className="mt-3 text-sm text-gray-700 dark:text-gray-200">{backupStatus}</p>}
        </div>
      </div>
    </PageContainer>
  );
};

export default SettingsPage;
