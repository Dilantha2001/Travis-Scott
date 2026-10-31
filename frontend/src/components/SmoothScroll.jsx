import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SmoothScroll = ({ children }) => {
  const lenisRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    // 0. Ensure manual scroll restoration and reset to top
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    // 1. Initialize Lenis with luxury exponential easing curve
    const lenis = new Lenis({
      duration: 1.15, // Butter-smooth fluid duration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential deceleration
      direction: 'vertical',
      gestureDirection: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      syncTouch: false,
      infinite: false,
      autoResize: true,
      prevent: (node) => node.classList?.contains('modal-body') || node.closest?.('[data-lenis-prevent]'),
    });

    lenisRef.current = lenis;
    window.lenis = lenis;

    // Immediately start at top if no hash in URL
    if (!location.hash) {
      window.scrollTo(0, 0);
      lenis.scrollTo(0, { immediate: true });
    }

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

    // 4. Smooth lag handling to eliminate micro-stutters during rapid scrolling
    gsap.ticker.lagSmoothing(500, 33);

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
            offset: -70,
            duration: 1.3,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
          window.history.pushState(null, '', `/#${selector}`);
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

    // Staggered layout recalibration on initial mount to guarantee top position and trigger sync
    const timers = [
      setTimeout(() => {
        if (!location.hash) {
          window.scrollTo(0, 0);
          lenis.scrollTo(0, { immediate: true });
        }
        lenis.resize();
        ScrollTrigger.refresh();
      }, 50),
      setTimeout(() => {
        if (!location.hash) {
          window.scrollTo(0, 0);
          lenis.scrollTo(0, { immediate: true });
        }
        lenis.resize();
        ScrollTrigger.refresh();
      }, 250),
      setTimeout(() => {
        lenis.resize();
        ScrollTrigger.refresh();
      }, 600),
    ];

    return () => {
      timers.forEach((t) => clearTimeout(t));
      window.removeEventListener('beforeunload', handleBeforeUnload);
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

  // Reset scroll to top on route change or scroll to target hash
  useEffect(() => {
    if (!lenisRef.current) return;

    if (location.hash) {
      const selector = location.hash.replace(/^#/, '');
      const targetEl = document.getElementById(selector) || document.querySelector(`[name="${selector}"]`);
      if (targetEl) {
        const timer = setTimeout(() => {
          lenisRef.current?.scrollTo(targetEl, {
            offset: -70,
            duration: 1.3,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        }, 120);
        return () => clearTimeout(timer);
      }
    }

    window.scrollTo(0, 0);
    lenisRef.current.scrollTo(0, { immediate: true });
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      lenisRef.current?.scrollTo(0, { immediate: true });
      lenisRef.current?.resize();
      ScrollTrigger.refresh();
    }, 60);
    return () => clearTimeout(timer);
  }, [location.pathname, location.hash]);

  return <>{children}</>;
};

export default SmoothScroll;
