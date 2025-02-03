declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SENTRY_DSN: string;
      SENTRY_SECURE: string;
      VERBOSE: string;
      HOST: string;
      PORT: string;
      LOG_LEVEL: "error" | "warn" | "info" | "debug";
      VERSION: "0.1.0-dev";
      DATABASE_URL: string;
      REDIS_URL: string;
    }
  }
}

export {};
