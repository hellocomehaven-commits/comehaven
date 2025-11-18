// src/lib/checkRateLimit.ts (MODE DEBUGGING LOKAL)

// ... (impor Redis dan Ratelimit) ...

export async function checkRateLimit(identifier: string): Promise<boolean> {
  // PENTING: Untuk testing, JANGAN abaikan IP lokal 127.0.0.1
  // if (!identifier || identifier === '127.0.0.1') return false; // <--- BARIS INI DIKOMENTARI ATAU DIHAPUS

  // ... (lanjutan kode Ratelimit) ...

  try {
    const { success } = await ratelimit.limit(identifier);
    return !success; 
  } catch (error) {
    // ...
    return false; 
  }
}