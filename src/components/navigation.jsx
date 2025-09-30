import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./navigation.css";

export const Navigation = (props) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  // Don't render navigation on platforms page
  if (location.pathname === '/platforms') {
    return null;
  }

  // Render a simplified nav on Corporate Crawl page
  if (location.pathname === '/corporatecrawl') {
    return (
      <nav className={`main-navigation ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo">
            <a href="/">
              <img src="img/logo.png" alt="Company Logo" className="logo-image" />
            </a>
          </div>
          <div className="nav-menu">
            <ul className="nav-links-list">
              <li className="nav-item" style={{"--i": "0"}}>
                <a href="/" onClick={handleLinkClick}>Main Menu</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className={`main-navigation ${isScrolled ? 'scrolled' : ''} ${mobileMenuOpen ? 'menu-open' : ''}`}>
        <div className="nav-container">
            <div className="nav-logo">
                <a href="#">
                    <img src="img/logo.png" alt="Company Logo" className="logo-image" />
                </a>
            </div>
            <div id="mainListDiv" className={`nav-menu ${mobileMenuOpen ? 'show' : ''}`}>
                <ul className="nav-links-list">
                    <li className="nav-item" style={{"--i": "0"}}>
                        <a href="#about" onClick={handleLinkClick}>About</a>
                    </li>
                    <li className="nav-item" style={{"--i": "1"}}>
                        <a href="#services" onClick={handleLinkClick}>Events</a>
                    </li>
                    <li className="nav-item" style={{"--i": "2"}}>
                        <a href="#portfolio" onClick={handleLinkClick}>Gallery</a>
                    </li>
                    <li className="nav-item" style={{"--i": "3"}}>
                        <a href="#team" onClick={handleLinkClick}>Team</a>
                    </li>
                    <li className="nav-item" style={{"--i": "4"}}>
                        <a href="/results" onClick={handleLinkClick}>Election Results</a>
                    </li>
                    <li className="nav-item" style={{"--i": "5"}}>
                        <a href="#contact" onClick={handleLinkClick}>Contact</a>
                    </li>
                </ul>
                <div className="mobile-menu-background">
                    <div className="blob blob-1"></div>
                    <div className="blob blob-2"></div>
                    <div className="blob blob-3"></div>
                </div>
            </div>
            <span 
                className={`nav-trigger ${mobileMenuOpen ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
                <i></i>
                <i></i>
                <i></i>
            </span>
        </div>
    </nav>
  );
};