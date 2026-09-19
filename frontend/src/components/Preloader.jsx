import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Preloader.css';

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);
  const percentRef = useRef(null);

  useEffect(() => {
    let timer;
    let isLoaded = document.readyState === 'complete';

    const handleLoad = () => {
      isLoaded = true;
    };
    
    window.addEventListener('load', handleLoad);

    timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        
        // If content isn't fully loaded yet, stall at 99%
        if (prev >= 99 && !isLoaded) {
          return 99;
        }

        // Cinematic sweet spot (takes about 3.5 seconds to reach 100)
        // If internet is slow, the isLoaded check above will keep it paused at 99%.
        return prev + Math.floor(Math.random() * 6) + 1;
      });
    }, 150);

    return () => {
      clearInterval(timer);
      window.removeEventListener('load', handleLoad);
    };
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
