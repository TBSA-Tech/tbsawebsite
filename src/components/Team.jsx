import React, { useState, useEffect } from "react";
import "./Team.css"; // We'll create this CSS file

export const Team = (props) => {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(8); // Increased from 8 to 12

    // Predefined order of departments
    const departmentOrder = [
      "Executive Board",
      "Finance",
      "Marketing",
      "Corporate Affairs",
      "Communications",
      "Events",
      "Human Resources",
      "Student Representatives"
    ];
  
   // Get unique categories and sort them according to departmentOrder
   const categories = props.data 
   ? [...new Set(props.data.map(member => member.department || "Other"))]
       .sort((a, b) => {
         return departmentOrder.indexOf(a) - departmentOrder.indexOf(b);
       })
   : [];
  
   const filteredTeam = props.data 
   ? props.data.filter(member => {
       const matchesFilter = filter === "all" || member.department === filter;
       const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           (member.job && member.job.toLowerCase().includes(searchTerm.toLowerCase()));
       return matchesFilter && matchesSearch;
     })
   : [];

    // Sort team members by department order and then by job title
  const sortedTeam = [...filteredTeam].sort((a, b) => {
    const deptComparison = departmentOrder.indexOf(a.department) - departmentOrder.indexOf(b.department);
    if (deptComparison !== 0) return deptComparison;
    
    // Within same department, sort by job title (executives first)
    const isExecA = a.job.toLowerCase().includes('president') || a.job.toLowerCase().includes('vp');
    const isExecB = b.job.toLowerCase().includes('president') || b.job.toLowerCase().includes('vp');
    if (isExecA && !isExecB) return -1;
    if (!isExecA && isExecB) return 1;
    return 0;
  });

  const loadMore = () => {
    setVisibleCount(prev => prev + 8);
  };
  
  const showAll = () => {
    setVisibleCount(filteredTeam.length);
  };

  // Reset visible count when filter or search changes
  useEffect(() => {
    setVisibleCount(12);
  }, [filter, searchTerm]);

  return (
    <div id="team" className="team-section">
      <div className="container">
        <div className="section-title text-center">
          <h2>Meet the Team</h2>
          <p className="section-subtitle">
            Our talented professionals working together to achieve excellence
          </p>
          
          {/* Search and filter controls */}
          <div className="team-controls">
            <div className="search-box">
              <input 
                type="text" 
                placeholder="Search team members..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="team-search"
              />
            </div>
            
            <div className="filter-buttons">
              <button 
                className={`filter-btn ${filter === "all" ? "active" : ""}`}
                onClick={() => setFilter("all")}
              >
                All
              </button>
              {categories.map(category => (
                <button 
                  key={category}
                  className={`filter-btn ${filter === category ? "active" : ""}`}
                  onClick={() => setFilter(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Team members count display */}
        <div className="team-count">
          <p>Showing {Math.min(visibleCount, filteredTeam.length)} of {filteredTeam.length} team members</p>
        </div>
        
        {/* Team members grid */}
        <div className="team-grid">
          {filteredTeam.length > 0 ? 
            filteredTeam.slice(0, visibleCount).map((member, i) => (
              <div 
                key={`${member.name}-${i}`} 
                className="team-member"
                style={{ animationDelay: `${Math.min(i, 10) * 0.1}s` }}
              >
                <div className="member-card">
                  <div className="member-image-container">
                    <img src={member.img} alt={member.name} className="member-image" />
                    <div className="member-overlay">
                      <div className="member-social">
                        {member.social && member.social.linkedin && (
                          <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                            <i className="fa fa-linkedin"></i>
                          </a>
                        )}
                        {member.social && member.social.twitter && (
                          <a href={member.social.twitter} target="_blank" rel="noopener noreferrer">
                            <i className="fa fa-twitter"></i>
                          </a>
                        )}
                        {member.social && member.social.email && (
                          <a href={`mailto:${member.social.email}`}>
                            <i className="fa fa-envelope"></i>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="member-info">
                    <h3 className="member-name">{member.name}</h3>
                    <p className="member-title">{member.job}</p>
                    {member.department && (
                      <span className="member-department">{member.department}</span>
                    )}
                  </div>
                </div>
              </div>
            ))
            : <div className="no-results">No team members found</div>
          }
        </div>
        
        {/* Load more buttons */}
        {filteredTeam.length > visibleCount && (
          <div className="load-more-container">
            <button className="load-more-btn" onClick={loadMore}>
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};