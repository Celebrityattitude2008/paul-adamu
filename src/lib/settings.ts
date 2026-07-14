import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import type { SiteSettings } from "./types";

const COLLECTION = "settings";
const DOC_ID = "site";

export const DEFAULT_SETTINGS: SiteSettings = {
  nextReleaseDate: "2026-08-22",
};

/**
 * Subscribes to the public, singleton `settings/site` document. Falls back to
 * DEFAULT_SETTINGS when Firebase isn't configured or the doc doesn't exist yet,
 * so the homepage always has a countdown target.
 */
export function subscribeToSiteSettings(cb: (settings: SiteSettings) => void) {
  if (!db) {
    cb(DEFAULT_SETTINGS);
    return () => {};
  }

  return onSnapshot(
    doc(db, COLLECTION, DOC_ID),
    (snap) => {
      cb(snap.exists() ? { ...DEFAULT_SETTINGS, ...(snap.data() as Partial<SiteSettings>) } : DEFAULT_SETTINGS);
    },
    (error) => {
      console.error("Failed to load site settings from Firestore:", error);
      cb(DEFAULT_SETTINGS);
    }
  );
}

export async function updateSiteSettings(data: Partial<SiteSettings>) {
  if (!db) throw new Error("Firestore is not configured — check your Firebase env vars.");
  return setDoc(doc(db, COLLECTION, DOC_ID), data, { merge: true });
}
