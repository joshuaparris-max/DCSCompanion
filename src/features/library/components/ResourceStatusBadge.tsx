import type { ResourceStatus } from '../../../lib/types';

const statusColors: Record<ResourceStatus, string> = {
  'Available': 'bg-green-100 text-green-800',
  'On Loan': 'bg-yellow-100 text-yellow-800',
  'Missing': 'bg-red-100 text-red-800',
  'Reserved': 'bg-blue-100 text-blue-800',
};

export default function ResourceStatusBadge({ status }: { status: ResourceStatus }) {
  return (
    <span className={`px-2 py-1 rounded text-xs font-semibold ${statusColors[status]}`}>{status}</span>
  );
}
