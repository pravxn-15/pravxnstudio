import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { Camera, Heart, Video, Sparkles, Check, ChevronDown, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const iconMap = {
  Camera: Camera,
  Heart: Heart,
  Video: Video,
  Sparkles: Sparkles
};

const faqs = [
  {
    q: 'How far in advance should we book our wedding date?',
    a: 'We recommend booking 6 to 12 months in advance, especially for popular wedding dates between October and April in Tamil Nadu & South India.'
  },
  {
    q: 'Do you travel across India & internationally for destination weddings?',
    a: 'Yes, absolutely! We love destination weddings and have documented celebrations across Udaipur, Ooty, Coorg, Goa, Dubai, and beyond.'
  },
  {
    q: 'When will we receive our photographs and cinematic film?',
    a: 'You will receive a 25-image preview gallery within 72 hours of your wedding day. The complete retouched photo collection and cinematic films are delivered within 4 to 6 weeks.'
  },
  {
    q: 'Can we customize our photography & film coverage package?',
    a: 'Yes, every story is unique. We tailor custom packages depending on your event duration, guest count, travel requirements, and desired print albums.'
  }
];

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get('/services');
        setServices(res.data);
      } catch (err) {
        console.error('[Services Fetch Error]', err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <main className="bg-[#0B0B0B] min-h-screen pt-32 pb-28">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-xs uppercase tracking-[0.4em] text-[#C5A880] font-semibold block">
            Craft & Investment
          </span>
          <h1 className="font-editorial text-4xl sm:text-6xl text-white font-normal">
            Studio <span className="italic font-light text-[#C5A880]">Services</span>
          </h1>
          <p className="text-sm font-light text-neutral-400 leading-relaxed">
            Thoughtfully curated photography and film packages crafted to preserve your legacy for generations.
          </p>
        </div>

        {/* Services Grid */}
        {loading ? (
          <div className="flex justify-center py-20 text-[#C5A880]">
            <div className="w-8 h-8 border-2 border-[#C5A880] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-28">
            {services.map((service, idx) => {
              const IconComponent = iconMap[service.icon] || Camera;
              return (
                <motion.div
                  key={service._id || idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="p-10 rounded-3xl bg-[#141414] border border-white/5 flex flex-col justify-between hover:border-[#C5A880]/40 transition-all duration-300 shadow-2xl"
                >
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-[#C5A880]/10 border border-[#C5A880]/20 flex items-center justify-center text-[#C5A880] mb-8">
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <h3 className="font-editorial text-2xl text-white font-medium mb-4">
                      {service.title}
                    </h3>
                    <p className="text-sm font-light text-neutral-400 leading-relaxed mb-8">
                      {service.description}
                    </p>

                    {service.features && service.features.length > 0 && (
                      <div className="space-y-3 mb-8 pt-6 border-t border-white/5">
                        <h4 className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold mb-2">
                          Package Inclusions:
                        </h4>
                        {service.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-3 text-xs text-neutral-300 font-light">
                            <Check className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <Link
                    to="/contact"
                    className="w-full py-4 rounded-full bg-[#C5A880] text-black text-xs uppercase tracking-[0.25em] font-semibold text-center hover:bg-white transition-all duration-300 shadow-xl flex items-center justify-center gap-2"
                  >
                    <span>Request Quotation</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto border-t border-white/10 pt-20">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C5A880]">
              Questions & Answers
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-white font-normal mt-2">
              Frequently Asked <span className="italic font-light text-[#C5A880]">Questions</span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-[#141414] border border-white/5 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 text-white font-medium text-base hover:text-[#C5A880] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#C5A880] transition-transform duration-300 ${
                      openFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6 text-sm font-light text-neutral-400 leading-relaxed border-t border-white/5 pt-4"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Services;
