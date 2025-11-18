// proxy.ts
import { NextResponse, NextRequest } from 'next/server';

const generateNonce = (): string => {
  return crypto.randomUUID().replace(/-/g, '').substring(0, 16); 
};

export function proxy(request: NextRequest): NextResponse {
  const isDev = process.env.NODE_ENV !== 'production';
  
  let csp: string;
  let nonce: string | undefined;

  // --- Kebijakan DEVELOPMENT (Permisif Mutlak) ---
  if (isDev) {
    // Development: Menggunakan 'unsafe-eval' dan 'unsafe-inline'
    const scriptSrcDev = `'self' 'unsafe-eval' 'unsafe-inline' https://www.youtube.com https://www.youtube-nocookie.com`;
    const frameSrcDev = `'self' https://www.youtube.com https://www.youtube-nocookie.com https://www.google.com`;
    const connectSrcDev = `ws: wss: https://vitals.vercel-insights.com`;

    csp = `
      default-src 'self';
      script-src ${scriptSrcDev};
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      img-src 'self' data: blob: https://images.unsplash.com https://*.googleusercontent.com;
      font-src 'self' https://fonts.gstatic.com;
      connect-src 'self' ${connectSrcDev};
      frame-src ${frameSrcDev};
      object-src 'none';
      base-uri 'self';
    `.replace(/\s{2,}/g, ' ').trim();

  } 
  // --- Kebijakan PRODUCTION (Nonce, Strict Dynamic, dan Reporting) ---
  else {
    nonce = generateNonce();
    
    // Gunakan 'strict-dynamic' dan 'blob:' untuk script-src yang ketat
    const scriptSrcProd = `'self' 'nonce-${nonce}' 'strict-dynamic' blob:`; 
    
    // Perbaikan: Tambahkan https://www.google.com ke frame-src
    const frameSrcProd = `'self' https://www.youtube.com https://www.youtube-nocookie.com https://www.google.com`;
    
    const styleSrcProd = `'self' 'unsafe-inline' https://fonts.googleapis.com`; 
    const connectSrcProd = `https://vitals.vercel-insights.com`;

    csp = `
      default-src 'self';
      script-src ${scriptSrcProd};
      style-src ${styleSrcProd};
      img-src 'self' data: blob: https://images.unsplash.com https://*.googleusercontent.com;
      font-src 'self' https://fonts.gstatic.com;
      connect-src 'self' ${connectSrcProd};
      frame-src ${frameSrcProd};
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      frame-ancestors 'self';
      report-uri /api/csp-report; 
    `.replace(/\s{2,}/g, ' ').trim();
  }


  // 3. Buat Response dan Set Headers
  const res = NextResponse.next({
    request: { headers: request.headers },
  });

  // Set Content-Security-Policy header
  res.headers.set('Content-Security-Policy', csp);
  
  if (!isDev) {
      // Set Nonce di custom header hanya di mode Production
      res.headers.set('X-Nonce', nonce!); 
  }
  
  return res;
}

// 4. Konfigurasi Matcher (Tetap Sama)
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|img|.*\\..*).*)',
  ],
};