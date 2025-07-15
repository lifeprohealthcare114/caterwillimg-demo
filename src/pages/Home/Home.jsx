// src/pages/Home/Home.js
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import './Home.css';

const Home = () => {
  // const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef(null);

  // const toggleMusic = () => {
  //   if (isMusicPlaying) {
  //     audioRef.current.pause();
  //   } else {
  //     audioRef.current.play();
  //   }
  //   setIsMusicPlaying(!isMusicPlaying);
  // };

  return (
    <div className="home-page">
      {/* Hidden audio element */}
      <audio 
        ref={audioRef} 
        src="/assets/audio/background-music.mp3" 
        loop 
      />
      
      <section className="hero-section">
        <div className="video-container">
          <video
            className="video-background"
            autoPlay
            muted
            loop
            playsInline
            poster="/assets/videos/poster.jpg"
          >
            <source src="/assets/videos/wheelchair.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="overlay"></div>
        
        <div className="hero-content">
          <h1 className="hero-title">Caterwil GTS-4WD</h1>
          <p className="hero-text">
            Experience revolutionary mobility with our advanced stair-climbing wheelchair technology.
          </p>
          <Link to="/viewer" className="hero-button">
            Explore Wheelchair Features
          </Link>
          
          {/* Music control button */}
          {/* <button 
            className="music-control"
            onClick={toggleMusic}
            aria-label={isMusicPlaying ? 'Pause background music' : 'Play background music'}
          >
            {isMusicPlaying ? '🔊' : '🔈'}
          </button> */}
        </div>
      </section>
    </div>
  );
};

export default Home;