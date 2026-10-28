import React, { useEffect, useRef } from 'react';
import './NoctraAboutSection.css';
import blueStageImg from '../assets/noctra_blue_stage.jpg';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const NoctraAboutSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Subtle background crowd scale & parallax
      gsap.fromTo('.noctra-bg-layer',
        { scale: 1.12, yPercent: -4 },
        {
          scale: 1.0,
          yPercent: 4,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2
          }
        }
      );

      // Main Entrance Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      });

      // 1. Top Section Tag
      tl.fromTo('.noctra-top-tag',
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      )
      // 2. Left Heading 'THIS IS SMOKIO'
      .fromTo('.noctra-giant-heading span',
        { opacity: 0, y: 55, skewY: 3 },
        { opacity: 1, y: 0, skewY: 0, stagger: 0.14, duration: 0.85, ease: 'power4.out' },
        '-=0.3'
      )
      // 3. Lead Paragraphs
      .fromTo('.noctra-paragraphs p',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.75, ease: 'power3.out' },
        '-=0.5'
      )
      // 4. Center Neon Beams & Stage Sign
      .fromTo('.neon-vertical-beams .beam',
        { scaleY: 0, opacity: 0 },
        { scaleY: 1, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power2.out' },
        '-=0.7'
      )
      .fromTo('.neon-stage-sign',
        { scale: 0.6, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.85, ease: 'back.out(1.8)' },
        '-=0.6'
      )
      .fromTo('.neon-sign-letter',
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.5, ease: 'power3.out' },
        '-=0.5'
      )
      // 5. Right Column Slogan Lines
      .fromTo('.noctra-slogan-block .slogan-line',
        { opacity: 0, x: 45, skewX: -3 },
        { opacity: 1, x: 0, skewX: 0, stagger: 0.12, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      )
      // 6. Bottom Stats Row & Vertical Dividers
      .fromTo('.noctra-stat-divider',
        { scaleY: 0, opacity: 0 },
        { scaleY: 1, opacity: 1, duration: 0.7, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo('.noctra-stat-item',
        { opacity: 0, y: 35, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.12, duration: 0.75, ease: 'back.out(1.5)' },
        '-=0.6'
      );

      // Continuous ambient floating bob for Center Stage Neon Sign
      gsap.to('.neon-stage-sign', {
        y: -9,
        duration: 2.4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="noctra-about-section" id="about-section" ref={sectionRef}>
      {/* Background with Blue Arena Stage Lighting & Deep Vignette */}
      <div 
        className="noctra-bg-layer" 
        style={{ backgroundImage: `url(${blueStageImg})` }}
      >
        <div className="noctra-blue-overlay"></div>
        <div className="noctra-radial-glow"></div>
        <div className="noctra-dark-vignette"></div>
      </div>

      {/* Top transition black shading connecting seamlessly from Section 2 */}
      <div className="noctra-top-fade"></div>

      <div className="noctra-content-wrapper">
        
        {/* Top-Left Section Tag */}
        <div className="noctra-top-tag">
          <span className="noctra-tag-num">03</span>
          <span className="noctra-tag-text">ABOUT</span>
        </div>

        {/* Main Center Content Grid */}
        <div className="noctra-main-grid">
          
          {/* Left Column: Heading & Narrative */}
          <div className="noctra-left-col">
            <h1 className="noctra-giant-heading">
              <span>THIS IS</span>
              <span>SMOKIO.</span>
            </h1>

            <div className="noctra-paragraphs">
              <p className="noctra-p-lead">
                SMOKIO is an independent nightlife & hip-hop collective built around music,
                visual culture, and the people who make the night
              </p>
              <p className="noctra-p-sub">
                worth remembering. From intimate underground cyphers to large-scale stadium events,
                we create spaces where sound and street culture collide.
              </p>
            </div>
          </div>

          {/* Center Stage Floating Neon Hologram Sign */}
          <div className="noctra-center-stage">
            <div className="neon-stage-sign">
              <span className="neon-sign-letter">S</span>
              <span className="neon-sign-letter">M</span>
              <span className="neon-sign-letter">O</span>
              <span className="neon-sign-letter">K</span>
              <span className="neon-sign-letter">I</span>
              <span className="neon-sign-letter">O</span>
              <div className="neon-sign-reflection"></div>
            </div>
            <div className="neon-vertical-beams">
              <span className="beam beam-1"></span>
              <span className="beam beam-2"></span>
              <span className="beam beam-3"></span>
            </div>
          </div>

          {/* Right Column: Slogan */}
          <div className="noctra-right-col">
            <div className="noctra-slogan-block">
              <span className="slogan-line">NO RULES.</span>
              <span className="slogan-line">NO ROUTINE.</span>
              <span className="slogan-line">NO SLEEP.</span>
            </div>
          </div>

        </div>

        {/* Bottom Row: Stats Metrics */}
        <div className="noctra-stats-row">
          <div className="noctra-stat-item">
            <span className="stat-big-number">24+</span>
            <span className="stat-legend">NIGHTS CREATED</span>
          </div>

          <div className="noctra-stat-divider"></div>

          <div className="noctra-stat-item">
            <span className="stat-big-number">1,500+</span>
            <span className="stat-legend">PEOPLE THROUGH THE DOOR</span>
          </div>

          <div className="noctra-stat-divider"></div>

          <div className="noctra-stat-item">
            <span className="stat-big-number">6</span>
            <span className="stat-legend">CITIES</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default NoctraAboutSection;
