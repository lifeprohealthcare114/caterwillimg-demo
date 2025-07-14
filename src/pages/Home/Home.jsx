// src/pages/Home/Home.js
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
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
        </div>
      </section>
    </div>
  );
};

export default Home;