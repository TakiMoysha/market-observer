import os from "node:os";

import { memoryUsage } from "node:process";
import config from "../setup/config";

import Elysia from "elysia";

export default new Elysia({ tags: ["status"] })
  .get("/", () => ({ version: "v1" }))
  .get("/health", () => ({ status: "ok" }))
  .get("/status", () => ({
    cpu: os.loadavg()[0],
    memory: `${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB`,
    memoryUsage: memoryUsage,
    config: config,
  }))
  .post("/report", () => {
    return { status: "ok" };
  });
