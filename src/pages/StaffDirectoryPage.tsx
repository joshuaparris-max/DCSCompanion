import { useState } from 'react';
import { staffDirectory } from '../data/staffDirectory';
import PageContainer from '../components/Layout/PageContainer';


export default function StaffDirectoryPage() {
  const [search, setSearch] = useState('');
  const filtered = staffDirectory.filter(
    s =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.role.toLowerCase().includes(search.toLowerCase()) ||
      s.department.toLowerCase().includes(search.toLowerCase()) ||
      (s.quickFor && s.quickFor.some(q => q.toLowerCase().includes(search.toLowerCase())))
  );

  return (
    <PageContainer title="Staff Directory & Quick Contacts">
      <div className="max-w-3xl mx-auto p-4 space-y-4">
        <input
          className="w-full border rounded px-3 py-2 mb-4"
          placeholder="Search by name, role, department, or need (e.g. WiFi)"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="grid gap-4">
          {filtered.map(staff => (
            <div key={staff.id} className="flex items-center bg-white dark:bg-gray-100 rounded shadow p-4">
              {staff.photoUrl ? (
                <img src={staff.photoUrl} alt={staff.name} className="w-16 h-16 rounded-full mr-4" />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gray-300 dark:bg-gray-300 flex items-center justify-center mr-4 text-xl font-bold text-gray-900">
                  {staff.name.split(' ').map(n => n[0]).join('')}
                </div>
              )}
              <div className="flex-1">
                <div className="font-semibold text-lg text-gray-900 dark:text-gray-900">{staff.name}</div>
                <div className="text-gray-700 dark:text-gray-900">{staff.role} ({staff.department})</div>
                <div className="text-sm mt-1">
                  <a href={`mailto:${staff.email}`} className="text-blue-600 dark:text-blue-700 underline mr-2">Email</a>
                  {staff.teams && (
                    <a href={staff.teams} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-700 underline mr-2">Teams</a>
                  )}
                  {staff.phone && <span className="ml-2">📞 {staff.phone}</span>}
                </div>
                {staff.quickFor && staff.quickFor.length > 0 && (
                  <div className="text-xs text-gray-600 dark:text-gray-700 mt-1">Quick for: {staff.quickFor.join(', ')}</div>
                )}
              </div>
            </div>
          ))}
          {filtered.length === 0 && <div className="text-gray-500">No staff found.</div>}
        </div>
      </div>
    </PageContainer>
  );
}
