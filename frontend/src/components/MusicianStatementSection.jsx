import React, { useEffect, useRef } from 'react';
import './MusicianStatementSection.css';
import smokioProfileImg from '../assets/about.jpg';
import smokioStageImg from '../assets/Man_performing_on_stage_202609082107.jpeg';
import smokioStreetImg from '../assets/images_(57).jpg_20260911201318.jpeg';
import smokioDrillImg from '../assets/images_(56).jpg_20260911201544.jpeg';
import smokioArenaImg from '../assets/images_(59).jpg_20260911200937.jpeg';
import noiseBg from '../assets/noise.gif';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MusicianStatementSection = () => {
  const ribbonsRef = useRef(null);
  const tapeTopRef = useRef(null);
  const tapeBottomRef = useRef(null);

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
    <section className="musician-statement-section" id="musician-statement">
      {/* Seamless Black Screen Fades */}
      <div className="musician-top-fade"></div>
      <div className="musician-bottom-fade"></div>

      {/* Animated Subtle Film Grain / Noise Overlay */}
      <div 
        className="musician-noise-overlay" 
        style={{ backgroundImage: `url(${noiseBg})` }}
      ></div>

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
