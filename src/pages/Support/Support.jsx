import React from 'react';
import './Support.css';

const Support = () => {
  return (
    <div className="support-page">
      <h1 className="page-title">Support Center</h1>
      
      <div className="faq-section">
        <h2 className="section-title">Frequently Asked Questions</h2>
        
        <div className="faq-item">
          <h3 className="faq-question">How do I charge the wheelchair?</h3>
          <p className="faq-answer">
            The wheelchair comes with a standard charger. Plug it into a 220V outlet and connect to the charging port on the battery module. A full charge typically takes 6-8 hours.
          </p>
        </div>
        
        <div className="faq-item">
          <h3 className="faq-question">What maintenance does the wheelchair require?</h3>
          <p className="faq-answer">
            Regular maintenance includes checking tire pressure (for wheel mode), cleaning the track system, and ensuring all moving parts are properly lubricated. We recommend professional servicing every 6 months.
          </p>
        </div>
        
        <div className="faq-item">
          <h3 className="faq-question">How do I switch between wheel and track modes?</h3>
          <p className="faq-answer">
            The mode switch is controlled via the remote controller. Press the mode button when the wheelchair is stationary to switch between wheel and track operation.
          </p>
        </div>
      </div>
      
      <div className="contact-section">
        <h2 className="section-title">Contact Us</h2>
        <p className="contact-text">
          For additional support, please contact our customer service team:
        </p>
        <ul className="contact-list">
          <li>Email: support@caterwil.in</li>
          <li>Phone: +91 1234567890</li>
          <li>Address: Caterwil Innovations, Bangalore, India</li>
        </ul>
      </div>
    </div>
  );
};

export default Support;