import React, { useState, useEffect } from 'react';
import PageContainer from '../components/layout/PageContainer';

const FOCUS_TEXT = `Today’s Focus: Serve with patience and joy.
Scripture: "Whatever you do, work at it with all your heart, as working for the Lord, not for men." — Colossians 3:23`;

const DEFAULT_LINKS = [
  { label: 'Sentral', url: 'https://sentral.dubbocs.edu.au/' },
  { label: 'Outlook Web / Email', url: 'https://outlook.office.com/' },
  { label: 'DCS Website', url: 'https://www.dubbocs.edu.au/' },
  { label: 'DCS Map', url: 'https://www.google.com/maps/d/edit?mid=1YpdCmN-_kLGG3ILgWSe0pIiz7gs6G2o&usp=sharing' },
];

const HomeDashboard: React.FC = () => {
  const [pinnedLinks, setPinnedLinks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('pinnedLinks') || '[]');
    } catch {
      return [];
    }
  });
  const [focusText, setFocusText] = useState(() => {
    return localStorage.getItem('focusText') || FOCUS_TEXT;
  });
  const [editingFocus, setEditingFocus] = useState(false);
  const [myPriorities, setMyPriorities] = useState(() => localStorage.getItem('myPriorities') || '');
  useEffect(() => {
    localStorage.setItem('pinnedLinks', JSON.stringify(pinnedLinks));
  }, [pinnedLinks]);
  const togglePin = (label: string) => {
    setPinnedLinks((prev: string[]) =>
      prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]
    );
  };
  const saveFocus = () => {
    localStorage.setItem('focusText', focusText);
    setEditingFocus(false);
  };
  const savePriorities = () => {
    localStorage.setItem('myPriorities', myPriorities);
  };
  return (
    <PageContainer title="Home Dashboard">
      <div className="dashboard-grid grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <div className="bg-white shadow rounded p-4 flex flex-col gap-2">
          <h2 className="text-lg font-semibold">Focus & Scripture</h2>
          {editingFocus ? (
            <>
              <textarea
                className="w-full p-2 border rounded mb-2"
                value={focusText}
                onChange={e => setFocusText(e.target.value)}
                rows={4}
              />
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={saveFocus}>Save</button>
                <button className="px-3 py-1 bg-gray-300 rounded" onClick={() => setEditingFocus(false)}>Cancel</button>
              </div>
            </>
          ) : (
            <>
              <pre className="whitespace-pre-wrap text-gray-700">{focusText}</pre>
              <button className="mt-2 px-2 py-1 text-xs bg-gray-200 rounded self-start" onClick={() => setEditingFocus(true)}>
                Edit
              </button>
            </>
          )}
        </div>
        <div className="bg-white shadow rounded p-4 flex flex-col gap-2">
          <h2 className="text-lg font-semibold">Quick Links</h2>
          <div className="flex flex-wrap gap-2">
            {DEFAULT_LINKS.map(link => (
              <span key={link.label} className="relative">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                >
                  {link.label}
                </a>
                <button
                  className={`absolute -top-2 -right-2 text-lg ${pinnedLinks.includes(link.label) ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-500`}
                  title={pinnedLinks.includes(link.label) ? 'Unpin from dashboard' : 'Pin to dashboard'}
                  onClick={() => togglePin(link.label)}
                  aria-label="Pin quick link"
                >
                  ★
                </button>
              </span>
            ))}
          </div>
          {pinnedLinks.length > 0 && (
            <div className="mt-2">
              <h3 className="text-sm font-semibold mb-1">Pinned Links</h3>
              <div className="flex flex-wrap gap-2">
                {DEFAULT_LINKS.filter(l => pinnedLinks.includes(l.label)).map(link => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-yellow-400 text-black rounded hover:bg-yellow-500 text-sm"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="bg-white shadow rounded p-4 flex flex-col gap-2 md:col-span-2">
          <h2 className="text-lg font-semibold">DCS Campus Map</h2>
          <p>Custom Google MyMaps for DCS campus. Includes buildings, rooms, and key locations.</p>
          <div className="flex gap-2 flex-wrap mt-2">
            <a
              href="https://www.google.com/maps/d/edit?mid=1YpdCmN-_kLGG3ILgWSe0pIiz7gs6G2o&usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Open Interactive Map
            </a>
            <a
              href="https://www.dubbocs.edu.au/wp-content/uploads/2023/10/DCS-Map-2023-Master-Edition-A4.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              View Official PDF Map
            </a>
          </div>
        </div>
        <div className="bg-white shadow rounded p-4 flex flex-col gap-2 md:col-span-2">
          <h2 className="text-lg font-semibold">ICT snapshot (manual notes)</h2>
          <p className="text-gray-500">You can track priorities here later.</p>
        </div>
        <div className="bg-white shadow rounded p-4 flex flex-col gap-2 md:col-span-2">
          <h2 className="text-lg font-semibold">My Priorities (DCS Daily)</h2>
          <textarea
            className="w-full p-2 border rounded mb-2"
            rows={3}
            placeholder="Jot down your top priorities for today..."
            value={myPriorities}
            onChange={e => setMyPriorities(e.target.value)}
            onBlur={savePriorities}
          />
          <div className="text-xs text-gray-400">Saved locally. Use this for your daily focus or reminders.</div>
        </div>
      </div>
    </PageContainer>
  );
};

export default HomeDashboard;