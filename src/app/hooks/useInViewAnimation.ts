// src/app/hooks/useInViewAnimation.ts

import { useEffect, useRef, useState } from 'react';

/**
 * Hook untuk memicu kelas animasi saat elemen masuk ke viewport.
 * Menggantikan fungsionalitas WOW.js.
 * @param delayMillis Waktu tunda (ms) sebelum animasi dimulai.
 * @returns [ref, isVisible]: ref untuk elemen dan status terlihat.
 */
export function useInViewAnimation(delayMillis: number = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          // Pemicu tunda
          const timer = setTimeout(() => {
            setIsVisible(true);
          }, delayMillis);
          
          observer.unobserve(element); // Stop observing setelah terpicu
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    
    return () => observer.unobserve(element);

  }, [delayMillis, isVisible]);

  return { ref, isVisible };
}