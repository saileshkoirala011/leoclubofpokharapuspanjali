import Gallery from '../models/Gallery.js';

// Create gallery item
export const createGallery = async (req, res) => {
  try {
    const { title, description, image, category, date } = req.body;

    if (!title || !image || !category) {
      return res.status(400).json({
        success: false,
        message: 'Title, image, and category are required',
      });
    }

    const gallery = new Gallery({
      title,
      description,
      image,
      category,
      date,
    });

    await gallery.save();

    res.status(201).json({
      success: true,
      message: 'Gallery item added successfully',
      data: gallery,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating gallery item',
      error: error.message,
    });
  }
};

// Get all gallery items
export const getAllGallery = async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};

    if (category) {
      query.category = category;
    }

    const gallery = await Gallery.find(query).sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: gallery.length,
      data: gallery,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching gallery items',
      error: error.message,
    });
  }
};

// Get gallery item by ID
export const getGalleryById = async (req, res) => {
  try {
    const { id } = req.params;
    const gallery = await Gallery.findById(id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found',
      });
    }

    res.status(200).json({
      success: true,
      data: gallery,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching gallery item',
      error: error.message,
    });
  }
};

// Update gallery item
export const updateGallery = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const gallery = await Gallery.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Gallery item updated successfully',
      data: gallery,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating gallery item',
      error: error.message,
    });
  }
};

// Delete gallery item
export const deleteGallery = async (req, res) => {
  try {
    const { id } = req.params;
    const gallery = await Gallery.findByIdAndDelete(id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Gallery item deleted successfully',
      data: gallery,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting gallery item',
      error: error.message,
    });
  }
};
