import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', targetId: 'home' },
  { id: 'about', label: 'About', targetId: 'about' },
  { id: 'music', label: 'Music', targetId: 'music' },
  { id: 'tours', label: 'Tours', targetId: 'tours' },
  { id: 'gallery', label: 'Gallery', targetId: 'gallery' },
  { id: 'tickets', label: 'Tickets', targetId: 'tickets' }
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // ScrollSpy to highlight the active section while scrolling on the Home page
  useEffect(() => {
    if (location.pathname !== '/') {
      if (location.pathname === '/about') setActiveSection('about');
      else if (location.pathname === '/tours') setActiveSection('tours');
      else if (location.pathname === '/contact') setActiveSection('tickets');
      else setActiveSection('');
      return;
    }

    const sectionIds = ['home', 'about', 'music', 'tours', 'gallery', 'tickets'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id) || 
                   (id === 'music' ? document.getElementById('playlist') : null) ||
                   (id === 'tickets' ? document.getElementById('contact') : null);

        if (el) {
          const rect = el.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          if (scrollPosition >= top) {
            setActiveSection(id);
            return;
          }
        }
      }
      setActiveSection('home');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const scrollToTarget = (targetId) => {
    closeMobileMenu();

    if (targetId === 'music') {
      const audio = document.querySelector('audio');
      if (audio && audio.paused) {
        audio.play().catch(() => {});
      }
    }

    if (location.pathname === '/') {
      if (targetId === 'home') {
        if (window.lenis) {
          window.lenis.scrollTo(0, { duration: 1.4 });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        window.history.pushState(null, '', '/');
        setActiveSection('home');
        return;
      }

      const targetEl = document.getElementById(targetId) ||
                       (targetId === 'music' ? document.getElementById('playlist') : null) ||
                       (targetId === 'tickets' ? document.getElementById('contact') : null);

      if (targetEl) {
        if (window.lenis) {
          window.lenis.scrollTo(targetEl, {
            offset: -70,
            duration: 1.4,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
          });
        } else {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
        setActiveSection(targetId);
      }
    } else {
      navigate('/');
    }
  };

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    scrollToTarget(targetId);
  };

  return (
    <header className="playza-header">
      <div className="header-container">
        {/* Left: Brand Logo with Neon Equalizer Icon */}
        <a 
          href="/" 
          className="brand-logo" 
          onClick={(e) => handleNavClick(e, 'home')}
        >
          <div className="nav-equalizer-icon">
            <span className="eq-bar eq-bar-1"></span>
            <span className="eq-bar eq-bar-2"></span>
            <span className="eq-bar eq-bar-3"></span>
          </div>
          <span className="logo-text">SMOKIO</span>
        </a>

        {/* Center: Navigation Links */}
        <nav className="center-nav-links">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`/#${item.targetId}`}
              className={`nav-item-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, item.targetId)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right: Neon Lime Pill CTA Button with Mini Vinyl Record */}
        <a 
          href="/#tickets" 
          className="neon-pill-cta" 
          onClick={(e) => handleNavClick(e, 'tickets')}
        >
          <span className="cta-label">Book SMOKIO</span>
          <div className="cta-mini-vinyl">
            <div className="mini-vinyl-grooves"></div>
            <div className="mini-vinyl-center"></div>
          </div>
        </a>

        {/* Hamburger Menu Button (Mobile) */}
        <button 
          className="mobile-menu-btn" 
          onClick={toggleMobileMenu} 
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-nav-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav-links">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`/#${item.targetId}`}
              className={`mobile-nav-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, item.targetId)}
            >
              {item.label}
            </a>
          ))}
          <a
            href="/#tickets"
            className="mobile-neon-cta"
            onClick={(e) => handleNavClick(e, 'tickets')}
          >
            <span>Book SMOKIO</span>
            <div className="cta-mini-vinyl">
              <div className="mini-vinyl-grooves"></div>
              <div className="mini-vinyl-center"></div>
            </div>
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
