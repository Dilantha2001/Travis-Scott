import React, { forwardRef } from 'react';
import './CubeSlider.css';

import img45 from '../assets/images (45).jpg';
import img46 from '../assets/images (46).jpg';
import img47 from '../assets/images (47).jpg';
import img48 from '../assets/images (48).jpg';

const CubeSlider = forwardRef(({ cubeContainerRef, textCardsRef }, ref) => {
  const albums = [
    {
      id: '01',
      title: 'Silver Heat',
      badge: 'ALBUM 01 // 04',
      desc: 'This album captures the energy that defines our sound, blending bold riffs, raw vocals, and stories shaped on stage.'
    },
    {
      id: '02',
      title: 'Wild Spark',
      badge: 'ALBUM 02 // 04',
      desc: 'Featuring top-charting tracks and fan-favorite acoustics that redefine modern high-voltage pop music.'
    },
    {
      id: '03',
      title: 'Static Burn',
      badge: 'ALBUM 03 // 04',
      desc: 'An unapologetic collection of heavy basslines, haunting synth melodies, and unforgettable stadium hooks.'
    },
    {
      id: '04',
      title: 'Feral Glow',
      badge: 'ALBUM 04 // 04',
      desc: 'Our latest masterpiece shaped on world tour stages, connecting deeply with over 1.2M listeners globally.'
    }
  ];

  return (
    <div className="cube-interactive-container" ref={ref}>
      {/* Center 3D Interactive Rotating Cube */}
      <div className="cube-slider-center">
        <div className="slider">
          <div className="container" ref={cubeContainerRef}>
            <div
              className="slide x"
              style={{
                '--img-x-after': `url("${img45}")`,
                '--img-x-before': `url("${img46}")`
              }}
            ></div>
            <div
              className="slide y"
              style={{
                '--img-y-after': `url("${img47}")`,
                '--img-y-before': `url("${img48}")`
              }}
            ></div>
            <div
              className="slide z"
              style={{
                '--img-z-after': `url("${img45}")`,
                '--img-z-before': `url("${img47}")`
              }}
            ></div>
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
    </div>
  );
});

export default CubeSlider;
