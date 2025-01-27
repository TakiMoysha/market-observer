import os from "node:os";

import { memoryUsage } from "node:process";
import { Elysia, t } from "elysia";

export const AuthService = new Elysia({ name: "Service:HealthCheck" })
  .derive({ as: "scoped" }, ({ cookie: { session } }) => ({
    auth: { user: session.value },
  }))
  .macro(({ onBeforeHandle }) => ({
    isSignIn(value: boolean) {
      onBeforeHandle(({ auth, error }) => {
        if (!auth?.user || !auth.user) return error(401);
      });
    },
  }));

const signIn = async (body: { email: string, password: string }) => {
  console.log(`Sign in: ${body.email}`);
  if (body.email === "admin" && body.password === "admin") {
    return { token: "x-admin" };
  }

  throw new Error("Invalid credentials");
};

const signUp = async (body: { email: string, password: string }) => {
  console.log(`Sign up: ${body.email}`);
  if (body.email === "admin" && body.password === "admin") {
    return { token: "x-admin" };
  }

  throw new Error("Invalid credentials");
}

const recovery = async (body: { email: string }) => {
  console.log(`Recovery: ${body.email}`);
  return { token: "x-admin" };
}

export const HealthController = new Elysia({ prefix: "auth" })
  .use(AuthService)
  .post("/sign-in", signIn)
  .post("/sign-up", () => signUp)
  .post("/recovery", () => recovery);
