import { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import { Loader2, X } from "lucide-react";
import { getCroppedImage, type CropPixels } from "@/lib/cropImage";

export function ImageCropperModal({
  src,
  aspect = 16 / 9,
  onCancel,
  onSave,
}: {
  src: string;
  aspect?: number;
  onCancel: () => void;
  onSave: (croppedDataUrl: string) => void;
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropPixels | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onCropComplete = useCallback((_area: unknown, areaPixels: CropPixels) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  const handleSave = async () => {
    if (!croppedAreaPixels) return;
    setSaving(true);
    setError(null);
    try {
      const result = await getCroppedImage(src, croppedAreaPixels);
      onSave(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to crop image.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)" }}
    >
      <div
        className="w-full max-w-lg flex flex-col gap-4 p-5 rounded-2xl"
        style={{ background: "#161b22", border: "1px solid rgba(0,255,204,0.2)" }}
      >
        <div className="flex items-center justify-between">
          <h3 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.95rem", color: "#f0f6fc" }}>
            Crop &amp; Position Image
          </h3>
          <button onClick={onCancel} className="p-1" style={{ color: "#8b949e" }} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="relative w-full rounded-xl overflow-hidden" style={{ height: 320, background: "#0d1117" }}>
          <Cropper
            image={src}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.65rem",
              color: "#8b949e",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Zoom
          </label>
          <input
            type="range"
            min={1}
            max={3}
            step={0.01}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <p style={{ fontSize: "0.72rem", color: "#8b949e" }}>
          Drag to reposition, use the slider to zoom. The area inside the frame is what gets saved.
        </p>

        {error && (
          <p className="text-xs" style={{ color: "#f85149" }}>
            {error}
          </p>
        )}

        <div className="flex gap-3 justify-end pt-1">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-lg text-sm font-semibold"
            style={{ background: "transparent", border: "1px solid rgba(240,246,252,0.2)", color: "#f0f6fc" }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || !croppedAreaPixels}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-50"
            style={{ background: "#00ffcc", color: "#0d1117" }}
          >
            {saving && <Loader2 size={14} className="animate-spin" />}
            Use This Crop
          </button>
        </div>
      </div>
    </div>
  );
}
