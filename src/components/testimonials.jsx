import React, { useEffect } from "react";
import "./testimonials.css"; 

export const Testimonials = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    document.querySelectorAll(".testimonial").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const testimonials = [
    {
      name: "Riya Girish Jaykar",
      position: "President, TBSA",
      text: "Being part of the Trent Business Students' Association has opened countless doors for me. The networking events and case competitions helped me secure my dream internship!",
      img: "img/testimonials/riya.jpeg",
    },
    {
      name: "Yash ",
      position: "Vice President, TBSA",
      text: "TBSA provided me with leadership opportunities that set me apart in job interviews. The mentorship program was invaluable for my professional development.",
      img: "img/team/Yash_VP.JPG",
    },
    {
      name: "Mitanshu",
      position: "3rd Year Rep, TBSA",
      text: "Leading marketing initiatives for TBSA has given me real-world experience that perfectly complements my business degree. The supportive community here is unmatched!",
      img: "img/team/Mitanshu.JPG",
    },
  ];

  return (
    <div id="testimonials">
      <div className="container">
        <div className="tbsa-section-title text-center">
          <h2>Student Voices</h2>
          <p className="section-subtitle">Hear from our TBSA community</p>
        </div>
        <div className="row">
          {testimonials.map((d, i) => (
            <div key={`${d.name}-${i}`} className="col-md-4">
              <div className="testimonial">
                <div className="testimonial-image">
                  <img src={d.img} alt={d.name} />
                </div>
                <div className="testimonial-content">
                  <p className="testimonial-text">"{d.text}"</p>
                  <div className="testimonial-meta">
                    <h4>{d.name}</h4>
                    <p>{d.position}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};