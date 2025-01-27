import * as Sentry from "@sentry/node";
import { throwError } from "../utils";

export const signIn = async (body: { email: string; password: string }) => {
  console.log(`Sign in: ${body.email}`);
  if (body.email === "admin" && body.password === "admin") {
    return { token: "x-admin" };
  }

  throwError("Invalid credentials");
};

export const signUp = async (body: { email: string; password: string }) => {
  console.log(`Sign up: ${body.email}`);
  if (body.email === "admin" && body.password === "admin") {
    return { token: "x-admin" };
  }

  throwError("Invalid credentials");
};

export const recovery = async (body: { email: string }) => {
  console.log(`Recovery: ${body.email}`);
  return { token: "x-admin" };
};

export const profile = async (body: { email: string }) => {
  console.log(`Profile: ${body.email}`);
  return { token: "x-admin" };
};
