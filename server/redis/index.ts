import config from "./setup/config";
import { createClient } from "redis";
import { redisLogger } from "./setup/logger";

export const client = createClient({
  url: config.redis.url,
});

client.on("error", (error) => {
  redisLogger.error(`Client Error ${JSON.stringify(error)}`);
});

export const connection = async (): Promise<void> => {
  try {
    await client.connect();
    redisLogger.info("Connection Established");
  } catch (e) {
    redisLogger.error(`Connection Error ${e}`);
  }
};
