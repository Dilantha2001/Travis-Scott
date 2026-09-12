import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation } from 'swiper/modules';
import { FaPlay, FaPause, FaForward, FaBackward } from 'react-icons/fa';
import { IoLogoYoutube } from 'react-icons/io5';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

import './MusicPlayer.css';

// Import local assets
import sccCover from '../assets/smoke.jpg';
import smokioDissAudio from '../assets/kuddah-reply-diss-smokio.mp3';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const songs = [
  {
    title: "KUDDAH (REPLY DISS)",
    name: "Smokio",
    source: smokioDissAudio,
    cover: sccCover,
    youtube: "https://www.youtube.com/watch?v=oq8QeN-Hl0k"
  },
  {
    title: "Pawn It All",
    name: "Alicia Keys",
    source: "https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/Pawn-It-All.mp3",
    cover: "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/1afe4c6a-0287-43f0-9076-92f8be49d9dc",
    youtube: "https://www.youtube.com/watch?v=qEnfeG8uBRY&ab_channel=AliciaKeys-Topic"
  },
  {
    title: "Seni Dert Etmeler",
    name: "Madrigal",
    source: "https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/Madrigal-Seni-Dert-Etmeler.mp3",
    cover: "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/abaa23bd-8c93-4219-a3ef-0d0cb6f12566",
    youtube: "https://www.youtube.com/watch?v=LgsaD-vNJ9M"
  },
  {
    title: "Instant Crush",
    name: "Daft Punk ft. Julian Casablancas",
    source: "https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/Daft-Punk-Instant-Crush.mp3",
    cover: "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/bd9bcc80-a9ab-4d54-a460-ffdb77f22a72",
    youtube: "https://www.youtube.com/watch?v=a5uQMwRMHcs&ab_channel=DaftPunkVEVO"
  },
  {
    title: "As It Was",
    name: "Harry Styles",
    source: "https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/Harry-Styles-As-It-Was.mp3",
    cover: "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/18bc2436-740b-44c4-9dd8-fd7be51a07ad",
    youtube: "https://www.youtube.com/watch?v=H5v3kku4y6Q&ab_channel=HarryStylesVEVO"
  },
  {
    title: "Physical",
    name: "Dua Lipa",
    source: "https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/Dua-Lipa-Physical.mp3",
    cover: "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/4c5c1727-8b32-48c1-91de-b0496ccf10f6",
    youtube: "https://www.youtube.com/watch?v=9HDEHj2yzew&ab_channel=DuaLipa"
  },
  {
    title: "Delicate",
    name: "Taylor Swift",
    source: "https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/Taylor-Swift-Delicate.mp3",
    cover: "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/23e440e5-a0fa-4a85-8175-bcc485a20ee6",
    youtube: "https://www.youtube.com/watch?v=tCXGJQYZ9JA&ab_channel=TaylorSwiftVEVO"
  }
];

export default function MusicPlayer() {
  const container = useRef(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0); // Start at Travis Scott (index 0)
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const audioRef = useRef(null);
  const swiperRef = useRef(null);

  const currentSong = songs[currentSongIndex];

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 60%",
        toggleActions: "play none none reverse",
     marks:true
      }
    });

    // Reveal title
    tl.from("#belowText", {
      opacity: 0,
      y: 60,
      duration: 2,
      ease: "back"
    })
    // Reveal about section shortly after
    .from("#aboutText", {
      opacity: 0,
      x: -50,
      duration: 2,
      ease: "power3.out"
    });
    // Auto-play when scrolling into view
    ScrollTrigger.create({
      trigger: container.current,
      start: "top 50%",
      onEnter: () => {
        setIsPlaying(true);
      }
    });
  }, { scope: container });

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play().catch((err) => {
        console.log("Autoplay prevented:", err);
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentSongIndex]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setProgress(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleProgressChange = (e) => {
    const value = e.target.value;
    audioRef.current.currentTime = value;
    setProgress(value);
  };

  const handleSongEnd = () => {
    const nextIndex = (currentSongIndex + 1) % songs.length;
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(nextIndex);
    }
    setCurrentSongIndex(nextIndex);
    setIsPlaying(true);
  };

  const nextSong = () => {
    const nextIndex = (currentSongIndex + 1) % songs.length;
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(nextIndex);
    }
  };

  const prevSong = () => {
    const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(prevIndex);
    }
  };

  return (
    <div className={`music-player-section ${isPlaying ? 'is-playing' : ''}`} ref={container}>
      <div className="below-text" id="belowText">
        THE WORK <span>SPEAKS.</span>
      </div>

      <div className="player-container">
        {/* LEFT COLUMN: ABOUT */}
        <div className="about-left" id="aboutText">
          <h2>SMOKIO</h2>
          <p>
            Smokio is a pioneering Sri Lankan Sinhala hip-hop artist and rapper known for his raw lyricism, high-voltage stage presence, and game-changing contributions to the South Asian rap movement.
          </p>
          <p>
            Experience the unfiltered sound, explosive beats, and boundary-pushing energy of Sri Lanka's finest hip-hop icon.
          </p>
        </div>

        {/* RIGHT COLUMN: PLAYER */}
        <div className="player-right">
          <div className="album-cover">
            <Swiper
              ref={swiperRef}
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              initialSlide={0}
              coverflowEffect={{
                rotate: 25,
                stretch: 0,
                depth: 50,
                modifier: 1,
                slideShadows: false,
              }}
              modules={[EffectCoverflow, Navigation]}
              onSlideChange={(swiper) => setCurrentSongIndex(swiper.activeIndex)}
              className="swiper"
            >
              {songs.map((song, index) => (
                <SwiperSlide key={index}>
                  <div 
                    className="slide-inner"
                    style={{ width: "100%", height: "100%", position: "relative", borderRadius: "inherit" }}
                    onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.15, duration: 0.4, ease: "back.out(1.7)" })}
                    onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, duration: 0.4, ease: "power2.out" })}
                  >
                    <img src={song.cover} alt={song.title} />
                    <div className="overlay">
                      <a href={song.youtube} target="_blank" rel="noopener noreferrer">
                        <IoLogoYoutube />
                      </a>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="music-player">
            <h1>{currentSong.title}</h1>
            <p>{currentSong.name}</p>

            <audio
              ref={audioRef}
              src={currentSong.source}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={handleSongEnd}
            ></audio>

            <input
              type="range"
              value={progress}
              max={duration || 100}
              onChange={handleProgressChange}
              id="progress"
            />

            <div className="controls">
              <button className="backward" onClick={prevSong}>
                <FaBackward />
              </button>
              <button className="play-pause-btn" onClick={togglePlayPause}>
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
              <button className="forward" onClick={nextSong}>
                <FaForward />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
