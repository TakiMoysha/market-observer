import { createPinoLogger, pino } from "@bogeychan/elysia-logger";
import { StandaloneLoggerOptions } from "@bogeychan/elysia-logger/dist/types";

import config from "./config";
import { join } from "path";
import { APP_SERVICE } from "../helpers";

const loggingConfig: Partial<StandaloneLoggerOptions> = {
  level: config.LOG_LEVEL,
  // timestamp: pino.stdTimeFunctions.isoTime,
  transport: {
    targets: [
      {
        target: "pino-roll",
        options: {
          file: join("tmp", "log"),
          size: 10 * 1024 * 1024,
          frequency: "daily",
          mkdir: true,
          sync: false,
        },
      },
      {
        target: "pino-pretty",
        options: {
          colorize: true,
        },
      },
    ],
  },
};

export const logger = createPinoLogger({ ...loggingConfig });
export const redisLogger = logger.child(
  { service: APP_SERVICE.REDIS },
  { msgPrefix: "[REDIS]" },
);
export const postgresLogger = logger.child(
  { service: APP_SERVICE.POSTGRES },
  { msgPrefix: "[POSTGRES]" },
);
