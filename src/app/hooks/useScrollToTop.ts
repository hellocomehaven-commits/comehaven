// useScrollToTop.ts

import { useState, useEffect } from 'react';

/**
 * Hook kustom untuk melacak posisi scroll dan menyediakan fungsi scroll to top.
 * @param scrollThreshold Batas scroll (dalam piksel) untuk menampilkan tombol.
 * @returns [isVisible, scrollToTop]: status visibility dan fungsi scroll.
 */
export function useScrollToTop(scrollThreshold: number = 300) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Handler untuk event scroll
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;
        // Perbarui state apakah elemen harus terlihat
        setIsVisible(currentScrollY > scrollThreshold);
      }
    };

    // Tambahkan event listener saat komponen mount
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Panggil sekali untuk inisialisasi status awal
    handleScroll();

    // FUNGSI CLEANUP: Hapus event listener saat komponen unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollThreshold]);

  // Fungsi untuk scroll kembali ke atas (Smooth Scroll)
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return { isVisible, scrollToTop };
}