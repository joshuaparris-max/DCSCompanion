# DCS Companion - Quick Reference

Fast lookup guide for developers implementing or maintaining authentication.

## File Map

| File | Purpose |
|------|---------|
| `src/contexts/AuthContext.tsx` | Auth state management & flows |
| `src/services/firebaseClient.ts` | Firebase initialization |
| `src/services/userProfileService.ts` | Firestore CRUD operations |
| `src/types/userProfile.ts` | User profile TypeScript types |
| `src/utils/localDataMigration.ts` | localStorage → Firestore migration |
| `src/components/ProtectedRoute.tsx` | Route protection wrapper |
| `src/components/EmailVerificationBanner.tsx` | Email verification UI |
| `src/pages/LoginPage.tsx` | Login UI |
| `src/pages/RegisterPage.tsx` | Registration UI |
| `src/pages/ProfilePage.tsx` | User profile management |
| `src/pages/ForgotPasswordPage.tsx` | Password reset |
| `src/pages/VerifyEmailPage.tsx` | Email verification page |

## API Reference

### useAuth Hook

```typescript
import { useAuth } from './contexts/AuthContext';

const {
  user,                    // Firebase Auth user | null
  profile,                 // UserProfile | null
  loading,                 // boolean
  error,                   // string | null
  loginWithEmail,          // (email, password) => Promise<void>
  registerWithEmail,       // (email, password, fullName, role?, dept?) => Promise<void>
  logout,                  // () => Promise<void>
  sendPasswordReset,       // (email) => Promise<void>
  resendVerificationEmail, // () => Promise<void>
  refreshProfile           // () => Promise<void>
} = useAuth();
```

### Authentication

```typescript
// Login
await loginWithEmail('user@dubbocs.edu.au', 'password123');

// Register
await registerWithEmail(
  'new@dubbocs.edu.au',
  'password123',
  'John Doe',
  'staff',        // optional: 'admin' | 'support'
  'Library'       // optional: department
);

// Logout
await logout();

// Reset password
await sendPasswordReset('user@dubbocs.edu.au');

// Resend verification
await resendVerificationEmail();

// Refresh user profile
await refreshProfile();
```

### User Profile Service

```typescript
import { updateUserProfile, updatePreferences, appendChatMessage } from './services/userProfileService';

// Get profile
const profile = await getUserProfile(uid);

// Update full profile
await updateUserProfile(uid, {
  displayName: 'New Name',
  department: 'New Dept'
});

// Update preferences only
await updatePreferences(uid, {
  theme: 'dark',
  focus: 'Library',
  scripture: 'John 3:16'
});

// Add to chat history
await appendChatMessage(uid, {
  id: 'msg-123',
  question: 'How do I...?',
  answer: 'Here is how...'
});

// Update KB data
await updateKnowledgeBase(uid, {
  favorites: [...existing, 'new-id'],
  pinnedArticles: [...],
  recentlyViewed: [...]
});

// Mark migration complete
await markMigrationCompleted(uid);

// Touch last login
await touchLastLogin(uid);
```

## Common Patterns

### Check if User is Authenticated

```tsx
const { user, loading } = useAuth();

if (loading) return <Spinner />;
if (!user) return <LoginPage />;

return <Dashboard />;
```

### Update Profile Data

```tsx
const { user, profile } = useAuth();

if (user && profile) {
  await updateUserProfile(user.uid, {
    displayName: 'New Name'
  });
  // Refresh to get latest
  await refreshProfile();
}
```

### Handle Errors

```tsx
const { loginWithEmail, error } = useAuth();

try {
  await loginWithEmail(email, password);
} catch (err) {
  console.error(err.message);
  // Show to user
}
```

### Add Data to User Profile

```tsx
const { user } = useAuth();

if (user) {
  // Chat history
  await appendChatMessage(user.uid, {
    id: crypto.randomUUID(),
    question: q,
    answer: a
  });

  // Priorities
  const { profile } = useAuth();
  if (profile) {
    const newPriority = {
      id: crypto.randomUUID(),
      task: 'My task',
      completed: false,
      date: new Date().toISOString()
    };
    await updateUserProfile(user.uid, {
      priorities: [...profile.priorities, newPriority]
    });
  }
}
```

## Routing

### Public Routes (No Auth Required)
- `/login`
- `/register`
- `/forgot-password`
- `/verify-email`

### Protected Routes (Auth Required)
- `/` (dashboard)
- `/kb` (knowledge base)
- `/ask-dcs` (chat)
- `/profile` (user profile)
- `/settings`
- `/staff-directory`
- `/systems-cheat-sheet`
- `/event-roster`
- `/support-panel`
- `/task-tracker`
- `/resource-booking`
- `/announcements-panel`
- `/onboarding-guide`

### Protecting a Route

```tsx
import { ProtectedRoute } from './components/ProtectedRoute';

<Route 
  path="/my-page" 
  element={
    <ProtectedRoute>
      <MyPage />
    </ProtectedRoute>
  } 
/>
```

## Data Flow

### Registration
1. User enters email (school domain) + password + name
2. `registerWithEmail()` called
3. Firebase Auth creates user
4. `createUserProfile()` creates Firestore profile
5. `sendEmailVerification()` sends verification email
6. User redirected to `/verify-email`
7. User clicks email link
8. User clicks "I've verified" or manual refresh
9. Redirected to dashboard

### Login
1. User enters email + password
2. `loginWithEmail()` called
3. Firebase Auth validates
4. `getUserProfile()` fetches Firestore profile
5. Check `migrationCompleted` flag
6. If not migrated: auto-migrate localStorage data
7. Redirected to dashboard

### Logout
1. User clicks "Sign Out"
2. `logout()` called
3. Firebase signs out
4. Local state cleared
5. Redirected to `/login`

## Config Customization

### Change School Domain

File: `src/pages/RegisterPage.tsx` (line ~30)

```typescript
const schoolDomain = '@yourdomain.edu.au';
```

### Add User Roles

File: `src/types/userProfile.ts` (line ~1)

```typescript
export type StaffRole = 'staff' | 'admin' | 'support' | 'your_new_role';
```

Then update:
- `RegisterPage.tsx` role selector
- `Firestore Rules` (FIREBASE_RULES.md)

### Change Default Theme

File: `src/services/userProfileService.ts` (line ~35)

```typescript
theme: 'dark'  // Change to 'dark' as default
```

## Environment Variables

Required in `.env.local`:

```
VITE_FIREBASE_API_KEY=abc123...
VITE_FIREBASE_AUTH_DOMAIN=project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=project-id
VITE_FIREBASE_APP_ID=app-id
```

Get from Firebase Console → Project Settings → General tab.

## Type Definitions

### UserProfile

```typescript
interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: 'staff' | 'admin' | 'support';
  department?: string;
  createdAt: string;      // ISO 8601
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
```

## Debugging

### Enable Console Logging

```typescript
// src/contexts/AuthContext.tsx
console.log('Auth state changed:', user);
console.log('Profile loaded:', profile);
```

### Check Firestore Data

1. Go to Firebase Console
2. Firestore Database → Users collection
3. Click user document to view

### Check Auth Logs

1. Firebase Console → Authentication
2. Users tab → click user
3. View sign-in methods and timestamps

### Browser Console

```javascript
// Get current user
firebase.auth().currentUser

// Get user token
await firebase.auth().currentUser?.getIdToken()

// Force refresh profile
// In AuthContext, call refreshProfile()
```

## Common Issues

| Issue | Solution |
|-------|----------|
| "Cannot find module 'firebase'" | Run `npm install` |
| Missing env vars | Create `.env.local` from `.env.example` |
| Firestore permission denied | Check security rules and auth token |
| Email not received | Check spam, verify domain in Firebase |
| User logged out on refresh | Temp issue, usually resolves; check env vars |
| Data not migrating | Migration is one-time; runs on first login |

## Support Contacts

- Firebase Docs: https://firebase.google.com/docs
- GitHub Issues: Check DCS Companion repo
- Local Support: See INSTALLATION_GUIDE.md troubleshooting

---

**Pro Tip:** Keep this file bookmarked for quick reference during development!
