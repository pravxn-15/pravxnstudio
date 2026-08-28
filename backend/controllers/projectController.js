const Project = require('../models/Project');

// Helper to format slug
const createSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// @desc    Get all projects (with optional category, featured, instagram filters)
// @route   GET /api/projects
const getProjects = async (req, res) => {
  try {
    const { category, featured, instagram } = req.query;
    const filter = {};

    if (category && category !== 'All') {
      filter.category = category;
    }
    if (featured === 'true') {
      filter.featured = true;
    }
    if (instagram === 'true') {
      filter.showOnInstagramSection = true;
    }

    const projects = await Project.find(filter).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single project by slug or ID
// @route   GET /api/projects/:slug
const getProjectBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    let project = await Project.findOne({ slug });
    if (!project) {
      // Fallback by ID if search parameter is MongoDB ObjectId
      if (slug.match(/^[0-9a-fA-F]{24}$/)) {
        project = await Project.findById(slug);
      }
    }

    if (!project) {
      return res.status(404).json({ message: 'Project story not found' });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a project (Admin)
// @route   POST /api/projects
const createProject = async (req, res) => {
  try {
    const {
      title,
      clientNames,
      category,
      location,
      date,
      description,
      coverImage,
      gallery,
      filmUrl,
      featured,
      showOnInstagramSection
    } = req.body;

    if (!title || !clientNames || !category || !location || !coverImage?.url) {
      return res.status(400).json({ message: 'Title, client names, category, location, and cover image are required.' });
    }

    let slug = createSlug(`${title}-${clientNames}`);
    let existingSlug = await Project.findOne({ slug });
    if (existingSlug) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const project = new Project({
      title,
      clientNames,
      category,
      location,
      date: date || Date.now(),
      description,
      coverImage,
      gallery: gallery || [],
      filmUrl: filmUrl || '',
      featured: Boolean(featured),
      showOnInstagramSection: Boolean(showOnInstagramSection),
      slug
    });

    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a project (Admin)
// @route   PUT /api/projects/:id
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const {
      title,
      clientNames,
      category,
      location,
      date,
      description,
      coverImage,
      gallery,
      filmUrl,
      featured,
      showOnInstagramSection
    } = req.body;

    if (title) project.title = title;
    if (clientNames) project.clientNames = clientNames;
    if (category) project.category = category;
    if (location) project.location = location;
    if (date) project.date = date;
    if (description !== undefined) project.description = description;
    if (coverImage) project.coverImage = coverImage;
    if (gallery) project.gallery = gallery;
    if (filmUrl !== undefined) project.filmUrl = filmUrl;
    if (featured !== undefined) project.featured = Boolean(featured);
    if (showOnInstagramSection !== undefined) project.showOnInstagramSection = Boolean(showOnInstagramSection);

    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a project (Admin)
// @route   DELETE /api/projects/:id
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject
};
