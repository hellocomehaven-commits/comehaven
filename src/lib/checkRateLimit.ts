// src/lib/checkRateLimit.ts (Versi Lengkap & Diperbaiki)

import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

// 1. Inisialisasi Redis Client (Menggunakan environment variables)
// Pastikan UPSTASH_REDIS_REST_URL dan UPSTASH_REDIS_REST_TOKEN sudah diatur di Vercel!
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// --- DEBUGGING CONSOLE START ---
// (Bagus untuk mengecek apakah Vercel membaca environment variables)
console.log("--- DEBUGGING UPSTASH CONNECTION ---");
console.log("URL:", process.env.UPSTASH_REDIS_REST_URL ? "URL Ditemukan" : "URL TIDAK DITEMUKAN");
console.log("TOKEN:", process.env.UPSTASH_REDIS_REST_TOKEN ? "Token Ditemukan" : "TOKEN TIDAK DITEMUKAN");
console.log("----------------------------------");
// --- DEBUGGING CONSOLE END ---

// 2. Konfigurasi Rate Limiter (JAGOANNYA ADA DI SINI!)
// Ini adalah variabel 'ratelimit' yang dicari-cari oleh TypeScript!
const ratelimit = new Ratelimit({
  redis: redis, // Menggunakan koneksi redis di atas
  limiter: Ratelimit.slidingWindow(5, '60 s'), // 5 request per 60 detik
  analytics: true,
  prefix: '@upstash/ratelimit', 
});

/**
 * Mengecek Rate Limit menggunakan Upstash Redis.
 * @param identifier IP address dari client
 * @returns {Promise<boolean>} true jika melebihi batas (Limit Exceeded)
 */
export async function checkRateLimit(identifier: string): Promise<boolean> {
  
  // PERBAIKAN: Validasi identifier agar tidak string kosong
  if (!identifier || identifier.trim() === '') {
    // Izinkan request jika IP tidak valid/kosong, atau Anda bisa memilih untuk memblokirnya
    return false; 
  }
  
  // Baris untuk mengabaikan 127.0.0.1 bisa kamu tambahkan di sini jika perlu
  // if (identifier === '127.0.0.1') return false;

  try {
    // Sekarang 'ratelimit' (dari baris 21) sudah dikenal!
    const { success } = await ratelimit.limit(identifier);
    
    // Kembalikan true jika limit terlampaui (success === false)
    return !success; 
  } catch (error) {
    // FAIL-OPEN MODE: Jika Redis gagal, izinkan request
    console.error("REDIS RATE LIMITER FAILED (FAIL-OPEN MODE)", error);
    return false; 
  }
}