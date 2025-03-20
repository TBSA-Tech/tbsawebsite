import React, { useState } from "react";
import "./image.css";

export const Image = ({ title, projectTitle, largeImage, smallImage }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className="tbsa-portfolio-item">
      <div className="tbsa-hover-bg">
        {!isLoaded && <div className="tbsa-image-loading"></div>}
        <div className="tbsa-hover-text">
          <h4>{title}</h4>
          <p>{projectTitle}</p>
          <div className="tbsa-view-btn">View</div>
        </div>
        <img 
          src={smallImage} 
          className={`tbsa-img-responsive ${isLoaded ? 'tbsa-loaded' : ''}`} 
          alt={title} 
          onLoad={handleImageLoad}
          loading="lazy"
        />
      </div>
    </div>
  );
};