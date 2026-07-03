export type EventRosterItem = {
  id: string;
  type: 'event' | 'duty';
  title: string;
  date: string; // ISO date
  time?: string;
  location?: string;
  notes?: string;
};

export const eventRoster: EventRosterItem[] = [
  {
    id: 'devotions',
    type: 'event',
    title: 'Staff Devotions',
    date: '2025-11-19',
    time: '08:00',
    location: 'Staff Room',
    notes: 'Daily prayer and Bible reading before school.'
  },
  {
    id: 'assembly',
    type: 'event',
    title: 'Primary Assembly',
    date: '2025-11-20',
    time: '09:00',
    location: 'Hall',
    notes: 'Weekly assembly for Primary students.'
  },
  {
    id: 'library-duty',
    type: 'duty',
    title: 'Library Supervision',
    date: '2025-11-21',
    time: '13:00',
    location: 'Library',
    notes: 'Supervise students during lunch.'
  },
  // Add more events/duties as needed
];
