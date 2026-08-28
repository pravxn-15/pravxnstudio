import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowDown, Play } from 'lucide-react';

const Hero = ({ settings }) => {
  const heroImage = settings?.heroImageUrl || 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop';
  const tagline = settings?.tagline || 'Every frame tells a story.';
  const subtitle = settings?.heroSubtitle || 'Wedding Photography & Films — Chennai · Tamil Nadu · Worldwide';

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0A] pt-20">
      {/* Background Image with Dark Vignette Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Cinematic Wedding Story"
          className="w-full h-full object-cover object-center scale-105 filter brightness-75 contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/50 to-[#0B0B0B]/30" />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white space-y-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-block"
        >
          <span className="text-xs md:text-sm font-light uppercase tracking-[0.4em] text-[#C5A880] px-4 py-1.5 rounded-full border border-[#C5A880]/30 bg-black/40 backdrop-blur-md">
            {tagline}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal leading-[1.05] tracking-tight uppercase"
        >
          YOUR STORY. <br />
          <span className="font-editorial italic font-light text-[#C5A880]">BEAUTIFULLY</span> PRESERVED.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-sm sm:text-base md:text-lg font-light text-neutral-300 max-w-2xl mx-auto tracking-widest uppercase opacity-90"
        >
          {subtitle}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4"
        >
          <Link
            to="/portfolio"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#C5A880] text-black text-xs uppercase tracking-[0.25em] font-semibold hover:bg-white transition-all duration-300 shadow-xl shadow-black/50"
          >
            View Our Work
          </Link>
          <Link
            to="/contact"
            className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/30 bg-black/40 backdrop-blur-md text-white text-xs uppercase tracking-[0.25em] font-semibold hover:border-[#C5A880] hover:text-[#C5A880] transition-all duration-300"
          >
            Enquire Now
          </Link>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-neutral-400 text-[10px] tracking-[0.3em] uppercase"
      >
        <span>Scroll</span>
        <ArrowDown className="w-4 h-4 text-[#C5A880]" />
      </motion.div>
    </section>
  );
};

export default Hero;
