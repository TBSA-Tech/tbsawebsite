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
                    <a
                      href={props.data ? props.data.instagram : "/"}
                      className="mcf_social_link"
                      aria-label="Instagram"
                      target="_blank" rel="noopener noreferrer"
                    >
                      <svg className="mcf_social_icon" viewBox="0 0 24 24">
                        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.25-.75a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z" />
                      </svg>
                    </a>

                    <a
                      href={props.data ? props.data.linkedinn : "/"}
                      className="mcf_social_link"
                      aria-label="LinkedIn"
                      target="_blank" rel="noopener noreferrer"
                    >          
                      <svg className="mcf_social_icon" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                      </svg>
                    </a>

                    <a href={props.data ? props.data.tiktok : "/"} className="mcf_social_link" aria-label="TikTok" target="_blank" rel="noopener noreferrer">
                      <svg className="mcf_social_icon" viewBox="0 0 24 24">
                        <path d="M12.53.02C13.84 0 15.14.01 16.44.02c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
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