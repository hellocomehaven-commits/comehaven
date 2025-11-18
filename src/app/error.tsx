// src/app/error.tsx
"use client"; // File error WAJIB berupa Client Component

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 1. Log error ke layanan monitoring (Sentry, LogRocket, dll.)
    // JANGAN PERNAH log error sensitif ke konsol publik di production
    console.error(error);
  }, [error]);

  return (
    <div style={{ padding: '100px 0', textAlign: 'center' }}>
      <div className="container">
        <h2 style={{ color: '#70c745' }}>SOMETHING WENT WRONG</h2>
        <p>{error.message || "An unexpected error occurred."}</p>
        <button
          onClick={
            // 2. Tombol untuk mencoba me-render ulang segmen
            () => reset()
          }
          className="btn alazea-btn mt-30"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}