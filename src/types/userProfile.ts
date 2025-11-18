export type StaffRole = 'staff' | 'admin' | 'support';

export interface ChatMessage {
  id: string;
  question: string;
  answer: string;
  timestamp: string;
}

export interface UserPriority {
  id: string;
  task: string;
  completed: boolean;
  date: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: StaffRole;
  department?: string;
  createdAt: string;
  updatedAt: string;
  lastLogin: string;
  preferences: {
    theme: 'light' | 'dark';
    pinnedLinks: string[];
    focus?: string;
    scripture?: string;
  };
  knowledgeBase: {
    favorites: string[];
    pinnedArticles: string[];
    recentlyViewed: string[];
  };
  chatHistory: ChatMessage[];
  priorities: UserPriority[];
  migrationCompleted: boolean;
}

export type UserProfilePartial = Partial<Omit<UserProfile, 'uid' | 'email'>>;
