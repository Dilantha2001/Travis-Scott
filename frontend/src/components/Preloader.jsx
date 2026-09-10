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
      .to('.preloader-glitch-text', {
        opacity: 0,
        scale: 1.1,
        duration: 0.4,
        ease: 'power2.in'
      }, "<")
      .to('.preloader-progress-bar-container', {
        scaleX: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.inOut'
      }, "-=0.2")
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
        <h1 className="preloader-glitch-text" data-text="SYSTEM INITIALIZING...">
          SYSTEM INITIALIZING...
        </h1>
        <div className="preloader-progress-bar-container">
          <div 
            className="preloader-progress-bar" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="preloader-percentage" ref={percentRef}>
          {Math.min(progress, 100)}%
        </div>
      </div>
    </div>
  );
};

export default Preloader;
