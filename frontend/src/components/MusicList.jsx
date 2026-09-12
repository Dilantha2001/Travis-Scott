import React from 'react';
import { FaRegHeart, FaPlus, FaArrowDown, FaMicrophone, FaSlidersH, FaChevronDown } from 'react-icons/fa';
import './MusicList.css';

const trackData = [
  {
    id: 1,
    title: "If I Was Your Girlfri...",
    artist: "Mondays feat. Lucy",
    duration: "2:43",
    bpm: "121 BPM",
    genre: "Pop, 2010s",
    mood: "Happy, Restless",
    explicit: false,
    cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&w=100&q=80"
  },
  {
    id: 2,
    title: "CUPID",
    artist: "Adelyn Paik",
    duration: "3:22",
    bpm: "126 BPM",
    genre: "K-Pop",
    mood: "Happy, Hopeful",
    explicit: false,
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=100&q=80"
  },
  {
    id: 3,
    title: "Cry When It's Over",
    artist: "Lupus Nocte, Zorro",
    duration: "3:03",
    bpm: "90 BPM",
    genre: "Pop, Electropop",
    mood: "Chasing, Happy",
    explicit: false,
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=100&q=80"
  },
  {
    id: 4,
    title: "Crush!",
    artist: "Maybe",
    duration: "2:59",
    bpm: "125 BPM",
    genre: "Pop, 2020s",
    mood: "Dreamy, Laid Back",
    explicit: true,
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=100&q=80"
  },
  {
    id: 5,
    title: "Fire",
    artist: "Mindme feat. Alexa Capp...",
    duration: "3:01",
    bpm: "92 BPM",
    genre: "Pop, Dance-Pop",
    mood: "Happy, Restless",
    explicit: false,
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=100&q=80"
  }
];

const MusicList = () => {
  return (
    <div className="music-list-container">
      {/* Header Section */}
      <div className="music-list-header">
        <div className="header-info">
          <h1>Barbiecore</h1>
          <p>Pretty in pink!</p>
        </div>
        <div className="header-image">
          <img src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&w=400&q=80" alt="Barbiecore" />
        </div>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="filter-left">
          <FaSlidersH className="filter-icon" />
          <span>Genres</span>
          <span>Moods</span>
          <span>Vocals</span>
          <span>Duration</span>
          <span>BPM</span>
        </div>
        <div className="filter-right">
          <span>Sort by suggested order</span>
          <FaChevronDown className="sort-icon" />
        </div>
      </div>

      {/* Track List */}
      <div className="track-list">
        {trackData.map((track) => (
          <div className="track-item" key={track.id}>
            <div className="track-cover-info">
              <img src={track.cover} alt={track.title} className="track-cover" />
              <div className="track-details">
                <div className="track-title-row">
                  <h4 className="track-title">{track.title}</h4>
                  {track.explicit && <span className="explicit-badge">E</span>}
                </div>
                <p className="track-artist">{track.artist}</p>
              </div>
            </div>

            <div className="track-waveform">
              <FaMicrophone className="mic-icon" />
              {/* Placeholder for waveform graphic */}
              <div className="waveform-placeholder">
                <div className="wave-line"></div>
                <div className="wave-line"></div>
                <div className="wave-line"></div>
                <div className="wave-line"></div>
                <div className="wave-line"></div>
                <div className="wave-line"></div>
                <div className="wave-line"></div>
                <div className="wave-line"></div>
                <div className="wave-line"></div>
                <div className="wave-line"></div>
                <div className="wave-line"></div>
                <div className="wave-line"></div>
                <div className="wave-line"></div>
                <div className="wave-line"></div>
                <div className="wave-line"></div>
                <div className="wave-line"></div>
              </div>
            </div>

            <div className="track-stats">
              <span className="track-duration">{track.duration}</span>
              <span className="track-bpm">{track.bpm}</span>
            </div>

            <div className="track-meta">
              <span className="track-genre">{track.genre}</span>
              <span className="track-mood">{track.mood}</span>
            </div>

            <div className="track-actions">
              <FaRegHeart className="action-icon" />
              <FaPlus className="action-icon" />
              <FaArrowDown className="action-icon" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MusicList;
