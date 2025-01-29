import { Elysia, t, type Context } from "elysia";
import type { SignInDTO, SignUpDTO, RecoveryDTO } from "./models";

interface IRepository {
  create(): Promise<{}>;
  read(): Promise<{}>;
  update(): Promise<{}>;
  delete(): Promise<{}>;
}

export abstract class AuthController {
  static signIn({ body: SignInDTO }: Context, repo: IRepository) {
    // valdiate and sanitize
    // if (false) return error(400, { success: false, message: "Bad input." });

    console.log(`Sign in, validate and sanitize: ${body.email}`);
    return { success: true, message: "User create" };
  }

  static signUp({ body: SignUpDTO }: Context, sentry: Sentry) {
    console.log(`Sign up, validate and sanitize: ${body.email}`);
    newError("Not implemented");
  }

  static recovery({ body: RecoveryDTO }: Context) {
    newError("Not implemented");
  }

  static profile(context: Context) {
    newError("Not implemented");
  }
}
