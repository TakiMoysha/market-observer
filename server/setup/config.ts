import type { Options as RateLimitOptions } from "elysia-rate-limit";

const databaseConfig = {
  url: process.env.DATABASE_URL,
};
const redisConfig = {
  url: process.env.REDIS_URL,
};

const rateLimitConfig: Partial<RateLimitOptions> = {
  max: 60,
  errorResponse: "Too many requests, wait a minute and try again.",
  headers: true,
  duration: 1 * 60 * 1000,
};

const seo = {};

const corsConfig = {
  origin: `http://${process.env.HOST ?? "localhost"}:${process.env.PORT ?? 8080}`,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Referrer-Policy",
    "Accept",
    "Accept-Control-Allow-Origin",
    "X-Requested-With",
  ],
  credentials: true,
  maxAge: 60 * 60,
  aot: false,
  exposeHeaders: true,
  preflight: true,
};

export default {
  ENVIRONMENT: process.env.NODE_ENV ?? "development",
  IS_PRODUCTION: process.env.NODE_ENV == "production",

  LOG_LEVEL: process.env.LOG_LEVEL ?? (process.env.VERBOSE ? "debug" : "info"),
  VERBOSE: process.env.VERBOSE === "true",
  VERSION: process.env.VERSION ?? "0.1.0-dev",

  HOSTNAME: process.env.HOST ?? "0.0.0.0",
  PORT: process.env.PORT ?? 8080,

  SENTRY_DSN: process.env.SENTRY_DSN,

  cors: corsConfig,

  redis: redisConfig,
  postgres: databaseConfig,
};
