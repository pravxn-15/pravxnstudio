import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { useToast } from '../context/ToastContext';
import { Plus, Edit2, Trash2, Quote, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminTestimonials = () => {
  const { addToast } = useToast();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    quote: '',
    clientNames: '',
    location: '',
    order: 0
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const res = await api.get('/testimonials');
      setTestimonials(res.data);
    } catch (err) {
      console.error(err);
      addToast('Failed to fetch testimonials', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({
      quote: '',
      clientNames: '',
      location: '',
      order: testimonials.length + 1
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (t) => {
    setEditingId(t._id);
    setFormData({
      quote: t.quote || '',
      clientNames: t.clientNames || '',
      location: t.location || '',
      order: t.order || 0
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.quote || !formData.clientNames) {
      addToast('Quote and client names required', 'error');
      return;
    }

    try {
      if (editingId) {
        await api.put(`/testimonials/${editingId}`, formData);
        addToast('Testimonial updated', 'success');
      } else {
        await api.post('/testimonials', formData);
        addToast('Testimonial added', 'success');
      }
      setModalOpen(false);
      fetchTestimonials();
    } catch (err) {
      console.error(err);
      addToast('Failed to save testimonial', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this testimonial?')) return;
    try {
      await api.delete(`/testimonials/${id}`);
      addToast('Testimonial deleted', 'info');
      fetchTestimonials();
    } catch (err) {
      console.error(err);
      addToast('Failed to delete testimonial', 'error');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C5A880]">
            Review Manager
          </span>
          <h1 className="font-editorial text-3xl text-white font-normal mt-1">
            Client <span className="italic font-light text-[#C5A880]">Testimonials</span>
          </h1>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C5A880] text-black text-xs uppercase tracking-widest font-semibold hover:bg-white transition-colors shadow-lg self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* Testimonials List */}
      {loading ? (
        <div className="flex justify-center py-20 text-[#C5A880]">
          <div className="w-8 h-8 border-2 border-[#C5A880] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div key={t._id} className="p-6 rounded-2xl bg-[#121212] border border-white/5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <Quote className="w-6 h-6 text-[#C5A880]/60" />
                <p className="font-serif italic text-neutral-200 text-sm leading-relaxed">"{t.quote}"</p>
                <div>
                  <h4 className="font-editorial text-base text-white">{t.clientNames}</h4>
                  <p className="text-xs text-[#C5A880]">{t.location}</p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-white/5">
                <button onClick={() => handleOpenEdit(t)} className="p-2 rounded-lg bg-white/5 text-neutral-300 hover:text-white">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(t._id)} className="p-2 rounded-lg bg-rose-500/10 text-rose-300 hover:text-white">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
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
              className="bg-[#121212] border border-white/10 rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-6"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="font-editorial text-2xl text-white">
                  {editingId ? 'Edit Testimonial' : 'Add Testimonial'}
                </h3>
                <button onClick={() => setModalOpen(false)} className="text-neutral-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-neutral-300 font-semibold mb-1">
                    Client Quote *
                  </label>
                  <textarea
                    rows={4}
                    value={formData.quote}
                    onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                    required
                    className="w-full bg-[#070707] border border-white/10 rounded-xl px-4 py-3 text-sm text-white resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-neutral-300 font-semibold mb-1">
                    Client Names *
                  </label>
                  <input
                    type="text"
                    value={formData.clientNames}
                    onChange={(e) => setFormData({ ...formData, clientNames: e.target.value })}
                    placeholder="e.g. Ananya & Vikram"
                    required
                    className="w-full bg-[#070707] border border-white/10 rounded-xl px-4 py-3 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-neutral-300 font-semibold mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Udaipur"
                    className="w-full bg-[#070707] border border-white/10 rounded-xl px-4 py-3 text-sm text-white"
                  />
                </div>

                <div className="pt-4 flex justify-end gap-4 border-t border-white/10">
                  <button type="button" onClick={() => setModalOpen(false)} className="px-6 py-3 text-xs uppercase text-neutral-400">
                    Cancel
                  </button>
                  <button type="submit" className="px-8 py-3 rounded-full bg-[#C5A880] text-black text-xs uppercase font-semibold">
                    Save Testimonial
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminTestimonials;
