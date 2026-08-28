const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  publicId: { type: String, default: '' },
  section: { type: String, default: 'Gallery' } // e.g. "The Ceremony", "The Couple", "The Family", "The Celebration"
});

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  clientNames: { type: String, required: true, trim: true },
  category: { 
    type: String, 
    required: true, 
    enum: ['Weddings', 'Pre-Weddings', 'Couples', 'Portraits', 'Events', 'Films'] 
  },
  location: { type: String, required: true, trim: true },
  date: { type: Date, default: Date.now },
  description: { type: String, default: '' },
  coverImage: {
    url: { type: String, required: true },
    publicId: { type: String, default: '' }
  },
  gallery: [imageSchema],
  filmUrl: { type: String, default: '' },
  featured: { type: Boolean, default: false },
  showOnInstagramSection: { type: Boolean, default: false },
  slug: { type: String, required: true, unique: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);
