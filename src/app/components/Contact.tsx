"use client";

import React, { useEffect, useRef, useActionState } from 'react'; // <-- 1. IMPORT DIUBAH
// Impor useFormStatus tetap dari 'react-dom'
import { useFormStatus } from 'react-dom';

import { submitContactForm, type FormState } from '@/app/actions';

// Komponen Tombol Submit (tidak berubah)
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className="btn alazea-btn mt-15" disabled={pending}>
      {pending ? 'Sending...' : 'Send Message'}
    </button>
  );
}

export default function Contact() {
  const initialState: FormState = { status: 'idle', message: '' };

  // 2. NAMA HOOK DIUBAH
  const [state, formAction] = useActionState(submitContactForm, initialState);
  
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === 'success') {
      alert(state.message);
      formRef.current?.reset();
    } else if (state.status === 'error') {
      alert(state.message);
    }
  }, [state]);


  return (
    <section className="contact-area section-padding-100-0">
      <div className="container">
        <div className="row align-items-center justify-content-between">
          <div className="col-12 col-lg-5">
            {/* Section Heading */}
            <div className="section-heading">
              <h2>GET IN TOUCH</h2>
              <p>Send us a message, we will call back later</p>
            </div>
            
            <div className="contact-form-area mb-100">
              <form ref={formRef} action={formAction}>
                <div className="row">
                  <div className="col-12 col-sm-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="contact-name"
                        placeholder="Your Name"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control"
                        name="contact-email"
                        placeholder="Your Email"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="contact-subject"
                        placeholder="Subject"
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <textarea
                        className="form-control"
                        name="message"
                        id="message"
                        cols={30}
                        rows={10}
                        placeholder="Message"
                        required
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-12">
                    <SubmitButton />
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="col-12 col-lg-6">
            {/* Google Maps */}
            <div className="map-area mb-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.81956137400134!3d-6.194420060714436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f4351600a383%3A0x4e75e5233513a0e2!2sMonumen%20Nasional!5e0!3m2!1sid!2sid!4v1730574712079!5m2!1sid!2sid" // Ganti dengan URL Google Maps yang valid
                style={{ border: 0, width: '100%', height: '100%' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}