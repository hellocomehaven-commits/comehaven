"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
// Pastikan hook ini sudah dibuat: src/app/hooks/useScrollObserver.ts
import { useScrollObserver } from '../hooks/useScrollObserver'; 
import Preloader from './Preloader';

export default function Header() {
  // 1. STATE MANAGEMENT (Migrasi React Murni)
  const isSticky = useScrollObserver(0); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false); 
  // Melacak dropdown aktif: 'pages', 'shop', 'portfolio', 'blog', atau 'language'
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null); 

  const [isPreloaderVisible, setIsPreloaderVisible] = useState(true);

  // 2. HANDLER FUNCTIONS 
  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
    if (isSearchActive) setIsSearchActive(false); 
  };
  
  const toggleSearch = () => {
    setIsSearchActive(prev => !prev);
    if (isMenuOpen) setIsMenuOpen(false); 
  };

  const toggleDropdown = (e: React.MouseEvent, menuName: string) => {
    e.preventDefault(); 
    
    // Logika utama: Jika yang diklik adalah yang aktif, tutup. Jika berbeda, buka yang baru.
    setActiveDropdown(prev => {
        if (prev === menuName) {
            return null; // Tutup
        } else {
            return menuName; // Buka yang baru
        }
    });
    
    // Catatan: Karena kita menggunakan single state (activeDropdown) yang hanya menyimpan satu nama,
    // klik pada Pages akan menutup Shop, dan sebaliknya. Ini meniru ClassyNav.
  };

// 3. LOGIKA PRELOADER (Fix Timing)
  useEffect(() => {
  const hidePreloader = () => {
    // Trigger CSS animation jika ada
    document.querySelector('.preloader')?.classList.add('loaded');
    
    // Set timeout untuk hide dari DOM
    const timer = setTimeout(() => {
      setIsPreloaderVisible(false);
    }, 500);
    
    return () => clearTimeout(timer);
  };

  // Method 1: Jika halaman sudah load
  if (document.readyState === 'complete') {
    hidePreloader();
    return;
  }

  // Method 2: Tambah event listener untuk load
  window.addEventListener('load', hidePreloader);

  // Method 3: Fallback timeout (jika event load tidak trigger)
  const fallbackTimer = setTimeout(() => {
    console.log('Fallback: Hiding preloader after 3s');
    hidePreloader();
  }, 3000);

  return () => {
    window.removeEventListener('load', hidePreloader);
    clearTimeout(fallbackTimer);
  };
}, []);

  
  // 4. JSX RETURN 
  return (
    <>
    {/* PENTING: Render Preloader di bagian paling atas untuk memastikan z-index bekerja */}
        {isPreloaderVisible && <Preloader/>}
    <header className="header-area">
      {/* PENTING: Spacer DITAMBAHKAN di sini untuk mencegah content jump saat sticky */}
      {/* Tinggi 90px sesuai tinggi classy-navbar (.header-area .alazea-main-menu .classy-navbar) */}
      {isSticky && (
        <div style={{ height: '90px' }} /> 
      )}

      {/* ***** Top Header Area ***** */}
      <div className="top-header-area">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="top-header-content d-flex align-items-center justify-content-between">
                
                {/* Top Header Content - Kiri */}
                <div className="top-header-meta">
                  <a
                    href="mailto:infodeercreative@gmail.com" // <-- Rekomendasi perbaikan
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="infodeercreative@gmail.com"
                  >
                    <i className="fa fa-envelope-o" aria-hidden="true"></i>{' '}
                    <span>Email: infodeercreative@gmail.com</span>
                  </a>
                  <a
                    href="tel:+1234122122" // <-- Rekomendasi perbaikan
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="+1 234 122 122"
                  >
                    <i className="fa fa-phone" aria-hidden="true"></i>{' '}
                    <span>Call Us: +1 234 122 122</span>
                  </a>
                </div>

                {/* Top Header Content - Kanan */}
                <div className="top-header-meta d-flex">
                  {/* Language Dropdown */}
                  <div className="language-dropdown">
                    <div className="dropdown">
                      <button
                        className={`btn btn-secondary dropdown-toggle mr-30`}
                        type="button"
                        id="dropdownMenuButton"
                        aria-haspopup="true"
                        aria-expanded={activeDropdown === 'language'}
                        onClick={(e) => toggleDropdown(e, 'language')}
                      >
                        Language
                      </button>
                      <div
                        className={`dropdown-menu ${activeDropdown === 'language' ? 'show' : ''}`}
                        aria-labelledby="dropdownMenuButton"
                      >
                        <a className="dropdown-item" href="#">USA</a>
                        <a className="dropdown-item" href="#">UK</a>
                        <a className="dropdown-item" href="#">Bangla</a>
                        <a className="dropdown-item" href="#">Hindi</a>
                        <a className="dropdown-item" href="#">Spanish</a>
                        <a className="dropdown-item" href="#">Latin</a>
                      </div>
                    </div>
                  </div>
                  {/* Login */}
                  <div className="login">
                    <a href="#">
                      <i className="fa fa-user" aria-hidden="true"></i>{' '}
                      <span>Login</span>
                    </a>
                  </div>
                  {/* Cart */}
                  <div className="cart">
                    <a href="#">
                      <i className="fa fa-shopping-cart" aria-hidden="true"></i>{' '}
                      <span>Cart <span className="cart-quantity">(1)</span></span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ***** Navbar Area ***** */}
      <div className={`alazea-main-menu ${isSticky ? 'sticky-active' : ''}`}> 
        <div className="classy-nav-container breakpoint-off">
          <div className="container">
            <nav
              className="classy-navbar justify-content-between"
              id="alazeaNav"
            >
              {/* Nav Brand (Logo) */}
              <Link href="/" className="nav-brand">
                <Image
                  src="/img/core-img/logo.png"
                  alt="Alazea Logo"
                  width={98}
                  height={22}
                  priority
                />
              </Link>

              {/* Navbar Toggler */}
              <div className="classy-navbar-toggler" onClick={toggleMenu}>
                <span className="navbarToggler">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </div>

              {/* Menu */}
              <div className={`classy-menu ${isMenuOpen ? 'active' : ''}`}>
                
                {/* Close Button (Mobile) */}
                <div className="classycloseIcon" onClick={toggleMenu}>
                  <div className="cross-wrap">
                    <span className="top"></span>
                    <span className="bottom"></span>
                  </div>
                </div>

                {/* Navbar Start */}
               <div className="classynav">
                  <ul>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/about">About</Link></li>
                    
                    {/* DROP-DOWN LEVEL 1: PAGES */}
                    {/* Tambahkan kelas 'has-down' jika CSS Anda membutuhkannya */}
                    <li className={`cn-dropdown-item has-down ${activeDropdown === 'pages' ? 'active' : ''}`}>
                      {/* Anchor text untuk dropdown */}
                      <a href="#" onClick={(e) => toggleDropdown(e, 'pages')}>Pages</a>
                      
                      {/* Daftar Dropdown Level 1 */}
                      {/* Class 'dropdown' dan 'active'/'show' dibutuhkan untuk visibility CSS */}
                      <ul className={`dropdown ${activeDropdown === 'pages' ? 'active show' : ''}`}>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/minimal">Minimal View</Link></li>
                        <li><Link href="/about">About</Link></li>
                        
                        {/* DROP-DOWN LEVEL 2: SHOP (BERSARANG) */}
                        <li className={`has-down ${activeDropdown === 'shop' ? 'active' : ''}`}>
                          <a href="#" onClick={(e) => toggleDropdown(e, 'shop')}>Shop</a>
                          
                          {/* Daftar Dropdown Level 2 */}
                          <ul className={`dropdown ${activeDropdown === 'shop' ? 'active show' : ''}`}>
                            <li><Link href="/shop">Shop</Link></li>
                            <li><Link href="/shop-details">Shop Details</Link></li>
                            <li><Link href="/cart">Shopping Cart</Link></li>
                            <li><Link href="/checkout">Checkout</Link></li>
                          </ul>
                          {/* Span Trigger harus ditambahkan jika CSS membutuhkan pemicu panah */}
                          <span className="dd-trigger" onClick={(e) => toggleDropdown(e, 'shop')}></span>
                        </li>
                        
                        {/* DROP-DOWN LEVEL 2: PORTFOLIO */}
                        <li className={`has-down ${activeDropdown === 'portfolio' ? 'active' : ''}`}>
                          <a href="#" onClick={(e) => toggleDropdown(e, 'portfolio')}>Portfolio</a>
                          <ul className={`dropdown ${activeDropdown === 'portfolio' ? 'active show' : ''}`}>
                            <li><Link href="/portfolio">Portfolio</Link></li>
                            <li><Link href="/portfolio-details">Portfolio Details</Link></li>
                          </ul>
                          <span className="dd-trigger" onClick={(e) => toggleDropdown(e, 'portfolio')}></span>
                        </li>

                        {/* DROP-DOWN LEVEL 2: BLOG */}
                        <li className={`has-down ${activeDropdown === 'blog' ? 'active' : ''}`}>
                          <a href="#" onClick={(e) => toggleDropdown(e, 'blog')}>Blog</a>
                          <ul className={`dropdown ${activeDropdown === 'blog' ? 'active show' : ''}`}>
                            <li><Link href="/blog">Blog</Link></li>
                            <li><Link href="/blog-details">Blog Details</Link></li>
                          </ul>
                          <span className="dd-trigger" onClick={(e) => toggleDropdown(e, 'blog')}></span>
                        </li>
                        
                        <li><Link href="/contact">Contact</Link></li>
                      </ul>
                      {/* Span Trigger harus ditambahkan untuk dropdown Pages Level 1 */}
                      <span className="dd-trigger" onClick={(e) => toggleDropdown(e, 'pages')}></span>
                    </li>

                    <li><Link href="/shop">Shop</Link></li>
                    <li><Link href="/portfolio">Portfolio</Link></li>
                    <li><Link href="/contact">Contact</Link></li>
                  </ul>

                  {/* Search Icon */}
                  <div id="searchIcon" onClick={toggleSearch}>
                    <i className="fa fa-search" aria-hidden="true"></i>
                  </div>
                </div>
                {/* Navbar End */}
              </div>
            </nav>

            {/* Search Form */}
            <div className={`search-form ${isSearchActive ? 'active' : ''}`}>
              <form action="#" method="get">
                <input
                  type="search"
                  name="search"
                  id="search"
                  placeholder="Type keywords & press enter..."
                />
                <button type="submit" className="d-none"></button>
              </form>
              
              {/* Close Icon */}
              <div className="closeIcon" onClick={toggleSearch}>
                <i className="fa fa-times" aria-hidden="true"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    </>
  );
}