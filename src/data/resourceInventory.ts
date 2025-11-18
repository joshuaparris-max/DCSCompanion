export type ResourceItem = {
  id: string;
  name: string;
  type: 'Book Set' | 'iPad' | 'AV Equipment' | 'Other';
  available: boolean;
  bookedBy?: string;
  dueDate?: string;
};

export const initialResources: ResourceItem[] = [
  {
    id: 'bookset-001',
    name: 'Novel Set: Hatchet (10 copies)',
    type: 'Book Set',
    available: true,
  },
  {
    id: 'ipad-001',
    name: 'iPad Cart (20 devices)',
    type: 'iPad',
    available: false,
    bookedBy: 'Mrs. Smith',
    dueDate: '2025-11-20',
  },
  {
    id: 'av-001',
    name: 'Projector (Hall)',
    type: 'AV Equipment',
    available: true,
  },
  {
    id: 'other-001',
    name: 'Bee-Bot Robotics Kit',
    type: 'Other',
    available: true,
  },
];
