import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockSave = vi.fn();
const mockFind = vi.fn();
const mockFindById = vi.fn();
const mockFindByIdAndUpdate = vi.fn();
const mockFindByIdAndDelete = vi.fn();

vi.mock('../../models/Contact.js', () => {
  function ContactConstructor(data) {
    Object.assign(this, data);
    this.save = mockSave;
  }
  ContactConstructor.find = mockFind;
  ContactConstructor.findById = mockFindById;
  ContactConstructor.findByIdAndUpdate = mockFindByIdAndUpdate;
  ContactConstructor.findByIdAndDelete = mockFindByIdAndDelete;
  return { default: ContactConstructor };
});

const {
  createContact,
  getAllContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
} = await import('../contact.controller.js');

describe('contact controller', () => {
  let req, res;

  beforeEach(() => {
    vi.clearAllMocks();
    req = { body: {}, params: {} };
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
  });

  describe('createContact', () => {
    const validBody = {
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Hello',
      message: 'This is a test message',
    };

    it('returns 400 when required fields are missing', async () => {
      req.body = { name: 'Test' };
      await createContact(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'All fields are required',
        }),
      );
    });

    it('creates and saves a contact on valid input', async () => {
      req.body = validBody;
      mockSave.mockResolvedValue(undefined);

      await createContact(req, res);

      expect(mockSave).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          message: 'Message sent successfully',
        }),
      );
    });

    it('trims input fields before saving', async () => {
      req.body = {
        name: '  Test User  ',
        email: ' test@example.com ',
        subject: ' Hello ',
        message: ' Message ',
      };
      mockSave.mockResolvedValue(undefined);

      await createContact(req, res);

      const responseData = res.json.mock.calls[0][0].data;
      expect(responseData.name).toBe('Test User');
      expect(responseData.email).toBe('test@example.com');
      expect(responseData.subject).toBe('Hello');
      expect(responseData.message).toBe('Message');
    });

    it('handles ValidationError from mongoose', async () => {
      req.body = validBody;
      const validationError = new Error('Validation failed');
      validationError.name = 'ValidationError';
      validationError.errors = {
        email: { message: 'Invalid email' },
        name: { message: 'Name too short' },
      };
      mockSave.mockRejectedValue(validationError);

      await createContact(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      const body = res.json.mock.calls[0][0];
      expect(body.success).toBe(false);
      expect(body.message).toContain('Invalid email');
      expect(body.message).toContain('Name too short');
    });

    it('handles generic errors with 500', async () => {
      req.body = validBody;
      mockSave.mockRejectedValue(new Error('DB down'));

      await createContact(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'Error saving message',
        }),
      );
    });
  });

  describe('getAllContacts', () => {
    it('returns all contacts sorted by createdAt desc', async () => {
      const contacts = [{ name: 'A' }, { name: 'B' }];
      mockFind.mockReturnValue({ sort: vi.fn().mockResolvedValue(contacts) });

      await getAllContacts(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          count: 2,
          data: contacts,
        }),
      );
    });

    it('handles errors with 500', async () => {
      mockFind.mockReturnValue({
        sort: vi.fn().mockRejectedValue(new Error('DB error')),
      });

      await getAllContacts(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe('getContactById', () => {
    it('returns 404 when contact not found', async () => {
      req.params.id = 'nonexistent';
      mockFindById.mockResolvedValue(null);

      await getContactById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ success: false, message: 'Contact not found' }),
      );
    });

    it('returns the contact when found', async () => {
      const contact = { name: 'Test', email: 'test@test.com' };
      req.params.id = '123';
      mockFindById.mockResolvedValue(contact);

      await getContactById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ success: true, data: contact }),
      );
    });

    it('handles errors with 500', async () => {
      req.params.id = '123';
      mockFindById.mockRejectedValue(new Error('DB error'));

      await getContactById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe('updateContactStatus', () => {
    it('returns 400 for invalid status', async () => {
      req.params.id = '123';
      req.body = { status: 'invalid' };

      await updateContactStatus(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ success: false, message: 'Invalid status' }),
      );
    });

    it('returns 404 when contact not found', async () => {
      req.params.id = '123';
      req.body = { status: 'read' };
      mockFindByIdAndUpdate.mockResolvedValue(null);

      await updateContactStatus(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });

    it('updates and returns the contact for valid status', async () => {
      const updated = { name: 'Test', status: 'replied' };
      req.params.id = '123';
      req.body = { status: 'replied' };
      mockFindByIdAndUpdate.mockResolvedValue(updated);

      await updateContactStatus(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          message: 'Status updated',
          data: updated,
        }),
      );
    });

    it('accepts all valid statuses: new, read, replied', async () => {
      for (const status of ['new', 'read', 'replied']) {
        vi.clearAllMocks();
        res = {
          status: vi.fn().mockReturnThis(),
          json: vi.fn().mockReturnThis(),
        };
        req.params.id = '123';
        req.body = { status };
        mockFindByIdAndUpdate.mockResolvedValue({ status });

        await updateContactStatus(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
      }
    });

    it('handles errors with 500', async () => {
      req.params.id = '123';
      req.body = { status: 'read' };
      mockFindByIdAndUpdate.mockRejectedValue(new Error('DB error'));

      await updateContactStatus(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe('deleteContact', () => {
    it('returns 404 when contact not found', async () => {
      req.params.id = '123';
      mockFindByIdAndDelete.mockResolvedValue(null);

      await deleteContact(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });

    it('deletes the contact and returns success', async () => {
      req.params.id = '123';
      mockFindByIdAndDelete.mockResolvedValue({ name: 'Deleted' });

      await deleteContact(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ success: true, message: 'Contact deleted' }),
      );
    });

    it('handles errors with 500', async () => {
      req.params.id = '123';
      mockFindByIdAndDelete.mockRejectedValue(new Error('DB error'));

      await deleteContact(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
});
