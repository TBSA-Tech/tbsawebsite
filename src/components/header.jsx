import React, { useEffect, useState } from "react";
import "./header.css"; // We'll create this file next

export const Header = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Animation on load
    setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    // Scroll effect
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header id="header" className={scrolled ? "scrolled" : ""}>
      <div className="tbsa-intro">
        <div className="tbsa-overlay"></div>
        <div className="tbsa-container">
          <div className={`tbsa-content ${isLoaded ? "loaded" : ""}`}>
            <div className="tbsa-logo-container">
              <div className="tbsa-logo-circle">
                <img src="img/logo.png" alt="TBSA Logo" className="tbsa-logo" />
              </div>
            </div>
            
            <h1 className="tbsa-title">
              <span className="tbsa-title-word">{props.data ? props.data.title : "Trent Business Students Association"}</span>
            </h1>
            
            <p className="tbsa-subtitle">{props.data ? props.data.paragraph : "Trent Business Students association is a student run levy-group at Trent University which is catered to the business majors at Trent University"}</p>
            
            <div className="tbsa-cta-container">
              <a href="#features" className="tbsa-cta-button">
                <span>Explore</span>
                <svg className="tbsa-arrow" viewBox="0 0 24 24">
                  <path d="M7 10l5 5 5-5z"></path>
                </svg>
              </a>
            </div>
            
            <div className="tbsa-scroll-indicator">
              <div className="tbsa-mouse">
                <div className="tbsa-wheel"></div>
              </div>
              <div className="tbsa-arrow-scroll">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};