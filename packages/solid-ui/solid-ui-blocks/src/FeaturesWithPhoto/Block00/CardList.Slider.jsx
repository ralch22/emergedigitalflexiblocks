import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './CardList.Slider.css'; // Import your CSS file for styling

const images = [
  'https://emergedigital.ae/wp-content/uploads/2022/07/Marketplace-1-1024x666.jpg',
  'https://emergedigital.ae/wp-content/uploads/2022/07/Marketplace-2-1024x554.jpg'
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="slider">
      <AnimatePresence exitBeforeEnter initial={false}>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="image"
        />
      </AnimatePresence>
      <button className="prev-button" onClick={prevSlide}>
        Previous
      </button>
      <button className="next-button" onClick={nextSlide}>
        Next
      </button>
      <div className="dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
