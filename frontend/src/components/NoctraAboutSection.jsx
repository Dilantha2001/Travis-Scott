import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './NoctraAboutSection.css';
import blueStageImg from '../assets/noctra_blue_stage.jpg';

gsap.registerPlugin(ScrollTrigger);

const NoctraAboutSection = () => {
  const statsRowRef = useRef(null);
  const countNightsRef = useRef(null);
  const countPeopleRef = useRef(null);
  const countCitiesRef = useRef(null);

  useEffect(() => {
    if (!statsRowRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Stat cards entrance animation (staggered fade and slide up)
      gsap.fromTo('.noctra-stat-item',
        {
          opacity: 0,
          y: 35,
          scale: 0.96
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsRowRef.current,
            start: 'top 85%',
            once: true
          }
        }
      );

      // 2. Dividers scale in
      gsap.fromTo('.noctra-stat-divider',
        { scaleY: 0, opacity: 0 },
        {
          scaleY: 1,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          delay: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: statsRowRef.current,
            start: 'top 85%',
            once: true
          }
        }
      );

      // 3. Smooth Counter Animations (decelerating count-up with number formatting)
      const counters = [
        {
          ref: countNightsRef,
          target: 24,
          suffix: '+',
          duration: 1.8,
          format: (v) => `${Math.floor(v)}+`
        },
        {
          ref: countPeopleRef,
          target: 1500,
          suffix: '+',
          duration: 2.2,
          format: (v) => `${Math.floor(v).toLocaleString('en-US')}+`
        },
        {
          ref: countCitiesRef,
          target: 6,
          suffix: '',
          duration: 1.5,
          format: (v) => `${Math.floor(v)}`
        }
      ];

      counters.forEach((item) => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: item.target,
          duration: item.duration,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsRowRef.current,
            start: 'top 85%',
            once: true
          },
          onUpdate: () => {
            if (item.ref.current) {
              item.ref.current.textContent = item.format(obj.val);
            }
          },
          onComplete: () => {
            if (item.ref.current) {
              item.ref.current.textContent = item.format(item.target);
            }
          }
        });
      });
    }, statsRowRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="noctra-about-section" id="about-section">
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

        {/* Bottom Row: Stats Metrics with GSAP Animated Counters */}
        <div className="noctra-stats-row" ref={statsRowRef}>
          <div className="noctra-stat-item">
            <span className="stat-big-number" ref={countNightsRef}>0+</span>
            <span className="stat-legend">NIGHTS CREATED</span>
          </div>

          <div className="noctra-stat-divider"></div>

          <div className="noctra-stat-item">
            <span className="stat-big-number" ref={countPeopleRef}>0+</span>
            <span className="stat-legend">PEOPLE THROUGH THE DOOR</span>
          </div>

          <div className="noctra-stat-divider"></div>

          <div className="noctra-stat-item">
            <span className="stat-big-number" ref={countCitiesRef}>0</span>
            <span className="stat-legend">CITIES</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default NoctraAboutSection;
