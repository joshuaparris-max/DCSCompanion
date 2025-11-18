export type DcsKbTopic = {
  id: string;
  category: 'ICT' | 'Library' | 'Student Welfare' | 'Enrolments' | 'General';
  title: string;
  summary: string;
  links?: { label: string; url: string }[];
  tags?: string[];
};

export const dcsKnowledgeBase: DcsKbTopic[] = [
  {
    id: '1',
    category: 'General',
    title: 'DCS – Main Website',
    summary: 'Public website for Dubbo Christian School – news, term dates, events, and general information.',
    links: [
      { label: 'DCS Website', url: 'https://www.dubbocs.edu.au/' },
    ],
  },
  {
    id: '2',
    category: 'Library',
    title: 'Library opening hours',
    summary: 'Library is open 8am–4pm on school days. Extended hours during exam periods.',
  },
  {
    id: '3',
    category: 'General',
    title: 'DCS – About Us & Policies',
    summary: 'Overview of DCS, Berakah Christian Education, and key school policies (behaviour, child safety, anti-bullying, etc.).',
    links: [
      { label: 'About Us & Policies', url: 'https://www.dubbocs.edu.au/about-us/' },
    ],
  },
  {
    id: '4',
    category: 'Enrolments',
    title: 'How to enrol a new student',
    summary: 'Step-by-step guide for enrolling a new student at DCS.',
  },
  {
    id: '5',
    category: 'Enrolments',
    title: 'DCS – Enrolment & Fees',
    summary: 'Information for prospective families: enrolment process, fee information, and contacts for enrolments and fees.',
    links: [
      { label: 'Enrolment & Fees', url: 'https://www.dubbocs.edu.au/enrolment/' },
    ],
  },
  {
    id: '6',
    category: 'ICT',
    title: 'Projector troubleshooting',
    summary: 'Common fixes for classroom projector issues.',
  },
  {
    id: '7',
    category: 'Library',
    title: 'Borrowing limits',
    summary: 'How many books/resources students and staff can borrow at once.',
  },
  {
    id: '8',
    category: 'General',
    title: 'DCS Map',
    summary: 'Custom Google MyMaps for DCS campus. Includes buildings, rooms, and key locations.',
    links: [
      { label: 'DCS Map', url: 'https://www.google.com/maps/d/edit?mid=1YpdCmN-_kLGG3ILgWSe0pIiz7gs6G2o&usp=sharing' },
    ],
  },
  {
    id: '9',
    category: 'ICT',
    title: 'WiFi access for guests',
    summary: 'How to provide WiFi access to visitors and guests at DCS.',
  },
  {
    id: '10',
    category: 'Student Welfare',
    title: 'Reporting a concern',
    summary: 'How to report a student welfare concern confidentially.',
  },
  {
    id: '11',
    category: 'General',
    title: 'Berakah Christian Education',
    summary: 'Governing parent-controlled association for Dubbo Christian School and related schools.',
    links: [
      { label: 'Berakah Christian Education', url: 'https://berakah.nsw.edu.au/' },
    ],
  },
  {
    id: '12',
    category: 'General',
    title: 'DCS Campus Map (Josh’s MyMap)',
    summary: 'Interactive Google My Maps view of the DCS campus to quickly locate buildings and areas.',
    links: [
      { label: 'DCS Campus Map', url: 'https://www.google.com/maps/d/edit?mid=1YpdCmN-_kLGG3ILgWSe0pIiz7gs6G2o&usp=sharing' },
    ],
  },
  {
    id: '13',
    category: 'ICT',
    title: 'Set up a new iPad with Jamf',
    summary: 'How to enroll a new iPad in Jamf School, assign profiles, and deploy apps for classroom use.',
    links: [
      { label: 'Jamf School', url: 'https://school.jamfcloud.com/' }
    ],
  },
  {
    id: '14',
    category: 'ICT',
    title: 'Post a news item on Schoolbox',
    summary: 'Step-by-step instructions for posting news or bulletins to the OurDCS portal (Schoolbox) for staff and students.',
    links: [
      { label: 'Schoolbox Portal', url: 'https://ourdcs.dubbocs.edu.au/' }
    ],
  },
  {
    id: '15',
    category: 'Library',
    title: 'Library Monitors program guide',
    summary: 'Overview and tips for running the Library Monitors program, including student roles and supervision.',
  },
  {
    id: '16',
    category: 'ICT',
    title: 'Run the projector in the Hall',
    summary: 'Instructions for setting up and troubleshooting the projector and AV system in the Multi-Purpose Hall.',
  },
  {
    id: '17',
    category: 'Library',
    title: 'Reserve library resources for classes',
    summary: 'How to reserve books, sets, or equipment for class use. Includes process for staff and students.',
  },
  {
    id: '18',
    category: 'General',
    title: 'Print preschool sign-in sheets',
    summary: 'How to print daily sign-in sheets for Dubbo Christian Preschool, including where to find templates and record keeping tips.',
  },
  {
    id: '19',
    category: 'ICT',
    title: 'Troubleshoot staff email (Outlook)',
    summary: 'Common fixes for Outlook login, syncing, and sending/receiving issues for staff email accounts.',
  },
  {
    id: '20',
    category: 'ICT',
    title: 'Reset a student password (Sentral)',
    summary: 'How to reset a student password using the Sentral admin portal. Includes steps and tips.',
    links: [
      { label: 'Sentral', url: 'https://sentral.dubbocs.edu.au/' }
    ],
  },
  // ...existing code...
];

// Utility: get top N relevant KB entries for a question (simple keyword match)
export function getKbContext(question: string, max: number = 3): string {
  const q = question.toLowerCase();
  const matches = dcsKnowledgeBase.filter(item =>
    item.title.toLowerCase().includes(q) ||
    item.summary.toLowerCase().includes(q)
  );
  return matches.slice(0, max).map(item => `- ${item.title}: ${item.summary}`).join('\n');
}