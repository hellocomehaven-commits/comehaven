// Komponen ini adalah Server Component
// Header di dalamnya adalah Client Component karena ada 'use client'
import Header from '../components/Header';
import { Metadata } from 'next';

// Setting SEO untuk halaman ini
export const metadata: Metadata = {
  title: 'Halaman Minimal | Hanya Header',
  description: 'Halaman yang hanya menampilkan komponen Header.',
};

export default function MinimalPage() {
  // Anda tidak perlu menggunakan revalidate di sini jika kontennya hanya Header
  
  return (
    <>
      {/* 1. Komponen Header */}
      <Header />
      
      {/* 2. Opsional: Tambahkan konten lain di sini jika dibutuhkan.
          Jika Anda benar-benar hanya ingin Header, biarkan kosong.
      */}
      <main style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Halaman Minimal</h1>
        <p>Anda hanya melihat Header dan konten minimal ini.</p>
      </main>
      
      {/* 3. Tidak ada Footer atau komponen lain */}
    </>
  );
}