// src/components/ImageViewer/ImageViewer.js
import React, { useState } from 'react';
import './ImageViewer.css';

const ImageViewer = ({ parts, onPartClick, isModalOpen }) => {
  const [currentView, setCurrentView] = useState('front');

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
        <img 
          src={currentView === 'front' 
            ? "/assets/images/front.jpg" 
            : "/assets/images/back.jpg"} 
          alt={`Wheelchair ${currentView} view`}
          className="wheelchair-image"
        />
        
        {parts.map((part) => {
          // Use frontPosition for front view, backPosition for back view
          const position = currentView === 'front' 
            ? part.frontPosition 
            : part.backPosition;
          
          // Only show hotspot if position exists for this view
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