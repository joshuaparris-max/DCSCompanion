import { db } from './firebaseClient';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  getDocs,
} from 'firebase/firestore';

export type KbItem = {
  id?: string;
  title: string;
  summary?: string;
  body?: string;
  type: string;
  category?: string;
  tags?: string[];
  createdBy?: string;
  createdAt?: any;
  updatedAt?: any;
};

const USE_FIRESTORE = !!db;

export async function listKbItems(type: string): Promise<KbItem[]> {
  if (!USE_FIRESTORE) return [];
  const col = collection(db, 'kb');
  const q = query(col, where('type', '==', type), orderBy('updatedAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...(d.data() as any) }));
}

export function subscribeKbItems(type: string, cb: (items: KbItem[]) => void) {
  if (!USE_FIRESTORE) return () => {};
  const col = collection(db, 'kb');
  const q = query(col, where('type', '==', type), orderBy('updatedAt', 'desc'));
  const unsub = onSnapshot(q, snap => {
    const items = snap.docs.map(d => ({ id: d.id, ...(d.data() as any) }));
    cb(items);
  });
  return unsub;
}

export async function getKbItem(type: string, id: string): Promise<KbItem | null> {
  if (!USE_FIRESTORE) return null;
  const d = await getDoc(doc(db, 'kb', id));
  if (!d.exists()) return null;
  const data = d.data() as any;
  if (data.type !== type) return null;
  return { id: d.id, ...data } as KbItem;
}

export async function createKbItem(item: KbItem) {
  if (!USE_FIRESTORE) return null;
  const col = collection(db, 'kb');
  const res = await addDoc(col, {
    ...item,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return res.id;
}

export async function updateKbItem(id: string, changes: Partial<KbItem>) {
  if (!USE_FIRESTORE) return;
  const d = doc(db, 'kb', id);
  await updateDoc(d, { ...changes, updatedAt: serverTimestamp() } as any);
}

export async function deleteKbItem(id: string) {
  if (!USE_FIRESTORE) return;
  await deleteDoc(doc(db, 'kb', id));
}

// Per-user favorites support - stores an array of favorite KB ids on users/{uid}.favorites
export function subscribeUserFavorites(uid: string | null, cb: (favorites: string[]) => void) {
  if (!USE_FIRESTORE || !uid) {
    cb([]);
    return () => {};
  }
  const d = doc(db, 'users', uid);
  const unsub = onSnapshot(d, snap => {
    if (!snap.exists()) {
      cb([]);
      return;
    }
    const data = snap.data() as any;
    cb(Array.isArray(data.favorites) ? data.favorites : []);
  });
  return unsub;
}

export async function toggleFavorite(uid: string | null, kbId: string) {
  if (!USE_FIRESTORE || !uid) return;
  const userRef = doc(db, 'users', uid);
  const d = await getDoc(userRef);
  const data = d.exists() ? (d.data() as any) : {};
  const favs: string[] = Array.isArray(data.favorites) ? data.favorites : [];
  const isFav = favs.includes(kbId);
  const newFavs = isFav ? favs.filter(f => f !== kbId) : [...favs, kbId];
  await updateDoc(userRef, { favorites: newFavs });
}

export async function getUserFavorites(uid: string | null): Promise<string[]> {
  if (!USE_FIRESTORE || !uid) return [];
  const d = await getDoc(doc(db, 'users', uid));
  if (!d.exists()) return [];
  const data = d.data() as any;
  return Array.isArray(data.favorites) ? data.favorites : [];
}

export default {
  listKbItems,
  subscribeKbItems,
  getKbItem,
  createKbItem,
  updateKbItem,
  deleteKbItem,
  subscribeUserFavorites,
  toggleFavorite,
  getUserFavorites,
};
