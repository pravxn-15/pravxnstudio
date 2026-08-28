import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera, Heart, Video, Sparkles, Check, ArrowRight } from 'lucide-react';

const iconMap = {
  Camera: Camera,
  Heart: Heart,
  Video: Video,
  Sparkles: Sparkles
};

const ServicesPreview = ({ services = [] }) => {
  return (
    <section className="py-28 bg-[#0B0B0B] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/10 pb-8">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C5A880]">
              What We Offer
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl text-white font-normal mt-2">
              Studio <span className="italic font-light text-[#C5A880]">Services</span>
            </h2>
          </div>
          <Link
            to="/services"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-neutral-300 hover:text-[#C5A880] transition-colors group"
          >
            <span>View Full Pricing & Offerings</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => {
            const IconComponent = iconMap[service.icon] || Camera;
            return (
              <motion.div
                key={service._id || idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="p-8 rounded-2xl bg-[#141414] border border-white/5 flex flex-col justify-between hover:border-[#C5A880]/40 transition-all duration-300 group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#C5A880]/10 border border-[#C5A880]/20 flex items-center justify-center text-[#C5A880] mb-6 group-hover:bg-[#C5A880] group-hover:text-black transition-colors">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="font-editorial text-xl text-white font-medium mb-3">
                    {service.title}
                  </h3>
                  <p className="text-xs font-light text-neutral-400 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {service.features && service.features.length > 0 && (
                    <ul className="space-y-2 mb-6">
                      {service.features.slice(0, 3).map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2 text-xs text-neutral-300 font-light">
                          <Check className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#C5A880] font-semibold hover:text-white transition-colors pt-4 border-t border-white/5"
                >
                  <span>Book Experience</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
