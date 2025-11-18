// src/proxy.ts (FINAL MUTLAK)

import { NextResponse, type NextRequest } from 'next/server';

function generateNonce() {
  return Buffer.from(crypto.randomUUID()).toString('base64');
}

export function proxy(request: NextRequest) { 
  const nonce = generateNonce();

  // PERBAIKAN SINTAKSIS: Menggunakan Array dan join() untuk menghindari error parsing.
  const directives = [
    // 1. DEFAULT (Harus bersih)
    "default-src 'self' https: data: blob:",
    
    // 2. SCRIPT (Nonce)
    `script-src 'self' 'unsafe-eval' https://www.youtube.com 'nonce-${nonce}'`, 
    
    // 3. STYLE (Wajib 'unsafe-inline' untuk fix Preloader/React styles)
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com", 
    
    // 4. LAINNYA
    "img-src 'self' data: blob: https://images.unsplash.com https://*.googleusercontent.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "frame-src 'self' https://www.youtube.com https://www.google.com",
    "connect-src 'self' ws: wss: https://vitals.vercel-insights.com",
    "object-src 'none'",
    "base-uri 'self'",
    "worker-src 'self' blob:",
    "media-src 'self' blob:",
  ];
  
  // Gabungkan array dengan '; ' untuk memastikan sintaksis yang benar
  const csp = directives.join('; '); // <-- Pastikan hanya satu pemisah ';' per direktif

  const response = NextResponse.next();
  
  response.headers.set('Content-Security-Policy', csp);
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Nonce', nonce); 

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|img/|js/|css/).*)',
  ],
};