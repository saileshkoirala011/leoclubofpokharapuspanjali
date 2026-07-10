import { Redis as RedisClient } from "ioredis";
import { env } from "./env.js";
import { logger } from "../utils/logger.js";

let redisClient: RedisClient | null = null;

export function getRedis(): RedisClient {
  if (!redisClient) {
    redisClient = new RedisClient(env.REDIS_URL, {
      maxRetriesPerRequest: 3,
      enableReadyCheck:     true,
      lazyConnect:          false,
    });

    redisClient.on("connect", () => logger.info("Redis connected"));
    redisClient.on("error",   (err: Error) => logger.error({ err }, "Redis error"));
    redisClient.on("close",   () => logger.warn("Redis connection closed"));
  }
  return redisClient;
}

export async function disconnectRedis(): Promise<void> {
  if (redisClient) {
    await redisClient.quit();
    redisClient = null;
    logger.info("Redis disconnected gracefully");
  }
}
