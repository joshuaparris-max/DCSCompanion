import React, { useEffect, useState } from 'react';
import KbItemCard from './KbItemCard';
import KbEditor from './KbEditor';
import kbService from '../../services/kbService';
import type { KbItem } from '../../services/kbService';
import { useAuth } from '../../contexts/AuthContext';

type Props = {
  type: string;
  showAdd?: boolean;
};

export default function KbListWithFavs({ type, showAdd = true }: Props) {
  const [items, setItems] = useState<KbItem[]>([]);
  const [editing, setEditing] = useState<Partial<KbItem> | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const unsub = kbService.subscribeKbItems(type, setItems);
    return () => unsub && unsub();
  }, [type]);

  useEffect(() => {
    if (!user) {
      setFavorites([]);
      return () => {};
    }
    const unsub = kbService.subscribeUserFavorites(user.uid, setFavorites);
    return () => unsub && unsub();
  }, [user]);

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

  const handleToggleFavorite = async (e: React.MouseEvent, id?: string) => {
    e.stopPropagation();
    e.preventDefault();
    if (!user || !id) return;
    await kbService.toggleFavorite(user.uid, id);
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
            <KbItemCard item={item} isFavorite={favorites.includes(item.id || '')} onToggleFavorite={(e) => handleToggleFavorite(e, item.id)} />
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
