export type ProjectCategory = "web" | "cybersec" | "design";

export interface LanguageBar {
  label: string;
  pct: number;
  color: string;
}

export interface Project {
  id: string;
  slug: string;
  category: ProjectCategory;
  title: string;
  description: string;
  longDescription: string;
  tag: string;
  /** Cover image — either a URL or a base64 data URI uploaded via the admin panel. */
  imageUrl: string;
  featured: boolean;
  tech: string[];
  bars: LanguageBar[];
  liveUrl: string;
  year: string;
  role: string;
  /** Extra screenshots — URLs or base64 data URIs. */
  screens: string[];
  createdAt?: number;
}

export type ProjectInput = Omit<Project, "id" | "createdAt">;

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: number;
}

export type ContactMessageInput = Pick<ContactMessage, "name" | "email" | "message">;
