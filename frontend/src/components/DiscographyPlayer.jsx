import React, { useState, useRef } from 'react';
import './DiscographyPlayer.css';
import { FaPlay, FaPause, FaPlus, FaEllipsisH, FaSpotify, FaApple, FaBandcamp, FaYoutube, FaStepBackward, FaStepForward } from 'react-icons/fa';
import coverImg from '../assets/images (45).jpg';
import smokioAudio from '../assets/kuddah-reply-diss-smokio.mp3';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const DiscographyPlayer = ({ currentTrack, isPlaying, onPlayPause, onPrev, onNext }) => {
  const containerRef = useRef(null);
  const hoverCardRef = useRef(null);

  useGSAP(() => {
    const container = containerRef.current;
    const card = hoverCardRef.current;
    
    if (!container || !card) return;

    gsap.set(card, { autoAlpha: 0, scale: 0.8, xPercent: -50, yPercent: -50, pointerEvents: 'none' });

    const moveCursor = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      gsap.to(card, {
        x: x,
        y: y,
        duration: 0.4,
        ease: "power3.out"
      });
    };

    const enterCursor = () => {
      gsap.to(card, { autoAlpha: 1, scale: 1, duration: 0.4, ease: "back.out(1.5)" });
    };

    const leaveCursor = () => {
      gsap.to(card, { autoAlpha: 0, scale: 0.8, duration: 0.3, ease: "power2.in" });
    };

    container.addEventListener('mousemove', moveCursor);
    container.addEventListener('mouseenter', enterCursor);
    container.addEventListener('mouseleave', leaveCursor);

    return () => {
      container.removeEventListener('mousemove', moveCursor);
      container.removeEventListener('mouseenter', enterCursor);
      container.removeEventListener('mouseleave', leaveCursor);
    };
  }, { scope: containerRef });

  return (
    <div className="disco-player-container" ref={containerRef}>
      {/* Floating Hover Card */}
      <div className="spotify-hover-cursor-card" ref={hoverCardRef}>
        <div className="hover-left">
          <img src={coverImg} alt="Cover" />
        </div>
        <div className="hover-right">
          <h3 className="hover-title">MAKE US PART OF YOUR<br/>SPOTIFY VIBE!</h3>
          <div className="hover-waveform">
            {Array.from({length: 40}).map((_, i) => (
              <div key={i} className="wave-bar" style={{height: `${Math.max(20, Math.random() * 100)}%`}}></div>
            ))}
          </div>
          <div className="hover-progress">
            <div className="progress-line"><div className="progress-fill"></div><div className="progress-dot"></div></div>
          </div>
          <div className="hover-controls">
            <div className="h-icon-circle"><span className="h-small-icon">i</span></div>
            <FaStepBackward className="h-icon" />
            <div className="h-play">
              {isPlaying ? <FaPause /> : <FaPlay />}
            </div>
            <FaStepForward className="h-icon" />
            <div className="h-icon-circle"><span className="h-small-icon">-</span></div>
          </div>
        </div>
      </div>

      <div className="disco-left">
        <div className="disco-album-wrapper">
          <div className="disco-vinyl">
            <div className={`disco-vinyl-center ${isPlaying ? 'playing' : ''}`}>
            </div>
          </div>
          <div className={`disco-tonearm ${isPlaying ? 'playing' : ''}`}>
            <div className="disco-tonearm-base"></div>
            <div className="disco-tonearm-arm"></div>
            <div className="disco-tonearm-head"></div>
          </div>
          <div className="disco-cover">
            <img src={coverImg} alt="Album Cover" className="disco-cover-img" />
            


            
            <div className="disco-cover-footer">
              <div className="disco-artist-sig">“Smokio<br/>Live”</div>
              <div className="disco-logo">certified platinum<br/>production</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="disco-right">
        <p className="disco-subtitle">SMOKIO / DISCOGRAPHY</p>
        
        <div className="disco-step">
          <span>04/04</span>
          <div className="disco-line"></div>
        </div>
        
        <h2 className="disco-title highlight-blue">{currentTrack?.title || 'RAW AMBITION'}</h2>
        <p className="disco-subtitle">SMOKIO • {currentTrack?.duration || '3:45'} • {currentTrack?.date || '07.09.26'}</p>
        <p className="disco-desc">
          A fierce, genre-defining anthem that<br/>pushes the limits of Sinhala Rap.
        </p>
        
        <div className="disco-links">
          <p>LISTEN ON:</p>
          <div className="disco-link-list-icons">
            <a href="#" className="brand-logo spotify" title="Spotify"><FaSpotify /></a>
            <a href="#" className="brand-logo apple" title="Apple Music"><FaApple /></a>
            <a href="#" className="brand-logo bandcamp" title="Bandcamp"><FaBandcamp /></a>
            <a href="#" className="brand-logo youtube" title="YouTube"><FaYoutube /></a>
          </div>
        </div>
        
        <div className="disco-controls player-controls">
          <button className="control-btn prev-btn" title="Previous" onClick={onPrev}><FaStepBackward /></button>
          <button className="control-btn play-main-btn" title="Play/Pause" onClick={onPlayPause}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button className="control-btn next-btn" title="Next" onClick={onNext}><FaStepForward /></button>
        </div>
      </div>
    </div>
  );
};

export default DiscographyPlayer;
