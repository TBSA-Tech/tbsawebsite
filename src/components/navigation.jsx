import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./navigation.css";

export const Navigation = (props) => {
  const [isScrolled, setIsScrolled] = useState(false);
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

  // Don't render navigation on platforms page
  if (location.pathname === '/platforms') {
    return null;
  }

  return (
    <nav className={`main-navigation ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
            <div className="nav-logo">
                <a href="#">
                    <img src="img/logo.png" alt="Company Logo" className="logo-image" />
                </a>
            </div>
            <div id="mainListDiv" className="nav-menu">
                <ul className="nav-links-list">
                    <li><a href="#about">About</a></li>
                    <li><a href="#services">Events</a></li>
                    <li><a href="#portfolio">Gallery</a></li>
                    <li><a href="#team">Team</a></li>
                    <li><a href="/platforms">Elections</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </div>
            <span className="nav-trigger">
                <i></i>
                <i></i>
                <i></i>
            </span>
        </div>
    </nav>
  );
};