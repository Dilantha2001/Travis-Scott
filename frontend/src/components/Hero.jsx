import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './Hero.css';

import img1 from '../assets/18471941d8dc978a8e17dffe556a5e68.jpg_2K_202609012300.jpeg';
import img2 from '../assets/1a5b12a65a8011378be7e83fe39393e0.jpg_2K_202609012303.jpeg';
import img3 from '../assets/224a98e3785588030eb08d1b4117b863.jpg_2K_202609012315.jpeg';
import img4 from '../assets/224a98e3785588030eb08d1b4117b863.jpg_2K_202609012315 copy.jpeg';
import img5 from '../assets/8a1390686a2bda84494fc30792e5f9f9.jpg_2K_202609012319.jpeg';
import img6 from '../assets/Man_touching_braided_hair_2K_202609012246.jpeg';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const sequenceImages = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6
];

export default function Hero() {
  const container = useRef(null);
  const cursorRef = useRef(null);
  const cursorRingRef = useRef(null);

  useGSAP(() => {
    // ── LIGHTWEIGHT CUSTOM CURSOR (No Animation/Easing) ──
    const onMouseMove = (e) => {
      if (cursorRef.current && cursorRingRef.current) {
        // Direct DOM manipulation for maximum performance without GSAP ticker memory overhead
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        cursorRingRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };
    window.addEventListener("mousemove", onMouseMove);

    // ── SMOOTH CROSSFADE SLIDER ──────────────────────────
    const imgs = gsap.utils.toArray('.sequence-img');
    gsap.set(imgs, { opacity: 0 }); // reset all
    gsap.set(imgs[0], { opacity: 1 }); // show first image

    const seqTl = gsap.timeline({ repeat: -1 }); // Infinite loop
    
    // Create a smooth crossfade effect
    imgs.forEach((img, index) => {
      const nextImg = imgs[(index + 1) % imgs.length];
      
      seqTl
        // Wait time (how long the image stays visible without fading)
        .to({}, { duration: 1 })
        // Crossfade to the next image with an ease for a realistic feel
        .to(nextImg, { opacity: 1, duration: 0.1, ease: "power2.inOut" }, `crossfade_${index}`)
        .to(img, { opacity: 0, duration: 1.2, ease: "power2.inOut" }, `crossfade_${index}`);
    });

    // ── BACKGROUND DRIFT ─────────────────────────────────
    const plasma = container.current.querySelector(".bg-plasma");
    const bv = {
      b1x: 20, b1y: 30,
      b2x: 80, b2y: 15,
      b3x: 55, b3y: 85,
      b4x: 10, b4y: 80
    };
    
    const plasmaTicker = () => {
      if(plasma) {
          plasma.style.background = `
            radial-gradient(ellipse 70% 70% at ${bv.b1x}% ${bv.b1y}%, hsl(330,100%,55%) 0%, transparent 55%),
            radial-gradient(ellipse 60% 60% at ${bv.b2x}% ${bv.b2y}%, hsl(52,100%,50%)  0%, transparent 55%),
            radial-gradient(ellipse 65% 65% at ${bv.b3x}% ${bv.b3y}%, hsl(20,100%,55%)  0%, transparent 55%),
            radial-gradient(ellipse 50% 50% at ${bv.b4x}% ${bv.b4y}%, hsl(185,100%,52%) 0%, transparent 50%),
            hsl(48,100%,93%)
          `;
      }
    };
    gsap.ticker.add(plasmaTicker);
    
    gsap.to(bv, {
      b1x: 40, b1y: 55,
      b2x: 65, b2y: 35,
      b3x: 30, b3y: 60,
      b4x: 85, b4y: 25,
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // ── ENTRANCE ANIMATION ───────────────────────────────
    const rowA = "#rowA";

    gsap.set([rowA], { yPercent: 105 });

    const intro = gsap.timeline({ delay: 0.15 });

    intro
      .to(rowA, { yPercent: 0, duration: 0.9, ease: "power3.out" });

    // ── SCROLL TIMELINE ────────────────────────────────
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#wrapper",
        start: "top top",
        end: "+=180%",
        pin: true,
        scrub: 1
      }
    });

    tl
      // Image pushes toward you — the zoom
      .fromTo(
        "#imgContainer", // Zoom the whole container instead of a single image
        { scale: 1, z: 0 },
        { scale: 2.2, z: 350, transformOrigin: "center center", ease: "power1.inOut" },
        0
      )
      // Title flies down
      .fromTo(rowA, { yPercent: 0, opacity: 1 }, { yPercent: 120, opacity: 0, ease: "power2.in" }, 0)
      // Background field fades
      .fromTo("#bgPlasma", { opacity: 1 }, { opacity: 0, ease: "power2.in" }, 0.3);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      gsap.ticker.remove(plasmaTicker);
      seqTl.kill(); // clean up sequence timeline
    }
  }, { scope: container });

  return (
    <div ref={container}>
      <div className="cursor" ref={cursorRef} id="cursor"></div>
      <div className="cursor-ring" ref={cursorRingRef} id="cursorRing"></div>

      {/* ── PINNED WRAPPER ── */}
      <div className="wrapper" id="wrapper">
        {/* Electric BG */}
        <div className="bg-plasma" id="bgPlasma"></div>

        {/* Rapid Image Sequence */}
        <div className="image-container" id="imgContainer">
          {sequenceImages.map((src, idx) => (
            <img key={idx} src={src} className="sequence-img" alt={`frame-${idx}`} />
          ))}
        </div>

        {/* Big title */}
        <div className="hero-overlay">
          <div className="hero-title" id="heroTitle">
            <div className="row"><span id="rowA">FUTURE NOW</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
