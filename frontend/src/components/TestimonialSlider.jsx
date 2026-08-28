import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const TestimonialSlider = ({ testimonials = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!testimonials || testimonials.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [testimonials]);

  if (!testimonials || testimonials.length === 0) return null;

  const current = testimonials[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const formattedCounter = `0${currentIndex + 1} / 0${testimonials.length}`;

  return (
    <section className="py-28 bg-[#0E0E0E] relative overflow-hidden border-y border-white/5">
      <div className="max-w-5xl mx-auto px-6 md:px-12 text-center relative z-10">
        {/* Quote Icon Header */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/20 text-[#C5A880] mb-8">
          <Quote className="w-8 h-8 opacity-80" />
        </div>

        {/* Counter */}
        <div className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C5A880] mb-8">
          {formattedCounter}
        </div>

        {/* Testimonial Quote Animation */}
        <div className="min-h-[220px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="space-y-6 max-w-3xl"
            >
              <p className="font-editorial text-2xl sm:text-3xl md:text-4xl text-neutral-100 font-normal leading-relaxed italic">
                "{current.quote}"
              </p>
              <div>
                <h4 className="text-sm font-semibold tracking-widest uppercase text-white">
                  {current.clientNames}
                </h4>
                {current.location && (
                  <p className="text-xs text-[#C5A880] tracking-widest uppercase mt-1">
                    {current.location}
                  </p>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center gap-6 mt-12">
          <button
            onClick={handlePrev}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-neutral-300 hover:text-black hover:bg-[#C5A880] hover:border-[#C5A880] transition-colors"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? 'w-8 bg-[#C5A880]' : 'w-2 bg-white/20'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-neutral-300 hover:text-black hover:bg-[#C5A880] hover:border-[#C5A880] transition-colors"
            aria-label="Next Testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
