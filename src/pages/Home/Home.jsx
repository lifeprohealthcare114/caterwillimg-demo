import React, { useState } from 'react';
import { wheelchairParts, keySpecs, wheelchairFeatures } from '../../constants/wheelchairParts';
import PartModal from '../../components/PartModal/PartModal';
import ThreeDViewer from '../../components/ThreeDViewer/ThreeDViewer';
import SpecsCard from '../../components/SpecsCard/SpecsCard';
import './Home.css';

const Home = () => {
  const [selectedPart, setSelectedPart] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePartClick = (part) => {
    const completePart = {
      ...part,
      media: part.media || {
        type: 'image',
        src: '/assets/images/placeholder-part.jpg',
        poster: '/assets/images/placeholder-poster.jpg'
      },
      specs: part.specs || [],
      safetyNote: part.safetyNote || null
    };
    setSelectedPart(completePart);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedPart(null);
    setIsModalOpen(false);
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
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
            <source src="/assets/videos/wheelchair-hero.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="overlay"></div>
        
        <div className="hero-content">
          <h1 className="hero-title">Caterwil GTS Wheelchair</h1>
          <p className="hero-text">
            Experience revolutionary mobility with our advanced stair-climbing wheelchair technology.
          </p>
          <button 
            className="hero-button"
            onClick={() => {
              document.getElementById('viewer-section').scrollIntoView({ 
                behavior: 'smooth' 
              });
            }}
          >
            Explore 360° View
          </button>
        </div>
      </section>

      {/* 3D Viewer Section */}
      <section id="viewer-section" className="viewer-section">
        <div className="section-header">
          <h2 className="section-title">Interactive Wheelchair Explorer</h2>
        </div>
        <p className="section-subtitle">Click on any highlighted part to learn more</p>
        
        <div className="viewer-container">
          <ThreeDViewer 
            parts={wheelchairParts} 
            onPartClick={handlePartClick}
            isModalOpen={isModalOpen}
          />
        </div>
      </section>

      {/* Key Features Section */}
      <section className="features-section">
        <h2 className="section-title">Key Features</h2>
        <div className="features-grid">
          {wheelchairFeatures.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Specifications Section */}
      {/* <section className="specs-section">
        <h2 className="section-title">Technical Specifications</h2>
        <div className="specs-grid">
          {keySpecs.map((spec, index) => (
            <SpecsCard 
              key={index}
              title={spec.title}
              value={spec.value}
              icon={spec.icon}
            />
          ))}
        </div>
      </section> */}

      {/* Part Modal */}
      {selectedPart && (
        <PartModal 
          part={selectedPart} 
          onClose={handleCloseModal}
          parts={wheelchairParts}
          setSelectedPart={handlePartClick}
        />
      )}
    </div>
  );
};

export default Home;