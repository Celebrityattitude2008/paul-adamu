/** Reads a File and resolves to a base64 data URI (e.g. "data:image/png;base64,...").
 * Firestore documents cap out at 1MB, so keep uploaded images reasonably small. */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error ?? new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}
