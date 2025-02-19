import React, { useState, useEffect } from "react";
import "./services.css";

export const Services = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const events = [
    {
      date: "2024-02-15",
      title: "Business Network Night",
      type: "Networking",
      location: "Trent Student Centre",
      time: "6:00 PM - 8:00 PM"
    },
    {
      date: "2024-01-20",
      title: "Case Competition Workshop",
      type: "Workshop",
      location: "Bata Library",
      time: "2:00 PM - 4:00 PM"
    },
    {
      date: "2024-01-25",
      title: "Alumni Speaker Series",
      type: "Speaker",
      location: "Gzowski College",
      time: "5:30 PM - 7:00 PM"
    }
  ];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    return { days, firstDay };
  };

  const changeMonth = (offset) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() + offset);
    setCurrentMonth(newDate);
  };

  const { days, firstDay } = getDaysInMonth(currentMonth);

  return (
    <div id="services" className="trent-events-section">
      <div className="container">
        <div className="section-title text-center">
          <h2>Our Events</h2>
          <p>Join us for exciting business networking and learning opportunities</p>
        </div>

        <div className="trent-calendar-container">
          <div className="trent-calendar-header">
            <button 
              className="trent-calendar-nav" 
              onClick={() => changeMonth(-1)}
            >
              &#8249;
            </button>
            <h3>
              {currentMonth.toLocaleString('default', { 
                month: 'long', 
                year: 'numeric' 
              })}
            </h3>
            <button 
              className="trent-calendar-nav" 
              onClick={() => changeMonth(1)}
            >
              &#8250;
            </button>
          </div>

          <div className="trent-calendar-grid">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="trent-calendar-day-header">
                {day}
              </div>
            ))}
            
            {[...Array(firstDay)].map((_, i) => (
              <div key={`empty-${i}`} className="trent-calendar-day empty"></div>
            ))}

            {[...Array(days)].map((_, i) => (
              <div 
                key={i + 1} 
                className={`trent-calendar-day ${
                  events.some(event => 
                    new Date(event.date).getDate() === (i + 1) &&
                    new Date(event.date).getMonth() === currentMonth.getMonth()
                  ) ? 'has-event' : ''
                }`}
              >
                <span className="day-number">{i + 1}</span>
                {events
                  .filter(event => 
                    new Date(event.date).getDate() === (i + 1) &&
                    new Date(event.date).getMonth() === currentMonth.getMonth()
                  )
                  .map((event, index) => (
                    <div key={index} className="trent-event-indicator">
                      <div className="event-tooltip">
                        <h4>{event.title}</h4>
                        <p>{event.time}</p>
                        <p>{event.location}</p>
                      </div>
                    </div>
                  ))
                }
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};