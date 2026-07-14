import { useState } from "react";
import { Loader2, Plus, UploadCloud, X } from "lucide-react";
import type { LanguageBar, Project, ProjectCategory, ProjectInput } from "@/lib/types";
import { fileToBase64 } from "@/lib/toBase64";
import { ImageCropperModal } from "./ImageCropperModal";

const CATEGORIES: ProjectCategory[] = ["web", "cybersec", "design"];
const BAR_COLORS = ["#00ffcc", "#0070f3", "#f85149", "#e3b341", "#a78bfa", "#3fb950"];

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

  // Raw file picked by the user, staged for the crop modal before it's
  // resized/compressed and turned into the final base64 data URI.
  const [cropTarget, setCropTarget] = useState<
    { kind: "cover" } | { kind: "screen"; replaceIndex?: number } | null
  >(null);
  const [cropSrc, setCropSrc] = useState<string | null>(null);

  const set = <K extends keyof ProjectInput>(key: K, value: ProjectInput[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  // Raw upload cap before cropping/compression — generous since the cropper
  // downsizes and re-encodes the image afterwards to fit Firestore's limit.
  const MAX_UPLOAD_BYTES = 15_000_000;

  const openCropper = async (file: File, target: { kind: "cover" } | { kind: "screen"; replaceIndex?: number }) => {
    setUploadError(null);
    if (file.size > MAX_UPLOAD_BYTES) {
      setUploadError("Image too large — please use one under 15MB.");
      return;
    }
    const raw = await fileToBase64(file);
    setCropSrc(raw);
    setCropTarget(target);
  };

  const handleCropSave = (croppedDataUrl: string) => {
    if (cropTarget?.kind === "cover") {
      set("imageUrl", croppedDataUrl);
    } else if (cropTarget?.kind === "screen") {
      if (cropTarget.replaceIndex !== undefined) {
        set(
          "screens",
          form.screens.map((s, i) => (i === cropTarget.replaceIndex ? croppedDataUrl : s))
        );
      } else {
        set("screens", [...form.screens, croppedDataUrl]);
      }
    }
    setCropSrc(null);
    setCropTarget(null);
  };

  const removeScreen = (idx: number) =>
    set("screens", form.screens.filter((_, i) => i !== idx));

  const addBar = () =>
    set("bars", [
      ...form.bars,
      { label: "", pct: 0, color: BAR_COLORS[form.bars.length % BAR_COLORS.length] },
    ]);

  const updateBar = (idx: number, patch: Partial<LanguageBar>) =>
    set(
      "bars",
      form.bars.map((b, i) => (i === idx ? { ...b, ...patch } : b))
    );

  const removeBar = (idx: number) =>
    set("bars", form.bars.filter((_, i) => i !== idx));

  const normalizeUrl = (url: string) => {
    const trimmed = url.trim();
    if (!trimmed) return trimmed;
    return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tech = techInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    await onSubmit({ ...form, tech, liveUrl: normalizeUrl(form.liveUrl) });
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
            placeholder="foundit-biu.vercel.app"
            className="px-3 py-2.5 rounded-lg outline-none"
            style={inputStyle}
          />
          <p style={{ fontSize: "0.68rem", color: "#8b949e" }}>
            https:// is added automatically if you leave it out.
          </p>
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
        <p style={{ fontSize: "0.68rem", color: "#8b949e" }}>
          Shown as tags. For the stylized percentage bars, use "Language Breakdown" below.
        </p>
      </div>

      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <label style={labelStyle}>Language / Tech Breakdown</label>
          <button
            type="button"
            onClick={addBar}
            className="flex items-center gap-1 text-xs font-semibold"
            style={{ color: "#00ffcc" }}
          >
            <Plus size={13} /> Add row
          </button>
        </div>
        {form.bars.length === 0 && (
          <p style={{ fontSize: "0.72rem", color: "#8b949e" }}>
            No breakdown yet — add rows like "TypeScript 62%" to show a stylized percentage bar on the case study page.
          </p>
        )}
        <div className="flex flex-col gap-2">
          {form.bars.map((bar, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                value={bar.label}
                onChange={(e) => updateBar(i, { label: e.target.value })}
                placeholder="TypeScript"
                className="flex-1 px-3 py-2 rounded-lg outline-none text-sm"
                style={inputStyle}
              />
              <input
                type="number"
                min={0}
                max={100}
                value={bar.pct}
                onChange={(e) => updateBar(i, { pct: Math.max(0, Math.min(100, Number(e.target.value))) })}
                className="w-20 px-3 py-2 rounded-lg outline-none text-sm"
                style={inputStyle}
              />
              <span style={{ fontSize: "0.8rem", color: "#8b949e" }}>%</span>
              <input
                type="color"
                value={bar.color}
                onChange={(e) => updateBar(i, { color: e.target.value })}
                className="w-8 h-8 rounded cursor-pointer"
                style={{ border: "1px solid rgba(0,255,204,0.2)", background: "transparent" }}
              />
              <button
                type="button"
                onClick={() => removeBar(i)}
                className="p-1.5 rounded-lg flex-shrink-0"
                style={{ background: "rgba(248,81,73,0.1)", color: "#f85149" }}
                aria-label="Remove row"
              >
                <X size={13} />
              </button>
            </div>
          ))}
        </div>
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
            <div className="relative group">
              <img
                src={form.imageUrl}
                alt="Cover preview"
                className="w-20 h-14 object-cover rounded-lg"
                style={{ border: "1px solid rgba(0,255,204,0.2)" }}
              />
              <button
                type="button"
                onClick={() => {
                  setCropSrc(form.imageUrl);
                  setCropTarget({ kind: "cover" });
                }}
                className="absolute inset-0 flex items-center justify-center rounded-lg text-[0.6rem] font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: "rgba(0,0,0,0.55)", color: "#00ffcc" }}
              >
                Re-crop
              </button>
            </div>
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
              onChange={(e) => {
                if (e.target.files?.[0]) openCropper(e.target.files[0], { kind: "cover" });
                e.target.value = "";
              }}
            />
          </label>
        </div>
        <p style={{ fontSize: "0.68rem", color: "#8b949e" }}>
          Up to 15MB — you'll crop and position it next, then it's compressed automatically to fit.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label style={labelStyle}>Additional Screenshots</label>
        <div className="flex flex-wrap gap-3">
          {form.screens.map((src, i) => (
            <div key={i} className="relative group">
              <img
                src={src}
                alt={`Screen ${i + 1}`}
                className="w-24 h-16 object-cover rounded-lg"
                style={{ border: "1px solid rgba(0,255,204,0.2)" }}
              />
              <button
                type="button"
                onClick={() => {
                  setCropSrc(src);
                  setCropTarget({ kind: "screen", replaceIndex: i });
                }}
                className="absolute inset-0 flex items-center justify-center rounded-lg text-[0.6rem] font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: "rgba(0,0,0,0.55)", color: "#00ffcc" }}
              >
                Re-crop
              </button>
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
              onChange={(e) => {
                if (e.target.files?.[0]) openCropper(e.target.files[0], { kind: "screen" });
                e.target.value = "";
              }}
            />
          </label>
        </div>
      </div>

      {uploadError && (
        <p className="text-xs" style={{ color: "#f85149" }}>
          {uploadError}
        </p>
      )}

      {cropSrc && (
        <ImageCropperModal
          src={cropSrc}
          aspect={cropTarget?.kind === "cover" ? 16 / 9 : 16 / 10}
          onCancel={() => {
            setCropSrc(null);
            setCropTarget(null);
          }}
          onSave={handleCropSave}
        />
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
