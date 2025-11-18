// src/actions/subscribe.ts (VERSI FINAL - FIX ERROR ZOD)

'use server';

import { z } from 'zod';
// Import POST handler dari API Route
import { POST as subscribeApiHandler } from '@/app/api/subscribe/route';

// 1. Definisikan Skema Zod
const SubscribeSchema = z.object({
  email: z.string().email({ message: 'Email tidak valid.' }),
});

// Server Action utama
export async function subscribeAction(formData: FormData) {
  // Ambil data dari FormData
  const email = formData.get('email');

  // Lakukan Validasi Cepat
  const validation = SubscribeSchema.safeParse({ email });

  if (!validation.success) {
    // FIX 1: Mengganti .errors dengan .issues
    return { 
        success: false, 
        message: validation.error.issues[0].message, 
        status: 400
    };
  }

  // FIX 2: Akses data yang sukses dari validation.data
  const emailData = validation.data; 

  // Panggil API Route Handler (Menggunakan Request object palsu)
  try {
    // Gunakan emailData.email yang sudah divalidasi
    const apiRequestBody = JSON.stringify({ email: emailData.email });
    
    // Buat Request palsu untuk memanggil POST handler API Route secara internal
    const apiRequest = new Request('http://localhost/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: apiRequestBody,
        // PENTING: Tambahkan header IP palsu untuk Rate Limiting internal
        // Di Vercel/Prod, API Route handler Anda harus mendapatkan IP asli
        // dari request header
        // headers: { 'Content-Type': 'application/json', 'X-Forwarded-For': '127.0.0.1' }, 
    });

    const response = await subscribeApiHandler(apiRequest);
    const result = await response.json();
    
    // Return Hasil
    if (response.ok) {
        return { 
            success: true, 
            message: result.message,
            status: 200
        };
    } else {
        // Tangani Rate Limit (429) atau error server (500)
        return { 
            success: false, 
            message: result.error || "Gagal berlangganan. Silakan coba lagi.", 
            status: response.status 
        };
    }

  } catch (e) {
    console.error("Server Action Gagal memanggil API:", e);
    return {
        success: false,
        message: "Kesalahan internal server.",
        status: 500
    };
  }
}