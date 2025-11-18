
// Ticket-related types
export type TicketStatus = 'New' | 'In Progress' | 'Waiting' | 'Resolved' | 'Cancelled';
export type TicketPriority = 'Low' | 'Normal' | 'High' | 'Urgent';
export type TicketCategory = 'Device' | 'Network' | 'Account' | 'Printing' | 'Software' | 'Other';
export type DeviceType = 'Laptop' | 'Desktop' | 'iPad' | 'Chromebook' | 'Printer' | 'Other';
export type RequesterRole = 'Teacher' | 'Student' | 'Support Staff' | 'Leadership' | 'Other';

export type Ticket = {
  id: string;
  createdAt: string;
  updatedAt: string;
  summary: string;
  description: string;
  category: TicketCategory;
  deviceType?: DeviceType;
  location: string;
  requesterName: string;
  requesterRole?: RequesterRole;
  priority: TicketPriority;
  status: TicketStatus;
  notes?: string;
  dueAt?: string;
};

// Library-related types
export type ResourceStatus = 'Available' | 'On Loan' | 'Reserved' | 'Lost' | 'Maintenance';

export type Resource = {
  id: string;
  title: string;
  author: string;
  type: string;
  status: ResourceStatus;
  location: string;
  barcode: string;
};

export type Borrower = {
  id: string;
  name: string;
  email: string;
};

export type Loan = {
  id: string;
  resourceId: string;
  borrowerId: string;
  dueAt: string;
  returnedAt?: string;
};
