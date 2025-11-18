export type SystemInfo = {
  id: string;
  name: string;
  description: string;
  url?: string;
  login?: string;
  help?: string;
  tips?: string[];
};

// SAMPLE DATA - Replace with real internal systems loaded from Firestore
// Do NOT commit internal system URLs, credentials, or organization names to this repo.
// Load live systems from Firestore (kb collection type='systems')
export const systemsCheatSheet: SystemInfo[] = [
  {
    id: 'sample-sis',
    name: 'Student Information System',
    description: 'System for managing student data, attendance, and reporting.',
    url: 'https://example.com/sis',
    help: 'Contact your ICT team for support.',
    tips: [
      'Use your school credentials to log in.',
      'This is for authorized staff only.',
    ]
  },
  {
    id: 'sample-email',
    name: 'Email & Collaboration',
    description: 'Email, chat, and file sharing platform.',
    url: 'https://mail.example.com/',
    help: 'Contact IT support for account issues.',
    tips: [
      'Use your school email credentials.',
      'Check announcements regularly.',
    ]
  },
  {
    id: 'sample-mdm',
    name: 'Device Management',
    description: 'Management platform for mobile devices.',
    help: 'Contact ICT for device support.',
    tips: [
      'Used for app distribution and updates.',
      'Request support through your IT team.'
    ]
  },
];
