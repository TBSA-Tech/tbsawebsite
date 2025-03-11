import React from "react";

export const Image = ({ title, projectTitle, largeImage, smallImage }) => {
  return (
    <div className="portfolio-item">
      <div className="hover-bg">
        <div className="hover-text">
          <h4>{title}</h4>
          <p>{projectTitle}</p>
        </div>
        <img src={smallImage} className="img-responsive" alt={title} />
      </div>
    </div>
  );
};