import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

// Get environment variables with fallbacks
const env = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
  useEmulator: import.meta.env.VITE_USE_FIREBASE_EMULATOR === 'true',
};

// Validate required environment variables in production
const isProduction = import.meta.env.PROD;
const missingEnvVars = Object.entries(env)
  .filter(([key, value]) => key !== 'useEmulator' && !value)
  .map(([key]) => key);

if (missingEnvVars.length > 0) {
  const errorMsg = `[Firebase] Missing required environment variables: ${missingEnvVars.join(', ')}`;
  
  if (isProduction) {
    console.error(errorMsg);
    // In production, we might want to show a user-friendly error
    if (typeof window !== 'undefined') {
      const errorDiv = document.createElement('div');
      errorDiv.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background: #f8d7da;
        color: #721c24;
        padding: 1rem;
        text-align: center;
        z-index: 10000;
        font-family: system-ui, -apple-system, sans-serif;
      `;
      errorDiv.textContent = 'Configuration error. Please contact support.';
      document.body.prepend(errorDiv);
    }
  } else {
    console.warn(`${errorMsg}. Please add them to .env.local.`);
  }
}

const firebaseConfig = {
  apiKey: env.apiKey,
  authDomain: env.authDomain,
  projectId: env.projectId,
  appId: env.appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
