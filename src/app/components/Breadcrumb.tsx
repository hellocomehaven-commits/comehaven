import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Kita tambahkan 'title' sebagai prop agar bisa dipakai di halaman lain
type BreadcrumbProps = {
  title: string;
};

export default function Breadcrumb({ title }: BreadcrumbProps) {
  return (
    <div className="breadcrumb-area">
      {/* Top Breadcrumb Area */}
      <div className="top-breadcrumb-area bg-img bg-overlay d-flex align-items-center justify-content-center">
        {/* Background Image */}
        <Image
          src="/img/bg-img/24.jpg"
          alt="Breadcrumb Background"
          fill
          priority
          style={{ objectFit: 'cover', zIndex: -2 }}
          sizes="100vw"
        />
        <h2>{title}</h2>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link href="/">
                    <i className="fa fa-home"></i> Home
                  </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {title}
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}