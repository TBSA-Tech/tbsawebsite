import { useState } from "react";
import emailjs from "@emailjs/browser";
import React from "react";
import './contact.css'; // New CSS filename to avoid conflicts

const initialState = {
  name: "",
  email: "",
  message: "",
};

export const Contact = (props) => {
  const [{ name, email, message }, setState] = useState(initialState);
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    success: false,
    error: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };
  
  const clearState = () => setState({ ...initialState });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, message);
    setFormStatus({ submitting: true, success: false, error: false });
    
    // EmailJS configuration
    const serviceID = 'service_b3u5lhr';
    const templateID = 'template_0q56fak';
    const publicKey = 'BsM90qb91TYCjluXN';
    
    // Prepare template parameters
    const templateParams = {
      from_name: name,
      reply_to: email,
      message: message,
      to_name: "Website Admin", // Add recipient name
    };
    
    // Use the newer version of the EmailJS API
    emailjs
      .send(serviceID, templateID, templateParams, publicKey)
      .then(
        (result) => {
          console.log("Email sent successfully:", result.text);
          clearState();
          setFormStatus({ submitting: false, success: true, error: false });
          setTimeout(() => setFormStatus(prev => ({ ...prev, success: false })), 5000);
        },
        (error) => {
          console.error("Failed to send email:", error.text);
          setFormStatus({ submitting: false, success: false, error: true });
        }
      );
  };

  return (
    <div>
      <section id="contact" className="mcf_contact_section">
        <div className="mcf_container">
          <div className="mcf_section_header">
            <h2 className="mcf_title">Get In Touch</h2>
            <div className="mcf_title_accent"></div>
            <p className="mcf_subtitle">
              We'd love to hear from you! Fill out the form below and we'll respond as soon as possible.
            </p>
          </div>

          <div className="mcf_content_wrapper">
            {/* Contact Form */}
            <div className="mcf_form_container">
              <form name="sentMessage" validate onSubmit={handleSubmit} className="mcf_form">
                <div className="mcf_form_fields">
                  <div className="mcf_input_group">
                    <div className="mcf_input_wrapper">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="mcf_input"
                        required
                        onChange={handleChange}
                        value={name}
                      />
                      <label htmlFor="name" className={`mcf_floating_label ${name ? 'mcf_active' : ''}`}>
                        Name
                      </label>
                      <div className="mcf_input_border"></div>
                    </div>
                  </div>
                  
                  <div className="mcf_input_group">
                    <div className="mcf_input_wrapper">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="mcf_input"
                        required
                        onChange={handleChange}
                        value={email}
                      />
                      <label htmlFor="email" className={`mcf_floating_label ${email ? 'mcf_active' : ''}`}>
                        Email
                      </label>
                      <div className="mcf_input_border"></div>
                    </div>
                  </div>
                </div>
                
                <div className="mcf_input_group mcf_textarea_group">
                  <div className="mcf_input_wrapper">
                    <textarea
                      name="message"
                      id="message"
                      className="mcf_textarea"
                      rows="4"
                      required
                      onChange={handleChange}
                      value={message}
                    ></textarea>
                    <label htmlFor="message" className={`mcf_floating_label ${message ? 'mcf_active' : ''}`}>
                      Message
                    </label>
                    <div className="mcf_input_border"></div>
                  </div>
                </div>
                
                <div className="mcf_form_status">
                  {formStatus.success && (
                    <div className="mcf_success_message">
                      <svg className="mcf_status_icon" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                      </svg>
                      <span>Message sent successfully!</span>
                    </div>
                  )}
                  {formStatus.error && (
                    <div className="mcf_error_message">
                      <svg className="mcf_status_icon" viewBox="0 0 24 24">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                      </svg>
                      <span>Failed to send message. Please try again.</span>
                    </div>
                  )}
                </div>
                
                <button 
                  type="submit" 
                  className={`mcf_submit_btn ${formStatus.submitting ? 'mcf_submitting' : ''}`}
                  disabled={formStatus.submitting}
                >
                  <span className="mcf_btn_text">{formStatus.submitting ? 'Sending...' : 'Send Message'}</span>
                  <span className="mcf_btn_icon">
                    <svg viewBox="0 0 24 24">
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                    </svg>
                  </span>
                </button>
              </form>
            </div>
            
            {/* Contact Info */}
            <div className="mcf_info_container">
              <div className="mcf_info_card">
                <h3 className="mcf_info_title">Contact Details</h3>
                
                <div className="mcf_info_list">
                  <div className="mcf_info_item">
                    <div className="mcf_info_icon">
                      <svg viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                    </div>
                    <div className="mcf_info_content">
                      <span className="mcf_info_label">Location</span>
                      <p className="mcf_info_text">{props.data ? props.data.address : "Our Address"}</p>
                    </div>
                  </div>
                  
                  <div className="mcf_info_item">
                    <div className="mcf_info_icon">
                      <svg viewBox="0 0 24 24">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                      </svg>
                    </div>
                    <div className="mcf_info_content">
                      <span className="mcf_info_label">Phone</span>
                      <p className="mcf_info_text">{props.data ? props.data.phone : "+1 (123) 456-7890"}</p>
                    </div>
                  </div>
                  
                  <div className="mcf_info_item">
                    <div className="mcf_info_icon">
                      <svg viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                      </svg>
                    </div>
                    <div className="mcf_info_content">
                      <span className="mcf_info_label">Email</span>
                      <p className="mcf_info_text">{props.data ? props.data.email : "contact@example.com"}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mcf_social">
                  <h4 className="mcf_social_title">Connect With Us</h4>
                  <div className="mcf_social_icons">
                    <a href={props.data ? props.data.facebook : "/"} className="mcf_social_link" aria-label="Facebook">
                      <svg className="mcf_social_icon" viewBox="0 0 24 24">
                        <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C18.34 21.21 22 17.06 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
                      </svg>
                    </a>
                    <a href={props.data ? props.data.twitter : "/"} className="mcf_social_link" aria-label="Twitter">
                      <svg className="mcf_social_icon" viewBox="0 0 24 24">
                        <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                      </svg>
                    </a>
                    <a href={props.data ? props.data.youtube : "/"} className="mcf_social_link" aria-label="YouTube">
                      <svg className="mcf_social_icon" viewBox="0 0 24 24">
                        <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <footer id="footer" className="mcf_footer">
        <div className="mcf_footer_container">
          <p className="mcf_footer_text">
            &copy; {new Date().getFullYear()} TBSA Website{" "}
            
          </p>
        </div>
      </footer>
    </div>
  );
};