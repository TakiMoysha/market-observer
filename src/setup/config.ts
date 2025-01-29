const seo = {};

export default {
  ENVIRONMENT: process.env.NODE_ENV ?? "development",
  IS_PRODUCTION: process.env.NODE_ENV == "production",
  VERBOSE: process.env.VERBOSE === "true",
  HOSTNAME: process.env.HOST ?? "0.0.0.0",
  PORT: process.env.PORT ?? 8080,

  SENTRY_DSN: process.env.SENTRY_DSN,
};
