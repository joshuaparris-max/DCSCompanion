import React from 'react';
import PageContainer from '../components/Layout/PageContainer';
import KbListWithFavs from '../components/KB/KbListWithFavs';

export default function EventRosterPage() {
  const [search, setSearch] = useState('');
  const filtered = eventRoster.filter(e =>
    e.title.toLowerCase().includes(search.toLowerCase()) ||
    (e.notes && e.notes.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <PageContainer title="Events & Duty Roster">
      <div className="max-w-3xl mx-auto p-4 space-y-4">
        <input
          className="w-full border rounded px-3 py-2 mb-4"
          placeholder="Search events or duties"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="grid gap-4">
          {filtered.map(item => (
            <div key={item.id} className="bg-white dark:bg-gray-100 rounded shadow p-4 flex flex-col md:flex-row md:items-center">
              <div className="flex-1">
                <div className="font-semibold text-lg text-gray-900 dark:text-gray-900">{item.title}</div>
                <div className="text-gray-700 dark:text-gray-900 text-sm mb-1">
                  {formatDate(item.date)}{item.time && `, ${item.time}`}
                  {item.location && <span> @ {item.location}</span>}
                </div>
                {item.notes && <div className="text-xs text-gray-600 dark:text-gray-700 mt-1">{item.notes}</div>}
              </div>
              <div className="ml-0 md:ml-4 mt-2 md:mt-0">
                <span className={item.type === 'event' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded text-xs' : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded text-xs'}>
                  {item.type === 'event' ? 'Event' : 'Duty'}
                </span>
              </div>
            </div>
          ))}
          {filtered.length === 0 && <div className="text-gray-500">No events or duties found.</div>}
        </div>
      </div>
    </PageContainer>
  );
}
