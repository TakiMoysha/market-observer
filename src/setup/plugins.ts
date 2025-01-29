import Elysia from "elysia";

import cors from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import { sentry } from "elysiajs-sentry";
import staticPlugin from "@elysiajs/static";
import { logger } from "@bogeychan/elysia-logger";

import config from "./config";

const SentryStub = {
  captureException: () => {},
};

export const SentryPlugin = (app: Elysia) => {
  // WARN: added stub for sentry
  if (config.SENTRY_DSN) {
    return sentry({
      dsn: process.env.SENTRY_DSN,
      environment: config.ENVIRONMENT,
      tracesSampleRate: 1.0,
      debug: config.VERBOSE,
    });
  } else {
    return app.decorate("Sentry", SentryStub);
  }
};

export const SwaggerPlugin = swagger({
  documentation: {
    info: {
      title: "Market Observer",
      description: "Market Observer API",
      version: "1.0.0",
    },
    tags: [
      { name: "status", description: "Information about server." },
      { name: "auth", description: "Authentication and user endpoints." },
      { name: "items", description: "..." },
      { name: "purchase", description: "..." },
    ],
    components: {
      securitySchemes: {
        TokenAuth: {
          type: "http",
          scheme: "Bearer",
          bearerFormat: "Base64",
        },
        SessionSignature: {
          type: "apiKey",
          name: "session",
          in: "cookie",
        },
      },
    },
  },
});

export const StaticPlugin = staticPlugin({
  assets: "./public",
});

const loggingConfig = config.IS_PRODUCTION
  ? { level: "error" }
  : { level: "info" };

export const LoggingPluging = logger({ ...loggingConfig });

export const PostgresPlugin = (app: Elysia) => app;
export const CORSPlugin = cors();
