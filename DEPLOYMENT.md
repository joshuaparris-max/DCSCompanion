# Deployment Guide - GitHub Pages + Firebase

## Setup Instructions

### 1. Get Your GitHub Username
Your GitHub Pages URL will be: `https://USERNAME.github.io/DCSCompanion/`

### 2. Configure Firebase

#### Add Authorized Domain
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your DCSCompanion project
3. Go to **Authentication** > **Settings** > **Authorized domains**
4. Click **Add domain**
5. Add: `https://USERNAME.github.io` (replace USERNAME with your actual GitHub username)

#### Update Firestore Security Rules (Optional)
The current rules already support GitHub Pages deployment. No changes needed if you're just deploying as-is.

### 3. Set GitHub Secrets

Go to your GitHub repository:
1. Navigate to **Settings** > **Secrets and variables** > **Actions**
2. Click **New repository secret** and add these 4 secrets:

| Secret Name | Value |
|---|---|
| `VITE_FIREBASE_API_KEY` | From Firebase Console > Project Settings |
| `VITE_FIREBASE_AUTH_DOMAIN` | From Firebase Console > Project Settings |
| `VITE_FIREBASE_PROJECT_ID` | From Firebase Console > Project Settings |
| `VITE_FIREBASE_APP_ID` | From Firebase Console > Project Settings |

**How to find these values:**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select DCSCompanion project
3. Click ⚙️ (Settings) > **Project settings**
4. Scroll to "Your apps" section
5. Copy the values from the Firebase config

### 4. Deploy

The GitHub Actions workflow will automatically:
- Trigger on every push to `main` branch
- Install dependencies
- Build the app with your Firebase credentials
- Deploy to GitHub Pages

Simply push to main:
```bash
git push origin main
```

Check deployment status at: **Actions** tab in your GitHub repository

### 5. Access Your App

Your app will be live at:
```
https://USERNAME.github.io/DCSCompanion/
```

## Troubleshooting

### Firebase Authentication Not Working
1. ✅ Verify your GitHub username domain is in Firebase > Authentication > Authorized domains
2. ✅ Check that all 4 secrets are set correctly in GitHub Actions
3. ✅ Check GitHub Actions workflow logs for build errors

### CORS Errors
- Usually means the domain isn't authorized in Firebase
- Add `https://USERNAME.github.io` to Firebase > Authentication > Authorized domains

### Build Fails
- Check GitHub Actions logs for the error
- Make sure all dependencies install: `npm ci`
- Verify TypeScript compiles: `npm run build` locally

### App Shows 404
- Make sure you're accessing: `https://USERNAME.github.io/DCSCompanion/`
- Not: `https://USERNAME.github.io/`

## Local Testing Before Deploy

Test the production build locally:

```bash
# Build locally with Firebase env vars
VITE_FIREBASE_API_KEY=your_key \
VITE_FIREBASE_AUTH_DOMAIN=your_domain \
VITE_FIREBASE_PROJECT_ID=your_project \
VITE_FIREBASE_APP_ID=your_app_id \
npm run build

# Preview the build
npm run preview
```

Visit: `http://localhost:4173/DCSCompanion/`

## Rollback

If deployment breaks:
1. Go to GitHub repository > **Settings** > **Pages**
2. Under "Build and deployment", you can select a previous deployment

Or revert the commit:
```bash
git revert HEAD
git push origin main
```

## Further Reading

- [GitHub Pages + Vite](https://vitejs.dev/guide/static-deploy.html#github-pages)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
