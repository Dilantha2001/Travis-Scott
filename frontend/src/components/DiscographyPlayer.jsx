import React from 'react';
import './DiscographyPlayer.css';
import { FaPlay, FaPlus, FaEllipsisH, FaSpotify } from 'react-icons/fa';
import coverImg from '../assets/images (45).jpg';

const DiscographyPlayer = () => {
  return (
    <div className="disco-player-container">
      <div className="disco-left">
        <div className="disco-album-wrapper">
          <div className="disco-vinyl">
            <div className="disco-vinyl-center"></div>
          </div>
          <div className="disco-cover">
            <img src={coverImg} alt="Album Cover" className="disco-cover-img" />
            
            <div className="disco-spotify-widget">
              <FaSpotify className="disco-spotify-icon" />
              <div className="disco-widget-left">
                <img src={coverImg} alt="Thumbnail" className="disco-widget-thumb" />
                <div className="disco-widget-info">
                  <h4>Par Terre – A COLORS SHOW</h4>
                  <p>Pailypapa</p>
                  <span className="disco-preview-badge">Preview</span>
                </div>
              </div>
              <div className="disco-widget-right">
                <FaPlus className="disco-icon" />
                <FaEllipsisH className="disco-icon" />
                <div className="disco-play-btn">
                  <FaPlay />
                </div>
              </div>
            </div>
            
            <div className="disco-cover-footer">
              <div className="disco-artist-sig">“Arlene<br/>McCoy );”</div>
              <div className="disco-logo">prodo music<br/>production</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="disco-right">
        <p className="disco-subtitle">Arlene McCoy's / Discography</p>
        
        <div className="disco-step">
          <span>04/04</span>
          <div className="disco-line"></div>
        </div>
        
        <h1 className="disco-title">NO APOLOGIES</h1>
        <p className="disco-desc">
          A fierce, no-filter anthem for anyone<br/>who's done hiding.
        </p>
        
        <div className="disco-links">
          <p>LISTEN ON:</p>
          <div className="disco-link-list">
            <a href="#">SPOTIFY</a> / <a href="#">APPLE MUSIC</a> / <a href="#">BANDCAMP</a> / <a href="#">YOUTUBE</a>
          </div>
        </div>
        
        <div className="disco-controls">
          <button className="disco-btn-back">BACK</button>
          <button className="disco-btn-next">NEXT</button>
        </div>
      </div>
    </div>
  );
};

export default DiscographyPlayer;
