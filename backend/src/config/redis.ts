import { Redis as RedisClient } from "ioredis";
import { env }    from "./env.js";
import { logger } from "../utils/logger.js";

let redisClient: RedisClient | null = null;
let redisAvailable = false;

/**
 * getRedis — returns the shared Redis client.
 * Safe to call even before the client has connected.
 */
export function getRedis(): RedisClient {
  if (!redisClient) {
    redisClient = new RedisClient(env.REDIS_URL, {
      maxRetriesPerRequest:    null,   // don't throw on retry exhaustion
      enableReadyCheck:        true,
      lazyConnect:             true,   // don't connect immediately on creation
      retryStrategy: (times) => {
        // Back off exponentially, cap at 30 s, give up after 10 attempts
        if (times > 10) {
          logger.warn("Redis: giving up reconnect attempts");
          return null;                 // returning null stops retrying
        }
        return Math.min(times * 500, 30_000);
      },
    });

    redisClient.on("connect",     ()          => { redisAvailable = true;  logger.info("Redis connected"); });
    redisClient.on("ready",       ()          => { redisAvailable = true;  logger.info("Redis ready"); });
    redisClient.on("error",       (err: Error) => { redisAvailable = false; logger.error({ err }, "Redis error"); });
    redisClient.on("close",       ()          => { redisAvailable = false; logger.warn("Redis connection closed"); });
    redisClient.on("reconnecting",()          => { logger.info("Redis reconnecting…"); });

    // Attempt connection — failures are handled by the error event above
    redisClient.connect().catch((err: Error) =>
      logger.warn({ err }, "Redis initial connect failed — running without Redis")
    );
  }
  return redisClient;
}

/**
 * isRedisAvailable — safe check before performing Redis operations.
 */
export function isRedisAvailable(): boolean {
  return redisAvailable && redisClient?.status === "ready";
}

/**
 * safeRedis — wraps a Redis operation so it never throws.
 * Returns the fallback value if Redis is down or the operation fails.
 */
export async function safeRedis<T>(
  operation: (client: RedisClient) => Promise<T>,
  fallback: T,
): Promise<T> {
  try {
    const client = getRedis();
    return await operation(client);
  } catch (err) {
    logger.warn({ err }, "Redis operation failed — using fallback");
    return fallback;
  }
}

export async function disconnectRedis(): Promise<void> {
  if (redisClient) {
    try {
      await redisClient.quit();
    } catch {
      redisClient.disconnect();
    }
    redisClient    = null;
    redisAvailable = false;
    logger.info("Redis disconnected gracefully");
  }
}
