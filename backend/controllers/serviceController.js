const Service = require('../models/Service');

// @desc    Get all services
// @route   GET /api/services
const getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ order: 1, createdAt: 1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create service (Admin)
// @route   POST /api/services
const createService = async (req, res) => {
  try {
    const { title, description, icon, features, order } = req.body;
    const service = new Service({
      title,
      description,
      icon: icon || 'Camera',
      features: features || [],
      order: order || 0
    });
    const saved = await service.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update service (Admin)
// @route   PUT /api/services/:id
const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Service.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Service not found' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete service (Admin)
// @route   DELETE /api/services/:id
const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Service.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Service not found' });
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getServices, createService, updateService, deleteService };
