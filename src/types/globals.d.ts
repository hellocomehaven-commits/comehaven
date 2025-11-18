// src/types/globals.d.ts

// Ini memberi tahu TypeScript bahwa 'window' memiliki properti 'jQuery'
declare global {
  interface Window {
    jQuery: any;
  }
}

// Baris ini diperlukan untuk mengubah file ini menjadi modul
export {};