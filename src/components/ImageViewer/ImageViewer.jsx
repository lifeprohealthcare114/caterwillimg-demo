import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './ImageViewer.css';

const ImageViewer = ({ parts, onPartClick, isModalOpen }) => {
  const [currentView, setCurrentView] = useState('front');
  const [isZooming, setIsZooming] = useState(false);
  const [rotatingView, setRotatingView] = useState(null);

  // Initial load and zooming setup
  useEffect(() => {
    // Initial rotation on first load
    setRotatingView(currentView);
    const initialTimer = setTimeout(() => setRotatingView(null), 1500);
    
    // Set up zooming interval
    const interval = setInterval(() => {
      setIsZooming(true);
      setTimeout(() => setIsZooming(false), 6000);
    }, 8000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimer);
    };
  }, [currentView]); // Added currentView to dependency array

  // Handle view changes and rotation
  useEffect(() => {
    // Trigger rotation when view changes
    setRotatingView(currentView);
    const timer = setTimeout(() => setRotatingView(null), 1500);
    return () => clearTimeout(timer);
  }, [currentView]);

  const handlePartClick = (part) => {
    if (!isModalOpen) {
      onPartClick(part);
    }
  };

  return (
    <div className="image-viewer">
      <div className="view-selector">
        <button 
          className={`view-button ${currentView === 'front' ? 'active' : ''}`}
          onClick={() => setCurrentView('front')}
        >
          Front View
        </button>
        <button 
          className={`view-button ${currentView === 'back' ? 'active' : ''}`}
          onClick={() => setCurrentView('back')}
        >
          Back View
        </button>
      </div>
      
      <div className="wheelchair-image-container">
        <TransitionGroup component={null}>
          <CSSTransition
            key={currentView}
            timeout={400}
            classNames="image"
            nodeRef={React.useRef()}
          >
            <div className={`image-wrapper ${isZooming ? 'zooming' : ''} ${rotatingView === currentView ? 'initial-rotate' : ''}`}>
              <img 
                src={currentView === 'front' 
                  ? "/assets/images/front.jpg" 
                  : "/assets/images/back.jpg"} 
                alt={`Wheelchair ${currentView} view`}
                className="wheelchair-image"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = "/assets/images/placeholder.jpg";
                }}
                ref={React.useRef()}
              />
            </div>
          </CSSTransition>
        </TransitionGroup>
        
        {parts.map((part) => {
          const position = currentView === 'front' 
            ? part.frontPosition 
            : part.backPosition;
          
          if (!position) return null;

          return (
            <div 
              key={part.id}
              className="hotspot"
              style={{
                left: `${position.x}%`,
                top: `${position.y}%`
              }}
              onClick={() => handlePartClick(part)}
            >
              <div className="hotspot-marker"></div>
              <div className="hotspot-tooltip">
                {part.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageViewer;