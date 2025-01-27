// const encodeBase64 = (value: string) => Buffer.from(value).toString("base64");
// const decodeBase64 = (value: string) => Buffer.from(value, "base64").toString();

import { throwError } from "../utils";

export const encodeBase64 = (value: string) => btoa(value);
export const decodeBase64 = (value: string) => atob(value);

export const passwordHash = async (password: string) => {
  return await Bun.password.hash(password);
};

export const sanitizeEmail = (email: string) => email.toLowerCase().trim();

export const sanitizePassword = (password: string) => password.trim();

