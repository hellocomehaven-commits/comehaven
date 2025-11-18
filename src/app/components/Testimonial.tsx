"use client";

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react'; 

// Import modules yang dibutuhkan
import { Autoplay, Pagination, EffectFade, Navigation } from 'swiper/modules'; 

// Import Swiper CSS
import 'swiper/css'; 
import 'swiper/css/navigation'; 
import 'swiper/css/pagination'; 
import 'swiper/css/effect-fade'; 

export default function Testimonial() {
  return (
    <section className="testimonial-area section-padding-100">
      <div className="container">
        <div className="row">
          <div className="col-12">
            
            <Swiper
              modules={[Autoplay, Pagination, EffectFade, Navigation]} 
              spaceBetween={0}
              slidesPerView={1}
              loop={true}
              effect="fade"
              // PENTING: Target elemen kustom di luar Swiper
              pagination={{ el: '.testimonial-pagination-dots', clickable: true }} 
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              className="testimonials-slides"
            >
              {/* Slide 1 */}
              <SwiperSlide key="slide-1">
                <div className="single-testimonial-slide">
                  <div className="row align-items-center">
                    <div className="col-12 col-md-6">
                      <div className="testimonial-thumb">
                        <Image
                          src="/img/bg-img/13.jpg"
                          alt="Testimonial 1"
                          width={540}
                          height={380}
                          style={{ width: '100%', height: 'auto' }}
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="testimonial-content">
                        <div className="section-heading">
                          <h2>TESTIMONIAL</h2>
                          <p>Some kind words from clients about Alazea</p>
                        </div>
                        <p>
                          “Alazea is a pleasure to work with. Their ideas are creative, they came up with imaginative
                          solutions to some tricky issues, their landscaping and planting contacts are equally excellent.”
                        </p>
                        <div className="testimonial-author-info">
                          <h6 style={{ marginBottom: '5px' }}>Mr. Nick Jonas</h6>
                          <p className="text-success">CEO of NAVATECH</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>

              {/* Slide 2 */}
              <SwiperSlide key="slide-2">
                <div className="single-testimonial-slide">
                  <div className="row align-items-center">
                    <div className="col-12 col-md-6">
                      <div className="testimonial-thumb">
                        <Image
                          src="/img/bg-img/14.jpg"
                          alt="Testimonial 2"
                          width={540}
                          height={380}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="testimonial-content">
                        <div className="section-heading">
                          <h2>TESTIMONIAL</h2>
                          <p>Some kind words from clients about Alazea</p>
                        </div>
                        <p>
                          “Great creativity and problem solving. Their landscaping team handled complex challenges beautifully.”
                        </p>
                        <div className="testimonial-author-info">
                          <h6 style={{ marginBottom: '5px' }}>Mr. Nazrul Islam</h6>
                          <p className="text-success">CEO of NAVATECH</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>

              {/* Slide 3 */}
              <SwiperSlide key="slide-3">
                <div className="single-testimonial-slide">
                  <div className="row align-items-center">
                    <div className="col-12 col-md-6">
                      <div className="testimonial-thumb">
                        <Image
                          src="/img/bg-img/15.jpg"
                          alt="Testimonial 3"
                          width={540}
                          height={380}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="testimonial-content">
                        <div className="section-heading">
                          <h2>TESTIMONIAL</h2>
                          <p>Some kind words from clients about Alazea</p>
                        </div>
                        <p>
                          “Professional service and stunning design outcome. We’re more than happy with the results!”
                        </p>
                        <div className="testimonial-author-info">
                          <h6 style={{ marginBottom: '5px' }}>Mr. Jonas Nick</h6>
                          <p className="text-success">CEO of NAVATECH</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>

            {/* KONTROL CUSTOM: Ditempatkan di lokasi yang dijamin sejajar dengan kolom gambar (col-md-6) */}
            <div className="row">
              {/* Kolom ini memastikan pagination ditarik ke kiri dan hanya menempati setengah ruang (di desktop) */}
              <div className="col-12 col-md-6 d-flex justify-content-center"> 
                  {/* Swiper akan mengisi elemen ini */}
                  <div className="testimonial-pagination-dots mt-3"></div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}