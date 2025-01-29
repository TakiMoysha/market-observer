declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SENTRY_DSN: string;
      SENTRY_SECURE: string;
      VERBOSE: string;
      HOST: string;
      PORT: string;
    }
  }
}

export { };
