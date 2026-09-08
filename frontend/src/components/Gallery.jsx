import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './Gallery.css';

import img1 from '../assets/18471941d8dc978a8e17dffe556a5e68.jpg_2K_202609012300.jpeg';
import img2 from '../assets/1a5b12a65a8011378be7e83fe39393e0.jpg_2K_202609012303.jpeg';
import img3 from '../assets/224a98e3785588030eb08d1b4117b863.jpg_2K_202609012315.jpeg';
import img4 from '../assets/8a1390686a2bda84494fc30792e5f9f9.jpg_2K_202609012319.jpeg';
import img5 from '../assets/Man_touching_braided_hair_2K_202609012246.jpeg';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Gallery() {
  const sectionRef = useRef(null);
  const pinWrapRef = useRef(null);

  useGSAP(() => {
    // We calculate the horizontal scroll distance:
    // How much the content overflows the viewport width
    const getScrollAmount = () => {
      let pinWrapWidth = pinWrapRef.current.scrollWidth;
      return -(pinWrapWidth - window.innerWidth);
    };

    const tween = gsap.to(pinWrapRef.current, {
      x: getScrollAmount,
      ease: "none",
    });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: () => `+=${pinWrapRef.current.scrollWidth}`,
      pin: true,
      animation: tween,
      scrub: 1,
      invalidateOnRefresh: true, // Recalculates on resize
    });
    
    return () => {
      tween.kill();
    }
  }, { scope: sectionRef });

  return (
    <section className="gallery-section" ref={sectionRef}>
      <div className="pin-wrap" ref={pinWrapRef}>
        <div className="gallery-item title-item">
          <h2>UTOPIA</h2>
          <p>THE EXPERIENCE</p>
        </div>
        <div className="gallery-item img-item">
          <img src={img1} alt="Travis Scott 1" />
        </div>
        <div className="gallery-item img-item">
          <img src={img2} alt="Travis Scott 2" />
        </div>
        <div className="gallery-item title-item">
          <h2>CACTUS</h2>
          <p>JACK</p>
        </div>
        <div className="gallery-item img-item">
          <img src={img3} alt="Travis Scott 3" />
        </div>
        <div className="gallery-item img-item">
          <img src={img5} alt="Travis Scott 5" />
        </div>
        <div className="gallery-item title-item">
          <h2>SICKO</h2>
          <p>MODE</p>
        </div>
        <div className="gallery-item img-item">
          <img src={img4} alt="Travis Scott 4" />
        </div>
      </div>
    </section>
  );
}
