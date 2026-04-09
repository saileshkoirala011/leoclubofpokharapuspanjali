import crypto from 'crypto';

const ITERATIONS = 120000;
const KEYLEN = 64;
const DIGEST = 'sha512';

export const hashPassword = (password) => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto
    .pbkdf2Sync(password, salt, ITERATIONS, KEYLEN, DIGEST)
    .toString('hex');
  return `${ITERATIONS}:${salt}:${hash}`;
};

export const verifyPassword = (password, storedHash) => {
  const [iterRaw, salt, hash] = storedHash.split(':');
  if (!iterRaw || !salt || !hash) return false;

  const iterations = Number(iterRaw);
  const verifyHash = crypto
    .pbkdf2Sync(password, salt, iterations, KEYLEN, DIGEST)
    .toString('hex');

  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(verifyHash));
};
