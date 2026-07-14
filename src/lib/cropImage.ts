export interface CropPixels {
  x: number;
  y: number;
  width: number;
  height: number;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener("load", () => resolve(img));
    img.addEventListener("error", (e) => reject(e));
    img.crossOrigin = "anonymous";
    img.src = src;
  });
}

/**
 * Crops `src` to `crop` (in source-image pixel space), downsizes it so its
 * longest edge is at most `maxDimension`, and re-encodes as JPEG — shrinking
 * the quality until the result fits under `maxBytes`. Returns a base64 data URI.
 */
export async function getCroppedImage(
  src: string,
  crop: CropPixels,
  { maxDimension = 1600, maxBytes = 700_000 }: { maxDimension?: number; maxBytes?: number } = {}
): Promise<string> {
  const image = await loadImage(src);

  const scale = Math.min(1, maxDimension / Math.max(crop.width, crop.height));
  const outWidth = Math.round(crop.width * scale);
  const outHeight = Math.round(crop.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = outWidth;
  canvas.height = outHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not supported in this browser.");

  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    outWidth,
    outHeight
  );

  let quality = 0.9;
  let dataUrl = canvas.toDataURL("image/jpeg", quality);

  const byteSize = (uri: string) => Math.round((uri.length * 3) / 4);

  while (byteSize(dataUrl) > maxBytes && quality > 0.35) {
    quality -= 0.1;
    dataUrl = canvas.toDataURL("image/jpeg", quality);
  }

  if (byteSize(dataUrl) > maxBytes) {
    throw new Error("Image is still too large after compression — try cropping a smaller area.");
  }

  return dataUrl;
}
