# DCS Companion - Installation Guide

Step-by-step guide to get DCS Companion authentication system running. **Estimated time: 50 minutes**

## Prerequisites

- Node.js 18+ installed
- Firebase account (free at https://firebase.google.com)
- Text editor (VS Code recommended)
- Terminal/Command Prompt

## Step 1: Install Dependencies (5 minutes)

Open terminal in project root and run:

```bash
npm install
```

This installs:
- Firebase (authentication & Firestore)
- React, React Router
- Tailwind CSS
- Development tools

Wait for completion. You should see no major errors.

## Step 2: Create Firebase Project (15 minutes)

1. Go to https://console.firebase.google.com
2. Click **"Create Project"**
3. Project name: `dcs-companion` (or your choice)
4. Disable Google Analytics (optional)
5. Click **"Create Project"**
6. Wait 1-2 minutes for project creation

You should now see your Firebase dashboard.

## Step 3: Enable Authentication (5 minutes)

In Firebase Console:

1. Left sidebar → **Build** → **Authentication**
2. Click **"Get Started"**
3. Select **Email/Password**
4. Toggle **"Email/Password"** to ON
5. Click **"Save"**

Authentication is now enabled!

## Step 4: Create Firestore Database (5 minutes)

In Firebase Console:

1. Left sidebar → **Build** → **Firestore Database**
2. Click **"Create Database"**
3. Choose region (closest to you)
4. Select **"Start in test mode"**
5. Click **"Create"**

Wait a few seconds for database creation.

## Step 5: Get Firebase Configuration (5 minutes)

In Firebase Console:

1. Click gear icon (top-left) → **Project Settings**
2. Scroll down to **"Your apps"** section
3. You should see a web app. If not:
   - Click **"Add app"** → **Web**
   - Copy just the configuration
4. You need these values:
   - `apiKey`
   - `authDomain`
   - `projectId`
   - `appId`

Keep this tab open or copy these values somewhere.

## Step 6: Configure Environment (2 minutes)

In project root, create file `.env.local`:

```bash
# Create .env.local (same folder as package.json)
VITE_FIREBASE_API_KEY=YOUR_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
VITE_FIREBASE_APP_ID=YOUR_APP_ID
```

Replace `YOUR_*` with values from Step 5.

**Important:** `.env.local` is already in `.gitignore` - never commit it!

## Step 7: Deploy Firestore Rules (5 minutes)

In Firebase Console:

1. Go to **Firestore Database** → **Rules** tab
2. Delete all existing text
3. Copy **entire content** from `FIREBASE_RULES.md` file
4. Paste into the Rules editor
5. Click **"Publish"**

This secures your database!

## Step 8: Start Development Server (1 minute)

In terminal, from project root:

```bash
npm run dev
```

You should see:
```
VITE v7.2.2  ready in 123 ms

➜  Local:   http://localhost:5173/
```

Open http://localhost:5173 in browser.

## Step 9: Test the System (10 minutes)

### Test Registration

1. Click **"Sign up"** link
2. Enter:
   - Name: `Test User`
   - Email: `test@dubbocs.edu.au`
   - Password: `test123456`
3. Click **"Create Account"**
4. Should see "Account Created!" message
5. Check your email inbox
   - Look for verification link
   - Click the link to verify
6. You should see "Email Verified" notification

### Test Login

1. You're now at dashboard
2. Click **My Account** dropdown
3. Click **"Sign Out"**
4. You're back at login page
5. Enter email: `test@dubbocs.edu.au`
6. Enter password: `test123456`
7. Click **"Sign In"**
8. Should see dashboard!

### Verify Firestore Data

1. Go to Firebase Console
2. **Firestore Database** → **Data** tab
3. You should see `users` collection with your test user
4. Click user document to see profile data

## Step 10: Deploy to Production (Optional - 20 minutes)

### Vercel

1. Push code to GitHub
2. Go to https://vercel.com
3. Import your repository
4. Add environment variables:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_APP_ID`
5. Click Deploy

### Netlify

1. Push code to GitHub
2. Go to https://netlify.com
3. Import your repository
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Add same environment variables
7. Deploy

### Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize
firebase init hosting

# Deploy
npm run build
firebase deploy
```

## Troubleshooting

### Issue: npm install fails

```bash
# Clear npm cache
npm cache clean --force

# Try again
npm install
```

### Issue: "Missing environment variables" error

1. Create `.env.local` file
2. Verify all 4 variables are present
3. No extra spaces or quotes
4. Restart dev server: `npm run dev`

### Issue: "Firebase project not found"

1. Check `VITE_FIREBASE_PROJECT_ID` is correct
2. Verify Firebase project exists
3. Check you're logged into Firebase Console
4. Copy values again from Firebase Settings

### Issue: "Email verification not received"

1. Check spam/promotions folder
2. Click "Resend" in profile
3. Verify `@dubbocs.edu.au` domain is correct
4. Check Firebase email settings

### Issue: "Firestore permission denied"

1. Go to Firebase → Firestore → Rules
2. Verify rules are published
3. Ensure user document exists
4. Check security rules in `FIREBASE_RULES.md`

### Issue: "Blank screen or errors in console"

1. Open browser DevTools: **F12**
2. Click **Console** tab
3. Look for red errors
4. Check:
   - `.env.local` exists with all 4 variables
   - `npm install` completed successfully
   - Dev server is running (`npm run dev`)

## Next Steps

✅ System is now running locally!

### For Development
- Keep `npm run dev` running
- Make changes to code
- Browser auto-refreshes
- Check console for errors

### For Multiple Developers
- Each developer gets their own `.env.local`
- Credentials in `.env.local` (never in git)
- Share `.env.example` in git

### For Teams
- Create Firebase project for team
- Each env (dev/staging/prod) has own credentials
- Rotate credentials regularly

### For Production
- Read `AUTH_SETUP.md` → Production Deployment section
- Update Firestore rules (test mode → production)
- Enable additional security features
- Set up monitoring

## File Checklist

Before starting, verify you have:

- ✅ `package.json` - project config
- ✅ `.env.example` - template (in repo)
- ✅ `.env.local` - your secrets (NOT in repo)
- ✅ `src/contexts/AuthContext.tsx` - auth logic
- ✅ `src/services/firebaseClient.ts` - Firebase config
- ✅ `src/pages/LoginPage.tsx` - login UI
- ✅ `AUTH_SETUP.md` - detailed guide
- ✅ `FIREBASE_RULES.md` - security rules

## Command Reference

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Hosting Comparison

| Platform | Pros | Cons |
|----------|------|------|
| **Vercel** | Easy GitHub integration, instant deploys | Limited free tier |
| **Netlify** | Great UI, functions support | Slightly slower |
| **Firebase** | Same provider as backend, CDN | More setup |
| **GitHub Pages** | Free, simple | Firebase won't work |

For Firebase auth, avoid GitHub Pages!

## Support

- Firebase Docs: https://firebase.google.com/docs/firestore
- React Router Docs: https://reactrouter.com
- Tailwind CSS: https://tailwindcss.com
- Local: See `AUTH_SETUP.md` troubleshooting

---

**That's it!** Your DCS Companion is ready to use. 🎉

Next: Customize for your organization in `AUTH_SETUP.md`
