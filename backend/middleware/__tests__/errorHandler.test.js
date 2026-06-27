import { describe, it, expect, vi, beforeEach } from 'vitest';
import { errorHandler } from '../errorHandler.js';

describe('errorHandler middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = {};
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
    next = vi.fn();
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('responds with the error statusCode and message', () => {
    const err = new Error('Not found');
    err.statusCode = 404;

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: false, message: 'Not found' }),
    );
  });

  it('defaults to 500 when statusCode is missing', () => {
    const err = new Error('Something broke');

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  it('defaults message to "Internal Server Error" when message is empty', () => {
    const err = new Error();

    errorHandler(err, req, res, next);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Internal Server Error' }),
    );
  });

  it('includes error details in development mode', () => {
    const original = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    const err = new Error('dev error');
    err.statusCode = 400;

    errorHandler(err, req, res, next);

    const body = res.json.mock.calls[0][0];
    expect(body.error).toEqual(
      expect.objectContaining({ name: 'Error', message: 'dev error' }),
    );
    expect(body.error.stack).toBeDefined();

    process.env.NODE_ENV = original;
  });

  it('hides error details in production mode', () => {
    const original = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';

    const err = new Error('secret details');
    err.statusCode = 500;

    errorHandler(err, req, res, next);

    const body = res.json.mock.calls[0][0];
    expect(body.error).toEqual({});

    process.env.NODE_ENV = original;
  });

  it('logs the error', () => {
    const err = new Error('log me');
    errorHandler(err, req, res, next);

    expect(console.error).toHaveBeenCalledWith('Error:', {
      message: 'log me',
      name: 'Error',
    });
  });
});
