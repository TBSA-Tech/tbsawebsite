import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Home, Award, Trophy, Medal } from "lucide-react";
import { Contact } from "./contact";
import "./electionResults.css";

export function ElectionResults() {
  const [isScrolled, setIsScrolled] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mock election results data
  const electionResults = [
    {
      position: "President",
      winner: {
        name: "Yash Ramnani",
        image: "img/platforms/yash-ramnani.jpg",
        votes: 67,
        percentage: 61,
      },
      runnerUps: [
        {
          name: "Joh Magok",
          image: "img/platforms/Magok.jpg",
          votes: 27,
          percentage: 25,
        },
      ],
      noChoice: {
        votes: 15,
        percentage: 14,
      }
    },
    {
      position: "Executive Vice President",
      winner: {
        name: "Almeena Manal",
        image: "img/platforms/Manal.jpeg",
        votes: 60,
        percentage: 55,
      },
      runnerUps: [
        {
          name: "Hitika Somani",
          image: "img/platforms/Somani.jpeg",
          votes: 36,
          percentage: 33,
        },
      ],
      noChoice: {
        votes: 13,
        percentage: 12,
      }
    },
    {
      position: "VP Finance",
      winner: {
        name: "Zainab Ahsan Chiya",
        image: "img/platforms/Chiya.jpg",
        votes: 54,
        percentage: 50,
      },
      runnerUps: [
        {
          name: "Bryanna Carter",
          image: "img/platforms/Carter.jpg",
          votes: 30,
          percentage: 28,
        },
      ],
      noChoice: {
        votes: 25,
        percentage: 23,
      }
    },
    {
      position: "VP Marketing",
      winner: {
        name: "Jereni Jeyakaran",
        image: "img/platforms/Cathreen.jpg",
        votes: 62,
        percentage: 57,
      },
      runnerUps: [
        {
          name: "Oshin Vijayvargiya",
          image: "img/platforms/Oshin.png",
          votes: 30,
          percentage: 28,
        },
      ],
      noChoice: {
        votes: 25,
        percentage: 23,
      }
    },
    {
      position: "VP Corporate Relations",
      winner: {
        name: "Ali Jammal",
        image: "img/platforms/Jammal.jpg",
        votes: 83,
        percentage: 76,
      },
      runnerUps: [],
      noChoice: {
        votes: 26,
        percentage: 24,
      }
    },
    {
      position: "VP Human Resources",
      winner: {
        name: "Ethen Jacob Ninan",
        image: "img/platforms/Jacob.JPG",
        votes: 30,
        percentage: 28,
      },
      runnerUps: [
        {
            name: "Adedamola (Dami) Adesanya",
            image: 'img/platforms/Adesanya.jpg',
            votes: 29,
            percentage: 27,
        },
        {
          name: "Rita Sobayo",
          image: "img/platforms/nike.png",
          votes: 19,
          percentage: 17,
        },
        {
            name: "Millicent Bless Dzikunu",
            image: "img/platforms/Bless.png",
            votes: 19,
            percentage: 17,
        }
      ],
      noChoice: {
        votes: 12,
        percentage: 11,
      }
    },
    {
      position: "VP Communications/Outreach",
      winner: {
        name: "Tapchin Dawurang",
          image: "img/platforms/Tapchin.jpeg",
          votes: 47,
          percentage: 43,
      },
      runnerUps: [
        {
          name: "Lakshit Kalra",
          image: "img/platforms/Kalra.png",
          votes: 27,
          percentage: 25,
        },
        {
            name: "Joel Jude Partey",
            image: "img/platforms/JJ.jpeg",
            votes: 16,
            percentage: 17,
        },
      ],
      noChoice: {
        votes: 19,
        percentage: 17,
      }
    },
    {
      position: "VP Conferences/Case Competitions",
      winner: {
        name: "Khushal Sethiya",
        image: "img/platforms/Sethiya.png",
        votes: 43,
        percentage: 39,
      },
      runnerUps: [
        {
            name: "Angadveer Singh Bedi",
            image: 'img/platforms/Bedi.jpeg',
            votes: 39,
            percentage: 36,
        }
      ],
      noChoice: {
        votes: 27,
        percentage: 25,
      }
    },
    {
      position: "VP Tech & Design",
      winner: {
        name: "Dhrumil Dungrani",
        image: "img/platforms/dave.jpg",
        votes: 98,
        percentage: 90,
      },
      runnerUps: [
        
      ],
      noChoice: {
        votes: 11,
        percentage: 10,
      }
    },
  ];



  return (
    <div className="results-page">
      <header className={`header ${isScrolled ? "scrolled" : ""}`} style={{ height: 65 }}>
        <div className="container header-container">
          <div className="header-left">
            <Link to="/" className="home-link">
              <Home size={20} />
              <span>Home</span>
            </Link>
            <Link to="/platforms" className="home-link">
              <Award size={20} />
              <span>Candidate Platforms</span>
            </Link>
            <div className="logo-container">
              <img
                src="/img/logo.png"
                alt="Trent University Logo"
                className="header-logo"
                style={{height: 50}}
              />
              <h1>2025-26 Election Results</h1>
            </div>
          </div>
        </div>
      </header>


      <div className="hero-section results-hero" style={{ marginTop: 0 }}>
        <div className="">
          <h2 className="fade-in">Election Results</h2>
          <p className="fade-in delay">
            Congratulations to our newly elected TBSA executives!
          </p>
        </div>
      </div>

      <div className="container main-content">
        <div className="results-intro">
          <h3>2025-2026 TBSA Executive Team</h3>
          <p>
            The votes have been counted and we're excited to announce the results
            of the TBSA elections. Thank you to all candidates who participated
            and to everyone who voted. Together, we're building a stronger
            business student community at Trent University.
          </p>
        </div>

        <div className="results-summary">
          <h3>Election Statistics</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">109</div>
              <div className="stat-label">Total Votes Cast</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">10%</div>
              <div className="stat-label">Voter Turnout</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">19</div>
              <div className="stat-label">Total Candidates</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">9</div>
              <div className="stat-label">Positions Filled</div>
            </div>
          </div>
        </div>

        <div className="results-grid">
          {electionResults.map((result, index) => (
            <div key={index} className="result-card">
              <div className="position-header">
                <h3>{result.position}</h3>
                <div className="position-icon">
                  {index === 0 ? (
                    <Trophy size={24} />
                  ) : (
                    <Medal size={24} />
                  )}
                </div>
              </div>

              <div className="winner-section">
                <div className="winner-badge">Winner</div>
                <div className="candidate-result winner">
                  <div className="candidate-image-container">
                    <img
                      src={result.winner.image}
                      alt={result.winner.name}
                      className="candidate-image"
                    />                    
                  </div>
                  <div className="candidate-info">
                    <h4>{result.winner.name}</h4>
                    <div className="vote-info">
                      <div className="vote-count">
                        <span>{result.winner.votes}</span> votes
                      </div>
                      <div className="vote-bar-container">
                        <div
                          className="vote-bar"
                          style={{ width: `${result.winner.percentage}%` }}
                        ></div>
                      </div>
                      <div className="vote-percentage">
                        {result.winner.percentage}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {result.runnerUps.length > 0 && (
                <div className="runner-ups-section">
                  <h5>Other Candidates</h5>
                  {result.runnerUps.map((runnerUp, idx) => (
                    <div key={idx} className="candidate-result runner-up">
                      <div className="candidate-image-container">
                        <img
                          src={runnerUp.image}
                          alt={runnerUp.name}
                          className="candidate-image"
                        />
                      </div>
                      <div className="candidate-info">
                        <h4>{runnerUp.name}</h4>
                        <div className="vote-info">
                          <div className="vote-count">
                            <span>{runnerUp.votes}</span> votes
                          </div>
                          <div className="vote-bar-container">
                            <div
                              className="vote-bar runner-up-bar"
                              style={{ width: `${runnerUp.percentage}%` }}
                            ></div>
                          </div>
                          <div className="vote-percentage">
                            {runnerUp.percentage}%
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* No Choice Section */}
              {result.noChoice && (
                <div className="no-choice-section">
                  <h5>No Choice</h5>
                  <div className="candidate-result no-choice">
                    <div className="no-choice-icon">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                        <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div className="candidate-info">
                      <h4>Abstained</h4>
                      <div className="vote-info">
                        <div className="vote-count">
                          <span>{result.noChoice.votes}</span> votes
                        </div>
                        <div className="vote-bar-container">
                          <div
                            className="vote-bar no-choice-bar"
                            style={{ width: `${result.noChoice.percentage}%` }}
                          ></div>
                        </div>
                        <div className="vote-percentage">
                          {result.noChoice.percentage}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Contact />
    </div>
  );
}

export default ElectionResults;