export type SupportPanelItem = {
  id: string;
  campus: 'Preschool' | 'Wellington';
  title: string;
  description: string;
  contacts?: { name: string; email: string; role?: string }[];
  links?: { label: string; url: string }[];
  checklist?: string[];
};

// SAMPLE DATA - Replace with real support panel data loaded from Firestore
// Do NOT commit real staff names or internal procedures to this repo.
// Load live support data from Firestore (kb collection type='support')
export const supportPanelItems: SupportPanelItem[] = [
  {
    id: 'sample-campus1-support',
    campus: 'Preschool',
    title: 'Campus 1 Support',
    description: 'Key contacts and information for Campus 1.',
    checklist: [
      'Contact support for assistance',
      'Check internal portal for updates',
    ],
    contacts: [
      { name: 'Support Team', email: 'support@school.example.com', role: 'General Support' }
    ]
  },
  {
    id: 'sample-campus2-support',
    campus: 'Wellington',
    title: 'Campus 2 Support',
    description: 'Key contacts and information for Campus 2.',
    checklist: [
      'Contact support for assistance',
      'Check internal portal for updates',
    ],
    contacts: [
      { name: 'Support Team', email: 'support@school.example.com', role: 'General Support' }
    ]
  }
];
