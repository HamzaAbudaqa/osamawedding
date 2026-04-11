/**
 * Photo Storage Module
 *
 * Currently stores photo metadata + base64 data in localStorage.
 * Architected for easy migration to:
 *   - Supabase Storage (supabase.storage.from('wedding-photos').upload(...))
 *   - Firebase Storage (ref(storage, path).put(file))
 *   - AWS S3 (s3.upload({ Bucket, Key, Body }))
 *
 * To migrate: replace uploadPhoto() and getPhotos() with real API calls.
 * The component layer stays the same.
 */

const STORAGE_KEY = 'osama_joud_photos';

function getAll() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveAll(photos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
}

/**
 * Upload a photo file.
 * Returns a photo metadata object.
 */
export async function uploadPhoto(file, uploaderName = 'Anonymous Guest') {
  // Simulate upload latency
  await new Promise((resolve) => setTimeout(resolve, 800));

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const photo = {
        id: crypto.randomUUID(),
        url: reader.result,
        fileName: file.name,
        uploaderName,
        uploadedAt: new Date().toISOString(),
        width: 0,
        height: 0,
      };

      // Get image dimensions
      const img = new Image();
      img.onload = () => {
        photo.width = img.width;
        photo.height = img.height;
        const all = getAll();
        all.unshift(photo);
        saveAll(all);
        resolve(photo);
      };
      img.onerror = () => {
        const all = getAll();
        all.unshift(photo);
        saveAll(all);
        resolve(photo);
      };
      img.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function getPhotos() {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return getAll();
}

export async function deletePhoto(photoId) {
  const all = getAll().filter((p) => p.id !== photoId);
  saveAll(all);
}

// Demo photos with gradient placeholders
export const DEMO_PHOTOS = [
  { id: 'demo-1', url: null, uploaderName: 'Sarah Ahmed', uploadedAt: '2026-08-15T18:30:00Z', gradient: 'from-amber-900/40 to-gold/20' },
  { id: 'demo-2', url: null, uploaderName: 'Khalid Omar', uploadedAt: '2026-08-15T19:15:00Z', gradient: 'from-rose-900/30 to-amber-800/20' },
  { id: 'demo-3', url: null, uploaderName: 'Noor Khalil', uploadedAt: '2026-08-15T20:00:00Z', gradient: 'from-purple-900/30 to-gold/20' },
  { id: 'demo-4', url: null, uploaderName: 'Rami Hassan', uploadedAt: '2026-08-15T20:45:00Z', gradient: 'from-emerald-900/30 to-amber-800/20' },
  { id: 'demo-5', url: null, uploaderName: 'Dina Mansour', uploadedAt: '2026-08-15T21:30:00Z', gradient: 'from-blue-900/30 to-gold/20' },
  { id: 'demo-6', url: null, uploaderName: 'Youssef Ali', uploadedAt: '2026-08-15T22:00:00Z', gradient: 'from-amber-800/40 to-rose-900/20' },
];
