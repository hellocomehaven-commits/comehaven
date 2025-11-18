"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
// Pastikan file ini ada: src/app/hooks/useScrollToTop.ts
import { useScrollToTop } from '../hooks/useScrollToTop'; 

export default function Footer() {
  // Menggantikan plugin ScrollUp jQuery
  // Tampilkan tombol setelah 300px scroll, menggunakan smooth scroll
  const { isVisible, scrollToTop } = useScrollToTop(300); 

  // Semua kode useEffect jQuery lama sudah dihapus!

  return (
    <footer
      className="footer-area bg-img"
      style={{ backgroundImage: 'url(/img/bg-img/3.jpg)' }}
    >
      {/* Main Footer Area */}
      <div className="main-footer-area">
        <div className="container">
          <div className="row">
            
            {/* Single Footer Widget 1 (Logo & Social) */}
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="single-footer-widget">
                <div className="footer-logo mb-30">
                  <Link href="/">
                    <Image 
                      src="/img/core-img/logo.png" 
                      alt="Logo Footer" 
                      width={98} // Ukuran fixed dari Header
                      height={22} // Ukuran fixed dari Header
                    />
                  </Link>
                </div>
                <p>
                  Lorem ipsum dolor sit samet, consectetur adipiscing elit.
                  India situs atione mantor
                </p>
                <div className="social-info">
                  <a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                  <a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                  <a href="#"><i className="fa fa-google-plus" aria-hidden="true"></i></a>
                  <a href="#"><i className="fa fa-instagram" aria-hidden="true"></i></a>
                  <a href="#"><i className="fa fa-linkedin" aria-hidden="true"></i></a>
                </div>
              </div>
            </div>

            {/* Single Footer Widget 2 (Quick Link) */}
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="single-footer-widget">
                <div className="widget-title">
                  <h5>QUICK LINK</h5>
                </div>
                <nav className="widget-nav">
                  <ul>
                    <li><a href="#">Purchase</a></li>
                    <li><a href="#">FAQs</a></li>
                    <li><a href="#">Payment</a></li>
                    <li><a href="#">News</a></li>
                    <li><a href="#">Return</a></li>
                    <li><a href="#">Advertise</a></li>
                    <li><a href="#">Shipping</a></li>
                    <li><a href="#">Career</a></li>
                    <li><a href="#">Orders</a></li>
                    <li><a href="#">Policities</a></li>
                  </ul>
                </nav>
              </div>
            </div>

            {/* Single Footer Widget 3 (Best Seller) */}
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="single-footer-widget">
                <div className="widget-title">
                  <h5>BEST SELLER</h5>
                </div>

                {/* Single Best Seller Products 1 */}
                <div className="single-best-seller-product d-flex align-items-center">
                  <div className="product-thumbnail">
                    <Link href="/shop-details">
                      <Image src="/img/bg-img/4.jpg" alt="Best Seller 1" width={70} height={70} />
                    </Link>
                  </div>
                  <div className="product-info">
                    <Link href="/shop-details">Cactus Flower</Link>
                    <p>$10.99</p>
                  </div>
                </div>

                {/* Single Best Seller Products 2 */}
                <div className="single-best-seller-product d-flex align-items-center">
                  <div className="product-thumbnail">
                    <Link href="/shop-details">
                      <Image src="/img/bg-img/5.jpg" alt="Best Seller 2" width={70} height={70} />
                    </Link>
                  </div>
                  <div className="product-info">
                    <Link href="/shop-details">Tulip Flower</Link>
                    <p>$11.99</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Single Footer Widget 4 (Contact) */}
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="single-footer-widget">
                <div className="widget-title">
                  <h5>CONTACT</h5>
                </div>
                <div className="contact-information">
                  <p><span>Address:</span> 505 Silk Rd, New York</p>
                  <p><span>Phone:</span> +1 234 122 122</p>
                  <p><span>Email:</span> info.deercreative@gmail.com</p>
                  <p><span>Open hours:</span> Mon - Sun: 8 AM to 9 PM</p>
                  <p><span>Happy hours:</span> Sat: 2 PM to 4 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Area */}
      <div className="footer-bottom-area">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="border-line"></div>
            </div>
            
            {/* Copywrite Text */}
            <div className="col-12 col-md-6">
              <div className="copywrite-text">
                <p>
                  ©{new Date().getFullYear()} All rights reserved | This template is made with{' '}
                  <i className="fa fa-heart-o" aria-hidden="true"></i> by{' '}
                  <a href="https://colorlib.com" target="_blank" rel="noopener noreferrer">
                    Colorlib
                  </a>
                </p>
              </div>
            </div>
            
            {/* Footer Nav */}
            <div className="col-12 col-md-6">
              <div className="footer-nav">
                <nav>
                  <ul>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/about">About</Link></li>
                    <li><Link href="/service">Service</Link></li>
                    <li><Link href="/portfolio">Portfolio</Link></li>
                    <li><Link href="/blog">Blog</Link></li>
                    <li><Link href="/contact">Contact</Link></li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 8.0 ScrollUp Code (Murni React) */}
      {/* Tombol hanya dirender jika isVisible = true */}
      {isVisible && (
        <button
          id="scrollUp" // Pertahankan ID untuk styling CSS lama
          onClick={scrollToTop}
          // Styling langsung untuk memastikan tombol muncul dan berfungsi setelah penghapusan jQuery
          style={{
             position: 'fixed',
             zIndex: 999,
             right: '30px',
             bottom: '30px',
             cursor: 'pointer',
             background: '#70c745', // Ganti dengan warna primary Anda
             color: 'white',
             width: '40px',
             height: '40px',
             borderRadius: '50%',
             border: 'none',
             fontSize: '18px',
             lineHeight: '40px',
             textAlign: 'center',
             transition: 'opacity 0.3s'
          }}
        >
          <i className="fa fa-angle-up"></i> 
        </button>
      )}

    </footer>
  );
}