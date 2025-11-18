"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500); // simulasi loading
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="preloader d-flex align-items-center justify-content-center">
      <div className="preloader-circle"></div>
      <div className="preloader-img">
        <Image
          src="/img/core-img/leaf.png"
          alt="Loading"
          width={45}
          height={45}
          priority={true}
          style={{ width: "auto", height: "100%" }}
        />
      </div>
    </div>
  );
}
