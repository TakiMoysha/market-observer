import { t } from "elysia";

export const SignInDTO = t.Object(
  {
    email: t.String(),
    password: t.String(),
  },
  {
    description: "Sign in with email and password",
    examples: [{ email: "admin@admin.dev", password: "admin" }],
  },
);
export type SignInDTO = typeof SignInDTO.static;

export const SignUpDTO = t.Object(
  {
    email: t.String(),
    username: t.String(),
    password: t.String(),
  },
  {
    examples: [
      { email: "admin@admin.dev", username: "admin", password: "admin" },
    ],
    description: "Require email and password",
  },
);
export type SignUpDTO = typeof SignUpDTO.static;

export const RecoveryDTO = t.Object(
  {
    email: t.String(),
  },
  {
    examples: [{ email: "admin@admin.dev" }],
    description: "Require email",
  },
);
export type RecoveryDTO = typeof RecoveryDTO.static;

// export const SessionDTO = t.Object({});
