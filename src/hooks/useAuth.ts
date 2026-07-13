import { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import { auth, firebaseEnabled, googleProvider } from "@/lib/firebase";

export const ADMIN_EMAIL =
  (import.meta.env.VITE_ADMIN_EMAIL as string | undefined)?.trim().toLowerCase() ||
  "pauladamu600@gmail.com";

interface AuthState {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  error: string | null;
  signIn: () => Promise<void>;
  logOut: () => Promise<void>;
}

export function useAuth(): AuthState {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const isAdmin = !!user && user.email?.trim().toLowerCase() === ADMIN_EMAIL;

  const signIn = async () => {
    setError(null);
    if (!auth || !firebaseEnabled) {
      setError("Firebase isn't configured yet — add the Firebase env vars first.");
      return;
    }
    try {
      await signInWithPopup(auth, googleProvider as GoogleAuthProvider);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Sign-in failed.");
    }
  };

  const logOut = async () => {
    if (auth) await signOut(auth);
  };

  return { user, loading, isAdmin, error, signIn, logOut };
}
