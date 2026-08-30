import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { useToast } from '../context/ToastContext';
import { Plus, Edit2, Trash2, Image, Upload, Check, X, Star, Instagram } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const categories = ['Weddings', 'Pre-Weddings', 'Couples', 'Portraits', 'Events', 'Films'];
const gallerySections = ['The Ceremony', 'The Couple', 'The Family', 'The Celebration'];

const AdminProjects = () => {
  const { addToast } = useToast();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    clientNames: '',
    category: 'Weddings',
    location: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    coverImage: { url: '', publicId: '' },
    gallery: [],
    filmUrl: '',
    featured: false,
    showOnInstagramSection: false
  });

  const [newGalleryUrl, setNewGalleryUrl] = useState('');
  const [newGallerySection, setNewGallerySection] = useState('The Ceremony');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await api.get('/projects');
      setProjects(res.data);
    } catch (err) {
      console.error(err);
      addToast('Failed to fetch projects', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({
      title: '',
      clientNames: '',
      category: 'Weddings',
      location: '',
      date: new Date().toISOString().split('T')[0],
      description: '',
      coverImage: { url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1600&auto=format&fit=crop', publicId: '' },
      gallery: [],
      filmUrl: '',
      featured: false,
      showOnInstagramSection: false
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (project) => {
    setEditingId(project._id);
    setFormData({
      title: project.title || '',
      clientNames: project.clientNames || '',
      category: project.category || 'Weddings',
      location: project.location || '',
      date: project.date ? new Date(project.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      description: project.description || '',
      coverImage: project.coverImage || { url: '', publicId: '' },
      gallery: project.gallery || [],
      filmUrl: project.filmUrl || '',
      featured: Boolean(project.featured),
      showOnInstagramSection: Boolean(project.showOnInstagramSection)
    });
    setModalOpen(true);
  };

  const handleCoverUpload = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    console.log('Selected file:', file.name, file.type, file.size);

    if (!file.type.startsWith('image/')) {
      addToast('Please select an image file', 'error');
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      addToast('Image must be smaller than 20MB', 'error');
      return;
    }

    const data = new FormData();
    data.append('image', file);

    setUploading(true);

    try {
      const res = await api.post('/uploads/image', data);

      console.log('Cloudinary upload response:', res.data);

      if (!res.data?.url) {
        throw new Error('Upload succeeded but no image URL was returned');
      }

      setFormData((prev) => ({
        ...prev,
        coverImage: {
          url: res.data.url,
          publicId: res.data.publicId || '',
        },
      }));

      addToast('Cover image uploaded successfully', 'success');
    } catch (err) {
      console.error('IMAGE UPLOAD ERROR:', err);
      console.error('Status:', err.response?.status);
      console.error('Response:', err.response?.data);

      addToast(
        err.response?.data?.message || 'Failed to upload cover image',
        'error'
      );
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleGalleryUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    try {
      const newItems = [];
      for (const file of files) {
        const data = new FormData();
        data.append('image', file);
        const res = await api.post('/uploads/image', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        newItems.push({
          url: res.data.url,
          publicId: res.data.publicId,
          section: newGallerySection
        });
      }
      setFormData((prev) => ({
        ...prev,
        gallery: [...prev.gallery, ...newItems]
      }));
      addToast(`Added ${newItems.length} photos to gallery`, 'success');
    } catch (err) {
      console.error(err);
      addToast('Failed to upload gallery images', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleAddGalleryUrl = () => {
    if (!newGalleryUrl) return;
    setFormData((prev) => ({
      ...prev,
      gallery: [...prev.gallery, { url: newGalleryUrl, publicId: '', section: newGallerySection }]
    }));
    setNewGalleryUrl('');
  };

  const handleRemoveGalleryImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.clientNames || !formData.coverImage.url) {
      addToast('Title, client names, and cover image are required', 'error');
      return;
    }

    try {
      if (editingId) {
        await api.put(`/projects/${editingId}`, formData);
        addToast('Project updated successfully', 'success');
      } else {
        await api.post('/projects', formData);
        addToast('Project published successfully', 'success');
      }
      setModalOpen(false);
      fetchProjects();
    } catch (err) {
      console.error(err);
      addToast(err.response?.data?.message || 'Failed to save project', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await api.delete(`/projects/${id}`);
      addToast('Project deleted', 'info');
      fetchProjects();
    } catch (err) {
      console.error(err);
      addToast('Failed to delete project', 'error');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C5A880]">
            Portfolio Manager
          </span>
          <h1 className="font-editorial text-3xl text-white font-normal mt-1">
            Studio <span className="italic font-light text-[#C5A880]">Projects</span>
          </h1>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C5A880] text-black text-xs uppercase tracking-widest font-semibold hover:bg-white transition-colors shadow-lg self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Publish New Project</span>
        </button>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="flex justify-center py-20 text-[#C5A880]">
          <div className="w-8 h-8 border-2 border-[#C5A880] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20 text-neutral-400 font-light bg-[#121212] rounded-3xl border border-white/5">
          <p>No projects published yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-[#121212] border border-white/5 rounded-2xl overflow-hidden flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-black">
                <img
                  src={project.coverImage?.url}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[#C5A880] border border-[#C5A880]/30">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-300" /> Featured
                    </span>
                  )}
                </div>
              </div>

              <div className="p-5 space-y-2 flex-1">
                <h3 className="font-editorial text-xl text-white font-medium">
                  {project.clientNames}
                </h3>
                <p className="text-xs text-neutral-400 font-light">{project.location}</p>
                <p className="text-xs italic text-neutral-500 font-serif line-clamp-1">"{project.title}"</p>
                <p className="text-[11px] text-neutral-500 font-light pt-2 border-t border-white/5">
                  Gallery: {project.gallery ? project.gallery.length : 0} photos
                </p>
              </div>

              <div className="p-4 bg-black/40 border-t border-white/5 flex items-center justify-end gap-3">
                <button
                  onClick={() => handleOpenEdit(project)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-[#C5A880] text-neutral-300 hover:text-black transition-colors"
                  title="Edit Project"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500 text-rose-300 hover:text-white transition-colors"
                  title="Delete Project"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Form */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-[#121212] border border-white/10 rounded-3xl p-6 sm:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto space-y-6"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="font-editorial text-2xl text-white">
                  {editingId ? 'Edit Project' : 'Publish New Project'}
                </h3>
                <button onClick={() => setModalOpen(false)} className="text-neutral-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-neutral-300 font-semibold mb-2">
                      Story Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. Royal Heritage Symphony"
                      required
                      className="w-full bg-[#070707] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-neutral-300 font-semibold mb-2">
                      Client Names *
                    </label>
                    <input
                      type="text"
                      value={formData.clientNames}
                      onChange={(e) => setFormData({ ...formData, clientNames: e.target.value })}
                      placeholder="e.g. Ananya & Vikram"
                      required
                      className="w-full bg-[#070707] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-neutral-300 font-semibold mb-2">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-[#070707] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#C5A880]"
                    >
                      {categories.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-neutral-300 font-semibold mb-2">
                      Location *
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g. Udaipur, Rajasthan"
                      required
                      className="w-full bg-[#070707] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-neutral-300 font-semibold mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-[#070707] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-neutral-300 font-semibold mb-2">
                      Wedding Film URL (YouTube/Vimeo Embed)
                    </label>
                    <input
                      type="text"
                      value={formData.filmUrl}
                      onChange={(e) => setFormData({ ...formData, filmUrl: e.target.value })}
                      placeholder="https://www.youtube.com/embed/..."
                      className="w-full bg-[#070707] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#C5A880]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-neutral-300 font-semibold mb-2">
                    Description / Story Snippet
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief story snippet about the wedding celebration..."
                    className="w-full bg-[#070707] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#C5A880] resize-none"
                  />
                </div>

                {/* Cover Image */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-neutral-300 font-semibold mb-2">
                    Cover Image URL or File Upload *
                  </label>
                  <div className="flex items-center gap-3 mb-2">
                    <input
                      type="text"
                      value={formData.coverImage.url}
                      onChange={(e) => setFormData({ ...formData, coverImage: { ...formData.coverImage, url: e.target.value } })}
                      placeholder="https://..."
                      className="flex-1 bg-[#070707] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
                    />
                    <label className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-[#C5A880] hover:text-black text-xs font-semibold uppercase tracking-wider cursor-pointer transition-colors flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      <span>{uploading ? 'Uploading...' : 'Upload'}</span>
                      <input type="file" onChange={handleCoverUpload} accept="image/*" className="hidden" />
                    </label>
                  </div>
                  {formData.coverImage.url && (
                    <img src={formData.coverImage.url} alt="Cover Preview" className="h-28 rounded-xl object-cover border border-white/10" />
                  )}
                </div>

                {/* Gallery Upload */}
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <label className="block text-xs uppercase tracking-widest text-neutral-300 font-semibold">
                    Gallery Images
                  </label>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <select
                      value={newGallerySection}
                      onChange={(e) => setNewGallerySection(e.target.value)}
                      className="bg-[#070707] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                    >
                      {gallerySections.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>

                    <input
                      type="text"
                      value={newGalleryUrl}
                      onChange={(e) => setNewGalleryUrl(e.target.value)}
                      placeholder="Or paste Image URL..."
                      className="flex-1 bg-[#070707] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                    />

                    <button
                      type="button"
                      onClick={handleAddGalleryUrl}
                      className="px-4 py-2 bg-white/10 hover:bg-[#C5A880] hover:text-black text-xs font-semibold rounded-xl text-white"
                    >
                      Add URL
                    </button>

                    <label className="px-4 py-2 bg-[#C5A880] text-black text-xs font-semibold rounded-xl cursor-pointer hover:bg-white flex items-center justify-center gap-1">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Batch Upload</span>
                      <input type="file" multiple onChange={handleGalleryUpload} accept="image/*" className="hidden" />
                    </label>
                  </div>

                  {/* Gallery Thumbnails List */}
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 pt-2 max-h-40 overflow-y-auto">
                    {formData.gallery.map((img, i) => (
                      <div key={i} className="relative aspect-square rounded-lg overflow-hidden group border border-white/10">
                        <img src={img.url} alt={`Gallery item ${i}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveGalleryImage(i)}
                          className="absolute top-1 right-1 p-1 rounded-full bg-rose-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Flags */}
                <div className="flex items-center gap-6 pt-4 border-t border-white/10">
                  <label className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-300 font-semibold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-4 h-4 rounded accent-[#C5A880]"
                    />
                    <span>Featured on Homepage</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-300 font-semibold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.showOnInstagramSection}
                      onChange={(e) => setFormData({ ...formData, showOnInstagramSection: e.target.checked })}
                      className="w-4 h-4 rounded accent-[#C5A880]"
                    />
                    <span>Show on Instagram Section</span>
                  </label>
                </div>

                {/* Submit */}
                <div className="pt-4 flex justify-end gap-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-6 py-3 rounded-full text-xs uppercase tracking-widest text-neutral-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 rounded-full bg-[#C5A880] text-black text-xs uppercase tracking-widest font-semibold hover:bg-white transition-colors"
                  >
                    {editingId ? 'Save Changes' : 'Publish Project'}
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

export default AdminProjects;
