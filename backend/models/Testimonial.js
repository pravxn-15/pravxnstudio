const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  quote: { type: String, required: true },
  clientNames: { type: String, required: true },
  location: { type: String, default: '' },
  photo: {
    url: { type: String, default: '' },
    publicId: { type: String, default: '' }
  },
  order: { type: Number, default: 0 }
}, {
  timestamps: true
});

module.exports = mongoose.model('Testimonial', testimonialSchema);
