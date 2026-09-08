import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

const Footer = () => {
  const footerRef = useRef(null);
  const trailRefs = useRef([]);
  const lastPos = useRef({ x: 0, y: 0 });
  const currentIndex = useRef(0);
  const zIndexCounter = useRef(10);

  const trailImages = [
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1539375665275-f9de415ef9ac?auto=format&fit=crop&w=500&q=80'
  ];

  const handleMouseMove = (e) => {
    if (!footerRef.current) return;

    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    const distance = Math.hypot(dx, dy);

    // Trigger next image spawn after cursor moves at least 45 pixels
    if (distance > 45) {
      const rect = footerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const imgEl = trailRefs.current[currentIndex.current];

      if (imgEl) {
        zIndexCounter.current += 1;
        const randomRotate = (Math.random() - 0.5) * 28; // Random tilt angle -14deg to +14deg

        gsap.killTweensOf(imgEl);

        const tl = gsap.timeline();

        // Step 1: Pop in at cursor position
        tl.fromTo(imgEl,
          {
            x: x - 80,
            y: y - 100,
            scale: 0.3,
            opacity: 0,
            rotation: randomRotate,
            zIndex: zIndexCounter.current
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.35,
            ease: 'back.out(1.8)'
          }
        )
        // Step 2: Smooth float up & fade out
        .to(imgEl, {
          y: y - 140,
          scale: 0.75,
          opacity: 0,
          duration: 0.55,
          ease: 'power2.in',
          delay: 0.15
        });

        // Cycle to next image in the 5-image sequence
        currentIndex.current = (currentIndex.current + 1) % trailImages.length;
      }

      lastPos.current = { x: e.clientX, y: e.clientY };
    }
  };

  return (
    <footer className="playza-footer" ref={footerRef} onMouseMove={handleMouseMove}>
      
      {/* 5-Image Mouse Cursor Trail Layer */}
      <div className="footer-trail-layer">
        {trailImages.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Trail photo ${idx + 1}`}
            className="footer-trail-img"
            ref={(el) => (trailRefs.current[idx] = el)}
          />
        ))}
      </div>

      <div className="footer-content-wrapper">
        
        {/* Giant Smokio Brand Title */}
        <h1 className="footer-brand-title">smokio</h1>

        {/* Navigation Grid */}
        <div className="footer-nav-grid">
          <div className="footer-nav-col">
            <Link to="/about">INSIDE OUR STORY</Link>
            <Link to="/about">MEET THE ARTIST</Link>
            <Link to="/tours">EXPLORE OUR ALBUMS</Link>
            <Link to="/">LISTEN TO SONGS</Link>
          </div>

          <div className="footer-nav-col">
            <Link to="/about">OUR PROUD AWARDS</Link>
            <Link to="/tours">SHOP OFFICIAL MERCH</Link>
            <Link to="/tours">UPCOMING TOUR DATES</Link>
            <Link to="/about">FIND YOUR ANSWERS</Link>
          </div>

          <div className="footer-nav-col socials-col">
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              YOUTUBE <span className="arrow-icon">↗</span>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              INSTAGRAM <span className="arrow-icon">↗</span>
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
              TIKTOK <span className="arrow-icon">↗</span>
            </a>
          </div>
        </div>

        {/* Bottom Metadata & CTAs */}
        <div className="footer-bottom-row">
          <div className="footer-bottom-left">
            <h3 className="footer-stream-tagline">
              Stream the music that reached 2.4M plays this year and keeps growing every single day.
            </h3>
            <div className="footer-copyright-meta">
              <p>© Smokio. All Rights Reserved. Licensing</p>
              <p>Powered by Smokio Official</p>
            </div>
          </div>

          <div className="footer-bottom-right">
            <p className="footer-bio-mono">
              Smokio brings together over 10 years of Sri Lankan Hip-Hop artistry, performing for more than 250,000 fans worldwide.
            </p>
            <div className="footer-cta-buttons">
              <button className="btn-black-pill">book a live event</button>
              <button className="btn-outline-pill">open media gallery</button>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
