import type { Ticket } from '../../../lib/types';
import TicketStatusBadge from '../../ict/components/TicketStatusBadge';

interface ICTSnapshotData {
  totalTickets: number;
  openTickets: number;
  highPriorityOpen: number;
  newToday: number;
  topTickets: Ticket[];
}

export default function ICTSnapshotCard({ data }: { data: ICTSnapshotData }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-4">
      <h3 className="font-semibold mb-2">ICT Snapshot</h3>
      <div className="mb-2">Open: <span className="font-bold">{data.openTickets}</span> (<span className="text-red-600">{data.highPriorityOpen}</span> high/urgent)</div>
      <div className="mb-2">New today: <span className="font-bold">{data.newToday}</span></div>
      <div>
        <h4 className="font-semibold mb-1">Top Tickets</h4>
        {data.topTickets.length === 0 ? (
          <div className="text-gray-500">None 🎉</div>
        ) : (
          <ul className="list-disc pl-4">
            {data.topTickets.map(t => (
              <li key={t.id}>
                <span className="font-bold">{t.summary}</span> <TicketStatusBadge status={t.status} />
                <span className="ml-2 text-xs">({t.priority})</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
