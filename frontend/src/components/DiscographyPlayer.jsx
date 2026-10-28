import React from 'react';
import './DiscographyPlayer.css';
import { FaPlay, FaPause, FaSpotify } from 'react-icons/fa';
import { FiHeadphones } from 'react-icons/fi';
import defaultCoverImg from '../assets/song_mudukkuwen_highres.jpg';

const DiscographyPlayer = ({ 
  playlist = [],
  currentTrack, 
  currentTrackIndex = 0, 
  isPlaying = false, 
  trackProgress = 0,
  onPlayPause, 
  onSelectTrack 
}) => {
  const activeTrack = currentTrack || playlist[0];
  const activeCover = activeTrack?.img || defaultCoverImg;

  // Other tracks excluding the currently active featured track
  const otherTracks = playlist
    .map((t, idx) => ({ ...t, originalIndex: idx }))
    .filter((_, idx) => idx !== currentTrackIndex);

  const totalLEDs = 24;
  const activeLEDs = Math.round((trackProgress / 100) * totalLEDs);

  return (
    <section className="vaeliq-player-section">
      <div className="vaeliq-player-container">
        
        {/* Top Header */}
        <div className="vaeliq-player-header">
          <h2 className="vaeliq-title">Turn Up the Feeling.</h2>
          <p className="vaeliq-subtitle">
            A collection of sounds shaped by emotion, movement, and everything in between.
          </p>
        </div>

        {/* Player Grid: Left Featured Card | Right Other Tracks */}
        <div className="vaeliq-grid">
          
          {/* Left: Featured Track Card */}
          <div className="featured-card">
            <div className="featured-card-artwork">
              <img 
                key={activeTrack?.id || currentTrackIndex}
                src={activeCover} 
                alt={activeTrack?.title || 'Featured Track'} 
                className="featured-cover-img"
              />
              <div className="featured-card-overlay"></div>
              
              {/* Top Featured Pill Tag */}
              <div className="featured-pill-tag">
                <span className="sparkle-icon">✦</span>
                <span>FEATURED TRACK</span>
              </div>

              {/* Mini Vinyl Record Badge in Lower Right of Artwork */}
              <div className={`featured-vinyl-badge ${isPlaying ? 'spinning' : ''}`}>
                <div className="vinyl-groove-rings"></div>
                <div className="vinyl-neon-spindle"></div>
              </div>

              {/* Animated LED Equalizer Progress Track */}
              <div className="featured-led-meter">
                {Array.from({ length: totalLEDs }).map((_, i) => (
                  <span 
                    key={i} 
                    className={`led-bar ${i <= (isPlaying ? Math.max(activeLEDs, 3) : 6) ? 'lit' : ''}`}
                  />
                ))}
              </div>
            </div>

            {/* Bottom Meta & Big Play Button */}
            <div className="featured-card-bottom">
              <div className="featured-play-group">
                <button 
                  className={`featured-play-btn ${isPlaying ? 'playing' : ''}`}
                  onClick={onPlayPause}
                  title={isPlaying ? "Pause" : "Play"}
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <FaPause /> : <FaPlay style={{ marginLeft: '3px' }} />}
                </button>
                <h3 className="featured-track-name">{activeTrack?.title || 'MUDUKKUWEN ELIYATA'}</h3>
              </div>

              <div className="featured-track-meta">
                <span>{activeTrack?.artist?.split(',')[0] || 'SMOKIO'}</span>
                <span className="meta-dot">·</span>
                <span>2027</span>
              </div>
            </div>
          </div>

          {/* Right: Other Tracks List */}
          <div className="tracklist-container">
            <div className="tracklist-header">
              <span className="tracklist-header-label">OTHER TRACKS</span>
              <span className="tracklist-header-count">
                {String(otherTracks.length).padStart(2, '0')} SONGS
              </span>
            </div>

            <div className="tracklist-items">
              {otherTracks.map((track) => {
                const isThisActive = track.originalIndex === currentTrackIndex;
                const isThisPlaying = isThisActive && isPlaying;
                const trackNum = String(track.originalIndex + 1).padStart(2, '0');

                return (
                  <div 
                    key={track.id} 
                    className={`vaeliq-track-row ${isThisActive ? 'active' : ''}`}
                    onClick={() => onSelectTrack(track.originalIndex)}
                  >
                    {/* Index */}
                    <span className="row-track-num">{trackNum}</span>

                    {/* Thumbnail */}
                    <div className="row-thumb-wrap">
                      <img 
                        src={track.img || defaultCoverImg} 
                        alt={track.title} 
                        className="row-thumb-img" 
                      />
                    </div>

                    {/* Title & Info */}
                    <div className="row-info">
                      <h4 className="row-title">{track.title}</h4>
                      <p className="row-sub">
                        {track.artist?.split(',')[0] || 'SMOKIO'} · {track.date?.slice(-2) ? `20${track.date.slice(-2)}` : '2026'}
                      </p>
                    </div>

                    {/* Waveform / Dots */}
                    <div className="row-wave-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>

                    {/* Duration */}
                    <span className="row-duration">{track.duration || '3:30'}</span>

                    {/* Circular Neon Play Button */}
                    <button 
                      className={`row-play-btn ${isThisPlaying ? 'playing' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isThisActive) {
                          onPlayPause();
                        } else {
                          onSelectTrack(track.originalIndex);
                        }
                      }}
                      title={isThisPlaying ? "Pause" : "Play"}
                      aria-label="Play track"
                    >
                      {isThisPlaying ? <FaPause /> : <FaPlay style={{ marginLeft: '2px' }} />}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Bottom Spotify Banner Capsule */}
            <a 
              href="https://spotify.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="spotify-banner-pill"
            >
              <div className="spotify-left">
                <FaSpotify className="spotify-green-icon" />
                <span>Stream the full catalogue on Spotify</span>
              </div>
              <FiHeadphones className="spotify-headphones-icon" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};

export default DiscographyPlayer;
