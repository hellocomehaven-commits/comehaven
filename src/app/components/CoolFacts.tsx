"use client";

import React from 'react';
import Image from 'next/image';
import { useCounterAnimation } from '../hooks/useCounterAnimation'; 
// Asumsi hook ini ada di: src/app/hooks/useCounterAnimation.ts

export default function CoolFacts() {
  
  // End Values Asli
  const END_AWARDS = 20;
  const END_PROJECTS = 70;
  const END_CLIENTS = 30;
  const END_REVENUE = 80;

  // Inisialisasi Hook Counter
  const { count: awards, ref: refAwards } = useCounterAnimation(END_AWARDS, 1500);
  const { count: projects, ref: refProjects } = useCounterAnimation(END_PROJECTS, 1500);
  const { count: clients, ref: refClients } = useCounterAnimation(END_CLIENTS, 1500);
  const { count: revenue, ref: refRevenue } = useCounterAnimation(END_REVENUE, 1500);
  

  // Fungsi Pembantu untuk Tampilan:
  // Jika count masih 0 (belum terpicu), tampilkan END VALUE agar tidak muncul '0'
  const displayAwards = awards > 0 ? awards : END_AWARDS;
  const displayProjects = projects > 0 ? projects : END_PROJECTS;
  const displayClients = clients > 0 ? clients : END_CLIENTS;
  const displayRevenue = revenue > 0 ? revenue : END_REVENUE;


  return (
    <section 
      className="cool-facts-area section-padding-100-0 bg-gray" 
      style={{ 
        backgroundImage: 'url(/img/bg-img/cool-facts.png)', 
        backgroundPosition: 'top left', 
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="container">
        <div className="row">

          {/* 1. Awards */}
          <div className="col-12 col-sm-6 col-md-3">
            <div className="single-cool-fact d-flex align-items-center justify-content-center mb-100">
              <div className="cf-icon">
                <Image src="/img/core-img/cf1.png" alt="Awards" width={50} height={50} /> 
              </div>
              <div className="cf-content">
                {/* Tampilkan angka hasil counter atau angka akhir */}
                <h2 ref={refAwards}><span className="counter">{displayAwards}</span></h2>
                <h6>AWARDS</h6>
              </div>
            </div>
          </div>
          
          {/* 2. Projects */}
          <div className="col-12 col-sm-6 col-md-3">
            <div className="single-cool-fact d-flex align-items-center justify-content-center mb-100">
              <div className="cf-icon">
                <Image src="/img/core-img/cf2.png" alt="Projects" width={50} height={50} />
              </div>
              <div className="cf-content">
                <h2 ref={refProjects}><span className="counter">{displayProjects}</span></h2>
                <h6>PROJECTS</h6>
              </div>
            </div>
          </div>

          {/* 3. Happy Clients */}
          <div className="col-12 col-sm-6 col-md-3">
            <div className="single-cool-fact d-flex align-items-center justify-content-center mb-100">
              <div className="cf-icon">
                <Image src="/img/core-img/cf3.png" alt="Happy Clients" width={50} height={50} />
              </div>
              <div className="cf-content">
                <h2 ref={refClients}><span className="counter">{displayClients}</span>+</h2>
                <h6>HAPPY CLIENTS</h6>
              </div>
            </div>
          </div>

          {/* 4. Revenue */}
          <div className="col-12 col-sm-6 col-md-3">
            <div className="single-cool-fact d-flex align-items-center justify-content-center mb-100">
              <div className="cf-icon">
                <Image src="/img/core-img/cf4.png" alt="Revenue" width={50} height={50} />
              </div>
              <div className="cf-content">
                <h2 ref={refRevenue}><span className="counter">{displayRevenue}</span>K+</h2>
                <h6>REVENUE</h6>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}