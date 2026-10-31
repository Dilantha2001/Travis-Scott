import React, { useEffect, useRef } from 'react';
import './MovementSection.css';
import aboutBg from '../assets/backgrounds/about.jpg';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MovementSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Subtle background parallax on scroll
      gsap.fromTo(sectionRef.current,
        { backgroundPosition: 'right 0%' },
        {
          backgroundPosition: 'right 25%',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        }
      );

      // Main Staggered Entrance Reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      });

      // 1. Tag slide in
      tl.fromTo('.movement-tag',
        { opacity: 0, x: -35 },
        { opacity: 1, x: 0, duration: 0.65, ease: 'power3.out' }
      )
      // 2. Giant Headline lines staggered reveal
      .fromTo('.movement-title-line',
        { opacity: 0, y: 50, skewY: 2 },
        { opacity: 1, y: 0, skewY: 0, stagger: 0.12, duration: 0.85, ease: 'power4.out' },
        '-=0.4'
      )
      // 3. Memories highlight word pop
      .fromTo('.movement-memories-yellow',
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(2)' },
        '-=0.3'
      )
      // 4. Footer Brand tag
      .fromTo('.movement-footer-brand',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      )
      // 5. Narrative description & Sub-taglines
      .fromTo(['.movement-description', '.movement-sub-tagline span'],
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, stagger: 0.14, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="about"
      className="movement-section" 
      ref={sectionRef}
      style={{ backgroundImage: `url(${aboutBg})` }}
    >
      {/* Cinematic dark vignette overlay to keep typography razor-sharp */}
      <div className="movement-bg-overlay"></div>

      <div className="movement-container">
        
        {/* Left Column: Movement Tag, Giant Condensed Headline & Brand Tagline */}
        <div className="movement-left-col">
          <div className="movement-tag">
            <span className="movement-number">01</span>
            <span className="movement-label">THE MOVEMENT</span>
          </div>

          <h2 className="movement-giant-title">
            <span className="movement-title-line">WE DON'T</span>
            <span className="movement-title-line">HOST NIGHTS</span>
            <span className="movement-title-line">WE CREATE</span>
            <span className="movement-title-line movement-title-last">
              <span className="movement-memories-yellow">MEMORIES</span>
              <span className="neon-period">.</span>
            </span>
          </h2>

          <div className="movement-footer-brand">
            <span className="brand-prefix">THIS IS</span>{' '}
            <span className="brand-accent">SMOKIO.</span>
          </div>
        </div>

        {/* Narrative Paragraph & Night Tagline */}
        <div className="movement-center-col">
          <p className="movement-description">
            SMOKIO exists for the hours that don't need an ending. We bring together
            sound, visual culture, artists, and people to create experiences that live
            long after the lights go out.
          </p>

          <div className="movement-sub-tagline">
            <span>BUILT FOR THE NIGHT.</span>
            <span>MADE FOR THE MOMENT.</span>
          </div>
        </div>

      </div>

      {/* Seamless black shading fade at bottom connecting to Section 3 */}
      <div className="movement-bottom-fade"></div>
    </section>
  );
};

export default MovementSection;
