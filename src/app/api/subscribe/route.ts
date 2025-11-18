// app/api/subscribe/route.ts

import { NextResponse } from 'next/server';
import { z } from 'zod'; 
// Asumsi: checkRateLimit dan instance 'redis' diekspor dari lib/rateLimit.ts
import { checkRateLimit, redis } from '@/lib/rateLimit'; // <-- Impor instance 'redis'
import type { ZodError } from 'zod'; // Impor tipe untuk ZodError

// 1. Definisikan Skema Validasi Input (Zod)
const SubscribeSchema = z.object({
  email: z.string().email({ message: 'Alamat email tidak valid.' }),
});

// Fungsi untuk mendapatkan IP address client
function getIp(request: Request): string {
  const ip = request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip') || 
             '127.0.0.1'; 
  return ip.split(',')[0].trim();
}

// Handler POST untuk form berlangganan
export async function POST(request: Request) {
  const ip = getIp(request);
  let body;

  try {
    // 2. RATE LIMITING (Wajib menggunakan 'await')
    if (await checkRateLimit(ip)) { 
      console.warn(`RATE LIMIT: Permintaan dari IP ${ip} dibatasi (429).`);
      
      return NextResponse.json({ 
        error: 'Terlalu banyak permintaan. Silakan coba lagi nanti.' 
      }, { status: 429 }); 
    }

    // Ambil body JSON
    body = await request.json();

    // 3. VALIDASI INPUT ZOD
    const data = SubscribeSchema.parse(body);

    // --- LOGIC UTAMA: MENYIMPAN DATA KE UPSTASH REDIS ---
    
    // Simpan email, IP, dan timestamp ke List Redis bernama 'subscribers'.
    // List ini ideal untuk mencatat aliran event (seperti subscribe).
    await redis.lpush('subscribers', JSON.stringify({ 
        email: data.email, 
        ip: ip,
        timestamp: new Date().toISOString(),
    }));
    
    // Logging Aman: Mencatat sukses
    console.info(`[API/SUBSCRIBE] Success: Email ${data.email} berhasil didaftarkan ke Redis.`);

    // Kembalikan respons sukses
    return NextResponse.json({ 
      message: 'Berhasil berlangganan newsletter kami!',
    }, { status: 200 });

  } catch (error) {
    // 4. ERROR HANDLING KONSISTEN (400, 500)
    
    // a. Error Validasi Zod (Status 400: Bad Request)
    if (error instanceof z.ZodError) {
      console.error(`[API/SUBSCRIBE] Validasi Gagal (400) dari IP ${ip}:`, error.issues);
      
      return NextResponse.json({ 
        error: 'Data yang dikirimkan tidak valid.',
        details: error.flatten().fieldErrors 
      }, { status: 400 });
    }
    
    // b. Error Internal/Lainnya (Status 500: Internal Server Error)
    console.error(`[API/SUBSCRIBE] Kesalahan Server (500) dari IP ${ip}:`, error);
    return NextResponse.json({ 
      error: 'Terjadi kesalahan pada server. Mohon coba lagi nanti.' 
    }, { status: 500 });
  }
}

// Opsional: Untuk menangani CORS Preflight requests jika dibutuhkan
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}