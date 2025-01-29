import postgres from "postgres";
import config from "../setup/config";
import { postgresLogger } from "../setup/logger";

export const sql = postgres(config.postgres.url);

export const connection = async (): Promise<void> => {
  try {
    // WARN: implemnet connection pool
  } catch (e) {
    postgresLogger.error(`Connection Error ${e}`);
  }
};
