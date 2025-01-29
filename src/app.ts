import Elysia from "elysia";
import { setup } from "./setup";
import { APIRouter } from "./routes";
import config from "./setup/config";
import { SwaggerPlugin } from "./setup/plugins";

// ========================= Application
export const App = new Elysia()
  .use(setup)
  .use(SwaggerPlugin)
  .use(APIRouter)
  .listen({ hostname: config.HOSTNAME, port: config.PORT });

export type IApp = typeof App;
