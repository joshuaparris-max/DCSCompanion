import { useState } from 'react';
import type { Ticket } from '../../../lib/types';
import TicketStatusBadge from './TicketStatusBadge';
import { updateTicket } from '../../../lib/ticketStorage';

interface Props {
  tickets: Ticket[];
  status: string;
  priority: string;
  search: string;
  onUpdate: () => void;
}

function filterTickets(tickets: Ticket[], status: string, priority: string, search: string) {
  return tickets.filter(t => {
    const statusMatch = status === 'All' || t.status === status;
    const priorityMatch = priority === 'All' || t.priority === priority;
    const searchMatch =
      t.summary.toLowerCase().includes(search.toLowerCase()) ||
      t.requesterName.toLowerCase().includes(search.toLowerCase());
    return statusMatch && priorityMatch && searchMatch;
  });
}

export default function TicketList({ tickets, status, priority, search, onUpdate }: Props) {
  const [detailId, setDetailId] = useState<string | null>(null);
  const filtered = filterTickets(tickets, status, priority, search);

  function handleStatusChange(id: string, newStatus: Ticket["status"]) {
    updateTicket(id, t => ({ ...t, status: newStatus }));
    onUpdate();
  }

  return (
    <div>
      <table className="w-full text-sm mb-2">
        <thead>
          <tr>
            <th>Summary</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Requester</th>
            <th>Location</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(t => (
            <tr key={t.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => setDetailId(t.id)}>
              <td>{t.summary}</td>
              <td><TicketStatusBadge status={t.status} /></td>
              <td>{t.priority}</td>
              <td>{t.requesterName}</td>
              <td>{t.location}</td>
              <td>{new Date(t.createdAt).toLocaleDateString()}</td>
              <td>
                <select value={t.status} onChange={e => handleStatusChange(t.id, e.target.value as Ticket["status"])} className="input w-auto">
                  {['New', 'In Progress', 'Waiting', 'Resolved', 'Cancelled'].map(s => <option key={s}>{s}</option>)}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {detailId && (
        <TicketDetailModal ticket={filtered.find(t => t.id === detailId)!} onClose={() => setDetailId(null)} />
      )}
    </div>
  );
}

function TicketDetailModal({ ticket, onClose }: { ticket: Ticket; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded shadow-lg p-6 w-full max-w-md relative">
        <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>×</button>
        <h2 className="font-bold text-lg mb-2">Ticket Details</h2>
        <div className="mb-2"><TicketStatusBadge status={ticket.status} /></div>
        <div><strong>Summary:</strong> {ticket.summary}</div>
        <div><strong>Description:</strong> {ticket.description}</div>
        <div><strong>Category:</strong> {ticket.category}</div>
        <div><strong>Device Type:</strong> {ticket.deviceType}</div>
        <div><strong>Location:</strong> {ticket.location}</div>
        <div><strong>Requester:</strong> {ticket.requesterName} ({ticket.requesterRole})</div>
        <div><strong>Priority:</strong> {ticket.priority}</div>
        <div><strong>Created:</strong> {new Date(ticket.createdAt).toLocaleString()}</div>
        <div><strong>Updated:</strong> {new Date(ticket.updatedAt).toLocaleString()}</div>
        <div><strong>Notes:</strong> {ticket.notes}</div>
        <div><strong>Due At:</strong> {ticket.dueAt ? new Date(ticket.dueAt).toLocaleDateString() : '—'}</div>
      </div>
    </div>
  );
}
