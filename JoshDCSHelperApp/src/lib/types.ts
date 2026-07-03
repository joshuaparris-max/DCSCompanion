// This file previously contained types for ICT tickets and library resources. It has been refactored to align with the new purpose of the app.
// Removed ticket and resource types and replaced them with placeholder types for future use.

// Placeholder types for future use.
export type PlaceholderType = {
  id: string;
  name: string;
};

// Reintroducing Ticket and Resource types for compatibility
export type Ticket = {
  id: string;
  createdAt: string;
  status: string;
  priority: string;
};

// Updated Resource type to include resourceId and ensure dueAt is always defined
export type Resource = {
  id: string;
  name: string;
  resourceId: string;
  dueAt: string;
  returnedAt?: string;
};
