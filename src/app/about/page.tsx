// app/about/page.tsx (FINAL VERSION - STRUCTURE FIXED)

import React, { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// --- Impor Komponen ---
import About from '../components/About';
import Services from '../components/Services';
import CoolFacts from '../components/CoolFacts';
import Testimonial from '../components/Testimonial';
import Subscribe from '../components/Subscribe';
import Team from '../components/Team';

// Import Client Component untuk animasi
import AboutAnimatedWrapper from '../components/AboutAnimatedWrapper'; 

// Rendering Strategy (SSG/ISR sesuai panduan, karena ini konten publik)
export const revalidate = 60;

// Komponen Page Utama (Server Component)
export default function AboutPage() {
  return (
    <>
      {/* 1. ***** Breadcrumb Area Start ***** */}
      <div className="breadcrumb-area">
        
        {/* Top Breadcrumb Area (Header Halaman dengan Background Gambar) */}
        <div 
            className="top-breadcrumb-area bg-img bg-overlay jarallax" 
            style={{ backgroundImage: 'url(/img/bg-img/24.jpg)' }} 
        >
            <div className="container h-100">
                <div className="row h-100 align-items-center">
                    <div className="col-12">
                        <div className="breadcrumb-text">
                            <h2>ABOUT US</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* 2. Breadcrumb Nav (Navigasi Home > About) */}
        <div className="container">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb"> 
                    
                    {/* Item Home */}
                    <li className="breadcrumb-item"> 
                        <Link href="/">
                            <i className="fa fa-home"></i> Home
                        </Link>
                    </li>
                    
                    {/* Item Aktif */}
                    <li className="breadcrumb-item active" aria-current="page">
                        About
                    </li>
                </ol>
            </nav>
        </div>
      </div>
      {/* ***** Breadcrumb Area End ***** */}


      {/* PENTING: Bungkus Animated Wrapper dengan Suspense untuk performa */}
      {/* Fallback tampil saat JS component (GSAP) sedang dimuat/dihidrasi */}
      <Suspense fallback={<div className="section-padding-100"><p>Memuat Konten Halaman...</p></div>}>
        <AboutAnimatedWrapper> 
          
          {/* 3. ##### About Area Start ##### (Mengandung Progress Bar) */}
          <About />

          {/* 4. ##### Service Area Start ##### (Mengandung Video Modal & GSAP Scrub) */}
          <Services />

          {/* 5. ##### Testimonial Area Start ##### (Mengandung Swiper) */}
          <Testimonial />

          {/* 6. ##### Cool Facts Area Start ##### (Mengandung Counter Animasi) */}
          <CoolFacts />

          {/* 7. ##### Team Area Start ##### (Mengandung Team Member) */}
          <Team />
          
          {/* 8. ##### Subscribe Area Start ##### */}
          <Subscribe />

        </AboutAnimatedWrapper>
      </Suspense>
    </>
  );
}