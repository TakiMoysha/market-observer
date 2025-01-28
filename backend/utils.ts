import * as Sentry from "@sentry/node";

interface IErrorOptions { }

export const newError = (msg: string, opts: IErrorOptions = {}) => {
  const err = new Error(msg);
  Sentry.captureException(err);
  return err;
};
