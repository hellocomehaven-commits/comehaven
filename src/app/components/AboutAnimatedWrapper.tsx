'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AboutAnimatedWrapperProps {
  children: React.ReactNode;
}

export default function AboutAnimatedWrapper({ children }: AboutAnimatedWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      if (!container) return;

      // =====================================================
      // 1. ANIMASI UMUM (stagger fade-up)
      // =====================================================
      gsap.fromTo(
        container.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // =====================================================
      // 2. ANIMASI PROGRESS BAR (About section)
      // =====================================================
      const progressBar = container.querySelector('.skill-per') as HTMLElement | null;
      if (progressBar) {
        const targetWidth = progressBar.getAttribute('data-per');
        if (targetWidth) {
          gsap.to(progressBar, {
            width: targetWidth,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: progressBar,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          });
        }
      }

      // =====================================================
      // 3. ANIMASI SERVICE ITEMS (Services Section)
      // =====================================================
     const serviceItems = container.querySelectorAll('.single-service-area');

serviceItems.forEach((item) => {
  const textElement = item.querySelector('.service-content') as HTMLElement | null;
  const iconElement = item.querySelector('.service-icon') as HTMLElement | null;

  if (textElement && iconElement && item instanceof HTMLElement) {
    // ✅ Timeline sinkron dengan scroll tapi tetap smooth
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start: 'top 95%',          // mulai sedikit sebelum muncul
        end: 'bottom 90%',         // selesai pas elemen hampir keluar viewport
        scrub: 0.3,                // sinkron scroll tapi tetap halus
        fastScrollEnd: true,       // skip langsung ke posisi akhir kalau scroll cepat
      },
    });

    // Set posisi awal (sebelum masuk viewport)
    gsap.set(item, { opacity: 0, y: 50 });
    gsap.set(iconElement, { opacity: 0, x: -40 });
    gsap.set(textElement, { opacity: 0, x: 40 });

    // Step 1 — Kontainer fade in & geser sedikit naik
    tl.to(item, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
    });

    // Step 2 — Ikon geser dari kiri, fade in cepat
    tl.to(
      iconElement,
      {
        opacity: 1,
        x: 0,
        duration: 0.4,
        ease: 'power2.out',
      },
      '-=0.4' // overlap biar sinkron sama item
    );

    // Step 3 — Teks muncul dari kanan, fade in cepat
    tl.to(
      textElement,
      {
        opacity: 1,
        x: 0,
        duration: 0.4,
        ease: 'power2.out',
      },
      '-=0.35' // overlap halus biar keliatan simultan tapi rapi
    );
  }
});


      // =====================================================
      // 4. ANIMASI VIDEO AREA (Parallax ringan)
      // =====================================================
      const videoArea = container.querySelector('.alazea-video-area') as HTMLElement | null;

if (videoArea) {
  // Timeline biar transisi bisa diatur halus dan sinkron dengan scroll
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: videoArea,
      start: "top 85%",      // mulai sedikit sebelum masuk viewport
      end: "center center",  // selesai pas elemen udah center di layar
      scrub: true,           // sinkron dengan scroll
      fastScrollEnd: true,   // auto ke posisi akhir kalau user scroll cepat
    },
  });

  // Step 1 — Masuk dari kanan + sedikit fade-in
  tl.fromTo(
    videoArea,
    { x: 150, opacity: 0, scale: 0.95 },
    { 
      x: 0, 
      opacity: 1, 
      scale: 1,
      ease: "power2.out",
      duration: 1.2
    }
  );

  // Step 2 — Parallax halus setelah muncul
  gsap.fromTo(
    videoArea,
    { y: 40 },
    {
      y: -30,
      ease: "none",
      scrollTrigger: {
        trigger: videoArea,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    }
  );
}



      // =====================================================
      // 5. ANIMASI COOL FACTS COUNTER
      // =====================================================
      const counters = container.querySelectorAll('.counter');
      counters.forEach((counter) => {
        const el = counter as HTMLElement;
        const targetValue = parseInt(el.textContent?.replace(/\D/g, '') || '0', 10);
        if (targetValue > 0) {
          el.textContent = '0';
          const obj = { count: 0 };

          gsap.to(obj, {
            count: targetValue,
            duration: 2,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
              onUpdate: () => {
                el.textContent = Math.floor(obj.count).toLocaleString();
              },
            },
          });
        }
      });

      // =====================================================
      // 6. ANIMASI TEAM MEMBER
      // =====================================================
      const teamMembers = container.querySelectorAll('.single-team-member');
      teamMembers.forEach((member) => {
        gsap.fromTo(
          member,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: member,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, containerRef);

    // Cleanup saat unmount (aman untuk Next.js)
    return () => ctx.revert();
  }, []);

  return <div ref={containerRef}>{children}</div>;
}
