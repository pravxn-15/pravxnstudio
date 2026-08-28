const Testimonial = require('../models/Testimonial');

// @desc    Get all testimonials
// @route   GET /api/testimonials
const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ order: 1, createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create testimonial (Admin)
// @route   POST /api/testimonials
const createTestimonial = async (req, res) => {
  try {
    const { quote, clientNames, location, photo, order } = req.body;
    const testimonial = new Testimonial({
      quote,
      clientNames,
      location: location || '',
      photo: photo || { url: '', publicId: '' },
      order: order || 0
    });
    const saved = await testimonial.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update testimonial (Admin)
// @route   PUT /api/testimonials/:id
const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Testimonial.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Testimonial not found' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete testimonial (Admin)
// @route   DELETE /api/testimonials/:id
const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Testimonial.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Testimonial not found' });
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTestimonials, createTestimonial, updateTestimonial, deleteService: deleteTestimonial, deleteTestimonial };
