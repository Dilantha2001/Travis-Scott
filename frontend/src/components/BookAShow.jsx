import React, { useState } from 'react';
import './BookAShow.css';
import { FiSend, FiCheckCircle, FiCalendar, FiMapPin, FiUsers, FiMail, FiUser, FiZap, FiPhoneCall } from 'react-icons/fi';
import { FaSpotify, FaInstagram, FaYoutube } from 'react-icons/fa';

const eventTypes = [
  'Stadium / Arena',
  'Festival Mainstage',
  'Club Takeover',
  'College / Campus',
  'Feature / Guest Verse'
];

const crowdTiers = [
  'Under 2,500 Fans',
  '2,500 – 8,000 Fans',
  '8,000 – 20,000+ Stadium',
  'Festival Mega Crowd'
];

const BookAShow = () => {
  const [selectedType, setSelectedType] = useState('Festival Mainstage');
  const [selectedCrowd, setSelectedCrowd] = useState('2,500 – 8,000 Fans');
  const [formData, setFormData] = useState({
    promoterName: '',
    email: '',
    phone: '',
    cityVenue: '',
    eventDate: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate high-voltage submission dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  const handleReset = () => {
    setFormData({
      promoterName: '',
      email: '',
      phone: '',
      cityVenue: '',
      eventDate: '',
      notes: ''
    });
    setIsSubmitted(false);
  };

  return (
    <section id="booking" className="book-show-section">
      {/* Background Ambience & Cyber Grid */}
      <div className="book-grid-bg"></div>
      <div className="book-radial-glow"></div>

      <div className="book-container">
        {/* Section Header */}
        <div className="book-header">
          <div className="book-badge-row">
            <span className="book-live-pill">
              <span className="live-pulse-dot"></span>
              2026 / 2027 TOUR CYCLE OPEN
            </span>
            <span className="book-mono-tag">[ DIRECT ARTIST DISPATCH ]</span>
          </div>

          <h2 className="book-title">
            LOCK IN YOUR CITY <span className="highlight-electric">// BOOK LIVE</span>
          </h2>
          <p className="book-subtitle">
            Bring Sri Lanka's undisputed rap icon to your stage. Direct promoter booking for headline festivals, 
            arena tours, international showcases, and exclusive live events.
          </p>
        </div>

        {/* Booking Interactive Terminal */}
        <div className="book-terminal-wrapper">
          {/* Main Form Column */}
          <div className="book-form-card">
            {isSubmitted ? (
              <div className="book-success-panel">
                <div className="success-icon-box">
                  <FiCheckCircle className="success-icon" />
                </div>
                <span className="success-tag">DISPATCH TRANSMITTED</span>
                <h3 className="success-title">BOOKING PROPOSAL LOGGED</h3>
                <p className="success-desc">
                  Your tour dispatch for <strong>{selectedType}</strong> in <strong>{formData.cityVenue || 'Your City'}</strong> has 
                  been forwarded straight to Smokio's official management desk.
                </p>
                <div className="success-dispatch-id">
                  <span>REFERENCE ID:</span>
                  <code>#SMK-TOUR-{Math.floor(100000 + Math.random() * 900000)}</code>
                </div>
                <p className="success-sla">
                  Our tour director will review venue technical riders and contact you within <strong>24–48 hours</strong>.
                </p>
                <button className="book-reset-btn" onClick={handleReset}>
                  SUBMIT ANOTHER DISPATCH ↗
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="book-form">
                {/* 1. Event Type Selector */}
                <div className="form-group-block">
                  <label className="form-block-label">
                    <FiZap className="label-icon" /> 01 // SELECT PERFORMANCE FORMAT
                  </label>
                  <div className="event-type-chips">
                    {eventTypes.map((type) => (
                      <button
                        type="button"
                        key={type}
                        className={`type-chip ${selectedType === type ? 'active' : ''}`}
                        onClick={() => setSelectedType(type)}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Promoter Info Inputs */}
                <div className="form-row-two">
                  <div className="input-group">
                    <label className="input-label" htmlFor="promoterName">
                      <FiUser className="input-icon" /> Promoter / Organizer Name *
                    </label>
                    <input
                      id="promoterName"
                      type="text"
                      name="promoterName"
                      required
                      placeholder="e.g. Kasun Perera / Redline Events"
                      value={formData.promoterName}
                      onChange={handleChange}
                      className="book-input"
                    />
                  </div>

                  <div className="input-group">
                    <label className="input-label" htmlFor="email">
                      <FiMail className="input-icon" /> Official Agency Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      placeholder="e.g. kasun@redline.lk"
                      value={formData.email}
                      onChange={handleChange}
                      className="book-input"
                    />
                  </div>
                </div>

                {/* 3. Location & Date */}
                <div className="form-row-two">
                  <div className="input-group">
                    <label className="input-label" htmlFor="cityVenue">
                      <FiMapPin className="input-icon" /> City & Proposed Venue *
                    </label>
                    <input
                      id="cityVenue"
                      type="text"
                      name="cityVenue"
                      required
                      placeholder="e.g. Colombo // Sugathadasa Indoor Stadium"
                      value={formData.cityVenue}
                      onChange={handleChange}
                      className="book-input"
                    />
                  </div>

                  <div className="input-group">
                    <label className="input-label" htmlFor="eventDate">
                      <FiCalendar className="input-icon" /> Target Event Date *
                    </label>
                    <input
                      id="eventDate"
                      type="date"
                      name="eventDate"
                      required
                      value={formData.eventDate}
                      onChange={handleChange}
                      className="book-input date-input"
                    />
                  </div>
                </div>

                {/* 4. Crowd Capacity Tier */}
                <div className="form-group-block">
                  <label className="form-block-label">
                    <FiUsers className="label-icon" /> 02 // EXPECTED ATTENDANCE SCALE
                  </label>
                  <div className="crowd-tier-grid">
                    {crowdTiers.map((tier) => (
                      <button
                        type="button"
                        key={tier}
                        className={`crowd-tier-btn ${selectedCrowd === tier ? 'active' : ''}`}
                        onClick={() => setSelectedCrowd(tier)}
                      >
                        <span className="tier-radio-dot"></span>
                        {tier}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 5. Message / Technical Rider Requests */}
                <div className="input-group">
                  <label className="input-label" htmlFor="notes">
                    Event Vision, Sound System Specs or Custom Rider Notes
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows="3"
                    placeholder="Tell us about the stage setup, co-performers, sound equipment or special requirements..."
                    value={formData.notes}
                    onChange={handleChange}
                    className="book-textarea"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="form-submit-row">
                  <button type="submit" className="book-submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span className="submit-loading-text">TRANSMITTING DISPATCH...</span>
                    ) : (
                      <>
                        <span>TRANSMIT BOOKING DISPATCH</span>
                        <FiSend className="btn-arrow-icon" />
                      </>
                    )}
                  </button>
                  <span className="direct-sla-note">🔒 SSL Encrypted • Direct Management Desk</span>
                </div>
              </form>
            )}
          </div>

          {/* Side Management Info HUD Card */}
          <div className="book-side-card">
            <div className="side-card-glow"></div>
            
            <div className="mgmt-badge">
              <span className="mgmt-label">ARTIST MANAGEMENT</span>
              <span className="mgmt-seal">44 KALLIYA // CERTIFIED</span>
            </div>

            <h3 className="side-headline">DIRECT TOUR & BOOKING DESK</h3>
            <p className="side-desc">
              For corporate headliners, international promoter consortiums, or time-sensitive dates, 
              reach our tour team directly.
            </p>

            <div className="mgmt-channels-list">
              <div className="mgmt-channel-item">
                <span className="channel-icon"><FiMail /></span>
                <div className="channel-info">
                  <span className="channel-label">Official Booking Inquiries</span>
                  <a href="mailto:booking@smokioofficial.com" className="channel-val">
                    booking@smokioofficial.com
                  </a>
                </div>
              </div>

              <div className="mgmt-channel-item">
                <span className="channel-icon"><FiPhoneCall /></span>
                <div className="channel-info">
                  <span className="channel-label">Tour Director Hotline / WhatsApp</span>
                  <span className="channel-val">+94 77 123 4444</span>
                </div>
              </div>

              <div className="mgmt-channel-item">
                <span className="channel-icon"><FiMapPin /></span>
                <div className="channel-info">
                  <span className="channel-label">HQ / Management Base</span>
                  <span className="channel-val">Colombo 07, Sri Lanka</span>
                </div>
              </div>
            </div>

            {/* Live Stats Box */}
            <div className="mgmt-stats-box">
              <div className="stat-unit">
                <span className="stat-number">250K+</span>
                <span className="stat-label">Live Fans Hyped</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-unit">
                <span className="stat-number">100%</span>
                <span className="stat-label">Show Energy</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-unit">
                <span className="stat-number">24H</span>
                <span className="stat-label">Fast Response</span>
              </div>
            </div>

            <div className="mgmt-socials-row">
              <span className="socials-label">OFFICIAL FEEDS:</span>
              <div className="mgmt-social-links">
                <a href="https://spotify.com" target="_blank" rel="noreferrer" title="Spotify"><FaSpotify /></a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" title="YouTube"><FaYoutube /></a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" title="Instagram"><FaInstagram /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookAShow;
