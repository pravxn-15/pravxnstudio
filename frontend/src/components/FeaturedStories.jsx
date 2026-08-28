import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin } from 'lucide-react';

const FeaturedStories = ({ projects = [] }) => {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 6);

  return (
    <section className="py-28 bg-[#0B0B0B] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/10 pb-8">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C5A880]">
              Selected Work
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl text-white font-normal mt-2">
              Featured <span className="italic font-light text-[#C5A880]">Stories</span>
            </h2>
          </div>
          <Link
            to="/portfolio"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-neutral-300 hover:text-[#C5A880] transition-colors group"
          >
            <span>Explore All Projects</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project._id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                to={`/project/${project.slug}`}
                className="group block relative overflow-hidden rounded-2xl bg-[#141414] border border-white/5 shadow-2xl"
              >
                {/* Image Aspect Ratio Wrapper */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={project.coverImage?.url}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                  
                  {/* Category Pill */}
                  <span className="absolute top-4 left-4 text-[10px] uppercase tracking-widest font-semibold px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#C5A880] border border-[#C5A880]/30">
                    {project.category}
                  </span>
                </div>

                {/* Card Text Content */}
                <div className="p-6 relative z-10 -mt-20 bg-gradient-to-t from-[#141414] via-[#141414]/90 to-transparent">
                  <h3 className="font-editorial text-2xl text-white font-medium group-hover:text-[#C5A880] transition-colors">
                    {project.clientNames}
                  </h3>
                  <p className="text-xs text-neutral-400 font-light mt-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>{project.location}</span>
                  </p>
                  <p className="text-xs font-serif italic text-neutral-300 mt-2 line-clamp-1 opacity-80">
                    "{project.title}"
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedStories;
