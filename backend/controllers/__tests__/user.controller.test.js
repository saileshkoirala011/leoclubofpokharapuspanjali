import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockFind = vi.fn();
const mockFindById = vi.fn();
const mockFindByIdAndUpdate = vi.fn();
const mockFindByIdAndDelete = vi.fn();

vi.mock('../../models/user.js', () => {
  const UserConstructor = vi.fn();
  UserConstructor.find = mockFind;
  UserConstructor.findById = mockFindById;
  UserConstructor.findByIdAndUpdate = mockFindByIdAndUpdate;
  UserConstructor.findByIdAndDelete = mockFindByIdAndDelete;
  return { default: UserConstructor };
});

const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = await import('../user.controller.js');

describe('user controller', () => {
  let req, res;

  beforeEach(() => {
    vi.clearAllMocks();
    req = { body: {}, params: {} };
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
  });

  describe('getAllUsers', () => {
    it('returns all users without password fields', async () => {
      const users = [{ name: 'User1' }, { name: 'User2' }];
      mockFind.mockReturnValue({
        select: vi.fn().mockReturnValue({
          sort: vi.fn().mockResolvedValue(users),
        }),
      });

      await getAllUsers(req, res);

      expect(mockFind).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          count: 2,
          data: users,
        }),
      );
    });

    it('handles errors with 500', async () => {
      mockFind.mockReturnValue({
        select: vi.fn().mockReturnValue({
          sort: vi.fn().mockRejectedValue(new Error('DB error')),
        }),
      });

      await getAllUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'Error fetching users',
        }),
      );
    });
  });

  describe('getUserById', () => {
    it('returns 404 when user not found', async () => {
      req.params.id = 'nonexistent';
      mockFindById.mockReturnValue({
        select: vi.fn().mockResolvedValue(null),
      });

      await getUserById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ success: false, message: 'User not found' }),
      );
    });

    it('returns the user when found', async () => {
      const user = { name: 'Test', email: 'test@test.com' };
      req.params.id = '123';
      mockFindById.mockReturnValue({
        select: vi.fn().mockResolvedValue(user),
      });

      await getUserById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ success: true, data: user }),
      );
    });

    it('handles errors with 500', async () => {
      req.params.id = '123';
      mockFindById.mockReturnValue({
        select: vi.fn().mockRejectedValue(new Error('DB error')),
      });

      await getUserById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe('updateUser', () => {
    it('strips password from updates', async () => {
      req.params.id = '123';
      req.body = { name: 'Updated', password: 'should-be-removed' };
      const updated = { name: 'Updated' };
      mockFindByIdAndUpdate.mockReturnValue({
        select: vi.fn().mockResolvedValue(updated),
      });

      await updateUser(req, res);

      const passedUpdates = mockFindByIdAndUpdate.mock.calls[0][1];
      expect(passedUpdates.password).toBeUndefined();
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('returns 404 when user not found', async () => {
      req.params.id = '123';
      req.body = { name: 'Updated' };
      mockFindByIdAndUpdate.mockReturnValue({
        select: vi.fn().mockResolvedValue(null),
      });

      await updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });

    it('returns updated user on success', async () => {
      const updated = { name: 'Updated', email: 'new@test.com' };
      req.params.id = '123';
      req.body = { name: 'Updated', email: 'new@test.com' };
      mockFindByIdAndUpdate.mockReturnValue({
        select: vi.fn().mockResolvedValue(updated),
      });

      await updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          message: 'User updated',
          data: updated,
        }),
      );
    });

    it('handles errors with 500', async () => {
      req.params.id = '123';
      req.body = { name: 'Updated' };
      mockFindByIdAndUpdate.mockReturnValue({
        select: vi.fn().mockRejectedValue(new Error('DB error')),
      });

      await updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe('deleteUser', () => {
    it('returns 404 when user not found', async () => {
      req.params.id = '123';
      mockFindByIdAndDelete.mockResolvedValue(null);

      await deleteUser(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });

    it('deletes user and returns success', async () => {
      req.params.id = '123';
      mockFindByIdAndDelete.mockResolvedValue({ name: 'Deleted' });

      await deleteUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ success: true, message: 'User deleted' }),
      );
    });

    it('handles errors with 500', async () => {
      req.params.id = '123';
      mockFindByIdAndDelete.mockRejectedValue(new Error('DB error'));

      await deleteUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
});
