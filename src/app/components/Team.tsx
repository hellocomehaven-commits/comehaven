"use client";

import React from 'react';
import Image from 'next/image';
// Pastikan hook ini sudah Anda buat: src/app/hooks/useInViewAnimation.ts
import { useInViewAnimation } from '../hooks/useInViewAnimation'; 

export default function Team() {

  // Inisialisasi hook untuk setiap anggota tim (menggantikan WOW.js)
  // Delay 100ms, 300ms, 500ms, 700ms untuk efek berurutan
  const member1 = useInViewAnimation(100); 
  const member2 = useInViewAnimation(300); 
  const member3 = useInViewAnimation(500); 
  const member4 = useInViewAnimation(700); 

  // Fungsi untuk mendapatkan kelas animasi
  const getAnimationClass = (isVisible: boolean) => {
    // Tambahkan kelas animasi dan class animate__animated hanya jika hook sudah memicu isVisible
    return isVisible ? 'animate__animated animate__fadeInUp' : '';
  };
  
  return (
    <section className="team-area section-padding-100-0">
      <div className="container">
        <div className="row">
          <div className="col-12">
            {/* Section Heading */}
            <div className="section-heading text-center">
              <h2>OUR TEAM</h2>
              <p>A team of dedicated experienced professionals.</p>
            </div>
          </div>
        </div>

        <div className="row">

          {/* Single Team Member Area 1: Joseph Corbin */}
          <div className="col-12 col-sm-6 col-lg-3">
            <div 
              ref={member1.ref as React.RefObject<HTMLDivElement>} 
              // Class: single-team-member (Disembunyikan oleh CSS global jika belum ada animate__animated)
              className={`single-team-member text-center mb-100 ${getAnimationClass(member1.isVisible)}`}
            >
              {/* Team Member Thumb */}
              <div className="team-member-thumb">
                {/* Menghapus style inline agar CSS eksternal mengontrol display */}
                <Image src="/img/bg-img/team1.png" alt="Team 1" width={254} height={254} />
                {/* Social Info */}
                <div className="team-member-social-info">
                  <a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                  <a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                  <a href="#"><i className="fa fa-google-plus" aria-hidden="true"></i></a>
                  <a href="#"><i className="fa fa-linkedin" aria-hidden="true"></i></a>
                </div>
              </div>
              {/* Team Member Info */}
              <div className="team-member-info mt-30">
                <h5>Joseph Corbin</h5>
                <p>CEO &amp; Founder</p>
              </div>
            </div>
          </div>

          {/* Single Team Member Area 2: Tasha Deserio */}
          <div className="col-12 col-sm-6 col-lg-3">
            <div 
              ref={member2.ref as React.RefObject<HTMLDivElement>}
              className={`single-team-member text-center mb-100 ${getAnimationClass(member2.isVisible)}`}
            >
              {/* Team Member Thumb */}
              <div className="team-member-thumb">
                <Image src="/img/bg-img/team2.png" alt="Team 2" width={254} height={254} />
                {/* Social Info */}
                <div className="team-member-social-info">
                  <a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                  <a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                  <a href="#"><i className="fa fa-google-plus" aria-hidden="true"></i></a>
                  <a href="#"><i className="fa fa-linkedin" aria-hidden="true"></i></a>
                </div>
              </div>
              {/* Team Member Info */}
              <div className="team-member-info mt-30">
                <h5>Tasha Deserio</h5>
                <p>Garden Designer</p>
              </div>
            </div>
          </div>

          {/* Single Team Member Area 3: Cody Baker */}
          <div className="col-12 col-sm-6 col-lg-3">
            <div 
              ref={member3.ref as React.RefObject<HTMLDivElement>}
              className={`single-team-member text-center mb-100 ${getAnimationClass(member3.isVisible)}`}
            >
              {/* Team Member Thumb */}
              <div className="team-member-thumb">
                <Image src="/img/bg-img/team3.png" alt="Team 3" width={254} height={254} />
                {/* Social Info */}
                <div className="team-member-social-info">
                  <a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                  <a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                  <a href="#"><i className="fa fa-google-plus" aria-hidden="true"></i></a>
                  <a href="#"><i className="fa fa-linkedin" aria-hidden="true"></i></a>
                </div>
              </div>
              {/* Team Member Info */}
              <div className="team-member-info mt-30">
                <h5>Cody Baker</h5>
                <p>Plan Manager</p>
              </div>
            </div>
          </div>

          {/* Single Team Member Area 4: Pearl Kansas */}
          <div className="col-12 col-sm-6 col-lg-3">
            <div 
              ref={member4.ref as React.RefObject<HTMLDivElement>}
              className={`single-team-member text-center mb-100 ${getAnimationClass(member4.isVisible)}`}
            >
              {/* Team Member Thumb */}
              <div className="team-member-thumb">
                <Image src="/img/bg-img/team4.png" alt="Team 4" width={254} height={254} />
                {/* Social Info */}
                <div className="team-member-social-info">
                  <a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                  <a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                  <a href="#"><i className="fa fa-google-plus" aria-hidden="true"></i></a>
                  <a href="#"><i className="fa fa-linkedin" aria-hidden="true"></i></a>
                </div>
              </div>
              {/* Team Member Info */}
              <div className="team-member-info mt-30">
                <h5>Pearl Kansas</h5>
                <p>Marketer</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}