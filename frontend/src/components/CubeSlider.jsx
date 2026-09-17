import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './CubeSlider.css';
import { TbWaveSine, TbAdjustmentsHorizontal } from "react-icons/tb";
import { MdOutlineQueueMusic } from "react-icons/md";
import { RiMicLine } from "react-icons/ri";

import img1 from '../assets/img22.jpeg';
import img2 from '../assets/img23.jpeg';
import img3 from '../assets/img24.jpeg';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const CubeSlider = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      // Pin the section so it stays fixed behind the upcoming video split (Desktop only)
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=250%",
        pin: true,
        pinSpacing: false
      });

      const textTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 50%", // Starts when section is 50% down the screen
          end: "+=200%", // Increased scroll distance to accommodate all animations
          scrub: 1
        }
      });

      // Animate the main description paragraph with a text-reveal highlight effect
      const prodWords = containerRef.current.querySelectorAll('.prod-word');
      if (prodWords.length > 0) {
        textTl.to(prodWords, {
          keyframes: {
            "0%": { opacity: 0.2, color: "#444" },
            "50%": { opacity: 1, color: "#a2cfee" },
            "100%": { opacity: 1, color: "#ffffff" }
          },
          stagger: 0.1,
          ease: 'none',
          duration: 2
        });
      }
      
      textTl.fromTo('.service-item', 
        { scale: 0, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'back.out(1.7)' }, 
        "-=0.5" 
      )
      .fromTo('.gallery-col', 
        { scale: 0, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'back.out(1.5)' }, 
        "-=0.4"
      );

      // Independent smooth animation for the Navbar
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 50%", 
        end: "+=200%",
        onEnter: () => gsap.to(document.querySelector('.playza-header'), { y: -100, opacity: 0, duration: 0.4, ease: 'power2.inOut' }),
        onLeave: () => gsap.to(document.querySelector('.playza-header'), { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }),
        onEnterBack: () => gsap.to(document.querySelector('.playza-header'), { y: -100, opacity: 0, duration: 0.4, ease: 'power2.inOut' }),
        onLeaveBack: () => gsap.to(document.querySelector('.playza-header'), { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' })
      });
    });

    mm.add("(max-width: 768px)", () => {
      // Mobile version: No pinning, simpler animation
      const textTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 80%",
          scrub: 1
        }
      });

      const prodWords = containerRef.current.querySelectorAll('.prod-word');
      if (prodWords.length > 0) {
        textTl.to(prodWords, {
          keyframes: {
            "0%": { opacity: 0.2, color: "#444" },
            "50%": { opacity: 1, color: "#a2cfee" },
            "100%": { opacity: 1, color: "#ffffff" }
          },
          stagger: 0.1,
          ease: 'none',
          duration: 1
        });
      }
      
      textTl.fromTo('.service-item', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }, 
        "-=0.2"
      )
      .fromTo('.gallery-col', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }, 
        "-=0.2"
      );
    });

  }, { scope: containerRef });

  const handleGlitch = (e) => {
    const el = e.currentTarget;
    console.log("Hovering image:", el);
    
    // Stop any current tweens to prevent weird states
    gsap.killTweensOf(el);
    
    gsap.to(el, {
      duration: 0.3,
      keyframes: [
        { x: -10, y: 5, skewX: 5, scale: 1.05 },
        { x: 10, y: -5, skewX: -5, scale: 1.05 },
        { x: -5, y: 10, skewX: 10, scale: 1.05 },
        { x: 5, y: -10, skewX: -10, scale: 1.05 },
        { x: 0, y: 0, skewX: 0, scale: 1 }
      ],
      ease: "none"
    });
  };

  return (
    <section className="about-producer-section" ref={containerRef}>
      <div className="producer-content">
        <p className="producer-description">
          {"Smokio is a genre-blending producer crafting soulful, futuristic beats.".split(' ').map((word, i) => (
            <span key={'a'+i} className="prod-word">{word}</span>
          ))}
          {" Known for ".split(' ').map((word, i) => (
            <span key={'b'+i} className="prod-word">{word}</span>
          ))}
          <strong className="prod-word" style={{ color: 'inherit' }}>immersive soundscapes</strong>
          {" and emotional depth, each track".split(' ').map((word, i) => (
            <span key={'c'+i} className="prod-word">{word}</span>
          ))}
          {" delivers a vivid journey through rhythm, texture, and imagination.".split(' ').map((word, i) => (
            <span key={'d'+i} className="prod-word">{word}</span>
          ))}
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
            <img src={img1} alt="Producer Work 1" onMouseEnter={handleGlitch} />
          </div>
          <div className="gallery-col col-2">
            <img src={img2} alt="Producer Work 2" onMouseEnter={handleGlitch} />
          </div>
          <div className="gallery-col col-3">
            <img src={img3} alt="Producer Work 3" onMouseEnter={handleGlitch} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CubeSlider;
