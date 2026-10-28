import React, { useEffect, useState, useRef } from 'react';
import './CustomScrollbar.css';

const CustomScrollbar = ({ isLoading }) => {
  const [thumbTop, setThumbTop] = useState(0);
  const [thumbHeight, setThumbHeight] = useState(80);
  const [isDragging, setIsDragging] = useState(false);
  const startDragY = useRef(0);
  const startScrollY = useRef(0);
  const trackRef = useRef(null);

  const updateScrollbar = () => {
    if (typeof window === 'undefined') return;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    const maxScroll = docHeight - winHeight;

    if (maxScroll <= 0) {
      setThumbHeight(0);
      return;
    }

    // Proportional thumb height (clamped between 60px and winHeight * 0.7)
    const calculatedHeight = Math.max(60, Math.min(winHeight * 0.7, (winHeight / docHeight) * winHeight));
    setThumbHeight(calculatedHeight);

    const currentScroll = window.lenis ? window.lenis.scroll : window.scrollY;
    const scrollRatio = Math.min(1, Math.max(0, currentScroll / maxScroll));
    const availableTrack = winHeight - calculatedHeight;
    setThumbTop(scrollRatio * availableTrack);
  };

  useEffect(() => {
    if (isLoading) return;

    updateScrollbar();

    const handleScroll = () => {
      if (!isDragging) {
        updateScrollbar();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateScrollbar);

    let lenisUnsub;
    if (window.lenis) {
      window.lenis.on('scroll', handleScroll);
      lenisUnsub = () => window.lenis?.off('scroll', handleScroll);
    }

    const ro = new ResizeObserver(updateScrollbar);
    if (document.body) {
      ro.observe(document.body);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateScrollbar);
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
      const winHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const maxScroll = docHeight - winHeight;
      const availableTrack = winHeight - thumbHeight;

      if (availableTrack <= 0) return;

      const scrollDelta = (deltaY / availableTrack) * maxScroll;
      const targetScroll = Math.max(0, Math.min(maxScroll, startScrollY.current + scrollDelta));

      if (window.lenis) {
        window.lenis.scrollTo(targetScroll, { immediate: true });
      } else {
        window.scrollTo(0, targetScroll);
      }

      const scrollRatio = targetScroll / maxScroll;
      setThumbTop(scrollRatio * availableTrack);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.userSelect = '';
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
    };
  }, [isDragging, thumbHeight]);

  // Click on Track to jump
  const handleTrackClick = (e) => {
    if (e.target.closest('.custom-scrollbar-thumb')) return;
    if (!trackRef.current) return;

    const trackRect = trackRef.current.getBoundingClientRect();
    const clickY = e.clientY - trackRect.top;
    const winHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const maxScroll = docHeight - winHeight;
    const availableTrack = winHeight - thumbHeight;

    if (availableTrack <= 0) return;

    const targetScrollRatio = Math.max(0, Math.min(1, (clickY - thumbHeight / 2) / availableTrack));
    const targetScroll = targetScrollRatio * maxScroll;

    if (window.lenis) {
      window.lenis.scrollTo(targetScroll, { duration: 1.0 });
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
        className={`custom-scrollbar-thumb ${isDragging ? 'dragging' : ''}`}
        style={{
          height: `${thumbHeight}px`,
          transform: `translateY(${thumbTop}px)`
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
