import React from 'react';
import MovementSection from '../components/MovementSection';
import NoctraAboutSection from '../components/NoctraAboutSection';

const About = () => {
  return (
    <div className="about-page-wrapper" style={{ paddingTop: '5rem' }}>
      <MovementSection />
      <NoctraAboutSection />
    </div>
  );
};

export default About;
