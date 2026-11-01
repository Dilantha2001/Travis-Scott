import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MovementSection from '../components/MovementSection';
import NoctraAboutSection from '../components/NoctraAboutSection';
import DiscographyPlayer from '../components/DiscographyPlayer';
import MusicianStatementSection from '../components/MusicianStatementSection';
import Contact from './Contact';
import songMudukkuwenImg from '../assets/songs/mudukkuwen.jpg';
import songNidahasiImg from '../assets/songs/nidahasi.jpg';
import songKaminiImg from '../assets/songs/kamini.jpg';
import songKuddahImg from '../assets/songs/kuddah.jpg';
import songMokadaImg from '../assets/songs/mokada.jpg';
import stageImg from '../assets/backgrounds/stage.jpeg';

import smokioDissAudio from '../assets/audio/kuddah-reply-diss-smokio.mp3';
import kaminiAudio from '../assets/audio/kamini-smokio-breezy-tee-cee.mp3';
import mokadaWenneAudio from '../assets/audio/mokada-wenne-reply-diss-to-sosa-smokio.mp3';
import mudukkuwenAudio from '../assets/audio/sinhanada.net-Mudukkuwen-Eliyata-Smokio-Ft-Iraj.mp3';
import nidahasiAudio from '../assets/audio/nidahasi-smokio.mp3';
import manPerformingImg from '../assets/backgrounds/Man_performing_on_stage_202609082107.jpeg';
import img22 from '../assets/gallery/img22.jpeg';
import img23 from '../assets/gallery/img23.jpeg';
import img24 from '../assets/gallery/img24.jpeg';
import img25 from '../assets/gallery/img25.jpeg';
import img56 from '../assets/gallery/images_(56).jpg_20260911201544.jpeg';
import img57 from '../assets/gallery/images_(57).jpg_20260911201318.jpeg';
import img58 from '../assets/gallery/images_(58).jpg_20260911200933.jpeg';
import img59 from '../assets/gallery/images_(59).jpg_20260911200937.jpeg';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const heroRef = useRef(null);
  const heroContentRef = useRef(null);

  // Forget Concert Section refs
  const forgetConcertRef = useRef(null);
  const forgetBgRef = useRef(null);

  // Tours Section refs
  const toursSectionRef = useRef(null);
  const tourGlitchOverlayRef = useRef(null);
  const tourRowsRef = useRef([]);

  // Concert Gallery Section ref
  const gallerySectionRef = useRef(null);
  const galleryVideoRef = useRef(null);

  // Audio Playlist Player state & refs
  const playlistWidgetRef = useRef(null);
  const audioRef = useRef(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);

  const playlist = [
    { id: 1, title: 'MUDUKKUWEN ELIYATA', artist: 'Smokio, 44 Kalliya', duration: '3:45', date: '11.12.25', img: songMudukkuwenImg, audio: mudukkuwenAudio, bpm: '125 BPM', genre: 'Melodic Rap', mood: 'Vibes' },
    { id: 2, title: 'NIDAHASI', artist: 'Smokio', duration: '3:18', date: '15.12.25', img: songNidahasiImg, audio: nidahasiAudio, bpm: '92 BPM', genre: 'Underground', mood: 'Heavy' },
    { id: 3, title: 'KAMINI', artist: 'Smokio, Breezy, Tee Cee', duration: '3:24', date: '2.12.25', img: songKaminiImg, audio: kaminiAudio, bpm: '121 BPM', genre: 'Trap, Hip-Hop', mood: 'Hype' },
    { id: 4, title: 'KUDDAH (REPLY DISS)', artist: 'Smokio', duration: '2:36', date: '07.09.26', img: songKuddahImg, audio: smokioDissAudio, bpm: '90 BPM', genre: 'Sinhala Rap', mood: 'Fierce, Aggressive' },
    { id: 5, title: 'MOKADA WENNE', artist: 'Smokio', duration: '4:02', date: '26.11.25', img: songMokadaImg, audio: mokadaWenneAudio, bpm: '95 BPM', genre: 'Rap, Drill', mood: 'Dark' }
  ];

  const currentTrack = playlist[currentTrackIndex];

  // Futuristic 3D Vinyl refs
  const vinylRecordRef = useRef(null);
  const tonearmRef = useRef(null);

  useEffect(() => {
    if (tonearmRef.current) {
      if (isAudioPlaying) {
        gsap.to(tonearmRef.current, { rotation: 22, duration: 0.6, ease: 'power2.out' });
      } else {
        gsap.to(tonearmRef.current, { rotation: 0, duration: 0.6, ease: 'power2.out' });
      }
    }
  }, [isAudioPlaying]);

  // Preload initial track on mount
  useEffect(() => {
    if (audioRef.current && playlist[0]?.audio) {
      audioRef.current.src = playlist[0].audio;
      audioRef.current.load();
    }
  }, []);

  const handleAudioPlayPause = () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      if (!audioRef.current.src && playlist[currentTrackIndex]?.audio) {
        audioRef.current.src = playlist[currentTrackIndex].audio;
        audioRef.current.load();
      }
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsAudioPlaying(true))
          .catch((err) => console.warn('Audio play error:', err));
      }
    } else {
      audioRef.current.pause();
      setIsAudioPlaying(false);
    }
  };

  const handleSelectTrack = (index) => {
    setCurrentTrackIndex(index);

    if (vinylRecordRef.current) {
      gsap.fromTo(vinylRecordRef.current,
        { rotateY: 90, scale: 0.8 },
        { rotateY: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }
      );
    }

    if (audioRef.current && playlist[index]?.audio) {
      audioRef.current.src = playlist[index].audio;
      audioRef.current.load();
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsAudioPlaying(true);
          })
          .catch((err) => {
            console.warn('Audio play error:', err);
          });
      }
    }
  };

  const handleNextTrack = () => {
    const newIdx = (currentTrackIndex + 1) % playlist.length;
    handleSelectTrack(newIdx);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current && audioRef.current.duration) {
      const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setTrackProgress(progress);
    }
  };

  const titleText = "breaks limits";

  useEffect(() => {
    window.scrollTo(0, 0);
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    }
    ScrollTrigger.clearScrollMemory();

    const ctx = gsap.context(() => {
      // 0. Smooth Entrance on initial load for Hero Title
      gsap.fromTo('.shatter-letter',
        { opacity: 0, y: 30, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 1.0, stagger: 0.03, ease: 'power3.out', delay: 0.2 }
      );

      // 1. Hero Section Scroll Animation (Butter-smooth scrub with Lenis lerp)
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });

      // Step A: Silky smooth letter dispersal as you scroll down
      heroTl.to('.shatter-letter', {
        y: (i) => 180 + ((i % 4) * 45),
        x: (i) => (i - 6) * 16,
        rotationZ: (i) => (i % 2 === 0 ? 1 : -1) * (14 + (i * 2)),
        opacity: 0,
        scale: 0.8,
        stagger: {
          each: 0.02,
          from: "center"
        },
        duration: 0.8,
        ease: 'power2.out'
      }, 0);

      // Step B: Hero desc fade out
      heroTl.to(heroContentRef.current, {
        scale: 0.92,
        opacity: 0,
        y: -30,
        ease: 'power1.out',
        duration: 0.6
      }, 0);

      // Step C: Smooth Background Image Parallax
      heroTl.to('.hero-full-bg', {
        y: 60,
        scale: 1.1,
        ease: 'none',
        duration: 1
      }, 0);

      

      // 5. GSAP Entrance for Ultra Clean Audio Player
      if (playlistWidgetRef.current) {
        const audioTl = gsap.timeline({
          scrollTrigger: {
            trigger: playlistWidgetRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        });

        // Album Art Smooth Scale In
        audioTl.fromTo('.uc-album-wrapper',
          { scale: 0.9, opacity: 0, y: 30 },
          { scale: 1, opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
        );

        // Header Fade In
        audioTl.fromTo('.uc-header',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.8'
        );

        // Tracklist Items Stagger Fade In
        audioTl.fromTo('.uc-track-item',
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
          '-=0.6'
        );
        
        // Floating Player Slide Up
        audioTl.fromTo('.uc-floating-player',
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          '-=0.4'
        );
      }

      // 6. GSAP Parallax & Text Scale Reveal for "A Concert You'll Never Forget"
      if (forgetConcertRef.current) {
        const forgetTl = gsap.timeline({
          scrollTrigger: {
            trigger: forgetConcertRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });

        // Background Parallax Scale
        if (forgetBgRef.current) {
          forgetTl.fromTo(forgetBgRef.current,
            { scale: 1.25, y: -40 },
            { scale: 1.0, y: 40, ease: 'none' },
            0
          );
        }

        // Beautiful Smokio Phrase Reveal
        gsap.fromTo('.smokio-phrase-box',
          { y: 50, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: forgetConcertRef.current,
              start: 'top 60%',
              toggleActions: 'play none none reverse'
            }
          }
        );

        // Marquee Reveal on Scroll
        gsap.fromTo('.forget-marquee-container',
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: forgetConcertRef.current,
              start: 'top 45%', // Reveals slightly after the phrase when scrolling further
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // 7. GSAP Red Glitch Reveal + Scroll-Driven Solid Color Fill for Tours Section
      const tourSec = toursSectionRef.current;
      const tourGlitch = tourGlitchOverlayRef.current;
      const tourRows = tourRowsRef.current.filter(Boolean);

      if (tourSec && tourGlitch) {
        const tourGlitchTl = gsap.timeline({
          scrollTrigger: {
            trigger: tourSec,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        });

        // Phase 1: Rapid High-Frequency Red Glitch Slicing & Flash
        tourGlitchTl
          .to(tourGlitch, { opacity: 1, duration: 0.04 })
          .to('.tour-glitch-slice.red-slice', { x: -75, skewX: 35, duration: 0.04 })
          .to('.tour-glitch-slice.crimson-slice', { x: 85, skewX: -30, duration: 0.04 }, '<')
          .to('.tour-glitch-slice.neon-slice', { x: -55, skewX: 25, duration: 0.04 }, '<')
          .to(tourGlitch, { opacity: 0.25, duration: 0.03 })
          .to(tourGlitch, { opacity: 0.95, duration: 0.05 })
          .to('.tour-glitch-slice.red-slice', { x: 55, skewX: -25, duration: 0.04 })
          .to('.tour-glitch-slice.crimson-slice', { x: -65, skewX: 40, duration: 0.04 }, '<')
          .to('.tour-glitch-flash', { opacity: 0.85, duration: 0.04 }, '<')
          .to(tourGlitch, { opacity: 0, duration: 0.08 });

        // Phase 2: Red RGB Aberration Flash on Title
        tourGlitchTl.fromTo('.tours-title',
          { x: -35, skewX: 20, color: '#ff2a2a', textShadow: '6px 0 0 #ff0055, -6px 0 0 #ff6b6b' },
          { x: 0, skewX: 0, color: '#ffffff', textShadow: 'none', duration: 0.35, ease: 'power2.out' },
          0.1
        );

        // Phase 3: Sudden Glitch Entrance Reveal of Tour Rows
        if (tourRows.length > 0) {
          tourGlitchTl.fromTo(tourRows,
            { x: -60, opacity: 0, skewX: 10, scale: 0.95 },
            { x: 0, opacity: 1, skewX: 0, scale: 1, stagger: 0.07, duration: 0.5, ease: 'back.out(1.7)' },
            0.15
          );
        }
      }

      if (tourRows.length > 0) {
        tourRows.forEach((row) => {
          const bgFill = row.querySelector('.tour-row-bg-fill');
          const rowTexts = row.querySelectorAll('.tour-text-item');

          if (bgFill) {
            gsap.timeline({
              scrollTrigger: {
                trigger: row,
                start: 'top 80%',
                end: 'top 40%',
                scrub: true
              }
            })
            .to(bgFill, {
              scaleX: 1,
              ease: 'none'
            }, 0)
            .to(rowTexts, {
              color: '#000000',
              ease: 'none'
            }, 0);
          }
        });
      }

      // 8. GSAP Pinned Zoom-Out Center Image Grid Reveal for Captured On Tour
      if (gallerySectionRef.current) {
        let mm = gsap.matchMedia();

        mm.add("(min-width: 1025px)", () => {
          const galleryTl = gsap.timeline({
            scrollTrigger: {
              trigger: gallerySectionRef.current,
              start: 'top top',
              end: '+=400%',
              pin: true,
              pinSpacing: true,
              scrub: true,
              anticipatePin: 1,
              invalidateOnRefresh: true
            }
          });

          // Add a delay to keep it full screen initially
          galleryTl.to({}, { duration: 0.8 }); // Stays full screen for first 0.8s of scroll

          // Step A: Center video card zooms out from screen-fit size (~3x) down to grid cell size (1)
          galleryTl.fromTo('.center-gallery-card',
            { 
              scale: () => {
                const card = document.querySelector('.center-gallery-card');
                const w = card && card.offsetWidth > 50 ? card.offsetWidth : (window.innerWidth / 3);
                const h = card && card.offsetHeight > 50 ? card.offsetHeight : (w * 9 / 16);
                const scaleW = window.innerWidth / (w || 1);
                const scaleH = window.innerHeight / (h || 1);
                return Math.max(scaleW, scaleH) * 1.01;
              },
              y: () => {
                const card = document.querySelector('.center-gallery-card');
                const sec = gallerySectionRef.current;
                if (!card || !sec) return 0;
                const cRect = card.getBoundingClientRect();
                const sRect = sec.getBoundingClientRect();
                const cardCenterY = (cRect.top - sRect.top) + (cRect.height / 2);
                return (window.innerHeight / 2) - cardCenterY;
              },
              borderRadius: '0px',
              zIndex: 30 
            },
            { 
              scale: 1, 
              y: 0,
              borderRadius: '16px',
              zIndex: 1, 
              ease: 'power1.inOut', 
              duration: 1.5 
            }
          );

          // Step B: Surrounding 8 images reveal & scale into grid positions
          galleryTl.fromTo('.side-gallery-card',
            { scale: 0.4, opacity: 0 },
            { scale: 1, opacity: 1, stagger: 0.05, ease: 'power1.out', duration: 1 },
            "-=0.8" // Start revealing side images as center shrinks
          );

          // Step C: Gallery Section Header fades in
          galleryTl.fromTo('.gallery-header',
            { opacity: 0, y: -30 },
            { opacity: 1, y: 0, ease: 'power1.out', duration: 0.5 },
            "-=1"
          );
        });

        mm.add("(max-width: 1024px)", () => {
          // Animate header
          gsap.fromTo('.gallery-header',
            { opacity: 0, y: -20 },
            { 
              opacity: 1, 
              y: 0, 
              ease: 'power1.out',
              duration: 0.8,
              scrollTrigger: {
                trigger: gallerySectionRef.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
              }
            }
          );

          // Animate each card individually as it scrolls into view
          gsap.utils.toArray('.gallery-item-card').forEach((card) => {
            gsap.fromTo(card,
              { opacity: 0, scale: 0.9, y: 30 },
              {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.6,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: card,
                  start: 'top 85%',
                  toggleActions: 'play none none reverse'
                }
              }
            );
          });
        });
      }

      // Refresh all ScrollTriggers once all components and pinned spacers are mounted
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    });

    const timers = [
      setTimeout(() => {
        ScrollTrigger.clearScrollMemory();
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      }, 250),
      setTimeout(() => {
        ScrollTrigger.clearScrollMemory();
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      }, 800)
    ];

    return () => {
      timers.forEach(t => clearTimeout(t));
      ctx.revert();
    };
  }, []);

  // Scroll-based Autoplay Attempt
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (audioRef.current && audioRef.current.paused) {
            audioRef.current.volume = 1;
            audioRef.current.muted = false;
            
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
              playPromise.then(() => {
                setIsAudioPlaying(true); // Only update UI if it successfully plays
              }).catch(e => {
                console.log("Browser blocked autoplay on scroll:", e);
              });
            }
          }
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the section is visible
    );

    if (playlistWidgetRef.current) {
      observer.observe(playlistWidgetRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Only decode & play gallery video when visible in viewport (saves laptop GPU/fans)
  useEffect(() => {
    if (!gallerySectionRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries[0].isIntersecting;
        if (galleryVideoRef.current) {
          if (isVisible) {
            galleryVideoRef.current.play().catch(() => {});
          } else {
            galleryVideoRef.current.pause();
          }
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(gallerySectionRef.current);
    return () => observer.disconnect();
  }, []);

  const tours = [
    { title: 'Colombo Rebellion Live', date: '15.05.2027', time: '20:00', location: 'Sugathadasa Indoor Stadium, Colombo, Sri Lanka', img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80' },
    { title: 'Midnight Haze Sessions', date: '28.06.2027', time: '21:30', location: 'Viharamahadevi Open Air Theatre, Colombo, Sri Lanka', img: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80' },
    { title: 'Raw Ambition Tour', date: '12.08.2027', time: '18:30', location: 'Kandy City Centre Amphitheatre, Kandy, Sri Lanka', img: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=600&q=80' },
    { title: 'Kamini // Dark Romance', date: '15.09.2027', time: '21:00', location: 'Galle Face Green Open Air, Colombo, Sri Lanka', img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80' },
    { title: 'Underground Drill Experience', date: '28.10.2027', time: '19:30', location: 'Nelum Pokuna Theatre, Colombo, Sri Lanka', img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80' },
    { title: 'Pure Smoke & Energy Finale', date: '12.12.2027', time: '20:30', location: 'CR & FC Grounds, Colombo, Sri Lanka', img: 'https://images.unsplash.com/photo-1539375665275-f9de415ef9ac?auto=format&fit=crop&w=600&q=80' }
  ];

  const galleryPhotos = [
    { id: 1, title: "Colombo Rebellion", img: img22 },
    { id: 2, title: "Midnight Haze // Smokio & Chrish VI", img: img24 },
    { id: 3, title: "Raw Ambition", img: img23 },
    { id: 4, title: "Kamini // Neon Nights", img: img25 },
    { id: 5, title: "Center Stage Spotlight", video: "https://res.cloudinary.com/dymkikwdc/video/upload/v1793458106/0907_vcyral.mp4" },
    { id: 6, title: "Underground Drill Icon", img: img56 },
    { id: 7, title: "Street Hustle Legacy", img: img57 },
    { id: 8, title: "Dark Romance // Kamini", img: img58 },
    { id: 9, title: "Pure Smoke & Energy", img: img59 }
  ];

  return (
    <div className="home-container">
      {/* Hero Pinned Container */}
      <section id="home" className="hero-pinned-container" ref={heroRef}>
        
        {/* Full Screen Background Image Layer */}
        <div className="hero-full-bg" style={{ backgroundImage: `url(${stageImg})` }}>
          <div className="hero-bg-overlay"></div>
        </div>

        {/* Hero Front Text Content (Shatter Heading) */}
        <div className="hero-front-content" ref={heroContentRef}>
          <p className="hero-mono-desc">
            Built on raw energy and unapologetic truth, we make music that<br />
            shakes you awake and reminds you how real sound should feel.
          </p>
          <h1 className="hero-giant-title shatter-title">
            {Array.from(titleText).map((char, index) => {
              const isLimits = index >= 7; // "breaks " is 7 chars (0-6), "limits" is 7-12
              return (
                <span 
                  key={index} 
                  className={`shatter-letter ${isLimits ? 'shatter-letter-green' : ''}`}
                  style={isLimits ? { color: '#c6ff00' } : undefined}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              );
            })}
          </h1>
        </div>

      </section>

      {/* Neon Lime Infinite Marquee Ribbon Under Hero */}
      <div className="neon-marquee-strip">
        <div className="neon-marquee-track">
          <div className="neon-marquee-content">
            <span className="neon-marquee-item"><span className="neon-star">✦</span> LIVE IN COLOMBO · KANDY · GALLE · JAFFNA · LONDON · MELBOURNE</span>
            <span className="neon-marquee-item"><span className="neon-star">✦</span> MUDUKKUWEN ELIYATA — OUT NOW</span>
            <span className="neon-marquee-item"><span className="neon-star">✦</span> WORLD TOUR 2027</span>
            <span className="neon-marquee-item"><span className="neon-star">✦</span> THE UNDISPUTED KING OF SINHALA RAP</span>
            <span className="neon-marquee-item"><span className="neon-star">✦</span> UNFILTERED SOUND · RAW ENERGY</span>
            <span className="neon-marquee-item"><span className="neon-star">✦</span> KAMINI // DARK ROMANCE</span>
            <span className="neon-marquee-item"><span className="neon-star">✦</span> 44 KALLIYA LEGACY</span>
            <span className="neon-marquee-item"><span className="neon-star">✦</span> BREAKING LIMITS EVERY NIGHT</span>
          </div>
          <div className="neon-marquee-content" aria-hidden="true">
            <span className="neon-marquee-item"><span className="neon-star">✦</span> LIVE IN COLOMBO · KANDY · GALLE · JAFFNA · LONDON · MELBOURNE</span>
            <span className="neon-marquee-item"><span className="neon-star">✦</span> MUDUKKUWEN ELIYATA — OUT NOW</span>
            <span className="neon-marquee-item"><span className="neon-star">✦</span> WORLD TOUR 2027</span>
            <span className="neon-marquee-item"><span className="neon-star">✦</span> THE UNDISPUTED KING OF SINHALA RAP</span>
            <span className="neon-marquee-item"><span className="neon-star">✦</span> UNFILTERED SOUND · RAW ENERGY</span>
            <span className="neon-marquee-item"><span className="neon-star">✦</span> KAMINI // DARK ROMANCE</span>
            <span className="neon-marquee-item"><span className="neon-star">✦</span> 44 KALLIYA LEGACY</span>
            <span className="neon-marquee-item"><span className="neon-star">✦</span> BREAKING LIMITS EVERY NIGHT</span>
          </div>
        </div>
      </div>

      {/* The Movement Section (Section 2) & Noctra About (Section 3) */}
      <div id="about" className="about-sections-anchor">
        <div id="movement">
          <MovementSection />
        </div>
        <NoctraAboutSection />
      </div>

      {/* Global Audio Element */}
      <audio 
        ref={audioRef}
        preload="auto"
        onEnded={handleNextTrack} 
        onTimeUpdate={handleTimeUpdate}
        onPlay={() => setIsAudioPlaying(true)}
        onPause={() => setIsAudioPlaying(false)}
      />

      {/* Discography Player Section (Section 4 - Turn Up the Feeling) */}
      <div id="music">
        <div id="playlist" ref={playlistWidgetRef}>
        <DiscographyPlayer 
          playlist={playlist}
          currentTrack={currentTrack}
          currentTrackIndex={currentTrackIndex}
          isPlaying={isAudioPlaying}
          trackProgress={trackProgress}
          onPlayPause={handleAudioPlayPause}
          onSelectTrack={handleSelectTrack}
        />
      </div>
      </div>

      {/* Musician Statement Editorial Section with Inline Images & Yellow Cross Ribbons */}
      <MusicianStatementSection />

      {/* "A Concert You'll Never Forget" Hero Banner Section */}
      <section className="forget-concert-section" ref={forgetConcertRef}>
        <div className="forget-bg-container" ref={forgetBgRef}>
          <img
            src={manPerformingImg}
            alt="Concert Tunnel Silhouette"
            className="forget-bg-img"
          />
          <div className="forget-overlay"></div>
        </div>

        <div className="smokio-phrase-container">
          <div className="smokio-phrase-box">
            <h3 className="smokio-beautiful-phrase">
              <span className="phrase-quote-mark">“</span>
              THE <span className="phrase-neon">UNDISPUTED KING</span> OF SINHALA RAP, BREAKING <span className="phrase-neon">LIMITS</span> <span className="phrase-neon">EVERY SINGLE NIGHT</span>.
              <span className="phrase-quote-mark">”</span>
            </h3>
          </div>
        </div>

        <div className="forget-marquee-container">
          <div className="forget-marquee-content">
            <span>
              A Concert You'll Never Forget <span style={{ color: '#c6ff00' }}> SMOKIO </span> 
              Feel The Energy <span style={{ color: '#c6ff00' }}> LIVE </span> 
              The Undisputed King of Sinhala Rap <span style={{ color: '#c6ff00' }}> SMOKIO </span> 
              Unstoppable Vibes <span style={{ color: '#c6ff00' }}> LIVE </span> 
              <span style={{ color: "#c6ff00" }}>Breaking Limits</span> <span style={{ color: "#c6ff00" }}> SMOKIO </span> 
              Pure Smoke & Energy <span style={{ color: '#c6ff00' }}> LIVE </span>
            </span>
            <span>
              A Concert You'll Never Forget <span style={{ color: '#c6ff00' }}> SMOKIO </span> 
              Feel The Energy <span style={{ color: '#c6ff00' }}> LIVE </span> 
              The Undisputed King of Sinhala Rap <span style={{ color: '#c6ff00' }}> SMOKIO </span> 
              Unstoppable Vibes <span style={{ color: '#c6ff00' }}> LIVE </span> 
              <span style={{ color: "#c6ff00" }}>Breaking Limits</span> <span style={{ color: "#c6ff00" }}> SMOKIO </span> 
              Pure Smoke & Energy <span style={{ color: '#c6ff00' }}> LIVE </span>
            </span>
          </div>
        </div>
      </section>

      {/* Tours Section with Red Cyberpunk Glitch Reveal Animation */}
      <section id="tours" className="tours-section" ref={toursSectionRef}>
        {/* Red Glitch Overlay Effect Elements */}
        <div className="tour-glitch-overlay" ref={tourGlitchOverlayRef}>
          <div className="tour-glitch-slice red-slice"></div>
          <div className="tour-glitch-slice crimson-slice"></div>
          <div className="tour-glitch-slice neon-slice"></div>
          <div className="tour-glitch-flash"></div>
          <div className="tour-glitch-text">RED ALERT // UPCOMING TOURS</div>
        </div>

        <div className="section-header">
          <div>
            <h2 className="tours-title">Get ready for our upcoming tours</h2>
            <span className="section-subtitle red">Upcoming Tour Nights</span>
            <p className="section-desc">Our next tour spans 15 cities with over 25 live performances planned. Get ready for an unforgettable experience.</p>
          </div>
        </div>

        <div className="tours-list">
          {tours.map((tour, idx) => (
            <div
              key={idx}
              className="tour-row"
              ref={(el) => (tourRowsRef.current[idx] = el)}
            >
              {/* GSAP Solid Color Fill Layer */}
              <div className="tour-row-bg-fill"></div>

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
                  <a href="#tickets" className="tour-btn" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>Get Ticket ↗</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9-Image Concert & Band Photo Gallery Grid */}
      <section id="gallery" className="concert-gallery-section" ref={gallerySectionRef}>
        <span id="videos" style={{ position: 'absolute', top: 0, left: 0, opacity: 0, pointerEvents: 'none' }}></span>
        <div className="gallery-header">
          <span className="section-subtitle">Live Moments & Backstage</span>
          <h2 className="gallery-title">Captured On Tour</h2>
        </div>
        
        <div className="gallery-grid">
          {galleryPhotos.map((photo, idx) => (
            <div
              key={photo.id}
              className={`gallery-item-card ${idx === 4 ? 'center-gallery-card' : 'side-gallery-card'}`}
            >
              {photo.video ? (
                <video ref={galleryVideoRef} src={photo.video} loop muted playsInline preload="none" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <img src={photo.img} alt={photo.title} />
              )}
              <div className="gallery-card-overlay">
                <span className="gallery-card-caption">{photo.title}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tickets, Booking & Passes Section */}
      <div id="tickets">
        <div id="booking">
          <Contact />
        </div>
      </div>
    </div>
  );
};

export default Home;

