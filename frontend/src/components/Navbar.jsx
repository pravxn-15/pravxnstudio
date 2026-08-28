import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'PORTFOLIO', path: '/portfolio' },
    { name: 'SERVICES', path: '/services' },
    { name: 'ABOUT', path: '/about' },
    { name: 'CONTACT', path: '/contact' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0B0B0B]/90 backdrop-blur-md py-4 border-b border-white/5 shadow-2xl'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="font-editorial text-2xl md:text-3xl font-semibold tracking-wider text-white group-hover:text-[#C5A880] transition-colors">
            pravxn<span className="text-[#C5A880] font-light italic">studio</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`text-xs tracking-[0.25em] font-medium transition-colors relative py-1 ${
                  isActive ? 'text-[#C5A880]' : 'text-neutral-300 hover:text-white'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C5A880]"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* CTA Enquire Now Button */}
        <div className="hidden md:flex items-center">
          <Link
            to="/contact"
            className="group relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#C5A880]/40 text-xs tracking-widest uppercase font-semibold text-[#EAE5D9] hover:bg-[#C5A880] hover:text-black transition-all duration-300 shadow-lg shadow-black/40"
          >
            <span>Enquire Now</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-neutral-200 hover:text-[#C5A880] p-2 transition-colors"
          aria-label="Toggle Menu"
        >
          {mobileOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0F0F0F] border-b border-white/10 px-6 py-8 flex flex-col gap-6"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-sm tracking-[0.2em] font-medium py-2 border-b border-white/5 ${
                      isActive ? 'text-[#C5A880]' : 'text-neutral-300'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
            <Link
              to="/contact"
              className="w-full text-center px-6 py-3 rounded-full bg-[#C5A880] text-black text-xs uppercase tracking-widest font-semibold hover:bg-white transition-colors"
            >
              Enquire Now
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
