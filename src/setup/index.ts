import Elysia from "elysia";
import {
  StaticPlugin,
  // SwaggerPlugin,
  LoggingPluging,
  CORSPlugin,
  SentryPlugin,
  PostgresPlugin,
} from "./plugins";

export const setup = new Elysia()
  .use(PostgresPlugin)
  .use(SentryPlugin)
  // .use(SwaggerPlugin) // https://github.com/elysiajs/elysia-swagger/issues/174
  .use(StaticPlugin)
  .use(LoggingPluging)
  .use(CORSPlugin)
  .onStart(({ server }) =>
    console.log(`[${server?.development ? "DEV" : "PROD"}] ${server?.url}`),
  );
