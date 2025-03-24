"use client"

// platforms.jsx
import { useState, useEffect } from "react"
import { ChevronDown, ChevronUp, Search, Home } from "lucide-react"
import { Link } from "react-router-dom"
import { Contact } from "./contact"
import "./platforms.css"

// Add these styles for the profile buttons
const buttonStyles = `
  .candidate-profile-links {
    display: flex;
    gap: 12px;
    margin: 12px auto;
    justify-content: center;
    flex-wrap: wrap;
    max-width: 300px;
    perspective: 1000px;
  }

  .profile-button {
    padding: 10px 18px;
    border-radius: 30px;
    font-size: 0.9rem;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-decoration: none;
    transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    z-index: 1;
    backdrop-filter: blur(5px);
    transform-style: preserve-3d;
  }
  
  .profile-button:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: all 0.6s ease;
    z-index: -1;
  }
  
  .profile-button:hover:before {
    left: 100%;
    animation: shine 1.5s infinite;
  }
  
  @keyframes shine {
    0% { left: -100%; }
    100% { left: 100%; }
  }
  
  .profile-button:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, transparent, currentColor, transparent);
    transform: scaleX(0);
    transition: transform 0.4s ease;
  }
  
  .profile-button:hover:after {
    transform: scaleX(1);
  }

  .resume-button {
    background-color: rgba(240, 244, 248, 0.9);
    color: #2c5282;
    border: 2px solid #2c5282;
  }

  .resume-button:hover {
    background-color: #2c5282;
    color: white;
    transform: translateY(-5px) rotateX(10deg);
    box-shadow: 0 15px 25px rgba(44, 82, 130, 0.3);
  }

  .linkedin-button {
    background-color: #0077b5;
    color: white;
    border: 2px solid #0077b5;
  }

  .linkedin-button:hover {
    background-color: white;
    color: #0077b5;
    transform: translateY(-5px) rotateX(10deg);
    box-shadow: 0 15px 25px rgba(0, 119, 181, 0.3);
  }
  
  /* Pulse animation on load */
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
  
  .candidate-profile-links .profile-button:nth-child(1) {
    animation: pulse 2s ease infinite;
    animation-delay: 0.2s;
  }
  
  .candidate-profile-links .profile-button:nth-child(2) {
    animation: pulse 2s ease infinite;
    animation-delay: 0.6s;
  }
  
  /* Responsive styles */
  @media (min-width: 641px) and (max-width: 1024px) {
    .candidate-profile-links {
      gap: 10px;
      max-width: 280px;
    }
    
    .profile-button {
      padding: 8px 16px;
      font-size: 0.85rem;
    }
  }

  @media (max-width: 640px) {
    .candidate-profile-links {
      flex-direction: column;
      align-items: center;
      gap: 10px;
      max-width: 220px;
    }
    
    .profile-button {
      width: 75%;
      padding: 10px 16px;
      font-size: 0.85rem;
      transform-origin: center;
    }
    
    .profile-button:hover {
      transform: translateY(-3px) rotateX(5deg);
    }
  }
  
  /* Dark mode support */
  @media (prefers-color-scheme: dark) {
    .resume-button {
      background-color: #fff;
      color: #000;
      border-color: #90cdf4;
    }
    
    .resume-button:hover {
      background-color: #90cdf4;
      color: #fff;
    }
  }
  
  /* Touch device optimizations */
  @media (hover: none) {
    .profile-button {
      transition: all 0.3s ease;
    }
    
    .profile-button:active {
      transform: scale(0.95);
    }
  }
`

export function CandidatePlatforms() {
  const [activePosition, setActivePosition] = useState("president")
  const [expandedCandidate, setExpandedCandidate] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const positions = [
    { id: "president", title: "President" },
    { id: "vp-operations", title: "VP Operations" },
    { id: "vp-campus-life", title: "VP Campus Life" },
    { id: "vp-education", title: "VP Education" },
    { id: "vp-health", title: "VP Health & Wellness" },
    { id: "equity-commissioner", title: "Equity Commissioner" },
  ]

  const candidates = [
    {
      id: 1,
      name: "Yash Ramnani",
      position: "president",
      image: "img/team/Yash_VP.JPG",
      linkedin: "https://linkedin.com/in/yashramnani",
      resume: "/resumes/yash-ramnani-resume.pdf",
      platform: `As a candidate for Student Union President, I am committed to fostering an inclusive, innovative, and supportive campus environment. My platform is built on three core pillars: accessibility, sustainability, and community engagement.

      First and foremost, I believe that education should be accessible to all students regardless of their background or circumstances. If elected, I will advocate for expanded financial aid opportunities, more flexible course options, and improved support services for students with disabilities. I will work closely with administration to ensure that our campus is physically accessible and that digital resources are available to all students.

      Sustainability is not just a buzzword—it's a necessity. I propose implementing a comprehensive sustainability plan that includes reducing campus waste, investing in renewable energy sources, and incorporating environmental education into our curriculum. I will establish a student-led sustainability committee to drive these initiatives forward and ensure that our campus is a leader in environmental responsibility.

      Community engagement is the heart of a vibrant campus. I plan to strengthen the bonds between students, faculty, and the broader community through collaborative projects, service-learning opportunities, and cultural events. I will create platforms for student voices to be heard and valued in decision-making processes.

      Mental health support is another critical aspect of my platform. I will advocate for increased resources for counseling services, peer support programs, and wellness initiatives. Every student deserves to feel supported in their academic journey.

      Transparency and accountability will be hallmarks of my presidency. I commit to regular open forums, clear communication about budget allocations, and responsive leadership that addresses student concerns promptly and effectively.

      I bring to this role my experience as a Residence Advisor, Vice President of the Environmental Club, and member of the Student Senate. These roles have given me insight into the diverse needs of our student body and the skills to navigate complex institutional structures.

      If elected, I promise to be a president who listens, advocates, and acts in the best interest of all students. Together, we can create a campus community that empowers every student to thrive academically, personally, and professionally.`,
      goals: [
        "President",
      ],
    },
    {
      id: 2,
      name: "Joh Magok",
      position: "president",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      linkedin: "https://linkedin.com/in/yashramnani",
      resume: "/resumes/yash-ramnani-resume.pdf",
      platform: `My vision for our student union is centered on empowerment, innovation, and unity. As your potential President, I am dedicated to creating a campus where every student has the resources and support they need to excel.

      Student advocacy is at the core of my platform. I will fight for fair tuition rates, transparent fee structures, and policies that prioritize student well-being. By establishing strong relationships with administration and external stakeholders, I will ensure that student voices are central in all decisions that affect our education and campus experience.

      Technology integration is essential for preparing students for the future. I propose expanding digital learning resources, creating more technology-enabled study spaces, and developing a campus app that streamlines access to services and information. These initiatives will enhance our learning environment and prepare us for an increasingly digital world.

      Diversity and inclusion are non-negotiable values that strengthen our campus community. I will work to implement cultural competency training for all student leaders, expand resources for international students, and create more opportunities for cross-cultural dialogue and understanding. Every student deserves to feel welcomed, respected, and valued on our campus.

      Career readiness is another key focus of my platform. I will advocate for expanded internship opportunities, career counseling services, and alumni networking events. By strengthening connections with local businesses and organizations, we can create pathways to meaningful employment for all graduates.

      Campus safety is paramount. I will work with campus security to enhance lighting in poorly lit areas, expand the safe walk program, and implement bystander intervention training to prevent sexual assault and harassment. Every student has the right to feel safe on our campus.

      My experience as Treasurer of the Student Government Association, President of the Debate Club, and Peer Mentor has equipped me with the leadership skills, financial knowledge, and interpersonal abilities necessary for this role. I understand the challenges students face and am committed to addressing them effectively.

      If elected, I promise to lead with integrity, transparency, and a genuine commitment to improving the student experience. Together, we can build a campus community that prepares us not just for successful careers, but for meaningful lives as engaged citizens.`,
      goals: [
        "President",
      ],
    },
    {
      id: 3,
      name: "Taylor Singh",
      position: "vp-operations",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      platform: `As a candidate for VP Operations, I am committed to ensuring that our student union operates efficiently, transparently, and in the best interest of all students. My platform focuses on financial responsibility, organizational effectiveness, and sustainable operations.

      Financial transparency is the cornerstone of my platform. If elected, I will implement regular financial reports that are accessible and understandable to all students. I believe that every student has the right to know how their fees are being allocated and spent. I will work to create a participatory budgeting process that allows students to have direct input on funding priorities.

      Operational efficiency is essential for maximizing the impact of our resources. I plan to review and streamline administrative processes, reduce unnecessary bureaucracy, and implement technology solutions that make it easier for students to access services and information. By improving our operations, we can redirect more resources to programs and initiatives that directly benefit students.

      Sustainable operations are not just good for the environment—they're good for our budget. I will lead initiatives to reduce waste, decrease energy consumption, and implement environmentally friendly practices across all student union operations. These efforts will not only reduce our environmental footprint but also generate cost savings that can be reinvested in student services.

      Club and organization support is another key aspect of my platform. I will work to simplify the funding process for student groups, provide training and resources for club leaders, and create more opportunities for collaboration between organizations. Vibrant student organizations are essential to a rich campus experience, and I am committed to helping them thrive.

      Facility improvements are necessary to ensure that our spaces meet the evolving needs of students. I will advocate for renovations to study spaces, social areas, and service centers based on student input and usage data. Our facilities should be accessible, comfortable, and conducive to both academic success and community building.

      My experience as Treasurer of the Business Students Association, Assistant Manager of the Campus Bookstore, and Student Representative on the University Budget Committee has given me a deep understanding of financial management, operational processes, and organizational leadership. I am prepared to apply these skills to serve our student body effectively.

      If elected, I promise to be a VP Operations who manages our resources responsibly, communicates openly, and always prioritizes the needs of students. Together, we can build a student union that operates efficiently and effectively to enhance the university experience for everyone.`,
      goals: [
        "Implement transparent financial reporting",
        "Streamline administrative processes",
        "Develop sustainable operation practices",
        "Simplify funding for student organizations",
      ],
    },
    {
      id: 4,
      name: "Riley Patel",
      position: "vp-operations",
      image:
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      platform: `My vision as VP Operations is centered on creating a student union that operates with maximum efficiency, accountability, and student-centered focus. I believe that strong operational foundations enable us to better serve the diverse needs of our student body.

      Budget optimization is a primary focus of my platform. I will conduct a comprehensive review of our spending patterns to identify areas where we can reduce costs without compromising service quality. By implementing strategic purchasing practices and exploring new revenue streams, we can expand our programming without increasing student fees.

      Technology integration is essential for modern operations. I propose developing a comprehensive digital strategy that includes an improved student portal, mobile-friendly services, and data-driven decision making. These technological improvements will make it easier for students to engage with the union and for us to respond to student needs effectively.

      Transparency and accountability mechanisms will be strengthened under my leadership. I will establish clear performance metrics for all union operations, conduct regular audits, and publish detailed reports on our activities and expenditures. Students deserve to know that their union is operating ethically and effectively on their behalf.

      Staff development is crucial for operational excellence. I will invest in training and professional development for student employees and staff members, creating a work environment that values growth, innovation, and exceptional service. Well-supported staff members provide better services to our student body.

      Space utilization is another key aspect of my platform. I will conduct a thorough assessment of our facilities to ensure that we are maximizing the use of our spaces and that they are meeting student needs. This may include repurposing underutilized areas, creating more flexible multi-use spaces, and ensuring that our facilities are accessible to all students.

      My experience as Operations Manager for the Campus Recreation Center, Executive Assistant in the Student Affairs Office, and Project Coordinator for the University Strategic Planning Committee has equipped me with the organizational skills, attention to detail, and strategic thinking necessary for this role. I understand the complexities of university operations and am prepared to navigate them effectively.

      If elected, I promise to be a VP Operations who combines careful stewardship of resources with innovative thinking to enhance the student experience. Together, we can build a student union that operates smoothly behind the scenes so that students can focus on what matters most: their education and campus experience.`,
      goals: [
        "Optimize budget allocation",
        "Develop comprehensive digital strategy",
        "Establish clear performance metrics",
        "Improve space utilization",
      ],
    },
    {
      id: 5,
      name: "Casey Zhang",
      position: "vp-campus-life",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      platform: `As a candidate for VP Campus Life, I am passionate about creating a vibrant, inclusive, and engaging campus community where every student can find their place and thrive. My platform is built on enhancing student experiences through diverse programming, community building, and holistic support.

      Event diversity is central to my vision. I will work to expand our programming to include a wider range of cultural celebrations, academic events, recreational activities, and social gatherings that appeal to our diverse student body. By offering varied events, we can ensure that all students find opportunities for connection and engagement that resonate with their interests and backgrounds.

      Community building initiatives will be a priority under my leadership. I plan to establish more inter-residence competitions, faculty-based social events, and campus-wide traditions that foster school spirit and create a sense of belonging. These connections are vital for student retention, mental health, and overall satisfaction with the university experience.

      Club and organization support will be strengthened to empower student-led initiatives. I will advocate for increased funding, simplified administrative processes, and enhanced promotional support for student groups. Additionally, I will create more opportunities for collaboration between organizations to maximize their impact and reach.

      Wellness programming is essential for supporting students holistically. I will expand our offerings to include more stress-reduction workshops, physical activity options, nutrition education, and mental health awareness events. By promoting well-being in all its dimensions, we can help students maintain balance and resilience throughout their academic journey.

      Inclusive spaces and programming will ensure that all students feel welcomed and valued. I will work with diverse student groups to create events and initiatives that celebrate our multicultural campus, support LGBTQ+ students, accommodate students with disabilities, and address the unique needs of international and first-generation students.

      My experience as Residence Council President, Events Coordinator for the International Students Association, and Wellness Ambassador has given me insight into the diverse needs of our student body and the skills to create meaningful programming. I understand the logistical challenges of event planning and the importance of creating inclusive spaces where all students can participate fully.

      If elected, I promise to be a VP Campus Life who listens to student feedback, responds to evolving needs, and works tirelessly to create a campus community where everyone can find connection, support, and enjoyment. Together, we can make our university not just a place to earn a degree, but a place to build lasting memories and relationships.`,
      goals: [
        "Expand diverse event programming",
        "Establish new campus traditions",
        "Increase support for student organizations",
        "Develop comprehensive wellness initiatives",
      ],
    },
    {
      id: 6,
      name: "Morgan Williams",
      position: "vp-education",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      platform: `As a candidate for VP Education, I am committed to enhancing the academic experience of all students through advocacy, resource development, and educational innovation. My platform focuses on creating an environment where every student has the support and opportunities they need to achieve academic excellence.

      Academic advocacy is the foundation of my platform. I will represent student interests in discussions about curriculum development, assessment methods, and academic policies. By amplifying student voices in these conversations, we can ensure that our education remains relevant, engaging, and responsive to our needs and goals.

      Learning resource expansion is essential for supporting diverse learning styles and needs. I will work to increase access to textbooks through expanded reserve collections and open educational resources, develop more peer tutoring programs, and create study groups for challenging courses. These resources will help all students maximize their learning potential.

      Technology integration in education will prepare us for future success. I propose working with faculty to incorporate more digital tools and skills into our courses, expanding online learning options for greater flexibility, and ensuring that all students have access to the technology they need for academic success.

      Research opportunities should be available to undergraduate students across all disciplines. I will advocate for expanded research assistantships, create a database of research opportunities, and organize an undergraduate research symposium to showcase student work. These experiences enhance learning and provide valuable skills for future careers.

      Academic support services must be accessible and effective. I will work to extend tutoring center hours, expand writing and math support services, and develop more resources for students with learning disabilities. By strengthening these services, we can help all students overcome academic challenges and reach their full potential.

      My experience as a Teaching Assistant, Academic Affairs Committee Member, and Peer Tutor has given me insight into both the student and instructional perspectives on education. I understand the challenges students face in their academic journeys and the importance of having strong support systems in place.

      If elected, I promise to be a VP Education who advocates passionately for academic quality and student success, works collaboratively with faculty and administration, and remains responsive to the evolving educational needs of our diverse student body. Together, we can create an academic environment that challenges, supports, and inspires every student.`,
      goals: [
        "Strengthen student voice in academic decisions",
        "Expand access to learning resources",
        "Increase undergraduate research opportunities",
        "Enhance academic support services",
      ],
    },
  ]

  // Group candidates by position
  const candidatesByPosition = positions.reduce((acc, position) => {
    acc[position.id] = candidates.filter((candidate) => candidate.position === position.id)
    return acc
  }, {})

  const filteredCandidates = candidates.filter((candidate) => {
    return (
      (activePosition === "all" || candidate.position === activePosition) &&
      (candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.platform.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  })

  const toggleCandidate = (id, event) => {
    // Prevent event bubbling
    if (event) event.stopPropagation()
    setExpandedCandidate(expandedCandidate === id ? null : id)
  }

  return (
    <div className="candidates-page">
      <style>{buttonStyles}</style>
      <header className={`header ${isScrolled ? "scrolled" : ""}`}>
        <div className="container header-container">
          <div className="header-left">
            <Link to="/" className="home-link">
              <Home size={20} />
              <span>Home</span>
            </Link>
            <div className="logo-container">
              <img src="/img/logo.png" alt="Trent University Logo" className="header-logo" />
              <h1>TBSA Elections 2024-2025</h1>
            </div>
          </div>
          <div className="search-container">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search candidates or platforms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      </header>

      <div className="hero-section">
        <div className="overlay">
          <h2 className="fade-in">Meet Your Candidates</h2>
          <p className="fade-in delay">Learn about the platforms and vote for your future leaders</p>
        </div>
      </div>

      <div className="container main-content">
        <div className="position-filter">
          <button className={activePosition === "all" ? "active" : ""} onClick={() => setActivePosition("all")}>
            All Positions
          </button>
          {positions.map((position) => (
            <button
              key={position.id}
              className={activePosition === position.id ? "active" : ""}
              onClick={() => setActivePosition(position.id)}
            >
              {position.title}
            </button>
          ))}
        </div>

        {activePosition === "all" ? (
          // Display all positions with their candidate summaries
          positions.map((position) => (
            <div key={position.id} className="position-section">
              <h2 className="position-title">{position.title}</h2>
              {candidatesByPosition[position.id]?.length > 0 ? (
                <>
                  <div className="candidates-summary">
                    {candidatesByPosition[position.id].map((candidate) => (
                      <div key={candidate.id} className="candidate-summary-card">
                        <div className="candidate-summary-image" onClick={(e) => toggleCandidate(candidate.id, e)}>
                          <img src={candidate.image || "/placeholder.svg"} alt={candidate.name} />
                        </div>
                        <h3 onClick={(e) => toggleCandidate(candidate.id, e)}>{candidate.name}</h3>
                        <div className="candidate-profile-links">
                          {candidate.resume && (
                            <a
                              href={candidate.resume}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="profile-button resume-button"
                              onClick={(e) => e.stopPropagation()}
                            >
                              Resume
                            </a>
                          )}
                          {candidate.linkedin && (
                            <a
                              href={candidate.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="profile-button linkedin-button"
                              onClick={(e) => e.stopPropagation()}
                            >
                              LinkedIn
                            </a>
                          )}
                        </div>
                        <div className="candidate-summary-goals" onClick={(e) => toggleCandidate(candidate.id, e)}>
                          <p>{candidate.goals[0]}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="candidates-grid">
                    {candidatesByPosition[position.id].map((candidate) => (
                      <div key={candidate.id} className="candidate-card">
                        <div className="candidate-header" onClick={(e) => toggleCandidate(candidate.id, e)}>
                          <div className="candidate-image-container">
                            <img
                              src={candidate.image || "/placeholder.svg"}
                              alt={candidate.name}
                              className="candidate-image"
                            />
                          </div>
                          <div className="candidate-info">
                            <h3>{candidate.name}</h3>
                            <p className="candidate-position">{position.title}</p>
                          </div>
                          <div className="expand-icon">
                            {expandedCandidate === candidate.id ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                          </div>
                        </div>

                        {expandedCandidate === candidate.id && (
                          <div className="candidate-platform" onClick={(e) => e.stopPropagation()}>
                            <h4>Platform</h4>
                            <p>{candidate.platform}</p>                            
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p className="no-candidates">No candidates for this position yet.</p>
              )}
            </div>
          ))
        ) : (
          // Display only the selected position
          <div className="position-section">
            <h2 className="position-title">
              {positions.find((p) => p.id === activePosition)?.title || activePosition}
            </h2>

            {filteredCandidates.length > 0 ? (
              <>
                <div className="candidates-summary">
                  {filteredCandidates.map((candidate) => (
                    <div key={candidate.id} className="candidate-summary-card">
                      <div className="candidate-summary-image" onClick={(e) => toggleCandidate(candidate.id, e)}>
                        <img src={candidate.image || "/placeholder.svg"} alt={candidate.name} />
                      </div>
                      <h3 onClick={(e) => toggleCandidate(candidate.id, e)}>{candidate.name}</h3>
                      <div className="candidate-profile-links">
                        {candidate.resume && (
                          <a
                            href={candidate.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="profile-button resume-button"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Resume
                          </a>
                        )}
                        {candidate.linkedin && (
                          <a
                            href={candidate.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="profile-button linkedin-button"
                            onClick={(e) => e.stopPropagation()}
                          >
                            LinkedIn
                          </a>
                        )}
                      </div>
                      <div className="candidate-summary-goals" onClick={(e) => toggleCandidate(candidate.id, e)}>
                        <p>{candidate.goals[0]}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="candidates-grid">
                  {filteredCandidates.map((candidate) => (
                    <div key={candidate.id} className="candidate-card">
                      <div className="candidate-header" onClick={(e) => toggleCandidate(candidate.id, e)}>
                        <div className="candidate-image-container">
                          <img
                            src={candidate.image || "/placeholder.svg"}
                            alt={candidate.name}
                            className="candidate-image"
                          />
                        </div>
                        <div className="candidate-info">
                          <h3>{candidate.name}</h3>
                          <p className="candidate-position">
                            {positions.find((p) => p.id === candidate.position)?.title || candidate.position}
                          </p>
                        </div>
                        <div className="expand-icon">
                          {expandedCandidate === candidate.id ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                        </div>
                      </div>

                      {expandedCandidate === candidate.id && (
                        <div className="candidate-platform" onClick={(e) => e.stopPropagation()}>
                          <h4>Platform</h4>
                          <p>{candidate.platform}</p>

                          <h4>Key Goals</h4>
                          <ul className="goals-list">
                            {candidate.goals.map((goal, index) => (
                              <li key={index} className="goal-item">
                                {goal}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="no-candidates">No candidates match your search criteria.</p>
            )}
          </div>
        )}
      </div>
      <Contact />
    </div>
  )
}

export default CandidatePlatforms;

