import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageContainer from '../components/Layout/PageContainer';
import kbService, { KbItem } from '../services/kbService';
import KbEditor from '../components/KB/KbEditor';

export default function KbDetailPage() {
  const { type, id } = useParams<{ type: string; id: string }>();
  const [item, setItem] = useState<KbItem | null>(null);
  const [editing, setEditing] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    if (!type || !id) return;
    kbService.getKbItem(type, id).then(setItem);
  }, [type, id]);

  const handleSave = async (data: Partial<KbItem>) => {
    if (!item || !item.id) return;
    await kbService.updateKbItem(item.id, data);
    const refreshed = await kbService.getKbItem(item.type, item.id);
    setItem(refreshed);
    setEditing(false);
  };

  const handleDelete = async () => {
    if (!item || !item.id) return;
    if (!confirm('Delete this item?')) return;
    await kbService.deleteKbItem(item.id);
    nav(-1);
  };

  return (
    <PageContainer title={item?.title || 'KB Item'}>
      <div className="max-w-3xl mx-auto p-4">
        {!item && <div className="text-gray-500">Loading...</div>}
        {item && !editing && (
          <div className="bg-white dark:bg-gray-800 rounded shadow p-4">
            <div className="font-semibold text-2xl mb-2">{item.title}</div>
            {item.category && <div className="text-sm text-gray-500 mb-2">{item.category}</div>}
            {item.summary && <div className="text-gray-700 dark:text-gray-300 mb-4">{item.summary}</div>}
            {item.body && <div className="prose max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: item.body }} />}
            <div className="flex gap-2 mt-4">
              <button className="px-3 py-1 border rounded" onClick={() => setEditing(true)}>Edit</button>
              <button className="px-3 py-1 border rounded text-red-600" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        )}

        {item && editing && (
          <KbEditor initial={item} onSave={handleSave} onCancel={() => setEditing(false)} />
        )}
      </div>
    </PageContainer>
  );
}
