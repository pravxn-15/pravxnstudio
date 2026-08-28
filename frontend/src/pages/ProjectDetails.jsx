import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import GalleryMasonry from '../components/GalleryMasonry';
import { MapPin, Calendar, ArrowLeft, ArrowRight, Play, Film } from 'lucide-react';
import { motion } from 'framer-motion';

const ProjectDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjectData = async () => {
      setLoading(true);
      try {
        const [projRes, allRes] = await Promise.all([
          api.get(`/projects/${slug}`),
          api.get('/projects')
        ]);
        setProject(projRes.data);
        setAllProjects(allRes.data);
      } catch (err) {
        console.error('[Project Fetch Error]', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjectData();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] flex items-center justify-center text-[#C5A880]">
        <div className="w-10 h-10 border-2 border-[#C5A880] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] flex flex-col items-center justify-center text-white py-32">
        <h2 className="font-editorial text-3xl mb-4">Story Not Found</h2>
        <Link to="/portfolio" className="text-xs uppercase tracking-widest text-[#C5A880] underline">
          Return to Portfolio
        </Link>
      </div>
    );
  }

  // Calculate Next and Previous Projects
  const currentIndex = allProjects.findIndex((p) => p._id === project._id);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : allProjects[allProjects.length - 1];
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : allProjects[0];

  return (
    <main className="bg-[#0B0B0B] min-h-screen">
      {/* Hero Header */}
      <section className="relative min-h-[75vh] flex items-end justify-center pb-16 pt-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={project.coverImage?.url}
            alt={project.title}
            className="w-full h-full object-cover filter brightness-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-6">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#C5A880] hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Portfolio
          </Link>

          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C5A880] px-4 py-1.5 rounded-full border border-[#C5A880]/30 bg-black/50 backdrop-blur-md block w-max mx-auto">
            {project.category}
          </span>

          <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl text-white font-normal leading-tight">
            {project.clientNames}
          </h1>

          <p className="font-serif italic text-lg sm:text-xl text-neutral-300 max-w-2xl mx-auto">
            "{project.title}"
          </p>

          <div className="flex items-center justify-center gap-6 text-xs text-neutral-300 font-light pt-2">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#C5A880]" />
              {project.location}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#C5A880]" />
              {new Date(project.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })}
            </span>
          </div>
        </div>
      </section>

      {/* Description */}
      {project.description && (
        <section className="py-16 bg-[#0E0E0E] border-y border-white/5 text-center">
          <div className="max-w-3xl mx-auto px-6">
            <h3 className="text-xs uppercase tracking-[0.3em] text-[#C5A880] font-semibold mb-4">
              The Story
            </h3>
            <p className="font-serif text-lg md:text-xl text-neutral-200 leading-relaxed italic">
              "{project.description}"
            </p>
          </div>
        </section>
      )}

      {/* Photo Gallery Grid */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="py-24 max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C5A880]">
              The Photographs
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-white font-normal mt-2">
              Captured <span className="italic font-light text-[#C5A880]">Moments</span>
            </h2>
          </div>

          <GalleryMasonry images={project.gallery} />
        </section>
      )}

      {/* Embedded Wedding Film */}
      {project.filmUrl && (
        <section className="py-24 bg-[#070707] border-y border-white/5">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] font-semibold text-[#C5A880] mb-3">
              <Film className="w-4 h-4 text-[#C5A880]" />
              <span>Cinematic Film</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl text-white font-normal mb-12">
              Watch The <span className="italic font-light text-[#C5A880]">Highlight Film</span>
            </h2>

            <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black">
              <iframe
                src={project.filmUrl}
                title={`${project.clientNames} Wedding Film`}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      )}

      {/* Story Navigation (Previous / Next) */}
      <section className="py-20 bg-[#0B0B0B] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 gap-8">
          {prevProject && (
            <Link
              to={`/project/${prevProject.slug}`}
              className="p-8 rounded-2xl bg-[#141414] border border-white/5 hover:border-[#C5A880]/40 transition-all duration-300 group flex flex-col justify-between"
            >
              <span className="text-xs uppercase tracking-widest text-[#C5A880] flex items-center gap-2">
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                Previous Story
              </span>
              <div className="mt-4">
                <h4 className="font-editorial text-2xl text-white group-hover:text-[#C5A880] transition-colors">
                  {prevProject.clientNames}
                </h4>
                <p className="text-xs text-neutral-400 font-light mt-1">{prevProject.location}</p>
              </div>
            </Link>
          )}

          {nextProject && (
            <Link
              to={`/project/${nextProject.slug}`}
              className="p-8 rounded-2xl bg-[#141414] border border-white/5 hover:border-[#C5A880]/40 transition-all duration-300 group flex flex-col justify-between text-right"
            >
              <span className="text-xs uppercase tracking-widest text-[#C5A880] flex items-center justify-end gap-2">
                Next Story
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="mt-4">
                <h4 className="font-editorial text-2xl text-white group-hover:text-[#C5A880] transition-colors">
                  {nextProject.clientNames}
                </h4>
                <p className="text-xs text-neutral-400 font-light mt-1">{nextProject.location}</p>
              </div>
            </Link>
          )}
        </div>
      </section>
    </main>
  );
};

export default ProjectDetails;
