import React, { useState, useEffect } from "react";
import "./services.css";

export const Services = () => {
  // Start the calendar on the current month
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [animatingOut, setAnimatingOut] = useState(false);

  // Updated events with dates across multiple months
  const events = [
    // January 2025 Events
    {
      date: "2025-01-17",
      title: "RBC Future Launch",
      type: "Networking",
      location: "Trent Student Centre",
      time: "7:00 PM - 9:00 PM",
      description:
        "The Trent Business Students Association hosted their first event of the semester in collaboration with RBC Future Champs, showcasing essential career development strategies. Attendees learned valuable LinkedIn optimization techniques, resume best practices, and practical approaches to fraud prevention.",
      bannerImage:
        "img/events/rbc_banner.jpeg",
      galleryImages: [
        "img/events/rbc_banner.jpeg",
        "img/events/rbc_pic1.jpeg",
        "img/events/rbc_pic2.jpeg",
      ]
    },
    {
      date: "2025-01-31",
      title: "Company Crawl",
      type: "Networking",
      location: "Peterborough, Ontario",
      time: "11:00 AM - 3:00 PM",
      description:
        "The Trent Business Students Association (TBSA) hosted a company crawl, where students explored five local businesses in downtown Peterborough. The event provided valuable networking opportunities, allowing participants to engage with business owners and gain insights into different industries.",
      bannerImage:
        "img/events/CC_crawl-banner.jpeg",
      galleryImages: [
        "img/events/CC-4.jpeg",
        "img/events/CC-3.jpeg",
        "img/events/CC-2.jpeg",
        "img/events/CC-6.jpeg",
        "img/events/CC-5.jpeg",
        "img/events/CC-7.jpeg",
      ]
    },
    {
      date: "2025-01-20",
      title: "The Trentpreneur Radio Show",
      type: "Workshop",
      location: "Peterborough, Ontario",
      time: "11:00 AM - 3:00 PM",
      description:
        "The Trentpreneur Show was broadcasted by two TBSA Executives every Monday at Trent Radio. Listeners explored entrepreneurship, innovation, and additional thought-provoking topics in each session.",
      bannerImage:
        "img/events/radioShow-2.jpeg",
      galleryImages: [
        "img/events/radioShow-1.jpeg",
        "img/events/radioShow-2.jpeg",
      ]
    },
    {
      date: "2025-01-27",
      title: "The Trentpreneur Radio Show",
      type: "Workshop",
      location: "Peterborough, Ontario",
      time: "11:00 AM - 3:00 PM",
      description:
        "The Trentpreneur Show was broadcasted by two TBSA Executives every Monday at Trent Radio. Listeners explored entrepreneurship, innovation, and additional thought-provoking topics in each session.",
      bannerImage:
        "img/events/radioShow-1.jpeg",
      galleryImages: [
        "img/events/radioShow-2.jpeg",
        "img/events/radioShow-1.jpeg",
      ]
    },
    // February 2025 Events
    {
      date: "2025-02-03",
      title: "The Trentpreneur Radio Show",
      type: "Workshop",
      location: "Peterborough, Ontario",
      time: "11:00 AM - 3:00 PM",
      description:
        "The Trentpreneur Show was broadcasted by two TBSA Executives every Monday at Trent Radio. Listeners explored entrepreneurship, innovation, and additional thought-provoking topics in each session.",
      bannerImage:
      "img/events/radioShow-1.jpeg",
      galleryImages: [
        "img/events/radioShow-2.jpeg",
        "img/events/radioShow-1.jpeg",
      ]
    },
    {
      date: "2025-02-10",
      title: "The Trentpreneur Radio Show",
      type: "Workshop",
      location: "Peterborough, Ontario",
      time: "11:00 AM - 3:00 PM",
      description:
        "The Trentpreneur Show was broadcasted by two TBSA Executives every Monday at Trent Radio. Listeners explored entrepreneurship, innovation, and additional thought-provoking topics in each session.",
        bannerImage:
        "img/events/radioShow-2.jpeg",
      galleryImages: [
        "img/events/radioShow-2.jpeg",
        "img/events/radioShow-1.jpeg",
      ]
    },
    {
      date: "2025-02-15",
      title: "Building Bridges Gala",
      type: "Networking",
      location: "Canoe Museum, Peterborough, Ontario",
      time: "7:00 PM - 9:00 PM",
      description:
        "The Trent Business Students Association hosted the Building Bridges Business Gala at the stunning Canadian Canoe Museum, providing a sophisticated and historic setting for an evening of networking and celebration. Attendees enjoyed fine dining, live music, and meaningful connections with students, professors, and industry professionals.",
      bannerImage:
        "img/events/BB-banner.jpeg",
      galleryImages: [
        "img/events/BB-3.jpeg",
        "img/events/BB-2.jpeg",
        "img/events/BB-5.jpeg",
        "img/events/BB-4.jpeg",
      ]
    },

    // March 2025 Events
    {
      date: "2025-03-01",
      title: "Buy The River",
      type: "Competition",
      location: "Gzowski College, Trent University",
      time: "09:00 AM to 05:00 PM",
      description:
        "Trent’s first Finance Case Competition took place on March 1, 2025, challenging participants to showcase their financial expertise. Competitors engaged in a dynamic event filled with strategic problem-solving and high-stakes decision-making.",
      bannerImage:
        "img/events/BTB-banner.png",
      galleryImages: [
        "img/events/BTB-3.jpeg",
        "img/events/BTB-2.jpeg",
        "img/events/BTB-5.jpeg",
        "img/events/BTB-4.jpeg",
      ]
    },

    // October 2025 Events
    {
      date: "2025-10-03",
      title: "Corporate Crawl",
      type: "Networking",
      location: "Peterborough, Ontario",
      time: "11:00 AM - 3:00 PM",
      description:
        "Experience the Corporate Crawl: visit companies, meet professionals, and explore career opportunities.",
      bannerImage:
        "img/events/corporatecrawl2025/cc25Banner.png",
      galleryImages: [
        "/img/events/CC-1.jpeg",
        "/img/events/CC-2.jpeg",
        "/img/events/CC-4.jpeg",
        "/img/events/CC-6.jpeg",
      ],
      registerPath: "/corporatecrawl"
    }
  ];

  // Helper to get the number of days and first day of the month
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    return { days, firstDay };
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
    setAnimatingOut(false);
  };

  const closeModal = () => {
    setAnimatingOut(true);
    setTimeout(() => {
      setShowModal(false);
      setSelectedEvent(null);
      setAnimatingOut(false);
    }, 300);
  };

  // Compare using string formatting to avoid timezone issues
  const isDateInMonth = (dateString, monthDate) => {
    const [year, month] = dateString.split("-").map(Number);
    // month - 1 because JS Date months are 0-based
    return year === monthDate.getFullYear() && month - 1 === monthDate.getMonth();
  };

  // Compare the event's date with today's date
  const isPastEvent = (eventDate) => {
    const now = new Date();
    const eDate = new Date(eventDate);
    return eDate < now; 
  };

  // On mount: if current month has no events, jump to the next month with an upcoming event
  useEffect(() => {
    const today = new Date();
    const hasEventsThisMonth = events.some((event) => isDateInMonth(event.date, today));
    if (!hasEventsThisMonth) {
      const todayStartOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const upcoming = [...events]
        .map((e) => ({ ...e, _date: new Date(e.date) }))
        .filter((e) => e._date >= todayStartOfMonth)
        .sort((a, b) => a._date - b._date)[0];

      if (upcoming) {
        const d = upcoming._date;
        setCurrentMonth(new Date(d.getFullYear(), d.getMonth(), 1));
      }
    }
  }, []);

  const debugEvents = () => {
    console.log("Current Month:", currentMonth.getMonth(), currentMonth.getFullYear());
    console.log("Month Navigation Working:", true);
    events.forEach((event) => {
      console.log("Event:", event.title, "Date:", event.date);
    });
  };

  useEffect(() => {
    debugEvents();
  }, [currentMonth]);

  const changeMonth = (offset) => {
    console.log("Changing month with offset:", offset);
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() + offset);
    setCurrentMonth(newDate);
  };

  const formatEventDate = (dateString) => {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day).toLocaleDateString();
  };
  

  const { days, firstDay } = getDaysInMonth(currentMonth);

  // Generate calendar days array
  const calendarDays = [];

  // Empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(
      <div key={`empty-${i}`} className="trent-calendar-day empty"></div>
    );
  }

  // Days of the month with formatted date string matching the event date
  for (let i = 1; i <= days; i++) {
    const formattedDate = `${currentMonth.getFullYear()}-${(currentMonth.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${i.toString().padStart(2, "0")}`;

    const dayEvents = events.filter((event) => event.date === formattedDate);
    const hasEvents = dayEvents.length > 0;
    const currentDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      i
    );
    const isToday = new Date().toDateString() === currentDate.toDateString();

    calendarDays.push(
      <div
        key={i}
        className={`trent-calendar-day ${hasEvents ? "has-event" : ""} ${
          isToday ? "today" : ""
        }`}
      >
        <span className="day-number">{i}</span>
        {hasEvents && (
          <div className="trent-event-indicators">
            {dayEvents.map((event, index) => (
              <div
                key={index}
                className={`trent-event-indicator event-type-${event.type.toLowerCase()}`}
                onClick={() => handleEventClick(event)}
              >
                <span className="event-dot"></span>
                <span className="event-title">{event.title}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // List view for events in the current month
  const currentMonthEvents = events.filter((event) =>
    isDateInMonth(event.date, currentMonth)
  );

  return (
    <div id="services" className="trent-events-section">
      <div className="container">
        <div className="team-section-title text-center">
          <h2>Our Events</h2>
          <p className="section-subtitle">Join us for exciting business networking and learning opportunities</p>
        </div>

        <div className="trent-calendar-container">
          <div className="trent-calendar-header">
            <button
              className="trent-calendar-nav"
              onClick={() => changeMonth(-1)}
              aria-label="Previous month"
            >
              <span className="nav-icon">&#8249;</span>
            </button>
            <h3>
              {currentMonth.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </h3>
            <button
              className="trent-calendar-nav"
              onClick={() => changeMonth(1)}
              aria-label="Next month"
            >
              <span className="nav-icon">&#8250;</span>
            </button>
          </div>

          <div className="trent-calendar-grid">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="trent-calendar-day-header">
                {day}
              </div>
            ))}

            {calendarDays}
          </div>
        </div>

        {/* Month Events List View */}
        {currentMonthEvents.length > 0 ? (
          <div className="trent-events-list">
            <h3 className="events-list-title">
              Events in{" "}
              {currentMonth.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </h3>
            <div className="events-list-container">
              {currentMonthEvents.map((event, index) => (
                <div
                  key={index}
                  className="trent-event-card"
                  onClick={() => handleEventClick(event)}
                >
                  <div className="event-card-image">
                    {event.bannerImage ? (
                      <img src={event.bannerImage} alt={event.title} />
                    ) : (
                      <div className="event-card-placeholder"></div>
                    )}
                    <span
                      className={`event-type-badge ${event.type.toLowerCase()}`}
                    >
                      {event.type}
                    </span>
                  </div>
                  <div className="event-card-content">
                    <h4>{event.title}</h4>
                    <p className="event-date">
                      <i className="fa fa-calendar"></i>{" "}
                      {formatEventDate(event.date)}
                    </p>
                    <p className="event-location">
                      <i className="fa fa-map-marker"></i> {event.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Renders only one "No events" block if there are no events in the month
          <div className="trent-no-events">
            <h3 className="no-events-title">
              No events scheduled for{" "}
              {currentMonth.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </h3>
            <p>Check other months or check back later for updates.</p>
          </div>
        )}

        {/* Event Details Modal */}
        {showModal && selectedEvent && (
          <div
            className={`trent-event-modal-overlay ${
              animatingOut ? "fade-out" : "fade-in"
            }`}
            onClick={closeModal}
          >
            <div
              className={`trent-event-modal-content ${
                animatingOut ? "slide-out" : "slide-in"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {selectedEvent.bannerImage && (
                <div className="trent-event-modal-banner">
                  <img src={selectedEvent.bannerImage} alt={selectedEvent.title} />
                </div>
              )}
              <span className="trent-event-modal-close" onClick={closeModal}>
                &times;
              </span>
              <div className="trent-event-modal-header">
                <h3>{selectedEvent.title}</h3>
                <span
                  className={`event-type-badge ${selectedEvent.type.toLowerCase()}`}
                >
                  {selectedEvent.type}
                </span>
              </div>
              <div className="trent-event-modal-body">
                <p>
                  <strong>Date:</strong>{" "}
                  {formatEventDate(selectedEvent.date)}
                </p>
                <p>
                  <strong>Time:</strong> {selectedEvent.time}
                </p>
                <p>
                  <strong>Location:</strong> {selectedEvent.location}
                </p>
                <div className="event-description">
                  <strong>Description:</strong>
                  <p>{selectedEvent.description}</p>
                </div>

                {/* Render gallery when images exist */}
                {selectedEvent.galleryImages?.length > 0 && (
                  <div className="event-gallery">
                    <strong>Event Gallery:</strong>
                    <div className="gallery-container">
                      {selectedEvent.galleryImages.map((imgUrl, idx) => (
                        <div key={idx} className="gallery-image-wrapper">
                          <img src={imgUrl} alt={`Gallery image ${idx + 1}`} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {/* For future events, we keep "Register Now" button. 
                  You could also conditionally hide or show this button depending on your needs. */}
              {!isPastEvent(selectedEvent.date) && (
                <div className="trent-event-modal-footer">
                  {selectedEvent.registerPath ? (
                    <a className="trent-event-register-btn" href={selectedEvent.registerPath}>
                      Register Now
                    </a>
                  ) : (
                    <button className="trent-event-register-btn">Register Now</button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;