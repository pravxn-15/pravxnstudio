import React from 'react';
import EnquiryForm from '../components/EnquiryForm';
import { MessageSquare, Mail, Instagram, Phone, MapPin, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <main className="bg-[#0B0B0B] min-h-screen pt-32 pb-28">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-xs uppercase tracking-[0.4em] text-[#C5A880] font-semibold block">
            Let's Talk
          </span>
          <h1 className="font-editorial text-4xl sm:text-6xl text-white font-normal">
            Enquire & <span className="italic font-light text-[#C5A880]">Connect</span>
          </h1>
          <p className="text-sm font-light text-neutral-400 leading-relaxed">
            Tell us about your wedding, pre-wedding destination, or portrait project. We respond to all enquiries within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact Details & WhatsApp Button */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-3xl bg-[#141414] border border-white/5 space-y-6 shadow-2xl">
              <h3 className="font-editorial text-2xl text-white font-medium">
                Studio Contact Details
              </h3>

              <div className="space-y-4 font-light text-sm text-neutral-300">
                {/* WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/20 flex items-center justify-center text-[#C5A880] shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-widest text-neutral-400 block font-semibold">WhatsApp Direct</span>
                    <a
                      href="https://wa.me/918056807652"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base text-white hover:text-[#C5A880] font-medium transition-colors"
                    >
                      +91 8056807652
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/20 flex items-center justify-center text-[#C5A880] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-widest text-neutral-400 block font-semibold">Email Studio</span>
                    <a
                      href="mailto:praveencse1503@gmail.com"
                      className="text-base text-white hover:text-[#C5A880] font-medium transition-colors break-all"
                    >
                      praveencse1503@gmail.com
                    </a>
                  </div>
                </div>

                {/* Instagram */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/20 flex items-center justify-center text-[#C5A880] shrink-0">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-widest text-neutral-400 block font-semibold">Instagram</span>
                    <a
                      href="https://www.instagram.com/its_tomy14"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base text-white hover:text-[#C5A880] font-medium transition-colors"
                    >
                      @its_tomy14
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/20 flex items-center justify-center text-[#C5A880] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-widest text-neutral-400 block font-semibold">Studio Base</span>
                    <p className="text-sm text-neutral-200">Chennai · Tamil Nadu · Worldwide</p>
                  </div>
                </div>
              </div>

              {/* Direct Quick WhatsApp Launch */}
              <div className="pt-4 border-t border-white/10">
                <a
                  href="https://wa.me/918056807652?text=Hello%20pravxnstudio!%20I'd%20like%20to%20enquire%20about%20your%20wedding%20photography%20and%20films."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs uppercase tracking-[0.25em] font-semibold text-center transition-colors flex items-center justify-center gap-2 shadow-xl"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Message Us On WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Quick Response Notice */}
            <div className="p-6 rounded-2xl bg-[#0E0E0E] border border-white/5 flex items-center gap-4 text-xs font-light text-neutral-400">
              <Clock className="w-6 h-6 text-[#C5A880] shrink-0" />
              <p>
                We usually respond within <strong className="text-white">2-4 hours</strong> on WhatsApp and within <strong className="text-white">24 hours</strong> via email.
              </p>
            </div>
          </div>

          {/* Right Column: Dynamic Enquiry Form */}
          <div className="lg:col-span-7">
            <EnquiryForm />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
