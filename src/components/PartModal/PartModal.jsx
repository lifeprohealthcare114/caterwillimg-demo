import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import './PartModal.css';

const PartModal = ({ part, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className="modal-header">
          <h2 className="part-title">
            <span className="part-icon">{part.icon}</span>
            {part.name}
          </h2>
        </div>
        
        <div className="modal-body">
          <div className="part-image-container">
            <img 
              src={part.image} 
              alt={part.name} 
              className="part-image"
              onError={(e) => {
                e.target.src = '/assets/images/placeholder-part.jpg';
              }}
            />
          </div>
          
          <div className="part-details">
            <div className="detail-section">
              <h3 className="detail-title">Description</h3>
              <p className="detail-text">{part.description}</p>
            </div>
            
            <div className="detail-section">
              <h3 className="detail-title">How It Works</h3>
              <p className="detail-text">{part.howItWorks}</p>
            </div>
            
            <div className="detail-section">
              <h3 className="detail-title">Uses & Safety</h3>
              <p className="detail-text">{part.uses}</p>
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="close-modal-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PartModal;