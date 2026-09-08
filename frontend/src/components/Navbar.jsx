import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiArrowUpRight, FiMusic } from 'react-icons/fi';

const Navbar = () => {
  const location = useLocation();

  return (
    <header className="playza-header">
      <div className="header-container">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo">
          <span className="logo-icon"><FiMusic /></span>
          <span className="logo-text">SMOKIO</span>
        </Link>

        {/* Center Pill Navigation */}
        <nav className="pill-nav">
          <Link to="/" className={`pill-link ${location.pathname === '/' ? 'active' : ''}`}>
            home
          </Link>
          <Link to="/about" className={`pill-link ${location.pathname === '/about' ? 'active' : ''}`}>
            about us <FiArrowUpRight className="arrow-icon" />
          </Link>
          <Link to="/tours" className={`pill-link ${location.pathname === '/tours' ? 'active' : ''}`}>
            tours
          </Link>
          <Link to="/albums" className="pill-link">
            albums
          </Link>
          <div className="pill-link dropdown-pill">
            all pages <FiArrowUpRight className="arrow-icon" />
          </div>
        </nav>

        {/* Right CTA Button */}
        <Link to="/contact" className="connect-btn">
          let's connect
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
