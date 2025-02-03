import { Elysia, t } from "elysia";

const User = t.Object({
  username: t.String(),
  password: t.String(),

  createdAt: t.Date(),
  updatedAt: t.Date(),
});
type User = typeof User.static;
