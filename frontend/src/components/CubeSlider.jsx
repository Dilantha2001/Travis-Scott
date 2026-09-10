import React, { forwardRef, useEffect, useRef } from 'react';
import gsap from 'gsap';
import './CubeSlider.css';

import img45 from '../assets/images (45).jpg';
import img46 from '../assets/images (46).jpg';
import img47 from '../assets/images (47).jpg';
import img48 from '../assets/images (48).jpg';

const CubeSlider = forwardRef(({ cubeContainerRef, textCardsRef }, ref) => {
  const albums = [
    {
      id: '01',
      title: 'Kuddah (Reply Diss)',
      badge: 'TRACK 01 // 04',
      desc: "The track that shook the Sri Lankan rap scene. Unapologetic, raw, and delivered with venomous lyrical precision. Smokio's fearless approach redefines the boundaries of Sinhala hip-hop, leaving an undeniable mark on the underground drill culture. Every bar hits like a shockwave, proving his absolute dominance in the game."
    },
    {
      id: '02',
      title: 'Golden Fever',
      badge: 'TRACK 02 // 04',
      desc: "A gritty, high-voltage anthem capturing the relentless hustle of street life. With heavy 808s and haunting melodies, Smokio spits truths about survival, loyalty, and ambition. This masterpiece resonates deeply, turning local street tales into a stadium-shaking sonic experience that transcends borders."
    },
    {
      id: '03',
      title: 'Electric Heartline',
      badge: 'TRACK 03 // 04',
      desc: "Merging aggressive rap flows with a deep, pulsating cyber-drill beat, this track showcases Smokio's unmatched versatility. It's a journey through the neon-lit chaos of the city nights, blending poetic storytelling with a chaotic energy that hypnotizes the listeners. A true testament to modern musical evolution."
    },
    {
      id: '04',
      title: 'Neon Gravity',
      badge: 'TRACK 04 // 04',
      desc: "Defying all expectations, this project elevates the standard of Sri Lankan urban music. Smokio combines introspective lyricism with cinematic production, creating an immersive world of sound. It's not just a song; it's a movement that connects millions of loyal fans globally, cementing his undeniable legacy."
    }
  ];

  const containerRef = useRef(null);

  return (
    <div className="cube-interactive-container" ref={(el) => {
      containerRef.current = el;
      if (typeof ref === 'function') ref(el);
      else if (ref) ref.current = el;
    }}>
      {/* Top Title Section */}
      <div className="cube-main-header">
        <h2 className="cube-main-title">THE SMOKIO ERA</h2>
        <p className="cube-main-subtitle">EXPLORE THE TRACKS THAT DEFINED A GENERATION</p>
      </div>

      {/* Center 3D Interactive Rotating Cube */}
      <div className="cube-slider-center">
        <div className="slider">
          <div className="hover-rotator">
            <div className="container" ref={cubeContainerRef}>
              {/* Standard 6 faces using actual <img> tags for GSAP animation */}
              <div className="cube-face front">
                <img src={img45} alt="Cube Front" className="cube-gsap-img" />
              </div>
              <div className="cube-face back">
                <img src={img45} alt="Cube Back" className="cube-gsap-img" />
              </div>
              <div className="cube-face right">
                <img src={img47} alt="Cube Right" className="cube-gsap-img" />
              </div>
              <div className="cube-face left">
                <img src={img45} alt="Cube Left" className="cube-gsap-img" />
              </div>
              <div className="cube-face top">
                <img src={img46} alt="Cube Top" className="cube-gsap-img" />
              </div>
              <div className="cube-face bottom">
                <img src={img48} alt="Cube Bottom" className="cube-gsap-img" />
              </div>
            </div>
          </div>
          <div className="shadow"></div>
        </div>
      </div>

      {/* Full Screen Overlay Text Track (Texts glide from far right edge over cube to far left edge) */}
      <div className="cube-text-track">
        {albums.map((album, idx) => (
          <div
            key={album.id}
            className="cube-text-card"
            ref={(el) => {
              if (textCardsRef && textCardsRef.current) {
                textCardsRef.current[idx] = el;
              }
            }}
          >
            <span className="cube-step-badge">{album.badge}</span>
            <h2 className="cube-album-title">{album.title}</h2>
            <p className="cube-album-desc">{album.desc}</p>
          </div>
        ))}
      </div>

      {/* Bottom Horizontal Marquee Text */}
      <div className="cube-marquee-container">
        <div className="cube-marquee-content">
          <span>THE SMOKIO ERA   UNFILTERED SOUND   PURE ENERGY   DRILL CULTURE   THE SMOKIO ERA   UNFILTERED SOUND   PURE ENERGY   DRILL CULTURE   </span>
          <span>THE SMOKIO ERA   UNFILTERED SOUND   PURE ENERGY   DRILL CULTURE   THE SMOKIO ERA   UNFILTERED SOUND   PURE ENERGY   DRILL CULTURE   </span>
        </div>
      </div>
    </div>
  );
});

export default CubeSlider;
