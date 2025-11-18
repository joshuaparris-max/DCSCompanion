import { useState } from 'react';
import { initialResources } from '../data/resourceInventory';
import type { ResourceItem } from '../data/resourceInventory';
import PageContainer from '../components/Layout/PageContainer';

export default function ResourceBookingPage() {
  const [resources, setResources] = useState<ResourceItem[]>(initialResources);
  const [booker, setBooker] = useState('');
  const [dueDate, setDueDate] = useState('');

  function bookResource(id: string) {
    if (!booker.trim() || !dueDate.trim()) return;
    setResources(resources => resources.map(r =>
      r.id === id ? { ...r, available: false, bookedBy: booker, dueDate } : r
    ));
    setBooker('');
    setBooker('');
    setDueDate('');
  }

  function returnResource(id: string) {
    setResources(resources => resources.map(r =>
      r.id === id ? { ...r, available: true, bookedBy: undefined, dueDate: undefined } : r
    ));
  }

  return (
    <PageContainer title="Resource Booking & Inventory">
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Resource Booking & Inventory</h1>
        <div className="grid gap-4">
          {resources.map(resource => (
            <div key={resource.id} className="bg-white dark:bg-gray-100 rounded shadow p-4">
              <div className="font-semibold text-lg text-gray-900 dark:text-gray-900">{resource.name}</div>
              <div className="text-xs text-gray-700 dark:text-gray-700 mb-1">Type: {resource.type}</div>
              {resource.available ? (
                <div>
                  <div className="text-green-700 font-semibold mb-2">Available</div>
                  <div className="flex gap-2 items-center">
                    <input
                      className="border rounded px-2 py-1"
                      placeholder="Your name"
                      value={booker}
                      onChange={e => setBooker(e.target.value)}
                    />
                    <input
                      className="border rounded px-2 py-1"
                      type="date"
                      value={dueDate}
                      onChange={e => setDueDate(e.target.value)}
                    />
                    <button className="bg-blue-600 text-white px-3 py-1 rounded" onClick={() => bookResource(resource.id)}>
                      Book
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="text-red-700 font-semibold mb-2">Booked by {resource.bookedBy} (Due: {resource.dueDate})</div>
                  <button className="bg-green-600 text-white px-3 py-1 rounded" onClick={() => returnResource(resource.id)}>
                    Mark as Returned
                  </button>
                </div>
              )}
            </div>
          ))}
          {resources.length === 0 && <div className="text-gray-500">No resources found.</div>}
        </div>
      </div>
    </PageContainer>
  );
}
