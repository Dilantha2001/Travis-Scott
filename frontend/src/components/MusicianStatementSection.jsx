import React, { useEffect, useRef } from 'react';
import './MusicianStatementSection.css';
import smokioProfileImg from '../assets/backgrounds/about.jpg';
import smokioStageImg from '../assets/backgrounds/Man_performing_on_stage_202609082107.jpeg';
import smokioStreetImg from '../assets/gallery/images_(57).jpg_20260911201318.jpeg';
import smokioDrillImg from '../assets/gallery/images_(56).jpg_20260911201544.jpeg';
import smokioArenaImg from '../assets/gallery/images_(59).jpg_20260911200937.jpeg';
import cu1 from '../assets/trail/cu1_highres.jpg';
import cu2 from '../assets/trail/cu2_highres.jpg';
import cu3 from '../assets/trail/cu3_highres.jpg';
import cu4 from '../assets/trail/cu4_highres.jpg';
import cu5 from '../assets/trail/cu5_highres.jpg';
import noiseBg from '../assets/backgrounds/noise.gif';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MusicianStatementSection = () => {
  const sectionRef = useRef(null);
  const ribbonsRef = useRef(null);
  const tapeTopRef = useRef(null);
  const tapeBottomRef = useRef(null);

  const trailRefs = useRef([]);
  const lastPos = useRef({ x: 0, y: 0 });
  const currentIndex = useRef(0);
  const zIndexCounter = useRef(10);

  const trailImages = [cu1, cu2, cu3, cu4, cu5];

  const handleMouseMove = (e) => {
    if (!sectionRef.current) return;

    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    const distance = Math.hypot(dx, dy);

    // Trigger next image spawn after cursor moves at least 45 pixels
    if (distance > 45) {
      const rect = sectionRef.current.getBoundingClientRect();
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

  useEffect(() => {
    if (!ribbonsRef.current || !tapeTopRef.current || !tapeBottomRef.current) return;

    const ctx = gsap.context(() => {
      // 100% Pure Scroll-Driven: Top Ribbon glides to the LEFT only when scrolling
      gsap.fromTo(tapeTopRef.current,
        { x: 120 },
        {
          x: -650,
          ease: 'none',
          scrollTrigger: {
            trigger: ribbonsRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5
          }
        }
      );

      // 100% Pure Scroll-Driven: Bottom Ribbon glides to the RIGHT only when scrolling
      gsap.fromTo(tapeBottomRef.current,
        { x: -650 },
        {
          x: 120,
          ease: 'none',
          scrollTrigger: {
            trigger: ribbonsRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5
          }
        }
      );
    }, ribbonsRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      className="musician-statement-section" 
      id="musician-statement"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
    >
      {/* Seamless Black Screen Fades */}
      <div className="musician-top-fade"></div>
      <div className="musician-bottom-fade"></div>

      {/* Animated Subtle Film Grain / Noise Overlay */}
      <div 
        className="musician-noise-overlay" 
        style={{ backgroundImage: `url(${noiseBg})` }}
      ></div>

      {/* 5-Image Mouse Cursor Trail Layer */}
      <div className="musician-trail-layer">
        {trailImages.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Trail photo ${idx + 1}`}
            className="musician-trail-img"
            ref={(el) => (trailRefs.current[idx] = el)}
          />
        ))}
      </div>

      <div className="musician-statement-container">
        <h2 className="musician-statement-text">
          <span className="musician-img-box img-1">
            <img src={smokioProfileImg} alt="Smokio Bandana Profile" />
          </span>{' '}
          SMOKIO IS THE UNDISPUTED KING<br />
          OF SINHALA{' '}
          <span className="musician-img-box img-2">
            <img src={smokioStageImg} alt="Smokio Live Stage Concert" />
          </span>{' '}
          RAP. FROM{' '}
          <span className="musician-highlight-yellow">COLOMBO STREETS</span>{' '}
          <span className="musician-img-box img-3">
            <img src={smokioStreetImg} alt="Smokio 44 Kalliya Street Icon" />
          </span><br />
          TO PACKED ARENAS ACROSS{' '}
          <span className="musician-img-box img-4">
            <img src={smokioDrillImg} alt="Smokio Street Drill" />
          </span>{' '}
          THE{' '}
          <span className="musician-img-box img-5">
            <img src={smokioArenaImg} alt="Smokio Mokada Wenne Arena" />
          </span>{' '}
          WORLD.
        </h2>
      </div>

      {/* Dual Intersecting Yellow Tape Ribbons - 100% Pure Scroll-Driven */}
      <div className="musician-ribbons-wrapper" ref={ribbonsRef}>
        
        {/* Top Tape Layer: Angled -3.5deg, Moves to the LEFT purely on scroll */}
        <div className="musician-tape-angle-layer tape-angle-top">
          <div className="musician-tape-strip" ref={tapeTopRef}>
            <div className="tape-scroll-track">
              <span className="tape-text">
                SMOKIO WORLD TOUR 2027 — COLOMBO · KANDY · GALLE · JAFFNA · LONDON · MELBOURNE — SMOKIO WORLD TOUR 2027 — COLOMBO · KANDY · GALLE · JAFFNA · LONDON · MELBOURNE — SMOKIO WORLD TOUR 2027 — COLOMBO · KANDY · GALLE · JAFFNA · LONDON · MELBOURNE —&nbsp;
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Tape Layer: Angled +2.8deg, Moves to the RIGHT purely on scroll */}
        <div className="musician-tape-angle-layer tape-angle-bottom">
          <div className="musician-tape-strip" ref={tapeBottomRef}>
            <div className="tape-scroll-track">
              <span className="tape-text">
                THE UNDISPUTED KING OF SINHALA RAP — 44 KALLIYA — MUDUKKUWEN ELIYATA — UNFILTERED SOUND — THE UNDISPUTED KING OF SINHALA RAP — 44 KALLIYA — MUDUKKUWEN ELIYATA — UNFILTERED SOUND — THE UNDISPUTED KING OF SINHALA RAP — 44 KALLIYA —&nbsp;
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default MusicianStatementSection;
