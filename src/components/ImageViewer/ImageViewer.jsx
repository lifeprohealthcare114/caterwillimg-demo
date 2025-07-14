import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './ImageViewer.css';

const ImageViewer = ({ parts, onPartClick, isModalOpen }) => {
  const [currentView, setCurrentView] = useState('front');
  const [isZooming, setIsZooming] = useState(false);
  const [rotatingView, setRotatingView] = useState(null);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  
  const imgContainerRef = useRef(null);
  const imgRef = useRef(null);

  // Initial load and zooming setup
  useEffect(() => {
    setRotatingView(currentView);
    const initialTimer = setTimeout(() => setRotatingView(null), 1500);
    
    // Setup auto-zoom effect only when not manually zoomed
    let interval;
    if (!isZoomed) {
      interval = setInterval(() => {
        setIsZooming(true);
        setTimeout(() => setIsZooming(false), 6000);
      }, 8000);
    }

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimer);
    };
  }, [currentView, isZoomed]);

  // Handle view changes and rotation
  useEffect(() => {
    setRotatingView(currentView);
    const timer = setTimeout(() => setRotatingView(null), 1500);
    return () => clearTimeout(timer);
  }, [currentView]);

  const handlePartClick = (part) => {
    if (!isModalOpen) {
      onPartClick(part);
    }
  };

  const handleThumbnailClick = (imageSrc) => {
    setFullscreenImage(imageSrc);
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
  };

  const handleImageClick = (e) => {
    if (isModalOpen || fullscreenImage) return;
    
    if (!isZoomed) {
      // Calculate click position relative to image
      const container = imgContainerRef.current;
      const { left, top, width, height } = container.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      
      setZoomPosition({ x, y });
      setIsZoomed(true);
      setZoomScale(2); // Set zoom scale to 2x
      setIsZooming(false); // Stop any ongoing auto-zoom
    } else {
      setIsZoomed(false);
      setZoomScale(1); // Reset zoom scale
    }
  };

  const handleMouseMove = (e) => {
    if (!isZoomed || isModalOpen || fullscreenImage) return;
    
    const container = imgContainerRef.current;
    const { left, top, width, height } = container.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setZoomPosition({ x, y });
  };

  // Calculate hotspot position based on zoom
  const calculateHotspotPosition = (position) => {
    if (!isZoomed) return position;
    
    // Calculate the offset based on zoom position and scale
    const offsetX = (position.x - zoomPosition.x) * (zoomScale - 1);
    const offsetY = (position.y - zoomPosition.y) * (zoomScale - 1);
    
    return {
      x: position.x + offsetX,
      y: position.y + offsetY
    };
  };

  const thumbnails = [
    { id: 1, src: "/assets/images/Caterwil2.jpg", alt: "Wheelchair accessory 1" },
    { id: 2, src: "/assets/images/Caterwil1.jpg", alt: "Wheelchair accessory 2" },
    { id: 3, src: "/assets/images/Caterwil4.jpg", alt: "Wheelchair accessory 3" },
    { id: 4, src: "/assets/images/Caterwil3.jpg", alt: "Wheelchair accessory 4" },
  ];

  return (
    <div className={`image-viewer-wrapper ${fullscreenImage ? 'fullscreen-modal-open' : ''} ${isModalOpen ? 'modal-active' : ''}`}>
      {/* External thumbnail column */}
      <div className="external-thumbnail-column">
        <h3 className="thumbnail-title">Accessories</h3>
        <div className="thumbnail-grid">
          {thumbnails.map((thumbnail) => (
            <div 
              key={thumbnail.id} 
              className="thumbnail-container"
              onClick={() => handleThumbnailClick(thumbnail.src)}
            >
              <img
                src={thumbnail.src}
                alt={thumbnail.alt}
                className="thumbnail-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/assets/images/placeholder-thumbnail.jpg";
                }}
              />
              <div className="thumbnail-overlay">
                <span className="view-text">View</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main viewer container */}
      <div className="viewer-container">
        <div className="image-viewer">
          <div className="view-selector">
            <button 
              className={`view-button ${currentView === 'front' ? 'active' : ''}`}
              onClick={() => {
                setCurrentView('front');
                setIsZoomed(false);
                setZoomScale(1);
              }}
            >
              Front View
            </button>
            <button 
              className={`view-button ${currentView === 'back' ? 'active' : ''}`}
              onClick={() => {
                setCurrentView('back');
                setIsZoomed(false);
                setZoomScale(1);
              }}
            >
              Back View
            </button>
          </div>
          
          <div 
            ref={imgContainerRef}
            className="wheelchair-image-container"
            onClick={handleImageClick}
            onMouseMove={handleMouseMove}
          >
            <TransitionGroup component={null}>
              <CSSTransition
                key={currentView}
                timeout={400}
                classNames="image"
                nodeRef={React.useRef()}
              >
                <div className={`image-wrapper ${!isZoomed && isZooming ? 'zooming' : ''} ${rotatingView === currentView ? 'initial-rotate' : ''}`}>
                  <img 
                    ref={imgRef}
                    src={currentView === 'front' 
                      ? "/assets/images/front.jpg" 
                      : "/assets/images/back.jpg"} 
                    alt={`Wheelchair ${currentView} view`}
                    className={`wheelchair-image ${isZoomed ? 'zoomed' : ''}`}
                    style={{
                      transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      transform: isZoomed ? `scale(${zoomScale})` : 'scale(1)'
                    }}
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = "/assets/images/placeholder.jpg";
                    }}
                  />
                </div>
              </CSSTransition>
            </TransitionGroup>
            
            {parts.map((part) => {
              const position = currentView === 'front' 
                ? part.frontPosition 
                : part.backPosition;
              
              if (!position) return null;

              const adjustedPosition = calculateHotspotPosition(position);

              return (
                <div 
                  key={part.id}
                  className="hotspot"
                  style={{
                    left: `${adjustedPosition.x}%`,
                    top: `${adjustedPosition.y}%`,
                    transform: isZoomed ? `scale(${1/zoomScale})` : 'scale(1)',
                    transformOrigin: 'center center'
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
            <div className="zoom-instructions">
              {isZoomed ? 'Click to zoom out' : 'Click anywhere to zoom in'}
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen modal */}
      {fullscreenImage && (
        <div className="fullscreen-modal" onClick={closeFullscreen}>
          <div className="fullscreen-content" onClick={(e) => e.stopPropagation()}>
            <img 
              src={fullscreenImage} 
              alt="Fullscreen view"
              className="fullscreen-image"
            />
            <button className="close-button" onClick={closeFullscreen}>
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageViewer;