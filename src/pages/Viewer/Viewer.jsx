// src/pages/Viewer/Viewer.js
import { useState, useEffect, useRef } from 'react';
import { wheelchairParts, wheelchairFeatures } from '../../constants/wheelchairParts';
import PartModal from '../../components/PartModal/PartModal';
import ImageViewer from '../../components/ImageViewer/ImageViewer';
import './Viewer.css';

const Viewer = () => {
  const [selectedPart, setSelectedPart] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState('start');
  const featuresGridRef = useRef(null);
  const featuresSectionRef = useRef(null);

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

  const handleModalPartSelect = (part) => {
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
  };

  useEffect(() => {
    const handleScroll = () => {
      if (featuresGridRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = featuresGridRef.current;
        const tolerance = 10;
        
        if (scrollLeft <= tolerance) {
          setScrollPosition('start');
        } else if (scrollLeft + clientWidth >= scrollWidth - tolerance) {
          setScrollPosition('end');
        } else {
          setScrollPosition('middle');
        }
      }
    };

    const gridElement = featuresGridRef.current;
    if (gridElement) {
      gridElement.addEventListener('scroll', handleScroll);
      // Initial check
      handleScroll();
    }

    return () => {
      if (gridElement) {
        gridElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // Scroll to start when features change (for responsiveness)
  useEffect(() => {
    if (featuresGridRef.current) {
      featuresGridRef.current.scrollLeft = 0;
      setScrollPosition('start');
    }
  }, []);

  return (
    <div className="viewer-page">
      <section className="viewer-section">
        <div className="section-header">
          <h2 className="section-title">Interactive Wheelchair Explorer</h2>
        </div>
        <p className="section-subtitle">Click on any highlighted part to learn more</p>
        
        <div className="viewer-container">
          <ImageViewer 
            parts={wheelchairParts} 
            onPartClick={handlePartClick}
            isModalOpen={isModalOpen}
          />
        </div>
      </section>

      <section 
        className={`features-section ${scrollPosition}`} 
        ref={featuresSectionRef}
      >
        <h2 className="section-title">Key Features</h2>
        <div 
          className="features-grid" 
          ref={featuresGridRef}
        >
          {wheelchairFeatures.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {selectedPart && (
        <PartModal 
          part={selectedPart} 
          onClose={handleCloseModal}
          parts={wheelchairParts}
          setSelectedPart={handleModalPartSelect}
        />
      )}
    </div>
  );
};

export default Viewer;