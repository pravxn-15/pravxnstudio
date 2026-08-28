import React from 'react';
import { motion } from 'framer-motion';

const Experience = () => {
  const steps = [
    {
      num: '01',
      title: 'GET TO KNOW YOU',
      description: 'We learn about your story, your people and the moments that matter deeply to you both.'
    },
    {
      num: '02',
      title: 'THE DAY',
      description: 'We document the emotions, laughter, tears and little details naturally without intrusive direction.'
    },
    {
      num: '03',
      title: 'YOUR STORY',
      description: "Your photographs and films become an heirloom collection you'll return to for years to come."
    }
  ];

  return (
    <section className="py-28 bg-[#0E0E0E] relative border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C5A880]">
            The Experience
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl text-white font-normal mt-2">
            How We Tell <span className="italic font-light text-[#C5A880]">Your Story</span>
          </h2>
          <p className="text-sm font-light text-neutral-400 mt-4 leading-relaxed">
            An unobtrusive, directorial approach designed to let your genuine emotions flow naturally.
          </p>
        </div>

        {/* 3 Step Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="relative p-8 rounded-2xl bg-[#141414] border border-white/5 hover:border-[#C5A880]/30 transition-all duration-300 group"
            >
              <span className="font-editorial text-5xl font-light text-[#C5A880]/40 group-hover:text-[#C5A880] transition-colors block mb-6">
                {step.num}
              </span>
              <h3 className="font-editorial text-xl text-white tracking-wider uppercase mb-3">
                {step.title}
              </h3>
              <p className="text-sm font-light text-neutral-400 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
