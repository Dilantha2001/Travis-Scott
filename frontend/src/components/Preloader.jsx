import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Preloader.css';

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);
  const percentRef = useRef(null);

  useEffect(() => {
    // Simulate loading progress
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        // Random increment for a more organic, erratic loading feel
        return prev + Math.floor(Math.random() * 15) + 2;
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const tl = gsap.timeline({
        onComplete: onComplete
      });

      tl.to(percentRef.current, {
        opacity: 0,
        y: -50,
        duration: 0.5,
        ease: 'power2.in'
      })
      .to('.loader', {
        opacity: 0,
        scale: 1.1,
        duration: 0.4,
        ease: 'power2.in'
      }, "<")
      .to('.smokio-text', {
        opacity: 0,
        scale: 1.1,
        duration: 0.4,
        ease: 'power2.in'
      }, "<")
      .to(containerRef.current, {
        y: '-100%',
        duration: 0.8,
        ease: 'power4.inOut'
      });
    }
  }, [progress, onComplete]);

  return (
    <div className="preloader-container" ref={containerRef}>
      <div className="preloader-content">
        <div className="loader">
          <svg width="100" height="100" viewBox="0 0 100 100">
            <defs>
              <mask id="clipping">
                <polygon points="0,0 100,0 100,100 0,100" fill="black"></polygon>
                <polygon points="25,25 75,25 50,75" fill="white"></polygon>
                <polygon points="50,25 75,75 25,75" fill="white"></polygon>
                <polygon points="35,35 65,35 50,65" fill="white"></polygon>
                <polygon points="35,35 65,35 50,65" fill="white"></polygon>
                <polygon points="35,35 65,35 50,65" fill="white"></polygon>
                <polygon points="35,35 65,35 50,65" fill="white"></polygon>
              </mask>
            </defs>
          </svg>
          <div className="box"></div>
        </div>
        <h1 className="smokio-text">SMOKIO</h1>
        <div className="preloader-percentage" ref={percentRef}>
          {Math.min(progress, 100)}%
        </div>
      </div>
    </div>
  );
};

export default Preloader;
