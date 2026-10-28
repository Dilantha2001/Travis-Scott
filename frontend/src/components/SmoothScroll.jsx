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
    // 1. Initialize Lenis with luxury exponential easing curve
    const lenis = new Lenis({
      duration: 1.25, // Fluid momentum duration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential deceleration (signature Awwwards butter glide)
      direction: 'vertical',
      gestureDirection: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.05, // Responsive without overshoot
      touchMultiplier: 1.8,
      syncTouch: false,
      infinite: false,
      autoResize: true,
      prevent: (node) => node.classList?.contains('modal-body') || node.closest?.('[data-lenis-prevent]'),
    });

    lenisRef.current = lenis;
    window.lenis = lenis;

    // 2. Synchronize Lenis with GSAP ScrollTrigger
    const handleScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on('scroll', handleScroll);

    // 3. Drive Lenis RAF inside GSAP ticker for 100% V-Sync synchronisation
    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);

    // 4. Disable GSAP lag smoothing to eliminate micro-stutters during rapid scrolling
    gsap.ticker.lagSmoothing(0);

    // 5. Intercept anchor links for silky smooth in-page gliding
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href) return;

      const isSamePageAnchor = href.startsWith('#') || (href.startsWith('/#') && location.pathname === '/');
      if (isSamePageAnchor) {
        const selector = href.replace(/^\/?#/, '');
        const targetEl = document.getElementById(selector) || document.querySelector(`[name="${selector}"]`);
        if (targetEl && lenisRef.current) {
          e.preventDefault();
          lenisRef.current.scrollTo(targetEl, {
            offset: -60,
            duration: 1.4,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        }
      }
    };
    document.addEventListener('click', handleAnchorClick);

    // 6. Dynamic dimension sync when images and webfonts settle
    const refreshDimensions = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };

    window.addEventListener('load', refreshDimensions);
    if (document.fonts?.ready) {
      document.fonts.ready.then(refreshDimensions);
    }

    let resizeObserver;
    if (typeof ResizeObserver !== 'undefined' && document.body) {
      resizeObserver = new ResizeObserver(() => {
        lenis.resize();
        ScrollTrigger.refresh();
      });
      resizeObserver.observe(document.body);
    }

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('load', refreshDimensions);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      gsap.ticker.remove(updateTicker);
      lenis.off('scroll', handleScroll);
      lenis.destroy();
      lenisRef.current = null;
      window.lenis = null;
    };
  }, [location.pathname]);

  // Handle preloader state transition
  useEffect(() => {
    if (!lenisRef.current) return;

    if (isLoading) {
      lenisRef.current.stop();
    } else {
      lenisRef.current.start();
      // Staggered layout recalibration as the preloader slides away
      const timers = [
        setTimeout(() => {
          lenisRef.current?.resize();
          ScrollTrigger.refresh();
        }, 50),
        setTimeout(() => {
          lenisRef.current?.resize();
          ScrollTrigger.refresh();
        }, 300),
        setTimeout(() => {
          lenisRef.current?.resize();
          ScrollTrigger.refresh();
        }, 800),
        setTimeout(() => {
          lenisRef.current?.resize();
          ScrollTrigger.refresh();
        }, 1500)
      ];

      return () => timers.forEach(t => clearTimeout(t));
    }
  }, [isLoading]);

  // Reset scroll to top on route change
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
      const timer = setTimeout(() => {
        lenisRef.current?.resize();
        ScrollTrigger.refresh();
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  return <>{children}</>;
};

export default SmoothScroll;
