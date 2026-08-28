import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

const Lightbox = ({ images = [], activeIndex = 0, onClose }) => {
  const [index, setIndex] = useState(activeIndex);
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    setIndex(activeIndex);
  }, [activeIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [index, images]);

  if (images.length === 0) return null;

  const currentImage = images[index];

  const handleNext = () => {
    setZoomed(false);
    setIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setZoomed(false);
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 md:p-8 select-none"
      >
        {/* Top Header Controls */}
        <div className="flex items-center justify-between z-10 text-white border-b border-white/10 pb-4">
          <div className="text-xs uppercase tracking-[0.25em] text-[#C5A880]">
            {currentImage.section ? `${currentImage.section} • ` : ''}
            Image {index + 1} of {images.length}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setZoomed(!zoomed)}
              className="p-2 rounded-full hover:bg-white/10 text-neutral-300 hover:text-white transition-colors"
              title={zoomed ? 'Zoom Out' : 'Zoom In'}
            >
              {zoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-neutral-300 hover:text-white transition-colors"
              title="Close Lightbox (Esc)"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Main Image Stage */}
        <div className="relative flex-1 flex items-center justify-center overflow-hidden my-4">
          {/* Previous Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-2 md:left-6 z-20 p-3 rounded-full bg-black/50 hover:bg-[#C5A880] text-white hover:text-black border border-white/10 transition-all duration-300"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Active Image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: zoomed ? 1.35 : 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="max-h-full max-w-full flex items-center justify-center cursor-pointer"
              onClick={() => setZoomed(!zoomed)}
            >
              <img
                src={typeof currentImage === 'string' ? currentImage : currentImage.url}
                alt={`Gallery photo ${index + 1}`}
                className="max-h-[80vh] max-w-[90vw] object-contain rounded-lg shadow-2xl transition-transform duration-300"
              />
            </motion.div>
          </AnimatePresence>

          {/* Next Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-2 md:right-6 z-20 p-3 rounded-full bg-black/50 hover:bg-[#C5A880] text-white hover:text-black border border-white/10 transition-all duration-300"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Bottom Thumbnails Strip */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto py-2 px-4 scrollbar-none z-10">
          {images.map((img, i) => {
            const url = typeof img === 'string' ? img : img.url;
            return (
              <button
                key={i}
                onClick={() => {
                  setZoomed(false);
                  setIndex(i);
                }}
                className={`relative w-14 h-14 rounded-md overflow-hidden shrink-0 border-2 transition-all ${
                  i === index ? 'border-[#C5A880] scale-105 opacity-100' : 'border-transparent opacity-40 hover:opacity-80'
                }`}
              >
                <img src={url} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
              </button>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Lightbox;
