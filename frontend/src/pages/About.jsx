import React from 'react';

const About = () => {
  return (
    <div className="about-container page">
      <section className="about-hero">
        <h1 className="page-title">Who Are We</h1>
        <p className="page-subtitle">We are Playza. Built on raw energy and unapologetic truth, we make music that shakes you awake and reminds you how real sound should feel.</p>
      </section>

      <section className="band-members-section">
        <h2 className="page-title" style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Meet The Band</h2>
        <div className="members-grid">
          <div className="member-card">
            <img src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80" alt="Angel Green" />
            <h3>Angel Green</h3>
            <p>Lead Vocalist</p>
          </div>
          <div className="member-card">
            <img src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80" alt="Marcus Vance" />
            <h3>Marcus Vance</h3>
            <p>Guitarist</p>
          </div>
          <div className="member-card">
            <img src="https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=600&q=80" alt="Leo Carter" />
            <h3>Leo Carter</h3>
            <p>Drummer</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
