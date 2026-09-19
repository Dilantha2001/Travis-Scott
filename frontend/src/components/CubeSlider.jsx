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

    mm.add("(min-width: 1025px)", () => {
      // Pin the section so it stays fixed behind the upcoming video split (Desktop only)
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=400%",
        pin: true,
        pinSpacing: true
      });

      const textTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 50%", // Starts when section is 50% down the screen
          end: "+=350%", // Increased scroll distance to accommodate all animations
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
        end: "+=350%",
        onEnter: () => gsap.to(document.querySelector('.playza-header'), { y: -100, opacity: 0, duration: 0.4, ease: 'power2.inOut' }),
        onLeave: () => gsap.to(document.querySelector('.playza-header'), { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }),
        onEnterBack: () => gsap.to(document.querySelector('.playza-header'), { y: -100, opacity: 0, duration: 0.4, ease: 'power2.inOut' }),
        onLeaveBack: () => gsap.to(document.querySelector('.playza-header'), { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' })
      });
    });

    mm.add("(max-width: 1024px)", () => {
      const prodWords = containerRef.current.querySelectorAll('.prod-word');
      const mobileTl = gsap.timeline({ paused: true });

      if (prodWords.length > 0) {
        mobileTl.to(prodWords, {
          keyframes: {
            "0%": { opacity: 0.2, color: "#444" },
            "50%": { opacity: 1, color: "#a2cfee" },
            "100%": { opacity: 1, color: "#ffffff" }
          },
          stagger: 0.1,
          duration: 1.5,
          ease: 'none'
        });
      }
      
      mobileTl.fromTo('.service-item', 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
        "-=0.5" 
      );

      // Animate each gallery image
      const galleryItems = containerRef.current.querySelectorAll('.gallery-col');
      if (galleryItems.length > 0) {
        mobileTl.fromTo(galleryItems, 
          { opacity: 0, scale: 0.95, y: 40 },
          { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'back.out(1.5)' },
          "-=0.3"
        );
      }

      // Use native IntersectionObserver to bypass mobile ScrollTrigger bugs
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          mobileTl.play();
          observer.disconnect();
        }
      }, { threshold: 0.2 });

      observer.observe(containerRef.current);

      return () => observer.disconnect();
    });

    return () => mm.revert();
  }, { scope: containerRef });

  const handleMouseEnter = (e) => {
    const el = e.currentTarget;
    gsap.killTweensOf(el);
    gsap.to(el, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.5)"
    });
  };

  const handleMouseLeave = (e) => {
    const el = e.currentTarget;
    gsap.killTweensOf(el);
    gsap.to(el, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
      boxShadow: "none"
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
            <img src={img1} alt="Producer Work 1" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
          </div>
          <div className="gallery-col col-2">
            <img src={img2} alt="Producer Work 2" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
          </div>
          <div className="gallery-col col-3">
            <img src={img3} alt="Producer Work 3" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CubeSlider;
