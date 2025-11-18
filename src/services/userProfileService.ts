import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebaseClient';

// Type definitions
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

/**
 * Convert Firestore Timestamp to ISO string
 */
function timestampToISOString(data: any): any {
  if (data === null || data === undefined) return data;
  if (data instanceof Timestamp) {
    return data.toDate().toISOString();
  }
  if (Array.isArray(data)) {
    return data.map(timestampToISOString);
  }
  if (typeof data === 'object') {
    return Object.keys(data).reduce((acc, key) => {
      acc[key] = timestampToISOString(data[key]);
      return acc;
    }, {} as any);
  }
  return data;
}

/**
 * Get user profile from Firestore
 */
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (!userDoc.exists()) {
      return null;
    }
    const data = userDoc.data();
    // Convert Firestore Timestamps to ISO strings
    return timestampToISOString(data) as UserProfile;
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
}

/**
 * Create a new user profile in Firestore
 */
export async function createUserProfile(
  uid: string,
  baseData: {
    email: string;
    displayName: string;
    role: 'staff' | 'admin' | 'support';
    department?: string;
  }
): Promise<UserProfile> {
  try {
    const now = new Date().toISOString();
    const profile: UserProfile = {
      uid,
      email: baseData.email,
      displayName: baseData.displayName,
      role: baseData.role,
      department: baseData.department || 'General',
      createdAt: now,
      updatedAt: now,
      lastLogin: now,
      preferences: {
        theme: 'light',
        pinnedLinks: [],
        focus: '',
        scripture: '',
      },
      knowledgeBase: {
        favorites: [],
        pinnedArticles: [],
        recentlyViewed: [],
      },
      chatHistory: [],
      priorities: [],
      migrationCompleted: false,
    };

    await setDoc(doc(db, 'users', uid), profile);
    return profile;
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
}

/**
 * Update user profile (partial update)
 */
export async function updateUserProfile(
  uid: string,
  updates: UserProfilePartial
): Promise<void> {
  try {
    const updateData = {
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    await updateDoc(doc(db, 'users', uid), updateData);
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
}

/**
 * Update user preferences
 */
export async function updatePreferences(
  uid: string,
  preferences: Partial<UserProfile['preferences']>
): Promise<void> {
  try {
    const updateData = {
      preferences: {
        theme: preferences.theme,
        pinnedLinks: preferences.pinnedLinks,
        focus: preferences.focus,
        scripture: preferences.scripture,
      },
      updatedAt: new Date().toISOString(),
    };
    await updateDoc(doc(db, 'users', uid), updateData);
  } catch (error) {
    console.error('Error updating preferences:', error);
    throw error;
  }
}

/**
 * Update user priorities
 */
export async function updatePriorities(
  uid: string,
  priorities: UserProfile['priorities']
): Promise<void> {
  try {
    await updateDoc(doc(db, 'users', uid), {
      priorities,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error updating priorities:', error);
    throw error;
  }
}

/**
 * Append a chat message to user's chat history
 */
export async function appendChatMessage(
  uid: string,
  message: {
    id: string;
    question: string;
    answer: string;
  }
): Promise<void> {
  try {
    const profile = await getUserProfile(uid);
    if (!profile) throw new Error('User profile not found');

    const newMessage = {
      ...message,
      timestamp: new Date().toISOString(),
    };

    await updateDoc(doc(db, 'users', uid), {
      chatHistory: [...profile.chatHistory, newMessage],
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error appending chat message:', error);
    throw error;
  }
}

/**
 * Update knowledge base data (favorites, pinned, recently viewed)
 */
export async function updateKnowledgeBase(
  uid: string,
  knowledgeBase: Partial<UserProfile['knowledgeBase']>
): Promise<void> {
  try {
    const profile = await getUserProfile(uid);
    if (!profile) throw new Error('User profile not found');

    const updateData = {
      knowledgeBase: {
        favorites: knowledgeBase.favorites ?? profile.knowledgeBase.favorites,
        pinnedArticles:
          knowledgeBase.pinnedArticles ?? profile.knowledgeBase.pinnedArticles,
        recentlyViewed:
          knowledgeBase.recentlyViewed ?? profile.knowledgeBase.recentlyViewed,
      },
      updatedAt: new Date().toISOString(),
    };
    await updateDoc(doc(db, 'users', uid), updateData);
  } catch (error) {
    console.error('Error updating knowledge base:', error);
    throw error;
  }
}

/**
 * Touch lastLogin timestamp
 */
export async function touchLastLogin(uid: string): Promise<void> {
  try {
    await updateDoc(doc(db, 'users', uid), {
      lastLogin: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error touching last login:', error);
    throw error;
  }
}

/**
 * Mark migration as completed
 */
export async function markMigrationCompleted(uid: string): Promise<void> {
  try {
    await updateDoc(doc(db, 'users', uid), {
      migrationCompleted: true,
    });
  } catch (error) {
    console.error('Error marking migration completed:', error);
    throw error;
  }
}
