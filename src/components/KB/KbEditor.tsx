import React, { useState, useEffect } from 'react';
import type { KbItem } from '../../services/kbService';

type Props = {
  initial?: Partial<KbItem>;
  onSave: (data: Partial<KbItem>) => Promise<void> | void;
  onCancel?: () => void;
};

export default function KbEditor({ initial = {}, onSave, onCancel }: Props) {
  const [title, setTitle] = useState(initial.title || '');
  const [summary, setSummary] = useState(initial.summary || '');
  const [body, setBody] = useState(initial.body || '');
  const [category, setCategory] = useState(initial.category || '');

  useEffect(() => {
    setTitle(initial.title || '');
    setSummary(initial.summary || '');
    setBody(initial.body || '');
    setCategory(initial.category || '');
  }, [initial]);

  const submit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!title.trim()) return;
    await onSave({ title, summary, body, category });
    setTitle(''); setSummary(''); setBody(''); setCategory('');
  };

  return (
    <form onSubmit={submit} className="bg-white dark:bg-gray-800 rounded shadow p-4">
      <div className="mb-2">
        <input className="w-full border rounded px-2 py-1" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      </div>
      <div className="mb-2">
        <input className="w-full border rounded px-2 py-1" placeholder="Summary" value={summary} onChange={e => setSummary(e.target.value)} />
      </div>
      <div className="mb-2">
        <input className="w-full border rounded px-2 py-1" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
      </div>
      <div className="mb-2">
        <textarea rows={6} className="w-full border rounded px-2 py-1" placeholder="Body/Details" value={body} onChange={e => setBody(e.target.value)} />
      </div>
      <div className="flex gap-2 justify-end">
        {onCancel && <button type="button" className="px-3 py-1 border rounded" onClick={onCancel}>Cancel</button>}
        <button type="submit" className="px-4 py-1 bg-green-600 text-white rounded">Save</button>
      </div>
    </form>
  );
}
