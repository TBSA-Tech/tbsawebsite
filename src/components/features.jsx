import React, { useEffect } from "react";
import {
  Network,
  Trophy,
  Users,
  Briefcase,
  Globe2,
  Target,
} from "lucide-react";
import "./features.css";

export const Features = () => {
  const features = [
    {
      icon: <Network size={30} />,
      title: "Networking Events",
      text: "Connect with industry professionals and alumni through exclusive networking sessions and mixers.",
      color: "#2E7D32"
    },
    {
      icon: <Trophy size={30} />,
      title: "Case Competitions",
      text: "Participate in local and national case competitions to showcase your business acumen.",
      color: "#00563F"
    },
    {
      icon: <Users size={30} />,
      title: "Mentorship Program",
      text: "Get paired with senior students and industry professionals for career guidance and support.",
      color: "#1B5E20"
    },
    {
      icon: <Briefcase size={30} />,
      title: "Career Development",
      text: "Access exclusive job postings, resume workshops, and interview preparation sessions.",
      color: "#004D40"
    },
    {
      icon: <Globe2 size={30} />,
      title: "Global Opportunities",
      text: "Explore international business programs and exchange opportunities with partner universities.",
      color: "#00695C"
    },
    {
      icon: <Target size={30} />,
      title: "Leadership Development",
      text: "Develop essential leadership skills through workshops and practical experience.",
      color: "#2E7D32"
    }
  ];

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("feature-visible");
        }
      });
    }, observerOptions);

    document.querySelectorAll(".feature-card").forEach((card) => {
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div id="features" className="tbsa-features">
      <div className="tbsa-container">
        <div className="tbsa-section-title text-center">
          <h2>Why Join TBSA?</h2>
          <p className="section-subtitle">Empowering Future Business Leaders</p>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card"
              style={{"--delay": `${index * 0.1}s`}}
            >
              <div className="feature-icon-wrapper" style={{ backgroundColor: feature.color }}>
                {feature.icon}
              </div>
              <div className="feature-content">
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </div>              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};