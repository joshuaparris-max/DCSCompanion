export type AnnouncementItem = {
  id: string;
  type: 'Announcement' | 'Prayer';
  title: string;
  content: string;
  date: string;
};

export const initialAnnouncements: AnnouncementItem[] = [
  {
    id: 'a1',
    type: 'Announcement',
    title: 'Staff Meeting Monday',
    content: 'All staff meeting in the Hall at 3:30pm. Agenda: Term planning, ICT updates, and new staff welcome.',
    date: '2025-11-17',
  },
  {
    id: 'p1',
    type: 'Prayer',
    title: 'Prayer for Year 12 Exams',
    content: 'Please pray for our Year 12 students as they sit their final HSC exams this week.',
    date: '2025-11-18',
  },
  {
    id: 'a2',
    type: 'Announcement',
    title: 'Library Book Week',
    content: 'Book Week celebrations in the Library all week. Dress-up day Friday!',
    date: '2025-11-19',
  },
  {
    id: 'p2',
    type: 'Prayer',
    title: 'Prayer for Staff Health',
    content: 'Pray for Mrs. Broadley (Preschool Director) who is recovering from surgery.',
    date: '2025-11-19',
  },
];
