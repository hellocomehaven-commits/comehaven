"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "animate.css";

export default function Hero() {
  // --- Trigger animasi setiap kali slide berubah ---
  const handleSlideAnimation = (swiper: any) => {
    swiper.slides.forEach((slide: HTMLElement) => {
      const img = slide.querySelector(".slide-img");
      const content = slide.querySelector(".hero-slides-content");

      // reset animasi lama
      if (img) img.classList.remove("zoom-animate");
      if (content) {
        content.classList.remove("animate__animated", "animate__fadeInUp");
        content.querySelectorAll(".welcome-btn-group a").forEach((btn: Element) => {
          (btn as HTMLElement).style.animationDelay = "";
          btn.classList.remove("animate__animated", "animate__fadeInUp");
        });
      }
    });

    // aktifkan animasi untuk slide baru
    const activeSlide = swiper.slides[swiper.activeIndex];
    const img = activeSlide.querySelector(".slide-img");
    const content = activeSlide.querySelector(".hero-slides-content");
    const buttons = activeSlide.querySelectorAll(".hero-slides-content .welcome-btn-group a");

    if (img) img.classList.add("zoom-animate");

    if (content) {
      setTimeout(() => {
        content.classList.add("animate__animated", "animate__fadeInUp");
        buttons.forEach((btn: Element, i: number) => {
          (btn as HTMLElement).style.animationDelay = `${0.6 + i * 0.1}s`;
          btn.classList.add("animate__animated", "animate__fadeInUp");
        });
      }, 400); // timing sinkron dengan fade & zoom
    }
  };

  return (
    <section className="hero-area">
      <Swiper
        modules={[Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        effect="fade"
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        speed={1000}
        onSlideChangeTransitionEnd={handleSlideAnimation}
        onSwiper={(swiper) => handleSlideAnimation(swiper)}
        className="hero-post-slides"
      >
        {/* ===== Slide 1 ===== */}
        <SwiperSlide>
          <div className="single-hero-post bg-overlay">
            <div className="slide-img bg-img">
              <Image
                src="/img/bg-img/1.jpg"
                alt="Hero background 1"
                fill
                priority
                style={{ objectFit: "cover", zIndex: -1 }}
                sizes="100vw"
              />
            </div>

            <div className="container h-100">
              <div className="row h-100 align-items-center">
                <div className="col-12">
                  <div className="hero-slides-content text-center text-white">
                    <h2>Plants exist in the weather and light rays that surround them</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur pellentesque ante nec ipsum iaculis, ac iaculis ipsum porttitor.
                    </p>
                    <div className="welcome-btn-group">
                      <Link href="/about" className="btn alazea-btn mr-30">GET STARTED</Link>
                      <Link href="/contact" className="btn alazea-btn active">CONTACT US</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* ===== Slide 2 ===== */}
        <SwiperSlide>
          <div className="single-hero-post bg-overlay">
            <div className="slide-img bg-img">
              <Image
                src="/img/bg-img/2.jpg"
                alt="Hero background 2"
                fill
                style={{ objectFit: "cover", zIndex: -1 }}
                sizes="100vw"
              />
            </div>

            <div className="container h-100">
              <div className="row h-100 align-items-center">
                <div className="col-12">
                  <div className="hero-slides-content text-center text-white">
                    <h2>Nature’s beauty inspires creation</h2>
                    <p>
                      Vivamus cursus nisl lectus, id mattis nisl lobortis eu. Duis diam augue, dapibus ut dolor at, mattis maximus dolor.
                    </p>
                    <div className="welcome-btn-group">
                      <Link href="/about" className="btn alazea-btn mr-30">LEARN MORE</Link>
                      <Link href="/contact" className="btn alazea-btn active">CONTACT US</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
