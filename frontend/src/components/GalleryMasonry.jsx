import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Lightbox from './Lightbox';
import { Maximize2 } from 'lucide-react';

const GalleryMasonry = ({ images = [] }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const openLightbox = (index) => {
    setSelectedIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div>
      {/* Masonry Columns */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {images.map((img, idx) => {
          const imgUrl = typeof img === 'string' ? img : img.url;
          const sectionTitle = typeof img === 'object' ? img.section : null;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (idx % 6) * 0.08 }}
              onClick={() => openLightbox(idx)}
              className="group relative cursor-pointer overflow-hidden rounded-xl bg-[#141414] border border-white/5 break-inside-avoid shadow-xl"
            >
              <img
                src={imgUrl}
                alt={`Gallery image ${idx + 1}`}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />

              {/* Hover overlay with zoom icon */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                {sectionTitle ? (
                  <span className="text-[10px] uppercase tracking-widest font-semibold text-[#C5A880] px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#C5A880]/30 self-start">
                    {sectionTitle}
                  </span>
                ) : (
                  <div />
                )}
                <div className="self-end p-2.5 rounded-full bg-black/60 text-[#C5A880] backdrop-blur-md border border-white/10 group-hover:scale-110 transition-transform">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <Lightbox
          images={images}
          activeIndex={selectedIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
};

export default GalleryMasonry;
