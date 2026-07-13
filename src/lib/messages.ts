import {
  collection,
  deleteDoc,
  doc,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import type { ContactMessage, ContactMessageInput } from "./types";

const COLLECTION = "messages";

/**
 * Sends a message from the public "Encrypted Channel" contact form. Publicly
 * writable per firestore.rules (validated + size-capped), but only the admin
 * account can read the collection back.
 */
export async function sendMessage(data: ContactMessageInput) {
  if (!db) throw new Error("Firestore is not configured — check your Firebase env vars.");
  return addDoc(collection(db, COLLECTION), {
    ...data,
    read: false,
    createdAt: serverTimestamp(),
  });
}

/**
 * Subscribes to the `messages` collection (admin-only read per firestore.rules),
 * ordered newest first.
 */
export function subscribeToMessages(
  cb: (messages: ContactMessage[]) => void,
  onError?: (error: Error) => void
) {
  if (!db) {
    cb([]);
    return () => {};
  }

  const q = query(collection(db, COLLECTION), orderBy("createdAt", "desc"));

  return onSnapshot(
    q,
    (snapshot) => {
      const items = snapshot.docs.map((d) => {
        const data = d.data() as Record<string, unknown>;
        return {
          id: d.id,
          ...data,
          createdAt:
            (data.createdAt as { toMillis?: () => number } | undefined)?.toMillis?.() ??
            Date.now(),
        } as ContactMessage;
      });
      cb(items);
    },
    (error) => {
      console.error("Failed to load messages from Firestore:", error);
      onError?.(error);
      cb([]);
    }
  );
}

export async function markMessageRead(id: string, read: boolean) {
  if (!db) throw new Error("Firestore is not configured — check your Firebase env vars.");
  return updateDoc(doc(db, COLLECTION, id), { read });
}

export async function deleteMessage(id: string) {
  if (!db) throw new Error("Firestore is not configured — check your Firebase env vars.");
  return deleteDoc(doc(db, COLLECTION, id));
}
