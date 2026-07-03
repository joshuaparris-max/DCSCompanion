import { useState } from 'react';
import { addTicket } from '../../../lib/ticketStorage';
import type { DeviceType, TicketCategory, RequesterRole, TicketPriority } from '../../../lib/types';
import Button from '../../../components/UI/Button';

const categories: TicketCategory[] = ["Device", "Network", "Account", "Printing", "Software", "Other"];
const deviceTypes: DeviceType[] = ["Laptop", "Desktop", "iPad", "Chromebook", "Printer", "Other"];
const requesterRoles: RequesterRole[] = ["Teacher", "Student", "Support Staff", "Leadership", "Other"];
const priorities: TicketPriority[] = ["Low", "Normal", "High", "Urgent"];

const initialForm = {
  summary: '',
  description: '',
  category: categories[0],
  deviceType: undefined,
  location: '',
  requesterName: '',
  requesterRole: undefined,
  priority: 'Normal' as TicketPriority,
};

export default function TicketForm({ onAdd }: { onAdd: () => void }) {
  const [form, setForm] = useState(initialForm);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.summary.trim() || !form.requesterName.trim()) {
      setError('Summary and Requester Name are required.');
      return;
    }
    addTicket({
      ...form,
      status: 'New',
    });
    setForm(initialForm);
    setSuccess(true);
    setError('');
    onAdd();
    setTimeout(() => setSuccess(false), 1500);
  }

  return (
    <form className="space-y-2" onSubmit={handleSubmit}>
      <input name="summary" value={form.summary} onChange={handleChange} placeholder="Summary*" className="input" required />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="input" />
      <select name="category" value={form.category} onChange={handleChange} className="input">
        {categories.map(c => <option key={c}>{c}</option>)}
      </select>
      <select name="deviceType" value={form.deviceType || ''} onChange={handleChange} className="input">
        <option value="">Device Type (optional)</option>
        {deviceTypes.map(d => <option key={d}>{d}</option>)}
      </select>
      <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="input" />
      <input name="requesterName" value={form.requesterName} onChange={handleChange} placeholder="Requester Name*" className="input" required />
      <select name="requesterRole" value={form.requesterRole || ''} onChange={handleChange} className="input">
        <option value="">Requester Role (optional)</option>
        {requesterRoles.map(r => <option key={r}>{r}</option>)}
      </select>
      <select name="priority" value={form.priority} onChange={handleChange} className="input">
        {priorities.map(p => <option key={p}>{p}</option>)}
      </select>
      <Button type="submit">Create Ticket</Button>
      {success && <div className="text-green-600 text-sm">Ticket created!</div>}
      {error && <div className="text-red-600 text-sm">{error}</div>}
    </form>
  );
}
