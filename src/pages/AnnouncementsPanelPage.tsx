import { useState } from 'react';
import { initialAnnouncements } from '../data/announcementsPanel';
import type { AnnouncementItem } from '../data/announcementsPanel';
import PageContainer from '../components/Layout/PageContainer';

export default function AnnouncementsPanelPage() {
  const [items, setItems] = useState<AnnouncementItem[]>(initialAnnouncements);
  const [newType, setNewType] = useState<'Announcement' | 'Prayer'>('Announcement');
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  function addItem() {
    if (!newTitle.trim() || !newContent.trim()) return;
    setItems(items => [
      ...items,
      {
        id: `${newType.toLowerCase()}-${Date.now()}`,
        type: newType,
        title: newTitle,
        content: newContent,
        date: new Date().toISOString().slice(0, 10),
      }
    ]);
    setNewTitle('');
    setNewContent('');
  }

  return (
    <PageContainer title="Announcements & Prayer Requests">
      <div className="max-w-3xl mx-auto p-4">
        <div className="flex gap-2 mb-4">
          <select
            className="border rounded px-2 py-2"
            value={newType}
            onChange={e => setNewType(e.target.value as any)}
          >
            <option value="Announcement">Announcement</option>
            <option value="Prayer">Prayer</option>
          </select>
          <input
            className="flex-1 border rounded px-3 py-2"
            placeholder="Title"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
          />
          <input
            className="flex-1 border rounded px-3 py-2"
            placeholder="Content"
            value={newContent}
            onChange={e => setNewContent(e.target.value)}
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={addItem}>Add</button>
        </div>
        <div className="grid gap-3">
          {items.map(item => (
            <div key={item.id} className={`bg-white dark:bg-gray-100 rounded shadow p-3`}>
              <div className="font-semibold text-lg text-gray-900 dark:text-gray-900">{item.title}</div>
              <div className={item.type === 'Announcement' ? 'text-blue-700 font-semibold text-xs mb-1' : 'text-purple-700 font-semibold text-xs mb-1'}>
                {item.type}
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-700 mb-1">{item.content}</div>
              <div className="text-xs text-gray-500">{item.date}</div>
            </div>
          ))}
          {items.length === 0 && <div className="text-gray-500">No announcements or prayer requests yet.</div>}
        </div>
      </div>
    </PageContainer>
  );
}
