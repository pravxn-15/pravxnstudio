import React from 'react';
import { Instagram } from 'lucide-react';
import { motion } from 'framer-motion';

const InstagramStrip = ({ projects = [] }) => {
  // Collect images from flagged projects or gallery photos
  const instaImages = projects
    .filter((p) => p.showOnInstagramSection)
    .map((p) => p.coverImage?.url)
    .filter(Boolean)
    .slice(0, 6);

  // Fallback defaults if fewer than 6 images
  const defaultImages = [
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop'
  ];

  const displayImages = instaImages.length >= 4 ? instaImages : defaultImages;

  return (
    <section className="py-24 bg-[#0B0B0B] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-12">
        <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C5A880] mb-2 block">
          Follow The Stories
        </span>
        <a
          href="https://www.instagram.com/its_tomy14"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-editorial text-3xl sm:text-4xl text-white font-normal hover:text-[#C5A880] transition-colors"
        >
          <Instagram className="w-8 h-8 text-[#C5A880]" />
          <span>@its_tomy14</span>
        </a>
      </div>

      {/* Grid of Square Photography Shots */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 px-2">
        {displayImages.map((imgUrl, idx) => (
          <motion.a
            key={idx}
            href="https://www.instagram.com/its_tomy14"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            className="group relative aspect-square overflow-hidden bg-[#141414]"
          >
            <img
              src={imgUrl}
              alt="Instagram Photography Story"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Instagram className="w-8 h-8 text-[#C5A880] scale-75 group-hover:scale-100 transition-transform duration-300" />
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default InstagramStrip;
