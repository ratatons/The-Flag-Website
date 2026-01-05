import React from 'react';
import '../styles/LoadingPage.css';
import logoImage from '../logo.png';

interface LoadingPageProps {
  fadeOut?: boolean;
}

const LoadingPage: React.FC<LoadingPageProps> = ({ fadeOut = false }) => {
  return (
    <div className={`loading-overlay ${fadeOut ? 'fade-out' : ''}`}>
      <img
        src={logoImage}
        alt="Loading"
        className="loading-logo"
      />
    </div>
  );
};

export default LoadingPage;
