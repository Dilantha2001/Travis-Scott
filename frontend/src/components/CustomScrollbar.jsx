import React, { useEffect, useState, useRef } from 'react';
import './CustomScrollbar.css';

const CustomScrollbar = ({ isLoading }) => {
  const [thumbHeight, setThumbHeight] = useState(80);
  const [isDragging, setIsDragging] = useState(false);
  const startDragY = useRef(0);
  const startScrollY = useRef(0);
  const trackRef = useRef(null);
  const thumbRef = useRef(null);
  const rafId = useRef(null);

  // Cached dimension metrics to avoid layout thrashing during scroll
  const metrics = useRef({
    docHeight: 0,
    winHeight: 0,
    maxScroll: 0,
    thumbHeight: 80,
    availableTrack: 0
  });

  const recalculateDimensions = () => {
    if (typeof window === 'undefined') return;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    const maxScroll = docHeight - winHeight;

    if (maxScroll <= 0) {
      setThumbHeight(0);
      metrics.current = { docHeight, winHeight, maxScroll: 0, thumbHeight: 0, availableTrack: 0 };
      return;
    }

    const calculatedHeight = Math.max(60, Math.min(winHeight * 0.7, (winHeight / docHeight) * winHeight));
    const availableTrack = winHeight - calculatedHeight;

    metrics.current = {
      docHeight,
      winHeight,
      maxScroll,
      thumbHeight: calculatedHeight,
      availableTrack
    };

    setThumbHeight(calculatedHeight);
    updateThumbPosition();
  };

  const updateThumbPosition = () => {
    if (!thumbRef.current) return;
    const { maxScroll, availableTrack } = metrics.current;
    if (maxScroll <= 0 || availableTrack <= 0) return;

    const currentScroll = window.lenis ? window.lenis.scroll : window.scrollY;
    const scrollRatio = Math.min(1, Math.max(0, currentScroll / maxScroll));
    const thumbTop = scrollRatio * availableTrack;

    thumbRef.current.style.transform = `translate3d(0, ${thumbTop}px, 0)`;
  };

  useEffect(() => {
    if (isLoading) return;

    recalculateDimensions();

    const handleScroll = () => {
      if (isDragging) return;
      if (rafId.current) return;
      rafId.current = requestAnimationFrame(() => {
        updateThumbPosition();
        rafId.current = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', recalculateDimensions, { passive: true });

    let lenisUnsub;
    if (window.lenis) {
      window.lenis.on('scroll', handleScroll);
      lenisUnsub = () => window.lenis?.off('scroll', handleScroll);
    }

    const ro = new ResizeObserver(() => {
      recalculateDimensions();
    });
    if (document.body) {
      ro.observe(document.body);
    }

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', recalculateDimensions);
      if (lenisUnsub) lenisUnsub();
      ro.disconnect();
    };
  }, [isLoading, isDragging]);

  // Handle Dragging
  const handleThumbMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    startDragY.current = e.clientY;
    startScrollY.current = window.lenis ? window.lenis.scroll : window.scrollY;
    document.body.style.userSelect = 'none';
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e) => {
      const deltaY = e.clientY - startDragY.current;
      const { maxScroll, availableTrack } = metrics.current;

      if (availableTrack <= 0 || maxScroll <= 0) return;

      const scrollDelta = (deltaY / availableTrack) * maxScroll;
      const targetScroll = Math.max(0, Math.min(maxScroll, startScrollY.current + scrollDelta));

      if (window.lenis) {
        window.lenis.scrollTo(targetScroll, { immediate: true });
      } else {
        window.scrollTo(0, targetScroll);
      }

      const scrollRatio = targetScroll / maxScroll;
      const thumbTop = scrollRatio * availableTrack;
      if (thumbRef.current) {
        thumbRef.current.style.transform = `translate3d(0, ${thumbTop}px, 0)`;
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.userSelect = '';
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
    };
  }, [isDragging]);

  // Click on Track to jump
  const handleTrackClick = (e) => {
    if (e.target.closest('.custom-scrollbar-thumb')) return;
    if (!trackRef.current) return;

    const trackRect = trackRef.current.getBoundingClientRect();
    const clickY = e.clientY - trackRect.top;
    const { maxScroll, availableTrack, thumbHeight: currentThumbHeight } = metrics.current;

    if (availableTrack <= 0 || maxScroll <= 0) return;

    const targetScrollRatio = Math.max(0, Math.min(1, (clickY - currentThumbHeight / 2) / availableTrack));
    const targetScroll = targetScrollRatio * maxScroll;

    if (window.lenis) {
      window.lenis.scrollTo(targetScroll, { duration: 0.9 });
    } else {
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  };

  if (isLoading || thumbHeight === 0) return null;

  return (
    <div 
      className="custom-scrollbar-track" 
      ref={trackRef} 
      onClick={handleTrackClick}
      title="Scroll"
    >
      <div 
        ref={thumbRef}
        className={`custom-scrollbar-thumb ${isDragging ? 'dragging' : ''}`}
        style={{
          height: `${thumbHeight}px`,
          willChange: 'transform'
        }}
        onMouseDown={handleThumbMouseDown}
      >
        <div className="thumb-grip-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default CustomScrollbar;
