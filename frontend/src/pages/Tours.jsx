import React from 'react';
import { Link } from 'react-router-dom';

const Tours = () => {
  const tours = [
    { title: 'Colombo Rebellion Live', date: '15.05.2027', time: '20:00', location: 'Sugathadasa Indoor Stadium, Colombo, Sri Lanka', img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80' },
    { title: 'Midnight Haze Sessions', date: '28.06.2027', time: '21:30', location: 'Viharamahadevi Open Air Theatre, Colombo, Sri Lanka', img: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80' },
    { title: 'Raw Ambition Tour', date: '12.08.2027', time: '18:30', location: 'Kandy City Centre Amphitheatre, Kandy, Sri Lanka', img: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=600&q=80' },
    { title: 'Kamini // Dark Romance', date: '15.09.2027', time: '21:00', location: 'Galle Face Green Open Air, Colombo, Sri Lanka', img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80' },
    { title: 'Underground Drill Experience', date: '28.10.2027', time: '19:30', location: 'Nelum Pokuna Theatre, Colombo, Sri Lanka', img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80' },
    { title: 'Pure Smoke & Energy Finale', date: '12.12.2027', time: '20:30', location: 'CR & FC Grounds, Colombo, Sri Lanka', img: 'https://images.unsplash.com/photo-1539375665275-f9de415ef9ac?auto=format&fit=crop&w=600&q=80' }
  ];

  return (
    <div className="tours-container page">
      <section className="tours-section" style={{ paddingTop: '8rem' }}>
        <div className="section-header">
          <div>
            <h2 className="tours-title">Get ready for our upcoming tours</h2>
            <span className="section-subtitle red">Upcoming Tour Nights</span>
            <p className="section-desc">Our next tour spans 12 cities with over 25 live performances planned. Get ready for an unforgettable experience.</p>
          </div>
        </div>

        <div className="tours-list">
          {tours.map((tour, idx) => (
            <div key={idx} className="tour-row">
              <div className="tour-row-content">
                <div className="tour-img">
                  <img src={tour.img} alt={tour.title} />
                </div>
                <div className="tour-details">
                  <div className="tour-datetime tour-text-item">
                    <span>{tour.date}</span> / <span>{tour.time}</span>
                  </div>
                  <h3 className="tour-name tour-text-item">{tour.title}</h3>
                  <p className="tour-loc tour-text-item">{tour.location}</p>
                </div>
                <div className="tour-action">
                  <Link to="/#tickets" className="tour-btn" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                    Get Ticket ↗
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Tours;
