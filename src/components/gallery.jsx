import { Image } from "./image";
import React, { useState, useEffect } from "react";
import "./gallery.css";

export const Gallery = (props) => {
  const [animated, setAnimated] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    setAnimated(true);
    
    // For scroll animations
    const handleScroll = () => {
      const galleryItems = document.querySelectorAll('.tbsa-gallery-item');
      galleryItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (itemTop < windowHeight - 100) {
          item.classList.add('tbsa-visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to open the modal with the selected image
  const openImageModal = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  // Function to close the modal
  const closeImageModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  // Placeholder images with Trent University theme and different project titles
  const placeholderImages = props.data || [
    {
      title: "Student Leadership Conference",
      projectTitle: "Annual Leadership Summit",
      smallImage: "img/gallery/01-small.jpg",
      largeImage: "img/gallery/01-large.jpg",
    },
    {
      title: "Cultural Festival",
      projectTitle: "Diversity Celebration",
      smallImage: "img/gallery/02-small.jpg",
      largeImage: "img/gallery/02-large.jpg",
    },
    {
      title: "Research Symposium",
      projectTitle: "Academic Excellence",
      smallImage: "img/gallery/03-small.jpg",
      largeImage: "img/gallery/03-large.jpg",
    },
    {
      title: "Sports Tournament",
      projectTitle: "Athletic Competition",
      smallImage: "img/gallery/04-small.jpg",
      largeImage: "img/gallery/04-large.jpg",
    },
    {
      title: "Alumni Gathering",
      projectTitle: "Network Building",
      smallImage: "img/gallery/05-small.jpg",
      largeImage: "img/gallery/05-large.jpg",
    },
    {
      title: "Orientation Week",
      projectTitle: "Welcome Program",
      smallImage: "img/gallery/06-small.jpg",
      largeImage: "img/gallery/06-large.jpg",
    },
  ];

  return (
    <div id="portfolio" className="tbsa-gallery-section">
      <div className="tbsa-gallery-container">
        <div className={`tbsa-section-title text-center ${animated ? 'tbsa-fade-in' : ''}`}>
          <h2>Gallery</h2>
          <div className="tbsa-title-underline"></div>
          <p className="section-subtitle">
            Explore the vibrant moments and highlights from our TBSA events and activities
          </p>
        </div>
        
        <div className="tbsa-gallery-grid">
          {placeholderImages.map((item, i) => (
            <div
              key={`${item.title}-${i}`}
              className={`tbsa-gallery-item ${animated ? 'tbsa-animate-in' : ''}`}
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              <div className="tbsa-gallery-item-inner">
                <div className="tbsa-gallery-image-wrapper">
                  <img 
                    src={item.smallImage} 
                    alt={item.title} 
                    className="tbsa-gallery-image" 
                  />
                  <div className="tbsa-gallery-overlay">
                    <div className="tbsa-gallery-info">
                      <span 
                        className="tbsa-gallery-zoom" 
                        onClick={(e) => {
                          e.stopPropagation();
                          openImageModal(item);
                        }}
                      >
                        <i className="fa fa-search-plus"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Modal/Popup */}
      {selectedImage && (
        <div className="tbsa-image-modal" onClick={closeImageModal}>
          <div className="tbsa-modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="tbsa-modal-close" onClick={closeImageModal}>
              <i className="fa fa-times"></i>
            </span>
            <img 
              src={selectedImage.largeImage} 
              alt={selectedImage.title} 
              className="tbsa-modal-image" 
            />
          </div>
        </div>
      )}
    </div>
  );
};