import React, { useEffect, useRef, useState } from 'react';
import { FaArrowRight, FaSpotify, FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaStepBackward, FaStepForward, FaMusic, FaListUl, FaExpand, FaChevronLeft, FaChevronRight, FaRegHeart } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CubeSlider from '../components/CubeSlider';
import img45 from '../assets/images (45).jpg';
import img46 from '../assets/images (46).jpg';
import img47 from '../assets/images (47).jpg';
import img48 from '../assets/images (48).jpg';
import stageImg from '../assets/stage.jpeg';
import concertVideo from '../assets/0907.mp4';
import centerStageVideo from '../assets/0908.mp4';
import smokioDissAudio from '../assets/kuddah-reply-diss-smokio.mp3';
import manPerformingImg from '../assets/Man_performing_on_stage_202609082107.jpeg';
import neonGirlImg from '../assets/images/neon-girl.jpg';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const heroRef = useRef(null);
  const blackCurtainRef = useRef(null);
  const heroContentRef = useRef(null);
  const revealContentRef = useRef(null);
  
  const cubeContainerRef = useRef(null);
  const textCardsRef = useRef([]);

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
    { id: 1, title: 'KUDDAH (REPLY DISS)', duration: '2:36', date: '07.09.26', img: img45, audio: smokioDissAudio },
    { id: 2, title: 'GOLDEN FEVER', duration: '3:24', date: '2.12.25', img: img46, audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    { id: 3, title: 'ELECTRIC HEARTLINE', duration: '4:02', date: '26.11.25', img: img47, audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
    { id: 4, title: 'FALLING INTO BLUE', duration: '3:45', date: '11.12.25', img: img48, audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
    { id: 5, title: 'NEON GRAVITY', duration: '3:18', date: '15.12.25', img: img45, audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' }
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
          end: '+=800%',
          pin: true,
          scrub: 1.5,
          anticipatePin: 1
        }
      });

      // Step A0: Hide navbar
      heroTl.to('.playza-header', {
        yPercent: -100,
        opacity: 0,
        ease: 'power2.inOut',
        duration: 0.4
      }, 0);

      // Step A: Letter Shatter (Premium Sequential Drop)
      heroTl.to('.shatter-letter', {
        y: 400, // Drops down cleanly
        rotation: () => (Math.random() - 0.5) * 60, // Slight realistic tilt
        opacity: 0,
        scale: 0.8, // Slightly scales down
        stagger: {
          each: 0.05,
          from: "start" // Sequential left-to-right character by character
        },
        duration: 0.8,
        ease: 'power3.in' // Smooth gravity acceleration
      }, 0.4);

      // Step B: Hero desc fade out
      heroTl.to(heroContentRef.current, {
        scale: 0.85,
        opacity: 0,
        ease: 'power1.in'
      }, 0.4);

      // Step C: Black Screen expands horizontally to 100%
      heroTl.fromTo(blackCurtainRef.current,
        { width: '0%' },
        { width: '100%', ease: 'power2.inOut' },
        1.2
      );

      // Step D: Reveal 3D Cube container inside black curtain
      heroTl.fromTo(revealContentRef.current,
        { scale: 0.7, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'power2.out' },
        1.3
      );

      // ========================================================================
      // 2. Full Horizontal Stream: Right Edge (+100vw) -> Over Cube (0vw) -> Disappear Left Edge (-100vw)
      // ========================================================================
      const cards = textCardsRef.current.filter(Boolean);

      // Initially position all cards at the far right edge (+100vw)
      cards.forEach((card) => {
        gsap.set(card, { x: '100vw', opacity: 0 });
      });

      // --- Card 1: Silver Heat ---
      heroTl.fromTo(cards[0],
        { x: '100vw', opacity: 0 },
        { x: '0vw', opacity: 1, duration: 0.6, ease: 'power2.out' }, // Enters and stops on Right
        1.4
      );
      heroTl.to(cards[0],
        { x: '-56vw', duration: 0.6, ease: 'power2.inOut' }, // Moves to Left and stops
        3.0
      );
      heroTl.to(cards[0],
        { x: '-100vw', opacity: 0, duration: 0.6, ease: 'power2.in' }, // Exits left
        4.6
      );

      // --- Rotate Cube to Face 2 (Top Face) ---
      heroTl.to(cubeContainerRef.current, {
        rotateX: -90,
        rotateY: 0,
        duration: 1.2,
        ease: 'expo.inOut'
      }, 4.6);

      // --- Card 2: Wild Spark ---
      heroTl.fromTo(cards[1],
        { x: '100vw', opacity: 0 },
        { x: '0vw', opacity: 1, duration: 0.6, ease: 'power2.out' },
        5.4
      );
      heroTl.to(cards[1],
        { x: '-56vw', duration: 0.6, ease: 'power2.inOut' },
        7.0
      );
      heroTl.to(cards[1],
        { x: '-100vw', opacity: 0, duration: 0.6, ease: 'power2.in' },
        8.6
      );

      // --- Rotate Cube to Face 3 (Right Face) ---
      heroTl.to(cubeContainerRef.current, {
        rotateX: 0,
        rotateY: -90,
        duration: 1.2,
        ease: 'expo.inOut'
      }, 8.6);

      // --- Card 3: Static Burn ---
      heroTl.fromTo(cards[2],
        { x: '100vw', opacity: 0 },
        { x: '0vw', opacity: 1, duration: 0.6, ease: 'power2.out' },
        9.4
      );
      heroTl.to(cards[2],
        { x: '-56vw', duration: 0.6, ease: 'power2.inOut' },
        11.0
      );
      heroTl.to(cards[2],
        { x: '-100vw', opacity: 0, duration: 0.6, ease: 'power2.in' },
        12.6
      );

      // --- Rotate Cube to Face 4 (Bottom Face) ---
      heroTl.to(cubeContainerRef.current, {
        rotateX: 90,
        rotateY: 0,
        duration: 1.2,
        ease: 'expo.inOut'
      }, 12.6);

      // --- Card 4: Feral Glow ---
      heroTl.fromTo(cards[3],
        { x: '100vw', opacity: 0 },
        { x: '0vw', opacity: 1, duration: 0.6, ease: 'power2.out' },
        13.4
      );
      heroTl.to(cards[3],
        { x: '-56vw', duration: 0.6, ease: 'power2.inOut' },
        15.0
      );
      heroTl.to(cards[3],
        { x: '-100vw', opacity: 0, duration: 0.6, ease: 'power2.in' },
        16.6
      );

      // --- Final step: Fade/Scale out reveal content before section unpins ---
      heroTl.to(revealContentRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.5,
        ease: 'power2.in'
      }, 17.2);

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

        // Step A: Center image zooms out from full screen (scale 3.5) to grid cell size (scale 1)
        galleryTl.fromTo('.center-gallery-card',
          { scale: 3.5, zIndex: 30 },
          { scale: 1, zIndex: 1, ease: 'power1.inOut' },
          0
        );

        // Step B: Surrounding 8 images reveal & scale into grid positions
        galleryTl.fromTo('.side-gallery-card',
          { scale: 0.4, opacity: 0 },
          { scale: 1, opacity: 1, stagger: 0.04, ease: 'power1.out' },
          0.15
        );

        // Step C: Gallery Section Header fades in
        galleryTl.fromTo('.gallery-header',
          { opacity: 0, y: -30 },
          { opacity: 1, y: 0, ease: 'power1.out' },
          0.3
        );
      }
    });

    return () => ctx.revert();
  }, []);

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
    { title: 'Electric Vibes', date: '19.12.2025', time: '20:00', location: '123 Broadway St, New York, NY 10007, USA', img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80' },
    { title: 'Night Beats', date: '29.12.2025', time: '21:30', location: '456 Sunset Blvd, Los Angeles, CA 90028, USA', img: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80' },
    { title: 'Golden Notes', date: '5.1.2026', time: '18:30', location: '321 Bourbon St, New Orleans, LA 70130, USA', img: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=600&q=80' },
    { title: 'Cyber Utopia Live', date: '15.1.2026', time: '21:00', location: '700 Clark Ave, St. Louis, MO 63102, USA', img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80' },
    { title: 'Astroworld Redefine', date: '28.1.2026', time: '19:30', location: '1501 NW 3rd Ave, Miami, FL 33136, USA', img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80' },
    { title: 'Neon Overdrive', date: '12.2.2026', time: '20:30', location: '100 1st Ave N, Minneapolis, MN 55401, USA', img: 'https://images.unsplash.com/photo-1539375665275-f9de415ef9ac?auto=format&fit=crop&w=600&q=80' }
  ];

  const galleryPhotos = [
    { id: 1, title: "Live Vocals & Stage Lights", img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80" },
    { id: 2, title: "Atmospheric Laser Beams", img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80" },
    { id: 3, title: "Lead Guitarist Riffing", img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80" },
    { id: 4, title: "Bass Player Groove", img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80" },
    { id: 5, title: "Center Stage Spotlight", video: centerStageVideo },
    { id: 6, title: "Drum Kit Cymbal Flare", img: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=800&q=80" },
    { id: 7, title: "Vintage Stage Mic", img: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?auto=format&fit=crop&w=800&q=80" },
    { id: 8, title: "Full Band Arena Show", img: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80" },
    { id: 9, title: "Vocalist Passionate Moment", img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80" }
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

        {/* EXPANDING BLACK CURTAIN (Contains the 3D Interactive Cube + Horizontal Stream Gliding Text) */}
        <div className="black-expanding-curtain" ref={blackCurtainRef}>
          <div className="reveal-content-inner" ref={revealContentRef}>
            <CubeSlider
              cubeContainerRef={cubeContainerRef}
              textCardsRef={textCardsRef}
            />
          </div>
        </div>

      </section>

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
            <source src={concertVideo} type="video/mp4" />
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
            <span>A Concert You'll Never Forget • A Concert You'll Never Forget • A Concert You'll Never Forget • A Concert You'll Never Forget • </span>
            <span>A Concert You'll Never Forget • A Concert You'll Never Forget • A Concert You'll Never Forget • A Concert You'll Never Forget • </span>
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
      <section className="concert-gallery-section" ref={gallerySectionRef}>
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
