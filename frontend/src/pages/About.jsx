import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Camera, Award, Heart, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <main className="bg-[#0B0B0B] min-h-screen pt-32 pb-28">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-xs uppercase tracking-[0.4em] text-[#C5A880] font-semibold block">
            Behind The Lens
          </span>
          <h1 className="font-editorial text-4xl sm:text-6xl text-white font-normal">
            The Story of <span className="italic font-light text-[#C5A880]">pravxnstudio</span>
          </h1>
          <p className="text-sm font-light text-neutral-400 leading-relaxed">
            Crafting emotional, cinematic wedding heirloom art for couples who value authentic connection over artificial poses.
          </p>
        </div>

        {/* Studio Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-28">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop"
              alt="Praveen - Studio Director & Photographer"
              className="w-full h-full object-cover filter brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10">
              <span className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold block">Founder & Creative Director</span>
              <h3 className="font-editorial text-2xl text-white font-medium mt-1">Praveen</h3>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 text-neutral-300 font-light leading-relaxed"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-[#C5A880] font-semibold block">
              Philosophy & Approach
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-white font-normal leading-tight">
              "We believe photographs should evoke the exact feeling of being back in that moment."
            </h2>
            <p className="text-sm text-neutral-400">
              Founded in Chennai, Tamil Nadu, <strong className="text-white">pravxnstudio</strong> was born out of a deep reverence for human emotions, silk textures, architectural heritage, and cinematic motion pictures.
            </p>
            <p className="text-sm text-neutral-400">
              Our signature style blends fine art photojournalism with subtle directorial grace. We guide you gently when needed, but step back to let genuine laughter, sacred vows, and quiet glances unfold naturally.
            </p>
            
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/10">
              <div>
                <h4 className="font-editorial text-3xl text-[#C5A880] font-semibold">150+</h4>
                <p className="text-xs uppercase tracking-widest text-neutral-400 mt-1">Weddings Documented</p>
              </div>
              <div>
                <h4 className="font-editorial text-3xl text-[#C5A880] font-semibold">100%</h4>
                <p className="text-xs uppercase tracking-widest text-neutral-400 mt-1">Emotional Authenticity</p>
              </div>
            </div>

            <div className="pt-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#C5A880] text-black text-xs uppercase tracking-[0.25em] font-semibold hover:bg-white transition-colors shadow-xl"
              >
                <span>Connect With Praveen</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* 4 Pillars of Craft */}
        <div className="border-t border-white/10 pt-20">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C5A880]">
              Our Four Pillars
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-white font-normal mt-2">
              What Sets <span className="italic font-light text-[#C5A880]">Us Apart</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-8 rounded-2xl bg-[#141414] border border-white/5 space-y-4">
              <Camera className="w-8 h-8 text-[#C5A880]" />
              <h3 className="font-editorial text-xl text-white font-medium">Editorial Composition</h3>
              <p className="text-xs font-light text-neutral-400 leading-relaxed">
                Framing every shot like a magazine spread with rich color grading and generous whitespace.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#141414] border border-white/5 space-y-4">
              <Heart className="w-8 h-8 text-[#C5A880]" />
              <h3 className="font-editorial text-xl text-white font-medium">Unobtrusive Directing</h3>
              <p className="text-xs font-light text-neutral-400 leading-relaxed">
                Allowing authentic tears, smiles, and ritual traditions to bloom without artificial interruption.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#141414] border border-white/5 space-y-4">
              <Sparkles className="w-8 h-8 text-[#C5A880]" />
              <h3 className="font-editorial text-xl text-white font-medium">Timeless Color Palette</h3>
              <p className="text-xs font-light text-neutral-400 leading-relaxed">
                Natural skin tones, warm ivory, deep obsidian, and organic tones that never look dated.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#141414] border border-white/5 space-y-4">
              <Award className="w-8 h-8 text-[#C5A880]" />
              <h3 className="font-editorial text-xl text-white font-medium">Archival Heirloom Quality</h3>
              <p className="text-xs font-light text-neutral-400 leading-relaxed">
                Custom handcrafted photo albums and 4K digital archives created to endure for generations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default About;
