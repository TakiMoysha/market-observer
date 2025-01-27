import os from "node:os";

import { memoryUsage } from "node:process";
import { Elysia, t } from "elysia";

export const AuthService = new Elysia({ name: "Service:HealthCheck" })
  .derive({ as: "scoped" }, ({ cookie: { session } }) => ({
    auth: { user: session.value },
  }))
  .macro(({ onBeforeHandle }) => ({
    isSignIn(value: boolean) {
      onBeforeHandle(({ auth, error }) => {
        if (!auth?.user || !auth.user) return error(401);
      });
    },
  }));

export const HealthController = new Elysia()
  .use(AuthService)
  .get("/health", () => ({ status: "ok" }))
  .get("/status", ({ auth: { user } }) => {
    const body = {
      cpu: os.loadavg()[0],
      memory: `${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB`,
      memoryUsage: memoryUsage,
    };
    return body;
  });
