import Elysia from "elysia";

import cors from "@elysiajs/cors";
import staticPlugin from "@elysiajs/static";
import config from "./config";

// ====================================================== STATIC
export const StaticPlugin = staticPlugin({
  assets: "./public",
});

// ====================================================== POSTGRES
export const PostgresPlugin = (app: Elysia) => app;
// ====================================================== REDIS
export const RedisPlugin = (app: Elysia) => app;

// ====================================================== CORS
export const CORSPlugin = (app: Elysia) =>
  app.use(cors()).onRequest(({ set, request }) => {
    if (request.method === "OPTIONS") {
      set.headers["Access-Control-Allow-Methods"] =
        config.cors.methods.join(",");
      set.headers["Access-Control-Allow-Headers"] =
        config.cors.allowedHeaders.join(",");
      set.headers["Access-Control-Allow-Credentials"] =
        config.cors.credentials.toString();
      set.headers["Access-Control-Max-Age"] = config.cors.maxAge.toString();
    }
  });
