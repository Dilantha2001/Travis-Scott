import React, { useEffect, useRef, useState } from 'react';
import { FaArrowRight, FaSpotify, FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaStepBackward, FaStepForward, FaMusic, FaListUl, FaExpand, FaChevronLeft, FaChevronRight, FaRegHeart } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CubeSlider from '../components/CubeSlider';
import MusicList from '../components/MusicList';
import DiscographyPlayer from '../components/DiscographyPlayer';
import img45 from '../assets/images (45).jpg';
import img46 from '../assets/images (46).jpg';
import img47 from '../assets/images (47).jpg';
import img48 from '../assets/images (48).jpg';
import stageImg from '../assets/stage.jpeg';

import smokioDissAudio from '../assets/kuddah-reply-diss-smokio.mp3';
import kaminiAudio from '../assets/kamini-smokio-breezy-tee-cee.mp3';
import mokadaWenneAudio from '../assets/mokada-wenne-reply-diss-to-sosa-smokio.mp3';
import mudukkuwenAudio from '../assets/sinhanada.net-Mudukkuwen-Eliyata-Smokio-Ft-Iraj.mp3';
import nidahasiAudio from '../assets/nidahasi-smokio.mp3';
import manPerformingImg from '../assets/Man_performing_on_stage_202609082107.jpeg';
import neonGirlImg from '../assets/images/neon-girl.jpg';
import img22 from '../assets/img22.jpeg';
import img23 from '../assets/img23.jpeg';
import img24 from '../assets/img24.jpeg';
import img25 from '../assets/img25.jpeg';
import img56 from '../assets/images_(56).jpg_20260911201544.jpeg';
import img57 from '../assets/images_(57).jpg_20260911201318.jpeg';
import img58 from '../assets/images_(58).jpg_20260911200933.jpeg';
import img59 from '../assets/images_(59).jpg_20260911200937.jpeg';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const heroRef = useRef(null);
  const heroContentRef = useRef(null);


  const songsSectionRef = useRef(null);
  const glitchOverlayRef = useRef(null);

  // Forget Concert Section refs
  const forgetConcertRef = useRef(null);
  const forgetBgRef = useRef(null);

  // Tours Section refs
  const toursSectionRef = useRef(null);
  const tourGlitchOverlayRef = useRef(null);
  const tourRowsRef = useRef([]);

  // Concert Gallery Section ref
  const gallerySectionRef = useRef(null);

  // Video showcase state & ref
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Audio Playlist Player state & refs
  const playlistWidgetRef = useRef(null);
  const audioRef = useRef(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);
  const [showPlaylistDrawer, setShowPlaylistDrawer] = useState(true);

  const playlist = [
    { id: 1, title: 'MUDUKKUWEN ELIYATA', artist: 'Smokio, 44 Kalliya', duration: '3:45', date: '11.12.25', img: img48, audio: mudukkuwenAudio, bpm: '125 BPM', genre: 'Melodic Rap', mood: 'Vibes' },
    { id: 2, title: 'NIDAHASI', artist: 'Smokio', duration: '3:18', date: '15.12.25', img: img45, audio: nidahasiAudio, bpm: '92 BPM', genre: 'Underground', mood: 'Heavy' },
    { id: 3, title: 'KAMINI', artist: 'Smokio, Breezy, Tee Cee', duration: '3:24', date: '2.12.25', img: img46, audio: kaminiAudio, bpm: '121 BPM', genre: 'Trap, Hip-Hop', mood: 'Hype' },
    { id: 4, title: 'KUDDAH (REPLY DISS)', artist: 'Smokio', duration: '2:36', date: '07.09.26', img: img45, audio: smokioDissAudio, bpm: '90 BPM', genre: 'Sinhala Rap', mood: 'Fierce, Aggressive' },
    { id: 5, title: 'MOKADA WENNE', artist: 'Smokio', duration: '4:02', date: '26.11.25', img: img47, audio: mokadaWenneAudio, bpm: '95 BPM', genre: 'Rap, Drill', mood: 'Dark' }
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

  const handleAudioPlayPause = () => {
    if (audioRef.current) {
      if (isAudioPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsAudioPlaying(!isAudioPlaying);
    }
  };

  const handleSelectTrack = (index) => {
    setCurrentTrackIndex(index);
    setIsAudioPlaying(true);

    if (vinylRecordRef.current) {
      gsap.fromTo(vinylRecordRef.current,
        { rotateY: 90, scale: 0.8 },
        { rotateY: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }
      );
    }

    if (audioRef.current) {
      audioRef.current.src = playlist[index].audio;
      audioRef.current.play();
    }
  };

  const handlePrevTrack = () => {
    const newIdx = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    handleSelectTrack(newIdx);
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

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullScreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) {
        videoRef.current.msRequestFullscreen();
      }
    }
  };

  const titleText = "breaks limits";

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Pinned Section Timeline (Curtain Expand + Shatter + Horizontal Stream Text)
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 1.5,
          anticipatePin: 1
        }
      });


      // Step A: Letter Crumble and Fall (kadila watenwa)
      heroTl.to('.shatter-letter', {
        y: () => (Math.random() * 400) + 400, // Drops down heavily
        x: () => (Math.random() - 0.5) * 300, // Tumbles sideways slightly
        rotationZ: () => (Math.random() - 0.5) * 360, // Spins as it falls
        rotationX: () => (Math.random() - 0.5) * 180,
        opacity: 0,
        scale: () => Math.random() * 0.8 + 0.2, // Pieces shrink as they fall away
        stagger: {
          each: 0.08, // Happens piece by piece!
          from: "center" // Breaks from the middle outwards
        },
        duration: 1.5,
        ease: 'power2.in' // Gravity-like acceleration
      }, 0.2);

      // Step B: Hero desc fade out
      heroTl.to(heroContentRef.current, {
        scale: 0.85,
        opacity: 0,
        ease: 'power1.in'
      }, 0.4);

      // Step C: Smooth Background Image Zoom
      heroTl.to('.hero-full-bg', {
        scale: 1.15,
        ease: 'none'
      }, 0);

      // All black curtain and cube logic removed here.

      // 3. Pinned Video Showcase Transition (Split Screen Expand) & Text Highlight
      const videoTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.video-showcase-section',
          start: 'top top',
          end: '+=250%',
          pin: true,
          scrub: 1,
          anticipatePin: 1
        }
      });

      // Expand the video frame using clip-path for a true center split reveal
      videoTl.fromTo('.video-container-frame',
        { clipPath: 'inset(0 50% 0 50%)' },
        { clipPath: 'inset(0 0% 0 0%)', ease: 'power2.inOut', duration: 1.5 }
      );

      // Fade in the video overlay controls / HUD
      videoTl.fromTo('.video-overlay-controls',
        { opacity: 0 },
        { opacity: 1, ease: 'power1.out', duration: 0.5 },
        '-=0.5'
      );

      // Scroll-Driven Word-by-Word Text Highlight (Light Gray -> Pure White)
      const quoteWords = gsap.utils.toArray('.scroll-quote-word');
      if (quoteWords.length > 0) {
        videoTl.to(quoteWords, {
          color: '#ffffff',
          opacity: 1,
          stagger: 0.04,
          ease: 'none',
          duration: 2
        });
      }

      // 4. Digital Glitch & Color Shift Transition into Songs Section
      const songsSec = songsSectionRef.current;
      const glitchOverlay = glitchOverlayRef.current;

      if (songsSec && glitchOverlay) {
        const glitchTl = gsap.timeline({
          scrollTrigger: {
            trigger: songsSec,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
            onEnter: () => {
              if (audioRef.current) {
                audioRef.current.play().then(() => {
                  setIsAudioPlaying(true);
                }).catch(err => console.log('Autoplay handled:', err));
              }
            }
          }
        });

        // Step 1: Rapid RGB Glitch Flicker
        glitchTl
          .to(glitchOverlay, { opacity: 1, duration: 0.05 })
          .to('.glitch-slice.red', { x: -45, skewX: 25, duration: 0.05 })
          .to('.glitch-slice.blue', { x: 55, skewX: -20, duration: 0.05 }, '<')
          .to('.glitch-slice.cyan', { x: -35, skewX: 15, duration: 0.05 }, '<')
          .to(glitchOverlay, { opacity: 0.15, duration: 0.04 })
          .to(glitchOverlay, { opacity: 0.95, duration: 0.06 })
          .to('.glitch-slice.red', { x: 35, skewX: -15, duration: 0.05 })
          .to('.glitch-slice.blue', { x: -40, skewX: 30, duration: 0.05 }, '<')
          .to(glitchOverlay, { opacity: 0, duration: 0.1 });

        // Step 2: Shift Background Color from #000000 to Deep Cyber Dark Blue (#070d1a)
        glitchTl.to(songsSec, {
          backgroundColor: '#070d1a',
          duration: 0.8,
          ease: 'power2.out'
        }, 0.1);

        // Step 3: Reveal Song Cards with smooth slide up
        glitchTl.from('.song-card', {
          y: 50,
          opacity: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power3.out'
        }, 0.25);
      }

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
            scrub: 1
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
        gsap.fromTo('.smokio-beautiful-phrase',
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
                scrub: 0.6
              }
            })
            .to(bgFill, {
              scaleX: 1,
              ease: 'power2.inOut'
            }, 0)
            .to(rowTexts, {
              color: '#000000',
              ease: 'power1.out'
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
              scrub: 1,
              anticipatePin: 1
            }
          });

          // Add a delay to keep it full screen initially
          galleryTl.to({}, { duration: 0.8 }); // Stays full screen for first 0.8s of scroll

          // Step A: Center image zooms out from full screen (scale 6) to grid cell size (scale 1)
          galleryTl.fromTo('.center-gallery-card',
            { scale: 6, zIndex: 30 },
            { scale: 1, zIndex: 1, ease: 'power1.inOut', duration: 1.5 }
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

      // (Removed GSAP ScrollTrigger for autoplay to use IntersectionObserver instead)
    });

    return () => ctx.revert();
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
  }, [playlist]);

  const songs = [
    {
      title: 'GOLDEN FEVER',
      date: '2.12.25',
      img: img45,
      size: 'tall'
    },
    {
      title: 'ELECTRIC HEARTLINE',
      date: '26.11.25',
      img: img46,
      size: 'square'
    },
    {
      title: 'FALLING INTO BLUE',
      date: '11.12.25',
      img: img47,
      size: 'wide'
    },
    {
      title: 'NEON GRAVITY',
      date: '15.12.25',
      img: img48,
      size: 'wide'
    },
    {
      title: 'ECHOING HEARTS',
      date: '24.12.25',
      img: img45,
      size: 'wide'
    },
    {
      title: 'TWILIGHT SPARKS',
      date: '30.12.25',
      img: img46,
      size: 'tall'
    }
  ];

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
    { id: 5, title: "Center Stage Spotlight", video: "https://res.cloudinary.com/dymkikwdc/video/upload/v1789664727/0908_uyp1mt.mp4" },
    { id: 6, title: "Underground Drill Icon", img: img56 },
    { id: 7, title: "Street Hustle Legacy", img: img57 },
    { id: 8, title: "Dark Romance // Kamini", img: img58 },
    { id: 9, title: "Pure Smoke & Energy", img: img59 }
  ];

  return (
    <div className="home-container">
      {/* Hero Pinned Container */}
      <section className="hero-pinned-container" ref={heroRef}>
        
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
            {Array.from(titleText).map((char, index) => (
              <span key={index} className="shatter-letter">
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>
        </div>

      </section>

      {/* About Producer Section */}
      <CubeSlider />

      {/* Featured Live Singing Video Showcase Section */}
      <section className="video-showcase-section">
        <div className="video-container-frame">
          <video
            ref={videoRef}
            className="singing-video-player"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            preload="metadata"
            poster={img45}
          >
            <source src="https://res.cloudinary.com/dymkikwdc/video/upload/v1789664713/0907_d9i2do.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Overlay Controls & Info HUD */}
          <div className="video-overlay-controls">
            <div className="video-bottom-container">
              {/* Scroll-Driven Word-by-Word Light Gray to Pure White Continuous Paragraph */}
              <div className="video-scroll-quote-box">
                <p className="scroll-quote-paragraph">
                  {"Music is not just something we create — it's the raw emotion that connects us across every stage. From quiet lyrics written in the dark to the thunderous roar of a live stadium crowd, we break limits. This is our legacy: unfiltered sound, high-voltage energy, and a connection that will never fade.".split(' ').map((word, i) => (
                    <span key={i} className="scroll-quote-word">{word}{' '}</span>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Audio Element */}
      <audio 
        ref={audioRef}
        src={currentTrack?.audio}
        preload="auto"
        onEnded={handleNextTrack} 
        onTimeUpdate={handleTimeUpdate}
      />

      {/* Discography Player Section */}
      <div id="playlist" ref={playlistWidgetRef}>
        <DiscographyPlayer 
          currentTrack={currentTrack}
          isPlaying={isAudioPlaying}
          onPlayPause={handleAudioPlayPause}
          onPrev={handlePrevTrack}
          onNext={handleNextTrack}
        />

        {/* Music List Section */}
        <MusicList 
          playlist={playlist}
          currentTrackIndex={currentTrackIndex}
          onSelectTrack={handleSelectTrack}
        />
      </div>

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
          <h3 className="smokio-beautiful-phrase">"The Undisputed King of Sinhala Rap, Breaking Limits Every Single Night." - Smokio</h3>
        </div>

        <div className="forget-marquee-container">
          <div className="forget-marquee-content">
            <span>
              A Concert You'll Never Forget <span style={{ color: '#3b82f6' }}> SMOKIO </span> 
              Feel The Energy <span style={{ color: '#3b82f6' }}> LIVE </span> 
              The Undisputed King of Sinhala Rap <span style={{ color: '#3b82f6' }}> SMOKIO </span> 
              Unstoppable Vibes <span style={{ color: '#3b82f6' }}> LIVE </span> 
              Breaking Limits <span style={{ color: '#3b82f6' }}> SMOKIO </span> 
              Pure Smoke & Energy <span style={{ color: '#3b82f6' }}> LIVE </span>
            </span>
            <span>
              A Concert You'll Never Forget <span style={{ color: '#3b82f6' }}> SMOKIO </span> 
              Feel The Energy <span style={{ color: '#3b82f6' }}> LIVE </span> 
              The Undisputed King of Sinhala Rap <span style={{ color: '#3b82f6' }}> SMOKIO </span> 
              Unstoppable Vibes <span style={{ color: '#3b82f6' }}> LIVE </span> 
              Breaking Limits <span style={{ color: '#3b82f6' }}> SMOKIO </span> 
              Pure Smoke & Energy <span style={{ color: '#3b82f6' }}> LIVE </span>
            </span>
          </div>
        </div>
      </section>

      {/* Tours Section with Red Cyberpunk Glitch Reveal Animation */}
      <section className="tours-section" ref={toursSectionRef}>
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
            <p className="section-desc">Our next tour spans 12 cities with over 25 live performances planned. Get ready for an unforgettable experience.</p>
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
                  <button className="tour-btn">Get Ticket ↗</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9-Image Concert & Band Photo Gallery Grid */}
      <section id="gallery" className="concert-gallery-section" ref={gallerySectionRef}>
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
                <video src={photo.video} autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }} />
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
    </div>
  );
};

export default Home;
