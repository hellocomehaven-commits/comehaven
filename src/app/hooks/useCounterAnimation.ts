// src/app/hooks/useCounterAnimation.ts

import { useState, useEffect, useRef } from 'react';

export function useCounterAnimation(endValue: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const startValue = 0;
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let startTime: number;
          
          const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);
            
            setCount(Math.floor(percentage * (endValue - startValue) + startValue));
            
            if (percentage < 1) {
              window.requestAnimationFrame(step);
            }
          };

          window.requestAnimationFrame(step);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 1.0 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [endValue, duration]);

  return { count, ref };
}