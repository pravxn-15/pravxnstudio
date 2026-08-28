const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  studioName: { type: String, default: 'pravxnstudio' },
  tagline: { type: String, default: 'Every frame tells a story.' },
  heroSubtitle: { type: String, default: 'Wedding Photography & Films — Chennai · Tamil Nadu · Worldwide' },
  phone: { type: String, default: '8056807652' },
  whatsapp: { type: String, default: '918056807652' },
  email: { type: String, default: 'praveencse1503@gmail.com' },
  instagram: { type: String, default: 'https://www.instagram.com/its_tomy14' },
  footerCreditUrl: { type: String, default: 'https://www.instagram.com/pravxn_offl' },
  address: { type: String, default: 'Chennai, Tamil Nadu, India' },
  heroVideoUrl: { type: String, default: '' },
  heroImageUrl: { type: String, default: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Setting', settingSchema);
