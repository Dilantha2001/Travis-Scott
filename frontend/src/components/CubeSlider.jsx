import React from 'react';
import './CubeSlider.css';
import { TbWaveSine, TbAdjustmentsHorizontal } from "react-icons/tb";
import { MdOutlineQueueMusic } from "react-icons/md";
import { RiMicLine } from "react-icons/ri";

import img1 from '../assets/img22.jpeg';
import img2 from '../assets/img23.jpeg';
import img3 from '../assets/img24.jpeg';

const CubeSlider = () => {
  return (
    <section className="about-producer-section">
      <div className="producer-content">
        <p className="producer-description">
          Smokio is a genre-blending producer crafting soulful, futuristic beats.<br/>
          Known for <strong>immersive soundscapes</strong> and emotional depth, each track<br/>
          delivers a vivid journey through rhythm, texture, and imagination.
        </p>

        <div className="producer-services">
          <div className="service-item">
            <TbWaveSine className="service-icon" />
            <span>Sound<br/>Maker</span>
          </div>
          <div className="service-item">
            <MdOutlineQueueMusic className="service-icon" />
            <span>Music<br/>Production</span>
          </div>
          <div className="service-item">
            <RiMicLine className="service-icon" />
            <span>Recording<br/>Session</span>
          </div>
          <div className="service-item">
            <TbAdjustmentsHorizontal className="service-icon" />
            <span>Mixing &<br/>Mastering</span>
          </div>
        </div>

        <div className="producer-gallery">
          <div className="gallery-col col-1">
            <img src={img1} alt="Producer Work 1" />
          </div>
          <div className="gallery-col col-2">
            <img src={img2} alt="Producer Work 2" />
          </div>
          <div className="gallery-col col-3">
            <img src={img3} alt="Producer Work 3" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CubeSlider;
