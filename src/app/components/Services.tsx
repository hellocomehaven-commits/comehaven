"use client";

import React, { useState } from 'react';
import Image from 'next/image';

/**
 * # Services Component (Client Component)
 * Menampilkan daftar layanan dan thumbnail video dengan fungsionalitas modal.
 *
 * Strategi Rendering: CSR (Client Side Rendering) karena adanya useState untuk modal interaktif.
 */
export default function Services() {
  // State untuk mengontrol visibilitas modal video
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  
  // ✅ BEST PRACTICE: Gunakan youtube-nocookie.com (Privacy Enhanced Mode) 
  // untuk mencegah YouTube menempatkan cookie pada pengguna sampai mereka mengklik tombol play.
  const videoUrl = "https://www.youtube-nocookie.com/embed/7HKoqNJtMTQ"; 

  // Komponen ini tidak memerlukan useEffect karena tidak ada interaksi DOM manual
  // seperti jQuery atau manipulasi Magnific Popup.

  return (
    <section className="our-services-area bg-gray section-padding-100-0" aria-label="Our Services">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-heading text-center">
              <h2>OUR SERVICES</h2>
              <p>We provide the perfect service for you.</p>
            </div>
          </div>
        </div>
        
        <hr className="my-4" /> {/* Pemisah Visual */}

        <div className="row justify-content-between">
          <div className="col-12 col-lg-5">
            <div className="alazea-service-area mb-100">

              {/* Single Service Area 1 */}
              <div 
                className="single-service-area d-flex align-items-center wow fadeInUp" 
                data-wow-delay="100ms"
              >
                <div className="service-icon mr-30">
                  {/* ✅ Next/Image: Penggunaan width/height eksplisit untuk LCP dan layout shift */}
                  <Image 
                    src="/img/core-img/s1.png" 
                    alt="Plants Care service icon" 
                    width={48} 
                    height={48} 
                  />
                </div>
                <div className="service-content">
                  <h5>Plants Care</h5>
                  <p>
                    In Aenean purus, pretium sito amet sapien denim moste
                    consectet sedoni urna placerat sodales.service its.
                  </p>
                </div>
              </div>

              {/* Single Service Area 2 */}
              <div 
                className="single-service-area d-flex align-items-center wow fadeInUp" 
                data-wow-delay="300ms"
              >
                <div className="service-icon mr-30">
                  <Image 
                    src="/img/core-img/s2.png" 
                    alt="Pressure Washing service icon" 
                    width={48} 
                    height={48} 
                  />
                </div>
                <div className="service-content">
                  <h5>Pressure Washing</h5>
                  <p>In Aenean purus, pretium sito amet sapien denim moste consectet sedoni urna placerat sodales.service its.</p>
                </div>
              </div>

              {/* Single Service Area 3 */}
              <div 
                className="single-service-area d-flex align-items-center wow fadeInUp" 
                data-wow-delay="500ms"
              >
                <div className="service-icon mr-30">
                  <Image 
                    src="/img/core-img/s3.png" 
                    alt="Tree Service & Trimming icon" 
                    width={48} 
                    height={48} 
                  />
                </div>
                <div className="service-content">
                  <h5>Tree Service & Trimming</h5>
                  <p>In Aenean purus, pretium sito amet sapien denim moste consectet sedoni urna placerat sodales.service its.</p>
                </div>
              </div>

            </div>
          </div>

          {/* Area Video Thumbnail */}
          <div className="col-12 col-lg-6">
            <div 
              className="alazea-video-area bg-overlay mb-100"
              style={{ position: 'relative', minHeight: '400px' }}
            >
              {/* Image Thumbnail - Wajib pakai Next/Image fill */}
              <Image 
                src="/img/bg-img/23.jpg" 
                alt="Video Thumbnail: Our Company Profile" 
                fill 
                style={{ objectFit: 'cover' }} 
                sizes="(max-width: 992px) 100vw, 50vw" 
                priority={true} // Jika ini adalah elemen utama yang terlihat (LCP)
              />
              
              {/* Kontainer Tombol Play */}
              <div className="video-content text-center">
                <button 
                  onClick={() => setIsVideoOpen(true)}
                  className="video-icon" 
                  // ✅ Aksesibilitas: Tambahkan role="button" dan label yang jelas
                  aria-label="Play Video About Our Services"
                  role="button"
                >
                  <i className="fa fa-play" aria-hidden="true"></i>
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* MODAL VIDEO REACT */}
      {isVideoOpen && (
        <div 
          // Overlay Backdrop
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            backgroundColor: 'rgba(0,0,0,0.8)', 
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={() => setIsVideoOpen(false)} // Tutup saat klik background
          // ✅ Aksesibilitas: Tambahkan role modal dan pastikan fokus kembali ke tombol setelah ditutup
          role="dialog"
          aria-modal="true"
        >
          {/* Modal Container */}
          <div 
            style={{ 
              width: '90%', // Ubah dari 80% ke 90% untuk layar kecil
              maxWidth: '800px', 
              height: 'auto', 
              aspectRatio: '16/9' // Jaga rasio aspek 16:9
            }} 
            onClick={(e) => e.stopPropagation()} // Mencegah klik di dalam modal menutupnya
          >
            {/* Iframe Video */}
            <iframe
              width="100%"
              height="100%"
              // ✅ KEAMANAN: Menggunakan videoUrl (youtube-nocookie) + "?autoplay=1"
              src={videoUrl + "?autoplay=1"} 
              title="Our Company Video Profile"
              frameBorder="0"
              // ✅ KEAMANAN: Perizinan hanya yang dibutuhkan
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin" // ✅ Keamanan: Mencegah kebocoran referer
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
}