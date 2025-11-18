// useScrollObserver.ts

import { useState, useEffect } from 'react';

/**
 * Hook kustom untuk melacak posisi scroll dan menentukan
 * apakah elemen harus menjadi 'sticky'.
 * @param scrollThreshold Batas scroll (dalam piksel) untuk mengaktifkan status sticky.
 * @returns boolean: true jika scroll melewati batas.
 */
export function useScrollObserver(scrollThreshold: number = 100) {
  const [isScrolledPast, setIsScrolledPast] = useState(false);

  useEffect(() => {
    // Fungsi handler untuk event scroll
    const handleScroll = () => {
      // Hanya jalankan di sisi klien (browser)
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;
        // Perbarui state hanya jika status berubah
        const shouldBeSticky = currentScrollY > scrollThreshold;
        
        if (shouldBeSticky !== isScrolledPast) {
          setIsScrolledPast(shouldBeSticky);
        }
      }
    };

    // Tambahkan event listener saat komponen mount
    window.addEventListener('scroll', handleScroll, { passive: true });

    // FUNGSI CLEANUP: Hapus event listener saat komponen unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollThreshold, isScrolledPast]); // Dependency array

  return isScrolledPast;
}