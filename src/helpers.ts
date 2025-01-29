// ================ CONSTS
export enum APP_SERVICE {
  REDIS = "redis",
  POSTGRES = "postgres",
}

// ================  REQUEST/RESPONSE
export const DEFAUL_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  Accept: "application/json",
};

export const RESPONSE_KEY = {
  UNKNOWN: {
    code: "UNKNOWN",
    message: "Unknown error",
  },
  VALIDATION: {
    code: "VALIDATION",
    message: "Validation error",
  },
  INTERNAL_SERVER_ERROR: {
    code: "INTERNAL_SERVER_ERROR",
    message: "Internal server error",
  },
};
