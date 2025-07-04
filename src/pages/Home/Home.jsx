import React, { useState } from 'react';
import { wheelchairParts, keySpecs } from '../../constants/wheelchairParts';
import PartModal from '../../components/PartModal/PartModal';
import ThreeDViewer from '../../components/ThreeDViewer/ThreeDViewer';
import SpecsCard from '../../components/SpecsCard/SpecsCard';
import './Home.css';

const Home = () => {
  const [selectedPart, setSelectedPart] = useState(null);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Revolutionary Stair-Climbing Wheelchair</h1>
          <p className="hero-text">
            Experience the future of mobility with our innovative wheelchair that combines
            comfort, safety, and unparalleled stair-climbing capabilities.
          </p>
          <button 
            className="hero-button"
            onClick={() => document.getElementById('viewer-section').scrollIntoView({ behavior: 'smooth' })}
          >
            Explore the 360° View
          </button>
        </div>
      </section>

      {/* 3D Viewer Section */}
      <section id="viewer-section" className="viewer-section">
        <h2 className="section-title">Interactive Wheelchair Explorer</h2>
        <p className="section-subtitle">Click on any part to learn more about its features</p>
        
        <div className="viewer-container">
          <ThreeDViewer parts={wheelchairParts} onPartClick={setSelectedPart} />
        </div>
      </section>

      {/* Key Features Section */}
      <section className="features-section">
        <h2 className="section-title">Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Dual Mode Operation</h3>
            <p>Switch seamlessly between wheels for flat surfaces and tracks for stairs and rough terrain.</p>
          </div>
          <div className="feature-card">
            <h3>Safety Mechanisms</h3>
            <p>Anti-tip system, emergency brakes, and stability control ensure user safety in all conditions.</p>
          </div>
          <div className="feature-card">
            <h3>Ergonomic Design</h3>
            <p>Adjustable seating, armrests, and controls tailored to individual user needs.</p>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="specs-section">
        <h2 className="section-title">Technical Specifications</h2>
        <div className="specs-grid">
          {keySpecs.map((spec, index) => (
            <SpecsCard key={index} title={spec.title} value={spec.value} icon={spec.icon} />
          ))}
        </div>
      </section>

      {/* Part Detail Modal */}
      {selectedPart && (
        <PartModal part={selectedPart} onClose={() => setSelectedPart(null)} />
      )}
    </div>
  );
};

export default Home;