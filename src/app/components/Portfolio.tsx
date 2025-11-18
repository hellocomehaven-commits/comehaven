"use client";

import React, { useState } from 'react';
import Image from 'next/image';
// Hapus semua import JQuery, useRef, dan useEffect!

// --- Data Statis Portfolio (Menggantikan data yang dirender Isotope) ---
// Kita tambahkan properti 'category' untuk filtering
const portfolioItems = [
  { id: 1, src: "/img/bg-img/16.jpg", title: "Minimal Flower Store", category: "design home-design", filter: ["design", "home-design"] },
  { id: 2, src: "/img/bg-img/17.jpg", title: "Minimal Flower Store", category: "garden", filter: ["garden"] },
  { id: 3, src: "/img/bg-img/18.jpg", title: "Minimal Flower Store", category: "garden design", filter: ["garden", "design"] },
  { id: 4, src: "/img/bg-img/19.jpg", title: "Minimal Flower Store", category: "garden office-design", filter: ["garden", "office-design"] },
  { id: 5, src: "/img/bg-img/20.jpg", title: "Minimal Flower Store", category: "design office-design", filter: ["design", "office-design"] },
  { id: 6, src: "/img/bg-img/21.jpg", title: "Minimal Flower Store", category: "garden", filter: ["garden"] },
  { id: 7, src: "/img/bg-img/22.jpg", title: "Minimal Flower Store", category: "home-design", filter: ["home-design"] },
];

export default function Portfolio() {
  // State untuk melacak filter yang sedang aktif
  const [activeFilter, setActiveFilter] = useState('*'); // '*' berarti tampilkan semua

  // Handler saat tombol filter diklik
  const handleFilterClick = (filterValue: string) => {
    setActiveFilter(filterValue);
  };

  // Logika pemfilteran
  const filteredItems = portfolioItems.filter(item => {
    if (activeFilter === '*') {
      return true;
    }
    // Cek apakah item mengandung filter yang aktif
    return item.filter.includes(activeFilter.replace('.', '')); 
  });
  
  // Array untuk tombol filter (Harus sesuai dengan data-filter di JSX lama)
  const filterButtons = [
    { label: 'All', value: '*' },
    { label: 'Coffee Design', value: '.design' },
    { label: 'Garden', value: '.garden' },
    { label: 'Home Design', value: '.home-design' },
    { label: 'Office Design', value: '.office-design' },
  ];

  return (
    <section className="alazea-portfolio-area section-padding-100-0">
      <div className="container">
        <div className="row">
          {/* ... Section Heading ... */}
        </div>
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="alazea-portfolio-filter">
              <div className="portfolio-filter">
                {/* Rendering Tombol Filter menggunakan State */}
                {filterButtons.map(button => (
                  <button 
                    key={button.value}
                    className={`btn ${activeFilter === button.value ? 'active' : ''}`}
                    onClick={() => handleFilterClick(button.value)}
                    data-filter={button.value}
                  >
                    {button.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Target Isotope lama - Sekarang dirender berdasarkan filteredItems */}
        <div className="row alazea-portfolio">
          {filteredItems.map(item => (
            // Kelas kolom dipertahankan untuk styling CSS dan layout
            <div 
              key={item.id} 
              className={`col-12 col-sm-6 col-lg-3 single_portfolio_item ${item.category}`}
            >
              {/* Item Thumbnail */}
              <div className="portfolio-thumbnail bg-img" style={{ position: 'relative', minHeight: '300px' }}>
                <Image 
                  src={item.src} 
                  alt={`Portfolio ${item.id}`} 
                  fill 
                  style={{ objectFit: 'cover' }} 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                />
              </div>
              
              {/* Overlay (Untuk Galeri) */}
              <div className="portfolio-hover-overlay">
                {/* NOTE: Ganti ini dengan modal/lightbox React jika Magnific Popup dihilangkan */}
                <a
                  href={item.src} 
                  className="portfolio-img d-flex align-items-center justify-content-center"
                  title={item.title}
                >
                  <div className="port-hover-text">
                    <h3>{item.title}</h3>
                    <h5>Office Plants</h5>
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}