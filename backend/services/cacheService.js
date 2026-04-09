const memoryCache = new Map();

const getFromMemory = (key) => {
  const cached = memoryCache.get(key);
  if (!cached) return null;

  if (cached.expiresAt <= Date.now()) {
    memoryCache.delete(key);
    return null;
  }

  return cached.value;
};

const setInMemory = (key, value, ttlSeconds = 60) => {
  memoryCache.set(key, {
    value,
    expiresAt: Date.now() + ttlSeconds * 1000,
  });
};

export const cacheService = {
  async get(key) {
    return getFromMemory(key);
  },
  async set(key, value, ttlSeconds = 60) {
    setInMemory(key, value, ttlSeconds);
  },
  async del(key) {
    memoryCache.delete(key);
  },
};

export default cacheService;
