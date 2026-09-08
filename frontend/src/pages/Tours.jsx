import React from 'react';

const Tours = () => {
  const tours = [
    { title: 'Electric Vibes', date: '19.12.2025', time: '20:00', location: '123 Broadway St, New York, NY 10007, USA', img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80' },
    { title: 'Night Beats', date: '29.12.2025', time: '21:30', location: '456 Sunset Blvd, Los Angeles, CA 90028, USA', img: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80' },
    { title: 'Golden Notes', date: '5.1.2026', time: '18:30', location: '321 Bourbon St, New Orleans, LA 70130, USA', img: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=600&q=80' },
    { title: 'Cyber Utopia Live', date: '15.1.2026', time: '21:00', location: '700 Clark Ave, St. Louis, MO 63102, USA', img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80' },
    { title: 'Astroworld Redefine', date: '28.1.2026', time: '19:30', location: '1501 NW 3rd Ave, Miami, FL 33136, USA', img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80' },
    { title: 'Neon Overdrive', date: '12.2.2026', time: '20:30', location: '100 1st Ave N, Minneapolis, MN 55401, USA', img: 'https://images.unsplash.com/photo-1539375665275-f9de415ef9ac?auto=format&fit=crop&w=600&q=80' }
  ];

  return (
    <div className="tours-container page">
      <section className="tours-section" style={{ paddingTop: '10rem' }}>
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
                  <button className="tour-btn">Get Ticket ↗</button>
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
