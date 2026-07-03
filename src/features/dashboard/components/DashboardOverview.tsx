import React from 'react';

interface OverviewProps {
  ictStats: {
    totalTickets: number;
    openTickets: number;
    highPriorityOpen: number;
    newToday: number;
  };
  libraryStats: {
    activeLoansCount: number;
    dueTodayCount: number;
    overdueCount: number;
  };
}

export default function DashboardOverview({ ictStats, libraryStats }: OverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
        <h3 className="font-semibold mb-1">ICT Today</h3>
        <div>New tickets: <span className="font-bold">{ictStats.newToday}</span></div>
        <div>Open: <span className="font-bold">{ictStats.openTickets}</span> (<span className="text-red-600">{ictStats.highPriorityOpen}</span> high/urgent)</div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
        <h3 className="font-semibold mb-1">Library Loans</h3>
        <div>Active: <span className="font-bold">{libraryStats.activeLoansCount}</span></div>
        <div>Due today: <span className="font-bold">{libraryStats.dueTodayCount}</span></div>
        <div>Overdue: <span className="font-bold">{libraryStats.overdueCount}</span></div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
        <h3 className="font-semibold mb-1">Welcome</h3>
        <div>Have a great day at DCS!</div>
      </div>
    </div>
  );
}
