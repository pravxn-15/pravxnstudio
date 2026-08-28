import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Mail, Phone, MessageSquare, Heart, Shield } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#070707] text-neutral-400 border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-white/5">
          {/* Studio Brand */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-editorial text-3xl font-semibold tracking-wider text-white">
                pravxn<span className="text-[#C5A880] font-light italic">studio</span>
              </span>
            </Link>
            <p className="text-sm font-light text-neutral-400 max-w-md leading-relaxed">
              Every frame tells a story. Crafting timeless wedding photography & cinematic films for emotional souls across Chennai, Tamil Nadu & Worldwide.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://wa.me/918056807652"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-neutral-300 hover:text-[#C5A880] hover:border-[#C5A880] transition-colors"
                title="Chat on WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/its_tomy14"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-neutral-300 hover:text-[#C5A880] hover:border-[#C5A880] transition-colors"
                title="Follow on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="mailto:praveencse1503@gmail.com"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-neutral-300 hover:text-[#C5A880] hover:border-[#C5A880] transition-colors"
                title="Email Us"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] font-semibold text-white mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm font-light">
              <li>
                <Link to="/portfolio" className="hover:text-[#C5A880] transition-colors">
                  Portfolio Gallery
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#C5A880] transition-colors">
                  Studio Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#C5A880] transition-colors">
                  About Praveen
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#C5A880] transition-colors">
                  Book Your Date
                </Link>
              </li>
              <li>
                <Link to="/admin/login" className="hover:text-[#C5A880] transition-colors inline-flex items-center gap-1.5 opacity-60 hover:opacity-100">
                  <Shield className="w-3 h-3" /> Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Studio Contact Info */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] font-semibold text-white mb-4">
              Get in Touch
            </h4>
            <ul className="space-y-3 text-sm font-light">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <a href="tel:8056807652" className="hover:text-white transition-colors">
                  +91 8056807652
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <a href="mailto:praveencse1503@gmail.com" className="hover:text-white transition-colors break-all">
                  praveencse1503@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Instagram className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <a href="https://www.instagram.com/its_tomy14" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  @its_tomy14
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Powered by pravxn */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-light text-neutral-400">
          <p>© {new Date().getFullYear()} pravxnstudio. All rights reserved.</p>

          <div className="flex items-center gap-1 text-neutral-300">
            <span>Powered by</span>
            <a
              href="https://www.instagram.com/pravxn_offl"
              target="_blank"
              rel="noopener noreferrer"
              className="font-handwriting text-2xl text-[#C5A880] hover:text-white hover:underline transition-colors px-1 tracking-wide"
              title="Visit pravxn on Instagram"
            >
              pravxn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
