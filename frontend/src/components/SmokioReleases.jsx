import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { FaYoutube, FaSpotify, FaBandcamp, FaApple } from 'react-icons/fa';
import cubeImg from '../assets/cube.jpeg';
import './SmokioReleases.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const releases = [
  {
    isNew: true,
    title: "KUDDAH (REPLY DISS)",
    desc: "The track that shook the Sri Lankan rap scene. Unapologetic, raw, and delivered with venomous lyrical precision.",
    links: [
      { platform: "YouTube", icon: <FaYoutube style={{ color: '#ff0000' }} />, url: "#" },
      { platform: "Spotify", icon: <FaSpotify style={{ color: '#1db954' }} />, url: "#" }
    ]
  },
  {
    isNew: false,
    title: "GOLDEN FEVER",
    desc: "Smokio spits truths about survival, loyalty, and ambition. This masterpiece resonates deeply.",
    links: [
      { platform: "Spotify", icon: <FaSpotify style={{ color: '#1db954' }} />, url: "#" },
      { platform: "Apple Music", icon: <FaApple style={{ color: '#fff' }} />, url: "#" }
    ]
  },
  {
    isNew: false,
    title: "NEON NIGHTS",
    desc: "Merging aggressive rap flows with a deep, pulsating cyber-drill beat, this track showcases Smokio's unmatched versatility.",
    links: [
      { platform: "YouTube", icon: <FaYoutube style={{ color: '#ff0000' }} />, url: "#" },
      { platform: "Bandcamp", icon: <FaBandcamp style={{ color: '#629aa9' }} />, url: "#" }
    ]
  }
];

const SmokioReleases = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const songItems = gsap.utils.toArray('.smokio-song-item');

    songItems.forEach((item, i) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: "top 85%", // Triggers when the top of the item hits 85% from the top of viewport
          toggleActions: "play none none reverse"
        },
        x: 100, // Slide in from the right
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      });
    });
    
    // Animate the neon cross
    gsap.to('.neon-cross', {
      rotation: 360,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    });

  }, { scope: containerRef });

  return (
    <section className="smokio-releases-section" ref={containerRef}>
      {/* Background overlay effect with cube image */}
      <div className="smokio-releases-bg" style={{ backgroundImage: `url(${cubeImg})` }}>
        <div className="bg-gradient-overlay"></div>
      </div>
      
      {/* Neon Cross Graphic */}
      <div className="neon-cross">
        <div className="cross-line vertical"></div>
        <div className="cross-line horizontal"></div>
      </div>

      <div className="smokio-releases-content">
        {releases.map((song, index) => (
          <React.Fragment key={index}>
            <div className="smokio-song-item">
              {song.isNew && <div className="smokio-new-badge">NEW RELEASE</div>}
              
              <h2 className="smokio-song-title">{song.title}</h2>
              <p className="smokio-song-desc">{song.desc}</p>
              
              <div className="smokio-listen-now">
                <span className="listen-label">LISTEN NOW ON:</span>
                <div className="smokio-buttons-row">
                  {song.links.map((link, idx) => (
                    <a href={link.url} className="smokio-listen-btn" key={idx}>
                      <span className="btn-icon">{link.icon}</span>
                      <span className="btn-text">• Listen on {link.platform}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Separator line between items, except after the last one */}
            {index < releases.length - 1 && <div className="smokio-separator"></div>}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default SmokioReleases;
