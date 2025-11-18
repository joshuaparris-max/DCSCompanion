# DCS Companion

A personal helper app for Dubbo Christian School IT/Library support staff.

## Features
- Home dashboard with editable Focus & Scripture, quick links (with pinning), DCS map, ICT snapshot, and daily priorities panel.
- DCS Knowledge Base with search, category filter, pin/favorite, expandable details, and import/export of favorites.
- Ask DCS (LLM) chat with Groq LLM integration, markdown answers, recent questions, and KB context.
- User settings (theme toggle, dark/light mode).

## Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/joshuaparris-max/DCSCompanion.git
cd DCSCompanion
npm install
```

### 2. Setup Firebase
See [INSTALLATION_GUIDE.md](./INSTALLATION_GUIDE.md) for detailed Firebase setup instructions.

Create `.env.local` in the project root:
```
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_GROQ_API_KEY=your-groq-key  # Optional: for Ask DCS LLM
```

### 3. Load Data into Firestore
**Important:** Real staff directories, internal KB, and sensitive data should NOT be in the repo code. Instead:

- Create a private admin script or spreadsheet to populate Firestore collections.
- **Sample data files** (`src/data/*.ts`) contain placeholders for development/testing.
- **Live data** is stored in Firestore collections (`kb`, `staff-directory`, etc.) protected by security rules.

**To load data into Firestore:**
1. Login to Firebase Console → Firestore Database.
2. Manually add documents to collections or use the Firestore emulator + import scripts.
3. Collections recommended:
   - `kb` — Knowledge Base items (type: "onboarding", "announcements", "resources", "tasks", "support", "events", "systems", "staff-directory")
   - `users/{uid}` — User profiles and preferences
4. See [FIREBASE_RULES.md](./FIREBASE_RULES.md) for security rules.

### 4. Run Dev Server
```bash
npm run dev
```

Open http://localhost:5173 and login with your Firebase account.

## Customization

### Add KB Items
1. **Via UI:** Login to the app → navigate to any KB page (e.g., Resource Booking) → click "Add" and fill in details.
   - Items are stored in Firestore and synced across all users.
   - Mark items as favorites (⭐) for quick access.

2. **Via Firestore Console:** 
   - Go to Firestore Database → `kb` collection.
   - Add a new document with fields:
     ```json
     {
       "title": "Item Title",
       "summary": "Short description",
       "body": "Full details",
       "type": "onboarding",  // or resources, tasks, etc.
       "category": "General",
       "createdAt": timestamp,
       "updatedAt": timestamp
     }
     ```

### Adjust Settings
- Theme toggle and preferences are in User Settings page.
- Change LLM model in `src/services/llmClient.ts` (currently uses Groq llama-3.3-70b-versatile).

## Security
- **Repository:** Kept private on GitHub to protect source code.
- **Sample Data:** Placeholder data in `src/data/*.ts` — real staff/KB data lives in Firestore only.
- **Environment Variables:** Never commit `.env.local` — use `.env.example` as a template and populate locally.
- **Firestore Rules:** Security rules restrict reads/writes to authenticated users. See [FIREBASE_RULES.md](./FIREBASE_RULES.md).
- **API Keys:** Store Groq API key in environment variables; consider server-side proxy for production to hide the key.

## Documentation
- [INSTALLATION_GUIDE.md](./INSTALLATION_GUIDE.md) — Step-by-step setup.
- [AUTH_SETUP.md](./AUTH_SETUP.md) — Authentication architecture.
- [FIREBASE_RULES.md](./FIREBASE_RULES.md) — Firestore security rules.
- [DEPLOYMENT.md](./DEPLOYMENT.md) — Deployment options (GitHub Pages, Vercel, etc.).

## Project Structure
```
src/
├── components/        # React components (KB, UI, Layout)
├── contexts/          # Auth context and state
├── data/              # Sample/placeholder data (not for real secrets)
├── features/          # Feature-specific components & hooks
├── lib/               # Utilities (storage, dates, etc.)
├── pages/             # Page components
├── services/          # Firebase, LLM, KB services
├── types/             # TypeScript types
└── utils/             # Helper functions
```

## Extending
- The codebase is modular and ready for future AI agent or workflow extensions.
- Add new KB pages by:
  1. Creating a new page component (import `KbListWithFavs` with a new `type` prop).
  2. Adding a route in `src/App.tsx`.
  3. Adding the route link in `src/components/Layout/Sidebar.tsx`.

---

*Built with Vite, React, TypeScript, Tailwind, Firebase, and Groq LLM.*
