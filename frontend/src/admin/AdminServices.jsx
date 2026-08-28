import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { useToast } from '../context/ToastContext';
import { Plus, Edit2, Trash2, Camera, Heart, Video, Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const iconOptions = ['Camera', 'Heart', 'Video', 'Sparkles'];

const AdminServices = () => {
  const { addToast } = useToast();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'Camera',
    features: [''],
    order: 0
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await api.get('/services');
      setServices(res.data);
    } catch (err) {
      console.error(err);
      addToast('Failed to fetch services', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      icon: 'Camera',
      features: [''],
      order: services.length + 1
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (service) => {
    setEditingId(service._id);
    setFormData({
      title: service.title || '',
      description: service.description || '',
      icon: service.icon || 'Camera',
      features: service.features && service.features.length > 0 ? service.features : [''],
      order: service.order || 0
    });
    setModalOpen(true);
  };

  const handleFeatureChange = (index, value) => {
    const updated = [...formData.features];
    updated[index] = value;
    setFormData({ ...formData, features: updated });
  };

  const handleAddFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ''] });
  };

  const handleRemoveFeature = (index) => {
    setFormData({ ...formData, features: formData.features.filter((_, i) => i !== index) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      addToast('Title and description required', 'error');
      return;
    }

    try {
      const payload = {
        ...formData,
        features: formData.features.filter(Boolean)
      };

      if (editingId) {
        await api.put(`/services/${editingId}`, payload);
        addToast('Service updated successfully', 'success');
      } else {
        await api.post('/services', payload);
        addToast('Service created successfully', 'success');
      }
      setModalOpen(false);
      fetchServices();
    } catch (err) {
      console.error(err);
      addToast('Failed to save service', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this service offering?')) return;
    try {
      await api.delete(`/services/${id}`);
      addToast('Service deleted', 'info');
      fetchServices();
    } catch (err) {
      console.error(err);
      addToast('Failed to delete service', 'error');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C5A880]">
            Services Manager
          </span>
          <h1 className="font-editorial text-3xl text-white font-normal mt-1">
            Studio <span className="italic font-light text-[#C5A880]">Offerings</span>
          </h1>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C5A880] text-black text-xs uppercase tracking-widest font-semibold hover:bg-white transition-colors shadow-lg self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Services List */}
      {loading ? (
        <div className="flex justify-center py-20 text-[#C5A880]">
          <div className="w-8 h-8 border-2 border-[#C5A880] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div key={service._id} className="p-6 rounded-2xl bg-[#121212] border border-white/5 space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-[#C5A880] uppercase tracking-widest">
                    Icon: {service.icon}
                  </span>
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleOpenEdit(service)} className="p-2 rounded-lg bg-white/5 text-neutral-300 hover:text-white">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(service._id)} className="p-2 rounded-lg bg-rose-500/10 text-rose-300 hover:text-white">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="font-editorial text-2xl text-white font-medium mb-2">{service.title}</h3>
                <p className="text-xs text-neutral-400 font-light leading-relaxed mb-4">{service.description}</p>

                {service.features && (
                  <ul className="space-y-1.5 pt-3 border-t border-white/5">
                    {service.features.map((f, i) => (
                      <li key={i} className="text-xs text-neutral-300 font-light flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                )}
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
                  {editingId ? 'Edit Service' : 'Add New Service'}
                </h3>
                <button onClick={() => setModalOpen(false)} className="text-neutral-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-neutral-300 font-semibold mb-1">
                    Service Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="w-full bg-[#070707] border border-white/10 rounded-xl px-4 py-3 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-neutral-300 font-semibold mb-1">
                    Icon *
                  </label>
                  <select
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full bg-[#070707] border border-white/10 rounded-xl px-4 py-3 text-sm text-white"
                  >
                    {iconOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-neutral-300 font-semibold mb-1">
                    Description *
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    className="w-full bg-[#070707] border border-white/10 rounded-xl px-4 py-3 text-sm text-white resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-neutral-300 font-semibold mb-2">
                    Package Inclusions / Features
                  </label>
                  <div className="space-y-2">
                    {formData.features.map((feat, i) => (
                      <div key={i} className="flex gap-2">
                        <input
                          type="text"
                          value={feat}
                          onChange={(e) => handleFeatureChange(i, e.target.value)}
                          placeholder={`Feature ${i + 1}`}
                          className="flex-1 bg-[#070707] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature(i)}
                          className="p-2 text-rose-400 hover:text-white"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={handleAddFeature}
                      className="text-xs text-[#C5A880] underline pt-1"
                    >
                      + Add Inclusion Item
                    </button>
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-4 border-t border-white/10">
                  <button type="button" onClick={() => setModalOpen(false)} className="px-6 py-3 text-xs uppercase text-neutral-400">
                    Cancel
                  </button>
                  <button type="submit" className="px-8 py-3 rounded-full bg-[#C5A880] text-black text-xs uppercase font-semibold">
                    Save Service
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

export default AdminServices;
