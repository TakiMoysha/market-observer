import Elysia from "elysia";
import { SentryPlugin } from "./sentry";
import {
  RedisPlugin,
  StaticPlugin,
  CORSPlugin,
  PostgresPlugin,
} from "./plugins";

export const setup = (app: Elysia) =>
  app
    .use(PostgresPlugin)
    .use(RedisPlugin)
    .use(SentryPlugin)
    // .use(SwaggerPlugin) // https://github.com/elysiajs/elysia-swagger/issues/174
    .use(CORSPlugin)
    .use(StaticPlugin)
    .onStart(({ server }) =>
      console.log(`[${server?.development ? "DEV" : "PROD"}] ${server?.url}`),
    );
