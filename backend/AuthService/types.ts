import { t } from "elysia";

// export const SignInDTO = t.Object(
//   {
//     email: t.String(),
//     password: t.String(),
//   },
//   {
//     description: "Sign in with email and password",
//   },
// );

// export const AuthTokenDTO = t.Object(
//   {
//     token: t.String(),
//   },
//   {
//     description: "Authentication token",
//   },
// );

export const UserSession = t.Object(
  {
    token: t.String(),
    session: t.String(),
  },
  {
    description: "User active session information",
  },
);
type IUserSession = typeof UserSession.static;

export class AuthError extends Error {
  constructor(public msg: string) {
    super(msg);
  }
}

// export interface IAuthUser {
//   email: string;
//   password: string;
// }
//
// export interface IAuthConfig {
//   users: IAuthUser[];
//   errorMessage?: string;
//   exclude?: string[];
// }
