import Elysia from "elysia";

import swagger from "@elysiajs/swagger";
import { sentry } from "elysiajs-sentry";
import config from "./config";

const SentryStub = {
  raptureException: () => {},
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
      version: config.VERSION,
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
