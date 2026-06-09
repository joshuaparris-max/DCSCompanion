import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  sendEmailVerification,
} from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth } from '../services/firebaseClient';
import {
  getUserProfile,
  createUserProfile,
  updateUserProfile,
  markMigrationCompleted,
  type UserProfile,
} from '../services/userProfileService';
import {
  buildProfilePartialFromLocal,
  clearMigratedLocalStorageKeys,
} from '../utils/localDataMigration';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  registerWithEmail: (
    email: string,
    password: string,
    fullName: string,
    role?: 'staff' | 'admin' | 'support',
    department?: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  resendVerificationEmail: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (currentUser) {
          setUser(currentUser);
          // Fetch user profile
          const userProfile = await getUserProfile(currentUser.uid);
          if (userProfile) {
            setProfile(userProfile);

            // Perform one-time data migration if needed
            if (!userProfile.migrationCompleted) {
              const { partial, keysToClear } = buildProfilePartialFromLocal();
              if (keysToClear.length > 0) {
                await updateUserProfile(currentUser.uid, partial);
                clearMigratedLocalStorageKeys(keysToClear);
                await markMigrationCompleted(currentUser.uid);
                // Update local profile state
                const updatedProfile = await getUserProfile(currentUser.uid);
                if (updatedProfile) setProfile(updatedProfile);
              }
            }
          }
        } else {
          setUser(null);
          setProfile(null);
        }
        setError(null);
      } catch (err) {
        console.error('Auth state change error:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const loginWithEmail = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user);
      const userProfile = await getUserProfile(result.user.uid);
      if (userProfile) {
        setProfile(userProfile);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to sign in';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const registerWithEmail = async (
    email: string,
    password: string,
    fullName: string,
    role: 'staff' | 'admin' | 'support' = 'staff',
    department?: string
  ) => {
    try {
      setLoading(true);
      setError(null);
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = result.user;

      // Create user profile
      const newProfile = await createUserProfile(newUser.uid, {
        email,
        displayName: fullName,
        role,
        department,
      });

      setUser(newUser);
      setProfile(newProfile);

      // Send verification email
      await sendEmailVerification(newUser);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to register';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      setError(null);
      await firebaseSignOut(auth);
      setUser(null);
      setProfile(null);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to sign out';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const sendPasswordReset = async (email: string) => {
    try {
      setError(null);
      await sendPasswordResetEmail(auth, email);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to send password reset';
      setError(errorMessage);
      throw err;
    }
  };

  const resendVerificationEmail = async () => {
    try {
      setError(null);
      if (!user) throw new Error('No user logged in');
      await sendEmailVerification(user);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to send verification email';
      setError(errorMessage);
      throw err;
    }
  };

  const refreshProfile = async () => {
    try {
      if (!user) throw new Error('No user logged in');
      const updatedProfile = await getUserProfile(user.uid);
      if (updatedProfile) {
        setProfile(updatedProfile);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to refresh profile';
      setError(errorMessage);
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        error,
        loginWithEmail,
        registerWithEmail,
        logout,
        sendPasswordReset,
        resendVerificationEmail,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
