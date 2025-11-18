`(Copied from repository root - AUTH_SETUP.md)`

---

# Authentication Setup (DCS Companion)

This document explains how Authentication is wired in the DCS Companion project.

## Overview

- Uses Firebase Authentication (Email/Password)
- `src/contexts/AuthContext.tsx` contains high-level login, register, user state
- `src/services/firebaseClient.ts` manages Firebase app initialization
- `VITE_FIREBASE_*` env vars in `.env.local` control configuration

## Registration Flow

1. User fills registration form in `RegisterPage.tsx`
2. `AuthContext` calls `createUserWithEmailAndPassword`
3. User document is created in Firestore under `users/{uid}`
4. Verification email is sent via Firebase `sendEmailVerification`

## Login Flow

1. Login form calls `signInWithEmailAndPassword`
2. `AuthContext` sets `user` and `profile` context
3. Protected routes use `ProtectedRoute.tsx` and `authRequired` checks

## Email Verification

- `VerifyEmailPage.tsx` handles verification tokens
- Users can't access some routes until verified

## Security Notes

- Keep `.env.local` out of source control
- For production, use CI secrets (Vercel/Netlify/GitHub Actions)
- Consider using server-side proxy for sensitive API calls

## Sources (Code)

- `src/contexts/AuthContext.tsx`
- `src/pages/LoginPage.tsx`, `RegisterPage.tsx`, `VerifyEmailPage.tsx`
- `src/components/EmailVerificationBanner.tsx`
# DCS Companion - Authentication Implementation

Complete guide for setting up and using the new multi-user authentication system.

## Table of Contents
1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Installation & Setup](#installation--setup)
4. [Configuration](#configuration)
5. [Usage](#usage)
6. [Troubleshooting](#troubleshooting)

## Overview

DCS Companion now features a complete authentication system powered by Firebase:

- **Email/Password Authentication** - Secure login with Firebase Auth
- **Per-User Data Storage** - Firestore database for storing user profiles and preferences
- **Data Migration** - Automatic migration from localStorage to Firestore
- **Session Persistence** - Users stay logged in across sessions
- **Email Verification** - Required email verification for new accounts
- **Password Reset** - Secure password reset via email

## Architecture

### Tech Stack
- **Frontend:** React 19 + TypeScript + Tailwind CSS
- **Authentication:** Firebase Authentication (Email/Password)
- **Database:** Cloud Firestore
- **State Management:** React Context API
- **Routing:** React Router v7

### Component Structure

```
src/
├── contexts/
│   └── AuthContext.tsx          # Auth state & logic
├── services/
│   ├── firebaseClient.ts         # Firebase initialization
│   └── userProfileService.ts     # Firestore CRUD operations
├── types/
│   └── userProfile.ts            # TypeScript interfaces
├── utils/
│   └── localDataMigration.ts     # localStorage → Firestore migration
├── components/
│   ├── ProtectedRoute.tsx         # Route protection wrapper
│   └── EmailVerificationBanner.tsx # Email verification UI
└── pages/
    ├── LoginPage.tsx             # Login form
    ├── RegisterPage.tsx          # Registration form
    ├── ProfilePage.tsx           # User profile management
    ├── ForgotPasswordPage.tsx     # Password reset
    └── VerifyEmailPage.tsx        # Email verification
```

### User Profile Structure (Firestore)

```typescript
{
  uid: string;                    // Firebase Auth UID (read-only)
  email: string;                  // User email (read-only)
  displayName: string;            // User's display name
  role: 'staff' | 'admin' | 'support';
  department?: string;
  createdAt: ISO 8601 timestamp;
  updatedAt: ISO 8601 timestamp;
  lastLogin: ISO 8601 timestamp;

  preferences: {
    theme: 'light' | 'dark';
    pinnedLinks: string[];
    focus?: string;               // User's focus area
    scripture?: string;           // Selected scripture
  };

  knowledgeBase: {
    favorites: string[];          // Favorite KB article IDs
    pinnedArticles: string[];
    recentlyViewed: string[];
  };

  chatHistory: [{
    id: string;
    question: string;
    answer: string;
    timestamp: ISO 8601;
  }];

  priorities: [{
    id: string;
    task: string;
    completed: boolean;
    date: ISO 8601;
  }];

  migrationCompleted: boolean;    // One-time flag for data migration
}
```

## Installation & Setup

### Step 1: Install Dependencies (5 minutes)

```bash
npm install
```

This installs Firebase and all required packages.

### Step 2: Create Firebase Project (15 minutes)

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create Project"
3. Enter project name: `dcs-companion` (or your preference)
4. Disable Google Analytics (optional)
5. Click "Create Project" and wait for completion

### Step 3: Enable Authentication (5 minutes)

1. In Firebase Console, go to **Build → Authentication**
2. Click **"Get Started"**
3. Select **"Email/Password"** provider
4. Enable "Email/Password" and "Email link (passwordless sign-in)" (optional)
5. Click **"Save"**

### Step 4: Create Firestore Database (5 minutes)

1. In Firebase Console, go to **Build → Firestore Database**
2. Click **"Create Database"**
3. Select region (closest to your location)
4. Start in **"Test Mode"** (for development)
5. Click **"Create"**

**Note:** Before deploying to production, update security rules (see Configuration section).

### Step 5: Get Firebase Credentials (5 minutes)

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Under "General" tab, scroll to "Your apps"
3. Look for your web app (or create one if needed)
4. Click the copy icon next to the configuration
5. You'll get values for:
   - `apiKey`
   - `authDomain`
   - `projectId`
   - `appId`

### Step 6: Configure Environment Variables (2 minutes)

1. Create `.env.local` file in project root (same level as `package.json`)
2. Copy from `.env.example`:

```bash
# .env.local
VITE_FIREBASE_API_KEY=YOUR_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
VITE_FIREBASE_APP_ID=YOUR_APP_ID
```

**Important:** 
- Never commit `.env.local` to Git (already in .gitignore)
- Use different credentials for development/production
- Rotate credentials regularly in production

### Step 7: Update Security Rules (5 minutes)

1. In Firebase Console, go to **Firestore Database → Rules**
2. Replace the default rules with rules from `FIREBASE_RULES.md`
3. Click **"Publish"**

### Step 8: Start Development Server (1 minute)

```bash
npm run dev
```

Visit http://localhost:5173

You should see the login page. If not, check browser console for errors.

## Configuration

### Email Domain Validation

By default, only `@dubbocs.edu.au` email addresses can register.

To change this, edit `src/pages/RegisterPage.tsx`:

```typescript
// Line 30 - change this:
const schoolDomain = '@dubbocs.edu.au';

// To your domain:
const schoolDomain = '@yourdomain.edu.au';
```

**Note:** Add server-side validation via Cloud Functions for production.

### Theme Preferences

Users can set their preferred theme (light/dark) in their profile.

To sync across tabs, add to AuthContext:

```typescript
// In AuthContext.tsx, after profile refresh:
if (profile?.preferences?.theme) {
  document.documentElement.classList.toggle('dark', profile.preferences.theme === 'dark');
}
```

### Custom User Roles

Default roles: `staff`, `admin`, `support`

Add new roles:

1. Update `src/types/userProfile.ts`:
```typescript
export type StaffRole = 'staff' | 'admin' | 'support' | 'newrole';
```

2. Update `src/pages/RegisterPage.tsx` role selector

3. Update Firestore security rules with role-based access

## Usage

### Login Flow

```typescript
import { useAuth } from './contexts/AuthContext';

function MyComponent() {
  const { loginWithEmail, error, loading } = useAuth();
  
  const handleLogin = async () => {
    try {
      await loginWithEmail('user@dubbocs.edu.au', 'password123');
      // Automatically redirected to dashboard
    } catch (err) {
      console.error('Login failed:', err);
    }
  };
}
```

### Registration Flow

```typescript
const { registerWithEmail } = useAuth();

await registerWithEmail(
  'newuser@dubbocs.edu.au',
  'password123',
  'John Doe',
  'staff',           // role
  'Administration'   // department
);
// User receives verification email automatically
```

### Access User Data

```typescript
const { user, profile } = useAuth();

// Firebase Auth user object
console.log(user?.email);
console.log(user?.emailVerified);

// User profile from Firestore
console.log(profile?.displayName);
console.log(profile?.preferences?.theme);
console.log(profile?.chatHistory);
```

### Update User Profile

```typescript
import { updateUserProfile, updatePreferences } from './services/userProfileService';

// Update preferences
await updatePreferences(user.uid, {
  theme: 'dark',
  focus: 'Library',
  scripture: 'John 3:16'
});

// Update profile
await updateUserProfile(user.uid, {
  displayName: 'New Name',
  department: 'New Department'
});
```

### Protect Routes

```typescript
import { ProtectedRoute } from './components/ProtectedRoute';

<ProtectedRoute>
  <MyPrivateComponent />
</ProtectedRoute>
```

### Check Loading State

```typescript
const { loading } = useAuth();

if (loading) {
  return <div>Loading...</div>;
}
```

## Troubleshooting

### Issue: "Cannot find module 'firebase'"

**Solution:** Run `npm install` to install Firebase package

```bash
npm install
npm run dev
```

### Issue: "Missing environment variables"

**Solution:** Create `.env.local` with Firebase credentials

```bash
# Copy from .env.example
cp .env.example .env.local

# Edit .env.local with your Firebase values
```

Check browser console for specific missing variables.

### Issue: "Project ID error" or "Invalid API Key"

**Solution:** Verify Firebase credentials

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Go to **Project Settings** → **General**
4. Copy values carefully (watch for spaces)
5. Update `.env.local`

### Issue: "Firestore permission denied"

**Solution:** Update Firestore security rules

Current rules allow test mode (anyone can read/write). For production:

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read, write: if request.auth.uid == uid;
    }
  }
}
```

See `FIREBASE_RULES.md` for complete rules.

### Issue: "Email verification not received"

**Solution:** Check spam folder or resend

1. In profile, click "Resend Verification"
2. Check spam/promotions folder
3. Verify email domain is correct in `.env.local`
4. Check Firebase Authentication email settings

### Issue: Users logged out after refresh

**Solution:** Usually temporary - Firebase session restored on reload

If persistent:
1. Check `.env.local` values are correct
2. Verify Firestore is accessible (no auth errors)
3. Check browser console for errors
4. Clear localStorage: `localStorage.clear()` and refresh

### Issue: Data not migrating from localStorage

**Solution:** Migration is one-time and automatic

Trigger manually in browser console:

```javascript
// Get current user UID
const uid = (await firebase.auth().currentUser).uid;

// Clear migration flag
await db.collection('users').doc(uid).update({
  migrationCompleted: false
});

// Refresh page
window.location.reload();
```

### Issue: CORS errors with Firebase

**Solution:** Add domain to Firebase authorized domains

1. Go to **Authentication → Settings** (gear icon)
2. Scroll to "Authorized domains"
3. Add your domain (Firebase Hosting adds automatically)
4. For local development, `localhost` should already be there

### Debug Mode

Enable debug logging:

```typescript
// In src/contexts/AuthContext.tsx
import { getAuth, connectAuthEmulator } from 'firebase/auth';

// Uncomment for local development:
// if (process.env.NODE_ENV === 'development') {
//   connectAuthEmulator(auth, 'http://localhost:9099');
// }
```

### Getting Help

- Check browser console (F12 → Console tab)
- Check Firebase Console → Logs
- Review Firestore security rules
- Verify `.env.local` has all 4 required variables
- Check Firebase project limits (if using free tier)

## Production Deployment

### Before Deploying

1. ✅ Update Firestore security rules (test mode → production rules)
2. ✅ Configure email domain validation (server-side)
3. ✅ Set up email branding in Firebase Console
4. ✅ Enable additional auth methods (optional)
5. ✅ Configure backup and recovery
6. ✅ Set up monitoring and alerts

### Environment Variables

Set in your hosting provider:

- **Vercel:** Settings → Environment Variables
- **Netlify:** Build & Deploy → Environment
- **Firebase Hosting:** Use `.env.production` or cloud functions

```bash
VITE_FIREBASE_API_KEY=production_key
VITE_FIREBASE_AUTH_DOMAIN=production.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=production_project
VITE_FIREBASE_APP_ID=production_app
```

### Build for Production

```bash
npm run build
```

This creates optimized bundle with Firebase tree-shaking.

## Summary

✅ **Authentication:** Email/password via Firebase  
✅ **User Profiles:** Firestore with automatic migration  
✅ **Session Persistence:** Built-in Firebase session management  
✅ **Route Protection:** ProtectedRoute component  
✅ **Email Verification:** Required on registration  
✅ **Password Reset:** Firebase email service  

Your DCS Companion is now production-ready with enterprise-grade authentication!
