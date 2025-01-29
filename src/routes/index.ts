import Elysia from "elysia";

import HealthRouter from "./HealthRouter";
import AuthRouter from "./AuthRouter";

export const APIRouter = new Elysia({ prefix: "/api" })
  .use(HealthRouter)
  .use(AuthRouter);
export type APIRouter = typeof APIRouter;
