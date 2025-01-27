// import "./vendors";

import cors from "@elysiajs/cors";
import cookie from "@elysiajs/cookie";
import swagger from "@elysiajs/swagger";
import { sentry } from "elysiajs-sentry";
import staticPlugin from "@elysiajs/static";
import * as Sentry from "@sentry/node";

import Elysia, { t } from "elysia";

import { AuthService } from "./AuthService";
import { HealthController } from "./HealthService";

const HOSTNAME = process.env.HOST ?? "0.0.0.0";
const PORT = process.env.PORT ?? 8080;

const SentryPlugin = (app: Elysia) => {
  if (process.env.SENTRY_DSN) app.use(sentry({ dsn: process.env.SENTRY_DSN }));
  return app;
};

const SwaggerPlugin = swagger({
  documentation: {
    info: {
      title: "Market Observer API",
      description: "Market Observer API",
      version: "1.0.0",
    },
    tags: [
      { name: "app", description: "General endpoints." },
      { name: "auth", description: "Authentication and user endpoints." },
      { name: "items", description: "..." },
      { name: "purchase", description: "..." },
    ],
  },
});

const StaticPlugin = staticPlugin({
  assets: "./public",
});

export const App = new Elysia()
  .use(SentryPlugin)
  .use(StaticPlugin)
  .use(SwaggerPlugin)
  .use(cors())
  .use(HealthController)
  .use(AuthService)
  .onError(({ code, error }) => {
    Sentry.captureException(error);
    if (code === "VALIDATION") {
      return error.message;
    }
  })
  .get("/", () => ({ root: true, version: "1.0.0" }), { tags: ["app"] })
  .listen({ port: PORT });

console.log(`Server running on http://${HOSTNAME}:${PORT}`);

export type IApp = typeof App;
