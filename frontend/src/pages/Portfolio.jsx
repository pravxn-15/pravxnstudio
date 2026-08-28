import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowUpRight, Filter } from 'lucide-react';

const categories = ['All', 'Weddings', 'Pre-Weddings', 'Couples', 'Portraits', 'Events', 'Films'];

const Portfolio = () => {
  const { cat } = useParams();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(cat || 'All');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (cat) {
      setActiveCategory(cat);
    } else {
      setActiveCategory('All');
    }
  }, [cat]);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const res = await api.get('/projects');
        setProjects(res.data);
      } catch (err) {
        console.error('[Portfolio Fetch Error]', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    if (category === 'All') {
      navigate('/portfolio');
    } else {
      navigate(`/portfolio/${category}`);
    }
  };

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <main className="bg-[#0B0B0B] min-h-screen pt-32 pb-28">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-[0.4em] text-[#C5A880] font-semibold block">
            Our Portfolio
          </span>
          <h1 className="font-editorial text-4xl sm:text-6xl text-white font-normal">
            Preserved <span className="italic font-light text-[#C5A880]">Moments & Stories</span>
          </h1>
          <p className="text-sm font-light text-neutral-400 leading-relaxed">
            Explore our collection of weddings, pre-wedding destination sessions, fine art portraits, and cinematic films.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-16">
          {categories.map((category) => {
            const isActive = activeCategory.toLowerCase() === category.toLowerCase();
            return (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold transition-all duration-300 ${
                  isActive
                    ? 'bg-[#C5A880] text-black shadow-lg shadow-[#C5A880]/20'
                    : 'bg-[#141414] text-neutral-300 border border-white/10 hover:border-[#C5A880]/40 hover:text-white'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Portfolio Grid */}
        {loading ? (
          <div className="flex justify-center py-20 text-[#C5A880]">
            <div className="w-8 h-8 border-2 border-[#C5A880] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-20 text-neutral-400 font-light">
            <p>No projects found in this category yet.</p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  key={project._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                >
                  <Link
                    to={`/project/${project.slug}`}
                    className="group block relative overflow-hidden rounded-2xl bg-[#141414] border border-white/5 shadow-2xl"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img
                        src={project.coverImage?.url}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
                      
                      <span className="absolute top-4 left-4 text-[10px] uppercase tracking-widest font-semibold px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#C5A880] border border-[#C5A880]/30">
                        {project.category}
                      </span>
                    </div>

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
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </main>
  );
};

export default Portfolio;
