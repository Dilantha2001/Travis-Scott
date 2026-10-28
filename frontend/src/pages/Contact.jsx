import React, { useState } from 'react';
import './Contact.css';
import { FiArrowUpRight, FiCheckCircle, FiX, FiPlus, FiMinus, FiCalendar, FiClock, FiShield } from 'react-icons/fi';
import manPerformingImg from '../assets/Man_performing_on_stage_202609082107.jpeg';
import smokeImg from '../assets/smoke.jpg';
import blueStageImg from '../assets/noctra_blue_stage.jpg';
import stageImg from '../assets/stage.jpeg';

const TICKETS = [
  {
    id: 'general-admission',
    tier: 'GENERAL ADMISSION',
    price: 'LKR 3,500',
    priceNum: 3500,
    description: 'Perfect for first-timers or casual fans. Enjoy a full day of music, food, and nonstop vibes on the main stages.',
    image: manPerformingImg,
    badgeText: 'GENERAL ADMISSION',
    time: '11 AM – Midnight',
    date: '10 OCT',
    serial: '*816108004027145*',
    admitText: 'ADMIT ONE',
    staggerClass: 'ticket-stagger-left'
  },
  {
    id: 'vip-pass',
    tier: 'WEEKEND VIP PASS',
    price: 'LKR 6,500',
    priceNum: 6500,
    description: "Double the fun with two days of festival magic. Ideal for those who don't want to miss a single drop or headliner.",
    image: smokeImg,
    badgeText: 'VIP PASS',
    time: '1 PM – 2 AM',
    date: '10 NOV',
    serial: '*93821049281734*',
    admitText: 'ADMIT TWO DAYS',
    staggerClass: 'ticket-stagger-right'
  },
  {
    id: 'all-access-pass',
    tier: 'ALL ACCESS BACKSTAGE',
    price: 'LKR 12,000',
    priceNum: 12000,
    description: 'Full festival access, VIP lounge, side-stage soundcheck viewing, express entry, and exclusive official 44 Kalliya merchandise kit.',
    image: blueStageImg,
    badgeText: 'ALL ACCESS',
    time: 'All Weekend',
    date: '12 DEC',
    serial: '*44109283746192*',
    admitText: 'VIP ALL ACCESS',
    staggerClass: 'ticket-stagger-center'
  }
];

const Contact = () => {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [buyerInfo, setBuyerInfo] = useState({ fullName: '', email: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  const handleOpenCheckout = (ticket) => {
    setSelectedTicket(ticket);
    setTicketQuantity(1);
    setOrderConfirmed(false);
  };

  const handleCloseModal = () => {
    setSelectedTicket(null);
    setOrderConfirmed(false);
    setBuyerInfo({ fullName: '', email: '', phone: '' });
  };

  const handleQuantityChange = (delta) => {
    setTicketQuantity((prev) => Math.max(1, Math.min(8, prev + delta)));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBuyerInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirmPurchase = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setConfirmedOrder({
        ticket: selectedTicket,
        quantity: ticketQuantity,
        total: (selectedTicket.priceNum * ticketQuantity).toLocaleString(),
        orderId: `SMK-TKT-${Math.floor(100000 + Math.random() * 900000)}`,
        buyer: { ...buyerInfo }
      });
      setOrderConfirmed(true);
    }, 700);
  };

  return (
    <section id="contact" className="festival-tickets-section">
      {/* Top Brand Green & Black Checkerboard Ribbon Strip */}
      <div className="ticket-checkerboard-tape"></div>

      {/* Atmospheric Stage Festival Dusk Backdrop */}
      <div 
        className="festival-tickets-backdrop"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(8, 10, 20, 0.76) 0%, rgba(4, 5, 12, 0.94) 100%), url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=2000&q=80'), url(${stageImg})`
        }}
      >
        <div className="festival-warm-glow"></div>
      </div>

      <div className="festival-tickets-content">
        {/* Subtle Horizontal Header Guide Lines from Reference Design */}
        <div className="ticket-header-guides">
          <div className="header-guide-line"></div>
          <div className="header-guide-line"></div>
        </div>

        {/* Section Header */}
        <div className="festival-tickets-header">
          <span className="tickets-micro-tag">OFFICIAL TOUR PASSES // 2026 - 2027</span>
          <h2 className="tickets-main-heading">SECURE YOUR PASS</h2>
        </div>

        {/* Staggered Concert Tickets Showcase */}
        <div className="festival-tickets-list">
          {TICKETS.map((ticket) => (
            <div 
              key={ticket.id} 
              className={`festival-ticket-card ${ticket.staggerClass}`}
            >
              {/* Left Column: Price, Description & Buy Button */}
              <div className="ticket-left-block">
                <div className="ticket-price-display">{ticket.price}</div>
                <p className="ticket-description-text">{ticket.description}</p>
                <button 
                  className="ticket-buy-btn"
                  onClick={() => handleOpenCheckout(ticket)}
                  type="button"
                >
                  <span className="buy-btn-label">Buy Tickets</span>
                  <span className="buy-btn-arrow">
                    <FiArrowUpRight />
                  </span>
                </button>
              </div>

              {/* Center Column: Grayscale Stage Photo with Category Overlay */}
              <div className="ticket-center-block">
                <div className="ticket-image-frame">
                  <img src={ticket.image} alt={ticket.tier} className="ticket-poster-img" />
                  <div className="ticket-image-overlay">
                    <span className="ticket-badge-title">{ticket.badgeText}</span>
                  </div>
                </div>
              </div>

              {/* Perforated Divider with Circular Punch Hole Notches */}
              <div className="ticket-perforation-divider">
                <span className="ticket-notch notch-top"></span>
                <span className="ticket-dashed-line"></span>
                <span className="ticket-notch notch-bottom"></span>
              </div>

              {/* Right Column: Ticket Stub with Time, Date & Vertical Barcode */}
              <div className="ticket-right-stub">
                <div className="stub-time-text">{ticket.time}</div>
                <div className="stub-date-text">{ticket.date}</div>
                <div className="stub-barcode-block">
                  <svg className="stub-barcode-svg" viewBox="0 0 16 110" preserveAspectRatio="none">
                    <rect x="0" y="0" width="1.5" height="110" fill="#000" />
                    <rect x="3" y="0" width="2.5" height="110" fill="#000" />
                    <rect x="7" y="0" width="1" height="110" fill="#000" />
                    <rect x="9" y="0" width="2" height="110" fill="#000" />
                    <rect x="12" y="0" width="1.5" height="110" fill="#000" />
                    <rect x="14.5" y="0" width="1.5" height="110" fill="#000" />
                  </svg>
                  <span className="stub-serial-text">{ticket.serial}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Ticket Checkout Modal */}
      {selectedTicket && (
        <div className="ticket-modal-backdrop" onClick={handleCloseModal}>
          <div className="ticket-modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={handleCloseModal} type="button">
              <FiX />
            </button>

            {!orderConfirmed ? (
              <div className="modal-checkout-flow">
                <div className="modal-header">
                  <span className="modal-tier-tag">{selectedTicket.badgeText}</span>
                  <h3 className="modal-title">{selectedTicket.tier}</h3>
                  <div className="modal-event-meta">
                    <span><FiCalendar /> {selectedTicket.date}</span>
                    <span><FiClock /> {selectedTicket.time}</span>
                  </div>
                </div>

                <form onSubmit={handleConfirmPurchase} className="modal-form">
                  {/* Quantity Counter */}
                  <div className="modal-quantity-row">
                    <label className="quantity-label">Number of Tickets</label>
                    <div className="quantity-controls">
                      <button 
                        type="button" 
                        className="qty-btn" 
                        onClick={() => handleQuantityChange(-1)}
                        disabled={ticketQuantity <= 1}
                      >
                        <FiMinus />
                      </button>
                      <span className="qty-number">{ticketQuantity}</span>
                      <button 
                        type="button" 
                        className="qty-btn" 
                        onClick={() => handleQuantityChange(1)}
                        disabled={ticketQuantity >= 8}
                      >
                        <FiPlus />
                      </button>
                    </div>
                  </div>

                  {/* Buyer Contact Fields */}
                  <div className="modal-input-group">
                    <label>Full Name</label>
                    <input 
                      type="text" 
                      name="fullName" 
                      required 
                      placeholder="e.g. Kasun Perera" 
                      value={buyerInfo.fullName}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="modal-input-group">
                    <label>Email Address (For E-Ticket Pass)</label>
                    <input 
                      type="email" 
                      name="email" 
                      required 
                      placeholder="e.g. kasun@example.com" 
                      value={buyerInfo.email}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="modal-input-group">
                    <label>Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      required 
                      placeholder="+94 77 123 4567" 
                      value={buyerInfo.phone}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Order Total Row */}
                  <div className="modal-total-summary">
                    <span>Total Amount</span>
                    <span className="modal-total-price">
                      LKR {(selectedTicket.priceNum * ticketQuantity).toLocaleString()}
                    </span>
                  </div>

                  <button 
                    type="submit" 
                    className="modal-submit-btn" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Reserving...' : `Confirm & Get Pass ↗`}
                  </button>
                  
                  <div className="modal-security-badge">
                    <FiShield /> Instant Digital QR Confirmation · Official Smokio Tour Entry
                  </div>
                </form>
              </div>
            ) : (
              <div className="modal-success-screen">
                <div className="success-icon-wrap">
                  <FiCheckCircle />
                </div>
                <h3>PASS RESERVED!</h3>
                <p className="success-msg">
                  Your ticket confirmation has been generated for <strong>{confirmedOrder?.buyer?.fullName}</strong>.
                </p>

                <div className="issued-pass-card">
                  <div className="issued-pass-top">
                    <span className="issued-badge">{confirmedOrder?.ticket?.badgeText}</span>
                    <span className="issued-order-num">{confirmedOrder?.orderId}</span>
                  </div>
                  <div className="issued-pass-body">
                    <h4>{confirmedOrder?.ticket?.tier}</h4>
                    <p>{confirmedOrder?.quantity}x Admission · {confirmedOrder?.ticket?.date}</p>
                    <div className="issued-total-badge">LKR {confirmedOrder?.total}</div>
                  </div>
                  <div className="issued-pass-barcode">
                    <span className="barcode-bars">|||||||||||||||||||||||||||||||||||||||||</span>
                    <span className="barcode-num">{confirmedOrder?.ticket?.serial}</span>
                  </div>
                </div>

                <button 
                  type="button" 
                  className="modal-close-action-btn"
                  onClick={handleCloseModal}
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;
