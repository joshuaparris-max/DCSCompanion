import type { Resource } from '../../../lib/types';
import ResourceStatusBadge from './ResourceStatusBadge';

interface Props {
  resources: Resource[];
  onSelect: (resource: Resource) => void;
  selectedId?: string;
}

export default function ResourceList({ resources, onSelect, selectedId }: Props) {
  return (
    <table className="w-full text-sm mb-2">
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Type</th>
          <th>Status</th>
          <th>Location</th>
          <th>Barcode</th>
        </tr>
      </thead>
      <tbody>
        {resources.map(r => (
          <tr key={r.id} className={`hover:bg-gray-50 cursor-pointer ${selectedId === r.id ? 'bg-blue-50' : ''}`} onClick={() => onSelect(r)}>
            <td>{r.title}</td>
            <td>{r.author}</td>
            <td>{r.type}</td>
            <td><ResourceStatusBadge status={r.status} /></td>
            <td>{r.location}</td>
            <td>{r.barcode}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
