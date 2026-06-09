import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, writeBatch } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';

// Import data files
import staffData from '../src/data/staffDirectory';
import kbData from '../src/data/dcsKnowledgeBase';
import announcementsData from '../src/data/announcementsPanel';
import eventsData from '../src/data/eventRoster';

// Initialize Firebase with your config
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Map of collection names to their data
const collections = {
  staff: staffData,
  knowledgeBase: kbData,
  announcements: announcementsData,
  events: eventsData,
} as const;

async function migrateData() {
  try {
    const batch = writeBatch(db);
    let totalDocs = 0;

    // Process each collection
    for (const [collectionName, documents] of Object.entries(collections)) {
      console.log(`\nProcessing collection: ${collectionName}`);
      
      for (const [docId, docData] of Object.entries(documents)) {
        const docRef = doc(db, collectionName, docId);
        batch.set(docRef, {
          ...docData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
        totalDocs++;
        process.stdout.write(`.`);
      }
    }

    console.log(`\n\nCommitting ${totalDocs} documents to Firestore...`);
    await batch.commit();
    console.log('✅ Data migration completed successfully!');
  } catch (error) {
    console.error('❌ Error migrating data:', error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

// Run the migration
migrateData();
