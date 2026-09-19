import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiArrowUpRight, FiMusic, FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handlePlaylistClick = () => {
    const audio = document.querySelector('audio');
    if(audio) {
      audio.play().catch(()=>{});
    }
    closeMobileMenu();
  };

  return (
    <header className="playza-header">
      <div className="header-container">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo" onClick={closeMobileMenu}>
          <span className="logo-icon"><FiMusic /></span>
          <span className="logo-text">SMOKIO</span>
        </Link>

        {/* Center Pill Navigation (Desktop) */}
        <nav className="pill-nav">
          <Link to="/" className={`pill-link ${location.pathname === '/' ? 'active' : ''}`}>
            Home
          </Link>
          <Link to="/about" className={`pill-link ${location.pathname === '/about' ? 'active' : ''}`}>
            About
          </Link>
          <Link to="/tours" className={`pill-link ${location.pathname === '/tours' ? 'active' : ''}`}>
            Tours
          </Link>
          <a href="/#gallery" className="pill-link">
            Gallery
          </a>
          <a href="/#playlist" className="pill-link" onClick={handlePlaylistClick}>
            Playlist
          </a>
        </nav>

        {/* Right CTA Button (Desktop) */}
        <Link to="/contact" className="connect-btn">
          let's connect
        </Link>

        {/* Hamburger Menu Button (Mobile) */}
        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Navigation Overlay */}
      <div className={`mobile-nav-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav-links">
          <Link to="/" className="mobile-nav-link" onClick={closeMobileMenu}>Home</Link>
          <Link to="/about" className="mobile-nav-link" onClick={closeMobileMenu}>About</Link>
          <Link to="/tours" className="mobile-nav-link" onClick={closeMobileMenu}>Tours</Link>
          <a href="/#gallery" className="mobile-nav-link" onClick={closeMobileMenu}>Gallery</a>
          <a href="/#playlist" className="mobile-nav-link" onClick={handlePlaylistClick}>Playlist</a>
          <Link to="/contact" className="mobile-nav-btn" onClick={closeMobileMenu}>Let's Connect</Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
