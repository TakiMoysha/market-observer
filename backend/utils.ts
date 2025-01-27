import * as Sentry from "@sentry/node";

export const throwError = (msg: string, code: number = 400) => {
  const err = new Error(msg, { cause: code });
  Sentry.captureException(err);
  throw err;
};
