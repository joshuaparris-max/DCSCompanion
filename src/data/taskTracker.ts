export type TaskItem = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  category: 'ICT' | 'Library' | 'Admin';
  dueDate?: string;
};

export const initialTasks: TaskItem[] = [
  {
    id: 'ict-001',
    title: 'Reset student password',
    description: 'Assist Year 7 student with Sentral login reset.',
    completed: false,
    category: 'ICT',
    dueDate: '2025-11-19',
  },
  {
    id: 'lib-001',
    title: 'Shelve new books',
    description: 'Put new arrivals on the shelves in the library.',
    completed: false,
    category: 'Library',
    dueDate: '2025-11-20',
  },
  {
    id: 'admin-001',
    title: 'Print preschool sign-in sheets',
    completed: false,
    category: 'Admin',
    dueDate: '2025-11-21',
  },
];
