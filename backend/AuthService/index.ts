import { Elysia, t } from "elysia";

import { AuthController } from "./controller";
import { decodeBase64 } from "./utils";

import { SignInDTO, SignUpDTO } from "./models";

import { type IAuthServiceConfig } from "./types";
import { newError } from "../utils";

// TODO: update type
export const isSessionValid = (user: any, session: string) => !user || !session;

export const DeriveAuth = (config: IAuthServiceConfig) =>
  new Elysia({
    name: "services:auth",
    seed: config,
    tags: ["auth"],
  })
    .model({})
    .derive(({ server, request }) => ({ ip: server?.requestIP(request) }))
    .derive(
      { as: "global" },
      ({ headers: { auth }, cookie: { session }, ip }) => {
        if (!auth) return { auth: { user: null } };
        const [email, payload] = decodeBase64(auth).split(":");

        console.log("auth:derive", email, payload, ip);
        // TODO: find user session and email
        const UserObject = config.users.find((user) => user.email === email);
        const CurrentSession = UserObject?.activeSessions.find(
          (s: string) => s === session.value,
        );
        if (!isSessionValid(UserObject, CurrentSession))
          return { auth: { user: null } };

        return { auth: { user: UserObject, session: session.value } };
      },
    )
    .onError(({ error, code }) => {
      if (code === "VALIDATION") {
        // TODO: update headers
        return new Response(error.message, {
          status: 401,
          headers: { "WWW-Authenticate": `Basic$()` },
        });
      }
    })
    .macro(({ onBeforeHandle }) => ({
      isAuth(value: boolean) {
        onBeforeHandle(({ auth, error }) => {
          if (!auth.user || !auth.session) {
            return error("Unauthorized", { status: 401 });
          }
        });
      },
    }))
    .post(
      "/sign-in",
      () => {
        newError("Not implemented");
      },
      { body: SignInDTO },
    )
    .post(
      "/sign-up",
      () => {
        newError("Not implemented");
      },
      { body: SignUpDTO },
    )
    .post("/recovery", AuthController.recovery)
    .get("/profile", AuthController.profile, { isAuth: true });
