// src/lib/rateLimit.ts (VERSI FINAL: PRODUCTION GRADE DENGAN UPSTASH REDIS)

import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

// 1. Inisialisasi Redis Client (Menggunakan environment variables)
// Pastikan UPSTASH_REDIS_REST_URL dan UPSTASH_REDIS_REST_TOKEN diset di .env.local
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// --- DEBUGGING CONSOLE START ---
console.log("--- DEBUGGING UPSTASH CONNECTION ---");
console.log("URL:", process.env.UPSTASH_REDIS_REST_URL);
console.log("TOKEN:", process.env.UPSTASH_REDIS_REST_TOKEN ? "Token Ditemukan (Disensor)" : "TOKEN TIDAK DITEMUKAN");
console.log("----------------------------------");
// --- DEBUGGING CONSOLE END ---

// 2. Konfigurasi Rate Limiter: 5 request per 60 detik (1 menit) per IP
const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, '60 s'), // Batas 5 request per 60 detik
  analytics: true,
  prefix: '@upstash/ratelimit', 
});

/**
 * Mengecek Rate Limit menggunakan Upstash Redis.
 * @param identifier IP address dari client
 * @returns {Promise<boolean>} true jika melebihi batas (Limit Exceeded)
 */
export async function checkRateLimit(identifier: string): Promise<boolean> {
  
  // PERBAIKAN KRUSIAL: VALIDASI IDENTIFIER
  // Mencegah error "ERR Command is not available: ''" jika IP address tidak terdeteksi (string kosong).
  if (!identifier || identifier.trim() === '') {
    return false; // Izinkan request jika IP tidak valid/kosong.
  }

  // Catatan: Baris pengabaian 127.0.0.1 sebelumnya Anda komentari untuk pengujian lokal.
  // Anda bisa mengembalikannya untuk production, tetapi saat ini dibiarkan dikomentari untuk debugging.

  try {
    const { success } = await ratelimit.limit(identifier);
    
    // Kembalikan true jika limit terlampaui (success === false)
    return !success; 
  } catch (error) {
    // FAIL-OPEN MODE: Jika Redis gagal (misalnya, error WRONGPASS), 
    // kita log error dan tetap izinkan request untuk mencegah downtime.
    console.error("REDIS RATE LIMITER FAILED (FAIL-OPEN MODE)", error);
    return false; 
  }
}