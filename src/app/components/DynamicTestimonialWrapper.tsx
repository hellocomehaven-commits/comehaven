"use client";

import dynamic from 'next/dynamic';
import React from 'react';

// Import Testimonial (file asli yang sudah ada)
const Testimonial = dynamic(() => import('./Testimonial'), { 
    // ✅ FIX: ssr: false sekarang berada di dalam Client Component, jadi diizinkan
    ssr: false, 
    loading: () => (
        <section className="testimonial-area section-padding-100">
            <div className="container">
                <p>Loading Testimonials...</p>
            </div>
        </section>
    ),
});

/**
 * Wrapper ini adalah Client Component yang tugasnya hanya me-render Testimonial secara client-side.
 */
export default function DynamicTestimonialWrapper() {
  return <Testimonial />;
}