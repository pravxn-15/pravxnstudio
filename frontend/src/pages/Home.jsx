import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import Hero from '../components/Hero';
import FeaturedStories from '../components/FeaturedStories';
import Experience from '../components/Experience';
import ServicesPreview from '../components/ServicesPreview';
import TestimonialSlider from '../components/TestimonialSlider';
import InstagramStrip from '../components/InstagramStrip';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projRes, servRes, testRes, setRes] = await Promise.all([
          api.get('/projects'),
          api.get('/services'),
          api.get('/testimonials'),
          api.get('/settings')
        ]);
        setProjects(projRes.data);
        setServices(servRes.data);
        setTestimonials(testRes.data);
        setSettings(setRes.data);
      } catch (err) {
        console.error('[Home Fetch Error]', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] flex items-center justify-center text-[#C5A880]">
        <div className="w-10 h-10 border-2 border-[#C5A880] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="bg-[#0B0B0B] min-h-screen">
      {/* 1. Hero Section */}
      <Hero settings={settings} />

      {/* 2. Featured Stories */}
      <FeaturedStories projects={projects} />

      {/* 3. The Experience Narrative */}
      <Experience />

      {/* 4. Services Preview */}
      <ServicesPreview services={services} />

      {/* 5. Testimonials Slider */}
      <TestimonialSlider testimonials={testimonials} />

      {/* 6. Instagram Strip */}
      <InstagramStrip projects={projects} />

      {/* 7. Closing Enquiry CTA Section */}
      <section className="py-32 bg-gradient-to-b from-[#0B0B0B] to-[#141414] text-center border-t border-white/5 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 space-y-8 relative z-10">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.4em] text-[#C5A880] font-semibold"
          >
            Begin Your Legacy
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-editorial text-4xl sm:text-6xl md:text-7xl text-white font-normal leading-tight"
          >
            LET'S CREATE SOMETHING <br />
            <span className="italic font-light text-[#C5A880]">BEAUTIFUL</span> TOGETHER
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm md:text-base text-neutral-400 font-light max-w-xl mx-auto leading-relaxed"
          >
            Dates for 2026-2027 wedding seasons are now open for booking. We accept a limited number of weddings per year to ensure absolute devotion to every story.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="pt-4"
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-[#C5A880] text-black text-xs uppercase tracking-[0.25em] font-semibold hover:bg-white transition-all duration-300 shadow-2xl group"
            >
              <span>Book Your Enquiry</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Home;
