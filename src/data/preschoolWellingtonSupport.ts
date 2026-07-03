export type SupportPanelItem = {
  id: string;
  campus: 'Preschool' | 'Wellington';
  title: string;
  description: string;
  contacts?: { name: string; email: string; role?: string }[];
  links?: { label: string; url: string }[];
  checklist?: string[];
};

export const supportPanelItems: SupportPanelItem[] = [
  {
    id: 'preschool-daily',
    campus: 'Preschool',
    title: 'Preschool Daily Routine',
    description: 'Key times and tasks for Dubbo Christian Preschool each day.',
    checklist: [
      '8:30am: Sign-in opens',
      'Morning: Learning activities',
      '11:30am: Lunch',
      '1:00pm: Rest/quiet time',
      '3:30–4:00pm: Pick-up and sign-out',
      'Mark attendance in system',
      'Check for parent messages',
    ],
    contacts: [
      { name: 'Michelle Broadley', email: 'michelle.broadley@dubbocs.edu.au', role: 'Preschool Director' }
    ]
  },
  {
    id: 'preschool-compliance',
    campus: 'Preschool',
    title: 'Preschool Compliance Checklist',
    description: 'Daily/weekly compliance tasks for DCP.',
    checklist: [
      'Check staff:child ratios',
      'Record attendance',
      'Update incident/illness log',
      'Check immunization records',
      'Complete daily safety check',
      'Sign off by Nominated Supervisor',
    ]
  },
  {
    id: 'wellington-contacts',
    campus: 'Wellington',
    title: 'Wellington Campus Key Contacts',
    description: 'Who to contact for support at Wellington Christian School.',
    contacts: [
      { name: 'Peter Reuben', email: 'peter.reuben@wellingtoncs.nsw.edu.au', role: 'Principal' },
      { name: 'DCS ICT', email: 'ict@dubbocs.edu.au', role: 'ICT Support' }
    ]
  },
  {
    id: 'wellington-daily',
    campus: 'Wellington',
    title: 'Wellington Daily Routine',
    description: 'Key times and tasks for Wellington Christian School.',
    checklist: [
      '8:30am: Staff briefing',
      '9:00am: Classes begin',
      '11:00am: Recess',
      '1:00pm: Lunch',
      '3:10pm: Dismissal',
      'Check Schoolbox for announcements',
    ]
  }
];
