export type StaffContact = {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  teams?: string;
  phone?: string;
  photoUrl?: string;
  quickFor?: string[]; // e.g. ["WiFi issues", "Preschool admin"]
};

export const staffDirectory: StaffContact[] = [
  {
    id: 'arundell',
    name: 'Paul Arundell',
    role: 'Executive Principal',
    department: 'Leadership',
    email: 'paul.arundell@dubbocs.edu.au',
    photoUrl: '',
    quickFor: ['Leadership', 'All campuses'],
  },
  {
    id: 'collins',
    name: 'Greg Collins',
    role: 'Deputy Principal',
    department: 'Leadership',
    email: 'greg.collins@dubbocs.edu.au',
    photoUrl: '',
    quickFor: ['Primary/Secondary queries', 'Leadership'],
  },
  {
    id: 'morris',
    name: 'Scott Morris',
    role: 'Business Manager',
    department: 'Admin',
    email: 'scott.morris@dubbocs.edu.au',
    photoUrl: '',
    quickFor: ['Finance', 'Facilities', 'HR', 'Resource requests'],
  },
  {
    id: 'ictmgr',
    name: 'ICT Manager',
    role: 'ICT Manager',
    department: 'ICT',
    email: 'ict@dubbocs.edu.au',
    photoUrl: '',
    quickFor: ['WiFi issues', 'Device support', 'Network'],
  },
  {
    id: 'broadley',
    name: 'Michelle Broadley',
    role: 'Preschool Director',
    department: 'Preschool',
    email: 'michelle.broadley@dubbocs.edu.au',
    photoUrl: '',
    quickFor: ['Preschool admin', 'Preschool compliance'],
  },
  // Add more staff as needed
];
