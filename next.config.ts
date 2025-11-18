// proxy.ts
import { NextResponse, NextRequest } from 'next/server';

/**
 * Helper untuk generate nonce unik (16 karakter, aman, random).
 */
const generateNonce = (): string => {
  return crypto.randomUUID().replace(/-/g, '').substring(0, 16);
};

export function proxy(request: NextRequest): NextResponse {
  const isDev = process.env.NODE_ENV !== 'production';
  
  let csp: string;
  let nonce: string | undefined;

  // ============================================================
  // 🌱 DEVELOPMENT MODE (Sangat Permisif)
  // ============================================================
  if (isDev) {
    csp = `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.youtube.com https://www.youtube-nocookie.com;
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      img-src 'self' data: blob: https://images.unsplash.com https://*.googleusercontent.com;
      font-src 'self' https://fonts.gstatic.com;
      connect-src 'self' ws: wss: https://vitals.vercel-insights.com;
      frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com;
      object-src 'none';
      base-uri 'self';
    `.replace(/\s{2,}/g, ' ').trim();
  } 

  // ============================================================
  // 🚀 PRODUCTION MODE (Strict CSP dengan Nonce dan Reporting)
  // ============================================================
  else {
    nonce = generateNonce();

    // `strict-dynamic` memungkinkan script turunan berjalan tanpa di-whitelist ulang.
    const scriptSrc = `'self' 'nonce-${nonce}' 'strict-dynamic' blob:`;
    const frameSrc = `'self' https://www.youtube.com https://www.youtube-nocookie.com`;
    const styleSrc = `'self' 'unsafe-inline' https://fonts.googleapis.com`;

    csp = `
      default-src 'self';
      script-src ${scriptSrc};
      style-src ${styleSrc};
      img-src 'self' data: blob: https://images.unsplash.com https://*.googleusercontent.com;
      font-src 'self' https://fonts.gstatic.com;
      connect-src 'self' https://vitals.vercel-insights.com;
      frame-src ${frameSrc};
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      frame-ancestors 'self';
      report-uri /api/csp-report;
      report-to csp-endpoint;
    `.replace(/\s{2,}/g, ' ').trim();
  }

  // ============================================================
  // ✉️ BUILD RESPONSE
  // ============================================================
  const res = NextResponse.next({
    request: { headers: request.headers },
  });

  // Tambahkan CSP header
  res.headers.set('Content-Security-Policy', csp);

  // Tambahkan Report-To header (optional tapi recommended)
  res.headers.set(
    'Report-To',
    JSON.stringify({
      group: 'csp-endpoint',
      max_age: 10886400,
      endpoints: [{ url: '/api/csp-report' }],
      include_subdomains: true,
    })
  );

  // Kirim nonce agar bisa dipakai di layout.tsx
  if (nonce) res.headers.set('X-Nonce', nonce);

  return res;
}

// ============================================================
// ⚙️ MATCHER CONFIG (Pastikan tidak intercept API & asset statis)
// ============================================================
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|img|.*\\..*).*)',
  ],
};
