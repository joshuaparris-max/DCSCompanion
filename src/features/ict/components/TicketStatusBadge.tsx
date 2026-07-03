import type { TicketStatus } from '../../../lib/types';

const statusColors: Record<TicketStatus, string> = {
  'New': 'bg-blue-100 text-blue-800',
  'In Progress': 'bg-yellow-100 text-yellow-800',
  'Waiting': 'bg-purple-100 text-purple-800',
  'Resolved': 'bg-green-100 text-green-800',
  'Cancelled': 'bg-gray-200 text-gray-700',
};

export default function TicketStatusBadge({ status }: { status: TicketStatus }) {
  return (
    <span className={`px-2 py-1 rounded text-xs font-semibold ${statusColors[status]}`}>{status}</span>
  );
}
