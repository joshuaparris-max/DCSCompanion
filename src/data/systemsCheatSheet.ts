export type SystemInfo = {
  id: string;
  name: string;
  description: string;
  url?: string;
  login?: string;
  help?: string;
  tips?: string[];
};

export const systemsCheatSheet: SystemInfo[] = [
  {
    id: 'sentral',
    name: 'Sentral',
    description: 'Student Information System for attendance, reports, and parent portal.',
    url: 'https://sentral.dubbocs.edu.au/',
    help: 'Contact ICT for access or password resets.',
    tips: [
      'Use your DCS credentials to log in.',
      'Parents use the Parent Portal for student info.',
      'Roll marking and student data are managed here.'
    ]
  },
  {
    id: 'schoolbox',
    name: 'Schoolbox (OurDCS Portal)',
    description: 'Internal portal for news, resources, e-learning, and community updates.',
    url: 'https://ourdcs.dubbocs.edu.au/',
    help: 'See ICT for login issues.',
    tips: [
      'Staff and students use the same login as email.',
      'Check the portal for daily bulletins and announcements.'
    ]
  },
  {
    id: 'm365',
    name: 'Microsoft 365',
    description: 'Email, Teams, SharePoint, OneDrive, and Office apps for staff and students.',
    url: 'https://portal.office.com/',
    help: 'ICT manages accounts and access.',
    tips: [
      'Email: Outlook Web or desktop app.',
      'Teams: Used for chat, meetings, and some classes.',
      'SharePoint: Staff intranet and shared files.'
    ]
  },
  {
    id: 'jamf',
    name: 'Jamf School',
    description: 'Mobile Device Management for iPads.',
    url: 'https://school.jamfcloud.com/',
    help: 'ICT can push apps or reset devices.',
    tips: [
      'Use for managing iPad apps and restrictions.',
      'Contact ICT for app deployment.'
    ]
  },
  {
    id: 'sccm',
    name: 'Microsoft SCCM',
    description: 'PC deployment and management for Windows devices.',
    help: 'ICT handles imaging and updates.',
    tips: [
      'Used for deploying software and updates to staff/student PCs.'
    ]
  },
  {
    id: 'library',
    name: 'Library System',
    description: 'Library catalog and borrowing system (e.g., Oliver or Infiniti).',
    help: 'Library staff manage accounts and catalog.',
    tips: [
      'Use barcode scanner for check-in/out.',
      'Ask Library staff for help with catalog searches.'
    ]
  },
  // Add more systems as needed
];
