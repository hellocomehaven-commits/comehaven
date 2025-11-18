// src/app/layout.tsx 

import type { Metadata } from 'next';
import './globals.css'; 
import { headers } from 'next/headers'; 
import Script from 'next/script'; 
import { Dosis } from 'next/font/google';

// Import Komponen (asumsi file ini ada)
import Header from './components/Header';
// import Preloader from './components/Preloader'; 
// import Footer from './components/Footer';

// Konfigurasi Font Dosis
const dosis = Dosis({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-dosis',
});

export const metadata: Metadata = {
  title: 'Alazea - Gardening & Landscaping | Migrasi Next.js',
  description:
    'Aplikasi Next.js modern, aman, dan berkinerja tinggi hasil migrasi dari template Alazea.',
  icons: { icon: '/img/core-img/favicon.ico' },
  keywords: ['gardening', 'landscaping', 'nextjs', 'alazea'],
};


/**
 * # RootLayout (Server Component Asinkron)
 * Dideklarasikan sebagai 'async' untuk mengatasi error TypeScript pada headers().get()
 */
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  // ✅ PERBAIKAN FINAL: Deklarasi async memungkinkan headers() berfungsi seperti promise yang sudah resolved.
  // Panggil headers() sekali untuk mendapatkan ReadonlyHeaders
  const headersList = await headers();
const nonce = headersList.get('x-nonce') ?? undefined;

  return (
    <html lang="en" className={dosis.className}>
      <body>
        
        {/* Preloader dan Header */}
        {/* <Preloader /> */}
        <Header />
        
        {/* Main Content */}
        {children}

        {/* Footer */}
        {/* <Footer /> */}
        
        {/* SCRIPT EKSTERNAL AMAN DENGAN NONCE (CSP) */}
        <Script 
          id="google-analytics" 
          strategy="afterInteractive" 
          nonce={nonce} 
          src="https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID" 
        />
        
        {/* Script Inline Non-Kritis */}
        <Script 
            id="init-runtime-check" 
            strategy="beforeInteractive" 
            nonce={nonce} 
            dangerouslySetInnerHTML={{
                __html: `
                  if (typeof window !== 'undefined') {
                    console.log('Runtime initialized. Nonce:', '${nonce}'); 
                  }
                `
            }} 
        />
        
      </body>
    </html>
  );
}