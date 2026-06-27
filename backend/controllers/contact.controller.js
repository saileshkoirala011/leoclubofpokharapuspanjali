import Contact from '../models/Contact.js';

export const createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
        errors: [
          !name    && { field: 'name',    message: 'Name is required' },
          !email   && { field: 'email',   message: 'Email is required' },
          !subject && { field: 'subject', message: 'Subject is required' },
          !message && { field: 'message', message: 'Message is required' },
        ].filter(Boolean),
      });
    }

    const contact = new Contact({
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });

    await contact.save();

    res.status(201).json({
      success: true,
      message: 'Contact message saved successfully',
      data: contact,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => ({
        field: err.path,
        message: err.message,
      }));
      return res.status(400).json({
        success: false,
        message: 'Validation error: ' + errors.map(e => e.message).join('; '),
        errors,
      });
    }
    res.status(500).json({ success: false, message: 'Error saving contact message', error: error.message });
  }
};

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: contacts.length, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching contacts', error: error.message });
  }
};

export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ success: false, message: 'Contact not found' });
    res.status(200).json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching contact', error: error.message });
  }
};

export const updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['new', 'read', 'replied'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }
    const contact = await Contact.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!contact) return res.status(404).json({ success: false, message: 'Contact not found' });
    res.status(200).json({ success: true, message: 'Contact status updated', data: contact });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating contact', error: error.message });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ success: false, message: 'Contact not found' });
    res.status(200).json({ success: true, message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting contact', error: error.message });
  }
};