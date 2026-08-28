const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  eventType: { type: String, required: true, default: 'Wedding' },
  weddingDate: { type: Date },
  venue: { type: String, default: '' },
  guestCount: { type: Number, default: 0 },
  message: { type: String, default: '' },
  status: { 
    type: String, 
    enum: ['new', 'contacted', 'closed'], 
    default: 'new' 
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Enquiry', enquirySchema);
