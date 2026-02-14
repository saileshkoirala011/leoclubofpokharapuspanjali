import About from '../models/About.js';

// Create about content
export const createAbout = async (req, res) => {
  try {
    const { title, description, image, content, missionStatement, visionStatement } = req.body;

    if (!title || !description || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title, description, and content are required',
      });
    }

    const about = new About({
      title,
      description,
      image,
      content,
      missionStatement,
      visionStatement,
    });

    await about.save();

    res.status(201).json({
      success: true,
      message: 'About content added successfully',
      data: about,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating about content',
      error: error.message,
    });
  }
};

// Get all about content
export const getAllAbout = async (req, res) => {
  try {
    const about = await About.find();

    res.status(200).json({
      success: true,
      count: about.length,
      data: about,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching about content',
      error: error.message,
    });
  }
};

// Get about by ID
export const getAboutById = async (req, res) => {
  try {
    const { id } = req.params;
    const about = await About.findById(id);

    if (!about) {
      return res.status(404).json({
        success: false,
        message: 'About content not found',
      });
    }

    res.status(200).json({
      success: true,
      data: about,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching about content',
      error: error.message,
    });
  }
};

// Update about
export const updateAbout = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const about = await About.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!about) {
      return res.status(404).json({
        success: false,
        message: 'About content not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'About content updated successfully',
      data: about,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating about content',
      error: error.message,
    });
  }
};

// Delete about
export const deleteAbout = async (req, res) => {
  try {
    const { id } = req.params;
    const about = await About.findByIdAndDelete(id);

    if (!about) {
      return res.status(404).json({
        success: false,
        message: 'About content not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'About content deleted successfully',
      data: about,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting about content',
      error: error.message,
    });
  }
};
