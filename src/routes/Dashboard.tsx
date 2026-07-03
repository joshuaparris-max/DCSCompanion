import { useState, useEffect } from 'react';
import DashboardOverview from '../features/dashboard/components/DashboardOverview';
import ICTSnapshotCard from '../features/dashboard/components/ICTSnapshotCard';
import LibrarySnapshotCard from '../features/dashboard/components/LibrarySnapshotCard';
import FocusCard from '../features/dashboard/components/FocusCard';
import QuickLinksCard from '../features/dashboard/components/QuickLinksCard';
import { isSameDay, isPast, today } from '../lib/dateUtils';
import type { Ticket, Resource } from '../lib/types';

function computeDashboardStats({ tickets, resources }: { tickets: Ticket[]; resources: Resource[] }) {
  // ICT
  const openStatuses = ['New', 'In Progress', 'Waiting'];
  const highPriorities = ['High', 'Urgent'];
  const todayDate = today();
  const newToday = tickets.filter(t => isSameDay(t.createdAt, todayDate)).length;
  const openTickets = tickets.filter(t => openStatuses.includes(t.status)).length;
  const highPriorityOpen = tickets.filter(t => openStatuses.includes(t.status) && highPriorities.includes(t.priority)).length;
  // Top tickets: open, high priority, recent
  const topTickets = tickets
    .filter(t => openStatuses.includes(t.status))
    .sort((a, b) => {
      if (highPriorities.includes(a.priority) && !highPriorities.includes(b.priority)) return -1;
      if (!highPriorities.includes(a.priority) && highPriorities.includes(b.priority)) return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    })
    .slice(0, 5);

  // Library
  const activeLoans = resources.filter(l => !l.returnedAt);
  const dueToday = activeLoans.filter(l => isSameDay(l.dueAt, todayDate));
  const overdue = activeLoans.filter(l => isPast(l.dueAt));
  const nextDue = activeLoans
    .filter(l => !isPast(l.dueAt))
    .sort((a, b) => new Date(a.dueAt).getTime() - new Date(b.dueAt).getTime())
    .slice(0, 5)
    .map(loan => ({ loan, resource: resources.find(r => r.id === loan.resourceId) }));

  return {
    ictStats: {
      totalTickets: tickets.length,
      openTickets,
      highPriorityOpen,
      newToday,
      topTickets,
    },
    libraryStats: {
      activeLoansCount: activeLoans.length,
      dueTodayCount: dueToday.length,
      overdueCount: overdue.length,
    },
    librarySnapshot: {
      dueToday: dueToday.map(l => ({ loan: l, resource: resources.find(r => r.id === l.resourceId) })),
      overdue: overdue.map(l => ({ loan: l, resource: resources.find(r => r.id === l.resourceId) })),
      activeLoansCount: activeLoans.length,
      nextDue,
    },
  };
}

export default function Dashboard() {
  const [tickets] = useState<Ticket[]>([]);
  const [resources] = useState<Resource[]>([]);

  useEffect(() => {
    // Placeholder for future resource loading logic
  }, []);

  const stats = computeDashboardStats({ tickets, resources });

  return (
    <div className="space-y-4">
      <DashboardOverview ictStats={stats.ictStats} libraryStats={stats.libraryStats} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ICTSnapshotCard data={stats.ictStats} />
        <LibrarySnapshotCard data={stats.librarySnapshot} />
      </div>
      <FocusCard />
      <QuickLinksCard />
    </div>
  );
}
