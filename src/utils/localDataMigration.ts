// Type definition
interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: 'staff' | 'admin' | 'support';
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
  chatHistory: Array<{
    id: string;
    question: string;
    answer: string;
    timestamp: string;
  }>;
  priorities: Array<{
    id: string;
    task: string;
    completed: boolean;
    date: string;
  }>;
  migrationCompleted: boolean;
}

/**
 * Migrate data from localStorage to Firestore user profile
 * Returns a partial UserProfile and list of keys to clear
 */
export function buildProfilePartialFromLocal(): {
  partial: Partial<UserProfile>;
  keysToClear: string[];
} {
  if (typeof window === 'undefined') {
    return { partial: {}, keysToClear: [] };
  }

  const keysToClear: string[] = [];
  const partial: Partial<UserProfile> = {};

  try {
    // Migrate theme preference
    const theme = localStorage.getItem('theme');
    if (theme === 'dark' || theme === 'light') {
      partial.preferences = partial.preferences || { theme: 'light', pinnedLinks: [] };
      partial.preferences.theme = theme;
      keysToClear.push('theme');
    }

    // Migrate KB favorites
    const kbFavorites = localStorage.getItem('kb-favorites');
    if (kbFavorites) {
      try {
        partial.knowledgeBase = partial.knowledgeBase || {
          favorites: [],
          pinnedArticles: [],
          recentlyViewed: [],
        };
        partial.knowledgeBase.favorites = JSON.parse(kbFavorites);
        keysToClear.push('kb-favorites');
      } catch (e) {
        console.warn('Failed to parse kb-favorites from localStorage', e);
      }
    }

    // Migrate pinned links
    const pinnedLinks = localStorage.getItem('pinned-links');
    if (pinnedLinks) {
      try {
        partial.preferences = partial.preferences || { theme: 'light', pinnedLinks: [] };
        partial.preferences.pinnedLinks = JSON.parse(pinnedLinks);
        keysToClear.push('pinned-links');
      } catch (e) {
        console.warn('Failed to parse pinned-links from localStorage', e);
      }
    }

    // Migrate focus
    const focus = localStorage.getItem('focus');
    if (focus) {
      partial.preferences = partial.preferences || { theme: 'light', pinnedLinks: [] };
      partial.preferences.focus = focus;
      keysToClear.push('focus');
    }

    // Migrate scripture
    const scripture = localStorage.getItem('scripture');
    if (scripture) {
      partial.preferences = partial.preferences || { theme: 'light', pinnedLinks: [] };
      partial.preferences.scripture = scripture;
      keysToClear.push('scripture');
    }

    // Migrate priorities
    const priorities = localStorage.getItem('priorities');
    if (priorities) {
      try {
        partial.priorities = JSON.parse(priorities);
        keysToClear.push('priorities');
      } catch (e) {
        console.warn('Failed to parse priorities from localStorage', e);
      }
    }

    // Migrate recently viewed KB items
    const recentKbItems = localStorage.getItem('recent-kb-items');
    if (recentKbItems) {
      try {
        partial.knowledgeBase = partial.knowledgeBase || {
          favorites: [],
          pinnedArticles: [],
          recentlyViewed: [],
        };
        partial.knowledgeBase.recentlyViewed = JSON.parse(recentKbItems);
        keysToClear.push('recent-kb-items');
      } catch (e) {
        console.warn('Failed to parse recent-kb-items from localStorage', e);
      }
    }

    // Migrate pinned KB articles
    const kbPinned = localStorage.getItem('kb-pinned');
    if (kbPinned) {
      try {
        partial.knowledgeBase = partial.knowledgeBase || {
          favorites: [],
          pinnedArticles: [],
          recentlyViewed: [],
        };
        partial.knowledgeBase.pinnedArticles = JSON.parse(kbPinned);
        keysToClear.push('kb-pinned');
      } catch (e) {
        console.warn('Failed to parse kb-pinned from localStorage', e);
      }
    }
  } catch (error) {
    console.error('Error migrating data from localStorage:', error);
  }

  return { partial, keysToClear };
}

/**
 * Clear migrated keys from localStorage
 */
export function clearMigratedLocalStorageKeys(keysToClear: string[]): void {
  if (typeof window === 'undefined') return;

  keysToClear.forEach((key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn(`Failed to remove ${key} from localStorage`, error);
    }
  });
}
