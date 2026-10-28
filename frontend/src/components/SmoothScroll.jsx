import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SmoothScroll = ({ children, isLoading }) => {
  const lenisRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    // 1. Initialize Lenis (driven by GSAP ticker for 100% synchronized V-Sync)
    const lenis = new Lenis({
      lerp: 0.1, // Smooth, natural 60fps interpolation
      wheelMultiplier: 1.0, // Responsive 1:1 wheel reaction without overshoot
      touchMultiplier: 1.5,
      smoothWheel: true,
      syncTouch: false,
      infinite: false,
    });

    lenisRef.current = lenis;
    window.lenis = lenis;

    // 2. Synchronize Lenis with GSAP ScrollTrigger
    const handleScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on('scroll', handleScroll);

    // 3. Drive Lenis RAF inside GSAP ticker so scroll and animation render in the EXACT same frame
    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);

    // 4. CRITICAL: Disable GSAP lag smoothing to eliminate the sluggish 500ms delay during rapid scroll
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.off('scroll', handleScroll);
      lenis.destroy();
      lenisRef.current = null;
      window.lenis = null;
    };
  }, []);

  // 3. Handle preloader state (disable scrolling during load, enable & refresh after)
  useEffect(() => {
    if (!lenisRef.current) return;

    if (isLoading) {
      lenisRef.current.stop();
    } else {
      lenisRef.current.start();
      const timer = setTimeout(() => {
        lenisRef.current?.resize();
        ScrollTrigger.refresh();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  // 4. Reset scroll to top on route change
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
      const timer = setTimeout(() => {
        lenisRef.current?.resize();
        ScrollTrigger.refresh();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  return <>{children}</>;
};

export default SmoothScroll;
