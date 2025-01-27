import { Elysia, t } from "elysia";

import { signIn, signUp, recovery, profile } from "./handlers";
import { AuthError } from "./types";
import { decodeBase64 } from "./utils";

import UsersJson from "./users.json";

const config = {
  users: UsersJson,
};

export const DeriveAuth = new Elysia({ name: "Service:HealthCheck" })
  .derive({ as: "scoped" }, ({ headers: { auth }, cookie: { session } }) => {
    if (!auth) return { auth: { user: null } };
    const [email, payload] = decodeBase64(auth).split(":");

    console.log("auth:derive", email, payload);
    // find user session and email
    const UserObject = config.users.find((user) => user.email === email);
    const CurrentSession = UserObject?.activeSessions.find(
      (s) => s === session,
    );
    if (!UserObject || !CurrentSession) return { auth: { user: null } };

    const authSession = { user: UserObject, session };
    return { auth: authSession };
  })
  .macro(({ onBeforeHandle }) => ({
    isAuth(value: boolean) {
      onBeforeHandle(({ auth, error }) => {
        if (!auth?.user || !auth.session) return error(401);
      });
    },
  }));

export const AuthService = (config: IAuthConfig) =>
  new Elysia({
    name: "auth-controller",
    seed: config,
    prefix: "auth",
    tags: ["auth"],
  })
    // .use(DeriveAuth)
    .error({ AUTH_ERROR: AuthError })
    // .group((app: Elysia) =>
    //   app
    //     .guard({ as: "local", resposne: t.String() })
    // )
    .get("/profile", profile)
    .post("/sign-in", signIn)
    .post("/sign-up", signUp)
    .post("/recovery", recovery);
