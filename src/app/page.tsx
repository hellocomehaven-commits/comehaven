// src/app/page.tsx

import dynamic from 'next/dynamic';
import type { Metadata } from 'next';

// --- Komponen Kritis (Dimuat Awal/Server Component) ---
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Portfolio from './components/Portfolio';

// ✅ PERBAIKAN: Ganti import Testimonial yang dinamis dengan import Wrapper
import DynamicTestimonialWrapper from './components/DynamicTestimonialWrapper'; 

// --- Komponen Lazy (Dimuat Saat Dibutuhkan) ---
// Catatan: Komponen lain tidak memerlukan ssr: false, jadi tetap aman di sini.
const NewArrivals = dynamic(() => import('./components/NewArrivals'), { 
    loading: () => <div className="section-padding-100-0">Loading New Arrivals...</div> 
});
const Blog = dynamic(() => import('./components/Blog'));
const Subscribe = dynamic(() => import('./components/Subscribe'));
const Contact = dynamic(() => import('./components/Contact'));


// ✅ SEO: Implementasi Metadata Spesifik Halaman
export const generateMetadata = (): Metadata => {
  return {
    title: 'Alazea Home - Gardening & Landscaping Services | Next.js',
    description: 'Solusi profesional untuk perawatan tanaman, lansekap, dan desain taman Anda. Aplikasi Next.js modern, aman, dan berkinerja tinggi.',
    alternates: {
      canonical: '/',
    },
  };
};


// ✅ PERFORMANCE: Implementasi ISR
export const revalidate = 60; 


/**
 * # HomePage (Server Component)
 */
export default function HomePage() {
  return (
    <>
      {/* Komponen Kritis (Above The Fold) */}
      <Hero />
      <Services />
      <About />
      <Portfolio />
      
      {/* ✅ Ganti dengan Wrapper yang baru */}
      <DynamicTestimonialWrapper />
      
      {/* Komponen Lazy (Below The Fold) */}
      <NewArrivals />
      <Blog />
      <Subscribe />
      <Contact />
    </>
  );
}