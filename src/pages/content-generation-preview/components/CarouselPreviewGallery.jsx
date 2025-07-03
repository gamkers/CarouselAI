import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CarouselPreviewGallery = ({ slides, currentSlideIndex, onSlideChange }) => {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const slideRef = useRef(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentSlideIndex < slides.length - 1) {
      onSlideChange(currentSlideIndex + 1);
    }
    if (isRightSwipe && currentSlideIndex > 0) {
      onSlideChange(currentSlideIndex - 1);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlideIndex > 0) {
      onSlideChange(currentSlideIndex - 1);
    }
  };

  const handleNextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      onSlideChange(currentSlideIndex + 1);
    }
  };

  const currentSlide = slides[currentSlideIndex];

  return (
    <div className="bg-surface rounded-lg border border-border overflow-hidden elevation-1">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-text-primary">
          Carousel Preview
        </h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-secondary-600">
            {currentSlideIndex + 1} / {slides.length}
          </span>
          <div className="flex items-center space-x-1">
            <button
              onClick={handlePrevSlide}
              disabled={currentSlideIndex === 0}
              className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-secondary-100 disabled:opacity-50 disabled:cursor-not-allowed micro-scale transition-all duration-150"
              aria-label="Previous slide"
            >
              <Icon name="ChevronLeft" size={16} />
            </button>
            <button
              onClick={handleNextSlide}
              disabled={currentSlideIndex === slides.length - 1}
              className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-secondary-100 disabled:opacity-50 disabled:cursor-not-allowed micro-scale transition-all duration-150"
              aria-label="Next slide"
            >
              <Icon name="ChevronRight" size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Slide Display */}
      <div className="relative">
        {/* Slide Container */}
        <div
          ref={slideRef}
          style={{
            width: '100%',
            aspectRatio: '4 / 5',
            backgroundColor: '#f3f4f6',
            overflow: 'hidden',
            cursor: 'grab'
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Background Image ONLY */}
          <Image
            src={currentSlide?.backgroundImage}
            alt={`Slide ${currentSlideIndex + 1} background`}
            className="w-full h-full object-cover"
            style={{ aspectRatio: '4 / 5', width: '100%', height: 'auto' }}
          />
        </div>
      </div>

      {/* Thumbnail Strip - Desktop */}
      <div className="hidden md:block p-4 border-t border-border">
        <div className="flex space-x-3 overflow-x-auto">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => onSlideChange(index)}
              className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-150 micro-scale ${
                index === currentSlideIndex 
                  ? 'border-primary' :'border-transparent hover:border-secondary-300'
              }`}
            >
              <Image
                src={slide.backgroundImage}
                alt={`Slide ${index + 1} thumbnail`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                <span className="text-white text-xs font-medium">
                  {index + 1}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Thumbnail Strip */}
      <div className="md:hidden p-4 border-t border-border">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => onSlideChange(index)}
              className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-150 ${
                index === currentSlideIndex 
                  ? 'border-primary' :'border-transparent'
              }`}
            >
              <Image
                src={slide.backgroundImage}
                alt={`Slide ${index + 1} thumbnail`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                <span className="text-white text-xs font-medium">
                  {index + 1}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarouselPreviewGallery;