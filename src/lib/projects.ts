import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import type { Project, ProjectInput } from "./types";

const COLLECTION = "projects";

/**
 * Subscribes to the public `projects` collection in Firestore, ordered newest
 * first. Calls `cb` with an empty array (not an error) when Firebase isn't
 * configured, so the public site can render its empty state instead of crashing.
 */
export function subscribeToProjects(
  cb: (projects: Project[]) => void,
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
        } as Project;
      });
      cb(items);
    },
    (error) => {
      console.error("Failed to load projects from Firestore:", error);
      onError?.(error);
      cb([]);
    }
  );
}

export async function createProject(data: ProjectInput) {
  if (!db) throw new Error("Firestore is not configured — check your Firebase env vars.");
  return addDoc(collection(db, COLLECTION), {
    ...data,
    createdAt: serverTimestamp(),
  });
}

export async function updateProject(id: string, data: Partial<ProjectInput>) {
  if (!db) throw new Error("Firestore is not configured — check your Firebase env vars.");
  return updateDoc(doc(db, COLLECTION, id), data);
}

export async function deleteProject(id: string) {
  if (!db) throw new Error("Firestore is not configured — check your Firebase env vars.");
  return deleteDoc(doc(db, COLLECTION, id));
}
