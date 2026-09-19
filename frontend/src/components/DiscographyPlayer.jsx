import React, { useState, useRef } from 'react';
import './DiscographyPlayer.css';
import { FaPlay, FaPause, FaPlus, FaEllipsisH, FaSpotify, FaApple, FaBandcamp, FaYoutube, FaStepBackward, FaStepForward } from 'react-icons/fa';
import coverImg from '../assets/images (45).jpg';
import smokioAudio from '../assets/kuddah-reply-diss-smokio.mp3';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const DiscographyPlayer = ({ currentTrack, isPlaying, onPlayPause, onPrev, onNext }) => {
  const containerRef = useRef(null);

  return (
    <div className="disco-player-container" ref={containerRef}>

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
            <a href="#!" onClick={(e) => e.preventDefault()} className="brand-logo spotify" title="Spotify"><FaSpotify /></a>
            <a href="#!" onClick={(e) => e.preventDefault()} className="brand-logo apple" title="Apple Music"><FaApple /></a>
            <a href="#!" onClick={(e) => e.preventDefault()} className="brand-logo bandcamp" title="Bandcamp"><FaBandcamp /></a>
            <a href="#!" onClick={(e) => e.preventDefault()} className="brand-logo youtube" title="YouTube"><FaYoutube /></a>
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
