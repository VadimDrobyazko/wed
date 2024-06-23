import React, { useState, useEffect } from 'react';
import first from '../../video/first.MOV';

const Header: React.FC = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);

  useEffect(() => {
    const headerTimer = setTimeout(() => {
      setShowHeader(false);
      setShowVideo(true);
    }, 3000);

    return () => clearTimeout(headerTimer);
  }, []);

  useEffect(() => {
    if (!showHeader && showVideo) {
      const videoTimer = setTimeout(() => {
        setVideoVisible(true);
      }, 50);

      return () => clearTimeout(videoTimer);
    }
  }, [showHeader, showVideo]);

  return (
    <header className="header">
      {showHeader && (
        <>
          <span className="header__span header__span--b">D</span>
          <span className="header__span header__span--v">V</span>
        </>
      )}

      {showVideo && (
        <>
          <video
            width="100%"
            height="100%"
            className={`video ${videoVisible ? 'visible' : ''}`}
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={first} type="video/mp4" />
          </video>

          <button
            className={`header__button ${videoVisible ? 'button__visible' : ''}`}
          >
            Гортай нижче
          </button>
        </>
      )}
    </header>
  );
};

export default Header;
