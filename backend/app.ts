import { Elysia, t } from "elysia";

import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { staticPlugin } from "@elysiajs/static";

import { HealthController } from "./HealthService";

const HOSTNAME = process.env.HOST ?? "0.0.0.0";
const PORT = process.env.PORT ?? 8080;

const SwaggerPlugin = swagger({
  documentation: {
    info: {
      title: "Market Observer API",
      description: "Market Observer API",
      version: "1.0.0",
    },
    tags: [
      { name: "App", description: "General endpoints" },
      { name: "Auth", description: "..." },
      { name: "Items", description: "..." },
      { name: "Purchase", description: "..." },
    ],
  },
});

const StaticPlugin = staticPlugin({
  assets: "./public",
});

const app = new Elysia({ prefix: "/api" })
  .use(StaticPlugin)
  .use(SwaggerPlugin)
  .use(cors())
  .use(HealthController)
  .get("/", () => ({ root: true, version: "1.0.0" }))
  .listen(PORT);

export type IApp = typeof app;
export default app;
