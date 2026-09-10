import React, { useState, useEffect } from 'react';
import './CookieConsent.css';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Delay showing it slightly for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'false');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="cookie-consent-overlay">
      <div className="cookie-consent-modal">
        <div className="cookie-consent-content">
          <div className="cookie-sys-header">
            <span className="sys-blink"></span>
          </div>
          <h3>CONNECTION ESTABLISHED</h3>
          <p>
            WE DEPLOY TRACKERS TO OPTIMIZE YOUR AUDIO-VISUAL EXPERIENCE. 
            ACCEPT TO SYNCHRONIZE WITH THE SMOKIO GRID.
          </p>
        </div>
        <div className="cookie-consent-actions">
          <button className="btn-decline" onClick={handleDecline}>[ DECLINE ]</button>
          <button className="btn-accept" onClick={handleAccept}>[ INITIALIZE ]</button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
