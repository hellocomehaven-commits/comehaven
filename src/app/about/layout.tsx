// src/app/about/layout.tsx (Server Component - FINAL)

import { Metadata } from 'next';
import React, { Suspense } from 'react';
// HAPUS: import { usePathname } from 'next/navigation'; // <-- HAPUS INI

// Definisikan metadata HANYA di sini
export const metadata: Metadata = {
  title: 'About Us - Alazea Template',
  description: 'Halaman tentang kami yang menampilkan tim dan fakta perusahaan Alazea.',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // HAPUS: const pathname = usePathname(); // <-- HAPUS INI

  return (
    // Tambahkan Suspense Boundary untuk Client Component anak (page.tsx)
    <Suspense>
      {/* Kunci unik harus diterapkan di dalam komponen Client Component wrapper */}
      {children}
    </Suspense>
  );
}