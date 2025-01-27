import os from "node:os";

import { memoryUsage } from "node:process";
import { Elysia, t } from "elysia";

export const HealthController = new Elysia()
  .get("/health", () => ({ status: "ok" }))
  .get("/status", () => {
    const body = {
      cpu: os.loadavg()[0],
      memory: `${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB`,
      memoryUsage: memoryUsage,
    };
    return body;
  });
