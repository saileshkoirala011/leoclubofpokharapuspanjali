import Team from '../models/Team.js';

// Create team member
export const createTeam = async (req, res) => {
  try {
    const { name, position, image, bio, email, phone, socialLinks } = req.body;

    if (!name || !position) {
      return res.status(400).json({
        success: false,
        message: 'Name and position are required',
      });
    }

    const team = new Team({
      name,
      position,
      image,
      bio,
      email,
      phone,
      socialLinks,
    });

    await team.save();

    res.status(201).json({
      success: true,
      message: 'Team member added successfully',
      data: team,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating team member',
      error: error.message,
    });
  }
};

// Get all team members
export const getAllTeam = async (req, res) => {
  try {
    const teams = await Team.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: teams.length,
      data: teams,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching team members',
      error: error.message,
    });
  }
};

// Get team member by ID
export const getTeamById = async (req, res) => {
  try {
    const { id } = req.params;
    const team = await Team.findById(id);

    if (!team) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found',
      });
    }

    res.status(200).json({
      success: true,
      data: team,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching team member',
      error: error.message,
    });
  }
};

// Update team member
export const updateTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const team = await Team.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!team) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Team member updated successfully',
      data: team,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating team member',
      error: error.message,
    });
  }
};

// Delete team member
export const deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const team = await Team.findByIdAndDelete(id);

    if (!team) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Team member deleted successfully',
      data: team,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting team member',
      error: error.message,
    });
  }
};
