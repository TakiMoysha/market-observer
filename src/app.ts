import Elysia from "elysia";
import { setup } from "./setup";
import config from "./setup/config";
import ModelsPlugin from "./models";
import { APIRouter } from "./routes";
import { SwaggerPlugin } from "./setup/sentry";

// ========================= Application
export const App = new Elysia()
  .use(setup)
  .use(SwaggerPlugin)
  .use(ModelsPlugin)
  .use(APIRouter)
  .listen({ hostname: config.HOSTNAME, port: config.PORT });

export type App = typeof App;
