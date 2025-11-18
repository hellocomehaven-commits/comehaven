// src/app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ padding: '100px 0', textAlign: 'center' }}>
      <div className="container">
        <h1 style={{ fontSize: '72px', color: '#70c745' }}>404</h1>
        <h2>PAGE NOT FOUND</h2>
        <p>Sorry, the page you are looking for does not exist.</p>
        <Link href="/" className="btn alazea-btn mt-30">
          Go Back Home
        </Link>
      </div>
    </div>
  );
}