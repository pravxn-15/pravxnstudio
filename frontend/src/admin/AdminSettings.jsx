import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { useToast } from '../context/ToastContext';
import { Save, Settings as SettingsIcon, Image, Phone, Mail, Instagram, MapPin } from 'lucide-react';

const AdminSettings = () => {
  const { addToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [settings, setSettings] = useState({
    studioName: 'pravxnstudio',
    tagline: 'Every frame tells a story.',
    heroSubtitle: 'Wedding Photography & Films — Chennai · Tamil Nadu · Worldwide',
    phone: '8056807652',
    whatsapp: '918056807652',
    email: 'praveencse1503@gmail.com',
    instagram: 'https://www.instagram.com/its_tomy14',
    footerCreditUrl: 'https://www.instagram.com/pravxn_offl',
    address: 'Chennai, Tamil Nadu, India',
    heroImageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop'
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await api.get('/settings');
      if (res.data) setSettings(res.data);
    } catch (err) {
      console.error(err);
      addToast('Failed to fetch settings', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put('/settings', settings);
      addToast('Studio settings saved successfully', 'success');
    } catch (err) {
      console.error(err);
      addToast('Failed to save settings', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20 text-[#C5A880]">
        <div className="w-8 h-8 border-2 border-[#C5A880] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C5A880]">
          Configuration
        </span>
        <h1 className="font-editorial text-3xl text-white font-normal mt-1">
          Studio <span className="italic font-light text-[#C5A880]">Settings</span>
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#121212] border border-white/5 rounded-3xl p-8 space-y-6 shadow-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-neutral-300 font-semibold mb-2">
              Studio Name
            </label>
            <input
              type="text"
              name="studioName"
              value={settings.studioName}
              onChange={handleChange}
              className="w-full bg-[#070707] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#C5A880]"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-neutral-300 font-semibold mb-2">
              Tagline
            </label>
            <input
              type="text"
              name="tagline"
              value={settings.tagline}
              onChange={handleChange}
              className="w-full bg-[#070707] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#C5A880]"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs uppercase tracking-widest text-neutral-300 font-semibold mb-2">
              Hero Subtitle / Locations
            </label>
            <input
              type="text"
              name="heroSubtitle"
              value={settings.heroSubtitle}
              onChange={handleChange}
              className="w-full bg-[#070707] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#C5A880]"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-neutral-300 font-semibold mb-2">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={settings.phone}
              onChange={handleChange}
              className="w-full bg-[#070707] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#C5A880]"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-neutral-300 font-semibold mb-2">
              WhatsApp Number (with country code)
            </label>
            <input
              type="text"
              name="whatsapp"
              value={settings.whatsapp}
              onChange={handleChange}
              className="w-full bg-[#070707] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#C5A880]"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-neutral-300 font-semibold mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={settings.email}
              onChange={handleChange}
              className="w-full bg-[#070707] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#C5A880]"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-neutral-300 font-semibold mb-2">
              Instagram Profile URL
            </label>
            <input
              type="text"
              name="instagram"
              value={settings.instagram}
              onChange={handleChange}
              className="w-full bg-[#070707] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#C5A880]"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs uppercase tracking-widest text-neutral-300 font-semibold mb-2">
              Footer Credit URL (Powered by pravxn)
            </label>
            <input
              type="text"
              name="footerCreditUrl"
              value={settings.footerCreditUrl}
              onChange={handleChange}
              className="w-full bg-[#070707] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#C5A880]"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs uppercase tracking-widest text-neutral-300 font-semibold mb-2">
              Hero Cover Image URL
            </label>
            <input
              type="text"
              name="heroImageUrl"
              value={settings.heroImageUrl}
              onChange={handleChange}
              className="w-full bg-[#070707] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#C5A880]"
            />
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 rounded-full bg-[#C5A880] text-black text-xs uppercase tracking-widest font-semibold hover:bg-white transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving Settings...' : 'Save Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;
