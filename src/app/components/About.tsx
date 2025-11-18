"use client";

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
// Hapus import { useJQueryPlugin } karena sudah diganti

// --- Komponen Pembantu: ProgressBar Murni React ---
interface ProgressBarProps {
  label: string;
  percentage: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ label, percentage }) => {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  // Hook untuk memicu animasi saat elemen terlihat (Intersection Observer)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Jika elemen terlihat (intersecting), atur lebar ke persentase target
        if (entry.isIntersecting) {
          setWidth(percentage);
          observer.unobserve(entry.target); // Stop observing setelah terpicu
        }
      },
      {
        root: null, // Relative to viewport
        rootMargin: '0px',
        threshold: 0.1, // Trigger saat 10% terlihat
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    // Cleanup Observer saat komponen di-unmount
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [percentage]);

  return (
    <div className="single_progress_bar">
      <p>{label}</p>
      {/* Menggunakan div biasa, bukan .barfiller */}
      <div 
        ref={ref} 
        className="barfiller-replacement" // Class baru untuk styling
        style={{ position: 'relative', height: '10px', backgroundColor: '#e9ecef', borderRadius: '5px' }}
      >
        <div 
          className="fill"
          style={{
            height: '100%',
            width: `${width}%`,
            backgroundColor: '#70c745', // Warna dari barfiller lama
            transition: 'width 2s ease-out', // Transisi CSS untuk animasi
            borderRadius: '5px',
          }}
        >
          {/* Tooltip sederhana (menggantikan tooltip barfiller) */}
          <span 
             style={{ 
                position: 'absolute', 
                right: 0, 
                top: '-25px', 
                fontSize: '12px',
                fontWeight: 'bold',
                color: '#333'
             }}
          >
            {percentage}%
          </span>
        </div>
      </div>
    </div>
  );
};

// --- Komponen About Utama ---
export default function About() {
  // Semua kode jQuery/useEffect/useJQueryPlugin Dihapus!

  return (
    <section className="about-us-area section-padding-100-0">
      <div className="container">
        <div className="row justify-content-between">
          
          {/* Bagian Kiri: Heading, Paragraf, dan Progress Bar */}
          <div className="col-12 col-lg-5">
            <div className="section-heading">
              <h2>ABOUT US</h2>
              <p>We are leading in the plants service fields.</p>
            </div>
            <p>
              Quisque orci quam, vulputate non commodo finibus, molestie ac ante.
              Duis in sceleri quesem. Nulla sit amet varius nunc. Maecenas dui,
              tempeu ullam corper in.
            </p>

            <div className="alazea-progress-bar mb-50">
              {/* Menggantikan kode barfiller lama dengan komponen ProgressBar React */}
              <ProgressBar label="Office plants" percentage={80} />
              <ProgressBar label="Field manager" percentage={70} />
              <ProgressBar label="Landscape design" percentage={85} />
              <ProgressBar label="Garden Care" percentage={65} />
            </div>
          </div>

          {/* Bagian Kanan: Benefit Area (Diisi dari konten asli) */}
          <div className="col-12 col-lg-6">
            <div className="alazea-benefits-area">
              <div className="row">
                <div className="col-12 col-sm-6">
                  <div className="single-benefits-area">
                    <Image src="/img/core-img/b1.png" alt="Benefit 1" width={48} height={48} />
                    <h5>Quality Products</h5>
                    <p>
                      Intiam eu sagittis est, at commodo lacini libero. Praesent
                      dignissim sed odio vel aliquam manta lagorn.
                    </p>
                  </div>
                </div>

                <div className="col-12 col-sm-6">
                  <div className="single-benefits-area">
                    <Image src="/img/core-img/b2.png" alt="Benefit 2" width={48} height={48} />
                    <h5>Perfect Service</h5>
                    <p>Intiam eu sagittis est, at commodo lacini libero. Praesent dignissim sed odio vel aliquam manta lagorn.</p>
                  </div>
                </div>

                <div className="col-12 col-sm-6">
                  <div className="single-benefits-area">
                    <Image src="/img/core-img/b3.png" alt="Benefit 3" width={48} height={48} />
                    <h5>100% Natural</h5>
                    <p>Intiam eu sagittis est, at commodo lacini libero. Praesent dignissim sed odio vel aliquam manta lagorn.</p>
                  </div>
                </div>

                <div className="col-12 col-sm-6">
                  <div className="single-benefits-area">
                    <Image src="/img/core-img/b4.png" alt="Benefit 4" width={48} height={48} />
                    <h5>Environmentally friendly</h5>
                    <p>Intiam eu sagittis est, at commodo lacini libero. Praesent dignissim sed odio vel aliquam manta lagorn.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Akhir Bagian Kanan */}
          
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="border-line"></div>
          </div>
        </div>
      </div>
    </section>
  );
}