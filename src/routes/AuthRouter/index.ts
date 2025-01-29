import Elysia from "elysia";

export default new Elysia({ tags: ["auth"] });



// import { Elysia, t } from "elysia";
//
// import { AuthController } from "./controller";
// import { decodeBase64 } from "./libs";
//
// import { SignInDTO, SignUpDTO } from "./models";
//
// import { type IAuthServiceConfig } from "./types";
//
// // TODO: update type
// export const isSessionValid = (user: any, session: string) => !user || !session;
//
// class BasicAuthError extends Error {
//   constructor(message: string) {
//     super(message);
//     this.name = "BasicAuthError";
//   }
// }
//
// export const DeriveAuthService = (config: IAuthServiceConfig) =>
//   new Elysia({
//     name: "services:auth",
//     seed: config,
//     tags: ["auth"],
//   })
//     .error({ AUTH_ERROR: BasicAuthError })
//     .model({
//       session: t.Cookie(
//         { token: t.String() },
//         { secrets: "x-session-signature" },
//       ),
//     })
//     .derive(({ server, request }) => ({ ip: server?.requestIP(request) }))
//     .derive(
//       { as: "global" },
//       ({ headers: { auth }, cookie: { session }, ip }) => {
//         if (!auth) return { auth: { user: null } };
//         const [email, payload] = decodeBase64(auth).split(":");
//
//         console.log("auth:derive", email, payload, ip);
//         // TODO: find user session and email
//         const UserObject = config.users.find((user) => user.email === email);
//         const CurrentSession = UserObject?.activeSessions.find(
//           (s: string) => s === session.value,
//         );
//         if (!isSessionValid(UserObject, CurrentSession))
//           return { auth: { user: null } };
//
//         return { auth: { user: UserObject, session: session.value } };
//       },
//     )
//     .onTransform((ctx) => {
//       if (
//         !ctx.auth.user ||
//         (!ctx.auth.session &&
//           ctx.path !== undefined &&
//           ctx.request.method !== "OPTIONS")
//       )
//         throw new BasicAuthError(config.errorMessage ?? "Unauthorized");
//     })
//     .onError(({ error, code }) => {
//       if (code === "AUTH_ERROR") {
//         // TODO: update headers
//         return new Response(error.message, {
//           status: 401,
//           headers: { "WWW-Authenticate": `Bearer$(...)` },
//         });
//       }
//     })
//     .macro({
//       isAuth(value: boolean) {
//         return {
//           beforeHandle({ auth, error }) {
//             if (!auth.user || !auth.session) {
//               return error("Unauthorized", { status: 401 });
//             }
//           },
//         };
//       },
//     })
//     .post(
//       "/sign-in",
//       async ({ body: SignInDTO, error }) =>
//         AuthController.signIn(body, repo, error),
//       { body: SignInDTO },
//     )
//     .post(
//       "/sign-up",
//       async ({ body: SignUpDTO, error }) =>
//         AuthController.signUp(body, repo, error),
//       { body: SignUpDTO },
//     )
//     .post("/recovery", AuthController.recovery, {
//       detail: { summary: "Sending recovery link to email." },
//     })
//     .get("/profile", AuthController.profile, {
//       isAuth: true,
//       cookie: "session",
//       detail: { summary: "Get profile data." },
//       security: { TokenAuth: [], SessionSignature: [] },
//     });
