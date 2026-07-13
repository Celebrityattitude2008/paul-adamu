import { useState } from "react";
import { Loader2, UploadCloud, X } from "lucide-react";
import type { Project, ProjectCategory, ProjectInput } from "@/lib/types";
import { fileToBase64 } from "@/lib/toBase64";

const CATEGORIES: ProjectCategory[] = ["web", "cybersec", "design"];

const inputStyle: React.CSSProperties = {
  background: "#21262d",
  border: "1px solid rgba(0,255,204,0.15)",
  color: "#f0f6fc",
  fontFamily: "'Inter', sans-serif",
  fontSize: "0.88rem",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: "0.65rem",
  color: "#8b949e",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
};

function emptyForm(): ProjectInput {
  return {
    slug: "",
    category: "web",
    title: "",
    description: "",
    longDescription: "",
    tag: "",
    imageUrl: "",
    featured: false,
    tech: [],
    bars: [],
    liveUrl: "",
    year: String(new Date().getFullYear()),
    role: "",
    screens: [],
  };
}

export function ProjectForm({
  initial,
  onSubmit,
  onCancel,
  submitting,
}: {
  initial?: Project;
  onSubmit: (data: ProjectInput) => Promise<void>;
  onCancel: () => void;
  submitting: boolean;
}) {
  const [form, setForm] = useState<ProjectInput>(
    initial
      ? {
          slug: initial.slug,
          category: initial.category,
          title: initial.title,
          description: initial.description,
          longDescription: initial.longDescription,
          tag: initial.tag,
          imageUrl: initial.imageUrl,
          featured: initial.featured,
          tech: initial.tech,
          bars: initial.bars ?? [],
          liveUrl: initial.liveUrl,
          year: initial.year,
          role: initial.role,
          screens: initial.screens ?? [],
        }
      : emptyForm()
  );
  const [techInput, setTechInput] = useState(initial?.tech.join(", ") ?? "");
  const [uploadError, setUploadError] = useState<string | null>(null);

  const set = <K extends keyof ProjectInput>(key: K, value: ProjectInput[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const MAX_BYTES = 700_000; // keep well under Firestore's 1MB document limit

  const handleCoverUpload = async (file: File) => {
    setUploadError(null);
    if (file.size > MAX_BYTES) {
      setUploadError("Image too large — please use one under ~700KB.");
      return;
    }
    const base64 = await fileToBase64(file);
    set("imageUrl", base64);
  };

  const handleScreenUpload = async (file: File) => {
    setUploadError(null);
    if (file.size > MAX_BYTES) {
      setUploadError("Image too large — please use one under ~700KB.");
      return;
    }
    const base64 = await fileToBase64(file);
    set("screens", [...form.screens, base64]);
  };

  const removeScreen = (idx: number) =>
    set("screens", form.screens.filter((_, i) => i !== idx));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tech = techInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    await onSubmit({ ...form, tech });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 p-6 rounded-2xl"
      style={{ background: "#161b22", border: "1px solid rgba(0,255,204,0.12)" }}
    >
      <div className="grid md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label style={labelStyle}>Title</label>
          <input
            required
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            className="px-3 py-2.5 rounded-lg outline-none"
            style={inputStyle}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label style={labelStyle}>Slug</label>
          <input
            required
            value={form.slug}
            onChange={(e) => set("slug", e.target.value)}
            className="px-3 py-2.5 rounded-lg outline-none"
            style={inputStyle}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="flex flex-col gap-1.5">
          <label style={labelStyle}>Category</label>
          <select
            value={form.category}
            onChange={(e) => set("category", e.target.value as ProjectCategory)}
            className="px-3 py-2.5 rounded-lg outline-none"
            style={inputStyle}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label style={labelStyle}>Tag</label>
          <input
            required
            value={form.tag}
            onChange={(e) => set("tag", e.target.value)}
            placeholder="e.g. Web Platform"
            className="px-3 py-2.5 rounded-lg outline-none"
            style={inputStyle}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label style={labelStyle}>Year</label>
          <input
            required
            value={form.year}
            onChange={(e) => set("year", e.target.value)}
            className="px-3 py-2.5 rounded-lg outline-none"
            style={inputStyle}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label style={labelStyle}>Short Description</label>
        <textarea
          required
          rows={2}
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          className="px-3 py-2.5 rounded-lg outline-none resize-none"
          style={inputStyle}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label style={labelStyle}>Long Description</label>
        <textarea
          required
          rows={4}
          value={form.longDescription}
          onChange={(e) => set("longDescription", e.target.value)}
          className="px-3 py-2.5 rounded-lg outline-none resize-none"
          style={inputStyle}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label style={labelStyle}>Role</label>
          <input
            required
            value={form.role}
            onChange={(e) => set("role", e.target.value)}
            className="px-3 py-2.5 rounded-lg outline-none"
            style={inputStyle}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label style={labelStyle}>Live URL</label>
          <input
            required
            value={form.liveUrl}
            onChange={(e) => set("liveUrl", e.target.value)}
            className="px-3 py-2.5 rounded-lg outline-none"
            style={inputStyle}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label style={labelStyle}>Tech (comma separated)</label>
        <input
          value={techInput}
          onChange={(e) => setTechInput(e.target.value)}
          placeholder="React, TypeScript, Firebase"
          className="px-3 py-2.5 rounded-lg outline-none"
          style={inputStyle}
        />
      </div>

      <label className="flex items-center gap-2 text-sm" style={{ color: "#f0f6fc" }}>
        <input
          type="checkbox"
          checked={form.featured}
          onChange={(e) => set("featured", e.target.checked)}
        />
        Featured on homepage
      </label>

      <div className="flex flex-col gap-2">
        <label style={labelStyle}>Cover Image</label>
        <div className="flex items-center gap-4">
          {form.imageUrl && (
            <img
              src={form.imageUrl}
              alt="Cover preview"
              className="w-20 h-14 object-cover rounded-lg"
              style={{ border: "1px solid rgba(0,255,204,0.2)" }}
            />
          )}
          <label
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm cursor-pointer"
            style={{ background: "rgba(0,255,204,0.08)", border: "1px solid rgba(0,255,204,0.25)", color: "#00ffcc" }}
          >
            <UploadCloud size={16} />
            {form.imageUrl ? "Replace image" : "Upload image"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleCoverUpload(e.target.files[0])}
            />
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label style={labelStyle}>Additional Screenshots</label>
        <div className="flex flex-wrap gap-3">
          {form.screens.map((src, i) => (
            <div key={i} className="relative">
              <img
                src={src}
                alt={`Screen ${i + 1}`}
                className="w-24 h-16 object-cover rounded-lg"
                style={{ border: "1px solid rgba(0,255,204,0.2)" }}
              />
              <button
                type="button"
                onClick={() => removeScreen(i)}
                className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center"
                style={{ background: "#f85149", color: "#fff" }}
              >
                <X size={12} />
              </button>
            </div>
          ))}
          <label
            className="flex items-center justify-center gap-1 w-24 h-16 rounded-lg text-xs cursor-pointer"
            style={{ background: "rgba(0,255,204,0.06)", border: "1px dashed rgba(0,255,204,0.3)", color: "#00ffcc" }}
          >
            <UploadCloud size={14} /> Add
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleScreenUpload(e.target.files[0])}
            />
          </label>
        </div>
      </div>

      {uploadError && (
        <p className="text-xs" style={{ color: "#f85149" }}>
          {uploadError}
        </p>
      )}

      <div className="flex gap-3 justify-end pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 rounded-lg text-sm font-semibold"
          style={{ background: "transparent", border: "1px solid rgba(240,246,252,0.2)", color: "#f0f6fc" }}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting || !form.imageUrl}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold disabled:opacity-50"
          style={{ background: "#00ffcc", color: "#0d1117" }}
        >
          {submitting && <Loader2 size={14} className="animate-spin" />}
          {initial ? "Save Changes" : "Create Project"}
        </button>
      </div>
    </form>
  );
}
