import type { TicketPriority } from '../../../lib/types';
import type { TicketStatus } from '../../../lib/types';

interface Props {
  status: TicketStatus | 'All';
  setStatus: (status: TicketStatus | 'All') => void;
  priority: TicketPriority | 'All';
  setPriority: (priority: TicketPriority | 'All') => void;
  search: string;
  setSearch: (search: string) => void;
}

const statusOptions: Array<TicketStatus | 'All'> = ['All', 'New', 'In Progress', 'Waiting', 'Resolved', 'Cancelled'];
const priorityOptions: Array<TicketPriority | 'All'> = ['All', 'Low', 'Normal', 'High', 'Urgent'];

export default function TicketFilters({ status, setStatus, priority, setPriority, search, setSearch }: Props) {
  return (
    <div className="flex flex-wrap gap-2 mb-2">
      <select value={status} onChange={e => setStatus(e.target.value as TicketStatus | 'All')} className="input w-auto">
        {statusOptions.map(opt => <option key={opt}>{opt}</option>)}
      </select>
      <select value={priority} onChange={e => setPriority(e.target.value as TicketPriority | 'All')} className="input w-auto">
        {priorityOptions.map(opt => <option key={opt}>{opt}</option>)}
      </select>
      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search summary/requester" className="input w-40" />
    </div>
  );
}
