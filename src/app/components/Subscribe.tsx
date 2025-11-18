// src/app/components/Subscribe.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { subscribeAction } from '@/actions/subscribe'; // Import Server Action

export default function Subscribe() {
  const [message, setMessage] = useState<{ type: 'success' | 'error' | null, text: string }>({ type: null, text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handler form dengan Server Action
  const handleSubmit = async (formData: FormData) => {
    setMessage({ type: null, text: '' });
    setIsSubmitting(true);
    
    // Panggil Server Action
    const result = await subscribeAction(formData);

    if (result.success) {
      setMessage({ type: 'success', text: result.message });
      // Clear form field jika sukses
      (document.getElementById('subscribeEmail') as HTMLInputElement).value = ''; 
    } else {
      setMessage({ type: 'error', text: result.message || 'Terjadi kesalahan tidak terduga.' });
    }
    
    setIsSubmitting(false);
  };


  return (
    <section 
        className="subscribe-newsletter-area bg-img section-padding-100-0"
        style={{ backgroundImage: 'url(/img/bg-img/26.jpg)' }}
    >
      <div className="container">
        <div className="row align-items-center justify-content-between">
          
          {/* Konten Kiri */}
          <div className="col-12 col-lg-5">
            <div className="section-heading mb-100">
              <h2>SUBSCRIBE TO OUR NEWSLETTER</h2>
              <p>Subscribe to our newsletter and get exclusive access to new products, special offers, and inspirational content.</p>
            </div>
          </div>
          
          {/* Form Kanan */}
          <div className="col-12 col-lg-7">
            <div className="subscribe-form mb-100">
              
              {/* Gunakan 'action' properti untuk Server Action */}
              <form action={handleSubmit}>
                <input 
                  type="email" 
                  name="email" 
                  id="subscribeEmail" 
                  placeholder="Enter your email" 
                  required
                  disabled={isSubmitting}
                />
                
                <button type="submit" className="btn alazea-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'SUBSCRIBE'}
                </button>
              </form>

              {/* Feedback Area */}
              {message.type && (
                <div 
                  className={`mt-30 alert alert-${message.type === 'success' ? 'success' : 'danger'}`}
                  role="alert"
                >
                  {message.text}
                </div>
              )}

            </div>
          </div>

          {/* Side Thumbnail (Tetap ada jika Anda menggunakannya) */}
          <div className="subscribe-side-thumb wow fadeInUp" data-wow-delay="500ms">
            <Image src="/img/core-img/leaf.png" alt="Leaf" width={100} height={100} />
          </div>

        </div>
      </div>
    </section>
  );
}