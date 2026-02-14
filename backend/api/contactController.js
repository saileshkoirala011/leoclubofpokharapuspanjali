import Contact from '../models/Contact.js';

// Create a new contact message
export const createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    console.log('=== Contact Submission ===');
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    console.log('Received contact data:', { name, email, subject, message });

    // Validate input
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
        errors: [
          !name && { field: 'name', message: 'Name is required' },
          !email && { field: 'email', message: 'Email is required' },
          !subject && { field: 'subject', message: 'Subject is required' },
          !message && { field: 'message', message: 'Message is required' },
        ].filter(Boolean),
      });
    }

    const contact = new Contact({
      name: (name || '').trim(),
      email: (email || '').trim(),
      subject: (subject || '').trim(),
      message: (message || '').trim(),
    });

    console.log('Attempting to save contact...');
    await contact.save();
    console.log('Contact saved successfully:', contact._id);

    res.status(201).json({
      success: true,
      message: 'Contact message saved successfully',
      data: contact,
    });
  } catch (error) {
    console.error('=== Contact Creation Error ===');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error details:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => ({
        field: err.path,
        message: err.message,
      }));
      const errorMessages = errors.map(e => e.message).join('; ');
      console.error('Validation errors:', errors);
      return res.status(400).json({
        success: false,
        message: 'Validation error: ' + errorMessages,
        errors: errors,
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error saving contact message',
      error: error.message,
    });
  }
};

// Get all contacts
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching contacts',
      error: error.message,
    });
  }
};

// Get contact by ID
export const getContactById = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found',
      });
    }

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching contact',
      error: error.message,
    });
  }
};

// Update contact status
export const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['new', 'read', 'replied'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status',
      });
    }

    const contact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contact status updated',
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating contact',
      error: error.message,
    });
  }
};

// Delete contact
export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contact deleted successfully',
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting contact',
      error: error.message,
    });
  }
};
