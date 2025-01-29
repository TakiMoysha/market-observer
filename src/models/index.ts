import { Elysia, t } from "elysia";
import { RecoveryDTO, SignInDTO, SignUpDTO } from "./auth";

export default new Elysia({ name: "models" }).model({
  "user.sign-in": SignInDTO,
  "user.sin-up": SignUpDTO,
  "user.recovery": RecoveryDTO,
});
