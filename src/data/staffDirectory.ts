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

// SAMPLE DATA - Replace with real staff data loaded from Firestore
// Do NOT commit real staff emails or names to this repo.
// Load live staff directory from Firestore (users/{uid}/staffDirectory or kb collection type='staff-directory')
export const staffDirectory: StaffContact[] = [
  {
    id: 'sample-principal',
    name: 'Principal Name',
    role: 'Principal',
    department: 'Leadership',
    email: 'principal@school.example.com',
    photoUrl: '',
    quickFor: ['Leadership', 'General queries'],
  },
  {
    id: 'sample-ict',
    name: 'ICT Coordinator',
    role: 'ICT Support',
    department: 'ICT',
    email: 'ict@school.example.com',
    photoUrl: '',
    quickFor: ['Tech support', 'Device issues', 'Network'],
  },
  {
    id: 'sample-library',
    name: 'Library Staff',
    role: 'Library Coordinator',
    department: 'Library',
    email: 'library@school.example.com',
    photoUrl: '',
    quickFor: ['Library', 'Resource requests'],
  },
];
