import React, { useRef, useEffect, useState, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Info, AlertTriangle } from 'lucide-react';
import './PartModal.css';

const PartModal = ({ 
  part, 
  onClose, 
  parts, 
  setSelectedPart
}) => {
  const videoRef = useRef(null);
  const [currentPartIndex, setCurrentPartIndex] = useState(
    parts.findIndex(p => p.id === part.id)
  );
  const [isPlaying, setIsPlaying] = useState(true);
  const [showSpecs, setShowSpecs] = useState(false);

  // Ensure media object exists with defaults
  const media = part.media || {
    type: 'image',
    src: '/assets/images/placeholder-part.jpg',
    poster: '/assets/images/placeholder-poster.jpg'
  };

  const togglePlayback = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(error => {
          console.error('Video playback error:', error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const navigateParts = useCallback((direction) => {
    let newIndex = currentPartIndex + direction;
    if (newIndex < 0) newIndex = parts.length - 1;
    if (newIndex >= parts.length) newIndex = 0;
    setCurrentPartIndex(newIndex);
    setSelectedPart(parts[newIndex]);
    setIsPlaying(true);
  }, [currentPartIndex, parts, setSelectedPart]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const videoElement = videoRef.current;
    
    return () => {
      document.body.style.overflow = 'auto';
      if (videoElement) {
        videoElement.pause();
      }
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') navigateParts(-1);
      if (e.key === 'ArrowRight') navigateParts(1);
      if (e.key === 'Escape') onClose();
      if (e.key === ' ') togglePlayback();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigateParts, onClose, togglePlayback]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className="modal-header">
          <button 
            className="nav-button prev" 
            onClick={(e) => {
              e.stopPropagation();
              navigateParts(-1);
            }}
            aria-label="Previous part"
          >
            <ChevronLeft size={24} />
          </button>
          
          <div className="part-title-container">
            <h2 className="part-title">
              <span className="part-icon">{part.icon}</span>
              {part.name}
            </h2>
            <div className="part-controls">
              <button 
                className="specs-toggle"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSpecs(!showSpecs);
                }}
              >
                <Info size={18} />
                <span>{showSpecs ? 'Hide' : 'Show'} Specs</span>
              </button>
              {part.safetyNote && (
                <div className="safety-note">
                  <AlertTriangle size={16} />
                  <span>Safety Note</span>
                </div>
              )}
            </div>
          </div>
          
          <button 
            className="nav-button next" 
            onClick={(e) => {
              e.stopPropagation();
              navigateParts(1);
            }}
            aria-label="Next part"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        
        <div className="modal-body">
          <div className="media-container">
            {media.type === 'video' ? (
              <div className="video-wrapper">
                <video
                  ref={videoRef}
                  controls={false}
                  autoPlay
                  muted
                  loop
                  poster={media.poster}
                  className="part-media"
                  onClick={togglePlayback}
                >
                  <source src={media.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <button 
                  className={`play-button ${isPlaying ? 'playing' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlayback();
                  }}
                >
                  {isPlaying ? '❚❚' : '▶'}
                </button>
              </div>
            ) : (
              <img 
                src={media.src} 
                alt={part.name} 
                className="part-media"
                onError={(e) => {
                  e.target.src = '/assets/images/placeholder-part.jpg';
                }}
              />
            )}
          </div>
          
          <div className="part-details">
            {showSpecs && part.specs && (
              <div className="specs-section">
                <h3 className="detail-title">Technical Specifications</h3>
                <ul className="specs-list">
                  {part.specs.map((spec, index) => (
                    <li key={index}>
                      <strong>{spec.name}:</strong> {spec.value}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="detail-section">
              <h3 className="detail-title">Description</h3>
              <p className="detail-text">{part.description}</p>
            </div>
            
            <div className="detail-section">
              <h3 className="detail-title">How It Works</h3>
              <p className="detail-text">{part.howItWorks}</p>
            </div>
            
            {part.safetyNote && (
              <div className="safety-section">
                <h3 className="detail-title">
                  <AlertTriangle size={18} />
                  Safety Information
                </h3>
                <p className="detail-text">{part.safetyNote}</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="modal-footer">
          <button 
            className="close-modal-button" 
            onClick={onClose}
          >
            Return to Explorer
          </button>
        </div>
      </div>
    </div>
  );
};

export default PartModal;