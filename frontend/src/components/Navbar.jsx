import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

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
    if (audio) {
      audio.play().catch(() => {});
    }
    closeMobileMenu();
  };

  return (
    <header className="playza-header">
      <div className="header-container">
        {/* Left: Brand Logo with Neon Equalizer Icon */}
        <Link to="/" className="brand-logo" onClick={closeMobileMenu}>
          <div className="nav-equalizer-icon">
            <span className="eq-bar eq-bar-1"></span>
            <span className="eq-bar eq-bar-2"></span>
            <span className="eq-bar eq-bar-3"></span>
          </div>
          <span className="logo-text">SMOKIO</span>
        </Link>

        {/* Center: Navigation Links */}
        <nav className="center-nav-links">
          <Link to="/" className={`nav-item-link ${location.pathname === '/' ? 'active' : ''}`}>
            Home
          </Link>
          <a href="/#playlist" className="nav-item-link" onClick={handlePlaylistClick}>
            Music
          </a>
          <Link to="/about" className={`nav-item-link ${location.pathname === '/about' ? 'active' : ''}`}>
            About
          </Link>
          <Link to="/tours" className={`nav-item-link ${location.pathname === '/tours' ? 'active' : ''}`}>
            Tour
          </Link>
          <a href="/#gallery" className="nav-item-link">
            Videos
          </a>
          <Link to="/contact" className={`nav-item-link ${location.pathname === '/contact' ? 'active' : ''}`}>
            Contact
          </Link>
        </nav>

        {/* Right: Neon Lime Pill CTA Button with Mini Vinyl Record */}
        <Link to="/contact" className="neon-pill-cta" onClick={closeMobileMenu}>
          <span className="cta-label">Book SMOKIO</span>
          <div className="cta-mini-vinyl">
            <div className="mini-vinyl-grooves"></div>
            <div className="mini-vinyl-center"></div>
          </div>
        </Link>

        {/* Hamburger Menu Button (Mobile) */}
        <button className="mobile-menu-btn" onClick={toggleMobileMenu} aria-label="Toggle Menu">
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-nav-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav-links">
          <Link to="/" className="mobile-nav-link" onClick={closeMobileMenu}>Home</Link>
          <a href="/#playlist" className="mobile-nav-link" onClick={handlePlaylistClick}>Music</a>
          <Link to="/about" className="mobile-nav-link" onClick={closeMobileMenu}>About</Link>
          <Link to="/tours" className="mobile-nav-link" onClick={closeMobileMenu}>Tour</Link>
          <a href="/#gallery" className="mobile-nav-link" onClick={closeMobileMenu}>Videos</a>
          <Link to="/contact" className="mobile-nav-link" onClick={closeMobileMenu}>Contact</Link>
          <Link to="/contact" className="mobile-neon-cta" onClick={closeMobileMenu}>
            <span>Book SMOKIO</span>
            <div className="cta-mini-vinyl">
              <div className="mini-vinyl-grooves"></div>
              <div className="mini-vinyl-center"></div>
            </div>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
