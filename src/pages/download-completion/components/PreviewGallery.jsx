import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PreviewGallery = ({ slides, title }) => {
  const [selectedSlide, setSelectedSlide] = useState(null);

  const openModal = (slide) => {
    setSelectedSlide(slide);
  };

  const closeModal = () => {
    setSelectedSlide(null);
  };

  const nextSlide = () => {
    const currentIndex = slides.findIndex(slide => slide.id === selectedSlide.id);
    const nextIndex = (currentIndex + 1) % slides.length;
    setSelectedSlide(slides[nextIndex]);
  };

  const prevSlide = () => {
    const currentIndex = slides.findIndex(slide => slide.id === selectedSlide.id);
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    setSelectedSlide(slides[prevIndex]);
  };

  return (
    <>
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-text-primary">
            Final Preview
          </h2>
          <div className="flex items-center space-x-2 text-sm text-secondary-600">
            <Icon name="Images" size={16} />
            <span>{slides.length} slides</span>
          </div>
        </div>

        {/* Mobile Grid */}
        <div className="grid grid-cols-2 gap-3 md:hidden">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => openModal(slide)}
              className="relative aspect-square bg-surface rounded-lg overflow-hidden border border-border hover:border-primary transition-colors duration-150 micro-scale"
            >
              <Image
                src={slide.preview}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2 right-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-white bg-black/40 px-2 py-1 rounded">
                    {index + 1}
                  </span>
                  <Icon name="Maximize2" size={14} color="white" />
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-4 lg:grid-cols-4 gap-4">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => openModal(slide)}
              className="relative aspect-square bg-surface rounded-lg overflow-hidden border border-border hover:border-primary transition-all duration-150 micro-scale hover:elevation-2 group"
            >
              <Image
                src={slide.preview}
                alt={slide.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
              <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white bg-black/60 px-2 py-1 rounded">
                    Slide {index + 1}
                  </span>
                  <Icon name="Maximize2" size={16} color="white" />
                </div>
              </div>
              <div className="absolute top-3 right-3">
                <span className="text-xs font-medium text-white bg-primary px-2 py-1 rounded">
                  {index + 1}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedSlide && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="relative max-w-2xl w-full max-h-[90vh] bg-surface rounded-lg overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div>
                <h3 className="font-semibold text-text-primary">
                  {selectedSlide.title}
                </h3>
                <p className="text-sm text-secondary-600">
                  Slide {slides.findIndex(s => s.id === selectedSlide.id) + 1} of {slides.length}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-secondary-100 rounded-lg micro-scale"
              >
                <Icon name="X" size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="relative">
              <div className="aspect-square bg-secondary-100">
                <Image
                  src={selectedSlide.preview}
                  alt={selectedSlide.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center micro-scale"
              >
                <Icon name="ChevronLeft" size={20} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center micro-scale"
              >
                <Icon name="ChevronRight" size={20} />
              </button>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-border">
              <p className="text-sm text-secondary-600">
                {selectedSlide.content}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PreviewGallery;