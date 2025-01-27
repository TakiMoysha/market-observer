import cors from "@elysiajs/cors";
import cookie from "@elysiajs/cookie";
import swagger from "@elysiajs/swagger";
import staticPlugin from "@elysiajs/static";
import Elysia, { t } from "elysia";

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

export const App = new Elysia()
  .use(StaticPlugin)
  .use(swagger())
  .use(cors())
  .use(HealthController)
  .get("/", () => ({ root: true, version: "1.0.0" }))
  .listen({ port: PORT });

console.log(`Server running on http://${HOSTNAME}:${PORT}`);

export type IApp = typeof App;
