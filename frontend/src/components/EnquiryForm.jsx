import React, { useState } from 'react';
import api from '../api/axios';
import { useToast } from '../context/ToastContext';
import { Send, MessageSquare, Mail, CheckCircle2, Instagram, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const EnquiryForm = () => {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: 'Wedding',
    weddingDate: '',
    venue: '',
    guestCount: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submittedResult, setSubmittedResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      addToast('Please complete all required fields (Name, Email, Phone)', 'error');
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/enquiries', formData);
      setSubmittedResult(res.data);
      addToast('Enquiry submitted successfully!', 'success');

      // Auto open WhatsApp chat window in new tab if URL provided
      if (res.data.whatsappUrl) {
        window.open(res.data.whatsappUrl, '_blank');
      }
    } catch (err) {
      console.error('[Enquiry Error]', err);
      addToast(err.response?.data?.message || 'Failed to submit enquiry. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#141414] border border-white/5 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
      <AnimatePresence mode="wait">
        {!submittedResult ? (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-neutral-300 font-semibold mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Ananya & Vikram"
                  required
                  className="w-full bg-[#0B0B0B] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#C5A880] transition-colors"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-neutral-300 font-semibold mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="yourname@domain.com"
                  required
                  className="w-full bg-[#0B0B0B] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#C5A880] transition-colors"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-neutral-300 font-semibold mb-2">
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  required
                  className="w-full bg-[#0B0B0B] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#C5A880] transition-colors"
                />
              </div>

              {/* Event Type */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-neutral-300 font-semibold mb-2">
                  Event Category *
                </label>
                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  className="w-full bg-[#0B0B0B] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#C5A880] transition-colors"
                >
                  <option value="Wedding">Wedding Celebration</option>
                  <option value="Pre-Wedding">Pre-Wedding / Engagement</option>
                  <option value="Couples">Couples / Romance Session</option>
                  <option value="Portraits">Fine Art Portraiture</option>
                  <option value="Films">Cinematic Film Production</option>
                  <option value="Events">Special Event / Anniversary</option>
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-neutral-300 font-semibold mb-2">
                  Tentative Event Date
                </label>
                <input
                  type="date"
                  name="weddingDate"
                  value={formData.weddingDate}
                  onChange={handleChange}
                  className="w-full bg-[#0B0B0B] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#C5A880] transition-colors"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-neutral-300 font-semibold mb-2">
                  Venue / Destination
                </label>
                <input
                  type="text"
                  name="venue"
                  value={formData.venue}
                  onChange={handleChange}
                  placeholder="e.g. Chennai, Udaipur, Ooty"
                  className="w-full bg-[#0B0B0B] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#C5A880] transition-colors"
                />
              </div>
            </div>

            {/* Guest Count */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-neutral-300 font-semibold mb-2">
                Expected Guest Count
              </label>
              <input
                type="number"
                name="guestCount"
                value={formData.guestCount}
                onChange={handleChange}
                placeholder="e.g. 250"
                className="w-full bg-[#0B0B0B] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#C5A880] transition-colors"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-neutral-300 font-semibold mb-2">
                Tell Us About Your Story & Dreams
              </label>
              <textarea
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Share your vision, rituals, themes, or any special requests..."
                className="w-full bg-[#0B0B0B] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#C5A880] transition-colors resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-10 py-4 rounded-full bg-[#C5A880] text-black text-xs uppercase tracking-[0.25em] font-semibold hover:bg-white transition-all duration-300 shadow-xl flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {loading ? (
                  <span>Sending Story...</span>
                ) : (
                  <>
                    <span>Send Enquiry</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              <span className="text-xs text-neutral-500 font-light">
                Direct WhatsApp: <span className="text-[#C5A880] font-medium">+91 8056807652</span>
              </span>
            </div>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12 space-y-6"
          >
            <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="font-editorial text-3xl text-white font-normal">
              Thank you, <span className="italic text-[#C5A880]">{formData.name}</span>
            </h3>

            <p className="text-base text-neutral-300 max-w-md mx-auto leading-relaxed">
              Your story matters to us. We have received your enquiry and will be in touch shortly.
            </p>

            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-4">
              {submittedResult.whatsappUrl && (
                <a
                  href={submittedResult.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-emerald-600 text-white text-xs uppercase tracking-wider font-semibold hover:bg-emerald-500 transition-colors flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Open WhatsApp Direct</span>
                </a>
              )}
              <a
                href="mailto:praveencse1503@gmail.com"
                className="px-6 py-3 rounded-full border border-white/20 text-white text-xs uppercase tracking-wider font-semibold hover:border-[#C5A880] transition-colors flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>Email Studio</span>
              </a>
            </div>

            <button
              onClick={() => {
                setSubmittedResult(null);
                setFormData({
                  name: '',
                  email: '',
                  phone: '',
                  eventType: 'Wedding',
                  weddingDate: '',
                  venue: '',
                  guestCount: '',
                  message: ''
                });
              }}
              className="text-xs text-neutral-400 hover:text-white underline pt-4 block mx-auto"
            >
              Submit Another Enquiry
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnquiryForm;
