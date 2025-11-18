import type { Resource, Loan } from '../../../lib/types';
import ResourceStatusBadge from '../../library/components/ResourceStatusBadge';
import { formatShort } from '../../../lib/dateUtils';

interface LibrarySnapshotData {
  dueToday: Array<{ loan: Loan; resource: Resource | undefined }>;
  overdue: Array<{ loan: Loan; resource: Resource | undefined }>;

  activeLoansCount: number;
  nextDue: Array<{ loan: Loan; resource: Resource | undefined }>;
}

export default function LibrarySnapshotCard({ data }: { data: LibrarySnapshotData }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-4">
      <h3 className="font-semibold mb-2">Library Snapshot</h3>
      <div>Active loans: <span className="font-bold">{data.activeLoansCount}</span></div>
      <div>Due today: <span className="font-bold">{data.dueToday.length}</span></div>
      <div>Overdue: <span className="font-bold">{data.overdue.length}</span></div>
      <div className="mt-2">
        <h4 className="font-semibold mb-1">Next Due</h4>
        {data.nextDue.length === 0 ? (
          <div className="text-gray-500">None 🎉</div>
        ) : (
          <ul className="list-disc pl-4">
            {data.nextDue.map(({ loan, resource }) => (
              <li key={loan.id}>
                <span className="font-bold">{resource?.title || 'Unknown'}</span> due <span>{formatShort(loan.dueAt)}</span>
                {resource && <ResourceStatusBadge status={resource.status} />}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
