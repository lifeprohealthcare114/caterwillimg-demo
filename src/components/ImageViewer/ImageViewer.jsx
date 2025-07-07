import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './ImageViewer.css';

const ImageViewer = ({ parts, onPartClick, isModalOpen }) => {
  const [currentView, setCurrentView] = useState('front');
  const [isZooming, setIsZooming] = useState(false);

  useEffect(() => {
    // Trigger zoom effect every 8 seconds
    const interval = setInterval(() => {
      setIsZooming(true);
      setTimeout(() => setIsZooming(false), 6000); // Active zoom duration
    }, 8000);

    return () => clearInterval(interval);
  }, []);

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
            <div className={`image-wrapper ${isZooming ? 'zooming' : ''}`}>
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