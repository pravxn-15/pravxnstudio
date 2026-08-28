import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { useToast } from '../context/ToastContext';
import { MessageSquare, Mail, Phone, Calendar, MapPin, User, CheckCircle2, Clock, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminEnquiries = () => {
  const { addToast } = useToast();
  const [enquiries, setEnquiries] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  useEffect(() => {
    fetchEnquiries();
  }, [statusFilter]);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/enquiries?status=${statusFilter}`);
      setEnquiries(res.data);
    } catch (err) {
      console.error(err);
      addToast('Failed to fetch enquiries', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await api.put(`/enquiries/${id}/status`, { status: newStatus });
      addToast(`Enquiry marked as ${newStatus}`, 'success');
      fetchEnquiries();
      if (selectedEnquiry && selectedEnquiry._id === id) {
        setSelectedEnquiry((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      console.error(err);
      addToast('Failed to update status', 'error');
    }
  };

  const openWhatsAppReply = (enquiry) => {
    const rawPhone = enquiry.phone.replace(/[^\d]/g, '');
    const phoneWithCountry = rawPhone.length === 10 ? `91${rawPhone}` : rawPhone;
    const text = encodeURIComponent(
      `Hello ${enquiry.name}! Thank you for reaching out to pravxnstudio regarding your ${enquiry.eventType || 'wedding'}. We would love to discuss your story in detail!`
    );
    window.open(`https://wa.me/${phoneWithCountry}?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C5A880]">
            Inquiries & Bookings
          </span>
          <h1 className="font-editorial text-3xl text-white font-normal mt-1">
            Client <span className="italic font-light text-[#C5A880]">Enquiries</span>
          </h1>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 bg-[#121212] p-1.5 rounded-full border border-white/10">
          {['all', 'new', 'contacted', 'closed'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-widest font-semibold transition-all ${
                statusFilter === status
                  ? 'bg-[#C5A880] text-black shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Enquiries Table */}
      {loading ? (
        <div className="flex justify-center py-20 text-[#C5A880]">
          <div className="w-8 h-8 border-2 border-[#C5A880] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : enquiries.length === 0 ? (
        <div className="text-center py-20 text-neutral-400 font-light bg-[#121212] rounded-3xl border border-white/5">
          <p>No enquiries found in this category.</p>
        </div>
      ) : (
        <div className="bg-[#121212] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-neutral-400 font-semibold bg-black/40">
                  <th className="py-4 px-6">Client Name</th>
                  <th className="py-4 px-6">Event</th>
                  <th className="py-4 px-6">Date & Location</th>
                  <th className="py-4 px-6">Phone / Email</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm font-light">
                {enquiries.map((enq) => (
                  <tr key={enq._id} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6 font-medium text-white">
                      <div>
                        <span className="block text-base">{enq.name}</span>
                        <span className="text-xs text-neutral-500 font-light">
                          {new Date(enq.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <span className="px-3 py-1 rounded-full bg-white/5 text-xs text-[#C5A880] font-medium border border-white/5">
                        {enq.eventType}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-neutral-300 text-xs space-y-1">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                        <span>{enq.weddingDate ? new Date(enq.weddingDate).toLocaleDateString() : 'TBD'}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-neutral-400">
                        <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                        <span>{enq.venue || 'TBD'}</span>
                      </div>
                    </td>

                    <td className="py-4 px-6 text-xs text-neutral-300 space-y-1">
                      <div className="font-medium text-white">{enq.phone}</div>
                      <div className="text-neutral-400">{enq.email}</div>
                    </td>

                    <td className="py-4 px-6">
                      <select
                        value={enq.status}
                        onChange={(e) => handleStatusUpdate(enq._id, e.target.value)}
                        className={`text-xs px-3 py-1.5 rounded-full font-semibold border focus:outline-none ${
                          enq.status === 'new'
                            ? 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                            : enq.status === 'contacted'
                            ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                            : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                        }`}
                      >
                        <option value="new" className="bg-[#121212] text-white">NEW</option>
                        <option value="contacted" className="bg-[#121212] text-white">CONTACTED</option>
                        <option value="closed" className="bg-[#121212] text-white">CLOSED</option>
                      </select>
                    </td>

                    <td className="py-4 px-6 text-right space-x-2">
                      <button
                        onClick={() => setSelectedEnquiry(enq)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white"
                        title="View Full Story / Message"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => openWhatsAppReply(enq)}
                        className="p-2 rounded-lg bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white transition-colors"
                        title="Reply via WhatsApp"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedEnquiry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-[#121212] border border-white/10 rounded-3xl p-8 max-w-xl w-full space-y-6"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="font-editorial text-2xl text-white">
                  Enquiry Details
                </h3>
                <button onClick={() => setSelectedEnquiry(null)} className="text-neutral-400 hover:text-white">
                  ✕
                </button>
              </div>

              <div className="space-y-4 text-sm font-light text-neutral-300">
                <p><strong className="text-white">Client:</strong> {selectedEnquiry.name}</p>
                <p><strong className="text-white">Email:</strong> {selectedEnquiry.email}</p>
                <p><strong className="text-white">Phone:</strong> {selectedEnquiry.phone}</p>
                <p><strong className="text-white">Event:</strong> {selectedEnquiry.eventType}</p>
                <p><strong className="text-white">Venue:</strong> {selectedEnquiry.venue || 'N/A'}</p>
                <p><strong className="text-white">Guests:</strong> {selectedEnquiry.guestCount || 'N/A'}</p>

                <div className="pt-2">
                  <strong className="text-white block mb-2">Story / Notes:</strong>
                  <div className="p-4 rounded-xl bg-black/60 border border-white/10 text-xs italic text-neutral-300 leading-relaxed">
                    "{selectedEnquiry.message || 'No additional message provided.'}"
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
                <button
                  onClick={() => openWhatsAppReply(selectedEnquiry)}
                  className="px-6 py-3 rounded-full bg-emerald-600 text-white text-xs uppercase font-semibold hover:bg-emerald-500 flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Reply on WhatsApp</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminEnquiries;
