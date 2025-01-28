import { Elysia, t, type Context } from "elysia";
import { newError } from "../utils";
import type { SignInDTO, SignUpDTO, RecoveryDTO } from "./models";

export abstract class AuthController {
  static signIn({ body: SignInDTO }: Context) {
    // return signIn(context.body.email, context.body.password);
  }

  static signUp({ body: SignUpDTO }: Context) {
    newError("Not implemented");
  }

  static recovery({ body: RecoveryDTO }: Context) {
    newError("Not implemented");
  }

  static profile(context: Context) {
    newError("Not implemented");
  }
}

export const signIn = async (body: SignInDTO) => {
  console.log(`Sign in, validate and sanitize: ${body.email}`);
  newError("Not implemented");
};

export const signUp = async (body: SignUpDTO) => {
  console.log(`Sign up, validate and sanitize: ${body.email}`);
  newError("Not implemented");
};
