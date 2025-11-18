import React, { useEffect, useState } from 'react';
import KbItemCard from './KbItemCard';
import KbEditor from './KbEditor';
import kbService, { KbItem } from '../../services/kbService';

type Props = {
  type: string;
  showAdd?: boolean;
};

export default function KbList({ type, showAdd = true }: Props) {
  const [items, setItems] = useState<KbItem[]>([]);
  const [editing, setEditing] = useState<Partial<KbItem> | null>(null);

  useEffect(() => {
    let unsub = kbService.subscribeKbItems(type, setItems);
    return () => unsub && unsub();
  }, [type]);

  const handleSave = async (data: Partial<KbItem>) => {
    if (editing && editing.id) {
      await kbService.updateKbItem(editing.id, data);
      setEditing(null);
    } else {
      await kbService.createKbItem({ ...(data as KbItem), type });
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!confirm('Delete this item?')) return;
    await kbService.deleteKbItem(id);
  };

  return (
    <div>
      {showAdd && (
        <div className="mb-4">
          {!editing && <button className="bg-green-600 text-white px-3 py-2 rounded" onClick={() => setEditing({ type })}>Add</button>}
          {editing && <KbEditor initial={editing} onSave={handleSave} onCancel={() => setEditing(null)} />}
        </div>
      )}

      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(item => (
          <div key={item.id}>
            <KbItemCard item={item} />
            <div className="flex gap-2 mt-2">
              <button className="px-2 py-1 border rounded" onClick={() => setEditing(item)}>Edit</button>
              <button className="px-2 py-1 border rounded text-red-600" onClick={() => handleDelete(item.id)}>Delete</button>
            </div>
          </div>
        ))}
        {items.length === 0 && <div className="text-gray-500">No items yet.</div>}
      </div>
    </div>
  );
}
